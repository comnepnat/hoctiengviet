/**
 * Bi Bô — Main Application Controller
 * Điều phối màn hình, cổng bảo vệ Góc Ba Mẹ, hiệu ứng sao bay nhẹ nhàng và hẹn giờ Bạn Gấu đi ngủ.
 */

import { getStageMeta } from './data/curriculum.js';
import { loadState } from './services/storage.js';
import { playSfx, speakText, stopSpeaking } from './services/audio.js';
import { stopActiveListening } from './services/voice.js';
import { renderHomeView } from './views/home.js';
import { renderCardsView } from './views/cards.js';
import { renderListenGameView } from './views/listenGame.js';
import { renderStoriesView } from './views/stories.js';
import { renderFairyTalesView } from './views/fairytales.js';
import { renderParentView } from './views/parents.js';

const mainEl = document.getElementById('main-content');
const btnHome = document.getElementById('btn-home');
const brandMark = document.getElementById('brand-mark');
const ageIndicator = document.getElementById('age-indicator');
const btnParentsGate = document.getElementById('btn-parents-gate');
const celebrationLayer = document.getElementById('celebration-layer');
const toastBanner = document.getElementById('toast-banner');

// Parent Gate Modal Elements
const gateModal = document.getElementById('parent-gate-modal');
const gateCloseBtn = document.getElementById('parent-gate-close');
const holdBtn = document.getElementById('parent-hold-btn');
const holdFill = document.getElementById('parent-hold-fill');
const holdText = document.getElementById('parent-hold-text');
const mathFallbackBtn = document.getElementById('parent-math-fallback');

// Bedtime Wind-Down Elements
const bedtimeOverlay = document.getElementById('bedtime-overlay');
const bedtimeWaveBtn = document.getElementById('bedtime-wave-btn');
const bedtimeExtendBtn = document.getElementById('bedtime-extend-btn');

let currentView = 'home';
let currentCleanup = null;
let toastTimer = null;
let screenTimerId = null;

function showToast(message) {
  toastBanner.textContent = message;
  toastBanner.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastBanner.classList.remove('is-visible');
  }, 2800);
}

function spawnStars(x, y, count = 6) {
  const symbols = ['⭐', '✨', '💛', '🌟'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'floating-star';
    el.textContent = symbols[i % symbols.length];
    const offsetX = (Math.random() - 0.5) * 140;
    const offsetY = (Math.random() - 0.5) * 40;
    el.style.left = `${Math.max(24, Math.min(window.innerWidth - 40, x + offsetX))}px`;
    el.style.top = `${Math.max(60, Math.min(window.innerHeight - 60, y + offsetY))}px`;
    el.style.animationDelay = `${i * 0.06}s`;
    celebrationLayer.appendChild(el);
    setTimeout(() => el.remove(), 1450);
  }
}

function updateHeaderUI() {
  const state = loadState();
  const stage = getStageMeta(state.ageStage);
  ageIndicator.textContent = stage.label;

  const isHome = currentView === 'home';
  btnHome.classList.toggle('hidden', isHome);
  brandMark.classList.toggle('hidden', !isHome);
}

