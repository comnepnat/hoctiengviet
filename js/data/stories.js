/**
 * 4 Chuyện Nhỏ Mỗi Ngày (Interactive Daily Picture-Book Scenes)
 * Tọa độ điểm chạm (x, y theo %) khớp chính xác với tranh minh họa màu nước.
 */

export const DAILY_STORIES = [
  {
    id: 'morning',
    title: 'Buổi sáng của bé',
    subtitle: 'Chào mặt trời, uống sữa ấm và đọc sách nào!',
    image: './assets/images/scene-morning.jpg',
    introVoice: 'Chào buổi sáng bé yêu! Bé hãy chạm vào các đồ vật trong phòng để cùng trò chuyện nhé!',
    hotspots: [
      {
        id: 'sun',
        x: 33,
        y: 26,
        icon: '☀️',
        word: 'Ông mặt trời',
        sfx: 'sparkle',
        lines: {
          '18-24': 'Mặt trời! Chào ông mặt trời!',
          '24-30': 'Mặt trời thức dậy rồi!',
          '30-36': 'Con chào ông mặt trời buổi sáng ấm áp ạ!'
        },
        prompt: 'Bé vẫy tay chào ông mặt trời nhé!'
      },
      {
        id: 'bed',
        x: 44,
        y: 65,
        icon: '🛏️',
        word: 'Cái giường',
        sfx: 'warm',
        lines: {
          '18-24': 'Dậy thôi! Bé dậy rồi!',
          '24-30': 'Bé thức dậy gấp chăn.',
          '30-36': 'Sáng rồi, bé thức dậy vươn vai thật khỏe!'
        },
        prompt: 'Bé vươn vai nói "Dậy rồi!" cùng Gấu nào.'
      },
      {
        id: 'milk',
        x: 65,
        y: 60,
        icon: '🥛',
        word: 'Cốc sữa ấm',
        sfx: 'gulp',
        lines: {
          '18-24': 'Uống sữa! Ực ực!',
          '24-30': 'Bé uống sữa ấm.',
          '30-36': 'Con uống cốc sữa ấm cho cao lớn nhé!'
        },
        prompt: 'Bé giả vờ nâng cốc uống "ực ực" nhé!'
      },
      {
        id: 'bunny',
        x: 78,
        y: 49,
        icon: '🐰',
        word: 'Bạn thỏ bông',
        sfx: 'hug',
        lines: {
          '18-24': 'Bạn thỏ! Chào thỏ!',
          '24-30': 'Chào bạn thỏ đáng yêu.',
          '30-36': 'Chào bạn thỏ tai dài, hôm nay mình cùng chơi nhé!'
        },
        prompt: 'Bé gọi "Thỏ ơi!" thật to nào.'
      },
      {
        id: 'books',
        x: 78,
        y: 64,
        icon: '📖',
        word: 'Quyển sách',
        sfx: 'chime',
        lines: {
          '18-24': 'Quyển sách! Đọc sách.',
          '24-30': 'Bé cùng đọc sách.',
          '30-36': 'Mình mở quyển sách tranh ra đọc cùng ba mẹ nhé!'
        },
        prompt: 'Bé nói "Đọc sách!" cùng ba mẹ nhé.'
      }
    ]
  },
  {
    id: 'park',
    title: 'Đi công viên chơi',
    subtitle: 'Nghe chim hót, đá bóng tròn và ngắm hoa thơm.',
    image: './assets/images/scene-park.jpg',
    introVoice: 'A, mình ra công viên chơi rồi! Bé xem ở công viên có những gì nào?',
    hotspots: [
      {
        id: 'bird',
        x: 23,
        y: 50,
        icon: '🐦',
        word: 'Con chim xanh',
        sfx: 'bird',
        lines: {
          '18-24': 'Chíp chíp! Con chim!',
          '24-30': 'Chim xanh hót líu lo.',
          '30-36': 'Bạn chim xanh đậu trên cành hót chíp chíp vui quá!'
        },
        prompt: 'Bé bắt chước tiếng chim "chíp chíp" nhé!'
      },
      {
        id: 'ball',
        x: 61,
        y: 73,
        icon: '⚽',
        word: 'Quả bóng tròn',
        sfx: 'bounce',
        lines: {
          '18-24': 'Quả bóng! Tưng tưng!',
          '24-30': 'Đá quả bóng lăn tròn.',
          '30-36': 'Bé đá quả bóng lăn tròn trên bãi cỏ xanh!'
        },
        prompt: 'Bé nói "Quả bóng!" hoặc "Đá bóng!" nào.'
      },
      {
        id: 'flower',
        x: 84,
        y: 76,
        icon: '🌼',
        word: 'Bông hoa cúc',
        sfx: 'sparkle',
        lines: {
          '18-24': 'Bông hoa! Thơm quá!',
          '24-30': 'Bông hoa trắng xinh.',
          '30-36': 'Bông hoa nở đầy cỏ, ngửi mùi thơm quá đi!'
        },
        prompt: 'Bé hít hà rồi nói "Thơm quá!" nhé.'
      },
      {
        id: 'cloud',
        x: 28,
        y: 19,
        icon: '☁️',
        word: 'Đám mây trắng',
        sfx: 'chime',
        lines: {
          '18-24': 'Đám mây! Bay bay!',
          '24-30': 'Mây trắng trên trời.',
          '30-36': 'Đám mây trắng xốp đang bay nhè nhẹ trên bầu trời!'
        },
        prompt: 'Bé chỉ lên cao và nói "Đám mây!" nhé.'
      },
      {
        id: 'sun-park',
        x: 62,
        y: 17,
        icon: '☀️',
        word: 'Nắng ấm',
        sfx: 'warm',
        lines: {
          '18-24': 'Nắng ấm! Mặt trời!',
          '24-30': 'Ông mặt trời chiếu nắng.',
          '30-36': 'Trời hôm nay có nắng ấm đi chơi thích quá!'
        },
        prompt: 'Bé nói "Ấm quá!" cùng ba mẹ nào.'
      }
    ]
  },
  {
    id: 'mealtime',
    title: 'Giờ ăn ngon miệng',
    subtitle: 'Bát cơm thơm, quả táo giòn, chuối vàng và cốc sữa.',
    image: './assets/images/scene-mealtime.jpg',
    introVoice: 'Đến giờ ăn ngon rồi! Bé hãy chạm vào món ăn trên bàn và nói tên món đó nhé!',
    hotspots: [
      {
        id: 'rice',
        x: 42,
        y: 53,
        icon: '🍚',
        word: 'Bát cơm trắng',
        sfx: 'chime',
        lines: {
          '18-24': 'Bát cơm! Măm măm!',
          '24-30': 'Bé ăn cơm ngon.',
          '30-36': 'Con mời ba mẹ ăn cơm! Măm măm ngon quá ạ!'
        },
        prompt: 'Bé nói "Măm măm!" hoặc "Ăn cơm!" nhé.'
      },
      {
        id: 'milk-glass',
        x: 53,
        y: 43,
        icon: '🥛',
        word: 'Ly sữa tươi',
        sfx: 'gulp',
        lines: {
          '18-24': 'Ly sữa! Uống sữa!',
          '24-30': 'Uống sữa cho khỏe.',
          '30-36': 'Con uống hết ly sữa tươi này ạ!'
        },
        prompt: 'Bé nói "Uống sữa!" thật rõ nào.'
      },
      {
        id: 'apple',
        x: 58,
        y: 50,
        icon: '🍎',
        word: 'Quả táo đỏ',
        sfx: 'crunch',
        lines: {
          '18-24': 'Quả táo! Rốp rốp!',
          '24-30': 'Quả táo đỏ giòn.',
          '30-36': 'Quả táo đỏ ngọt lịm, cắn kêu rốp rốp!'
        },
        prompt: 'Bé giả vờ cắn "rốp rốp" nhé!'
      },
      {
        id: 'bananas',
        x: 72,
        y: 50,
        icon: '🍌',
        word: 'Nải chuối vàng',
        sfx: 'sparkle',
        lines: {
          '18-24': 'Quả chuối! Ngọt quá!',
          '24-30': 'Bé thích ăn chuối.',
          '30-36': 'Con muốn ăn quả chuối vàng ngọt ạ!'
        },
        prompt: 'Bé nói "Quả chuối!" cùng Gấu nhé.'
      },
      {
        id: 'plant',
        x: 93,
        y: 39,
        icon: '🪴',
        word: 'Chậu cây xanh',
        sfx: 'chime',
        lines: {
          '18-24': 'Cây xanh! Lá xanh!',
          '24-30': 'Chậu cây xinh xắn.',
          '30-36': 'Chậu cây xanh đặt ở góc nhà thật mát mắt!'
        },
        prompt: 'Bé chỉ vào lá và nói "Cây xanh!" nhé.'
      }
    ]
  },
  {
    id: 'bedtime',
    title: 'Giờ đi ngủ êm dịu',
    subtitle: 'Chào ông trăng, tắt đèn và chúc bạn Gấu ngủ ngon.',
    image: './assets/images/scene-bedtime.jpg',
    introVoice: 'Trời tối êm dịu rồi. Mình cùng chạm nhẹ để chúc mọi người ngủ ngon nhé!',
    hotspots: [
      {
        id: 'moon',
        x: 19,
        y: 20,
        icon: '🌙',
        word: 'Ông trăng',
        sfx: 'lullaby',
        lines: {
          '18-24': 'Ông trăng! Ngủ ngon!',
          '24-30': 'Ông trăng sáng quá.',
          '30-36': 'Ông trăng lên cao rồi, bé đi ngủ thôi nào!'
        },
        prompt: 'Bé nói thì thầm "Chào ông trăng!" nhé.'
      },
      {
        id: 'stars',
        x: 31,
        y: 22,
        icon: '⭐',
        word: 'Ngôi sao',
        sfx: 'sparkle',
        lines: {
          '18-24': 'Ngôi sao! Lấp lánh!',
          '24-30': 'Sao sáng trên trời.',
          '30-36': 'Những ngôi sao vàng lấp lánh trên bầu trời đêm!'
        },
        prompt: 'Bé mở nắm bàn tay như sao lấp lánh nhé.'
      },
      {
        id: 'bear-sleep',
        x: 71,
        y: 55,
        icon: '🧸',
        word: 'Bạn Gấu ngủ',
        sfx: 'lullaby',
        lines: {
          '18-24': 'Ngủ ngon! Khò khò!',
          '24-30': 'Bạn Gấu đi ngủ.',
          '30-36': 'Chúc bạn Gấu đắp chăn ngủ thật ngon nhé!'
        },
        prompt: 'Bé áp tay lên má và nói "Ngủ ngon!" nào.'
      },
      {
        id: 'lamp',
        x: 87,
        y: 50,
        icon: '💡',
        word: 'Đèn ngủ',
        sfx: 'warm',
        lines: {
          '18-24': 'Đèn ngủ! Ấm áp!',
          '24-30': 'Bật đèn ngủ dịu.',
          '30-36': 'Đèn ngủ tỏa ánh sáng vàng thật ấm áp!'
        },
        prompt: 'Bé nói "Đèn ngủ!" thật nhẹ nhàng nhé.'
      },
      {
        id: 'toy-car',
        x: 22,
        y: 89,
        icon: '🚗',
        word: 'Xe ô tô gỗ',
        sfx: 'car',
        lines: {
          '18-24': 'Ô tô! Cất xe!',
          '24-30': 'Cất đồ chơi gọn.',
          '30-36': 'Trước khi ngủ mình cất xe ô tô gọn gàng nhé!'
        },
        prompt: 'Bé vẫy tay "Bye bye ô tô!" nhé.'
      }
    ]
  }
];
