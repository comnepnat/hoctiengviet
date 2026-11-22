/**
 * Audio & Natural Vietnamese Speech Service
 * - Âm thanh minh họa êm dịu bằng Web Audio API + nhạc hộp ru êm ái tùy chọn
 * - Bộ chọn giọng tiếng Việt thông minh: tự ưu tiên giọng Neural/Natural (Hoài My, Nam Minh, Linh Enhanced, Google tiếng Việt)
 * - Bộ ngắt nhịp kể chuyện tự nhiên theo câu & thoại (giữ pitch 1.0 không méo tiếng, nghỉ lấy hơi tự nhiên)
 * - Hỗ trợ Giọng AI Siêu Tự Nhiên (OpenAI / Google Cloud Neural2 / ElevenLabs) lưu cache offline bằng IndexedDB
 * - Luôn ưu tiên phát giọng thu âm thật của Ba Mẹ nếu có
 */

import {
  getCachedAiAudio,
  getParentRecording,
  loadState,
  saveCachedAiAudio
} from './storage.js';

let audioCtx = null;
let currentAudioEl = null;
let pendingSpeechResolve = null;
let ambientTimerId = null;
let ambientStep = 0;

export const AI_VOICE_PRESETS = {
  google: [
    { id: 'vi-VN-Chirp3-HD-Aoede', label: 'Chirp 3 HD · Aoede — Nữ kể chuyện siêu tự nhiên (Mới nhất ⭐)' },
    { id: 'vi-VN-Chirp3-HD-Kore', label: 'Chirp 3 HD · Kore — Nữ dịu dàng ấm áp (Giờ ngủ 🌙)' },
    { id: 'vi-VN-Chirp3-HD-Achernar', label: 'Chirp 3 HD · Achernar — Nữ trong trẻo biểu cảm' },
    { id: 'vi-VN-Chirp3-HD-Charon', label: 'Chirp 3 HD · Charon — Nam trầm ấm kể chuyện' },
    { id: 'vi-VN-Neural2-A', label: 'Neural2-A — Nữ tiếng Việt tự nhiên (1M ký tự miễn phí/tháng)' },
    { id: 'vi-VN-Neural2-D', label: 'Neural2-D — Nam tiếng Việt ấm áp' },
    { id: 'vi-VN-Wavenet-A', label: 'WaveNet-A — Nữ nhẹ nhàng (4M ký tự miễn phí/tháng)' }
  ],
  openai: [
    { id: 'nova', label: 'Nova — Nữ ấm áp kể chuyện (Khuyên dùng)' },
    { id: 'shimmer', label: 'Shimmer — Nữ êm dịu ru ngủ' },
    { id: 'coral', label: 'Coral — Nữ tươi vui giàu cảm xúc' },
    { id: 'alloy', label: 'Alloy — Trung tính nhẹ nhàng' }
  ],
  elevenlabs: [
    { id: '21m00Tcm4TlvDq8ikWAM', label: 'Rachel — Nữ kể chuyện dịu dàng (Multilingual v2)' },
    { id: 'EXAVITQu4vr4xnSDxMaL', label: 'Bella — Nữ ấm áp tự nhiên' },
    { id: 'pNInz6obpgDQGcFmaJgB', label: 'Adam — Nam trầm ấm' }
  ]
};

function getAudioContext() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(freq, duration = 0.16, { type = 'sine', volume = 0.14, delay = 0, endFreq = null } = {}) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (endFreq) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), now + duration);
  }

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

/* ---------- Nhạc nền hộp nhạc ru ngủ thì thầm ---------- */
const LULLABY_NOTES = [
  523.25, 659.25, 783.99, 659.25, // C5 E5 G5 E5
  587.33, 698.46, 880.0, 698.46,  // D5 F5 A5 F5
  440.0, 523.25, 659.25, 523.25,  // A4 C5 E5 C5
  392.0, 493.88, 587.33, 659.25   // G4 B4 D5 E5
];

