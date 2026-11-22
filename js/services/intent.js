/**
 * Natural Language Intent Service — "Hỏi Gấu Mây"
 * Hiểu câu tiếng Việt tự nhiên (gõ hoặc nói) và chuyển thành hành động trong app.
 * Chạy hoàn toàn offline, không cần API Key, không gửi dữ liệu ra ngoài.
 *
 * Ví dụ:
 *   "kể chuyện cây khế"            → mở & kể truyện Cây Khế
 *   "con mèo kêu thế nào?"         → mở thẻ Mèo và phát âm
 *   "con gì kêu gâu gâu"           → mở thẻ Chó
 *   "cho bé xem các con vật"       → mở Sách tranh, chủ đề Bạn động vật
 *   "kể một truyện trước khi ngủ"  → chọn ngẫu nhiên một truyện êm dịu giờ ngủ
 *   "chơi trò chơi"                → Nghe & Tìm bạn
 *   "hẹn giờ 10 phút"              → việc của Ba Mẹ → mở cổng Ba Mẹ (không vượt cổng bảo vệ)
 */

import { VOCABULARY, CATEGORIES } from '../data/curriculum.js';
import { FAIRY_TALES } from '../data/fairytales.js';
import { DAILY_STORIES } from '../data/stories.js';

/* ---------- Chuẩn hóa chuỗi ---------- */

