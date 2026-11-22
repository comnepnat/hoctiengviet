/**
 * Home View — Trang chủ nhẹ nhàng, ít kích thích, dễ chạm cho bé 18–36 tháng
 */

import { AGE_STAGES, getStageMeta } from '../data/curriculum.js';
import { DAILY_PARENT_TIPS } from '../data/parentTips.js';
import { loadState, saveState } from '../services/storage.js';
import { playSfx, speakText, stopSpeaking } from '../services/audio.js';
import { parseIntent, NL_SUGGESTIONS } from '../services/intent.js';
import { isCommandListeningSupported, listenForCommand, stopActiveListening } from '../services/voice.js';

const GREETINGS = [
  'Chào bé yêu! Hôm nay mình cùng tập nói nhé!',
  'Gấu Mây chào bé! Bé muốn đọc sách tranh hay nghe chuyện nào?',
  'Chào bạn nhỏ dễ thương! Chạm vào thẻ để nghe Gấu nói nhé!'
];

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export function renderHomeView(container, helpers) {
  const { navigate, onStageChanged, spawnStars, showToast, openParentGate } = helpers;
  const state = loadState();
  const micSupported = isCommandListeningSupported();
  const suggestions = [...NL_SUGGESTIONS].sort(() => Math.random() - 0.5).slice(0, 4);
  const stage = getStageMeta(state.ageStage);
  const tipIndex = state.dailyTipIndex % DAILY_PARENT_TIPS.length;
  const tip = DAILY_PARENT_TIPS[tipIndex];

  container.innerHTML = `
    <section class="home-view" aria-label="Trang chủ Bi Bô">
      <div class="hero-welcome">
        <button id="mascot-greet-btn" class="hero-welcome__avatar-btn" type="button" aria-label="Chạm vào Bạn Gấu Mây để nghe lời chào">
          <img src="./assets/images/mascot-bear.jpg" alt="Bạn Gấu Mây vẫy tay chào bé" class="hero-welcome__img" />
          <span class="hero-welcome__tap-hint" aria-hidden="true">🔊</span>
        </button>

        <div class="hero-welcome__content">
          <h1 class="hero-welcome__title">Chào bé yêu! Mình cùng tập nói nhé</h1>
          <p class="hero-welcome__subtitle">Chạm vào Bạn Gấu hoặc chọn một hoạt động bên dưới. Học chậm rãi, tự nhiên cùng ba mẹ mỗi ngày.</p>
          <div class="hero-welcome__chips" role="group" aria-label="Chọn giai đoạn độ tuổi">
            ${AGE_STAGES.map(
              (s) => `
              <button
                type="button"
                class="quick-stage-btn ${s.id === state.ageStage ? 'is-active' : ''}"
                data-stage="${s.id}"
                aria-pressed="${s.id === state.ageStage}"
              >
                ${s.label} · ${s.shortTitle}
              </button>
            `
            ).join('')}
          </div>
        </div>
      </div>

      <form id="ask-bear-form" class="ask-bear" role="search" aria-label="Hỏi Gấu Mây bằng lời nói tự nhiên" autocomplete="off">
        <label for="ask-bear-input" class="ask-bear__label">💬 Hỏi Gấu Mây — gõ hoặc nói tự nhiên</label>
        <div class="ask-bear__row">
          <input
            id="ask-bear-input"
            class="ask-bear__input"
            type="text"
            inputmode="text"
            enterkeyhint="send"
            maxlength="160"
            placeholder="Vd: kể chuyện Cây Khế"
          />
          ${
            micSupported
              ? `<button id="ask-bear-mic" class="ask-bear__mic" type="button" aria-label="Nói với Gấu Mây">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="9" y="3" width="6" height="11" rx="3"/>
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>
                  </svg>
                </button>`
              : ''
          }
          <button class="ask-bear__send" type="submit" aria-label="Gửi cho Gấu Mây">Gửi</button>
        </div>
        <div class="ask-bear__chips" role="group" aria-label="Câu gợi ý">
          ${suggestions
            .map((sug) => `<button type="button" class="ask-bear__chip" data-suggest="${escapeHtml(sug)}">${escapeHtml(sug)}</button>`)
            .join('')}
        </div>
        <p id="ask-bear-reply" class="ask-bear__reply" role="status" aria-live="polite" hidden></p>
      </form>

      <div class="activity-grid">
        <button id="door-cards" class="activity-door activity-door--cards" type="button">
          <div class="activity-door__icon" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v24a3 3 0 0 0-3-3H6V10Z"/>
              <path d="M34 10a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v24a3 3 0 0 1 3-3h13V10Z"/>
            </svg>
          </div>
          <h2 class="activity-door__title">Sách tranh biết nói</h2>
          <p class="activity-door__desc">30 thẻ hình gần gũi có âm thanh sinh động và thu âm giọng bé nói theo.</p>
          <span class="activity-door__cta">Mở sách tranh →</span>
        </button>

        <button id="door-listen" class="activity-door activity-door--listen" type="button">
          <div class="activity-door__icon" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="19" cy="19" r="11"/>
              <path d="m27 27 7 7"/>
              <path d="M15 17a4 4 0 0 1 8 0c0 2.5-4 3-4 5"/>
              <circle cx="19" cy="25" r="0.8" fill="currentColor"/>
            </svg>
          </div>
          <h2 class="activity-door__title">Nghe & Tìm bạn</h2>
          <p class="activity-door__desc">Nghe câu hỏi nhẹ nhàng và chạm đúng hình (${stage.quizChoices} lựa chọn phù hợp độ tuổi).</p>
          <span class="activity-door__cta">Cùng chơi nhé →</span>
        </button>

        <button id="door-stories" class="activity-door activity-door--stories" type="button">
          <div class="activity-door__icon" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="20" cy="14" r="6"/>
              <path d="M20 4v2M20 22v2M10 14H8M32 14h-2M12.9 6.9l1.4 1.4M25.7 19.7l1.4 1.4M27.1 6.9l-1.4 1.4M14.3 19.7l-1.4 1.4"/>
              <path d="M6 31c4-4 9-5 14-5s10 1 14 5"/>
            </svg>
          </div>
          <h2 class="activity-door__title">Chuyện nhỏ mỗi ngày</h2>
          <p class="activity-door__desc">4 bức tranh màu nước tương tác: buổi sáng, công viên, giờ ăn và đi ngủ.</p>
          <span class="activity-door__cta">Khám phá tranh →</span>
        </button>

        <button id="door-fairytales" class="activity-door activity-door--fairytales" type="button">
          <span class="activity-door__pill">⏱ Dưới 10 phút</span>
          <div class="activity-door__icon" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M27.5 24.5A11 11 0 1 1 15.5 7.5a8.5 8.5 0 0 0 12 17Z"/>
              <path d="M29 9l1.2 2.8L33 13l-2.8 1.2L29 17l-1.2-2.8L25 13l2.8-1.2L29 9Z"/>
            </svg>
          </div>
          <h2 class="activity-door__title">Truyện cổ tích đặc sắc</h2>
          <p class="activity-door__desc">16 truyện cổ tích Việt Nam & thế giới đọc dưới 10 phút, giọng kể tự nhiên, nhạc ru êm dịu & thu giọng Ba Mẹ.</p>
          <span class="activity-door__cta">Nghe cổ tích hay →</span>
        </button>
      </div>

      <aside class="daily-tip-strip" aria-label="Mẹo nhỏ cho Ba Mẹ">
        <div class="daily-tip-strip__body">
          <span class="daily-tip-strip__eyebrow">Mẹo đồng hành cho Ba Mẹ · ${tip.title}</span>
          <p class="daily-tip-strip__text">${tip.desc}</p>
        </div>
        <button id="btn-next-tip" class="daily-tip-strip__next" type="button">Mẹo khác →</button>
      </aside>
    </section>
  `;

  // Chạm vào Bạn Gấu để nghe lời chào ấm áp
  const mascotBtn = container.querySelector('#mascot-greet-btn');
  mascotBtn.addEventListener('click', (e) => {
    mascotBtn.classList.remove('is-talking');
    void mascotBtn.offsetWidth;
    mascotBtn.classList.add('is-talking');
    playSfx('warm');
    const line = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    speakText(line);
    spawnStars(e.clientX || window.innerWidth / 2, e.clientY || 160, 4);
  });

  // Đổi nhanh giai đoạn tuổi
  container.querySelectorAll('.quick-stage-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextStage = btn.dataset.stage;
      playSfx('tap');
      saveState({ ageStage: nextStage });
      onStageChanged(nextStage);
      renderHomeView(container, helpers);
    });
  });

  // 4 cánh cửa hoạt động
  container.querySelector('#door-cards').addEventListener('click', () => {
    playSfx('tap');
    navigate('cards');
  });

  container.querySelector('#door-listen').addEventListener('click', () => {
    playSfx('tap');
    navigate('listen');
  });

  container.querySelector('#door-stories').addEventListener('click', () => {
    playSfx('tap');
    navigate('stories');
  });

  container.querySelector('#door-fairytales').addEventListener('click', () => {
    playSfx('tap');
    navigate('fairytales');
  });

  // Xem mẹo tiếp theo
  container.querySelector('#btn-next-tip').addEventListener('click', () => {
    playSfx('tap');
    saveState({ dailyTipIndex: (tipIndex + 1) % DAILY_PARENT_TIPS.length });
    renderHomeView(container, helpers);
  });

  /* ---------- Hỏi Gấu Mây: nhập ngôn ngữ tự nhiên ---------- */
  const askForm = container.querySelector('#ask-bear-form');
  const askInput = container.querySelector('#ask-bear-input');
  const askReply = container.querySelector('#ask-bear-reply');
  const askMic = container.querySelector('#ask-bear-mic');
  let micSession = null;
  let navTimer = null;

  const showReply = (text, { speak = true } = {}) => {
    askReply.hidden = false;
    askReply.textContent = text;
    if (speak) speakText(text);
  };

  const ROUTES = {
    fairytale: 'fairytales',
    'fairytale-list': 'fairytales',
    cards: 'cards',
    vocab: 'cards',
    scene: 'stories',
    'scene-list': 'stories',
    listen: 'listen'
  };

  const runCommand = (text) => {
    const intent = parseIntent(text);
    clearTimeout(navTimer);
    playSfx('tap');

    if (intent.type === 'stop') {
      stopSpeaking();
      showReply(intent.reply, { speak: false });
      return;
    }
    if (intent.type === 'parents') {
      showReply(intent.reply, { speak: false });
      if (openParentGate) openParentGate();
      return;
    }
    if (intent.type === 'say') {
      showReply(`Gấu nói: “${intent.params.text}”`, { speak: false });
      speakText(intent.params.text);
      return;
    }
    if (intent.type === 'home' || intent.type === 'greet' || intent.type === 'thanks') {
      mascotBtn.classList.remove('is-talking');
      void mascotBtn.offsetWidth;
      mascotBtn.classList.add('is-talking');
      playSfx('warm');
      showReply(intent.reply);
      return;
    }

    const route = ROUTES[intent.type];
    if (route) {
      // Hiện câu trả lời ngắn rồi mở màn hình tương ứng (màn hình mới sẽ tự đọc nội dung)
      showReply(intent.reply, { speak: false });
      const rect = askForm.getBoundingClientRect();
      spawnStars(rect.left + rect.width / 2, rect.top + 20, 4);
      navTimer = setTimeout(() => {
        navigate(route, intent.params || {});
        if (showToast) showToast(intent.reply);
      }, 650);
      return;
    }

    // help / unknown: luôn nhẹ nhàng, không báo sai
    showReply(intent.reply);
  };

  askForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = askInput.value.trim();
    if (!text) {
      askInput.focus();
      return;
    }
    runCommand(text);
  });

  container.querySelectorAll('.ask-bear__chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      askInput.value = chip.dataset.suggest;
      runCommand(chip.dataset.suggest);
    });
  });

  if (askMic) {
    const setListening = (on) => {
      askMic.classList.toggle('is-listening', on);
      askMic.setAttribute('aria-label', on ? 'Đang nghe… chạm để dừng' : 'Nói với Gấu Mây');
      askInput.placeholder = on ? 'Gấu đang nghe bé nói…' : 'Vd: kể chuyện Cây Khế';
    };
    askMic.addEventListener('click', () => {
      if (micSession) {
        micSession.stop();
        return;
      }
      playSfx('tap');
      askInput.value = '';
      setListening(true);
      micSession = listenForCommand({
        onInterim: (t) => {
          askInput.value = t;
        },
        onResult: (t) => {
          askInput.value = t;
          runCommand(t);
        },
        onError: (msg) => showReply(msg, { speak: false }),
        onEnd: () => {
          micSession = null;
          setListening(false);
        }
      });
    });
  }

  return () => {
    clearTimeout(navTimer);
    if (micSession) stopActiveListening();
  };
}