export function startAmbientLullaby() {
  stopAmbientLullaby();
  const playStep = () => {
    const note = LULLABY_NOTES[ambientStep % LULLABY_NOTES.length];
    ambientStep += 1;
    playTone(note, 1.05, { type: 'sine', volume: 0.028 });
    if (ambientStep % 4 === 1) {
      playTone(note / 2, 1.5, { type: 'sine', volume: 0.018 });
    }
  };
  playStep();
  ambientTimerId = setInterval(playStep, 1150);
}

export function stopAmbientLullaby() {
  if (ambientTimerId) {
    clearInterval(ambientTimerId);
    ambientTimerId = null;
  }
}

export function isAmbientLullabyPlaying() {
  return Boolean(ambientTimerId);
}

/**
 * Âm thanh minh họa êm dịu, không chói tai bé
 */
export function playSfx(name = 'tap') {
  switch (name) {
    case 'tap':
      playTone(523.25, 0.09, { type: 'sine', volume: 0.11, endFreq: 587.33 });
      break;
    case 'celebrate':
      [523.25, 659.25, 783.99, 1046.5].forEach((n, i) =>
        playTone(n, 0.22, { type: 'triangle', volume: 0.14, delay: i * 0.09 })
      );
      break;
    case 'gentle-nudge':
      playTone(392, 0.16, { type: 'sine', volume: 0.09, endFreq: 349.23 });
      break;
    case 'cat':
      playTone(720, 0.22, { type: 'triangle', volume: 0.12, endFreq: 980 });
      playTone(920, 0.28, { type: 'triangle', volume: 0.1, delay: 0.18, endFreq: 560 });
      break;
    case 'dog':
      playTone(260, 0.13, { type: 'triangle', volume: 0.16, endFreq: 170 });
      playTone(290, 0.14, { type: 'triangle', volume: 0.16, delay: 0.17, endFreq: 165 });
      break;
    case 'duck':
      playTone(460, 0.11, { type: 'sawtooth', volume: 0.06, endFreq: 320 });
      playTone(470, 0.11, { type: 'sawtooth', volume: 0.06, delay: 0.16, endFreq: 310 });
      break;
    case 'rooster':
      playTone(540, 0.14, { type: 'triangle', volume: 0.12, endFreq: 760 });
      playTone(760, 0.14, { type: 'triangle', volume: 0.12, delay: 0.14, endFreq: 920 });
      playTone(880, 0.34, { type: 'triangle', volume: 0.12, delay: 0.29, endFreq: 680 });
      break;
    case 'cow':
      playTone(170, 0.45, { type: 'sawtooth', volume: 0.06, endFreq: 135 });
      break;
    case 'pig':
      playTone(240, 0.1, { type: 'triangle', volume: 0.14, endFreq: 320 });
      playTone(220, 0.11, { type: 'triangle', volume: 0.14, delay: 0.14, endFreq: 290 });
      break;
    case 'bird':
      playTone(1150, 0.09, { type: 'sine', volume: 0.1, endFreq: 1620 });
      playTone(1240, 0.1, { type: 'sine', volume: 0.1, delay: 0.13, endFreq: 1760 });
      break;
    case 'car':
      playTone(440, 0.12, { type: 'triangle', volume: 0.13 });
      playTone(554.37, 0.12, { type: 'triangle', volume: 0.1 });
      playTone(440, 0.15, { type: 'triangle', volume: 0.13, delay: 0.18 });
      playTone(554.37, 0.15, { type: 'triangle', volume: 0.1, delay: 0.18 });
      break;
    case 'train':
      playTone(392, 0.22, { type: 'triangle', volume: 0.12 });
      playTone(493.88, 0.22, { type: 'triangle', volume: 0.1 });
      playTone(392, 0.26, { type: 'triangle', volume: 0.12, delay: 0.28 });
      break;
    case 'plane':
      playTone(240, 0.45, { type: 'sine', volume: 0.11, endFreq: 520 });
      break;
    case 'bounce':
      playTone(300, 0.14, { type: 'sine', volume: 0.14, endFreq: 640 });
      playTone(360, 0.14, { type: 'sine', volume: 0.11, delay: 0.17, endFreq: 560 });
      break;
    case 'bell':
      playTone(1318.5, 0.3, { type: 'sine', volume: 0.12 });
      playTone(1568, 0.35, { type: 'sine', volume: 0.1, delay: 0.12 });
      break;
    case 'rain':
      [880, 1046, 784, 1174, 987].forEach((n, i) =>
        playTone(n, 0.08, { type: 'sine', volume: 0.08, delay: i * 0.08 })
      );
      break;
    case 'water':
    case 'gulp':
      playTone(420, 0.1, { type: 'sine', volume: 0.12, endFreq: 680 });
      playTone(520, 0.1, { type: 'sine', volume: 0.12, delay: 0.14, endFreq: 780 });
      break;
    case 'crunch':
      playTone(320, 0.07, { type: 'square', volume: 0.05, endFreq: 180 });
      playTone(380, 0.07, { type: 'square', volume: 0.05, delay: 0.1, endFreq: 190 });
      break;
    case 'clap':
      playTone(520, 0.08, { type: 'triangle', volume: 0.12 });
      playTone(620, 0.08, { type: 'triangle', volume: 0.12, delay: 0.13 });
      playTone(740, 0.1, { type: 'triangle', volume: 0.12, delay: 0.26 });
      break;
    case 'lullaby':
      [523.25, 659.25, 587.33, 493.88].forEach((n, i) =>
        playTone(n, 0.38, { type: 'sine', volume: 0.09, delay: i * 0.22 })
      );
      break;
    case 'page':
      playTone(440, 0.08, { type: 'sine', volume: 0.08, endFreq: 523.25 });
      break;
    case 'wind':
      playTone(320, 0.36, { type: 'sine', volume: 0.08, endFreq: 490 });
      playTone(460, 0.34, { type: 'sine', volume: 0.07, delay: 0.16, endFreq: 300 });
      break;
    case 'knock':
      [0, 0.14, 0.28].forEach((d) =>
        playTone(230, 0.08, { type: 'triangle', volume: 0.15, delay: d, endFreq: 140 })
      );
      break;
    case 'horse':
      [0, 0.11, 0.26, 0.37].forEach((d, idx) =>
        playTone(idx % 2 === 0 ? 290 : 220, 0.07, { type: 'triangle', volume: 0.13, delay: d, endFreq: 150 })
      );
      break;
    case 'guitar':
      [392.0, 493.88, 587.33, 783.99].forEach((n, i) =>
        playTone(n, 0.32, { type: 'triangle', volume: 0.09, delay: i * 0.06 })
      );
      break;
    case 'drum':
      [0, 0.18, 0.34].forEach((d, idx) =>
        playTone(idx === 2 ? 190 : 150, 0.13, { type: 'sine', volume: 0.16, delay: d, endFreq: 95 })
      );
      break;
    case 'magic':
      [587.33, 739.99, 880, 1174.66].forEach((n, i) =>
        playTone(n, 0.26, { type: 'sine', volume: 0.09, delay: i * 0.08 })
      );
      break;
    case 'splash':
      playTone(540, 0.12, { type: 'sine', volume: 0.11, endFreq: 860 });
      playTone(680, 0.14, { type: 'sine', volume: 0.09, delay: 0.11, endFreq: 1020 });
      break;
    case 'warm':
    case 'hug':
      playTone(440, 0.24, { type: 'sine', volume: 0.11 });
      playTone(554.37, 0.26, { type: 'sine', volume: 0.1, delay: 0.12 });
      break;
    case 'sparkle':
    case 'chime':
    default:
      playTone(659.25, 0.16, { type: 'sine', volume: 0.11 });
      playTone(880, 0.22, { type: 'sine', volume: 0.1, delay: 0.1 });
      break;
  }
}

