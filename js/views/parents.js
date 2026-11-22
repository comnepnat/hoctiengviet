/**
 * Parent Corner View — Góc Ba Mẹ
 * 1. Cài đặt độ tuổi, tốc độ đọc, giọng nói tiếng Việt, chế độ nghe lại giọng bé & hẹn giờ mắt
 * 2. Phòng thu giọng Ba Mẹ (lưu offline trong IndexedDB)
 * 3. Nhật ký từ đầu tiên & mốc phát triển ngôn ngữ 18–36 tháng
 * 4. Mẹo dạy bé nói tự nhiên mỗi ngày
 */

import { AGE_STAGES, CATEGORIES, VOCABULARY, getVocabByCategory } from '../data/curriculum.js';
import { DAILY_PARENT_TIPS, SPEECH_MILESTONES, WHEN_TO_SEEK_HELP } from '../data/parentTips.js';
import {
  getAiApiKey,
  loadState,
  saveAiApiKey,
  saveState,
  toggleSpokenWord,
  saveParentRecording,
  getParentRecording,
  deleteParentRecording,
  listParentRecordingIds
} from '../services/storage.js';
import {
  AI_VOICE_PRESETS,
  getActiveVoiceInfo,
  getLastAiVoiceError,
  getVietnameseVoices,
  playBlob,
  resetAiVoiceSession,
  testAiVoice,
  playSfx,
  scoreVietnameseVoice,
  speakNaturalParagraph,
  speakText,
  stopSpeaking
} from '../services/audio.js';
import { startParentRecording } from '../services/voice.js';
import { DIALECTS, applyDialect } from '../services/dialect.js';

