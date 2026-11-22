/**
 * Storage Service:
 * - LocalStorage cho cài đặt độ tuổi, nhật ký từ bé đã nói, hẹn giờ mắt.
 * - IndexedDB cho bản thu âm giọng thật của Ba Mẹ (hoạt động offline).
 */

const STATE_KEY = 'bi_bo_state_v1';
const DB_NAME = 'bi_bo_parent_voices_db';
const STORE_NAME = 'recordings';

const DEFAULT_STATE = {
  ageStage: '18-24',
  speechRate: 0.84,
  selectedVoiceURI: '',
  spokenWords: [],
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

/* ---------- IndexedDB cho Giọng Ba Mẹ ---------- */
function openAudioDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB không khả dụng'));
      return;
    }
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveParentRecording(vocabId, blob) {
  const db = await openAudioDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(blob, vocabId);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getParentRecording(vocabId) {
  try {
    const db = await openAudioDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(vocabId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function deleteParentRecording(vocabId) {
  try {
    const db = await openAudioDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(vocabId);
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
