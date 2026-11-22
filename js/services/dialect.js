/**
 * Từ ngữ theo vùng miền — Ba Mẹ chọn để bé nghe đúng từ cả nhà vẫn nói hằng ngày.
 *   - 'goc' : giữ nguyên nội dung gốc
 *   - 'bac' : bố, lợn, bát, cốc, quả, tàu hỏa
 *   - 'nam' : ba, heo, chén, ly, trái, trái banh, xe lửa
 * Đổi trực tiếp trên dữ liệu (thẻ từ, tranh, truyện) nên mọi màn hình và giọng đọc đều dùng chung.
 */

import { VOCABULARY } from '../data/curriculum.js';
import { DAILY_STORIES } from '../data/stories.js';
import { FAIRY_TALES } from '../data/fairytales.js';
import { FAIRY_TALES_SHORT } from '../data/fairytalesShort.js';

export const DIALECTS = [
  { id: 'goc', label: 'Giữ nguyên' },
  { id: 'bac', label: 'Miền Bắc (bố, lợn, bát, cốc, quả)' },
  { id: 'nam', label: 'Miền Nam (ba, heo, chén, ly, trái)' }
];

const L = '[\\p{L}]';

/** Tạo luật thay theo ranh giới từ tiếng Việt, có thể kèm điều kiện loại trừ phía sau */
function rule(from, to, { notBefore = '', notAfter = '' } = {}) {
  const ahead = notBefore ? `(?!\\s+(?:${notBefore}))` : '';
  const behind = notAfter ? `(?<!(?:${notAfter})\\s+)` : '';
  return { re: new RegExp(`(?<!${L})${behind}${from}${ahead}(?!${L})`, 'giu'), to };
}

const RULES = {
  bac: [
    rule('heo', 'lợn'),
    rule('chén', 'bát'),
    rule('ly', 'cốc'),
    rule('trái banh', 'quả bóng'),
    rule('banh', 'bóng', { notAfter: 'bánh' }),
    rule('trái', 'quả', { notBefore: 'tim', notAfter: 'bên|phía|tay' }),
    rule('xe lửa', 'tàu hỏa')
  ],
  nam: [
    rule('lợn', 'heo'),
    rule('bát', 'chén', { notBefore: 'ngát' }),
    rule('cốc', 'ly'),
    rule('quả bóng', 'trái banh'),
    // "bóng" chỉ đổi khi chắc chắn là quả bóng (tránh "bóng râm", "bóng dáng", "soi bóng")
    rule('(?<=(?:đá|ném|lăn|con|cầm|ôm|chơi)\\s+)bóng', 'banh'),
    rule('bóng(?=\\s+(?:lăn|tròn|nhiều|bay))', 'banh'),
    rule('quả', 'trái', { notBefore: 'nhiên|trứng|thật|là|thực' }),
    rule('tàu hỏa', 'xe lửa'),
    rule('tàu hoả', 'xe lửa'),
    rule('bố', 'ba')
  ]
};

/** "ba" (người cha) ↔ "bố" chỉ đổi trong thẻ từ — trong truyện "ba" thường là số ba */
const FATHER_RULES = {
  bac: [rule('ba', 'bố', { notAfter: 'hai|một hai|một, hai|hai,|Góc|góc', notBefore: 'gang|chú|anh|cánh|lần|tuổi|ngày|bước|bạn|con|cái|quả' })],
  nam: []
};

function matchCase(source, replacement) {
  if (source[0] && source[0] === source[0].toUpperCase() && source[0] !== source[0].toLowerCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

export function localizeText(text, dialect, { father = false } = {}) {
  if (typeof text !== 'string' || !RULES[dialect]) return text;
  const rules = father ? [...FATHER_RULES[dialect], ...RULES[dialect]] : RULES[dialect];
  return rules.reduce((acc, r) => acc.replace(r.re, (m) => matchCase(m, r.to)), text);
}

// Những trường KHÔNG phải lời nói (mã, màu, ảnh…) và tên truyện (giữ ổn định cho tìm kiếm)
const SKIP_KEYS = new Set([
  'id', 'category', 'tint', 'sfx', 'emoji', 'image', 'icon', 'themeColor', 'accentColor',
  'origin', 'originLabel', 'title', 'shortTitle', 'moralTag', 'x', 'y'
]);

function transformDeep(target, original, dialect, opts) {
  if (Array.isArray(original)) {
    original.forEach((v, i) => {
      if (typeof v === 'string') target[i] = localizeText(v, dialect, opts);
      else if (v && typeof v === 'object') transformDeep(target[i], v, dialect, opts);
    });
    return;
  }
  for (const [key, v] of Object.entries(original)) {
    if (SKIP_KEYS.has(key)) continue;
    if (typeof v === 'string') target[key] = localizeText(v, dialect, opts);
    else if (v && typeof v === 'object') transformDeep(target[key], v, dialect, opts);
  }
}

let originals = null;
let currentDialect = 'goc';

/** Áp dụng phương ngữ cho toàn bộ dữ liệu (gọi lúc khởi động và khi Ba Mẹ đổi lựa chọn) */
export function applyDialect(dialect = 'goc') {
  if (!originals) {
    originals = {
      vocab: structuredClone(VOCABULARY),
      stories: structuredClone(DAILY_STORIES),
      fairy: structuredClone(FAIRY_TALES),
      short: structuredClone(FAIRY_TALES_SHORT)
    };
  }
  const d = RULES[dialect] ? dialect : 'goc';
  if (d === currentDialect) return;
  // Khôi phục bản gốc rồi mới đổi, để chuyển qua lại không bị chồng luật
  transformDeep(VOCABULARY, originals.vocab, 'goc');
  transformDeep(DAILY_STORIES, originals.stories, 'goc');
  transformDeep(FAIRY_TALES, originals.fairy, 'goc');
  transformDeep(FAIRY_TALES_SHORT, originals.short, 'goc');
  if (d !== 'goc') {
    transformDeep(VOCABULARY, originals.vocab, d, { father: true });
    transformDeep(DAILY_STORIES, originals.stories, d);
    transformDeep(FAIRY_TALES, originals.fairy, d);
    transformDeep(FAIRY_TALES_SHORT, originals.short, d);
  }
  currentDialect = d;
}
