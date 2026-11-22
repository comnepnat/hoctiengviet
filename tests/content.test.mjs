import { test } from 'node:test';
import assert from 'node:assert/strict';
import { VOCABULARY, QUIZ_VOCABULARY, CATEGORIES } from '../js/data/curriculum.js';
import { FAIRY_TALES } from '../js/data/fairytales.js';
import { FAIRY_TALES_SHORT } from '../js/data/fairytalesShort.js';
import { DAILY_STORIES } from '../js/data/stories.js';
import { ART_MAP } from '../js/illustrations/art.js';
import { applyDialect, localizeText } from '../js/services/dialect.js';

const words = (s) => s.trim().split(/\s+/).length;
const VALID_SFX = ['bell', 'bird', 'bounce', 'car', 'cat', 'celebrate', 'chime', 'clap', 'cow', 'crunch', 'dog', 'drum', 'duck', 'guitar', 'gulp', 'horse', 'hug', 'knock', 'lullaby', 'magic', 'page', 'pig', 'plane', 'rain', 'rooster', 'sparkle', 'splash', 'tap', 'train', 'warm', 'water', 'wind'];

test('có ít nhất 50 từ, id không trùng, mỗi từ thuộc một chủ đề có thật', () => {
  assert.ok(VOCABULARY.length >= 50);
  assert.equal(new Set(VOCABULARY.map((v) => v.id)).size, VOCABULARY.length);
  const cats = new Set(CATEGORIES.map((c) => c.id));
  for (const v of VOCABULARY) assert.ok(cats.has(v.category), v.id);
});

test('mỗi từ có đủ câu mẫu 3 giai đoạn, độ dài hợp tuổi và âm thanh hợp lệ', () => {
  for (const v of VOCABULARY) {
    for (const st of ['18-24', '24-30', '30-36']) assert.ok(v.phrases[st] && v.quizPrompt[st], `${v.id} ${st}`);
    assert.ok(words(v.phrases['18-24']) <= 5, `${v.id}: ${v.phrases['18-24']}`);
    assert.ok(words(v.phrases['24-30']) <= 5, `${v.id}: ${v.phrases['24-30']}`);
    assert.ok(words(v.phrases['30-36']) <= 7, `${v.id}: ${v.phrases['30-36']}`);
    assert.ok(VALID_SFX.includes(v.sfx), `${v.id} sfx ${v.sfx}`);
    assert.ok(v.parentCue, v.id);
  }
});

test('mỗi từ đều có hình minh họa (vẽ tay hoặc biểu tượng)', () => {
  for (const v of VOCABULARY) assert.ok(ART_MAP[v.id] || v.emoji, v.id);
});

test('trò chơi Nghe & Tìm bỏ các từ trừu tượng', () => {
  assert.ok(!QUIZ_VOCABULARY.some((v) => v.category === 'social'));
  assert.ok(QUIZ_VOCABULARY.length >= 40);
});

test('bản kể ngắn có đủ trang cho mọi truyện, câu ngắn', () => {
  for (const f of FAIRY_TALES) {
    const sh = FAIRY_TALES_SHORT[f.id];
    assert.ok(sh, f.id);
    assert.equal(sh.length, f.pages.length, f.id);
    for (const page of sh) {
      assert.ok(page.length >= 2 && page.length <= 3, f.id);
      for (const s of page) assert.ok(words(s) <= 8, `${f.id}: ${s}`);
    }
  }
});

test('đổi từ vùng miền đúng và không đổi nhầm nghĩa', () => {
  assert.equal(localizeText('Quả bóng lăn tròn', 'nam'), 'Trái banh lăn tròn');
  assert.equal(localizeText('Bé đá bóng', 'nam'), 'Bé đá banh');
  assert.equal(localizeText('Rừng tre xanh bát ngát', 'nam'), 'Rừng tre xanh bát ngát');
  assert.equal(localizeText('Quả nhiên trời mưa', 'nam'), 'Quả nhiên trời mưa');
  assert.equal(localizeText('Chú soi bóng xuống hồ', 'nam'), 'Chú soi bóng xuống hồ');
  assert.equal(localizeText('Bát cơm và cốc sữa', 'nam'), 'Chén cơm và ly sữa');
  assert.equal(localizeText('Con heo kêu ụt ịt', 'bac'), 'Con lợn kêu ụt ịt');
  assert.equal(localizeText('Ly sữa và trái tim', 'bac'), 'Cốc sữa và trái tim');
  assert.equal(localizeText('Ba chú heo con', 'bac'), 'Ba chú lợn con');
  assert.equal(localizeText('Con chào ba ạ', 'bac', { father: true }), 'Con chào bố ạ');
  assert.equal(localizeText('Một, hai, ba', 'bac', { father: true }), 'Một, hai, ba');
});

test('đổi vùng miền rồi chọn lại "Giữ nguyên" thì dữ liệu về như cũ', () => {
  const snap = () => JSON.stringify([VOCABULARY, FAIRY_TALES, DAILY_STORIES, FAIRY_TALES_SHORT]);
  const before = snap();
  applyDialect('bac');
  assert.equal(VOCABULARY.find((v) => v.id === 'ba').word, 'Bố');
  applyDialect('nam');
  assert.notEqual(snap(), before);
  applyDialect('goc');
  assert.equal(snap(), before);
});
