/**
 * Storage Service:
 * - LocalStorage cho cài đặt độ tuổi, nhật ký từ bé đã nói, cài đặt giọng đọc tự nhiên, hẹn giờ mắt.
 * - IndexedDB cho bản thu âm giọng thật của Ba Mẹ & bộ nhớ đệm giọng AI tự nhiên (hoạt động offline).
 */

const STATE_KEY = 'bi_bo_state_v1';
const DB_NAME = 'bi_bo_parent_voices_db';
const DB_VERSION = 2;
const STORE_NAME = 'recordings';
const AI_CACHE_STORE = 'ai_tts_cache';

const DEFAULT_STATE = {
  ageStage: '18-24',
  speechRate: 0.92,
  selectedVoiceURI: '',
  voiceProvider: 'browser', // 'browser' | 'openai' | 'google' | 'elevenlabs'
  aiApiKey: '',
  aiVoiceId: 'nova',
  storyAmbientMusic: false,
  spokenWords: [],
  readFairyTales: [],
  fairyBedtimeMode: false,
  fairyStoryRate: 0.94,
  timerMinutes: 15, // 0 = tắt hẹn giờ
  echoEnabled: true,
  dailyTipIndex: 0
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(partial) {
  const next = { ...loadState(), ...partial };
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(next));
  } catch {
    // Bỏ qua nếu trình duyệt chặn storage
  }
  return next;
}

export function toggleSpokenWord(wordId) {
  const state = loadState();
  const exists = state.spokenWords.includes(wordId);
  const spokenWords = exists
    ? state.spokenWords.filter((id) => id !== wordId)
    : [...state.spokenWords, wordId];
  return saveState({ spokenWords });
}

export function markFairyTaleRead(storyId) {
  const state = loadState();
  if (state.readFairyTales.includes(storyId)) return state;
  return saveState({ readFairyTales: [...state.readFairyTales, storyId] });
}

/* ---------- IndexedDB cho Giọng Ba Mẹ & Cache Giọng AI ---------- */
function openAudioDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB không khả dụng'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
      if (!db.objectStoreNames.contains(AI_CACHE_STORE)) {
        db.createObjectStore(AI_CACHE_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveParentRecording(recordKey, blob) {
  const db = await openAudioDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(blob, recordKey);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getParentRecording(recordKey) {
  try {
    const db = await openAudioDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(recordKey);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function deleteParentRecording(recordKey) {
  try {
    const db = await openAudioDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(recordKey);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

export async function listParentRecordingIds() {
  try {
    const db = await openAudioDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).getAllKeys();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

/* ---------- IndexedDB Cache cho Giọng AI (phát lại tức thì & offline) ---------- */
export async function getCachedAiAudio(cacheKey) {
  try {
    const db = await openAudioDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(AI_CACHE_STORE, 'readonly');
      const req = tx.objectStore(AI_CACHE_STORE).get(cacheKey);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function saveCachedAiAudio(cacheKey, blob) {
  try {
    const db = await openAudioDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(AI_CACHE_STORE, 'readwrite');
      tx.objectStore(AI_CACHE_STORE).put(blob, cacheKey);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}
