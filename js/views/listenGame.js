/**
 * Listen & Find View — Trò chơi "Nghe & Tìm" không áp lực, không báo sai
 * - 18–24 tháng: 2 hình lớn
 * - 24–36 tháng: 3 hình lớn
 * - Sau khi tìm đúng, mời bé nhắc lại từ để kết hợp hiểu ngôn ngữ + phát âm!
 */

import { QUIZ_VOCABULARY, getStageMeta } from '../data/curriculum.js';
import { getIllustration } from '../illustrations/art.js';
import { loadState } from '../services/storage.js';
import { playSfx, speakText, stopSpeaking } from '../services/audio.js';

function pickRoundItems(count, lastTargetId) {
  const pool = [...QUIZ_VOCABULARY].sort(() => Math.random() - 0.5);
  let target = pool.find((item) => item.id !== lastTargetId) || pool[0];
  const distractors = pool.filter((item) => item.id !== target.id).slice(0, count - 1);
  const choices = [target, ...distractors].sort(() => Math.random() - 0.5);
  return { target, choices };
}

export function renderListenGameView(container, { spawnStars }) {
  let lastTargetId = null;
  let score = 0;

  function startRound() {
    stopSpeaking();
    const state = loadState();
    const stage = getStageMeta(state.ageStage);
    const { target, choices } = pickRoundItems(stage.quizChoices, lastTargetId);
    lastTargetId = target.id;
    let solved = false;

    const promptText = target.quizPrompt[state.ageStage] || target.quizPrompt['18-24'];

    container.innerHTML = `
      <section class="listen-game" aria-label="Trò chơi Nghe và Tìm">
        <div class="section-header" style="width:100%; margin-bottom:0;">
          <div>
            <h1 class="section-title">Nghe & Tìm bạn</h1>
            <p class="section-sub">Lắng nghe Gấu hỏi và chạm vào đúng hình nhé bé yêu.</p>
          </div>
          <span class="focus-counter">⭐ ${score} ngôi sao</span>
        </div>

        <div class="listen-prompt-card">
          <div class="listen-prompt-text">
            <span class="listen-prompt-eyebrow">Gấu Mây đố bé · ${stage.label}</span>
            <p class="listen-prompt-question">“${promptText}”</p>
          </div>
          <button id="btn-replay-prompt" class="replay-prompt-btn" type="button">
            <span aria-hidden="true">🔊</span>
            <span>Nghe lại</span>
          </button>
        </div>

        <div class="listen-choices">
          ${choices
            .map(
              (item) => `
            <button
              type="button"
              class="choice-card"
              data-id="${item.id}"
              aria-label="${item.word}"
            >
              <div class="choice-card__art" style="background:${item.tint}">
                ${getIllustration(item.id)}
              </div>
              <span class="choice-card__label">${item.word}</span>
            </button>
          `
            )
            .join('')}
        </div>

        <div id="listen-celebration" class="listen-celebration-bar hidden">
          <span id="listen-celebration-msg" class="listen-celebration-msg"></span>
          <button id="btn-next-round" class="btn-sage-soft" type="button">Câu tiếp theo →</button>
        </div>
      </section>
    `;

    const speakPrompt = () => {
      playSfx(target.sfx);
      setTimeout(() => speakText(promptText), 320);
    };

    speakPrompt();

    container.querySelector('#btn-replay-prompt').addEventListener('click', speakPrompt);

    const celebrationBar = container.querySelector('#listen-celebration');
    const celebrationMsg = container.querySelector('#listen-celebration-msg');

    container.querySelectorAll('.choice-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (solved) return;
        const chosenId = card.dataset.id;
        const chosen = choices.find((c) => c.id === chosenId);

        if (chosenId === target.id) {
          solved = true;
          score += 1;
          card.classList.add('is-correct');
          playSfx('celebrate');
          spawnStars(e.clientX || window.innerWidth / 2, e.clientY || 260, 10);

          const praise = `Đúng rồi! Đây là ${target.word}! ${target.sound} Bé nói "${target.word}" cùng Gấu nào!`;
          celebrationMsg.textContent = `🌟 Giỏi quá! Đây là ${target.word} (${target.sound}). Bé nói "${target.word}" nhé!`;
          celebrationBar.classList.remove('hidden');
          speakText(praise);
        } else {
          // Không báo sai gắt — hướng dẫn dịu dàng, tự nhiên
          card.classList.remove('is-gentle-nudge');
          void card.offsetWidth;
          card.classList.add('is-gentle-nudge');
          playSfx('gentle-nudge');
          speakText(`À, đây là ${chosen.word}, ${chosen.sound}. Thế ${target.word} ở đâu nhỉ?`);
        }
      });
    });

    container.querySelector('#btn-next-round').addEventListener('click', () => {
      playSfx('tap');
      startRound();
    });
  }

  startRound();

  return () => {
    stopSpeaking();
  };
}