/* ---------- Smart Natural Vietnamese Voice Ranking ---------- */

export function scoreVietnameseVoice(voice) {
  if (!voice) return -999;
  const name = (voice.name || '').toLowerCase();
  const lang = (voice.lang || '').toLowerCase();
  let score = lang.startsWith('vi') ? 50 : 0;

  if (name.includes('natural') || name.includes('neural')) score += 110;
  if (name.includes('online')) score += 45;
  if (name.includes('hoaimy') || name.includes('hoài my')) score += 40;
  if (name.includes('namminh') || name.includes('nam minh')) score += 28;
  if (name.includes('premium') || name.includes('enhanced') || name.includes('siri')) score += 85;
  if (name.includes('google')) score += 75;
  if (name.includes('linh')) score += 45;

  // Giáng hạng các giọng tổng hợp offline cũ nghe khô cứng
  if (name.includes('espeak') || name.includes('festival')) score -= 60;
  if (name.includes('microsoft an') && !name.includes('natural') && !name.includes('online')) {
    score -= 35;
  }
  return score;
}

export function getVietnameseVoices() {
  if (!('speechSynthesis' in window)) return [];
  const all = window.speechSynthesis.getVoices() || [];
  const vi = all.filter((v) => v.lang && v.lang.toLowerCase().startsWith('vi'));
  const list = vi.length ? vi : all.slice(0, 6);
  return [...list].sort((a, b) => scoreVietnameseVoice(b) - scoreVietnameseVoice(a));
}

