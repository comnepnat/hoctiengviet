/**
 * Audio & Vietnamese Speech Service
 * - Tạo âm thanh mộc mạc êm tai (marimba, còi xe, tiếng mưa, chúc mừng) bằng Web Audio API
 * - Đọc tiếng Việt dịu dàng cho bé bằng SpeechSynthesis (vi-VN)
 * - Tự động ưu tiên phát giọng thu âm thật của Ba Mẹ nếu có
 */

import { getParentRecording, loadState } from './storage.js';

let audioCtx = null;
let currentAudioEl = null;

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

/* ---------- Vietnamese Speech Synthesis ---------- */

export function getVietnameseVoices() {
  if (!('speechSynthesis' in window)) return [];
  const all = window.speechSynthesis.getVoices() || [];
  const vi = all.filter((v) => v.lang && v.lang.toLowerCase().startsWith('vi'));
  return vi.length ? vi : all.slice(0, 6);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  if (currentAudioEl) {
    currentAudioEl.pause();
    currentAudioEl = null;
  }
}

export function playBlob(blob) {
  return new Promise((resolve) => {
    stopSpeaking();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudioEl = audio;
    audio.onended = () => {
      URL.revokeObjectURL(url);
      currentAudioEl = null;
      resolve(true);
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      currentAudioEl = null;
      resolve(false);
    };
    audio.play().catch(() => {
      URL.revokeObjectURL(url);
      resolve(false);
    });
  });
}

export function speakText(text, { rateOverride = null, pitch = 1.06 } = {}) {
  return new Promise((resolve) => {
    stopSpeaking();
    if (!('speechSynthesis' in window) || !text) {
      resolve(false);
      return;
    }

    const state = loadState();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'vi-VN';
    utter.rate = rateOverride ?? state.speechRate ?? 0.84;
    utter.pitch = pitch;

    const voices = window.speechSynthesis.getVoices() || [];
    let chosen = null;
    if (state.selectedVoiceURI) {
      chosen = voices.find((v) => v.voiceURI === state.selectedVoiceURI);
    }
    if (!chosen) {
      chosen = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('vi'));
    }
    if (chosen) utter.voice = chosen;

    utter.onend = () => resolve(true);
    utter.onerror = () => resolve(false);

    // Đảm bảo Chrome/Safari không bị treo hàng đợi speechSynthesis
    window.speechSynthesis.speak(utter);
  });
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
  await speakText(script, { rateOverride: slow ? 0.66 : null });
  return { usedParentVoice: false };
}
