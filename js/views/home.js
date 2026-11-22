/**
 * Home View — Trang chủ nhẹ nhàng, ít kích thích, dễ chạm cho bé 18–36 tháng
 */

import { AGE_STAGES, getStageMeta } from '../data/curriculum.js';
import { DAILY_PARENT_TIPS } from '../data/parentTips.js';
import { loadState, saveState } from '../services/storage.js';
import { playSfx, speakText } from '../services/audio.js';

const GREETINGS = [
  'Chào bé yêu! Hôm nay mình cùng tập nói nhé!',
  'Gấu Mây chào bé! Bé muốn đọc sách tranh hay nghe chuyện nào?',
  'Chào bạn nhỏ dễ thương! Chạm vào thẻ để nghe Gấu nói nhé!'
];

export function renderHomeView(container, { navigate, onStageChanged, spawnStars }) {
  const state = loadState();
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
      renderHomeView(container, { navigate, onStageChanged, spawnStars });
    });
  });

  // 3 cánh cửa hoạt động
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

  // Xem mẹo tiếp theo
  container.querySelector('#btn-next-tip').addEventListener('click', () => {
    playSfx('tap');
    saveState({ dailyTipIndex: (tipIndex + 1) % DAILY_PARENT_TIPS.length });
    renderHomeView(container, { navigate, onStageChanged, spawnStars });
  });
}