export function pickBestVietnameseVoice(selectedURI = '') {
  if (!('speechSynthesis' in window)) return null;
  const all = window.speechSynthesis.getVoices() || [];
  if (selectedURI) {
    const exact = all.find((v) => v.voiceURI === selectedURI);
    if (exact) return exact;
  }
  const ranked = getVietnameseVoices();
  return ranked[0] || null;
}

export function getActiveVoiceInfo() {
  const state = loadState();
  if (state.voiceProvider && state.voiceProvider !== 'browser' && state.aiApiKey?.trim()) {
    const providerLabel =
      state.voiceProvider === 'google'
        ? 'Google Cloud TTS'
        : state.voiceProvider === 'openai'
        ? 'AI OpenAI'
        : 'AI ElevenLabs';
    return {
      tier: 'ai',
      isNatural: true,
      label: `✨ ${providerLabel} (${state.aiVoiceId || 'Tự nhiên'})`
    };
  }

  const best = pickBestVietnameseVoice(state.selectedVoiceURI);
  if (!best) {
    return {
      tier: 'none',
      isNatural: false,
      label: 'Chưa tìm thấy giọng tiếng Việt trên thiết bị'
    };
  }

  const sc = scoreVietnameseVoice(best);
  if (sc >= 140) {
    return { tier: 'neural', isNatural: true, label: `✨ ${best.name}` };
  }
  if (sc >= 110) {
    return { tier: 'cloud', isNatural: true, label: `🔊 ${best.name}` };
  }
  return {
    tier: 'basic',
    isNatural: false,
    label: `⚠️ ${best.name} (giọng cơ bản)`
  };
}

export function stopSpeaking() {
  if (pendingSpeechResolve) {
    const fn = pendingSpeechResolve;
    pendingSpeechResolve = null;
    fn(false);
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (currentAudioEl) {
    currentAudioEl.pause();
    currentAudioEl = null;
  }
}

export function playBlob(blob, { playbackRate = 1 } = {}) {
  return new Promise((resolve) => {
    stopSpeaking();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.playbackRate = playbackRate;
    currentAudioEl = audio;

    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(url);
      if (currentAudioEl === audio) currentAudioEl = null;
      if (pendingSpeechResolve === finish) pendingSpeechResolve = null;
      resolve(ok);
    };

    pendingSpeechResolve = finish;
    audio.onended = () => finish(true);
    audio.onerror = () => finish(false);
    audio.play().catch(() => finish(false));
  });
}

/* ---------- Neural AI Voice Client (Google Cloud Chirp 3 HD & Neural2 / OpenAI / ElevenLabs) ---------- */
let lastAiVoiceError = '';

export function getLastAiVoiceError() {
  return lastAiVoiceError;
}

function buildCacheKey(provider, voiceId, text) {
  return `${provider}::${voiceId}::${text.trim()}`;
}

