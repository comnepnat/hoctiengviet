/**
 * Talking Picture Cards View — Sách Tranh Biết Nói & Phòng Tập Nói Tương Tác
 */

import { CATEGORIES, VOCABULARY, getVocabByCategory } from '../data/curriculum.js';
import { getIllustration } from '../illustrations/art.js';
import {
  loadState,
  toggleSpokenWord,
  listParentRecordingIds
} from '../services/storage.js';
import { playSfx, speakVocabCard, speakText, stopSpeaking } from '../services/audio.js';
import { startToddlerListening, stopActiveListening } from '../services/voice.js';

const PRAISE_LINES = [
  'Giỏi quá! Bé nói hay lắm!',
  'Hoan hô bé yêu! Gấu nghe rõ rồi!',
  'Tuyệt vời quá! Bé tập nói thật chăm chỉ!',
  'Yêu quá đi! Giọng bé thật dễ thương!'
];

export async function renderCardsView(container, { showToast, spawnStars }) {
  let activeCategory = CATEGORIES[0].id;
  let focusedItemId = null;
  let parentVoiceIds = new Set(await listParentRecordingIds());
  let activeListener = null;

  const cleanupListening = () => {
    stopActiveListening();
    activeListener = null;
  };

  async function render() {
    cleanupListening();
    const state = loadState();
    const items = getVocabByCategory(activeCategory);

    if (focusedItemId) {
      const idx = items.findIndex((i) => i.id === focusedItemId);
      const item = idx >= 0 ? items[idx] : items[0];
      renderFocusCard(item, idx >= 0 ? idx : 0, items, state);
      return;
    }

    container.innerHTML = `
      <section class="cards-view" aria-label="Sách tranh biết nói">
        <div class="section-header">
          <div>
            <h1 class="section-title">Sách tranh biết nói</h1>
            <p class="section-sub">Chạm vào một hình để nghe âm thanh, câu mẫu và cùng bé tập nói nhé.</p>
          </div>
        </div>

        <div class="category-tabs" role="tablist" aria-label="Chủ đề từ vựng">
          ${CATEGORIES.map(
            (cat) => `
            <button
              type="button"
              role="tab"
              aria-selected="${cat.id === activeCategory}"
              class="category-tab ${cat.id === activeCategory ? 'is-active' : ''}"
              data-cat="${cat.id}"
            >
              <span aria-hidden="true">${cat.icon}</span>
              <span>${cat.name}</span>
            </button>
          `
          ).join('')}
        </div>

        <div class="vocab-grid">
          ${items
            .map((item) => {
              const isSpoken = state.spokenWords.includes(item.id);
              const hasParentVoice = parentVoiceIds.has(item.id);
              return `
                <button
                  type="button"
                  class="vocab-tile"
                  data-vocab="${item.id}"
                  aria-label="${item.word}, ${item.sound}"
                >
                  <div class="vocab-tile__badges">
                    ${hasParentVoice ? '<span class="mini-badge mini-badge--parent-voice" title="Có giọng Ba Mẹ">❤️</span>' : ''}
                    ${isSpoken ? '<span class="mini-badge mini-badge--spoken" title="Bé đã nói được">⭐</span>' : ''}
                  </div>
                  <div class="vocab-tile__art" style="background:${item.tint}">
                    ${getIllustration(item.id)}
                  </div>
                  <span class="vocab-tile__word">${item.word}</span>
                  <span class="vocab-tile__sound">${item.sound}</span>
                </button>
              `;
            })
            .join('')}
        </div>
      </section>
    `;

    container.querySelectorAll('.category-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSfx('tap');
        activeCategory = btn.dataset.cat;
        render();
      });
    });

    container.querySelectorAll('.vocab-tile').forEach((tile) => {
      tile.addEventListener('click', () => {
        focusedItemId = tile.dataset.vocab;
        render();
      });
    });
  }

  function renderFocusCard(item, index, list, state) {
    const isSpoken = state.spokenWords.includes(item.id);
    const hasParentVoice = parentVoiceIds.has(item.id);
    const phrase = item.phrases[state.ageStage] || item.phrases['18-24'];

    container.innerHTML = `
      <section class="focus-card-stage" aria-label="Thẻ học nói ${item.word}">
        <div class="focus-nav-bar">
          <button id="btn-back-grid" class="icon-pill" type="button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            <span>Tất cả hình</span>
          </button>
          <span class="focus-counter">${index + 1} / ${list.length}</span>
        </div>

        <article class="focus-card">
          <button
            id="focus-art-trigger"
            type="button"
            class="focus-art-btn"
            style="background:${item.tint}"
            aria-label="Chạm vào hình ${item.word} để nghe"
          >
            ${getIllustration(item.id)}
          </button>

          <div class="sound-bubble">
            <span aria-hidden="true">🎵</span>
            <span>${item.sound}</span>
            ${hasParentVoice ? '<span title="Đang dùng giọng Ba Mẹ">· ❤️ Giọng Ba Mẹ</span>' : ''}
          </div>

          <h1 class="focus-word">${item.word}</h1>
          <p class="focus-phrase">“${phrase}”</p>

          <div id="voice-studio-box" class="voice-studio-box">
            <div class="voice-wave-bars" id="voice-wave-bars" aria-hidden="true">
              <span class="voice-wave-bar"></span>
              <span class="voice-wave-bar"></span>
              <span class="voice-wave-bar"></span>
              <span class="voice-wave-bar"></span>
              <span class="voice-wave-bar"></span>
              <span class="voice-wave-bar"></span>
              <span class="voice-wave-bar"></span>
            </div>
            <p id="voice-feedback-text" class="voice-feedback-text">
              Bấm nút <strong>Bé nói nhé</strong> để Gấu lắng nghe giọng bé nha!
            </p>
          </div>

          <div class="focus-actions">
            <button id="btn-listen-card" class="toddler-btn toddler-btn--listen" type="button">
              <span style="font-size:1.55rem" aria-hidden="true">🔊</span>
              <span>Nghe lại</span>
            </button>

            <button id="btn-speak-card" class="toddler-btn toddler-btn--speak" type="button">
              <span style="font-size:1.55rem" aria-hidden="true">🎤</span>
              <span id="btn-speak-label">Bé nói nhé</span>
            </button>

            <button id="btn-slow-card" class="toddler-btn toddler-btn--slow" type="button">
              <span style="font-size:1.55rem" aria-hidden="true">🐢</span>
              <span>Nói chậm</span>
            </button>
          </div>

          <div class="focus-parent-bar">
            <p class="parent-cue-text">
              <strong>Gợi ý Ba Mẹ:</strong> ${item.parentCue}
            </p>
            <button
              id="btn-mark-spoken"
              type="button"
              class="spoken-toggle-btn ${isSpoken ? 'is-spoken' : ''}"
            >
              <span>${isSpoken ? '⭐ Bé đã nói được' : '☆ Đánh dấu bé đã nói'}</span>
            </button>
          </div>
        </article>

        <div class="focus-prev-next">
          <button id="btn-prev-card" class="nav-big-btn" type="button">← Hình trước</button>
          <button id="btn-next-card" class="nav-big-btn" type="button">Hình tiếp theo →</button>
        </div>
      </section>
    `;

    const artBtn = container.querySelector('#focus-art-trigger');
    const studioBox = container.querySelector('#voice-studio-box');
    const waveBars = Array.from(container.querySelectorAll('.voice-wave-bar'));
    const feedbackEl = container.querySelector('#voice-feedback-text');
    const speakBtn = container.querySelector('#btn-speak-card');
    const speakLabel = container.querySelector('#btn-speak-label');

    const bounceArt = () => {
      artBtn.classList.remove('is-bouncing');
      void artBtn.offsetWidth;
      artBtn.classList.add('is-bouncing');
    };

    const triggerSpeak = async (slow = false) => {
      cleanupListening();
      speakBtn.classList.remove('is-recording');
      speakLabel.textContent = 'Bé nói nhé';
      bounceArt();
      await speakVocabCard(item, { slow, ageStage: loadState().ageStage });
    };

    // Tự động đọc dịu dàng ngay khi mở thẻ
    triggerSpeak(false);

    artBtn.addEventListener('click', () => triggerSpeak(false));
    container.querySelector('#btn-listen-card').addEventListener('click', () => triggerSpeak(false));
    container.querySelector('#btn-slow-card').addEventListener('click', () => triggerSpeak(true));

    // Bé tập nói (lắng nghe sóng âm + khen ngợi + phát lại giọng bé)
    speakBtn.addEventListener('click', async () => {
      if (activeListener) {
        activeListener.stopEarly();
        return;
      }

      const currentState = loadState();
      studioBox.classList.remove('is-celebrating');
      studioBox.classList.add('is-listening');
      speakBtn.classList.add('is-recording');
      speakLabel.textContent = 'Đang nghe...';
      feedbackEl.textContent = `Gấu đang lắng nghe bé nói "${item.word}" nè...`;

      activeListener = await startToddlerListening({
        targetWord: `${item.word} ${item.sound}`,
        echoEnabled: currentState.echoEnabled,
        durationMs: 3400,
        onLevel: (level) => {
          waveBars.forEach((bar, i) => {
            const wave = Math.max(0.22, Math.min(1, level * (0.65 + ((i % 3) * 0.25)) + Math.random() * 0.12));
            bar.style.transform = `scaleY(${wave.toFixed(2)})`;
          });
        },
        onComplete: ({ heardSound, matched, transcript, error }) => {
          activeListener = null;
          studioBox.classList.remove('is-listening');
          speakBtn.classList.remove('is-recording');
          speakLabel.textContent = 'Bé nói nhé';
          waveBars.forEach((b) => (b.style.transform = 'scaleY(0.25)'));

          if (error) {
            feedbackEl.textContent = error;
            return;
          }

          if (heardSound) {
            studioBox.classList.add('is-celebrating');
            playSfx('celebrate');
            bounceArt();
            const rect = artBtn.getBoundingClientRect();
            spawnStars(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);

            const praise = PRAISE_LINES[Math.floor(Math.random() * PRAISE_LINES.length)];
            const heardNote = transcript ? ` (Gấu nghe thấy: “${transcript}”)` : '';
            feedbackEl.innerHTML = matched
              ? `🌟 <strong>${praise}</strong> Bé nói đúng từ “${item.word}” rồi!${currentState.echoEnabled ? ' Nghe lại giọng bé nè!' : ''}`
              : `🌟 <strong>${praise}</strong>${heardNote}${currentState.echoEnabled ? ' Nghe lại giọng bé nè!' : ''}`;

            if (!currentState.echoEnabled) {
              speakText(praise);
            }
          } else {
            feedbackEl.textContent = `Không sao đâu bé yêu! Mình bấm nghe lại "${item.word}" rồi nói thử cùng ba mẹ nhé.`;
          }
        }
      });
    });

    // Đánh dấu bé đã nói được từ này trong Nhật ký
    const spokenBtn = container.querySelector('#btn-mark-spoken');
    spokenBtn.addEventListener('click', () => {
      const updated = toggleSpokenWord(item.id);
      const nowSpoken = updated.spokenWords.includes(item.id);
      spokenBtn.classList.toggle('is-spoken', nowSpoken);
      spokenBtn.innerHTML = `<span>${nowSpoken ? '⭐ Bé đã nói được' : '☆ Đánh dấu bé đã nói'}</span>`;
      playSfx(nowSpoken ? 'celebrate' : 'tap');
      if (nowSpoken) {
        showToast(`Đã lưu “${item.word}” vào Nhật ký từ đầu tiên của bé!`);
      }
    });

    // Điều hướng thẻ trước / sau
    container.querySelector('#btn-back-grid').addEventListener('click', () => {
      stopSpeaking();
      playSfx('tap');
      focusedItemId = null;
      render();
    });

    container.querySelector('#btn-prev-card').addEventListener('click', () => {
      stopSpeaking();
      playSfx('tap');
      const prevIdx = (index - 1 + list.length) % list.length;
      focusedItemId = list[prevIdx].id;
      render();
    });

    container.querySelector('#btn-next-card').addEventListener('click', () => {
      stopSpeaking();
      playSfx('tap');
      const nextIdx = (index + 1) % list.length;
      focusedItemId = list[nextIdx].id;
      render();
    });
  }

  render();

  return () => {
    cleanupListening();
    stopSpeaking();
  };
}