async function navigate(viewName, params = {}) {
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }
  stopActiveListening();
  stopSpeaking();

  currentView = viewName;
  updateHeaderUI();

  // Trigger gentle entrance animation
  mainEl.style.animation = 'none';
  void mainEl.offsetWidth;
  mainEl.style.animation = '';

  const helpers = {
    navigate,
    showToast,
    spawnStars,
    onStageChanged: () => updateHeaderUI(),
    onTimerChanged: (mins) => scheduleBedtimeTimer(mins),
    onPreviewBedtime: () => showBedtimeOverlay(),
    openParentGate: () => openParentGate(),
    params: params || {}
  };

  if (viewName === 'home') {
    currentCleanup = renderHomeView(mainEl, helpers) || null;
  } else if (viewName === 'cards') {
    currentCleanup = (await renderCardsView(mainEl, helpers)) || null;
  } else if (viewName === 'listen') {
    currentCleanup = renderListenGameView(mainEl, helpers) || null;
  } else if (viewName === 'stories') {
    currentCleanup = renderStoriesView(mainEl, helpers) || null;
  } else if (viewName === 'fairytales') {
    currentCleanup = renderFairyTalesView(mainEl, helpers) || null;
  } else if (viewName === 'parents') {
    currentCleanup = (await renderParentView(mainEl, helpers)) || null;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---------- Parent Gate (Hold 1.5s) ---------- */
let holdInterval = null;
let holdStart = 0;

function resetHoldGate() {
  clearInterval(holdInterval);
  holdInterval = null;
  holdFill.style.width = '0%';
  holdText.textContent = 'Nhấn giữ 1,5 giây';
}

function openParentGate() {
  if (currentView === 'parents') {
    navigate('home');
    return;
  }
  resetHoldGate();
  gateModal.classList.remove('hidden');
}

function closeParentGate() {
  resetHoldGate();
  gateModal.classList.add('hidden');
}

function unlockParents() {
  closeParentGate();
  playSfx('tap');
  navigate('parents');
}

function beginHold(e) {
  e.preventDefault();
  resetHoldGate();
  holdStart = Date.now();
  holdText.textContent = 'Đang mở...';
  holdInterval = setInterval(() => {
    const elapsed = Date.now() - holdStart;
    const pct = Math.min(100, (elapsed / 1400) * 100);
    holdFill.style.width = `${pct}%`;
    if (pct >= 100) {
      unlockParents();
    }
  }, 40);
}

holdBtn.addEventListener('pointerdown', beginHold);
holdBtn.addEventListener('pointerup', resetHoldGate);
holdBtn.addEventListener('pointerleave', resetHoldGate);
holdBtn.addEventListener('pointercancel', resetHoldGate);
mathFallbackBtn.addEventListener('click', unlockParents);
gateCloseBtn.addEventListener('click', closeParentGate);
gateModal.addEventListener('click', (e) => {
  if (e.target === gateModal) closeParentGate();
});

/* ---------- Screen-Time Gentle Wind-Down Timer ---------- */
function showBedtimeOverlay() {
  stopActiveListening();
  stopSpeaking();
  bedtimeOverlay.classList.remove('hidden');
  playSfx('lullaby');
  setTimeout(() => {
    speakText('Bạn Gấu buồn ngủ rồi! Hẹn bé ngày mai mình lại cùng tập nói nhé! Chào tạm biệt bé yêu.');
  }, 450);
}

function scheduleBedtimeTimer(minutes) {
  clearTimeout(screenTimerId);
  screenTimerId = null;
  if (!minutes || minutes <= 0) return;
  screenTimerId = setTimeout(showBedtimeOverlay, minutes * 60 * 1000);
}

bedtimeWaveBtn.addEventListener('click', () => {
  playSfx('lullaby');
  spawnStars(window.innerWidth / 2, window.innerHeight / 2, 10);
  speakText('Tạm biệt bé yêu! Chúc bé ngoan nhé!');
  bedtimeWaveBtn.textContent = '🌙 Tạm biệt bé yêu!';
});

bedtimeExtendBtn.addEventListener('click', () => {
  bedtimeOverlay.classList.add('hidden');
  bedtimeWaveBtn.textContent = '👋 Chào bạn Gấu nhé!';
  scheduleBedtimeTimer(5);
  showToast('Đã gia hạn thêm 5 phút chơi cùng bé.');
});

/* ---------- Global Top Bar Navigation ---------- */
btnHome.addEventListener('click', () => {
  playSfx('tap');
  navigate('home');
});

btnParentsGate.addEventListener('click', () => {
  playSfx('tap');
  openParentGate();
});

/* ---------- Preload Vietnamese Voices & Service Worker ---------- */
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// Khởi chạy ứng dụng
const initialState = loadState();
scheduleBedtimeTimer(initialState.timerMinutes);
navigate('home');
