/**
 * Truyện Cổ Tích Đặc Sắc (< 10 phút) View
 * - Thư viện 16 truyện cổ tích Việt Nam & thế giới đọc dưới 10 phút
 * - Giọng kể tự nhiên theo câu & thoại, hỗ trợ chọn giọng Neural/AI (OpenAI, Google Neural2, ElevenLabs)
 * - Thu âm giọng Ba Mẹ trực tiếp từng trang (lưu offline trong IndexedDB)
 * - Nhạc nền hộp nhạc ru ngủ thì thầm + Chế độ Đêm Êm Dịu cho giờ đi ngủ.
 */

import { FAIRYTALE_FILTERS, FAIRY_TALES } from '../data/fairytales.js';
import { getShortPage } from '../data/fairytalesShort.js';
import {
  deleteParentRecording,
  getAiApiKey,
  getParentRecording,
  loadState,
  saveAiApiKey,
  markFairyTaleRead,
  saveParentRecording,
  saveState
} from '../services/storage.js';
import {
  resetAiVoiceSession,
  AI_VOICE_PRESETS,
  getActiveVoiceInfo,
  getLastAiVoiceError,
  getVietnameseVoices,
  isAmbientLullabyPlaying,
  playBlob,
  playSfx,
  scoreVietnameseVoice,
  speakNaturalParagraph,
  speakText,
  startAmbientLullaby,
  stopAmbientLullaby,
  stopSpeaking
} from '../services/audio.js';
import { startParentRecording, startToddlerListening, stopActiveListening } from '../services/voice.js';

const STORY_RATES = [
  { value: 0.86, label: 'Chậm dịu' },
  { value: 0.94, label: 'Tự nhiên' },
  { value: 1.02, label: 'Hơi nhanh' }
];

function waitMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pageRecordingKey(storyId, idx) {
  return `ft_${storyId}_p${idx}`;
}