function escapeAttr(str) {
  return String(str ?? '').replace(/[&"<>]/g, (c) => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[c]);
}

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
            <p class="section-sub">Tùy chỉnh giọng đọc tự nhiên, thu âm giọng ba mẹ và theo dõi hành trình tập nói của bé.</p>
          </div>
        </div>

        <div class="parent-tabs" role="tablist">
          <button type="button" class="parent-tab-btn ${activeTab === 'settings' ? 'is-active' : ''}" data-tab="settings">⚙️ Cài đặt & Giọng đọc</button>
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
      { value: 0.84, label: 'Chậm rõ (18–24 tháng)' },
      { value: 0.92, label: 'Tự nhiên êm dịu' },
      { value: 1.0, label: 'Bình thường' }
    ];

    const providers = [
      { id: 'browser', label: 'Tắt — dùng giọng thiết bị (miễn phí)' },
      { id: 'google', label: 'Google Cloud TTS (Chirp 3 HD)' },
      { id: 'openai', label: 'OpenAI TTS' },
      { id: 'elevenlabs', label: 'ElevenLabs' }
    ];

    const activeProvider = state.voiceProvider || 'browser';
    const voiceInfo = getActiveVoiceInfo();
    const presets = AI_VOICE_PRESETS[activeProvider] || [];

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
        <h2 class="setting-label">Từ ngữ theo vùng miền</h2>
        <p class="setting-hint">Bé học nhanh nhất khi nghe đúng từ cả nhà vẫn nói. Áp dụng cho thẻ hình, tranh và truyện.</p>
        <div class="option-pills">
          ${DIALECTS.map(
            (d) => `
            <button type="button" class="option-pill ${(state.dialect || 'goc') === d.id ? 'is-active' : ''}" data-dialect="${d.id}">
              ${d.label}
            </button>
          `
          ).join('')}
        </div>
      </div>

      <div class="setting-group">
        <h2 class="setting-label">2. Giọng đọc tiếng Việt tự nhiên (Không còn giọng máy)</h2>
        <p class="setting-hint">
          Bi Bô tự động chọn giọng Neural/Natural tốt nhất trên thiết bị, ngắt nhịp nghỉ lấy hơi theo từng câu thoại,
          hoặc cho phép Ba Mẹ kết nối giọng AI kể chuyện siêu truyền cảm / tự thu âm trực tiếp trong từng trang truyện.
        </p>

        <div class="voice-status-banner ${voiceInfo.isNatural ? 'is-good' : 'is-basic'}">
          <span><strong>Giọng đang dùng:</strong> ${voiceInfo.label}</span>
          <button id="btn-test-voice" class="small-action-btn" type="button">🔊 Nghe thử kể chuyện</button>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-top:4px;">
          <select id="voice-select" class="styled-select" aria-label="Chọn giọng đọc tiếng Việt của thiết bị">
            <option value="">Giọng thiết bị: tự chọn giọng tiếng Việt hay nhất (Khuyên dùng)</option>
            ${voices
              .map((v) => {
                const sc = scoreVietnameseVoice(v);
                const tag = sc >= 140 ? '⭐ Rất tự nhiên' : sc >= 110 ? '✓ Tự nhiên' : 'Cơ bản';
                return `<option value="${escapeAttr(v.voiceURI)}" ${state.selectedVoiceURI === v.voiceURI ? 'selected' : ''}>${escapeAttr(v.name)} — ${tag}</option>`;
              })
              .join('')}
          </select>
        </div>

        <section class="cloud-tts-box" aria-labelledby="cloud-tts-title">
          <h3 id="cloud-tts-title" class="cloud-tts-box__title">☁️ Giọng AI tự nhiên — Google Cloud Text-to-Speech</h3>
          <p class="setting-hint">Dán API Key của ba mẹ để mọi câu nói & truyện cổ tích dùng giọng Chirp 3 HD tiếng Việt (tự dự phòng sang Neural2 / WaveNet nếu dự án chưa có giọng đó). Khóa chỉ lưu trong máy này; âm thanh được lưu lại để lần sau đọc ngay, kể cả khi offline.</p>

          <div class="cloud-tts-form">
            <label class="cloud-tts-field">
              <span>Nhà cung cấp</span>
              <select id="cloud-provider" class="styled-select">
                ${providers
                  .map((p) => `<option value="${p.id}" ${activeProvider === p.id ? 'selected' : ''}>${p.label}</option>`)
                  .join('')}
              </select>
            </label>

            <label class="cloud-tts-field ${activeProvider === 'browser' ? 'hidden' : ''}" id="cloud-voice-field">
              <span>Giọng kể</span>
              <select id="ai-voice-select" class="styled-select">
                ${presets
                  .map((pr) => `<option value="${pr.id}" ${state.aiVoiceId === pr.id ? 'selected' : ''}>${pr.label}</option>`)
                  .join('')}
              </select>
            </label>

            <label class="cloud-tts-field ${activeProvider === 'browser' ? 'hidden' : ''}" id="cloud-key-field">
              <span>API Key</span>
              <div class="cloud-tts-key-row">
                <input
                  id="ai-api-key"
                  type="password"
                  class="styled-select"
                  placeholder="${activeProvider === 'google' ? 'Dán API Key Google Cloud (AIza...)' : 'Dán API Key vào đây...'}"
                  value="${escapeAttr(getAiApiKey(state, activeProvider))}"
                  autocomplete="off"
                  spellcheck="false"
                />
                <button id="btn-toggle-key" class="small-action-btn" type="button" aria-label="Hiện / ẩn API Key">👁</button>
              </div>
            </label>

            <div class="cloud-tts-actions">
              <button id="btn-save-ai-key" class="small-action-btn small-action-btn--rec" type="button">💾 Lưu</button>
              <button id="btn-check-ai-key" class="small-action-btn ${activeProvider === 'browser' ? 'hidden' : ''}" type="button">🔎 Lưu & kiểm tra khóa</button>
            </div>
            <p id="cloud-tts-status" class="cloud-tts-status" role="status" aria-live="polite">${
              activeProvider === 'browser'
                ? 'ℹ️ Đang dùng giọng thiết bị miễn phí.'
                : getAiApiKey(state, activeProvider)
                  ? '✅ Đã có khóa. Bấm "Lưu & kiểm tra khóa" để nghe thử.'
                  : '⚠️ Chưa có khóa — đang dùng tạm giọng thiết bị.'
            }</p>
          </div>

          <details class="cloud-tts-guide">
            <summary>Cách lấy API Key Google Cloud (5 phút)</summary>
            <ol>
              <li>Mở <strong>console.cloud.google.com</strong> → tạo Project mới (vd <code>BiBo</code>) và bật <strong>Billing</strong> (có hạn mức miễn phí hằng tháng).</li>
              <li>Vào <em>APIs &amp; Services → Library</em> → tìm <strong>Cloud Text-to-Speech API</strong> → bấm <strong>Enable</strong>.</li>
              <li>Vào <em>APIs &amp; Services → Credentials</em> → <strong>Create credentials → API key</strong> → sao chép khóa (bắt đầu bằng <code>AIza</code>).</li>
              <li>Bấm vào khóa vừa tạo → <strong>API restrictions</strong>: chỉ chọn <em>Cloud Text-to-Speech API</em>; <strong>Website restrictions</strong>: thêm địa chỉ trang Bi Bô.</li>
              <li>Dán khóa vào ô trên → bấm <strong>Lưu & kiểm tra khóa</strong>.</li>
            </ol>
          </details>
        </section>

        <div style="margin-top:6px;">
          <span class="setting-hint" style="display:block; margin-bottom:6px;"><strong>Tốc độ đọc:</strong></span>
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

    body.querySelectorAll('[data-dialect]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSfx('tap');
        saveState({ dialect: btn.dataset.dialect });
        applyDialect(btn.dataset.dialect);
        const label = DIALECTS.find((d) => d.id === btn.dataset.dialect)?.label || '';
        showToast(`Đã chọn từ ngữ: ${label}`);
        render();
      });
    });

    body.querySelectorAll('[data-age]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSfx('tap');
        saveState({ ageStage: btn.dataset.age });
        onStageChanged(btn.dataset.age);
        showToast('Đã cập nhật giai đoạn học nói cho bé!');
        render();
      });
    });

    const providerSelect = body.querySelector('#cloud-provider');
    providerSelect.addEventListener('change', () => {
      const provider = providerSelect.value;
      const firstPreset = AI_VOICE_PRESETS[provider]?.[0]?.id || '';
      playSfx('tap');
      saveState({ voiceProvider: provider, aiVoiceId: firstPreset || loadState().aiVoiceId });
      resetAiVoiceSession();
      render();
    });

    const keyInput = body.querySelector('#ai-api-key');
    const statusEl = body.querySelector('#cloud-tts-status');
    const setStatus = (msg) => {
      statusEl.textContent = msg;
    };

    body.querySelector('#btn-toggle-key').addEventListener('click', () => {
      keyInput.type = keyInput.type === 'password' ? 'text' : 'password';
    });

    const saveKey = () => {
      const provider = loadState().voiceProvider;
      const keyVal = (keyInput.value || '').trim();
      if (provider !== 'browser') saveAiApiKey(provider, keyVal);
      resetAiVoiceSession();
      return { provider, keyVal };
    };

    body.querySelector('#btn-save-ai-key').addEventListener('click', () => {
      const { provider, keyVal } = saveKey();
      playSfx('celebrate');
      if (provider === 'browser') setStatus('ℹ️ Đang dùng giọng thiết bị miễn phí.');
      else setStatus(keyVal ? '✅ Đã lưu khóa! Bấm "Lưu & kiểm tra khóa" để nghe thử.' : 'Đã xóa khóa — dùng tạm giọng thiết bị.');
      showToast(keyVal ? 'Đã lưu API Key giọng AI!' : 'Đã lưu cài đặt giọng đọc.');
    });

    const checkBtn = body.querySelector('#btn-check-ai-key');
    checkBtn.addEventListener('click', async () => {
      saveKey();
      checkBtn.disabled = true;
      setStatus('⏳ Đang kiểm tra khóa với máy chủ...');
      const result = await testAiVoice();
      checkBtn.disabled = false;
      if (result.ok) {
        setStatus(`✅ Khóa hoạt động! Đang dùng giọng ${result.voice || ''}.`);
        playSfx('celebrate');
      } else {
        setStatus(`❌ ${result.error}`);
      }
    });

    const voiceSelect = body.querySelector('#voice-select');
    if (voiceSelect) {
      voiceSelect.addEventListener('change', (e) => {
        saveState({ selectedVoiceURI: e.target.value });
        showToast('Đã cập nhật giọng đọc tiếng Việt.');
        render();
      });
    }

    const aiVoiceSelect = body.querySelector('#ai-voice-select');
    if (aiVoiceSelect) {
      aiVoiceSelect.addEventListener('change', (e) => {
        saveState({ aiVoiceId: e.target.value });
        resetAiVoiceSession();
        showToast('Đã đổi giọng AI kể chuyện.');
      });
    }

    body.querySelectorAll('[data-speed]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const speed = Number(btn.dataset.speed);
        saveState({ speechRate: speed, fairyStoryRate: speed });
        playSfx('tap');
        speakText('Chào bé yêu! Hôm nay mình cùng nghe kể chuyện cổ tích thật hay nhé!', {
          rateOverride: speed
        });
        render();
      });
    });

    body.querySelector('#btn-test-voice').addEventListener('click', async () => {
      await speakNaturalParagraph(
        'Ngày xửa ngày xưa, ở một ngôi làng nhỏ yên bình, có cây khế chín vàng ươm dưới ánh nắng mai. Chú chim thần vỗ cánh vù vù đáp xuống mỉm cười chào bé yêu!'
      );
      const err = getLastAiVoiceError();
      if (err) showToast(`⚠️ ${err}`);
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

      <div class="setting-group seek-help-card">
        <h3 class="setting-label">🩺 Khi nào nên đưa bé đi khám?</h3>
        <p class="setting-hint">${WHEN_TO_SEEK_HELP.intro}</p>
        <div class="tips-list">
          ${WHEN_TO_SEEK_HELP.groups
            .map(
              (g) => `
            <div class="tip-card">
              <h4 class="tip-card__title">${g.age}</h4>
              <ul style="margin:4px 0 0 18px; padding:0; color:var(--ink-secondary); font-size:0.9rem;">
                ${g.signs.map((p) => `<li style="margin-bottom:4px;">${p}</li>`).join('')}
              </ul>
            </div>
          `
            )
            .join('')}
        </div>
        <p class="setting-hint"><em>${WHEN_TO_SEEK_HELP.note}</em></p>
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
