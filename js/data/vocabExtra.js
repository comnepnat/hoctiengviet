/**
 * Từ hành động & Từ giao tiếp — những từ giúp bé bắt đầu GHÉP CÂU.
 * Trẻ 18–36 tháng cần động từ (ăn, uống, đi…) và từ xã hội (nữa, hết, cho con…) bên cạnh danh từ
 * để chuyển từ "từ đơn" sang "cụm 2 từ" ("ăn nữa", "mẹ bế", "hết rồi").
 * Câu mẫu: 18–24 tháng 1–3 từ · 24–30 tháng 2–4 từ · 30–36 tháng 3–6 từ.
 */

export const EXTRA_CATEGORIES = [
  { id: 'actions', name: 'Bé làm gì?', tint: '#FFF1E0', icon: '🏃' },
  { id: 'social', name: 'Từ giao tiếp', tint: '#EEF0FA', icon: '💬' }
];

const A = '#FFF1E0';
const S = '#EEF0FA';

export const EXTRA_VOCABULARY = [
  // ================= BÉ LÀM GÌ? (ĐỘNG TỪ) =================
  {
    id: 'an', category: 'actions', word: 'Ăn', emoji: '🥣', sound: 'Măm măm!', slowText: 'Ăn... măm... măm', tint: A, sfx: 'crunch',
    phrases: { '18-24': 'Ăn! Măm măm.', '24-30': 'Bé ăn cơm.', '30-36': 'Con ăn nữa ạ!' },
    quizPrompt: { '18-24': 'Bé ăn đâu nào?', '24-30': 'Hình nào bé đang ăn?', '30-36': 'Bé tìm hình bạn nhỏ đang ăn nhé!' },
    parentCue: 'Trong bữa ăn, mỗi thìa đưa lên ba mẹ nói "Ăn!" rồi chờ 3 giây để bé nói theo trước khi đút.'
  },
  {
    id: 'uong', category: 'actions', word: 'Uống', emoji: '🥤', sound: 'Ực ực!', slowText: 'Uống... ực... ực', tint: A, sfx: 'gulp',
    phrases: { '18-24': 'Uống! Ực ực.', '24-30': 'Bé uống nước.', '30-36': 'Con muốn uống nước ạ.' },
    quizPrompt: { '18-24': 'Uống ở đâu nhỉ?', '24-30': 'Hình nào bé đang uống?', '30-36': 'Bé chỉ hình bạn đang uống nước nhé!' },
    parentCue: 'Cầm cốc lên ngang miệng ba mẹ, nói "Uống?" với giọng hỏi, chờ bé nói "uống" hoặc gật đầu rồi mới đưa.'
  },
  {
    id: 'ngu', category: 'actions', word: 'Ngủ', emoji: '😴', sound: 'Khò khò!', slowText: 'Ngủ... khò... khò', tint: A, sfx: 'lullaby',
    phrases: { '18-24': 'Ngủ! Khò khò.', '24-30': 'Gấu đi ngủ.', '30-36': 'Con buồn ngủ rồi mẹ ơi.' },
    quizPrompt: { '18-24': 'Ai đang ngủ nào?', '24-30': 'Hình nào đang ngủ khò khò?', '30-36': 'Bé tìm hình bạn đang ngủ say nhé!' },
    parentCue: 'Chơi giả vờ: đặt gấu bông nằm xuống, áp tay lên má nói "Ngủ… khò khò", rồi để bé ru gấu.'
  },
  {
    id: 'di', category: 'actions', word: 'Đi', emoji: '🚶', sound: 'Đi nào!', slowText: 'Đi... đi... nào', tint: A, sfx: 'drum',
    phrases: { '18-24': 'Đi! Đi nào.', '24-30': 'Bé đi chơi.', '30-36': 'Mình đi công viên nhé!' },
    quizPrompt: { '18-24': 'Đi nào, hình nào nhỉ?', '24-30': 'Hình nào bạn đang đi?', '30-36': 'Bé chỉ bạn đang đi bộ nhé!' },
    parentCue: 'Trước khi ra khỏi nhà, nắm tay bé và nói "Đi!" thật vui, chờ bé lặp lại rồi mới mở cửa.'
  },
  {
    id: 'chay', category: 'actions', word: 'Chạy', emoji: '🏃', sound: 'Chạy nhanh!', slowText: 'Chạy... chạy... nhanh', tint: A, sfx: 'drum',
    phrases: { '18-24': 'Chạy! Chạy!', '24-30': 'Bé chạy nhanh.', '30-36': 'Con chạy nhanh lắm!' },
    quizPrompt: { '18-24': 'Bạn chạy đâu rồi?', '24-30': 'Hình nào đang chạy?', '30-36': 'Bé tìm bạn đang chạy thật nhanh nhé!' },
    parentCue: 'Chơi "Sẵn sàng… chạy!": ba mẹ dừng lại trước chữ "chạy" để bé tự nói rồi cùng chạy.'
  },
  {
    id: 'nhay', category: 'actions', word: 'Nhảy', emoji: '🦘', sound: 'Nhảy lên!', slowText: 'Nhảy... nhảy... lên', tint: A, sfx: 'bounce',
    phrases: { '18-24': 'Nhảy! Hop!', '24-30': 'Bé nhảy lên.', '30-36': 'Con nhảy cao như thỏ!' },
    quizPrompt: { '18-24': 'Ai đang nhảy nào?', '24-30': 'Hình nào đang nhảy?', '30-36': 'Bé chỉ bạn đang nhảy lên cao nhé!' },
    parentCue: 'Nắm hai tay bé, đếm "Một, hai…" rồi dừng chờ bé nói "Nhảy!" trước khi cùng nhảy lên.'
  },
  {
    id: 'tam', category: 'actions', word: 'Tắm', emoji: '🛁', sound: 'Ào ào!', slowText: 'Tắm... ào... ào', tint: A, sfx: 'splash',
    phrases: { '18-24': 'Tắm! Ào ào.', '24-30': 'Bé đi tắm.', '30-36': 'Con tắm xong thơm quá!' },
    quizPrompt: { '18-24': 'Tắm đâu nào?', '24-30': 'Hình nào bé đang tắm?', '30-36': 'Bé tìm hình bạn đang tắm nhé!' },
    parentCue: 'Lúc tắm, gọi tên từng việc thật ngắn: "Dội nước… ào ào!", "Xà phòng… xoa xoa!"'
  },
  {
    id: 'danhrang', category: 'actions', word: 'Đánh răng', emoji: '🪥', sound: 'Xoẹt xoẹt!', slowText: 'Đánh... răng... xoẹt... xoẹt', tint: A, sfx: 'water',
    phrases: { '18-24': 'Răng! Xoẹt xoẹt.', '24-30': 'Bé đánh răng.', '30-36': 'Con đánh răng trắng tinh!' },
    quizPrompt: { '18-24': 'Đánh răng đâu nào?', '24-30': 'Hình nào đang đánh răng?', '30-36': 'Bé chỉ bạn đang đánh răng nhé!' },
    parentCue: 'Đánh răng cùng bé trước gương, mỗi lần chải nói "xoẹt xoẹt" để bé bắt chước âm và nhịp.'
  },
  {
    id: 'om', category: 'actions', word: 'Ôm', emoji: '🤗', sound: 'Ôm nào!', slowText: 'Ôm... ôm... nào', tint: A, sfx: 'hug',
    phrases: { '18-24': 'Ôm! Ôm mẹ.', '24-30': 'Mẹ ôm bé.', '30-36': 'Con ôm mẹ thật chặt!' },
    quizPrompt: { '18-24': 'Ôm nhau đâu nào?', '24-30': 'Hình nào đang ôm?', '30-36': 'Bé tìm hình hai bạn đang ôm nhau nhé!' },
    parentCue: 'Dang tay chờ bé chạy tới, nói "Ôm!" thật ấm áp. Lần sau dang tay và chờ bé nói trước.'
  },
  {
    id: 'hon', category: 'actions', word: 'Thơm má', emoji: '😘', sound: 'Chụt chụt!', slowText: 'Thơm... má... chụt... chụt', tint: A, sfx: 'warm',
    phrases: { '18-24': 'Chụt! Thơm má.', '24-30': 'Bé thơm má mẹ.', '30-36': 'Con thơm má ba nhé!' },
    quizPrompt: { '18-24': 'Chụt chụt ở đâu?', '24-30': 'Hình nào đang thơm má?', '30-36': 'Bé chỉ hình bạn đang thơm má nhé!' },
    parentCue: 'Chìa má ra và nói "Thơm má mẹ nào!", khen thật to khi bé làm "chụt" — âm môi rất dễ cho bé.'
  },
  {
    id: 'ngoi', category: 'actions', word: 'Ngồi', emoji: '🪑', sound: 'Ngồi xuống!', slowText: 'Ngồi... xuống', tint: A, sfx: 'tap',
    phrases: { '18-24': 'Ngồi! Ngồi xuống.', '24-30': 'Bé ngồi ghế.', '30-36': 'Con ngồi ngoan ăn cơm.' },
    quizPrompt: { '18-24': 'Ngồi đâu nào?', '24-30': 'Hình nào đang ngồi?', '30-36': 'Bé tìm bạn đang ngồi trên ghế nhé!' },
    parentCue: 'Chơi "Đứng lên – Ngồi xuống": ba mẹ hô, bé làm theo; sau đó đổi vai cho bé hô.'
  },
  {
    id: 'vay', category: 'actions', word: 'Vẫy tay', emoji: '👋', sound: 'Bai bai!', slowText: 'Vẫy... tay... bai... bai', tint: A, sfx: 'chime',
    phrases: { '18-24': 'Bai bai!', '24-30': 'Bé vẫy tay chào.', '30-36': 'Con chào tạm biệt ạ!' },
    quizPrompt: { '18-24': 'Bai bai ở đâu?', '24-30': 'Hình nào đang vẫy tay?', '30-36': 'Bé chỉ bạn đang vẫy tay tạm biệt nhé!' },
    parentCue: 'Mỗi khi có người ra về, vẫy tay cùng bé và nói "Bai bai!" — cử chỉ đi kèm lời giúp bé nói sớm hơn.'
  },

  // ================= TỪ GIAO TIẾP (XÃ HỘI) =================
  {
    id: 'nua', category: 'social', word: 'Nữa', emoji: '🍪➕', sound: 'Nữa nữa!', slowText: 'Nữa... nữa', tint: S, sfx: 'sparkle', quiz: false,
    phrases: { '18-24': 'Nữa! Nữa!', '24-30': 'Ăn nữa. Chơi nữa.', '30-36': 'Con muốn chơi nữa ạ!' },
    quizPrompt: { '18-24': 'Nữa!', '24-30': 'Nữa!', '30-36': 'Nữa!' },
    parentCue: 'Đưa bé từng miếng nhỏ thay vì cả đĩa. Khi bé đòi, hỏi "Nữa không?" và chờ bé nói "nữa" (hoặc làm dấu chụm tay).'
  },
  {
    id: 'het', category: 'social', word: 'Hết', emoji: '🙌', sound: 'Hết rồi!', slowText: 'Hết... rồi', tint: S, sfx: 'chime', quiz: false,
    phrases: { '18-24': 'Hết! Hết rồi.', '24-30': 'Sữa hết rồi.', '30-36': 'Con ăn hết rồi mẹ ơi!' },
    quizPrompt: { '18-24': 'Hết!', '24-30': 'Hết!', '30-36': 'Hết!' },
    parentCue: 'Xòe hai bàn tay trống, lắc nhẹ và nói "Hết rồi!" mỗi khi kết thúc bữa ăn, bài hát hay trò chơi.'
  },
  {
    id: 'khong', category: 'social', word: 'Không', emoji: '🙅', sound: 'Không ạ!', slowText: 'Không... ạ', tint: S, sfx: 'knock', quiz: false,
    phrases: { '18-24': 'Không! Lắc đầu.', '24-30': 'Con không ăn.', '30-36': 'Con không thích cái này ạ.' },
    quizPrompt: { '18-24': 'Không!', '24-30': 'Không!', '30-36': 'Không!' },
    parentCue: 'Cho bé chọn giữa 2 thứ ("Táo hay chuối?") và chấp nhận khi bé nói "không" — bé học được lời nói có sức mạnh.'
  },
  {
    id: 'chocon', category: 'social', word: 'Cho con', emoji: '🤲', sound: 'Cho con!', slowText: 'Cho... con', tint: S, sfx: 'warm', quiz: false,
    phrases: { '18-24': 'Cho con!', '24-30': 'Cho con bóng.', '30-36': 'Mẹ cho con quả táo ạ.' },
    quizPrompt: { '18-24': 'Cho con!', '24-30': 'Cho con!', '30-36': 'Cho con!' },
    parentCue: 'Để đồ chơi yêu thích ngoài tầm tay. Khi bé với, nói mẫu "Cho con!" và chờ bé thử nói trước khi đưa.'
  },
  {
    id: 'cuacon', category: 'social', word: 'Của con', emoji: '🧸👈', sound: 'Của con!', slowText: 'Của... con', tint: S, sfx: 'hug', quiz: false,
    phrases: { '18-24': 'Của con!', '24-30': 'Gấu của con.', '30-36': 'Cái này là của con ạ!' },
    quizPrompt: { '18-24': 'Của con!', '24-30': 'Của con!', '30-36': 'Của con!' },
    parentCue: 'Khi cất đồ, chỉ từng món: "Dép của mẹ… dép của con!" để bé phân biệt và nói theo.'
  },
  {
    id: 'chao', category: 'social', word: 'Chào', emoji: '🙇', sound: 'Con chào ạ!', slowText: 'Con... chào... ạ', tint: S, sfx: 'bell', quiz: false,
    phrases: { '18-24': 'Chào ạ!', '24-30': 'Con chào bà ạ.', '30-36': 'Con chào cô giáo ạ!' },
    quizPrompt: { '18-24': 'Chào!', '24-30': 'Chào!', '30-36': 'Chào!' },
    parentCue: 'Khoanh tay làm mẫu mỗi khi gặp người quen. Đừng ép bé chào — chỉ cần làm mẫu đều đặn, bé sẽ bắt chước.'
  },
  {
    id: 'camon', category: 'social', word: 'Cảm ơn', emoji: '🙏', sound: 'Cảm ơn ạ!', slowText: 'Cảm... ơn... ạ', tint: S, sfx: 'chime', quiz: false,
    phrases: { '18-24': 'Ơn ạ!', '24-30': 'Con cảm ơn ạ.', '30-36': 'Con cảm ơn mẹ ạ!' },
    quizPrompt: { '18-24': 'Cảm ơn!', '24-30': 'Cảm ơn!', '30-36': 'Cảm ơn!' },
    parentCue: 'Bé 18–24 tháng thường chỉ nói được "ơn ạ" — vẫn khen bé thật nhiều và nhắc lại đầy đủ "Cảm ơn ạ!".'
  },
  {
    id: 'da', category: 'social', word: 'Dạ', emoji: '🙋', sound: 'Dạ!', slowText: 'Dạ... ạ', tint: S, sfx: 'bell', quiz: false,
    phrases: { '18-24': 'Dạ!', '24-30': 'Dạ, con đây.', '30-36': 'Dạ, con nghe rồi ạ!' },
    quizPrompt: { '18-24': 'Dạ!', '24-30': 'Dạ!', '30-36': 'Dạ!' },
    parentCue: 'Chơi gọi tên: ba gọi "Bé ơi!", mẹ thì thầm mẫu "Dạ!" để bé học cách đáp lời.'
  },
  {
    id: 'uoa', category: 'social', word: 'Ú òa', emoji: '🙈', sound: 'Ú òa!', slowText: 'Ú... òa', tint: S, sfx: 'magic', quiz: false,
    phrases: { '18-24': 'Ú òa!', '24-30': 'Mẹ đâu rồi? Ú òa!', '30-36': 'Bé trốn đâu rồi? Ú òa!' },
    quizPrompt: { '18-24': 'Ú òa!', '24-30': 'Ú òa!', '30-36': 'Ú òa!' },
    parentCue: 'Che mặt bằng khăn, dừng lâu một chút trước "…òa!" để bé tự nói phần cuối. Lặp lại nhiều lần!'
  },
  {
    id: 'giup', category: 'social', word: 'Giúp con', emoji: '🤝', sound: 'Giúp con!', slowText: 'Giúp... con', tint: S, sfx: 'knock', quiz: false,
    phrases: { '18-24': 'Giúp! Giúp con.', '24-30': 'Mẹ giúp con.', '30-36': 'Mẹ mở giúp con với ạ.' },
    quizPrompt: { '18-24': 'Giúp con!', '24-30': 'Giúp con!', '30-36': 'Giúp con!' },
    parentCue: 'Đưa bé hộp đồ chơi đóng chặt. Khi bé loay hoay, nói mẫu "Giúp con!" rồi chờ bé nói trước khi mở.'
  }
];