export function renderFairyTalesView(container, { spawnStars, showToast, params = {} }) {
  let activeFilter = FAIRYTALE_FILTERS.some((f) => f.id === params.filter) ? params.filter : 'all';
  let activeStoryId = FAIRY_TALES.some((s) => s.id === params.storyId) ? params.storyId : null;
  let pageIndex = 0;
  let isReading = false;
  let isAutoPlay = false;
  let activeParaIdx = -1;
  let narrationToken = 0;
  let activeListener = null;
  let activeParentRecorder = null;
  let isRecordingPage = false;
  let showVoicePanel = false;

  const stopMic = () => {
    stopActiveListening();
    activeListener = null;
  };

  const stopPageRecorder = () => {
    if (activeParentRecorder) {
      activeParentRecorder.stop();
      activeParentRecorder = null;
    }
    isRecordingPage = false;
  };

  const stopNarration = () => {
    narrationToken += 1;
    isReading = false;
    isAutoPlay = false;
    activeParaIdx = -1;
    stopSpeaking();
  };

  /** Bản kể ngắn: mặc định bật cho bé 18–30 tháng, Ba Mẹ có thể đổi */
  function isShortMode() {
    const st = loadState();
    return st.fairyShortMode ?? st.ageStage !== '30-36';
  }

  function pageParagraphs(story, idx) {
    const page = story.pages[idx];
    if (!page) return [];
    return (isShortMode() && getShortPage(story.id, idx)) || page.paragraphs;
  }

  function getStoryById(id) {
    return FAIRY_TALES.find((s) => s.id === id) || FAIRY_TALES[0];
  }

  function getFilteredStories(filterId = activeFilter) {
    if (filterId === 'vietnam') return FAIRY_TALES.filter((s) => s.origin === 'vietnam');
    if (filterId === 'world') return FAIRY_TALES.filter((s) => s.origin === 'world');
    if (filterId === 'bedtime') return FAIRY_TALES.filter((s) => s.bedtimeFriendly);
    return FAIRY_TALES;
  }

  function updateParagraphHighlight(idx) {
    activeParaIdx = idx;
    container.querySelectorAll('.ft-para').forEach((el) => {
      const pIdx = Number(el.dataset.para);
      el.classList.toggle('is-speaking', pIdx === idx);
    });
  }

  function updatePlaybackButtons() {
    const readPageBtn = container.querySelector('#btn-ft-read-page');
    const autoPlayBtn = container.querySelector('#btn-ft-autoplay');
    if (readPageBtn) {
      readPageBtn.textContent = isReading && !isAutoPlay ? '⏹ Dừng đọc' : '🔊 Đọc trang này';
      readPageBtn.classList.toggle('is-active-read', isReading && !isAutoPlay);
    }
    if (autoPlayBtn) {
      autoPlayBtn.textContent = isAutoPlay ? '⏸ Dừng kể tự động' : '▶️ Kể trọn truyện';
      autoPlayBtn.classList.toggle('is-active-read', isAutoPlay);
    }
  }

  async function narratePage(story, startPara = 0, autoContinue = false) {
    stopMic();
    stopPageRecorder();
    narrationToken += 1;
    const myToken = narrationToken;

    isReading = true;
    isAutoPlay = autoContinue;
    updatePlaybackButtons();

    const page = story.pages[pageIndex];
    if (!page) {
      stopNarration();
      return;
    }

    const stillActive = () => myToken === narrationToken;

    // 1. Ưu tiên giọng thu âm thật của Ba Mẹ cho trang này nếu bắt đầu từ đầu trang!
    //    (bản thu là bản đầy đủ nên chỉ dùng khi đang kể đầy đủ)
    const paragraphs = pageParagraphs(story, pageIndex);
    if (startPara === 0 && !isShortMode()) {
      const parentBlob = await getParentRecording(pageRecordingKey(story.id, pageIndex));
      if (!stillActive()) return;
      if (parentBlob) {
        playSfx(page.sfx || 'warm');
        await waitMs(280);
        if (!stillActive()) return;
        updateParagraphHighlight(0);
        await playBlob(parentBlob);
        if (!stillActive()) return;
        updateParagraphHighlight(-1);

        if (autoContinue) {
          await advanceAutoStory(story, myToken);
          return;
        }
        isReading = false;
        isAutoPlay = false;
        updatePlaybackButtons();
        return;
      }

      playSfx(page.sfx || 'warm');
      await waitMs(300);
      if (!stillActive()) return;
    }

    // 2. Kể tự nhiên theo từng câu & câu thoại (hoặc Giọng AI Neural nếu đã bật)
    const rate = loadState().fairyStoryRate || 0.94;
    if (startPara === 0 && isShortMode()) {
      playSfx(page.sfx || 'warm');
      await waitMs(300);
      if (!stillActive()) return;
    }
    for (let i = startPara; i < paragraphs.length; i++) {
      if (!stillActive()) return;
      updateParagraphHighlight(i);
      const ok = await speakNaturalParagraph(paragraphs[i], {
        rateOverride: rate,
        shouldContinue: stillActive
      });
      if (!stillActive()) return;
      if (!ok && !('speechSynthesis' in window)) {
        if (showToast) {
          showToast('Thiết bị chưa hỗ trợ giọng đọc tự động — ba mẹ có thể bấm "Ba Mẹ tự đọc" nhé!');
        }
        stopNarration();
        updateParagraphHighlight(-1);
        updatePlaybackButtons();
        return;
      }
      await waitMs(420);
    }

    if (!stillActive()) return;
    updateParagraphHighlight(-1);

    if (autoContinue) {
      await advanceAutoStory(story, myToken);
      return;
    }

    isReading = false;
    isAutoPlay = false;
    updatePlaybackButtons();
  }

  async function advanceAutoStory(story, myToken) {
    if (pageIndex < story.pages.length - 1) {
      await waitMs(580);
      if (myToken !== narrationToken) return;
      playSfx('page');
      pageIndex += 1;
      await renderReader(false);
      narratePage(story, 0, true);
    } else {
      await waitMs(650);
      if (myToken !== narrationToken) return;
      pageIndex = story.pages.length;
      isReading = false;
      isAutoPlay = false;
      await renderReader(true);
    }
  }

  /* ---------- LIBRARY VIEW ---------- */
  function renderLibrary() {
    stopMic();
    stopPageRecorder();
    stopNarration();
    stopAmbientLullaby();

    const state = loadState();
    const readIds = state.readFairyTales || [];
    const list = getFilteredStories();

    container.innerHTML = `
      <section class="fairytales-view" aria-label="Truyện cổ tích đặc sắc">
        <div class="section-header">
          <div>
            <div class="ft-header-row">
              <h1 class="section-title">Truyện cổ tích đặc sắc</h1>
              <span class="ft-under10-pill">⏱ Đọc dưới 10 phút</span>
            </div>
            <p class="section-sub">${FAIRY_TALES.length} câu chuyện kinh điển Việt Nam & thế giới kể lại dịu dàng, giọng đọc tự nhiên theo nhịp thở và thu âm giọng Ba Mẹ.</p>
          </div>
          <span class="focus-counter">Đã nghe ${readIds.length}/${FAIRY_TALES.length} truyện</span>
        </div>

        <div class="category-tabs" role="tablist" aria-label="Lọc truyện cổ tích">
          ${FAIRYTALE_FILTERS.map((f) => {
            const count = getFilteredStories(f.id).length;
            return `
            <button
              type="button"
              role="tab"
              aria-selected="${f.id === activeFilter}"
              class="category-tab ${f.id === activeFilter ? 'is-active' : ''}"
              data-filter="${f.id}"
            >
              <span aria-hidden="true">${f.icon}</span>
              <span>${f.label} (${count})</span>
            </button>
          `;
          }).join('')}
        </div>

        <div class="ft-library-grid">
          ${list
            .map((story) => {
              const isRead = readIds.includes(story.id);
              return `
              <button type="button" class="ft-card" data-story="${story.id}">
                <div class="ft-card__media">
                  <img src="${story.image}" alt="${story.title}" class="ft-card__img" loading="lazy" />
                  <span class="ft-badge ft-badge--time">⏱ ~${story.readMinutes} phút</span>
                  <span class="ft-badge ft-badge--origin ${isRead ? 'is-done' : ''}">
                    ${isRead ? '✓ Đã nghe' : story.originLabel}
                  </span>
                </div>
                <div class="ft-card__body">
                  <h2 class="ft-card__title">${story.title}</h2>
                  <p class="ft-card__hook">${story.hook}</p>
                  <div class="ft-card__meta">
                    <span class="ft-meta-chip" style="background:${story.themeColor}; color:${story.accentColor};">${story.moralTag}</span>
                    <span class="ft-meta-pages">${story.pages.length} trang${story.bedtimeFriendly ? ' · 🌙 Giờ ngủ' : ''}</span>
                  </div>
                </div>
              </button>
            `;
            })
            .join('')}
        </div>
      </section>
    `;

    container.querySelectorAll('.category-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        playSfx('tap');
        activeFilter = tab.dataset.filter;
        renderLibrary();
      });
    });

    container.querySelectorAll('.ft-card').forEach((card) => {
      card.addEventListener('click', () => {
        playSfx('page');
        activeStoryId = card.dataset.story;
        pageIndex = 0;
        showVoicePanel = false;
        renderReader(false);
      });
    });
  }

  /* ---------- INLINE NATURAL VOICE PANEL HTML ---------- */
  function renderVoicePanelHTML(state) {
    const activeProvider = state.voiceProvider || 'browser';
    const voices = getVietnameseVoices();
    const presets = AI_VOICE_PRESETS[activeProvider] || [];
    const info = getActiveVoiceInfo();

    return `
      <div class="ft-voice-drawer" aria-label="Cài đặt giọng kể tự nhiên">
        <div class="ft-voice-drawer__head">
          <div>
            <strong class="ft-voice-drawer__title">✨ Chọn giọng kể chuyện tự nhiên</strong>
            <p class="ft-voice-drawer__sub">Hiện tại: ${info.label}</p>
          </div>
          <button id="btn-ft-close-voice" type="button" class="small-action-btn">Đóng ✕</button>
        </div>

        <div class="option-pills">
          <button type="button" class="option-pill ${activeProvider === 'browser' ? 'is-active' : ''}" data-ft-provider="browser">🔊 Giọng thiết bị (Miễn phí)</button>
          <button type="button" class="option-pill ${activeProvider === 'google' ? 'is-active' : ''}" data-ft-provider="google">⭐ Google Cloud TTS (Chirp 3 HD)</button>
          <button type="button" class="option-pill ${activeProvider === 'openai' ? 'is-active' : ''}" data-ft-provider="openai">✨ AI OpenAI</button>
          <button type="button" class="option-pill ${activeProvider === 'elevenlabs' ? 'is-active' : ''}" data-ft-provider="elevenlabs">✨ AI ElevenLabs</button>
        </div>

        ${
          activeProvider === 'browser'
            ? `
          <div class="ft-voice-drawer__row">
            <select id="ft-voice-select" class="styled-select">
              <option value="">Tự động chọn giọng tiếng Việt hay nhất</option>
              ${voices
                .map((v) => {
                  const sc = scoreVietnameseVoice(v);
                  const tag = sc >= 140 ? '⭐ Rất tự nhiên' : sc >= 110 ? '✓ Tự nhiên' : 'Cơ bản';
                  return `<option value="${v.voiceURI}" ${state.selectedVoiceURI === v.voiceURI ? 'selected' : ''}>${v.name} — ${tag}</option>`;
                })
                .join('')}
            </select>
            <button id="btn-ft-test-voice" type="button" class="small-action-btn">🔊 Nghe thử</button>
          </div>
          <p class="ft-voice-tip">
            💡 <strong>Mẹo miễn phí giọng đọc truyền cảm như người thật:</strong> Mở trên <strong>Microsoft Edge</strong> (có sẵn giọng AI <em>Hoài My Natural</em> / <em>Nam Minh Natural</em>) hoặc chọn <strong>⭐ Google Cloud TTS (Chirp 3 HD)</strong> (miễn phí 1 triệu ký tự/tháng)!
          </p>
        `
            : `
          <div class="ft-voice-drawer__row">
            <select id="ft-ai-voice-select" class="styled-select">
              ${presets
                .map(
                  (pr) =>
                    `<option value="${pr.id}" ${state.aiVoiceId === pr.id ? 'selected' : ''}>${pr.label}</option>`
                )
                .join('')}
            </select>
            <button id="btn-ft-test-voice" type="button" class="small-action-btn">🔊 Nghe thử</button>
          </div>
          <div class="ft-voice-drawer__row">
            <input
              id="ft-ai-key"
              type="password"
              class="styled-select"
              placeholder="Dán API Key ${activeProvider === 'google' ? 'Google Cloud TTS (AIza...)' : activeProvider.toUpperCase()}..."
              value="${String(getAiApiKey(state, activeProvider)).replace(/[&"<>]/g, (c) => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[c])}"
              autocomplete="off"
            />
            <button id="btn-ft-save-key" type="button" class="small-action-btn small-action-btn--rec">💾 Lưu khóa</button>
          </div>
          ${
            activeProvider === 'google'
              ? `<p class="ft-voice-tip">⭐ <strong>Google Cloud TTS miễn phí mỗi tháng:</strong> 1 triệu ký tự cho <em>Chirp 3 HD / Neural2</em> và 4 triệu ký tự cho <em>WaveNet</em>. Toàn bộ 16 truyện chỉ ~45.000 ký tự và được tự lưu cache offline sau lần đọc đầu!</p>`
              : ''
          }
        `
        }
      </div>
    `;
  }

  /* ---------- STORYBOOK READER VIEW ---------- */
  async function renderReader(celebrateEnding = false) {
    stopMic();
    const story = getStoryById(activeStoryId);
    const state = loadState();
    const isBedtime = Boolean(state.fairyBedtimeMode);
    const currentRate = state.fairyStoryRate || 0.94;
    const isEnding = pageIndex >= story.pages.length;
    const musicOn = isAmbientLullabyPlaying();
    const voiceInfo = getActiveVoiceInfo();

    if (isEnding) {
      markFairyTaleRead(story.id);
    }

    const page = !isEnding ? story.pages[pageIndex] : null;
    const hasParentPageAudio = page
      ? Boolean(await getParentRecording(pageRecordingKey(story.id, pageIndex)))
      : false;
    const promptForAge = page ? page.parentPrompt[state.ageStage] || page.parentPrompt['18-24'] : '';

    container.innerHTML = `
      <section class="ft-reader ${isBedtime ? 'is-bedtime-mode' : ''}" aria-label="${story.title}">
        <div class="focus-nav-bar ft-reader__topbar">
          <button id="btn-ft-back" class="icon-pill" type="button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            <span>Kho truyện</span>
          </button>

          <div class="ft-reader__top-tools">
            <button
              id="btn-ft-voice-toggle"
              type="button"
              class="ft-mode-btn ${showVoicePanel ? 'is-active' : ''}"
              title="Chọn giọng đọc tự nhiên hoặc giọng AI"
            >
              ${voiceInfo.isNatural ? '✨ Giọng đọc' : '⚠️ Đổi giọng'}
            </button>
            <button
              id="btn-ft-music"
              type="button"
              class="ft-mode-btn ${musicOn ? 'is-active' : ''}"
              aria-pressed="${musicOn}"
              title="Bật/tắt nhạc hộp ru ngủ thì thầm khi kể chuyện"
            >
              ${musicOn ? '🎵 Nhạc: Bật' : '🎵 Nhạc êm'}
            </button>
            <button
              id="btn-ft-bedtime"
              type="button"
              class="ft-mode-btn ${isBedtime ? 'is-active' : ''}"
              aria-pressed="${isBedtime}"
              title="Bật giao diện tối ấm dịu mắt cho giờ đi ngủ"
            >
              ${isBedtime ? '☀️ Sáng dịu' : '🌙 Đêm êm'}
            </button>
            <button
              id="btn-ft-length"
              type="button"
              class="ft-mode-btn ${isShortMode() ? 'is-active' : ''}"
              aria-pressed="${isShortMode()}"
              title="Kể ngắn (câu 3–7 từ) cho bé nhỏ, hoặc kể đầy đủ cho bé lớn"
            >
              ${isShortMode() ? '🧸 Kể ngắn' : '📖 Kể đầy đủ'}
            </button>
          </div>
        </div>

        ${showVoicePanel ? renderVoicePanelHTML(state) : ''}

        <!-- Storybook Progress Dots -->
        <div class="ft-progress-strip" role="navigation" aria-label="Tiến độ trang truyện">
          ${story.pages
            .map(
              (p, idx) => `
              <button
                type="button"
                class="ft-progress-dot ${idx === pageIndex ? 'is-current' : ''} ${idx < pageIndex || isEnding ? 'is-passed' : ''}"
                data-jump-page="${idx}"
                aria-label="Đến trang ${idx + 1}: ${p.title}"
                title="Trang ${idx + 1}: ${p.title}"
              ></button>
            `
            )
            .join('')}
        </div>

        ${
          isEnding
            ? `
          <article class="ft-ending-card">
            <div class="ft-ending-card__art">
              <img src="${story.image}" alt="${story.title}" class="ft-ending-card__img" />
              <span class="ft-ending-star" aria-hidden="true">🌟</span>
            </div>
            <p class="ft-ending-eyebrow">Hoàn thành truyện cổ tích · ⏱ ~${story.readMinutes} phút</p>
            <h1 class="ft-ending-title">Hết truyện “${story.shortTitle}” rồi!</h1>
            <div class="ft-moral-box">
              <span class="ft-moral-box__label">💛 Bài học nhỏ dịu dàng</span>
              <p class="ft-moral-box__text">${story.ending.moral}</p>
            </div>

            <div class="ft-questions-box">
              <span class="ft-questions-box__label">💬 Ba Mẹ thủ thỉ cùng bé nhé</span>
              <ul class="ft-questions-list">
                ${story.ending.questions.map((q) => `<li>${q}</li>`).join('')}
              </ul>
            </div>

            <div class="ft-ending-actions">
              <button id="btn-ft-listen-moral" class="btn-sage-soft" type="button">🔊 Nghe lời nhắn cuối</button>
              <button id="btn-ft-replay" class="nav-big-btn ft-ending-btn" type="button">🔁 Đọc lại từ đầu</button>
              <button id="btn-ft-next-story" class="btn-primary-soft" type="button">📖 Truyện tiếp theo →</button>
            </div>
          </article>
        `
            : `
          <article class="ft-book-card">
            <!-- Story Illustration Banner -->
            <div class="ft-banner">
              <img src="${story.image}" alt="${story.title}" class="ft-banner__img" />
              <div class="ft-banner__overlay">
                <span class="ft-banner__chip">${story.originLabel} · Trang ${pageIndex + 1}/${story.pages.length} · ⏱ ~${story.readMinutes} phút</span>
                <button id="btn-ft-sfx" type="button" class="ft-sfx-btn" aria-label="Nghe âm thanh minh họa của trang này">
                  <span>${page.emoji}</span>
                  <span>Nghe tiếng vui</span>
                </button>
              </div>
            </div>

            <!-- Page Header & Playback Controls -->
            <div class="ft-page-content">
              <div class="ft-page-head">
                <div>
                  <p class="ft-story-kicker">${story.title}</p>
                  <h1 class="ft-page-title">${page.emoji} ${page.title}</h1>
                </div>
              </div>

              <div class="ft-controls-bar">
                <div class="ft-controls-main">
                  <button id="btn-ft-read-page" type="button" class="ft-ctrl-btn ft-ctrl-btn--primary">
                    ${isReading && !isAutoPlay ? '⏹ Dừng đọc' : hasParentPageAudio ? '❤️ Nghe giọng Ba Mẹ' : '🔊 Đọc trang này'}
                  </button>
                  <button id="btn-ft-autoplay" type="button" class="ft-ctrl-btn ft-ctrl-btn--sage">
                    ${isAutoPlay ? '⏸ Dừng kể tự động' : '▶️ Kể trọn truyện'}
                  </button>
                </div>

                <div class="ft-rate-group" role="group" aria-label="Tốc độ kể chuyện">
                  ${STORY_RATES.map(
                    (r) => `
                    <button
                      type="button"
                      class="ft-rate-pill ${Math.abs(currentRate - r.value) < 0.03 ? 'is-active' : ''}"
                      data-rate="${r.value}"
                    >
                      ${r.label}
                    </button>
                  `
                  ).join('')}
                </div>
              </div>

              <!-- Parent Storyteller Recording Strip (Real Human Voice!) -->
              <div class="ft-parent-rec-bar">
                <span class="ft-parent-rec-status">
                  ${
                    isRecordingPage
                      ? '🔴 Đang thu giọng Ba Mẹ đọc trang này... bấm Dừng khi đọc xong!'
                      : hasParentPageAudio
                      ? '❤️ Trang này đã có bản thu âm giọng thật của Ba Mẹ!'
                      : '🎙️ Muốn giọng ấm áp tự nhiên nhất? Ba Mẹ có thể tự đọc lưu cho trang này!'
                  }
                </span>
                <div class="ft-parent-rec-actions">
                  <button
                    id="btn-ft-parent-rec"
                    type="button"
                    class="small-action-btn small-action-btn--rec ${isRecordingPage ? 'is-recording' : ''}"
                  >
                    ${isRecordingPage ? '⏹ Dừng & Lưu' : hasParentPageAudio ? '🎙️ Thu lại' : '🎙️ Ba Mẹ tự đọc'}
                  </button>
                  ${
                    hasParentPageAudio && !isRecordingPage
                      ? `<button id="btn-ft-parent-del" type="button" class="small-action-btn" title="Xóa bản thu trang này">✕ Xóa</button>`
                      : ''
                  }
                </div>
              </div>

              <!-- Story Paragraphs (Tap any paragraph to listen) -->
              <div class="ft-paragraphs" aria-live="polite">
                ${pageParagraphs(story, pageIndex)
                  .map(
                    (para, idx) => `
                    <p
                      class="ft-para ${idx === activeParaIdx ? 'is-speaking' : ''}"
                      data-para="${idx}"
                      role="button"
                      tabindex="0"
                      title="Chạm để nghe đọc từ đoạn này"
                    >${para}</p>
                  `
                  )
                  .join('')}
              </div>

              <!-- Interactive Toddler Speech Box -->
              <aside class="ft-interact-box" aria-label="Góc tương tác tập nói cùng bé">
                <div class="ft-interact-top">
                  <div class="ft-interact-phrase-wrap">
                    <span class="ft-interact-eyebrow">🎵 Câu vui của trang này</span>
                    <button id="btn-ft-fun-phrase" type="button" class="ft-fun-phrase-btn">
                      <span>🔊</span>
                      <span>“${page.funPhrase}”</span>
                    </button>
                  </div>
                  <button id="btn-ft-echo" type="button" class="btn-primary-soft ft-echo-btn">
                    🎤 Bé nhắc theo
                  </button>
                </div>
                <p id="ft-parent-prompt" class="ft-parent-prompt">
                  <strong>Gợi ý Ba Mẹ (${state.ageStage} tháng):</strong> ${promptForAge}
                </p>
              </aside>
            </div>
          </article>

          <!-- Tactile Page Turn Buttons -->
          <div class="focus-prev-next">
            <button id="btn-ft-prev" class="nav-big-btn" type="button" ${pageIndex === 0 ? 'disabled' : ''}>
              ← Trang trước
            </button>
            <button id="btn-ft-next" class="nav-big-btn ft-next-btn" type="button">
              ${pageIndex === story.pages.length - 1 ? '✨ Kết truyện & Bài học →' : 'Trang tiếp →'}
            </button>
          </div>
        `
        }
      </section>
    `;

    if (isEnding && celebrateEnding) {
      playSfx('celebrate');
      spawnStars(window.innerWidth / 2, 220, 12);
      setTimeout(() => {
        speakNaturalParagraph(`Hết truyện ${story.shortTitle} rồi! ${story.ending.moral}`, {
          rateOverride: currentRate
        });
      }, 450);
    }

    /* ---------- Wire Reader Top Bar Events ---------- */
    container.querySelector('#btn-ft-back').addEventListener('click', () => {
      playSfx('tap');
      activeStoryId = null;
      renderLibrary();
    });

    container.querySelector('#btn-ft-voice-toggle').addEventListener('click', () => {
      playSfx('tap');
      showVoicePanel = !showVoicePanel;
      renderReader(false);
    });

    container.querySelector('#btn-ft-music').addEventListener('click', () => {
      playSfx('tap');
      if (isAmbientLullabyPlaying()) {
        stopAmbientLullaby();
        if (showToast) showToast('Đã tắt nhạc nền hộp nhạc.');
      } else {
        startAmbientLullaby();
        if (showToast) showToast('Đã bật nhạc hộp ru êm dịu.');
      }
      const musicBtn = container.querySelector('#btn-ft-music');
      const nowOn = isAmbientLullabyPlaying();
      if (musicBtn) {
        musicBtn.classList.toggle('is-active', nowOn);
        musicBtn.setAttribute('aria-pressed', String(nowOn));
        musicBtn.textContent = nowOn ? '🎵 Nhạc: Bật' : '🎵 Nhạc êm';
      }
    });

    container.querySelector('#btn-ft-length').addEventListener('click', () => {
      stopNarration();
      stopPageRecorder();
      const next = !isShortMode();
      saveState({ fairyShortMode: next });
      playSfx('page');
      if (showToast) showToast(next ? 'Kể ngắn cho bé nhỏ: câu ngắn, dễ nhắc theo.' : 'Kể đầy đủ cho bé lớn.');
      renderReader(false);
    });

    container.querySelector('#btn-ft-bedtime').addEventListener('click', () => {
      playSfx('tap');
      const nextMode = !loadState().fairyBedtimeMode;
      saveState({ fairyBedtimeMode: nextMode });
      const readerEl = container.querySelector('.ft-reader');
      const btn = container.querySelector('#btn-ft-bedtime');
      if (readerEl) readerEl.classList.toggle('is-bedtime-mode', nextMode);
      if (btn) {
        btn.classList.toggle('is-active', nextMode);
        btn.setAttribute('aria-pressed', String(nextMode));
        btn.textContent = nextMode ? '☀️ Sáng dịu' : '🌙 Đêm êm';
      }
      if (showToast) {
        showToast(nextMode ? 'Đã bật chế độ Đêm Êm Dịu cho giờ đi ngủ.' : 'Đã chuyển về chế độ Sáng Dịu.');
      }
    });

    /* ---------- Wire Inline Natural Voice Drawer Events ---------- */
    if (showVoicePanel) {
      container.querySelector('#btn-ft-close-voice')?.addEventListener('click', () => {
        playSfx('tap');
        showVoicePanel = false;
        renderReader(false);
      });

      container.querySelectorAll('[data-ft-provider]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const provider = btn.dataset.ftProvider;
          const firstPreset = AI_VOICE_PRESETS[provider]?.[0]?.id || 'nova';
          playSfx('tap');
          saveState({
            voiceProvider: provider,
            aiVoiceId: AI_VOICE_PRESETS[provider] ? firstPreset : loadState().aiVoiceId
          });
          renderReader(false);
        });
      });

      container.querySelector('#ft-voice-select')?.addEventListener('change', (e) => {
        saveState({ selectedVoiceURI: e.target.value });
        if (showToast) showToast('Đã đổi giọng đọc tiếng Việt.');
        renderReader(false);
      });

      container.querySelector('#ft-ai-voice-select')?.addEventListener('change', (e) => {
        saveState({ aiVoiceId: e.target.value });
        if (showToast) showToast('Đã đổi giọng AI kể chuyện.');
      });

      container.querySelector('#btn-ft-save-key')?.addEventListener('click', () => {
        const keyVal = (container.querySelector('#ft-ai-key')?.value || '').trim();
        saveAiApiKey(loadState().voiceProvider, keyVal);
        resetAiVoiceSession();
        playSfx('celebrate');
        if (showToast) showToast(keyVal ? 'Đã lưu API Key giọng AI tự nhiên!' : 'Đã xóa API Key.');
        renderReader(false);
      });

      container.querySelector('#btn-ft-test-voice')?.addEventListener('click', async () => {
        stopNarration();
        await speakNaturalParagraph(
          'Ngày xửa ngày xưa, ở một ngôi làng nhỏ yên bình, ông mặt trời mỉm cười chiếu nắng vàng ấm áp xuống khu vườn cổ tích!'
        );
        const err = getLastAiVoiceError();
        if (err && showToast) showToast(`⚠️ ${err}`);
      });
    }

    container.querySelectorAll('.ft-progress-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIdx = Number(dot.dataset.jumpPage);
        if (targetIdx === pageIndex) return;
        stopNarration();
        stopPageRecorder();
        playSfx('page');
        pageIndex = targetIdx;
        renderReader(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    if (isEnding) {
      container.querySelector('#btn-ft-listen-moral').addEventListener('click', () => {
        playSfx('warm');
        speakNaturalParagraph(`${story.ending.moral} ${story.ending.questions[0]}`, {
          rateOverride: currentRate
        });
      });

      container.querySelector('#btn-ft-replay').addEventListener('click', () => {
        stopNarration();
        playSfx('page');
        pageIndex = 0;
        renderReader(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      container.querySelector('#btn-ft-next-story').addEventListener('click', () => {
        stopNarration();
        playSfx('page');
        const idx = FAIRY_TALES.findIndex((s) => s.id === story.id);
        const nextStory = FAIRY_TALES[(idx + 1) % FAIRY_TALES.length];
        activeStoryId = nextStory.id;
        pageIndex = 0;
        renderReader(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      return;
    }

    // SFX preview button on illustration
    container.querySelector('#btn-ft-sfx').addEventListener('click', (e) => {
      playSfx(page.sfx || 'sparkle');
      spawnStars(e.clientX || window.innerWidth / 2, e.clientY || 200, 5);
    });

    // Read current page button
    container.querySelector('#btn-ft-read-page').addEventListener('click', () => {
      if (isReading && !isAutoPlay) {
        stopNarration();
        updateParagraphHighlight(-1);
        updatePlaybackButtons();
        return;
      }
      narratePage(story, 0, false);
    });

    // Auto-play full story button
    container.querySelector('#btn-ft-autoplay').addEventListener('click', () => {
      if (isAutoPlay) {
        stopNarration();
        updateParagraphHighlight(-1);
        updatePlaybackButtons();
        return;
      }
      narratePage(story, 0, true);
    });

    // Parent Storyteller Per-Page Recorder
    container.querySelector('#btn-ft-parent-rec').addEventListener('click', async () => {
      if (isRecordingPage && activeParentRecorder) {
        activeParentRecorder.stop();
        return;
      }
      stopNarration();
      stopMic();

      isRecordingPage = true;
      await renderReader(false);

      const recKey = pageRecordingKey(story.id, pageIndex);
      activeParentRecorder = await startParentRecording({
        maxMs: 90000,
        onDone: async ({ blob, error }) => {
          activeParentRecorder = null;
          isRecordingPage = false;
          if (error) {
            if (showToast) showToast(error);
            renderReader(false);
            return;
          }
          if (blob) {
            await saveParentRecording(recKey, blob);
            playSfx('celebrate');
            if (showToast) showToast('Đã lưu giọng kể ấm áp của Ba Mẹ cho trang này!');
          }
          renderReader(false);
        }
      });

      if (!activeParentRecorder) {
        isRecordingPage = false;
        renderReader(false);
      }
    });

    container.querySelector('#btn-ft-parent-del')?.addEventListener('click', async () => {
      await deleteParentRecording(pageRecordingKey(story.id, pageIndex));
      playSfx('tap');
      if (showToast) showToast('Đã xóa bản thu âm trang này.');
      renderReader(false);
    });

    // Speed pills
    container.querySelectorAll('.ft-rate-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        const nextRate = Number(pill.dataset.rate);
        playSfx('tap');
        saveState({ fairyStoryRate: nextRate });
        container.querySelectorAll('.ft-rate-pill').forEach((p) => {
          p.classList.toggle('is-active', p === pill);
        });
        if (showToast) showToast(`Tốc độ kể chuyện: ${pill.textContent.trim()}.`);
      });
    });

    // Tap any paragraph to read from that paragraph
    container.querySelectorAll('.ft-para').forEach((paraEl) => {
      const triggerRead = () => {
        const idx = Number(paraEl.dataset.para);
        narratePage(story, idx, isAutoPlay);
      };
      paraEl.addEventListener('click', triggerRead);
      paraEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerRead();
        }
      });
    });

    // Fun phrase playback
    container.querySelector('#btn-ft-fun-phrase').addEventListener('click', (e) => {
      stopNarration();
      updateParagraphHighlight(-1);
      updatePlaybackButtons();
      playSfx(page.sfx || 'sparkle');
      spawnStars(e.clientX || window.innerWidth / 2, e.clientY || 320, 4);
      setTimeout(() => {
        speakText(page.funPhrase, { rateOverride: currentRate, pitch: 1.02 });
      }, 220);
    });

    // Toddler echo / speech interaction
    const echoBtn = container.querySelector('#btn-ft-echo');
    const promptEl = container.querySelector('#ft-parent-prompt');
    echoBtn.addEventListener('click', async () => {
      if (activeListener) {
        activeListener.stopEarly();
        return;
      }
      stopNarration();
      updateParagraphHighlight(-1);
      updatePlaybackButtons();

      echoBtn.textContent = '🎤 Đang nghe...';
      if (promptEl) {
        promptEl.innerHTML = `<strong>Gấu đang lắng nghe bé nói “${page.echoWord}” nè...</strong>`;
      }

      activeListener = await startToddlerListening({
        targetWord: page.echoWord,
        echoEnabled: loadState().echoEnabled,
        durationMs: 3200,
        onComplete: ({ heardSound, error }) => {
          activeListener = null;
          echoBtn.textContent = '🎤 Bé nhắc theo';
          if (error) {
            if (promptEl) promptEl.textContent = error;
            return;
          }
          if (heardSound) {
            playSfx('celebrate');
            spawnStars(window.innerWidth / 2, 320, 9);
            if (promptEl) {
              promptEl.innerHTML = `<strong>🌟 Giỏi quá bé yêu!</strong> Bé kể chuyện cùng ba mẹ thật đáng yêu!`;
            }
          } else if (promptEl) {
            promptEl.innerHTML = `<strong>Gợi ý Ba Mẹ (${state.ageStage} tháng):</strong> ${promptForAge}`;
          }
        }
      });
    });

    // Prev / Next Page Buttons
    container.querySelector('#btn-ft-prev').addEventListener('click', () => {
      if (pageIndex <= 0) return;
      stopNarration();
      stopPageRecorder();
      playSfx('page');
      pageIndex -= 1;
      renderReader(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    container.querySelector('#btn-ft-next').addEventListener('click', () => {
      stopNarration();
      stopPageRecorder();
      const goingToEnding = pageIndex === story.pages.length - 1;
      playSfx(goingToEnding ? 'celebrate' : 'page');
      pageIndex += 1;
      renderReader(goingToEnding);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (activeStoryId) {
    renderReader(false).then(() => {
      if (params.autoPlay) narratePage(getStoryById(activeStoryId), 0, true);
    });
  } else {
    renderLibrary();
  }

  return () => {
    stopMic();
    stopPageRecorder();
    stopNarration();
    stopAmbientLullaby();
  };
}