/** Chữ thường, gộp khoảng trắng, bỏ dấu câu — GIỮ dấu tiếng Việt. */
export function normalizeAccented(str) {
  return ` ${String(str || '')
    .toLowerCase()
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;
}

/** Bỏ hết dấu tiếng Việt (để hiểu cả khi ba mẹ gõ không dấu). */
export function stripDiacritics(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function prepare(text) {
  const accented = normalizeAccented(text);
  return { accented, plain: stripDiacritics(accented) };
}

/**
 * Điểm khớp một cụm từ (alias) trong câu, theo ranh giới từ.
 * Khớp đúng dấu được điểm gấp đôi khớp không dấu, cụm càng dài điểm càng cao.
 */
function aliasScore(prepared, alias) {
  const a = normalizeAccented(alias);
  if (a.trim().length === 0) return 0;
  const words = a.trim().split(' ').length;
  if (prepared.accented.includes(a)) return words * 2 + 1;
  // Khớp không dấu chỉ khi người dùng thật sự gõ không dấu cho cụm đó
  const p = stripDiacritics(a);
  if (prepared.plain.includes(p)) {
    // Nếu câu gốc có dấu ở vị trí đó mà khác dấu (vd "bà" vs "ba") thì không tính
    const idx = prepared.plain.indexOf(p);
    const original = prepared.accented.slice(idx, idx + a.length);
    if (original === p) return words * 2; // người dùng gõ không dấu
  }
  return 0;
}

function hasAny(prepared, phrases) {
  return phrases.some((ph) => aliasScore(prepared, ph) > 0);
}

function bestMatch(prepared, entities) {
  let best = null;
  for (const entity of entities) {
    for (const alias of entity.aliases) {
      const score = aliasScore(prepared, alias);
      if (score > 0 && (!best || score > best.score)) {
        best = { entity, score, alias };
      }
    }
  }
  return best;
}

/* ---------- Từ điển thực thể ---------- */

const VOCAB_ALIASES = {
  meo: ['mèo', 'con mèo', 'mèo con', 'meo meo'],
  cho: ['chó', 'con chó', 'cún', 'cún con', 'gâu gâu'],
  vit: ['vịt', 'con vịt', 'cạp cạp'],
  ga: ['gà', 'con gà', 'gà trống', 'ò ó o'],
  bo: ['bò', 'con bò', 'bò sữa', 'ùm bò'],
  heo: ['heo', 'con heo', 'heo con', 'lợn', 'con lợn', 'ụt ịt'],
  chim: ['chim', 'con chim', 'chim nhỏ', 'chíp chíp'],
  sua: ['sữa', 'uống sữa', 'bình sữa'],
  chuoi: ['chuối', 'quả chuối', 'trái chuối'],
  tao: ['táo', 'quả táo', 'trái táo'],
  com: ['cơm', 'ăn cơm', 'bát cơm', 'chén cơm'],
  nuoc: ['nước', 'uống nước', 'cốc nước', 'ly nước'],
  banh: ['bánh', 'cái bánh', 'bánh ngọt'],
  oto: ['ô tô', 'xe ô tô', 'oto', 'xe hơi', 'bíp bíp'],
  tauhoa: ['tàu hỏa', 'tàu hoả', 'xe lửa', 'con tàu', 'tu tu'],
  maybay: ['máy bay', 'tàu bay'],
  bong: ['bóng', 'quả bóng', 'trái banh'],
  gau: ['gấu bông', 'con gấu bông', 'thú bông'],
  xedap: ['xe đạp', 'kính coong'],
  ba: ['ba', 'bố', 'ba ba', 'ba ơi', 'bố ơi'],
  me: ['mẹ', 'má', 'mẹ ơi', 'má ơi'],
  ongba: ['ông bà', 'ông', 'bà', 'ông nội', 'bà nội', 'ông ngoại', 'bà ngoại'],
  mat: ['mắt', 'đôi mắt', 'con mắt'],
  mui: ['mũi', 'cái mũi'],
  tay: ['tay', 'bàn tay', 'vỗ tay'],
  mattroi: ['mặt trời', 'ông mặt trời'],
  mua: ['mưa', 'trời mưa', 'tí tách'],
  hoa: ['hoa', 'bông hoa', 'đóa hoa'],
  trang: ['mặt trăng', 'ông trăng', 'trăng'],
  cay: ['cây', 'cây xanh', 'cái cây']
};

const VOCAB_ENTITIES = VOCABULARY.map((v) => ({
  id: v.id,
  item: v,
  aliases: VOCAB_ALIASES[v.id] || [v.word]
}));

const CATEGORY_ALIASES = {
  animals: ['động vật', 'con vật', 'các con vật', 'thú', 'bạn động vật', 'muông thú'],
  food: ['đồ ăn', 'thức ăn', 'món ăn', 'đồ ăn ngon', 'hoa quả', 'trái cây'],
  toys: ['đồ chơi', 'xe cộ', 'các loại xe', 'phương tiện', 'xe và đồ chơi'],
  family: ['gia đình', 'cơ thể', 'người thân', 'bộ phận cơ thể'],
  nature: ['thiên nhiên', 'thời tiết', 'bầu trời', 'cây cối']
};

const CATEGORY_ENTITIES = CATEGORIES.map((c) => ({
  id: c.id,
  item: c,
  aliases: CATEGORY_ALIASES[c.id] || [c.name]
}));

const FAIRY_ALIASES = {
  'cay-khe': ['cây khế', 'ăn khế trả vàng', 'chim thần', 'túi ba gang', 'khế'],
  'chu-cuoi': ['chú cuội', 'cuội', 'cung trăng', 'cây đa'],
  'tho-va-rua': ['thỏ và rùa', 'rùa và thỏ', 'thỏ rùa', 'rùa', 'con rùa', 'con thỏ', 'thỏ'],
  'cu-cai-khong-lo': ['củ cải', 'củ cải khổng lồ', 'nhổ củ cải'],
  'tam-cam': ['tấm cám', 'cô tấm', 'cá bống', 'tấm'],
  'ba-chu-heo-con': ['ba chú heo', 'ba chú heo con', 'ba chú lợn', 'ba chú lợn con', 'heo con xây nhà', 'chó sói', 'con heo', 'con lợn'],
  'thanh-giong': ['thánh gióng', 'gióng', 'chú bé gióng', 'ngựa sắt'],
  'banh-chung-banh-giay': ['bánh chưng', 'bánh giầy', 'bánh dày', 'lang liêu'],
  'qua-dua-hau': ['dưa hấu', 'quả dưa hấu', 'mai an tiêm', 'an tiêm'],
  'cay-tre-tram-dot': ['cây tre', 'tre trăm đốt', 'cây tre trăm đốt', 'khắc nhập'],
  'hoa-cuc-trang': ['hoa cúc', 'hoa cúc trắng', 'bông cúc'],
  'co-be-quang-khan-do': ['khăn đỏ', 'quàng khăn đỏ', 'cô bé quàng khăn đỏ', 'sói và bà'],
  'vit-con-thien-nga': ['vịt con xấu xí', 'thiên nga', 'vịt con hóa thiên nga', 'vịt con hoá thiên nga', 'vịt con', 'con vịt'],
  'meo-di-hia': ['mèo đi hia', 'đi hia', 'chú mèo đi hia', 'con mèo'],
  'bach-tuyet-bay-chu-lun': ['bạch tuyết', 'bảy chú lùn', '7 chú lùn', 'chú lùn'],
  'kien-va-ve-sau': ['kiến và ve sầu', 've sầu', 'con kiến', 'kiến']
};

const FAIRY_ENTITIES = FAIRY_TALES.map((s) => ({
  id: s.id,
  item: s,
  aliases: [...(FAIRY_ALIASES[s.id] || []), s.shortTitle, s.title]
}));

const SCENE_ALIASES = {
  morning: ['buổi sáng', 'sáng sớm', 'thức dậy', 'ngủ dậy'],
  park: ['công viên', 'đi chơi công viên', 'ra công viên'],
  mealtime: ['giờ ăn', 'bữa ăn', 'bữa cơm', 'ăn trưa', 'ăn tối', 'ăn sáng'],
  bedtime: ['giờ đi ngủ', 'giờ ngủ', 'đi ngủ', 'buổi tối']
};

const SCENE_ENTITIES = DAILY_STORIES.map((s) => ({
  id: s.id,
  item: s,
  aliases: [...(SCENE_ALIASES[s.id] || []), s.title]
}));

/* ---------- Cụm từ khóa ý định ---------- */

const STORY_WORDS = ['kể', 'truyện', 'chuyện', 'cổ tích', 'sự tích', 'đọc truyện', 'nghe truyện'];
const BEDTIME_WORDS = ['ngủ', 'buồn ngủ', 'ru ngủ', 'trước khi ngủ', 'giờ ngủ', 'đêm', 'buổi tối'];
const GAME_WORDS = ['trò chơi', 'chơi trò', 'đố bé', 'đố vui', 'tìm bạn', 'nghe và tìm', 'tìm hình', 'chơi đố'];
const SCENE_WORDS = ['tranh', 'chuyện nhỏ', 'bức tranh', 'sinh hoạt', 'hằng ngày', 'hàng ngày', 'mỗi ngày'];
const CARD_WORDS = ['sách tranh', 'thẻ', 'thẻ hình', 'học từ', 'tập nói', 'từ mới', 'học nói'];
const SLOW_WORDS = ['nói chậm', 'chậm thôi', 'chậm rãi', 'từng tiếng', 'đọc chậm', 'chậm chậm'];
const RANDOM_WORDS = ['bất kỳ', 'bất kì', 'ngẫu nhiên', 'gì cũng được', 'nào cũng được', 'một truyện', 'một chuyện'];
const SHORT_WORDS = ['ngắn', 'ngắn nhất', 'nhanh', 'ngắn thôi'];
const STOP_WORDS = ['dừng', 'dừng lại', 'im lặng', 'tắt tiếng', 'thôi đọc', 'ngừng'];
const HOME_WORDS = ['trang chủ', 'về nhà', 'màn hình chính', 'quay lại', 'về đầu'];
const GREET_WORDS = ['xin chào', 'chào gấu', 'chào bạn', 'gấu ơi', 'hello', 'chào'];
const HELP_WORDS = ['giúp', 'hướng dẫn', 'làm được gì', 'biết làm gì', 'có gì', 'gợi ý'];
const THANKS_WORDS = ['cảm ơn', 'cám ơn', 'thank'];
const QUESTION_SOUND_WORDS = ['kêu thế nào', 'kêu sao', 'kêu như thế nào', 'kêu gì', 'nói gì', 'tiếng gì', 'kêu ra sao'];

const PARENT_ONLY_WORDS = [
  'hẹn giờ', 'đặt giờ', 'cài đặt', 'thiết lập', 'góc ba mẹ', 'ba mẹ cài', 'thu âm', 'ghi âm',
  'giọng đọc', 'đổi giọng', 'api key', 'độ tuổi', 'tháng tuổi', 'nhật ký', 'giai đoạn', 'tốc độ đọc'
];

const VN_WORDS = ['việt nam', 'việt', 'dân gian'];
const WORLD_WORDS = ['thế giới', 'nước ngoài', 'quốc tế'];

/* ---------- Hàm tiện ích ---------- */

function pickRandom(list, rng = Math.random) {
  return list[Math.floor(rng() * list.length)];
}

/** "nói: con yêu mẹ" / gấu ơi đọc "chúc ngủ ngon" → trả về câu cần đọc */
function extractSayText(raw) {
  const m = String(raw || '').match(
    /^\s*(?:gấu(?:\s+mây)?\s*ơi[\s,]*)?(?:hãy\s+)?(?:nói|đọc)(?:\s+(?:giúp|cho\s+bé\s+nghe|theo|câu|là))*\s*[:"“'‘]\s*(.+?)["”'’]?\s*$/iu
  );
  return m ? m[1].trim() : '';
}

/** Tìm thẻ từ vựng theo tiếng kêu ("con gì kêu gâu gâu") */
function matchBySound(prepared) {
  let best = null;
  for (const v of VOCABULARY) {
    const sound = String(v.sound || '').replace(/[!.]/g, '').trim();
    if (!sound) continue;
    const score = aliasScore(prepared, sound);
    if (score > 0 && (!best || score > best.score)) best = { item: v, score };
  }
  return best;
}

/* ---------- Bộ hiểu ý định chính ---------- */

/**
 * @param {string} text Câu ba mẹ / bé nói hoặc gõ
 * @param {{ rng?: () => number }} [opts]
 * @returns {{
 *   type: 'fairytale'|'fairytale-list'|'cards'|'vocab'|'scene'|'scene-list'|'listen'|'parents'|'home'|'stop'|'greet'|'help'|'thanks'|'say'|'unknown',
 *   params?: object,
 *   reply: string,
 *   confidence: number
 * }}
 */
export function parseIntent(text, { rng = Math.random } = {}) {
  const raw = String(text || '').trim();
  if (!raw) {
    return { type: 'help', reply: 'Bé muốn nghe truyện, xem tranh hay chơi trò chơi nào?', confidence: 0 };
  }

  const sayText = extractSayText(raw);
  if (sayText) {
    return { type: 'say', params: { text: sayText }, reply: sayText, confidence: 0.9 };
  }

  const p = prepare(raw);

  // 1. Việc của Ba Mẹ → luôn đi qua cổng bảo vệ, không đổi cài đặt trực tiếp
  if (hasAny(p, PARENT_ONLY_WORDS)) {
    return {
      type: 'parents',
      reply: 'Phần này dành cho Ba Mẹ. Ba mẹ giữ nút 1,5 giây để mở Góc Ba Mẹ nhé!',
      confidence: 0.85
    };
  }

  if (hasAny(p, STOP_WORDS)) {
    return { type: 'stop', reply: 'Gấu dừng lại rồi nhé.', confidence: 0.9 };
  }

  const wantsStory = hasAny(p, STORY_WORDS);
  const wantsBedtime = hasAny(p, BEDTIME_WORDS);
  const wantsSlow = hasAny(p, SLOW_WORDS);

  const fairy = bestMatch(p, FAIRY_ENTITIES);
  const vocab = bestMatch(p, VOCAB_ENTITIES);
  const scene = bestMatch(p, SCENE_ENTITIES);
  const category = bestMatch(p, CATEGORY_ENTITIES);
  const bySound = matchBySound(p);

  // 2. Truyện cổ tích được gọi tên (ưu tiên khi cụm tên truyện dài hơn tên con vật/đồ vật)
  if (fairy) {
    const fairyBeatsVocab = !vocab || fairy.score > vocab.score || wantsStory;
    const fairyBeatsScene = !scene || fairy.score >= scene.score || wantsStory;
    // Tên một chữ (vd "rùa", "khế", "kiến") chỉ tính là truyện khi có từ "kể/truyện/chuyện"
    const strongName = fairy.score >= 5 || wantsStory;
    if (fairyBeatsVocab && fairyBeatsScene && strongName) {
      const story = fairy.entity.item;
      return {
        type: 'fairytale',
        params: { storyId: story.id, autoPlay: wantsStory || hasAny(p, ['nghe', 'đọc']) },
        reply: `Gấu kể truyện "${story.shortTitle}" cho bé nghe nhé!`,
        confidence: 0.9
      };
    }
  }

  // 3. Muốn nghe truyện nhưng chưa nói tên truyện
  if (wantsStory && !hasAny(p, SCENE_WORDS) && !(scene && !hasAny(p, ['cổ tích', 'kể']))) {
    let pool = FAIRY_TALES;
    let filter = 'all';
    if (hasAny(p, VN_WORDS)) {
      pool = pool.filter((s) => s.origin === 'vietnam');
      filter = 'vietnam';
    } else if (hasAny(p, WORLD_WORDS)) {
      pool = pool.filter((s) => s.origin === 'world');
      filter = 'world';
    }
    if (wantsBedtime) {
      pool = pool.filter((s) => s.bedtimeFriendly);
      if (filter === 'all') filter = 'bedtime';
    }
    if (hasAny(p, SHORT_WORDS)) {
      const min = Math.min(...pool.map((s) => s.readMinutes));
      pool = pool.filter((s) => s.readMinutes === min);
    }

    const wantsOne = hasAny(p, ['kể', 'kể cho', 'nghe']) || hasAny(p, RANDOM_WORDS) || hasAny(p, SHORT_WORDS);
    if (wantsOne && pool.length) {
      const story = pickRandom(pool, rng);
      const why = wantsBedtime ? ' êm dịu trước giờ ngủ' : '';
      return {
        type: 'fairytale',
        params: { storyId: story.id, autoPlay: true, filter },
        reply: `Gấu chọn truyện "${story.shortTitle}"${why} cho bé nhé!`,
        confidence: 0.75
      };
    }
    const label = { vietnam: 'cổ tích Việt Nam', world: 'cổ tích Thế giới', bedtime: 'truyện êm dịu giờ ngủ' }[filter];
    return {
      type: 'fairytale-list',
      params: { filter },
      reply: label ? `Đây là các ${label}, bé chọn một truyện nhé!` : 'Mình cùng chọn một truyện cổ tích thật hay nhé!',
      confidence: 0.7
    };
  }

  // 4. Trò chơi Nghe & Tìm bạn
  if (hasAny(p, GAME_WORDS)) {
    return { type: 'listen', reply: 'Mình cùng chơi Nghe & Tìm bạn nhé!', confidence: 0.85 };
  }

  // 5. Hỏi tiếng kêu: "con gì kêu gâu gâu?" hoặc "con mèo kêu thế nào?"
  const asksSound = hasAny(p, QUESTION_SOUND_WORDS);
  if (bySound && (!vocab || bySound.score >= vocab.score || hasAny(p, ['con gì', 'cái gì', 'ai kêu']))) {
    const v = bySound.item;
    return {
      type: 'vocab',
      params: { vocabId: v.id, autoSpeak: true, slow: wantsSlow },
      reply: `${v.sound.replace(/!$/, '')} là tiếng của ${v.word.toLowerCase()} đó!`,
      confidence: 0.85
    };
  }

  // 6. Tranh sinh hoạt hằng ngày
  if (scene && (!vocab || scene.score >= vocab.score || hasAny(p, SCENE_WORDS))) {
    const s = scene.entity.item;
    return {
      type: 'scene',
      params: { storyId: s.id },
      reply: `Mình cùng xem tranh "${s.title}" nhé!`,
      confidence: 0.8
    };
  }

  // 7. Một từ vựng cụ thể
  if (vocab && !(category && category.score > vocab.score)) {
    const v = vocab.entity.item;
    return {
      type: 'vocab',
      params: { vocabId: v.id, autoSpeak: true, slow: wantsSlow },
      reply: asksSound ? `${v.word} kêu ${v.sound.toLowerCase()}` : `Mình cùng tập nói "${v.word}" nhé!`,
      confidence: 0.8
    };
  }

  // 8. Một chủ đề từ vựng
  if (category) {
    const c = category.entity.item;
    return {
      type: 'cards',
      params: { categoryId: c.id },
      reply: `Mở sách tranh chủ đề "${c.name}" nhé!`,
      confidence: 0.8
    };
  }

  if (hasAny(p, SCENE_WORDS)) {
    return { type: 'scene-list', reply: 'Bé chọn một bức tranh quen thuộc nhé!', confidence: 0.7 };
  }

  if (hasAny(p, CARD_WORDS)) {
    return { type: 'cards', params: {}, reply: 'Mở Sách tranh biết nói nhé!', confidence: 0.7 };
  }

  if (hasAny(p, HOME_WORDS)) {
    return { type: 'home', reply: 'Về trang chủ nhé!', confidence: 0.8 };
  }

  if (hasAny(p, THANKS_WORDS)) {
    return { type: 'thanks', reply: 'Không có gì đâu bé yêu! Gấu thương bé lắm!', confidence: 0.8 };
  }

  if (hasAny(p, HELP_WORDS)) {
    return {
      type: 'help',
      reply: 'Bé có thể nói: "kể chuyện Cây Khế", "con mèo kêu thế nào", hay "chơi trò chơi" nhé!',
      confidence: 0.7
    };
  }

  if (hasAny(p, GREET_WORDS)) {
    return { type: 'greet', reply: 'Gấu Mây chào bé yêu! Hôm nay bé muốn làm gì nào?', confidence: 0.8 };
  }

  return {
    type: 'unknown',
    reply: 'Gấu chưa hiểu lắm. Bé thử nói "kể chuyện", "con chó" hoặc "chơi trò chơi" nhé!',
    confidence: 0
  };
}

/** Gợi ý câu mẫu hiển thị dưới ô nhập */
export const NL_SUGGESTIONS = [
  'Kể chuyện Cây Khế',
  'Con gì kêu gâu gâu?',
  'Kể một truyện trước khi ngủ',
  'Cho bé xem các con vật',
  'Chơi trò chơi',
  'Xem tranh đi công viên',
  'Con mèo kêu thế nào?',
  'Kể truyện cổ tích thế giới'
];
