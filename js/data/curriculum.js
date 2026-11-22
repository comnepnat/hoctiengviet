/**
 * Chương trình Học Nói Tự Nhiên Bi Bô (18 tháng – 3 tuổi)
 * Thiết kế theo tiến trình phát triển ngôn ngữ tự nhiên:
 *   - 18–24 tháng: Từ tượng thanh & từ đơn quen thuộc
 *   - 24–30 tháng: Ghép cụm 2–3 từ tự nhiên
 *   - 30–36 tháng: Câu ngắn giao tiếp & hỏi đáp hàng ngày
 */

import { EXTRA_CATEGORIES, EXTRA_VOCABULARY } from './vocabExtra.js';

export const AGE_STAGES = [
  {
    id: '18-24',
    label: '18–24 tháng',
    shortTitle: 'Âm thanh & Từ đơn',
    description: 'Ưu tiên từ tượng thanh (meo meo, bíp bíp) và từ đơn gần gũi. Trò chơi gồm 2 lựa chọn lớn, dễ chạm.',
    quizChoices: 2,
    milestoneTarget: '20 – 50 từ đơn & từ tượng thanh'
  },
  {
    id: '24-30',
    label: '24–30 tháng',
    shortTitle: 'Cụm 2–3 từ',
    description: 'Mở rộng từ đơn thành cụm 2–3 từ tự nhiên như "mèo uống sữa", "bé ăn chuối". Trò chơi 3 lựa chọn.',
    quizChoices: 3,
    milestoneTarget: '50 – 200 từ, ghép cụm 2–3 từ'
  },
  {
    id: '30-36',
    label: '30–36 tháng',
    shortTitle: 'Câu ngắn giao tiếp',
    description: 'Khuyến khích bé nói trọn câu ngắn, chào hỏi lễ phép và kể lại hoạt động quanh bé.',
    quizChoices: 3,
    milestoneTarget: 'Câu 3–5 từ, hỏi đáp đơn giản'
  }
];

const CORE_CATEGORIES = [
  { id: 'animals', name: 'Bạn động vật', tint: '#FBECE6', icon: '🐾' },
  { id: 'food', name: 'Đồ ăn ngon', tint: '#FDF4DE', icon: '🍌' },
  { id: 'toys', name: 'Xe & Đồ chơi', tint: '#E9F3FA', icon: '🚗' },
  { id: 'family', name: 'Gia đình & Cơ thể', tint: '#F5EDF4', icon: '💛' },
  { id: 'nature', name: 'Thiên nhiên', tint: '#EAF4EC', icon: '☀️' }
];

