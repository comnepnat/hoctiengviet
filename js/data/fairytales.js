/**
 * Kho Truyện Cổ Tích Đặc Sắc (< 10 phút đọc) cho bé 18 tháng – 3 tuổi
 * 16 câu chuyện cổ tích kinh điển Việt Nam & thế giới (8 Việt Nam + 8 Thế giới), kể lại bằng ngôn ngữ
 * giàu nhịp điệu, nhiều từ tượng thanh, dịu dàng ấm áp và tích hợp tương tác tập nói cùng Ba Mẹ.
 */

import { EXTRA_FAIRY_TALES } from './fairytalesExtra.js';

export const FAIRYTALE_FILTERS = [
  { id: 'all', label: 'Tất cả truyện', icon: '✨' },
  { id: 'vietnam', label: 'Cổ tích Việt Nam', icon: '🏮' },
  { id: 'world', label: 'Cổ tích Thế giới', icon: '🌍' },
  { id: 'bedtime', label: 'Êm dịu giờ ngủ', icon: '🌙' }
];

const CORE_FAIRY_TALES = [
  /* =========================================================================
     1. CÂY KHẾ (ĂN KHẾ TRẢ VÀNG) — Cổ tích Việt Nam (~6 phút)
     ========================================================================= */
  {
    id: 'cay-khe',
    title: 'Cây Khế Ngọt Và Chim Thần',
    shortTitle: 'Cây Khế',
    origin: 'vietnam',
    originLabel: 'Cổ tích Việt Nam',
    bedtimeFriendly: true,
    readMinutes: 6,
    moralTag: '💛 Thật thà & chia sẻ',
    hook: 'Cây khế chín vàng, chim Phượng Hoàng vỗ cánh vù vù và chiếc túi ba gang diệu kỳ.',
    image: './assets/images/fairy-cay-khe.jpg',
    themeColor: '#FDF4DE',
    accentColor: '#C58A21',
    pages: [
      {
        title: 'Hai anh em và cây khế sau nhà',
        emoji: '🌳',
        sfx: 'warm',
        paragraphs: [
          'Ngày xửa ngày xưa, ở một ngôi làng nhỏ yên bình, có hai anh em sống cùng nhau. Người anh thích giữ nhiều đồ đạc cho riêng mình, còn người em lại rất hiền lành, chăm chỉ và hay cười.',
          'Khi lớn lên, hai anh em ra ở riêng. Người anh lấy hết nhà lớn và ruộng vườn rộng, chỉ chia cho người em một túp lều tranh nho nhỏ và một cây khế ngọt ở góc vườn.',
          'Người em chẳng hề buồn bã. Sáng nào anh cũng ra tưới nước rào rào, nhổ cỏ và trò chuyện dịu dàng với cây khế nhỏ của mình.'
        ],
        funPhrase: 'Tưới cây rào rào! Cây khế lớn mau nhé!',
        echoWord: 'Cây khế',
        parentPrompt: {
          '18-24': 'Ba mẹ chỉ vào cây khế trong tranh và mời bé nói: "Cây khế! Quả vàng!"',
          '24-30': 'Hỏi bé: "Người em đang làm gì cho cây khế nhỉ?" (Tưới cây!).',
          '30-36': 'Trò chuyện cùng bé: "Nếu bé có một cái cây nhỏ, bé sẽ chăm sóc cây thế nào?"'
        }
      },
      {
        title: 'Mùa khế chín vàng trĩu cành',
        emoji: '⭐',
        sfx: 'sparkle',
        paragraphs: [
          'Nhờ bàn tay chăm sóc ân cần, chẳng bao lâu cây khế vươn cành xanh mướt, nở đầy những chùm hoa tím li ti xinh xắn.',
          'Rồi mùa thu tới, trên cành kết bao nhiêu là quả khế căng mọng, vàng ươm như những ngôi sao nhỏ lấp lánh dưới nắng mai. Mùi khế chín thơm dịu lan khắp khu vườn.',
          'Vợ chồng người em vui lắm, dự định hôm sau sẽ hái khế mang ra chợ đổi lấy gạo trắng nấu cơm thơm.'
        ],
        funPhrase: 'Quả khế vàng ươm! Thơm quá đi thôi!',
        echoWord: 'Quả khế',
        parentPrompt: {
          '18-24': 'Mời bé hít hà giả vờ ngửi hương khế rồi nói: "Thơm quá!"',
          '24-30': 'Cùng bé đếm thử 1, 2, 3 quả khế vàng trên tranh nhé.',
          '30-36': 'Hỏi bé: "Quả khế cắt ngang có hình giống gì nhỉ?" (Hình ngôi sao!).'
        }
      },
      {
        title: 'Bạn chim Phượng Hoàng ghé thăm',
        emoji: '🐦',
        sfx: 'wind',
        paragraphs: [
          'Bỗng một buổi sáng, có tiếng vỗ cánh thật to: "Vù… vù… vù!". Một chú chim Phượng Hoàng lông vàng óng ánh, đuôi dài rực rỡ từ trên trời cao nhẹ nhàng đáp xuống cành khế.',
          'Chim thần mổ từng quả khế chín mọng ăn ngon lành: "Chíp chíp, rốp rốp!". Người em chạy ra thấy vậy, chỉ nhẹ nhàng thưa: "Chim ơi, nhà em chỉ có mỗi cây khế này thôi, chim ăn hết thì em lấy gì đổi gạo đây?"',
          'Nghe giọng nói hiền hòa ấy, chim Phượng Hoàng nghiêng đầu mỉm cười rồi cất tiếng ngân vang thật êm tai.'
        ],
        funPhrase: 'Vù vù vù! Chim thần vỗ cánh bay về!',
        echoWord: 'Con chim',
        parentPrompt: {
          '18-24': 'Cùng bé dang hai tay vẫy làm cánh chim và kêu: "Vù vù! Bay bay!"',
          '24-30': 'Hỏi bé: "Chú chim thần có bộ lông màu gì đẹp thế con?"',
          '30-36': 'Khen sự lễ phép của người em: khi nói chuyện với chim, chú rất nhẹ nhàng.'
        }
      },
      {
        title: 'Lời hẹn chiếc túi ba gang',
        emoji: '🎒',
        sfx: 'magic',
        paragraphs: [
          'Chim Phượng Hoàng dịu dàng nói với người em: "Ăn một quả, trả cục vàng, may túi ba gang, mang đi mà đựng!" Nói xong, chim vỗ cánh bay vút vào đám mây trắng bồng bềnh.',
          'Người em nghe lời, về nhà cùng vợ lấy mảnh vải nâu mộc mạc, đo đúng một gang, hai gang, ba gang tay rồi khâu thành một chiếc túi nhỏ xinh xắn.',
          'Sáng hôm sau, khi mặt trời vừa ló rạng, chim Phượng Hoàng lại bay tới, hạ đôi cánh êm ái đón người em ngồi lên lưng.'
        ],
        funPhrase: 'Ăn một quả, trả cục vàng, may túi ba gang!',
        echoWord: 'Túi ba gang',
        parentPrompt: {
          '18-24': 'Xòe bàn tay bé ra đếm nhẹ: "Một gang, hai gang, ba gang!"',
          '24-30': 'Mời bé nhắc theo câu vần vui: "May túi ba gang!"',
          '30-36': 'Hỏi bé: "Tại sao người em chỉ may túi đúng ba gang thôi nhỉ?"'
        }
      },
      {
        title: 'Chuyến bay tới hòn đảo lấp lánh',
        emoji: '✨',
        sfx: 'sparkle',
        paragraphs: [
          'Chim thần cõng người em bay qua những cánh đồng xanh rì, bay qua làn mây trắng xốp và biển xanh rì rào sóng vỗ. Không lâu sau, cả hai đáp xuống một hòn đảo đầy nắng ấm.',
          'Trên bãi cát trắng có biết bao viên đá vàng óng ánh như nắng mai. Người em thật thà, chỉ nhặt vừa đủ đầy chiếc túi nhỏ ba gang rồi lễ phép cảm ơn chim thần.',
          'Chim Phượng Hoàng vui lòng cõng người em bay về nhà bình an. Từ đó, người em có cuộc sống đủ đầy và thường xuyên chia sẻ gạo ngon, bánh thơm cho bà con trong làng.'
        ],
        funPhrase: 'Lấp lánh, lấp lánh! Cảm ơn chim thần nhé!',
        echoWord: 'Cảm ơn',
        parentPrompt: {
          '18-24': 'Mời bé chắp tay nói "Cảm ơn!" giống người em nhé.',
          '24-30': 'Cùng bé mở nắm bàn tay làm ánh sáng "lấp lánh, lấp lánh".',
          '30-36': 'Hỏi bé: "Khi có nhiều đồ ngon, người em đã làm gì cùng bà con?"'
        }
      },
      {
        title: 'Bài học nhỏ của người anh',
        emoji: '🌈',
        sfx: 'water',
        paragraphs: [
          'Nghe tin em mình sung túc, người anh tò mò sang hỏi thăm rồi xin đổi cả nhà to lấy cây khế ngọt. Người em hiền lành vui vẻ đồng ý ngay.',
          'Mùa khế sau, chim thần lại đến và dặn may túi ba gang. Nhưng vì ham quá, người anh lại may một chiếc túi thật to, to bằng cả cái bao gạo lớn!',
          'Lúc bay về qua bãi biển nông, chiếc túi nặng trĩu khiến chim thần mỏi cánh chao đảo. Người anh rơi tùm xuống làn nước mát gần bờ, ướt sũng cả áo quần và giật mình tỉnh ngộ.'
        ],
        funPhrase: 'Ùm! Nặng quá rồi, nhẹ bớt thôi nào!',
        echoWord: 'Nặng quá',
        parentPrompt: {
          '18-24': 'Làm động tác ôm chiếc túi giả vờ nặng: "Ui da, nặng quá!"',
          '24-30': 'Hỏi bé: "Chiếc túi của người anh to hay nhỏ nhỉ?"',
          '30-36': 'Trò chuyện cùng bé: "Vì sao mang vừa đủ lại tốt hơn mang quá nặng?"'
        }
      },
      {
        title: 'Hai anh em lại thương yêu nhau',
        emoji: '💛',
        sfx: 'celebrate',
        paragraphs: [
          'Người anh lồm cồm bò lên bờ cát, tuy ướt mem nhưng may mắn chẳng hề bị đau. Từ giây phút đó, anh hiểu ra rằng tham lam chỉ khiến mình vất vả, còn sống hiền lành mới thật sự vui vẻ.',
          'Anh quay về ôm lấy người em, nói lời xin lỗi chân thành. Người em mỉm cười mời anh bát trà ấm và chia sẻ những quả khế ngọt mát lành.',
          'Từ đó về sau, hai anh em sống hòa thuận, cùng nhau chăm sóc khu vườn xanh mát, và mỗi mùa thu chim Phượng Hoàng lại ghé qua ca hát thật vui.'
        ],
        funPhrase: 'Ôm nhau một cái! Anh em thương nhau nhé!',
        echoWord: 'Thương nhau',
        parentPrompt: {
          '18-24': 'Ba mẹ ôm bé thật ấm áp và nói: "Ôm nhau thương nhau nào!"',
          '24-30': 'Mời bé nói "Xin lỗi" và "Thương nhau" cùng ba mẹ.',
          '30-36': 'Hỏi bé: "Trong câu chuyện Cây Khế, bé thích nhân vật nào nhất?"'
        }
      }
    ],
    ending: {
      moral: 'Sống hiền lành, thật thà và biết chia sẻ sẽ luôn mang lại niềm vui ấm áp quanh mình.',
      questions: [
        'Con thích nhất đoạn chim Phượng Hoàng bay trên mây hay lúc hái quả khế vàng?',
        'Ngày mai con muốn chia sẻ đồ chơi hoặc món ngon với ai nào?'
      ]
    }
  },

  /* =========================================================================
     2. SỰ TÍCH CHÚ CUỘI CUNG TRĂNG — Cổ tích Việt Nam (~6 phút)
     ========================================================================= */
  {
    id: 'chu-cuoi',
    title: 'Sự Tích Chú Cuội Cung Trăng',
    shortTitle: 'Chú Cuội',
    origin: 'vietnam',
    originLabel: 'Cổ tích Việt Nam',
    bedtimeFriendly: true,
    readMinutes: 6,
    moralTag: '🌙 Lòng nhân ái & êm dịu',
    hook: 'Cây đa thần tỏa hương mát dịu và chuyến bay kỳ diệu lên vầng trăng tròn tỏa sáng.',
    image: './assets/images/fairy-chu-cuoi.jpg',
    themeColor: '#E9F3FA',
    accentColor: '#4981AA',
    pages: [
      {
        title: 'Cậu bé Cuội tốt bụng ở ven rừng',
        emoji: '🌿',
        sfx: 'bird',
        paragraphs: [
          'Ngày xưa, bên một khu rừng xanh mát đầy tiếng chim hót chíp chíp, có một chàng trai trẻ tên là Cuội. Cuội rất chăm chỉ, ngày nào cũng đi nhặt củi khô và hái quả rừng giúp đỡ bà con.',
          'Cuội có một người bạn thân nhỏ xíu là chú cún vàng đuôi xoăn. Đi đâu chú cún cũng chạy lăng xăng bên cạnh, vẫy đuôi rối rít: "Gâu gâu! Đợi mình với!"',
          'Mọi người trong làng ai cũng quý Cuội vì nụ cười hiền lành và tấm lòng lúc nào cũng muốn giúp đỡ mọi loài vật nhỏ bé.'
        ],
        funPhrase: 'Gâu gâu! Chú cún chạy theo chú Cuội!',
        echoWord: 'Chú cún',
        parentPrompt: {
          '18-24': 'Chỉ chú cún ngồi bên chú Cuội trong tranh và bắt chước tiếng "Gâu gâu!"',
          '24-30': 'Hỏi bé: "Bạn thân của chú Cuội là con gì nhỉ?"',
          '30-36': 'Hỏi bé: "Vì sao mọi người trong làng lại yêu quý chú Cuội?"'
        }
      },
      {
        title: 'Phát hiện cây đa thần kỳ diệu',
        emoji: '✨',
        sfx: 'magic',
        paragraphs: [
          'Một buổi chiều nắng nhẹ, khi đi vào rừng sâu, Cuội bắt gặp một gốc cây đa non thật lạ. Từng chiếc lá xanh mướt của cây phát ra ánh sáng dịu dàng lấp lánh như sương mai.',
          'Cuội thấy một chú chim nhỏ bị đau cánh nằm dưới gốc cây. Một chiếc lá đa nhẹ nhàng rơi xuống chạm vào cánh chim. Kỳ diệu thay, chú chim nhỏ liền khỏe mạnh ngay, vỗ cánh bay vù lên cành hót líu lo!',
          'Cuội reo lên sung sướng: "Ôi! Đây là cây đa thuốc quý! Mình sẽ mang về trồng trong vườn để giúp chữa lành cho mọi người!"'
        ],
        funPhrase: 'Lấp lánh, lấp lánh! Cây đa thần kỳ quá!',
        echoWord: 'Cây đa',
        parentPrompt: {
          '18-24': 'Chỉ vào tán cây đa xanh lớn và nói chậm: "Cây đa! Lá xanh!"',
          '24-30': 'Hỏi bé: "Khi lá đa chạm vào bạn chim nhỏ, điều gì đã xảy ra nhỉ?"',
          '30-36': 'Khen ý tốt của chú Cuội: "Chú Cuội mang cây về để giúp ai nhỉ?"'
        }
      },
      {
        title: 'Bí mật tưới nước trong veo',
        emoji: '💧',
        sfx: 'water',
        paragraphs: [
          'Cuội cẩn thận đào từng chút đất quanh rễ, bưng cây đa thần về trồng ngay ở góc sân thoáng mát nhất trong nhà. Rồi chú nhớ mãi lời dặn êm dịu từ gió rừng: cây đa quý chỉ thích được tưới bằng nước suối trong veo mà thôi.',
          'Sáng sớm nào Cuội cũng gánh nước suối mát lành tưới cho cây: "Róc rách, róc rách!". Cây đa lớn nhanh như thổi, cành lá sum suê tỏa bóng râm mát rượi cả khoảng sân.',
          'Từ ngày có cây đa, hễ trong làng có ông bà mỏi mệt hay bạn nhỏ nào trầy chân khi chạy nhảy, Cuội đều hái lá đa dịu dàng giúp mọi người mau khỏe lại.'
        ],
        funPhrase: 'Róc rách, róc rách! Tưới nước trong cho cây!',
        echoWord: 'Nước trong',
        parentPrompt: {
          '18-24': 'Cùng bé làm động tác nghiêng bình tưới cây và nói: "Tưới cây!"',
          '24-30': 'Hỏi bé: "Cây đa thần thích uống loại nước nào nhỉ?" (Nước trong!).',
          '30-36': 'Gợi ý bé kể một lần bé bị đau nhẹ và được ba mẹ xoa dịu nhé.'
        }
      },
      {
        title: 'Chiếc lá thần cứu chú cún nhỏ',
        emoji: '🐶',
        sfx: 'dog',
        paragraphs: [
          'Một hôm, chú cún vàng của Cuội chạy đuổi theo đàn bướm trắng nên bị vấp ngã mệt lử bên bờ suối. Cuội vội bế bạn cún về, nhẹ nhàng đắp một chiếc lá đa xanh mát lên trán cún.',
          'Chỉ một lát sau, chú cún mở mắt tròn xoe, bật dậy vẫy đuôi tít mù rồi liếm nhẹ lên bàn tay Cuội như muốn nói lời cảm ơn.',
          'Hai bạn ôm nhau cười khanh khách dưới tán lá xào xạc. Không khí trong khu vườn nhỏ lúc nào cũng ngập tràn tiếng cười ấm áp.'
        ],
        funPhrase: 'Bạn cún khỏe rồi! Gâu gâu vui quá!',
        echoWord: 'Khỏe rồi',
        parentPrompt: {
          '18-24': 'Vẫy tay như đuôi cún và nói vui: "Vui quá! Khỏe rồi!"',
          '24-30': 'Hỏi bé: "Bạn cún cảm ơn chú Cuội bằng cách nào?"',
          '30-36': 'Hỏi bé: "Khi có bạn bị ngã, bé sẽ làm gì để giúp bạn?"'
        }
      },
      {
        title: 'Buổi chiều gió thổi và cây đa bay lên',
        emoji: '🍃',
        sfx: 'wind',
        paragraphs: [
          'Thế nhưng một buổi chiều Cuội đi vắng, có cơn gió nghịch ngợm thổi nước mưa đục chảy tràn vào gốc cây đa thần. Bỗng nhiên mặt đất rung nhẹ "rì rầm", cây đa tỏa ánh sáng vàng dịu rồi từ từ nhấc rễ khỏi mặt đất!',
          'Đúng lúc ấy Cuội và chú cún vừa chạy về tới ngõ. Thấy cây đa quý sắp bay đi, Cuội vội vàng chạy lại nắm lấy chùm rễ cây dài để giữ cây ở lại với dân làng.',
          'Nhưng cây đa bay nhẹ tênh mà mạnh mẽ quá, cuốn luôn cả Cuội lẫn chú cún vàng cùng bay lên bầu trời đêm đầy sao lấp lánh!'
        ],
        funPhrase: 'Vù vù! Cây đa bay lên bầu trời sao!',
        echoWord: 'Bay lên',
        parentPrompt: {
          '18-24': 'Nâng nhẹ tay bé lên cao như đang bay và nói: "Bay lên cao!"',
          '24-30': 'Chỉ lên bầu trời đầy sao trong tranh: "Bé xem trên trời có gì sáng thế?"',
          '30-36': 'Hỏi bé: "Chú Cuội đang nắm vào phần nào của cây đa nhỉ?"'
        }
      },
      {
        title: 'Ngôi nhà mới trên vầng trăng tròn',
        emoji: '🌕',
        sfx: 'lullaby',
        paragraphs: [
          'Cây đa thần cứ bay mãi, bay mãi, nhẹ nhàng như một chiếc diều khổng lồ giữa làn mây êm ái, rồi dừng lại đáp êm xuống mặt trăng tròn vành vạnh sáng rực rỡ.',
          'Trên cung trăng yên bình, cây đa mọc rễ xanh tươi trở lại. Chú Cuội ngồi tựa lưng dưới gốc cây đa, bên cạnh có chú cún nhỏ ngoan ngoãn, cùng nhau ngắm nhìn ngôi làng thân thương phía dưới.',
          'Mỗi đêm trăng rằm sáng tỏ, nhất là dịp Tết Trung Thu rước đèn lung linh, các bạn nhỏ ngước lên trời vẫn thấy bóng chú Cuội đang mỉm cười vẫy tay chào chúc bé ngủ ngon.'
        ],
        funPhrase: 'Chào ông trăng tròn! Chào chú Cuội nhé!',
        echoWord: 'Ông trăng',
        parentPrompt: {
          '18-24': 'Cùng bé vẫy tay về phía mặt trăng và nói thì thầm: "Chào ông trăng!"',
          '24-30': 'Hỏi bé: "Chú Cuội đang ngồi ở đâu nhỉ?" (Trên ông trăng!).',
          '30-36': 'Thủ thỉ cùng bé: "Đêm nay khi nhìn thấy ông trăng, mình cùng vẫy tay chào chú Cuội nhé!"'
        }
      }
    ],
    ending: {
      moral: 'Tấm lòng yêu thương thiên nhiên và giúp đỡ mọi người sẽ tỏa sáng dịu dàng như ánh trăng rằm.',
      questions: [
        'Con thấy chú Cuội và bạn cún ngồi trên ông trăng có dễ thương không?',
        'Mình cùng vẫy tay chúc chú Cuội và bạn cún ngủ thật ngon nhé!'
      ]
    }
  },

  /* =========================================================================
     3. THỎ VÀ RÙA — Ngụ ngôn cổ tích kinh điển (~5 phút)
     ========================================================================= */
  {
    id: 'tho-va-rua',
    title: 'Cuộc Đua Của Thỏ Và Rùa',
    shortTitle: 'Thỏ Và Rùa',
    origin: 'world',
    originLabel: 'Cổ tích Thế giới',
    bedtimeFriendly: true,
    readMinutes: 5,
    moralTag: '🐢 Kiên trì & khiêm tốn',
    hook: 'Bạn Thỏ nhảy nhanh thoăn thoắt, bạn Rùa bước từng bước đều đặn — ai sẽ chạm đích trước đây?',
    image: './assets/images/fairy-tho-rua.jpg',
    themeColor: '#EAF4EC',
    accentColor: '#4E7D5A',
    pages: [
      {
        title: 'Buổi sáng nắng đẹp trên đồng cỏ',
        emoji: '🌼',
        sfx: 'bird',
        paragraphs: [
          'Một buổi sáng nắng ấm rực rỡ trên đồng cỏ xanh mướt đầy hoa cúc trắng, bạn Thỏ trắng tai dài đang tung tăng nhảy nhót: "Nhảy cóc, nhảy cóc!".',
          'Thỏ có đôi chân rất khỏe nên chạy nhanh lắm. Gặp bạn Rùa nhỏ đang thong thả đi dạo bên đường, Thỏ cười khúc khích trêu đùa: "Bạn Rùa ơi, sao bạn bước chậm rì rì thế kia?"',
          'Bạn Rùa nhỏ chẳng hề giận dữ, chỉ mỉm cười hiền hòa đáp: "Mình đi chậm nhưng mình đi rất chắc chắn đấy. Hay mình cùng thi chạy tới gốc cây hoa cuối đồi nhé!"'
        ],
        funPhrase: 'Nhảy cóc, nhảy cóc! Đi chậm mà chắc!',
        echoWord: 'Bạn Rùa',
        parentPrompt: {
          '18-24': 'Chỉ hai bạn trong tranh và mời bé gọi tên: "Bạn Thỏ! Bạn Rùa!"',
          '24-30': 'Hỏi bé: "Bạn Thỏ có đôi tai dài hay ngắn nhỉ?"',
          '30-36': 'Hỏi bé: "Khi bị Thỏ trêu, bạn Rùa có cáu giận không?"'
        }
      },
      {
        title: 'Một, hai, ba — Bắt đầu chạy nào!',
        emoji: '🏁',
        sfx: 'bounce',
        paragraphs: [
          'Các bạn chim xanh, sóc nâu và bướm vàng nghe tin liền kéo tới cổ vũ thật rộn ràng. Bác Cú Mèo đứng làm trọng tài, hô vang: "Một… hai… ba… BẮT ĐẦU!"',
          'Vừa nghe hiệu lệnh, bạn Thỏ phóng vút đi như một cơn gió trắng: "Vèo! Vèo!". Chỉ nhoáng một cái, Thỏ đã chạy tít ra tận đằng xa.',
          'Còn bạn Rùa nhỏ vẫn bình tĩnh nhấc từng bàn chân ngắn ngủn bước đều đặn: "Lộc cộc, từng bước một… từng bước một…"'
        ],
        funPhrase: 'Một, hai, ba! Thỏ chạy vèo, Rùa bước đều!',
        echoWord: 'Một hai ba',
        parentPrompt: {
          '18-24': 'Cùng bé đếm to và vỗ tay: "Một, hai, ba! Chạy nào!"',
          '24-30': 'Mời bé bước chân tại chỗ thật chậm giả làm bạn Rùa: "Từng bước, từng bước".',
          '30-36': 'Đố bé: "Ai là người đứng làm trọng tài đếm một, hai, ba nhỉ?"'
        }
      },
      {
        title: 'Bạn Thỏ dừng lại hái hoa và ngủ gật',
        emoji: '🌸',
        sfx: 'lullaby',
        paragraphs: [
          'Chạy được nửa đường, Thỏ ngoái lại nhìn phía sau chẳng thấy bóng dáng Rùa đâu cả. Thỏ tự tin nghĩ thầm: "Bạn Rùa còn ở xa tít mù khơi! Mình nghỉ mệt một xíu cũng chẳng sao đâu."',
          'Dưới gốc cây nở đầy hoa hồng phấn, làn gió mát thổi nhè nhẹ "hìu hìu". Thỏ nằm cuộn tròn trên thảm cỏ mềm êm như chiếc gối bông, hai mắt lim dim rồi ngủ thiếp đi lúc nào không hay: "Khò… khò… khò…".',
          'Những cánh hoa nhỏ rơi nhẹ xuống chiếc tai trắng mềm của Thỏ trong giấc ngủ trưa ngọt ngào.'
        ],
        funPhrase: 'Khò khò khò! Bạn Thỏ ngủ quên mất rồi!',
        echoWord: 'Ngủ ngon',
        parentPrompt: {
          '18-24': 'Áp hai bàn tay lên má nghiêng đầu giống bạn Thỏ đang ngủ: "Khò khò!"',
          '24-30': 'Hỏi bé: "Bạn Thỏ đang làm gì dưới gốc cây hoa thế con?"',
          '30-36': 'Hỏi bé: "Con đoán xem nếu Thỏ ngủ lâu quá thì chuyện gì sẽ xảy ra?"'
        }
      },
      {
        title: 'Bạn Rùa kiên trì bước qua',
        emoji: '🐢',
        sfx: 'tap',
        paragraphs: [
          'Trong lúc Thỏ say giấc, bạn Rùa nhỏ vẫn không hề dừng bước. Trời hơi nắng một chút, mồ hôi lấm tấm trên trán, Rùa tự nhủ: "Cố lên Rùa ơi! Từng bước, từng bước một là sẽ tới thôi!"',
          'Đi ngang qua gốc cây hoa, thấy Thỏ đang ngủ ngon lành, Rùa khẽ mỉm cười đi thật nhẹ chân để không đánh thức bạn, rồi tiếp tục kiên nhẫn tiến về phía trước.',
          'Bước một, bước hai, bước ba… Vạch đích phía trước đã hiện ra ngày một gần hơn rồi!'
        ],
        funPhrase: 'Cố lên Rùa ơi! Từng bước, từng bước một!',
        echoWord: 'Cố lên',
        parentPrompt: {
          '18-24': 'Nắm tay cổ vũ cùng bé: "Cố lên! Cố lên Rùa ơi!"',
          '24-30': 'Mời bé nói theo: "Rùa đi từng bước một!"',
          '30-36': 'Hỏi bé: "Khi mệt, bạn Rùa có bỏ cuộc không con?"'
        }
      },
      {
        title: 'Tiếng reo hò ở vạch đích!',
        emoji: '🎉',
        sfx: 'clap',
        paragraphs: [
          'Bỗng từ đằng xa vang lên tiếng vỗ tay rộn rã: "Hoan hô! Hoan hô bạn Rùa!". Tiếng reo vui làm bạn Thỏ giật mình tỉnh giấc, dụi mắt nhìn về phía cuối con đường.',
          'Thỏ vội bật dậy nhảy vút đi hết sức: "Vèo! Vèo!". Nhưng khi Thỏ vừa chạy tới nơi, bàn chân nhỏ xíu của bạn Rùa đã chạm qua sợi dây hoa ở vạch đích mất rồi!',
          'Các bạn chim xanh hót vang chúc mừng, còn sóc nâu tặng cho Rùa một vòng hoa cúc trắng thật xinh.'
        ],
        funPhrase: 'Hoan hô bạn Rùa! Vỗ tay nào bộp bộp bộp!',
        echoWord: 'Hoan hô',
        parentPrompt: {
          '18-24': 'Cùng bé vỗ tay thật vui: "Hoan hô! Hoan hô!"',
          '24-30': 'Hỏi bé: "Cuối cùng ai là người chạm vạch đích trước nhỉ?"',
          '30-36': 'Hỏi bé: "Tại sao Rùa đi chậm hơn Thỏ mà lại về đích trước?"'
        }
      },
      {
        title: 'Hai người bạn thân cùng đi dạo',
        emoji: '🤝',
        sfx: 'celebrate',
        paragraphs: [
          'Bạn Thỏ đỏ bừng hai chiếc tai dài vì ngượng ngùng. Thỏ bước tới bắt tay Rùa và nói thật lòng: "Mình xin lỗi vì đã chủ quan trêu bạn. Bạn Rùa kiên trì thật giỏi!"',
          'Rùa cười tít mắt chia cho Thỏ một củ cà rốt giòn tan: "Không sao đâu Thỏ ơi! Bây giờ mình cùng ăn cà rốt rồi đi dạo chung với nhau nhé!"',
          'Từ hôm đó, Thỏ trắng và Rùa nhỏ trở thành đôi bạn thân thiết nhất trên đồng cỏ, lúc nào cũng cổ vũ nhau cùng cố gắng mỗi ngày.'
        ],
        funPhrase: 'Thỏ và Rùa là bạn thân! Vui quá đi!',
        echoWord: 'Bạn thân',
        parentPrompt: {
          '18-24': 'Đập tay (high-five) cùng bé và nói: "Bạn thân! Giỏi quá!"',
          '24-30': 'Hỏi bé: "Rùa đã chia món gì ngon cho bạn Thỏ ăn nhỉ?" (Cà rốt!).',
          '30-36': 'Khích lệ bé: "Giống bạn Rùa, mỗi ngày bé tập nói từng chút một sẽ rất giỏi!"'
        }
      }
    ],
    ending: {
      moral: 'Kiên trì làm từng bước nhỏ đều đặn và không chủ quan sẽ giúp bé làm được những điều thật tuyệt vời.',
      questions: [
        'Con thích giả tiếng Thỏ nhảy cóc hay giả bạn Rùa đi từng bước chậm rãi?',
        'Khi làm việc gì hơi khó một chút, mình sẽ tự nhủ câu gì giống bạn Rùa nhỉ?'
      ]
    }
  },

  /* =========================================================================
     4. CỦ CẢI KHỔNG LỒ — Cổ tích dân gian Nga (~5 phút)
     ========================================================================= */
  {
    id: 'cu-cai-khong-lo',
    title: 'Nhổ Củ Cải Khổng Lồ',
    shortTitle: 'Củ Cải Khổng Lồ',
    origin: 'world',
    originLabel: 'Cổ tích Thế giới',
    bedtimeFriendly: true,
    readMinutes: 5,
    moralTag: '🤝 Đoàn kết cùng nhau',
    hook: 'Củ cải to ơi là to! Ông, Bà, Cháu gái, Cún, Mèo và Chuột nhắt cùng hợp sức nhổ nào!',
    image: './assets/images/fairy-cu-cai.jpg',
    themeColor: '#FBECE6',
    accentColor: '#C86247',
    pages: [
      {
        title: 'Hạt củ cải nhỏ lớn nhanh như thổi',
        emoji: '🌱',
        sfx: 'warm',
        paragraphs: [
          'Trong một ngôi nhà nhỏ có vườn hoa hướng dương vàng rực, có hai ông bà sống cùng cô cháu gái xinh xắn, một chú cún đốm, một chú mèo cam và một bạn chuột nhắt bé xíu.',
          'Mùa xuân tới, Ông lão gieo một hạt củ cải nhỏ xuống đất tơi xốp. Ngày nào Ông cũng tưới nước, nhổ cỏ và thì thầm: "Lớn nhanh nhé củ cải ơi, ngọt nhé củ cải ơi!"',
          'Kỳ lạ thay, củ cải lớn nhanh ơi là lớn! Nó phình to dần, to bằng quả bóng, rồi to bằng cái thúng, cuối cùng trở thành một củ cải KHỔNG LỒ chưa từng thấy!'
        ],
        funPhrase: 'Củ cải to ơi là to! Khổng lồ luôn!',
        echoWord: 'Củ cải',
        parentPrompt: {
          '18-24': 'Dang rộng hai vòng tay thật to cùng bé và nói: "To quá! Củ cải to!"',
          '24-30': 'Chỉ vào củ cải trong tranh: "Củ cải có lá màu xanh hay màu đỏ con nhỉ?"',
          '30-36': 'Hỏi bé: "Ông lão đã làm gì mỗi ngày để củ cải lớn nhanh?"'
        }
      },
      {
        title: 'Ông gọi Bà cùng ra nhổ cải',
        emoji: '👵',
        sfx: 'bounce',
        paragraphs: [
          'Một buổi sáng nắng đẹp, Ông lão ra vườn nhổ củ cải về nấu canh ngọt. Ông nắm chặt chùm lá xanh, kéo lấy kéo để: "Nhổ cải lên! Một, hai, ba… ư hự!". Nhưng củ cải vẫn nằm im thin thít!',
          'Ông lão cười khà khà, gọi to về phía nhà: "Bà lão ơi! Mau ra giúp ông nhổ củ cải với nào!"',
          'Bà lão chạy lon ton ra vườn, nắm chặt áo Ông, Ông nắm lá củ cải. Cả hai cùng kéo: "Một, hai, ba… ư hự!". Ôi chao, củ cải vẫn chưa chịu lên!'
        ],
        funPhrase: 'Bà ơi, ra giúp ông! Một, hai, ba — ư hự!',
        echoWord: 'Một hai ba',
        parentPrompt: {
          '18-24': 'Cầm tay bé nhẹ nhàng kéo nhịp nhàng: "Kéo nào! Một, hai, ba!"',
          '24-30': 'Mời bé gọi to giống ông lão: "Bà ơi, ra giúp nào!"',
          '30-36': 'Hỏi bé: "Ông và Bà cùng kéo đã nhổ được củ cải lên chưa nhỉ?"'
        }
      },
      {
        title: 'Cháu gái và bạn Cún con chạy tới',
        emoji: '🐶',
        sfx: 'dog',
        paragraphs: [
          'Bà lão bèn gọi: "Cháu gái ơi! Mau ra giúp ông bà nhổ củ cải với nào!". Cô bé chạy tung tăng ra ôm lấy lưng Bà, Bà nắm áo Ông, Ông nắm củ cải. "Một, hai, ba… kéo nào!" — củ cải mới chỉ hơi nhúc nhích một tẹo thôi!',
          'Cháu gái gọi ngay bạn thân: "Cún con ơi! Mau ra đây giúp với nào!"',
          'Chú cún đốm sủa vang "Gâu gâu gâu!" rồi chạy lại bám chặt lấy cô bé. Cún kéo Cháu, Cháu kéo Bà, Bà kéo Ông, Ông kéo củ cải… "Một, hai, ba… ư hự!". Củ cải lắc lư nhưng vẫn chưa bật lên được!'
        ],
        funPhrase: 'Gâu gâu! Cún con ơi, kéo nào một hai ba!',
        echoWord: 'Gâu gâu',
        parentPrompt: {
          '18-24': 'Chỉ vào chú cún đốm và cùng bé sủa vui: "Gâu gâu! Cún con!"',
          '24-30': 'Mời bé đếm xem hiện giờ đã có mấy người và bạn nhỏ đang kéo nhé.',
          '30-36': 'Hỏi bé: "Cháu gái đã gọi ai ra phụ giúp tiếp theo nhỉ?"'
        }
      },
      {
        title: 'Mèo cam gọi thêm Chuột nhắt bé xíu',
        emoji: '🐱',
        sfx: 'cat',
        paragraphs: [
          'Cún con gọi lớn: "Mèo cam ơi! Mau ra giúp nhổ củ cải với nào!". Chú mèo cam kêu "Meo meo!" chạy tới túm lấy đuôi Cún. Cả năm người cùng hô vang: "Một, hai, ba… kéo nào!". Củ cải nhô lên gần nửa rồi đấy!',
          'Thấy chỉ thiếu một chút xíu nữa thôi, Mèo cam quay sang gọi bạn hàng xóm bé nhất vườn: "Chuột nhắt ơi! Mau ra giúp một tay nhé!"',
          'Bạn chuột nhắt kêu "Chít chít!" thật nhanh nhẹn chạy ra nắm chặt chiếc đuôi xù của Mèo cam. Hàng dài bây giờ đông đủ lắm rồi!'
        ],
        funPhrase: 'Meo meo! Chít chít! Cùng kéo nào!',
        echoWord: 'Meo meo',
        parentPrompt: {
          '18-24': 'Chỉ từng bạn trên tranh và bắt chước tiếng kêu: "Meo meo! Chít chít!"',
          '24-30': 'Hỏi bé: "Bạn nào bé xíu đứng ở cuối cùng của hàng kéo nhỉ?" (Chuột nhắt!).',
          '30-36': 'Hỏi bé: "Theo con, bạn chuột nhắt bé xíu như vậy có giúp được không?"'
        }
      },
      {
        title: 'Một, hai, ba — ẦM! Củ cải lên rồi!',
        emoji: '🎉',
        sfx: 'clap',
        paragraphs: [
          'Tất cả cùng hít một hơi thật sâu! Chuột nắm Mèo, Mèo nắm Cún, Cún nắm Cháu gái, Cháu gái nắm Bà, Bà nắm Ông, Ông nắm chặt chùm lá xanh.',
          'Mọi người đồng thanh hô thật vang: "MỘT… HAI… BA… KÉO LÊN NÀO!"',
          'BỤP! ẦM! Chiếc củ cải khổng lồ bật tung khỏi mặt đất! Cả nhà ngã lăn ra bãi cỏ mềm êm ái rồi cùng nhau cười vang giòn tan: "Ha ha ha! Nhổ lên được rồi!"'
        ],
        funPhrase: 'Một, hai, ba — BỤP! Lên rồi! Hoan hô!',
        echoWord: 'Lên rồi',
        parentPrompt: {
          '18-24': 'Giơ hai tay lên trời reo vui cùng bé: "Lên rồi! Hoan hô!"',
          '24-30': 'Cùng bé đếm "Một, hai, ba — Bụp!" thật vui nhộn nhé.',
          '30-36': 'Hỏi bé: "Nhờ có điều gì mà cả nhà nhổ được củ cải khổng lồ?"'
        }
      },
      {
        title: 'Nồi canh củ cải thơm lừng cả xóm',
        emoji: '🍲',
        sfx: 'celebrate',
        paragraphs: [
          'Bà lão cùng cháu gái rửa sạch củ cải trắng muốt, nấu thành một nồi súp củ cải nóng hổi thơm lừng khắp khu vườn.',
          'Mọi người ngồi quây quần quanh chiếc bàn gỗ ấm cúng: Ông một bát, Bà một bát, Cháu gái một bát, Cún con, Mèo cam và cả bạn Chuột nhắt bé xíu cũng có một chiếc bát nhỏ đầy ắp!',
          'Ai ăn cũng tấm tắc khen ngon, bởi món ngon nhất chính là món ăn cả nhà cùng chung sức làm nên.'
        ],
        funPhrase: 'Măm măm! Canh củ cải thơm ngon quá!',
        echoWord: 'Ngon quá',
        parentPrompt: {
          '18-24': 'Xoa nhẹ bụng và nói vui cùng bé: "Măm măm! Ngon quá!"',
          '24-30': 'Hỏi bé: "Bạn chuột nhắt có được ăn canh củ cải không con?"',
          '30-36': 'Nhắc bé: "Dù bé còn nhỏ như bạn chuột nhắt, sự giúp đỡ của bé vẫn rất quý giá!"'
        }
      }
    ],
    ending: {
      moral: 'Đoàn kết cùng nhau thì việc lớn đến đâu cũng làm được, và ai dù nhỏ bé cũng đều rất quan trọng!',
      questions: [
        'Con nhớ trong hàng nhổ củ cải có những bạn động vật nào không? (Cún, Mèo, Chuột!)',
        'Hôm nay con muốn cùng ba mẹ hợp sức làm việc gì nhỏ xinh trong nhà nào?'
      ]
    }
  },

  /* =========================================================================
     5. TẤM CÁM (BỐNG BỐNG BANG BANG) — Cổ tích Việt Nam bản dịu dàng (~6 phút)
     ========================================================================= */
  {
    id: 'tam-cam',
    title: 'Cô Tấm Hiền Và Chú Cá Bống',
    shortTitle: 'Cô Tấm & Cá Bống',
    origin: 'vietnam',
    originLabel: 'Cổ tích Việt Nam',
    bedtimeFriendly: true,
    readMinutes: 6,
    moralTag: '🌸 Dịu dàng & chăm chỉ',
    hook: 'Bài gọi cá Bống bống bang bang bên giếng trong, phép màu của ông Bụt và hương quả thị thơm.',
    image: './assets/images/fairy-tam-cam.jpg',
    themeColor: '#F5EDF4',
    accentColor: '#8B5D85',
    pages: [
      {
        title: 'Cô Tấm siêng năng ở làng quê',
        emoji: '🌸',
        sfx: 'warm',
        paragraphs: [
          'Ngày xửa ngày xưa, ở một ngôi làng yên ả có ao sen hồng nở ngát hương, có một cô gái tên là Tấm. Tấm có gương mặt tròn hiền hậu, giọng nói trong trẻo và đôi tay lúc nào cũng thoăn thoắt chăm chỉ.',
          'Mỗi sáng sớm, Tấm đều dậy sớm quét sân sạch sẽ, nấu cơm thơm dẻo, cho đàn gà con ăn thóc vàng "chiếp chiếp" rồi mới ra đồng bắt tép, hái rau.',
          'Dù công việc hằng ngày khá bận rộn, cô Tấm vẫn luôn giữ nụ cười dịu dàng và trái tim tràn đầy yêu thương với mọi sinh vật nhỏ bé.'
        ],
        funPhrase: 'Cô Tấm hiền lành, chăm chỉ mỗi ngày!',
        echoWord: 'Cô Tấm',
        parentPrompt: {
          '18-24': 'Chỉ cô Tấm áo hồng trong tranh và mời bé gọi: "Cô Tấm! Hoa sen!"',
          '24-30': 'Hỏi bé: "Buổi sáng thức dậy cô Tấm thường làm gì nhỉ?"',
          '30-36': 'Khen bé khi bé biết làm việc nhỏ như tự cất đồ chơi giống cô Tấm.'
        }
      },
      {
        title: 'Chú cá Bống nhỏ trong giếng trong',
        emoji: '🐟',
        sfx: 'splash',
        paragraphs: [
          'Một hôm đi bắt tép ngoài đồng về, trong giỏ của Tấm có một chú cá Bống nhỏ xíu màu vàng cam óng ánh thật dễ thương. Thương chú cá bé bỏng, Tấm liền mang về thả xuống chiếc giếng đá nước trong veo sau nhà.',
          'Mỗi bữa ăn, Tấm lại để dành một ít cơm trắng thơm ngon, nhẹ nhàng ra thành giếng gọi bằng câu hát thật êm tai:',
          '"Bống bống bang bang, lên ăn cơm vàng cơm bạc nhà ta, chớ ăn cơm hẩm cháo hoa nhà người!" Nghe tiếng Tấm gọi, chú cá Bống liền bơi ngoi lên mặt nước "tõm tõm", vẫy đuôi lấp lánh thật vui.'
        ],
        funPhrase: 'Bống bống bang bang! Cá Bống bơi lên nào!',
        echoWord: 'Cá Bống',
        parentPrompt: {
          '18-24': 'Chỉ vào chú cá nhỏ trong giếng và hát nhịp nhàng: "Bống bống bang bang!"',
          '24-30': 'Mời bé làm tay vẫy như đuôi cá bơi rồi nói: "Cá Bống bơi!"',
          '30-36': 'Đọc lại câu gọi cá Bống thật chậm để bé nhẩm theo nhịp vần nhé.'
        }
      },
      {
        title: 'Đàn chim sẻ giúp Tấm nhặt thóc',
        emoji: '🐦',
        sfx: 'bird',
        paragraphs: [
          'Rồi đến ngày lễ hội mùa xuân rộn ràng trong kinh thành, ai nấy đều xúng xính áo đẹp đi trẩy hội. Tấm cũng háo hức lắm, nhưng trước khi đi cô phải nhặt riêng một thúng gạo và thúng thóc bị trộn lẫn vào nhau.',
          'Thúng thóc nhiều quá, Tấm ngồi nhặt mãi mà trời đã gần trưa, đôi mắt cô rưng rưng buồn. Bỗng một làn khói trắng thơm nhẹ bay qua, ông Bụt râu bạc hiền từ hiện ra mỉm cười hỏi han.',
          'Ông Bụt vẫy chiếc phất trần gọi cả đàn chim sẻ nâu bay xuống "chíp chíp, ríu rít". Chỉ thoáng chốc, các bạn chim sẻ nhanh nhẹn đã giúp Tấm nhặt gạo ra gạo, thóc ra thóc thật gọn gàng!'
        ],
        funPhrase: 'Chíp chíp! Đàn chim sẻ giúp cô Tấm rồi!',
        echoWord: 'Chim sẻ',
        parentPrompt: {
          '18-24': 'Bắt chước tiếng đàn chim sẻ kêu vui: "Chíp chíp chíp!"',
          '24-30': 'Hỏi bé: "Ai đã gọi đàn chim sẻ tới giúp cô Tấm nhỉ?" (Ông Bụt!).',
          '30-36': 'Hỏi bé: "Nếu bé thấy bạn gặp việc khó, bé có muốn giúp như đàn chim sẻ không?"'
        }
      },
      {
        title: 'Chiếc váy lụa và đôi hài thêu xinh',
        emoji: '✨',
        sfx: 'magic',
        paragraphs: [
          'Nhặt xong thóc, Tấm nhìn lại bộ áo vải cũ của mình mà ngần ngại. Ông Bụt lại mỉm cười hiền hậu, vung tay nhẹ một cái — "Tinh tinh!" — một phép màu dịu dàng tỏa sáng lấp lánh!',
          'Trước mắt Tấm hiện ra một chiếc áo tứ thân màu hoa đào mềm mại, dải lụa vàng óng và một đôi hài thêu hoa nhỏ nhắn vừa in đôi bàn chân xinh.',
          'Tấm mừng rỡ cúi đầu cảm ơn ông Bụt rồi vui vẻ bước đi trên con đường làng rợp bóng tre xanh để kịp dự hội mùa xuân.'
        ],
        funPhrase: 'Tinh tinh! Chiếc váy đẹp và đôi hài xinh quá!',
        echoWord: 'Đôi hài',
        parentPrompt: {
          '18-24': 'Chỉ vào bàn chân bé và nói vui: "Đôi hài xinh! Giày xinh!"',
          '24-30': 'Hỏi bé: "Ông Bụt đã tặng cô Tấm những món đồ gì nhỉ?"',
          '30-36': 'Mời bé nói lời "Con cảm ơn ông Bụt ạ!" giống cô Tấm.'
        }
      },
      {
        title: 'Chiếc hài rơi bên dòng suối nhỏ',
        emoji: '👑',
        sfx: 'splash',
        paragraphs: [
          'Trên đường đi qua cây cầu gỗ bắc ngang con suối trong vắt, mải ngắm đàn bướm trắng bay lượn, Tấm vô tình đánh rơi một chiếc hài thêu xuống bãi cỏ ven bờ.',
          'Một lát sau, đoàn rước hội của Hoàng tử trẻ tuổi đi ngang qua. Hoàng tử nhặt được chiếc hài thêu tinh xảo ấy, thầm khen người làm ra chiếc hài thật khéo tay và muốn tìm chủ nhân để trả lại.',
          'Các cô gái ở lễ hội ai cũng thử xỏ chân nhưng chẳng ai vừa. Đến lượt cô Tấm dịu dàng bước tới, chiếc hài vừa khít như in! Hoàng tử mỉm cười mời cô Tấm cùng đi dạo vườn hoa mùa xuân.'
        ],
        funPhrase: 'Vừa in luôn! Tìm thấy chủ nhân đôi hài rồi!',
        echoWord: 'Vừa in',
        parentPrompt: {
          '18-24': 'Chạm nhẹ vào chân bé và cười vui: "Vừa in luôn nè!"',
          '24-30': 'Hỏi bé: "Hoàng tử đã nhặt được món gì bên bờ suối?"',
          '30-36': 'Hỏi bé: "Vì sao Hoàng tử lại đi tìm người làm rơi chiếc hài?"'
        }
      },
      {
        title: 'Quả thị vàng thơm và niềm vui sum vầy',
        emoji: '🌕',
        sfx: 'celebrate',
        paragraphs: [
          'Vào một buổi chiều thu mát lành, trong khu vườn nhỏ của bà lão bán trà có một cây thị cao tỏa hương ngọt ngào. Trên cành cao nhất có đúng một quả thị tròn xoe, vàng ươm như vầng trăng nhỏ.',
          'Bà lão giơ chiếc bị vải ra nhẹ nhàng đọc: "Thị ơi thị rụng bị bà, bà để bà ngửi chứ bà không ăn!". Quả thị liền khẽ rơi êm vào bị bà, tỏa mùi thơm dịu dàng khắp ngôi nhà ấm cúng.',
          'Cô Tấm hiền lành giúp bà lão dọn nhà gọn gàng, pha ấm trà thơm rồi lại vui vẻ đoàn tụ cùng Hoàng tử và mọi người yêu thương cô. Hương hoa sen, hương thị chín cứ thơm mãi trong câu chuyện cổ tích ngọt ngào.'
        ],
        funPhrase: 'Thị ơi thị rụng bị bà, thơm quá đi thôi!',
        echoWord: 'Quả thị',
        parentPrompt: {
          '18-24': 'Chỉ những quả thị vàng trên cây trong tranh và hít hà: "Quả thị! Thơm quá!"',
          '24-30': 'Mời bé nhắc theo câu đồng dao êm ái: "Thị ơi thị rụng bị bà!"',
          '30-36': 'Hỏi bé: "Trong truyện Cô Tấm, bé nhớ nhất câu hát nào?"'
        }
      }
    ],
    ending: {
      moral: 'Sự hiền lành, chăm chỉ và yêu thương mọi loài vật nhỏ bé sẽ luôn nhận lại những phép màu ấm áp.',
      questions: [
        'Con có muốn hát lại câu "Bống bống bang bang" cùng ba mẹ không?',
        'Con thích nhất hình ảnh nào: chú cá Bống, đàn chim sẻ hay quả thị vàng thơm?'
      ]
    }
  },

  /* =========================================================================
     6. BA CHÚ HEO CON — Cổ tích thế giới (~6 phút)
     ========================================================================= */
  {
    id: 'ba-chu-heo-con',
    title: 'Ba Chú Heo Con Xây Nhà',
    shortTitle: 'Ba Chú Heo Con',
    origin: 'world',
    originLabel: 'Cổ tích Thế giới',
    bedtimeFriendly: false,
    readMinutes: 6,
    moralTag: '🧱 Chăm chỉ & vững vàng',
    hook: 'Nhà rơm vàng, nhà gỗ thơm và ngôi nhà gạch đỏ vững chãi chống lại cơn gió phù phù!',
    image: './assets/images/fairy-ba-chu-heo.jpg',
    themeColor: '#FBECE6',
    accentColor: '#E07A5F',
    pages: [
      {
        title: 'Ba anh em heo con ra xây nhà mới',
        emoji: '🐷',
        sfx: 'pig',
        paragraphs: [
          'Ở ven một ngọn đồi xanh rì đầy hoa dại, có ba anh em heo con tròn trịa màu hồng phấn rất thương nhau: Heo Út thích chơi đùa, Heo Giữa thích ca hát, và Heo Anh rất chăm chỉ cẩn thận.',
          'Một sáng mùa thu đẹp trời, Heo Mẹ dặn ba anh em: "Các con đã lớn rồi, mỗi bạn hãy tự tay xây cho mình một ngôi nhà thật ấm áp để tránh nắng gió nhé!"',
          'Ba chú heo con hào hứng vẫy tay chào mẹ, vừa đi vừa kêu "ụt ịt, ụt ịt!" đi tìm vật liệu làm ngôi nhà đầu tiên của mình.'
        ],
        funPhrase: 'Ụt ịt, ụt ịt! Ba chú heo con đi xây nhà!',
        echoWord: 'Heo con',
        parentPrompt: {
          '18-24': 'Đếm ba chú heo con trên tranh cùng bé: "Một, hai, ba! Ụt ịt!"',
          '24-30': 'Hỏi bé: "Ba chú heo con đang mặc quần yếm màu gì đẹp thế?"',
          '30-36': 'Hỏi bé: "Heo Mẹ dặn ba anh em làm việc gì nhỉ?"'
        }
      },
      {
        title: 'Ngôi nhà rơm vàng và ngôi nhà gỗ thơm',
        emoji: '🌾',
        sfx: 'tap',
        paragraphs: [
          'Heo Út muốn làm xong thật nhanh để còn chạy đi đuổi bướm, nên chú gom những bó rơm vàng óng dựng thành một ngôi nhà rơm xinh xắn. Chỉ một buổi sáng là xong! Heo Út nhảy múa reo vui: "Xong rồi! Mình đi chơi thôi!"',
          'Heo Giữa chịu khó hơn một chút. Chú nhặt những thanh gỗ thơm xếp ngay ngắn, đóng đinh "cốp cốp cốp!" tạo thành một ngôi nhà gỗ mộc mạc. Làm xong trong một ngày, chú vui vẻ thổi sáo ca hát vang lừng.',
          'Còn Heo Anh thì sao nhỉ? Chú vẫn đang miệt mài bên đống gạch đỏ tươi đấy!'
        ],
        funPhrase: 'Cốp cốp cốp! Đóng nhà gỗ, kết nhà rơm!',
        echoWord: 'Ngôi nhà',
        parentPrompt: {
          '18-24': 'Gõ nhẹ hai nắm tay vào nhau bắt chước tiếng đóng đinh: "Cốp cốp cốp!"',
          '24-30': 'Chỉ hai ngôi nhà nhỏ phía sau trong tranh: "Đâu là nhà rơm, đâu là nhà gỗ?"',
          '30-36': 'Hỏi bé: "Theo con, nhà bằng rơm có chắc chắn bằng nhà bằng gỗ không?"'
        }
      },
      {
        title: 'Ngôi nhà gạch đỏ vững chãi của Heo Anh',
        emoji: '🧱',
        sfx: 'knock',
        paragraphs: [
          'Heo Anh muốn xây một ngôi nhà thật chắc chắn để cả mưa to lẫn gió lớn đều không làm phiền được. Chú cẩn thận trộn vữa, đặt từng viên gạch đỏ thẳng tắp: "Cộc cộc cộc… từng viên, từng viên một!".',
          'Hai em chạy tới rủ: "Anh ơi ra chơi đuổi bắt đi!". Heo Anh mỉm cười lau mồ hôi: "Các em cứ chơi vui nhé, anh xây xong mái nhà và ống khói ấm cúng rồi mình cùng ăn bánh!"',
          'Suốt mấy ngày chăm chỉ, cuối cùng ngôi nhà gạch đỏ có bồn hoa rực rỡ bên cửa sổ cũng hoàn thành đẹp ơi là đẹp!'
        ],
        funPhrase: 'Cộc cộc cộc! Xếp từng viên gạch đỏ chắc chắn!',
        echoWord: 'Gạch đỏ',
        parentPrompt: {
          '18-24': 'Chỉ ngôi nhà gạch đỏ to nhất trong tranh: "Nhà gạch đỏ! Cộc cộc!"',
          '24-30': 'Hỏi bé: "Bên cửa sổ nhà Heo Anh có trồng gì xinh thế?" (Hoa!).',
          '30-36': 'Khen sự kiên nhẫn của Heo Anh: làm cẩn thận mất nhiều thời gian hơn nhưng rất chắc chắn.'
        }
      },
      {
        title: 'Sói xám tinh nghịch thổi gió phù phù',
        emoji: '💨',
        sfx: 'wind',
        paragraphs: [
          'Một buổi chiều gió lạnh, có chú Sói xám bụng đói đi ngang qua khu đồi. Ngửi thấy mùi bánh thơm, Sói đến gõ cửa nhà rơm của Heo Út: "Cộc cộc cộc! Heo con ơi, mở cửa cho ta vào chơi nào!"',
          'Heo Út lắc đầu: "Không đâu, không đâu, nhà mình nhỏ lắm!". Sói xám liền hít một hơi thật dài rồi thổi: "PHÙ… PHÙ… PHÙ!". Làn gió mạnh làm những bó rơm bay lả tả khắp sân!',
          'Heo Út chạy ù sang nhà gỗ của Heo Giữa. Sói chạy theo lại hít hơi thổi "PHÙ… PHÙ… PHÙ!" làm mái gỗ rung lắc nghiêng ngả. Hai anh em nhanh chân nắm tay nhau chạy thẳng sang ngôi nhà gạch đỏ của Heo Anh!'
        ],
        funPhrase: 'Phù… phù… phù! Chạy sang nhà gạch đỏ thôi!',
        echoWord: 'Thổi phù phù',
        parentPrompt: {
          '18-24': 'Chu môi thổi hơi nhẹ nhàng lên bàn tay bé cho vui: "Phù phù phù!"',
          '24-30': 'Hỏi bé: "Hai chú heo nhỏ đã chạy sang nhà của ai nhỉ?" (Heo Anh!).',
          '30-36': 'Mời bé gõ nhẹ lên bàn ba tiếng: "Cộc cộc cộc!" cùng ba mẹ.'
        }
      },
      {
        title: 'Ngôi nhà gạch đỏ đứng vững như núi',
        emoji: '🏠',
        sfx: 'knock',
        paragraphs: [
          'Heo Anh mở cửa đón hai em vào nhà rồi đóng chặt chốt gỗ an toàn. Sói xám chạy tới, tự tin hít một hơi thật căng rồi thổi hết sức: "PHÙ… PHÙ… PHÙ!"',
          'Thế nhưng ngôi nhà gạch đỏ chẳng hề nhúc nhích lấy một chút nào! Gió chỉ làm mấy bông hoa ngoài cửa sổ đung đưa nhè nhẹ.',
          'Sói cố thổi thêm một lần nữa, hai lần nữa đến mức hụt hơi, mặt đỏ bừng, ho khù khụ rồi ngượng ngùng lủi thủi chạy biến về phía rừng xa chẳng dám quay lại trêu chọc ba chú heo nữa!'
        ],
        funPhrase: 'Nhà gạch vững quá! Sói thổi chẳng xi nhê!',
        echoWord: 'Vững quá',
        parentPrompt: {
          '18-24': 'Vỗ tay reo mừng cùng bé: "Hoan hô! Nhà chắc quá!"',
          '24-30': 'Hỏi bé: "Sói thổi phù phù có làm bay được nhà gạch đỏ không?" (Không!).',
          '30-36': 'Hỏi bé: "Tại sao ngôi nhà gạch đỏ lại đứng vững trước cơn gió lớn?"'
        }
      },
      {
        title: 'Bữa tối ấm áp của ba anh em',
        emoji: '🥣',
        sfx: 'celebrate',
        paragraphs: [
          'Bên trong ngôi nhà gạch đỏ ấm cúng, ánh đèn vàng tỏa sáng dịu dàng. Heo Anh bắc một nồi súp bí đỏ thơm lừng trên bếp, làn khói trắng bay lên từ chiếc ống khói nhỏ ngoài mái nhà.',
          'Heo Út và Heo Giữa ôm chầm lấy anh trai: "Cảm ơn anh nhiều lắm! Mai bọn em cũng sẽ chăm chỉ xếp từng viên gạch thật cẩn thận như anh!"',
          'Ba anh em cụng thìa "keng keng", vừa ăn súp ngọt vừa hát vang bài ca đoàn kết thật hạnh phúc.'
        ],
        funPhrase: 'Cảm ơn Heo Anh! Chăm chỉ cùng nhau nhé!',
        echoWord: 'Cảm ơn',
        parentPrompt: {
          '18-24': 'Giả vờ xúc thìa ăn súp cùng bé: "Măm măm! Ấm quá!"',
          '24-30': 'Hỏi bé: "Ba anh em heo con cùng ăn món gì ấm bụng nhỉ?"',
          '30-36': 'Hỏi bé: "Nếu bé xây một ngôi nhà, bé muốn xây bằng rơm, gỗ hay gạch đỏ?"'
        }
      }
    ],
    ending: {
      moral: 'Làm việc chăm chỉ, cẩn thận và biết yêu thương đùm bọc nhau sẽ giúp gia đình luôn vững vàng, bình an.',
      questions: [
        'Con thích nhất tiếng kêu nào trong truyện: "Ụt ịt", "Cộc cộc" hay "Phù phù"?',
        'Trong ba chú heo con, chú nào làm việc cẩn thận và kiên nhẫn nhất nhỉ?'
      ]
    }
  }
];

export const FAIRY_TALES = [...CORE_FAIRY_TALES, ...EXTRA_FAIRY_TALES];