async function fetchAiSpeechBlob(text, state) {
  lastAiVoiceError = '';
  const provider = state.voiceProvider;
  const apiKey = (state.aiApiKey || '').trim();
  const voiceId = state.aiVoiceId || (AI_VOICE_PRESETS[provider]?.[0]?.id ?? 'vi-VN-Chirp3-HD-Aoede');
  if (!provider || provider === 'browser' || !apiKey) return null;

  const cacheKey = buildCacheKey(provider, voiceId, text);
  const cached = await getCachedAiAudio(cacheKey);
  if (cached) return cached;

  try {
    let blob = null;

    if (provider === 'google') {
      const isChirp3 = voiceId.includes('Chirp3-HD');
      const audioConfig = isChirp3
        ? { audioEncoding: 'MP3', speakingRate: 0.94 }
        : { audioEncoding: 'MP3', speakingRate: 0.93, pitch: 0 };

      const res = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: { languageCode: 'vi-VN', name: voiceId },
            audioConfig
          })
        }
      );
      if (!res.ok) {
        let msg = `Google Cloud TTS báo lỗi (${res.status})`;
        try {
          const errJson = await res.json();
          if (errJson?.error?.message) msg = errJson.error.message;
        } catch {}
        lastAiVoiceError = msg;
        return null;
      }
      const data = await res.json();
      if (!data.audioContent) return null;
      const bin = atob(data.audioContent);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      blob = new Blob([bytes], { type: 'audio/mpeg' });
    } else if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'tts-1',
          voice: voiceId,
          input: text,
          speed: 0.94
        })
      });
      if (!res.ok) {
        lastAiVoiceError = `OpenAI TTS báo lỗi (${res.status}) — kiểm tra lại API Key.`;
        return null;
      }
      blob = await res.blob();
    } else if (provider === 'elevenlabs') {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg'
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.58,
              similarity_boost: 0.78,
              style: 0.35
            }
          })
        }
      );
      if (!res.ok) {
        lastAiVoiceError = `ElevenLabs báo lỗi (${res.status}) — kiểm tra lại API Key.`;
        return null;
      }
      blob = await res.blob();
    }

    if (blob && blob.size > 100) {
      saveCachedAiAudio(cacheKey, blob);
      return blob;
    }
    return null;
  } catch (err) {
    lastAiVoiceError = 'Không kết nối được tới máy chủ giọng AI (kiểm tra mạng hoặc API Key).';
    return null;
  }
}

/* ---------- Expressive Browser Speech Engine ---------- */

