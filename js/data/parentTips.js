/**
 * Mẹo đồng hành dạy bé học nói tự nhiên (dựa trên nguyên tắc Hanen & Montessori)
 */

export const DAILY_PARENT_TIPS = [
  {
    title: 'Quy tắc chờ đợi 5 giây',
    desc: 'Sau khi gọi tên đồ vật hoặc hỏi bé, hãy mỉm cười chờ ít nhất 5 giây. Não bé 18–36 tháng cần thêm thời gian để sắp xếp âm thanh và bật ra tiếng nói.'
  },
  {
    title: 'Mở rộng thêm 1 từ',
    desc: 'Khi bé nói "Mèo!", ba mẹ hãy khen và mở rộng nhẹ nhàng: "Đúng rồi, con mèo trắng!" hoặc "Mèo kêu meo meo!". Không ép bé lặp lại từng chữ.'
  },
  {
    title: 'Ngang tầm mắt với bé',
    desc: 'Ngồi xuống ngang tầm mắt để bé nhìn rõ cử động môi, lưỡi và biểu cảm gương mặt của ba mẹ khi phát âm. Bé học nói tốt nhất qua khuôn mặt người thân.'
  },
  {
    title: 'Thu âm giọng Ba Mẹ',
    desc: 'Nghiên cứu ngôn ngữ sớm cho thấy bé phản hồi nhanh nhất với giọng nói của chính ba mẹ. Hãy thử thu âm vài từ quen thuộc trong Góc Ba Mẹ nhé!'
  },
  {
    title: 'Bình luận thay vì kiểm tra',
    desc: 'Thay vì hỏi liên tục "Đây là con gì? Nói đi!", hãy mô tả vui vẻ: "Ồ, bạn vịt vàng đang bơi cạp cạp kìa!" để bé cảm thấy trò chuyện thật thoải mái.'
  },
  {
    title: 'Khuyến khích mọi âm thanh của bé',
    desc: 'Dù bé chỉ nói "măm" thay vì "ăn cơm" hay "bô" thay vì "ô tô", hãy reo vui công nhận và lặp lại từ đúng một cách tự nhiên, không chê hay sửa gắt.'
  },
  {
    title: 'Giữ mỗi buổi học 10–15 phút',
    desc: 'Với bé 18 tháng – 3 tuổi, tương tác ngắn cùng ba mẹ (10–15 phút/ngày) hiệu quả hơn nhiều so với xem màn hình lâu. Hãy bật hẹn giờ Bạn Gấu đi ngủ nhé.'
  }
];

export const SPEECH_MILESTONES = [
  {
    stage: '18–24 tháng',
    points: [
      'Nói được khoảng 20–50 từ đơn và từ tượng thanh (ba, mẹ, măm, meo meo, bíp bíp).',
      'Hiểu các yêu cầu quen thuộc ("Đưa bóng cho mẹ", "Chỉ mũi bé đâu").',
      'Thích bắt chước âm thanh, vẫy tay chào và chỉ vào vật bé muốn.'
    ]
  },
  {
    stage: '24–30 tháng',
    points: [
      'Vốn từ tăng nhanh (50–200 từ), bắt đầu ghép cụm 2–3 từ ("mẹ bế", "ăn chuối", "xe chạy").',
      'Gọi được tên nhiều con vật, đồ ăn, bộ phận cơ thể quen thuộc.',
      'Biết trả lời câu hỏi ngắn "Cái gì đây?", "Ai đây?"'
    ]
  },
  {
    stage: '30–36 tháng',
    points: [
      'Nói được câu ngắn 3–5 từ để diễn đạt nhu cầu ("Con muốn uống sữa ạ").',
      'Bắt đầu dùng từ xưng hô (con, ba, mẹ) và chào hỏi, cảm ơn khi được nhắc.',
      'Kể được ngắn gọn việc bé đang nhìn thấy trong tranh hoặc ngoài công viên.'
    ]
  }
];

/**
 * Dấu hiệu nên hỏi ý kiến chuyên gia (tham khảo các hướng dẫn phổ biến về phát triển ngôn ngữ).
 * Mục đích: giúp Ba Mẹ không bỏ lỡ thời điểm can thiệp sớm — KHÔNG phải công cụ chẩn đoán.
 */
export const WHEN_TO_SEEK_HELP = {
  intro:
    'Mỗi bé có nhịp riêng, nhưng nếu thấy một trong các dấu hiệu dưới đây, Ba Mẹ nên hỏi bác sĩ nhi hoặc chuyên viên âm ngữ trị liệu. Kiểm tra sớm không bao giờ thừa — can thiệp càng sớm càng hiệu quả.',
  groups: [
    {
      age: 'Khoảng 18 tháng',
      signs: [
        'Chưa nói được từ có nghĩa nào (ngoài bập bẹ).',
        'Không chỉ tay để đòi hoặc khoe đồ vật.',
        'Chưa hiểu yêu cầu quen thuộc như "đưa mẹ", "lại đây".'
      ]
    },
    {
      age: 'Khoảng 24 tháng',
      signs: [
        'Nói dưới khoảng 50 từ.',
        'Chưa ghép được cụm 2 từ ("mẹ bế", "ăn nữa").',
        'Chủ yếu chỉ nhại lại lời người khác, ít tự nói.'
      ]
    },
    {
      age: 'Khoảng 30–36 tháng',
      signs: [
        'Chưa nói được câu ngắn 3 từ.',
        'Người trong nhà khó hiểu phần lớn lời bé nói.',
        'Không trả lời được câu hỏi đơn giản ("Cái gì đây?", "Ai đây?").'
      ]
    },
    {
      age: 'Ở bất kỳ độ tuổi nào',
      signs: [
        'Bé mất đi những từ hoặc kỹ năng đã từng có.',
        'Ít quay lại khi được gọi tên hoặc ít phản ứng với âm thanh (nên kiểm tra thính lực).',
        'Ít nhìn mắt, ít hứng thú chơi qua lại với người thân.'
      ]
    }
  ],
  note: 'Bi Bô chỉ là công cụ chơi cùng bé, không thay thế việc khám và đánh giá của chuyên gia.'
};
