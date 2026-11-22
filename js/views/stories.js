/**
 * Interactive Daily Stories View — Chuyện Nhỏ Mỗi Ngày
 * 4 bức tranh màu nước tương tác giúp bé học nói gắn với ngữ cảnh đời sống thật.
 */

import { DAILY_STORIES } from '../data/stories.js';
import { loadState } from '../services/storage.js';
import { playSfx, speakText, stopSpeaking } from '../services/audio.js';
import { startToddlerListening, stopActiveListening } from '../services/voice.js';

export function renderStoriesView(container, { spawnStars }) {
  let activeStoryId = null;
  let selectedHotspotId = null;
  let foundHotspots = new Set();
  let activeListener = null;

  const stopMic = () => {
    stopActiveListening();
    activeListener = null;
  };

  function renderPicker() {
    stopMic();
    stopSpeaking();

    container.innerHTML = `
      <section class="stories-view" aria-label="Chuyện nhỏ mỗi ngày">
        <div class="section-header">
          <div>
            <h1 class="section-title">Chuyện nhỏ mỗi ngày</h1>
            <p class="section-sub">Chọn một bức tranh quen thuộc rồi cùng bé chạm vào từng đồ vật và trò chuyện nhé.</p>
          </div>
        </div>

        <div class="story-picker-grid">
          ${DAILY_STORIES.map(
            (story) => `
            <button type="button" class="story-card" data-story="${story.id}">
              <img src="${story.image}" alt="${story.title}" class="story-card__thumb" loading="lazy" />
              <div class="story-card__body">
                <h2 class="story-card__title">${story.title}</h2>
                <p class="story-card__desc">${story.subtitle}</p>
              </div>
            </button>
          `
          ).join('')}
        </div>
      </section>
    `;

    container.querySelectorAll('.story-card').forEach((card) => {
      card.addEventListener('click', () => {
        playSfx('tap');
        activeStoryId = card.dataset.story;
        selectedHotspotId = null;
        foundHotspots = new Set();
        renderStoryScene(true);
      });
    });
  }

  function renderStoryScene(playIntro = false) {
    stopMic();
    const story = DAILY_STORIES.find((s) => s.id === activeStoryId) || DAILY_STORIES[0];
    const state = loadState();
    const selected = story.hotspots.find((h) => h.id === selectedHotspotId) || null;
    const allFound = foundHotspots.size === story.hotspots.length;

    container.innerHTML = `
      <section class="story-stage" aria-label="${story.title}">
        <div class="focus-nav-bar">
          <button id="btn-back-stories" class="icon-pill" type="button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            <span>Chọn tranh khác</span>
          </button>

          <div class="story-progress-dots" aria-label="Đã khám phá ${foundHotspots.size} trên ${story.hotspots.length} điểm">
            ${story.hotspots
              .map(
                (h) =>
                  `<span class="story-dot ${foundHotspots.has(h.id) ? 'is-found' : ''}" title="${h.word}"></span>`
              )
              .join('')}
          </div>
        </div>

        <div class="scene-canvas">
          <img src="${story.image}" alt="${story.title}" class="scene-canvas__img" />
          ${story.hotspots
            .map((h) => {
              const isSelected = h.id === selectedHotspotId;
              const isFound = foundHotspots.has(h.id);
              return `
                <button
                  type="button"
                  class="scene-hotspot ${isFound ? 'is-found' : ''} ${isSelected ? 'is-selected' : ''}"
                  style="left:${h.x}%; top:${h.y}%;"
                  data-hotspot="${h.id}"
                  aria-label="${h.word}"
                >
                  <span aria-hidden="true">${h.icon}</span>
                </button>
              `;
            })
            .join('')}
        </div>

        <div class="story-dialogue-panel">
          <div class="story-dialogue-info">
            ${
              selected
                ? `
              <span class="story-dialogue-word">${selected.icon} ${selected.word}</span>
              <p class="story-dialogue-line">“${selected.lines[state.ageStage] || selected.lines['18-24']}”</p>
              <p id="story-prompt-line" class="story-dialogue-prompt">${selected.prompt}</p>
            `
                : `
              <span class="story-dialogue-word">${story.title}</span>
              <p class="story-dialogue-line">Bé hãy chạm vào các vòng tròn sáng trong tranh nhé!</p>
              <p class="story-dialogue-prompt">Mỗi lần chạm, Gấu sẽ kể chuyện và mời bé nói theo thật tự nhiên.</p>
            `
            }
          </div>

          <div class="story-dialogue-actions">
            ${
              selected
                ? `
              <button id="btn-story-listen" class="btn-sage-soft" type="button">🔊 Nghe lại</button>
              <button id="btn-story-speak" class="btn-primary-soft" type="button">🎤 Bé nhắc lại</button>
            `
                : `
              <button id="btn-story-intro" class="btn-sage-soft" type="button">🔊 Nghe Gấu kể</button>
            `
            }
          </div>
        </div>

        ${
          allFound
            ? `
          <div class="listen-celebration-bar">
            <span class="listen-celebration-msg">🌟 Tuyệt vời! Bé đã khám phá hết bức tranh “${story.title}” rồi!</span>
            <button id="btn-next-story" class="btn-sage-soft" type="button">Xem tranh tiếp theo →</button>
          </div>
        `
            : ''
        }
      </section>
    `;

    if (playIntro) {
      speakText(story.introVoice);
    }

    container.querySelector('#btn-back-stories').addEventListener('click', () => {
      playSfx('tap');
      activeStoryId = null;
      renderPicker();
    });

    const introBtn = container.querySelector('#btn-story-intro');
    if (introBtn) {
      introBtn.addEventListener('click', () => {
        playSfx('warm');
        speakText(story.introVoice);
      });
    }

    container.querySelectorAll('.scene-hotspot').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const hs = story.hotspots.find((h) => h.id === btn.dataset.hotspot);
        if (!hs) return;
        const wasNew = !foundHotspots.has(hs.id);
        foundHotspots.add(hs.id);
        selectedHotspotId = hs.id;

        playSfx(hs.sfx);
        const line = hs.lines[loadState().ageStage] || hs.lines['18-24'];
        setTimeout(() => speakText(line), 240);

        spawnStars(e.clientX || window.innerWidth / 2, e.clientY || 220, wasNew ? 6 : 3);
        if (wasNew && foundHotspots.size === story.hotspots.length) {
          setTimeout(() => playSfx('celebrate'), 1600);
        }
        renderStoryScene(false);
      });
    });

    const listenBtn = container.querySelector('#btn-story-listen');
    if (listenBtn && selected) {
      listenBtn.addEventListener('click', () => {
        playSfx(selected.sfx);
        const line = selected.lines[loadState().ageStage] || selected.lines['18-24'];
        setTimeout(() => speakText(line), 200);
      });
    }

    const speakBtn = container.querySelector('#btn-story-speak');
    const promptLine = container.querySelector('#story-prompt-line');
    if (speakBtn && selected) {
      speakBtn.addEventListener('click', async () => {
        if (activeListener) {
          activeListener.stopEarly();
          return;
        }
        speakBtn.textContent = '🎤 Đang nghe...';
        if (promptLine) promptLine.textContent = `Gấu đang lắng nghe bé nói "${selected.word}" nè...`;

        activeListener = await startToddlerListening({
          targetWord: selected.word,
          echoEnabled: loadState().echoEnabled,
          durationMs: 3200,
          onComplete: ({ heardSound, error }) => {
            activeListener = null;
            speakBtn.textContent = '🎤 Bé nhắc lại';
            if (error) {
              if (promptLine) promptLine.textContent = error;
              return;
            }
            if (heardSound) {
              playSfx('celebrate');
              spawnStars(window.innerWidth / 2, 260, 8);
              if (promptLine) {
                promptLine.textContent = `🌟 Giỏi quá bé yêu! Bé nhắc lại thật dễ thương!`;
              }
            } else if (promptLine) {
              promptLine.textContent = `Bé bấm Nghe lại rồi nói cùng ba mẹ nhé!`;
            }
          }
        });
      });
    }

    const nextStoryBtn = container.querySelector('#btn-next-story');
    if (nextStoryBtn) {
      nextStoryBtn.addEventListener('click', () => {
        playSfx('tap');
        const idx = DAILY_STORIES.findIndex((s) => s.id === story.id);
        const next = DAILY_STORIES[(idx + 1) % DAILY_STORIES.length];
        activeStoryId = next.id;
        selectedHotspotId = null;
        foundHotspots = new Set();
        renderStoryScene(true);
      });
    }
  }

  renderPicker();

  return () => {
    stopMic();
    stopSpeaking();
  };
}
