/**
 * Interactive Toddler Voice Service ("Bé tập nói" & "Thu âm giọng Ba Mẹ")
 * - Lắng nghe giọng bé theo thời gian thực với sóng âm vui mắt
 * - Ghi âm ngắn để bé nghe lại chính giọng mình (Echo/Parrot mode — rất hiệu quả với bé 18–36 tháng!)
 * - Tích hợp nhận diện tiếng Việt (SpeechRecognition vi-VN) như lớp bổ trợ nhẹ nhàng,
 *   KHÔNG BAO GIỜ báo sai, luôn khen ngợi mọi nỗ lực phát âm của bé.
 */

import { stopSpeaking, playBlob } from './audio.js';

let activeCleanup = null;

export function stopActiveListening() {
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }
}

function normalizeVi(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
}

/**
 * Lắng nghe bé tập nói trong tối đa ~3.2 giây
 * @param {Object} opts
 * @param {string} opts.targetWord Từ mục tiêu (vd: "Mèo")
 * @param {boolean} opts.echoEnabled Phát lại giọng bé sau khi bé nói
 * @param {(level: number) => void} opts.onLevel Callback mức âm lượng [0..1]
 * @param {(result: { heardSound: boolean, matched: boolean, transcript: string, blob: Blob|null, error?: string }) => void} opts.onComplete
 */
export async function startToddlerListening({
  targetWord = '',
  echoEnabled = true,
  durationMs = 3400,
  onLevel = () => {},
  onComplete = () => {}
}) {
  stopActiveListening();
  stopSpeaking();

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    onComplete({
      heardSound: false,
      matched: false,
      transcript: '',
      blob: null,
      error: 'Trình duyệt chưa hỗ trợ micro. Ba mẹ hãy cùng bé nói to trực tiếp nhé!'
    });
    return;
  }

  let stream = null;
  let audioCtx = null;
  let rafId = null;
  let recorder = null;
  let recognition = null;
  let timeoutId = null;
  let finished = false;

  const chunks = [];
  let peakLevel = 0;
  let heardSound = false;
  let transcript = '';

  const finish = async () => {
    if (finished) return;
    finished = true;

    if (timeoutId) clearTimeout(timeoutId);
    if (rafId) cancelAnimationFrame(rafId);
    if (recognition) {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    }

    const finalizeBlob = async (blob) => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (audioCtx) audioCtx.close().catch(() => {});
      activeCleanup = null;

      const normTarget = normalizeVi(targetWord);
      const normHeard = normalizeVi(transcript);
      const matched = Boolean(
        normTarget &&
          normHeard &&
          (normHeard.includes(normTarget) ||
            normTarget.split(' ').some((tok) => tok.length > 1 && normHeard.includes(tok)))
      );

      onComplete({
        heardSound: heardSound || Boolean(transcript),
        matched,
        transcript,
        blob
      });

      // Cho bé nghe lại chính giọng nói đáng yêu của mình
      if (echoEnabled && blob && (heardSound || transcript)) {
        setTimeout(() => {
          playBlob(blob);
        }, 420);
      }
    };

    if (recorder && recorder.state === 'recording') {
      recorder.onstop = () => {
        const blob = chunks.length ? new Blob(chunks, { type: recorder.mimeType || 'audio/webm' }) : null;
        finalizeBlob(blob);
      };
      try {
        recorder.stop();
      } catch {
        finalizeBlob(null);
      }
    } else {
      finalizeBlob(null);
    }
  };

  activeCleanup = () => {
    finished = true;
    if (timeoutId) clearTimeout(timeoutId);
    if (rafId) cancelAnimationFrame(rafId);
    if (recognition) {
      try {
        recognition.abort();
      } catch {
        // ignore
      }
    }
    if (recorder && recorder.state === 'recording') {
      try {
        recorder.stop();
      } catch {
        // ignore
      }
    }
    if (stream) stream.getTracks().forEach((t) => t.stop());
    if (audioCtx) audioCtx.close().catch(() => {});
  };

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch {
    activeCleanup = null;
    onComplete({
      heardSound: false,
      matched: false,
      transcript: '',
      blob: null,
      error: 'Ba mẹ hãy cho phép quyền Micro để Gấu lắng nghe giọng bé nhé!'
    });
    return;
  }

  // 1. Live volume visualizer
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (Ctx) {
    audioCtx = new Ctx();
    const src = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    src.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      if (finished) return;
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length);
      const scaled = Math.min(1, rms * 5.2);
      if (scaled > peakLevel) peakLevel = scaled;
      if (scaled > 0.16) heardSound = true;
      onLevel(scaled);
      rafId = requestAnimationFrame(tick);
    };
    tick();
  }

  // 2. MediaRecorder cho chế độ Echo nghe lại giọng bé
  if (typeof MediaRecorder !== 'undefined') {
    try {
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };
      recorder.start();
    } catch {
      recorder = null;
    }
  }

  // 3. Optional Vietnamese SpeechRecognition (trợ giúp thêm, không bắt buộc)
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRec) {
    try {
      recognition = new SpeechRec();
      recognition.lang = 'vi-VN';
      recognition.interimResults = true;
      recognition.maxAlternatives = 2;
      recognition.onresult = (event) => {
        const last = event.results[event.results.length - 1];
        if (last && last[0]) {
          transcript = last[0].transcript || '';
          if (transcript.trim()) heardSound = true;
        }
      };
      recognition.onerror = () => {};
      recognition.start();
    } catch {
      recognition = null;
    }
  }

  timeoutId = setTimeout(finish, durationMs);
  return { stopEarly: finish };
}

/**
 * Thu âm giọng thật của Ba Mẹ trong Góc Ba Mẹ (tối đa 4.5 giây hoặc bấm Dừng)
 */
export async function startParentRecording({ maxMs = 4500, onDone = () => {} }) {
  stopActiveListening();
  stopSpeaking();

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') {
    onDone({ blob: null, error: 'Thiết bị chưa hỗ trợ ghi âm trên trình duyệt này.' });
    return null;
  }

  let stream = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch {
    onDone({ blob: null, error: 'Cần cấp quyền Micro để thu âm giọng Ba Mẹ.' });
    return null;
  }

  const chunks = [];
  const recorder = new MediaRecorder(stream);
  let stopped = false;

  const stop = () => {
    if (stopped) return;
    stopped = true;
    clearTimeout(timer);
    if (recorder.state === 'recording') {
      recorder.stop();
    }
  };

  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  recorder.onstop = () => {
    stream.getTracks().forEach((t) => t.stop());
    const blob = chunks.length ? new Blob(chunks, { type: recorder.mimeType || 'audio/webm' }) : null;
    onDone({ blob, error: null });
  };

  recorder.start();
  const timer = setTimeout(stop, maxMs);

  return { stop };
}