const CORE_VOCABULARY = [
  // ================= BẠN ĐỘNG VẬT =================
  {
    id: 'meo',
    category: 'animals',
    word: 'Mèo',
    sound: 'Meo meo!',
    slowText: 'Meo... meo... Con... mèo',
    tint: '#FBECE6',
    sfx: 'cat',
    phrases: {
      '18-24': 'Meo meo! Con mèo.',
      '24-30': 'Con mèo kêu meo meo.',
      '30-36': 'Mèo con uống sữa ngon!'
    },
    quizPrompt: {
      '18-24': 'Con mèo đâu rồi bé ơi?',
      '24-30': 'Con gì kêu meo meo nhỉ?',
      '30-36': 'Bé tìm giúp Gấu bạn nào kêu meo meo nhé!'
    },
    parentCue: 'Ba mẹ vuốt nhẹ tay bé như vuốt lông mèo rồi nói chậm: "Meo meo, con mèo mềm quá!"'
  },
  {
    id: 'cho',
    category: 'animals',
    word: 'Chó',
    sound: 'Gâu gâu!',
    slowText: 'Gâu... gâu... Con... chó',
    tint: '#FDF4DE',
    sfx: 'dog',
    phrases: {
      '18-24': 'Gâu gâu! Con chó.',
      '24-30': 'Con chó vẫy đuôi.',
      '30-36': 'Chó vẫy đuôi, gâu gâu!'
    },
    quizPrompt: {
      '18-24': 'Bạn chó ở đâu nào?',
      '24-30': 'Con gì sủa gâu gâu nhỉ?',
      '30-36': 'Ai hay vẫy đuôi và kêu gâu gâu bé ơi?'
    },
    parentCue: 'Cùng bé lắc tay vẫy đuôi và bật âm "Gâu! Gâu!" thật vui để bé thích bắt chước.'
  },
  {
    id: 'vit',
    category: 'animals',
    word: 'Vịt',
    sound: 'Cạp cạp!',
    slowText: 'Cạp... cạp... Con... vịt',
    tint: '#FEF6DC',
    sfx: 'duck',
    phrases: {
      '18-24': 'Cạp cạp! Con vịt.',
      '24-30': 'Con vịt bơi nước.',
      '30-36': 'Vịt vàng bơi dưới ao.'
    },
    quizPrompt: {
      '18-24': 'Con vịt vàng ở đâu bé ơi?',
      '24-30': 'Con gì kêu cạp cạp và biết bơi?',
      '30-36': 'Bé chỉ cho Gấu bạn vịt vàng kêu cạp cạp nhé!'
    },
    parentCue: 'Chụm các ngón tay làm mỏ vịt mở ra khép lại khi nói "cạp cạp" để bé nhìn theo khẩu hình.'
  },
  {
    id: 'ga',
    category: 'animals',
    word: 'Gà trống',
    sound: 'Ò ó o!',
    slowText: 'Ò... ó... o... Con... gà',
    tint: '#FBECE6',
    sfx: 'rooster',
    phrases: {
      '18-24': 'Ò ó o! Con gà.',
      '24-30': 'Gà gáy buổi sáng.',
      '30-36': 'Gà gáy ò ó o!'
    },
    quizPrompt: {
      '18-24': 'Chú gà trống ở đâu nào?',
      '24-30': 'Con gì gáy ò ó o buổi sáng?',
      '30-36': 'Ai gọi bé dậy mỗi sáng bằng tiếng ò ó o nhỉ?'
    },
    parentCue: 'Âm "Ò ó o" rất dễ luyện hơi thở dài và nguyên âm tròn môi cho bé 18–24 tháng.'
  },
  {
    id: 'bo',
    category: 'animals',
    word: 'Bò sữa',
    sound: 'Ùm bò!',
    slowText: 'Ùm... bò... Con... bò',
    tint: '#EAF4EC',
    sfx: 'cow',
    phrases: {
      '18-24': 'Ùm bò! Con bò.',
      '24-30': 'Con bò ăn cỏ.',
      '30-36': 'Bò kêu ùm bò, ăn cỏ.'
    },
    quizPrompt: {
      '18-24': 'Bạn bò sữa ở đâu bé ơi?',
      '24-30': 'Con gì kêu ùm bò nhỉ?',
      '30-36': 'Bạn nào thích ăn cỏ và cho bé sữa ngon nào?'
    },
    parentCue: 'Kéo dài âm "Ùmmm... bòoo" giúp bé luyện đóng mở môi rất tốt.'
  },
  {
    id: 'heo',
    category: 'animals',
    word: 'Heo con',
    sound: 'Ụt ịt!',
    slowText: 'Ụt... ịt... Con... heo',
    tint: '#FBE9EE',
    sfx: 'pig',
    phrases: {
      '18-24': 'Ụt ịt! Con heo.',
      '24-30': 'Heo hồng ụt ịt.',
      '30-36': 'Heo hồng kêu ụt ịt!'
    },
    quizPrompt: {
      '18-24': 'Bạn heo hồng đâu rồi?',
      '24-30': 'Con gì kêu ụt ịt nhỉ?',
      '30-36': 'Bé tìm bạn heo màu hồng có mũi tròn nhé!'
    },
    parentCue: 'Chạm nhẹ mũi bé rồi cười vui: "Mũi xinh giống bạn heo kêu ụt ịt nè!"'
  },
  {
    id: 'chim',
    category: 'animals',
    word: 'Chim nhỏ',
    sound: 'Chíp chíp!',
    slowText: 'Chíp... chíp... Con... chim',
    tint: '#E9F3FA',
    sfx: 'bird',
    phrases: {
      '18-24': 'Chíp chíp! Con chim.',
      '24-30': 'Chim bay trên trời.',
      '30-36': 'Chim hót chíp chíp trên cành.'
    },
    quizPrompt: {
      '18-24': 'Bạn chim nhỏ đâu rồi?',
      '24-30': 'Con gì biết bay và hót chíp chíp?',
      '30-36': 'Bạn nào hót líu lo trên cành cây bé ơi?'
    },
    parentCue: 'Dang hai tay vẫy nhẹ như cánh chim bay để bé kết nối động tác với từ "bay".'
  },

  // ================= ĐỒ ĂN NGON =================
  {
    id: 'sua',
    category: 'food',
    word: 'Sữa',
    sound: 'Ực ực!',
    slowText: 'Uống... sữa... thơm... ngon',
    tint: '#E9F3FA',
    sfx: 'gulp',
    phrases: {
      '18-24': 'Sữa! Bé uống sữa.',
      '24-30': 'Bé uống sữa ấm.',
      '30-36': 'Con muốn uống sữa ạ!'
    },
    quizPrompt: {
      '18-24': 'Cốc sữa đâu rồi bé ơi?',
      '24-30': 'Cái gì màu trắng bé hay uống mỗi ngày?',
      '30-36': 'Bé tìm cốc sữa ấm giúp Gấu nhé!'
    },
    parentCue: 'Trước khi đưa cốc sữa thật, chờ 3–5 giây và gợi ý: "Bé muốn uống gì nào? Sữa!"'
  },
  {
    id: 'chuoi',
    category: 'food',
    word: 'Chuối',
    sound: 'Măm măm!',
    slowText: 'Quả... chuối... màu... vàng',
    tint: '#FDF4DE',
    sfx: 'chime',
    phrases: {
      '18-24': 'Quả chuối! Măm măm.',
      '24-30': 'Bé ăn chuối ngọt.',
      '30-36': 'Con bóc chuối ăn nhé.'
    },
    quizPrompt: {
      '18-24': 'Quả chuối vàng ở đâu nào?',
      '24-30': 'Quả gì màu vàng bóc vỏ ăn ngọt nhỉ?',
      '30-36': 'Gấu muốn ăn quả chuối vàng, bé tìm giúp Gấu nhé!'
    },
    parentCue: 'Khi bóc chuối cho bé, hãy nói từng bước: "Bóc vỏ nè... măm măm, chuối ngọt quá!"'
  },
  {
    id: 'tao',
    category: 'food',
    word: 'Táo',
    sound: 'Rốp rốp!',
    slowText: 'Quả... táo... màu... đỏ',
    tint: '#FBECE6',
    sfx: 'crunch',
    phrases: {
      '18-24': 'Quả táo! Rốp rốp.',
      '24-30': 'Quả táo màu đỏ.',
      '30-36': 'Táo đỏ giòn rốp rốp!'
    },
    quizPrompt: {
      '18-24': 'Quả táo đỏ đâu rồi bé ơi?',
      '24-30': 'Quả gì màu đỏ cắn kêu rốp rốp?',
      '30-36': 'Bé chọn quả táo đỏ giòn ngọt nhé!'
    },
    parentCue: 'Giả vờ cắn quả táo "rốp rốp!" rồi xoa bụng nói "ngon quá!" để tạo sự hào hứng.'
  },
  {
    id: 'com',
    category: 'food',
    word: 'Cơm',
    sound: 'Măm măm!',
    slowText: 'Bát... cơm... măm... măm',
    tint: '#F7EFE1',
    sfx: 'chime',
    phrases: {
      '18-24': 'Bát cơm! Măm măm.',
      '24-30': 'Bé ăn cơm ngoan.',
      '30-36': 'Cơm mẹ nấu ngon quá!'
    },
    quizPrompt: {
      '18-24': 'Bát cơm ở đâu nào?',
      '24-30': 'Bữa trưa bé ăn gì măm măm nhỉ?',
      '30-36': 'Bé tìm bát cơm trắng có cái thìa nhé!'
    },
    parentCue: 'Dùng từ "măm măm" kết hợp với "bát cơm", "cái thìa" trong bữa ăn thật hằng ngày.'
  },
  {
    id: 'nuoc',
    category: 'food',
    word: 'Nước',
    sound: 'Ào ào!',
    slowText: 'Uống... nước... mát... quá',
    tint: '#E9F3FA',
    sfx: 'water',
    phrases: {
      '18-24': 'Nước! Bé uống nước.',
      '24-30': 'Bé uống nước mát.',
      '30-36': 'Con khát, cho con nước ạ!'
    },
    quizPrompt: {
      '18-24': 'Cốc nước mát đâu rồi?',
      '24-30': 'Khi khát bé uống gì nhỉ?',
      '30-36': 'Bé chọn cốc nước lọc trong vắt nhé!'
    },
    parentCue: 'Khuyến khích bé nói "nước" hoặc "uống nước" thay vì chỉ tay im lặng khi khát.'
  },
  {
    id: 'banh',
    category: 'food',
    word: 'Bánh',
    sound: 'Ngon quá!',
    slowText: 'Cái... bánh... thơm... ngon',
    tint: '#FBECE6',
    sfx: 'sparkle',
    phrases: {
      '18-24': 'Cái bánh! Ngon quá.',
      '24-30': 'Bánh thơm ngon quá.',
      '30-36': 'Con mời mẹ ăn bánh.'
    },
    quizPrompt: {
      '18-24': 'Cái bánh ngon đâu rồi bé ơi?',
      '24-30': 'Cái gì thơm ngon bé hay ăn xế nhỉ?',
      '30-36': 'Bé tìm chiếc bánh xinh xắn để chia cho Gấu nhé!'
    },
    parentCue: 'Tập giao tiếp chia sẻ: "Cho mẹ xin một miếng bánh nhé! Cảm ơn bé!"'
  },

  // ================= XE CỘ & ĐỒ CHƠI =================
  {
    id: 'oto',
    category: 'toys',
    word: 'Ô tô',
    sound: 'Bíp bíp!',
    slowText: 'Bíp... bíp... Xe... ô... tô',
    tint: '#FBECE6',
    sfx: 'car',
    phrases: {
      '18-24': 'Bíp bíp! Ô tô.',
      '24-30': 'Ô tô chạy nhanh.',
      '30-36': 'Ô tô chạy bíp bíp!'
    },
    quizPrompt: {
      '18-24': 'Xe ô tô đâu rồi bé ơi?',
      '24-30': 'Xe gì bấm còi bíp bíp nhỉ?',
      '30-36': 'Bé tìm chiếc ô tô màu đỏ chạy bíp bíp nhé!'
    },
    parentCue: 'Âm môi "Bíp bíp" rất dễ phát âm. Hãy giả vờ xoay vô lăng cùng bé!'
  },
  {
    id: 'tauhoa',
    category: 'toys',
    word: 'Tàu hỏa',
    sound: 'Tu tu!',
    slowText: 'Tu... tu... xình... xịch... Tàu... hỏa',
    tint: '#EAF4EC',
    sfx: 'train',
    phrases: {
      '18-24': 'Tu tu! Tàu hỏa.',
      '24-30': 'Tàu chạy xình xịch.',
      '30-36': 'Tàu hỏa chạy tu tu!'
    },
    quizPrompt: {
      '18-24': 'Đoàn tàu hỏa ở đâu nào?',
      '24-30': 'Xe gì kêu tu tu xình xịch nhỉ?',
      '30-36': 'Bé tìm đoàn tàu hỏa đang kéo còi tu tu nhé!'
    },
    parentCue: 'Nối đuôi đi vòng quanh phòng cùng bé và hô nhịp nhàng: "Tu tu! Xình xịch!"'
  },
  {
    id: 'maybay',
    category: 'toys',
    word: 'Máy bay',
    sound: 'Vù vù!',
    slowText: 'Vù... vù... Máy... bay',
    tint: '#E9F3FA',
    sfx: 'plane',
    phrases: {
      '18-24': 'Vù vù! Máy bay.',
      '24-30': 'Máy bay bay cao.',
      '30-36': 'Máy bay bay trên trời.'
    },
    quizPrompt: {
      '18-24': 'Máy bay đâu rồi bé ơi?',
      '24-30': 'Cái gì bay vù vù trên trời cao?',
      '30-36': 'Bé chỉ cho Gấu chiếc máy bay đang bay cao nhé!'
    },
    parentCue: 'Nhấc bé lên nhẹ nhàng hoặc dang tay kêu "vùuuu" giúp bé ghi nhớ từ qua vận động.'
  },
  {
    id: 'bong',
    category: 'toys',
    word: 'Quả bóng',
    sound: 'Tưng tưng!',
    slowText: 'Quả... bóng... tròn... tròn',
    tint: '#FDF4DE',
    sfx: 'bounce',
    phrases: {
      '18-24': 'Quả bóng! Tưng tưng.',
      '24-30': 'Bóng lăn tròn.',
      '30-36': 'Bé đá bóng lăn tròn!'
    },
    quizPrompt: {
      '18-24': 'Quả bóng tròn ở đâu nào?',
      '24-30': 'Đồ chơi gì tròn xoe lăn tưng tưng nhỉ?',
      '30-36': 'Bé tìm quả bóng nhiều màu để mình cùng đá nhé!'
    },
    parentCue: 'Lăn bóng qua lại và tập luân phiên lượt giao tiếp: "Đến lượt bé! Ném bóng... 1, 2, 3!"'
  },
  {
    id: 'gau',
    category: 'toys',
    word: 'Gấu bông',
    sound: 'Ôm nào!',
    slowText: 'Bạn... gấu... bông... mềm',
    tint: '#F7EFE1',
    sfx: 'hug',
    phrases: {
      '18-24': 'Gấu bông! Ôm nào.',
      '24-30': 'Bé ôm gấu bông.',
      '30-36': 'Con ôm gấu bông ngủ.'
    },
    quizPrompt: {
      '18-24': 'Bạn gấu bông đâu rồi?',
      '24-30': 'Bạn đồ chơi nào mềm mại hay ngủ cùng bé?',
      '30-36': 'Bé tìm bạn gấu bông đáng yêu để ôm nhé!'
    },
    parentCue: 'Chơi giả vờ với gấu bông (cho gấu ăn, ru gấu ngủ) giúp vốn từ của bé tăng rất nhanh.'
  },
  {
    id: 'xedap',
    category: 'toys',
    word: 'Xe đạp',
    sound: 'Kính coong!',
    slowText: 'Kính... coong... Xe... đạp',
    tint: '#EAF4EC',
    sfx: 'bell',
    phrases: {
      '18-24': 'Kính coong! Xe đạp.',
      '24-30': 'Bé đạp xe đi.',
      '30-36': 'Xe đạp kêu kính coong!'
    },
    quizPrompt: {
      '18-24': 'Chiếc xe đạp đâu rồi bé ơi?',
      '24-30': 'Xe gì có chuông kêu kính coong nhỉ?',
      '30-36': 'Bé tìm chiếc xe đạp bấm chuông kính coong nhé!'
    },
    parentCue: 'Nhấn mạnh tiếng chuông "Kính coong!" thật vui tai để kích thích bé lặp lại.'
  },

  // ================= GIA ĐÌNH & CƠ THỂ =================
  {
    id: 'ba',
    category: 'family',
    word: 'Ba',
    sound: 'Ba ơi!',
    slowText: 'Ba... ơi... Con... yêu... ba',
    tint: '#E9F3FA',
    sfx: 'warm',
    phrases: {
      '18-24': 'Ba ơi! Ba bế.',
      '24-30': 'Ba bế bé lên.',
      '30-36': 'Con chào ba ạ!'
    },
    quizPrompt: {
      '18-24': 'Ba ở đâu rồi bé ơi?',
      '24-30': 'Bé gọi ba ơi và chỉ vào hình Ba nhé!',
      '30-36': 'Ai hay bế bổng bé lên cao nào?'
    },
    parentCue: 'Ba hãy thu âm chính giọng của mình trong Góc Ba Mẹ để bé nghe và reo lên "Ba!" nhé.'
  },
  {
    id: 'me',
    category: 'family',
    word: 'Mẹ',
    sound: 'Mẹ ơi!',
    slowText: 'Mẹ... ơi... Con... yêu... mẹ',
    tint: '#FBECE6',
    sfx: 'warm',
    phrases: {
      '18-24': 'Mẹ ơi! Mẹ ôm.',
      '24-30': 'Mẹ ôm bé nhé.',
      '30-36': 'Con yêu mẹ lắm!'
    },
    quizPrompt: {
      '18-24': 'Mẹ ở đâu rồi bé ơi?',
      '24-30': 'Bé gọi mẹ ơi và chạm vào hình Mẹ nhé!',
      '30-36': 'Ai hay ôm ấp và hát ru bé mỗi tối nào?'
    },
    parentCue: 'Mẹ ôm bé vào lòng, nhìn vào mắt bé và mỉm cười: "Mẹ đây! Mẹ yêu bé!"'
  },
  {
    id: 'ongba',
    category: 'family',
    word: 'Ông Bà',
    sound: 'Chào ạ!',
    slowText: 'Con... chào... ông... bà... ạ',
    tint: '#FDF4DE',
    sfx: 'warm',
    phrases: {
      '18-24': 'Ông... Bà! Chào ạ.',
      '24-30': 'Chào ông bà ạ.',
      '30-36': 'Con chào ông bà ạ!'
    },
    quizPrompt: {
      '18-24': 'Ông Bà ở đâu nào?',
      '24-30': 'Bé khoanh tay chào Ông Bà nhé!',
      '30-36': 'Bé tìm hình Ông Bà để gửi lời chào lễ phép nào!'
    },
    parentCue: 'Làm mẫu khoanh tay, cúi đầu nhẹ và nói chậm "Chào ạ!" — bé học qua bắt chước rất nhanh.'
  },
  {
    id: 'mat',
    category: 'family',
    word: 'Đôi mắt',
    sound: 'Chớp chớp!',
    slowText: 'Đôi... mắt... chớp... chớp',
    tint: '#E9F3FA',
    sfx: 'sparkle',
    phrases: {
      '18-24': 'Cái mắt! Chớp chớp.',
      '24-30': 'Mắt chớp chớp.',
      '30-36': 'Mắt con nhìn thấy mẹ.'
    },
    quizPrompt: {
      '18-24': 'Đôi mắt xinh ở đâu nào?',
      '24-30': 'Bộ phận nào giúp bé nhìn và chớp chớp nhỉ?',
      '30-36': 'Bé chạm vào đôi mắt tròn xinh nhé!'
    },
    parentCue: 'Chơi ú òa che mắt: "Ú... òa! Mắt bé đâu rồi? Mắt mẹ đây nè!"'
  },
  {
    id: 'mui',
    category: 'family',
    word: 'Cái mũi',
    sound: 'Hít hà!',
    slowText: 'Cái... mũi... ngửi... hoa',
    tint: '#F5EDF4',
    sfx: 'chime',
    phrases: {
      '18-24': 'Cái mũi! Hít hà.',
      '24-30': 'Mũi ngửi hoa thơm.',
      '30-36': 'Mũi ngửi hoa thơm quá!'
    },
    quizPrompt: {
      '18-24': 'Cái mũi xinh ở đâu bé ơi?',
      '24-30': 'Cái gì giúp bé hít hà ngửi hoa thơm?',
      '30-36': 'Bé chạm vào cái mũi xinh nhé!'
    },
    parentCue: 'Chạm nhẹ mũi bé kêu "tít!" rồi hỏi: "Mũi của ba đâu?" để bé chủ động chỉ.'
  },
  {
    id: 'tay',
    category: 'family',
    word: 'Bàn tay',
    sound: 'Vỗ tay!',
    slowText: 'Bàn... tay... vỗ... tay',
    tint: '#FDF4DE',
    sfx: 'clap',
    phrases: {
      '18-24': 'Bàn tay! Vỗ tay.',
      '24-30': 'Bé vỗ tay hoan hô.',
      '30-36': 'Con vỗ tay hoan hô!'
    },
    quizPrompt: {
      '18-24': 'Bàn tay xinh ở đâu nào?',
      '24-30': 'Cái gì giúp bé vỗ tay hoan hô nhỉ?',
      '30-36': 'Bé tìm bàn tay xinh để vẫy chào Gấu nhé!'
    },
    parentCue: 'Hát câu quen thuộc "Hai bàn tay của em" và vẫy tay "bye bye" mỗi khi ra ngoài.'
  },

  // ================= THIÊN NHIÊN =================
  {
    id: 'mattroi',
    category: 'nature',
    word: 'Mặt trời',
    sound: 'Ấm quá!',
    slowText: 'Ông... mặt... trời... sáng',
    tint: '#FDF4DE',
    sfx: 'sparkle',
    phrases: {
      '18-24': 'Mặt trời! Ấm quá.',
      '24-30': 'Mặt trời tỏa nắng.',
      '30-36': 'Mặt trời chiếu nắng ấm.'
    },
    quizPrompt: {
      '18-24': 'Ông mặt trời ở đâu bé ơi?',
      '24-30': 'Ai tỏa nắng ấm áp trên bầu trời buổi sáng?',
      '30-36': 'Bé vẫy tay chào ông mặt trời vàng rực nhé!'
    },
    parentCue: 'Mỗi sáng mở rèm cửa, cùng bé vẫy tay nói: "Chào ông mặt trời!"'
  },
  {
    id: 'mua',
    category: 'nature',
    word: 'Mưa',
    sound: 'Tí tách!',
    slowText: 'Tí... tách... Trời... mưa',
    tint: '#E9F3FA',
    sfx: 'rain',
    phrases: {
      '18-24': 'Tí tách! Trời mưa.',
      '24-30': 'Trời mưa tí tách.',
      '30-36': 'Mưa rơi tí tách tí tách.'
    },
    quizPrompt: {
      '18-24': 'Đám mây mưa đâu rồi?',
      '24-30': 'Cái gì rơi tí tách từ đám mây nhỉ?',
      '30-36': 'Bé tìm đám mây đang thả hạt mưa tí tách nhé!'
    },
    parentCue: 'Gõ nhẹ đầu ngón tay lên bàn tạo tiếng mưa "tí tách, tí tách" cùng bé.'
  },
  {
    id: 'hoa',
    category: 'nature',
    word: 'Bông hoa',
    sound: 'Thơm quá!',
    slowText: 'Bông... hoa... thơm... quá',
    tint: '#FBECE6',
    sfx: 'sparkle',
    phrases: {
      '18-24': 'Bông hoa! Thơm quá.',
      '24-30': 'Bông hoa nở đẹp.',
      '30-36': 'Bông hoa nở thơm quá!'
    },
    quizPrompt: {
      '18-24': 'Bông hoa xinh ở đâu nào?',
      '24-30': 'Cái gì nở đẹp và ngửi thơm quá nhỉ?',
      '30-36': 'Bé tìm bông hoa đang nở rực rỡ nhé!'
    },
    parentCue: 'Cùng bé giả vờ hít hà bông hoa: "Hít vào... à, thơm quá!" giúp rèn hơi thở mềm.'
  },
  {
    id: 'trang',
    category: 'nature',
    word: 'Mặt trăng',
    sound: 'Ngủ ngon!',
    slowText: 'Ông... trăng... sáng... quá',
    tint: '#F5EDF4',
    sfx: 'lullaby',
    phrases: {
      '18-24': 'Ông trăng! Ngủ ngon.',
      '24-30': 'Ông trăng trên trời.',
      '30-36': 'Trăng lên rồi, ngủ ngon nhé!'
    },
    quizPrompt: {
      '18-24': 'Ông trăng ở đâu bé ơi?',
      '24-30': 'Buổi tối ai sáng lung linh trên bầu trời nhỉ?',
      '30-36': 'Bé tìm ông trăng lưỡi liềm trên trời đêm nhé!'
    },
    parentCue: 'Buổi tối nhìn qua cửa sổ chào ông trăng giúp tạo nếp ngủ êm dịu.'
  },
  {
    id: 'cay',
    category: 'nature',
    word: 'Cây xanh',
    sound: 'Xào xạc!',
    slowText: 'Cây... xanh... lá... mát',
    tint: '#EAF4EC',
    sfx: 'chime',
    phrases: {
      '18-24': 'Cái cây! Xanh quá.',
      '24-30': 'Cây xanh lá mát.',
      '30-36': 'Lá cây rung rinh trong gió.'
    },
    quizPrompt: {
      '18-24': 'Cái cây xanh ở đâu nào?',
      '24-30': 'Cái gì có nhiều lá xanh mát nhỉ?',
      '30-36': 'Bé chạm vào cái cây xanh đang rung rinh nhé!'
    },
    parentCue: 'Khi đi dạo, cho bé sờ vào lá cây thật và mô tả: "Lá xanh nè, gió thổi xào xạc!"'
  }
];

export const CATEGORIES = [...CORE_CATEGORIES, ...EXTRA_CATEGORIES];

/** 52 từ: 30 danh từ quen thuộc + 12 từ hành động + 10 từ giao tiếp */
export const VOCABULARY = [...CORE_VOCABULARY, ...EXTRA_VOCABULARY];

/** Từ dùng được trong trò chơi Nghe & Tìm (bỏ các từ trừu tượng như "nữa", "hết") */
export const QUIZ_VOCABULARY = VOCABULARY.filter((item) => item.quiz !== false);

export function getVocabById(id) {
  return VOCABULARY.find((item) => item.id === id) || VOCABULARY[0];
}

export function getVocabByCategory(categoryId) {
  return VOCABULARY.filter((item) => item.category === categoryId);
}

export function getStageMeta(stageId) {
  return AGE_STAGES.find((s) => s.id === stageId) || AGE_STAGES[0];
}
