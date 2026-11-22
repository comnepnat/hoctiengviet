/**
 * Parent Corner View — Góc Ba Mẹ
 * 1. Cài đặt độ tuổi, tốc độ đọc, giọng nói tiếng Việt, chế độ nghe lại giọng bé & hẹn giờ mắt
 * 2. Phòng thu giọng Ba Mẹ (lưu offline trong IndexedDB)
 * 3. Nhật ký từ đầu tiên & mốc phát triển ngôn ngữ 18–36 tháng
 * 4. Mẹo dạy bé nói tự nhiên mỗi ngày
 */

import { AGE_STAGES, CATEGORIES, VOCABULARY, getVocabByCategory } from '../data/curriculum.js';
import { DAILY_PARENT_TIPS, SPEECH_MILESTONES } from '../data/parentTips.js';
import {
  loadState,
  saveState,
  toggleSpokenWord,
  saveParentRecording,
  getParentRecording,
  deleteParentRecording,
  listParentRecordingIds
} from '../services/storage.js';
import {
  getVietnameseVoices,
  playBlob,
  playSfx,
  speakText,
  stopSpeaking
} from '../services/audio.js';
import { startParentRecording } from '../services/voice.js';

export async function renderParentView(
  container,
  { onStageChanged, onTimerChanged, onPreviewBedtime, showToast }
) {
  let activeTab = 'settings';
  let recordCategory = CATEGORIES[0].id;
  let recordingId = null;
  let activeRecorder = null;

  async function render() {
    const state = loadState();
    const voices = getVietnameseVoices();
    const recordedIds = new Set(await listParentRecordingIds());

    container.innerHTML = `
      <section class="parent-view" aria-label="Góc Ba Mẹ">
        <div class="section-header" style="margin-bottom:0;">
          <div>
            <h1 class="section-title">Góc dành cho Ba Mẹ</h1>
            <p class="section-sub">Tùy chỉnh theo độ tuổi của bé, thu âm giọng ba mẹ và theo dõi những từ đầu tiên.</p>
          </div>
        </div>

        <div class="parent-tabs" role="tablist">
          <button type="button" class="parent-tab-btn ${activeTab === 'settings' ? 'is-active' : ''}" data-tab="settings">⚙️ Cài đặt</button>
          <button type="button" class="parent-tab-btn ${activeTab === 'voice' ? 'is-active' : ''}" data-tab="voice">🎙️ Giọng Ba Mẹ (${recordedIds.size})</button>
          <button type="button" class="parent-tab-btn ${activeTab === 'diary' ? 'is-active' : ''}" data-tab="diary">⭐ Nhật ký từ (${state.spokenWords.length}/${VOCABULARY.length})</button>
          <button type="button" class="parent-tab-btn ${activeTab === 'tips' ? 'is-active' : ''}" data-tab="tips">💡 Mẹo dạy nói</button>
        </div>

        <div id="parent-tab-body" class="parent-panel"></div>
      </section>
    `;

    container.querySelectorAll('.parent-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSfx('tap');
        if (activeRecorder) {
          activeRecorder.stop();
          activeRecorder = null;
          recordingId = null;
        }
        activeTab = btn.dataset.tab;
        render();
      });
    });

    const body = container.querySelector('#parent-tab-body');

    if (activeTab === 'settings') {
      renderSettingsTab(body, state, voices);
    } else if (activeTab === 'voice') {
      renderVoiceStudioTab(body, recordedIds);
    } else if (activeTab === 'diary') {
      renderDiaryTab(body, state);
    } else {
      renderTipsTab(body);
    }
  }

  function renderSettingsTab(body, state, voices) {
    const timers = [
      { value: 0, label: 'Tắt hẹn giờ' },
      { value: 10, label: '10 phút' },
      { value: 15, label: '15 phút (Khuyên dùng)' },
      { value: 20, label: '20 phút' }
    ];

    const speeds = [
      { value: 0.72, label: 'Chậm rõ (18–24 tháng)' },
      { value: 0.84, label: 'Tự nhiên êm dịu' },
      { value: 0.96, label: 'Bình thường' }
    ];

    body.innerHTML = `
      <div class="setting-group">
        <h2 class="setting-label">1. Giai đoạn phát triển của bé</h2>
        <p class="setting-hint">Ứng dụng tự động điều chỉnh độ dài câu mẫu và số lượng hình trong trò chơi Nghe & Tìm.</p>
        <div class="option-pills">
          ${AGE_STAGES.map(
            (s) => `
            <button type="button" class="option-pill ${state.ageStage === s.id ? 'is-active' : ''}" data-age="${s.id}">
              ${s.label} — ${s.shortTitle}
            </button>
          `
          ).join('')}
        </div>
      </div>

      <div class="setting-group">
        <h2 class="setting-label">2. Tốc độ & Giọng đọc tiếng Việt</h2>
        <p class="setting-hint">Nói chậm hơn một chút giúp bé nghe rõ thanh điệu và dễ bắt chước khẩu hình.</p>
        <div class="option-pills">
          ${speeds
            .map(
              (sp) => `
            <button type="button" class="option-pill ${Math.abs(state.speechRate - sp.value) < 0.03 ? 'is-active' : ''}" data-speed="${sp.value}">
              ${sp.label}
            </button>
          `
            )
            .join('')}
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-top:6px;">
          <select id="voice-select" class="styled-select" aria-label="Chọn giọng đọc tiếng Việt">
            <option value="">Giọng tiếng Việt mặc định của thiết bị</option>
            ${voices
              .map(
                (v) =>
                  `<option value="${v.voiceURI}" ${state.selectedVoiceURI === v.voiceURI ? 'selected' : ''}>${v.name} (${v.lang})</option>`
              )
              .join('')}
          </select>
          <button id="btn-test-voice" class="small-action-btn" type="button">🔊 Nghe thử</button>
        </div>
      </div>

      <div class="setting-group">
        <h2 class="setting-label">3. Chế độ Nghe lại giọng bé (Echo vui)</h2>
        <p class="setting-hint">Khi bé bấm "Bé nói nhé", ứng dụng phát lại chính giọng bập bẹ của bé — giúp bé thích thú và muốn nói nhiều hơn.</p>
        <div class="option-pills">
          <button type="button" class="option-pill ${state.echoEnabled ? 'is-active' : ''}" data-echo="true">Bật nghe lại giọng bé</button>
          <button type="button" class="option-pill ${!state.echoEnabled ? 'is-active' : ''}" data-echo="false">Chỉ khen bằng lời</button>
        </div>
      </div>

      <div class="setting-group">
        <h2 class="setting-label">4. Hẹn giờ bảo vệ mắt (Bạn Gấu đi ngủ)</h2>
        <p class="setting-hint">Hết giờ, Bạn Gấu Mây sẽ nhẹ nhàng ngáp ngủ và vẫy tay hẹn bé ngày mai, tránh làm bé hụt hẫng.</p>
        <div class="option-pills">
          ${timers
            .map(
              (t) => `
            <button type="button" class="option-pill ${state.timerMinutes === t.value ? 'is-active' : ''}" data-timer="${t.value}">
              ${t.label}
            </button>
          `
            )
            .join('')}
        </div>
        <div>
          <button id="btn-preview-bedtime" class="text-link-btn" type="button">Xem trước màn hình Bạn Gấu buồn ngủ →</button>
        </div>
      </div>
    `;

    body.querySelectorAll('[data-age]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSfx('tap');
        saveState({ ageStage: btn.dataset.age });
        onStageChanged(btn.dataset.age);
        showToast('Đã cập nhật giai đoạn học nói cho bé!');
        render();
      });
    });

    body.querySelectorAll('[data-speed]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const speed = Number(btn.dataset.speed);
        saveState({ speechRate: speed });
        playSfx('tap');
        speakText('Chào bé yêu, mình cùng tập nói thật chậm và rõ nhé!', { rateOverride: speed });
        render();
      });
    });

    body.querySelector('#voice-select').addEventListener('change', (e) => {
      saveState({ selectedVoiceURI: e.target.value });
      showToast('Đã chọn giọng đọc mới.');
    });

    body.querySelector('#btn-test-voice').addEventListener('click', () => {
      speakText('Meo meo! Con mèo trắng đang uống sữa ngon quá!');
    });

    body.querySelectorAll('[data-echo]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const echoEnabled = btn.dataset.echo === 'true';
        saveState({ echoEnabled });
        playSfx('tap');
        render();
      });
    });

    body.querySelectorAll('[data-timer]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mins = Number(btn.dataset.timer);
        saveState({ timerMinutes: mins });
        onTimerChanged(mins);
        playSfx('tap');
        showToast(mins ? `Đã đặt hẹn giờ Bạn Gấu đi ngủ sau ${mins} phút.` : 'Đã tắt hẹn giờ.');
        render();
      });
    });

    body.querySelector('#btn-preview-bedtime').addEventListener('click', () => {
      onPreviewBedtime();
    });
  }

  function renderVoiceStudioTab(body, recordedIds) {
    const items = getVocabByCategory(recordCategory);

    body.innerHTML = `
      <div class="setting-group">
        <h2 class="setting-label">Thu âm giọng Ba Mẹ cho từng thẻ hình</h2>
        <p class="setting-hint">
          Trẻ 18–36 tháng bắt chước nhanh nhất từ giọng nói quen thuộc của ba mẹ. Khi ba mẹ thu âm một từ,
          thẻ hình sẽ tự động phát giọng ba mẹ (lưu an toàn ngay trên thiết bị, không tải lên mạng).
        </p>

        <div class="category-tabs" style="padding-bottom:4px;">
          ${CATEGORIES.map(
            (cat) => `
            <button type="button" class="category-tab ${cat.id === recordCategory ? 'is-active' : ''}" data-rcat="${cat.id}">
              <span>${cat.icon}</span>
              <span>${cat.name}</span>
            </button>
          `
          ).join('')}
        </div>

        <div class="voice-record-list">
          ${items
            .map((item) => {
              const hasRec = recordedIds.has(item.id);
              const isRec = recordingId === item.id;
              return `
                <div class="voice-record-row">
                  <div class="voice-record-row__info">
                    <span class="voice-record-row__word">${item.word} (${item.sound})</span>
                    <span class="voice-record-row__status ${hasRec ? 'has-voice' : ''}">
                      ${isRec ? '🔴 Đang thu âm... bấm Dừng' : hasRec ? '❤️ Đã có giọng Ba Mẹ' : 'Đang dùng giọng đọc mẫu'}
                    </span>
                  </div>
                  <div class="voice-record-row__btns">
                    <button type="button" class="small-action-btn small-action-btn--rec ${isRec ? 'is-recording' : ''}" data-rec="${item.id}">
                      ${isRec ? '⏹ Dừng' : '🎙️ Thu'}
                    </button>
                    ${
                      hasRec
                        ? `
                      <button type="button" class="small-action-btn" data-play="${item.id}" aria-label="Nghe lại giọng ba mẹ từ ${item.word}">▶</button>
                      <button type="button" class="small-action-btn" data-del="${item.id}" aria-label="Xóa bản thu từ ${item.word}">✕</button>
                    `
                        : ''
                    }
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>
    `;

    body.querySelectorAll('[data-rcat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSfx('tap');
        recordCategory = btn.dataset.rcat;
        render();
      });
    });

    body.querySelectorAll('[data-rec]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.rec;
        if (recordingId === id && activeRecorder) {
          activeRecorder.stop();
          return;
        }
        if (activeRecorder) {
          activeRecorder.stop();
        }

        recordingId = id;
        render();

        activeRecorder = await startParentRecording({
          maxMs: 4500,
          onDone: async ({ blob, error }) => {
            activeRecorder = null;
            recordingId = null;
            if (error) {
              showToast(error);
              render();
              return;
            }
            if (blob) {
              await saveParentRecording(id, blob);
              playSfx('celebrate');
              showToast('Đã lưu giọng Ba Mẹ thành công!');
            }
            render();
          }
        });

        if (!activeRecorder) {
          recordingId = null;
          render();
        }
      });
    });

    body.querySelectorAll('[data-play]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const blob = await getParentRecording(btn.dataset.play);
        if (blob) playBlob(blob);
      });
    });

    body.querySelectorAll('[data-del]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await deleteParentRecording(btn.dataset.del);
        playSfx('tap');
        showToast('Đã xóa bản thu, quay về giọng mẫu.');
        render();
      });
    });
  }

  function renderDiaryTab(body, state) {
    const count = state.spokenWords.length;
    const percent = Math.round((count / VOCABULARY.length) * 100);

    body.innerHTML = `
      <div class="milestone-summary">
        <div>
          <span class="setting-hint" style="display:block; font-weight:700;">Nhật ký những từ đầu tiên của bé</span>
          <span class="milestone-count">${count} / ${VOCABULARY.length} từ (${percent}%)</span>
        </div>
        <p class="setting-hint" style="max-width:34ch;">
          Chạm vào từng từ bên dưới khi bé bắt đầu bập bẹ hoặc nói được trong đời sống hằng ngày.
        </p>
      </div>

      ${CATEGORIES.map((cat) => {
        const items = getVocabByCategory(cat.id);
        return `
          <div class="setting-group">
            <h3 class="setting-label">${cat.icon} ${cat.name}</h3>
            <div class="diary-chip-grid">
              ${items
                .map((item) => {
                  const spoken = state.spokenWords.includes(item.id);
                  return `
                    <button type="button" class="diary-chip ${spoken ? 'is-spoken' : ''}" data-toggle-word="${item.id}">
                      <span>${spoken ? '⭐' : '○'}</span>
                      <span>${item.word}</span>
                    </button>
                  `;
                })
                .join('')}
            </div>
          </div>
        `;
      }).join('')}

      <div class="setting-group">
        <h3 class="setting-label">Mốc phát triển lời nói tham khảo (18–36 tháng)</h3>
        <div class="tips-list">
          ${SPEECH_MILESTONES.map(
            (m) => `
            <div class="tip-card">
              <h4 class="tip-card__title">${m.stage}</h4>
              <ul style="margin:4px 0 0 18px; padding:0; color:var(--ink-secondary); font-size:0.9rem;">
                ${m.points.map((p) => `<li style="margin-bottom:4px;">${p}</li>`).join('')}
              </ul>
            </div>
          `
          ).join('')}
        </div>
      </div>
    `;

    body.querySelectorAll('[data-toggle-word]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const updated = toggleSpokenWord(chip.dataset.toggleWord);
        const nowSpoken = updated.spokenWords.includes(chip.dataset.toggleWord);
        playSfx(nowSpoken ? 'celebrate' : 'tap');
        render();
      });
    });
  }

  function renderTipsTab(body) {
    body.innerHTML = `
      <div class="setting-group">
        <h2 class="setting-label">7 Nguyên tắc vàng giúp bé 18–36 tháng học nói tự nhiên</h2>
        <p class="setting-hint">Ứng dụng chỉ là cầu nối — chính sự tương tác ấm áp, kiên nhẫn của ba mẹ mới là môi trường ngôn ngữ tốt nhất cho bé.</p>
        <div class="tips-list">
          ${DAILY_PARENT_TIPS.map(
            (t, idx) => `
            <article class="tip-card">
              <h3 class="tip-card__title">${idx + 1}. ${t.title}</h3>
              <p class="tip-card__desc">${t.desc}</p>
            </article>
          `
          ).join('')}
        </div>
      </div>
    `;
  }

  render();

  return () => {
    if (activeRecorder) {
      activeRecorder.stop();
      activeRecorder = null;
    }
    stopSpeaking();
  };
}
