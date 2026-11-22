import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseIntent } from '../js/services/intent.js';

const rng = () => 0; // chọn phần tử đầu tiên để kết quả ổn định

const cases = [
  // [câu nói, type mong đợi, kiểm tra params]
  ['Kể chuyện Cây Khế', 'fairytale', (p) => p.storyId === 'cay-khe' && p.autoPlay],
  ['ke chuyen cay khe', 'fairytale', (p) => p.storyId === 'cay-khe'],
  ['Gấu ơi kể chuyện Tấm Cám đi', 'fairytale', (p) => p.storyId === 'tam-cam'],
  ['kể chuyện ba chú heo con', 'fairytale', (p) => p.storyId === 'ba-chu-heo-con'],
  ['kể chuyện con vịt', 'fairytale', (p) => p.storyId === 'vit-con-thien-nga'],
  ['Bạch Tuyết và bảy chú lùn', 'fairytale', (p) => p.storyId === 'bach-tuyet-bay-chu-lun'],
  ['Kể một truyện trước khi ngủ', 'fairytale', (p, all) => all.find((s) => s.id === p.storyId).bedtimeFriendly],
  ['kể truyện cổ tích thế giới', 'fairytale', (p, all) => all.find((s) => s.id === p.storyId).origin === 'world'],
  ['truyện cổ tích việt nam', 'fairytale-list', (p) => p.filter === 'vietnam'],
  ['Con mèo kêu thế nào?', 'vocab', (p) => p.vocabId === 'meo'],
  ['con gì kêu gâu gâu', 'vocab', (p) => p.vocabId === 'cho'],
  ['con gi keu gau gau', 'vocab', (p) => p.vocabId === 'cho'],
  ['con heo', 'vocab', (p) => p.vocabId === 'heo'],
  ['bà', 'vocab', (p) => p.vocabId === 'ongba'],
  ['ba', 'vocab', (p) => p.vocabId === 'ba'],
  ['mẹ ơi', 'vocab', (p) => p.vocabId === 'me'],
  ['nói chậm từ máy bay', 'vocab', (p) => p.vocabId === 'maybay' && p.slow],
  ['chào ông mặt trời', 'vocab', (p) => p.vocabId === 'mattroi'],
  ['Cho bé xem các con vật', 'cards', (p) => p.categoryId === 'animals'],
  ['do choi', 'cards', (p) => p.categoryId === 'toys'],
  ['Chơi trò chơi', 'listen'],
  ['Xem tranh đi công viên', 'scene', (p) => p.storyId === 'park'],
  ['giờ ăn', 'scene', (p) => p.storyId === 'mealtime'],
  ['hẹn giờ 10 phút', 'parents'],
  ['đổi độ tuổi sang 30 tháng', 'parents'],
  ['dừng lại', 'stop'],
  ['xin chào', 'greet'],
  ['cảm ơn gấu', 'thanks'],
  ['nói: con yêu mẹ nhiều lắm', 'say', (p) => p.text === 'con yêu mẹ nhiều lắm'],
  ['Gấu ơi đọc "chúc bé ngủ ngon"', 'say', (p) => p.text === 'chúc bé ngủ ngon'],
  ['asdfgh', 'unknown'],
  ['', 'help']
];

const { FAIRY_TALES } = await import('../js/data/fairytales.js');

for (const [text, type, check] of cases) {
  test(`"${text}" → ${type}`, () => {
    const r = parseIntent(text, { rng });
    assert.equal(r.type, type, `got ${JSON.stringify(r)}`);
    assert.ok(r.reply && r.reply.length > 0);
    if (check) assert.ok(check(r.params || {}, FAIRY_TALES), `params ${JSON.stringify(r.params)}`);
  });
}