function cleanTextForNaturalSpeech(raw) {
  return String(raw || '')
    .replace(/[“”"]/g, ' ')
    .replace(/—/g, ', ')
    .replace(/\.\.\.|…/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

function speakSingleBrowserChunk(text, { rate = 0.94, pitch = 1.0 } = {}) {
  return new Promise((resolve) => {
    stopSpeaking();
    const cleaned = cleanTextForNaturalSpeech(text);
    if (!('speechSynthesis' in window) || !cleaned) {
      resolve(false);
      return;
    }

    const state = loadState();
    const utter = new SpeechSynthesisUtterance(cleaned);
    utter.lang = 'vi-VN';
    // Giữ rate trong khoảng tự nhiên (>= 0.78) và pitch 1.0 để tránh méo tiếng robot
    utter.rate = Math.max(0.72, Math.min(1.15, rate));
    utter.pitch = pitch;

    const chosen = pickBestVietnameseVoice(state.selectedVoiceURI);
    if (chosen) utter.voice = chosen;

    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      if (pendingSpeechResolve === finish) pendingSpeechResolve = null;
      resolve(ok);
    };

    pendingSpeechResolve = finish;
    utter.onend = () => finish(true);
    utter.onerror = () => finish(false);

    window.speechSynthesis.speak(utter);
  });
}

/**
 * Tách một đoạn văn dài thành các câu / câu thoại ngắn để giọng đọc nghỉ lấy hơi tự nhiên,
 * tạo ngữ điệu giàu cảm xúc thay vì đọc đều đều một mạch như máy.
 */
function splitIntoStoryChunks(paragraph) {
  const parts = String(paragraph || '')
    .replace(/([.!?…])\s+/g, '$1\n')
    .replace(/(:\s*["“])/g, ':\n$1')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  return parts.map((raw) => {
    const isDialogue = /^[“"]/.test(raw) || raw.includes('!');
    const endsSentence = /[.!?…“"]$/.test(raw);
    return {
      text: raw,
      isDialogue,
      pauseAfterMs: endsSentence ? 340 : 210
    };
  });
}

export async function speakText(text, { rateOverride = null, pitch = 1.0 } = {}) {
  const state = loadState();
  const cleaned = cleanTextForNaturalSpeech(text);
  if (!cleaned) return false;

  // 1. Ưu tiên Giọng AI Siêu Tự Nhiên nếu Ba Mẹ đã bật & nhập API Key
  if (state.voiceProvider && state.voiceProvider !== 'browser' && state.aiApiKey?.trim()) {
    const aiBlob = await fetchAiSpeechBlob(cleaned, state);
    if (aiBlob) {
      const rate = rateOverride ? Math.max(0.82, Math.min(1.15, rateOverride / 0.94)) : 1;
      return playBlob(aiBlob, { playbackRate: rate });
    }
  }

  // 2. Dùng giọng trình duyệt tốt nhất đã xếp hạng (giữ pitch 1.0 tự nhiên)
  const rate = rateOverride ?? state.speechRate ?? 0.92;
  return speakSingleBrowserChunk(cleaned, { rate, pitch });
}

/**
 * Kể một đoạn truyện cổ tích với nhịp ngắt nghỉ tự nhiên theo từng câu & câu thoại.
 */
export async function speakNaturalParagraph(
  paragraph,
  { rateOverride = null, shouldContinue = () => true } = {}
) {
  const state = loadState();
  const rate = rateOverride ?? state.fairyStoryRate ?? 0.94;

  // Nếu có Giọng AI tự nhiên (OpenAI / Google Neural2 / ElevenLabs): đọc trọn đoạn mượt mà luôn!
  if (state.voiceProvider && state.voiceProvider !== 'browser' && state.aiApiKey?.trim()) {
    const aiBlob = await fetchAiSpeechBlob(paragraph, state);
    if (!shouldContinue()) return false;
    if (aiBlob) {
      const speedRatio = Math.max(0.84, Math.min(1.12, rate / 0.94));
      return playBlob(aiBlob, { playbackRate: speedRatio });
    }
  }

  // Với giọng trình duyệt: tách câu & thoại + nghỉ lấy hơi tự nhiên, pitch 1.0 (1.03 cho câu thoại vui)
  const chunks = splitIntoStoryChunks(paragraph);
  for (let i = 0; i < chunks.length; i++) {
    if (!shouldContinue()) return false;
    const ch = chunks[i];
    const chunkPitch = ch.isDialogue ? 1.03 : 1.0;
    const chunkRate = ch.isDialogue ? Math.min(1.04, rate + 0.02) : rate;
    const ok = await speakSingleBrowserChunk(ch.text, { rate: chunkRate, pitch: chunkPitch });
    if (!shouldContinue()) return false;
    if (!ok && !('speechSynthesis' in window)) return false;
    if (i < chunks.length - 1) {
      await new Promise((r) => setTimeout(r, ch.pauseAfterMs));
    }
  }
  return true;
}

/**
 * Phát từ vựng: ưu tiên bản thu âm giọng Ba Mẹ nếu có (trừ khi chế độ đọc chậm từng tiếng)
 */
export async function speakVocabCard(vocabItem, { slow = false, ageStage = '18-24' } = {}) {
  if (!slow) {
    const parentBlob = await getParentRecording(vocabItem.id);
    if (parentBlob) {
      playSfx(vocabItem.sfx);
      await new Promise((r) => setTimeout(r, 260));
      await playBlob(parentBlob);
      return { usedParentVoice: true };
    }
  }

  playSfx(vocabItem.sfx);
  await new Promise((r) => setTimeout(r, 240));
  const script = slow ? vocabItem.slowText : vocabItem.phrases[ageStage] || vocabItem.word;
  await speakText(script, { rateOverride: slow ? 0.76 : null, pitch: 1.0 });
  return { usedParentVoice: false };
}
