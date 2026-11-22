/**
 * 10 Truyện Cổ Tích Đặc Sắc Bổ Sung (Mỗi truyện đọc trọn vẹn ~5–6 phút, dưới 10 phút)
 * Gồm 5 cổ tích Việt Nam & 5 cổ tích thế giới kinh điển kể lại dịu dàng, giàu từ tượng thanh cho bé 18 tháng – 3 tuổi.
 */

export const EXTRA_FAIRY_TALES = [
  /* =========================================================================
     7. THÁNH GIÓNG — Cổ tích & Truyền thuyết Việt Nam (~6 phút)
     ========================================================================= */
  {
    id: 'thanh-giong',
    title: 'Chú Bé Gióng Và Khóm Tre Xanh',
    shortTitle: 'Thánh Gióng',
    origin: 'vietnam',
    originLabel: 'Cổ tích Việt Nam',
    bedtimeFriendly: false,
    readMinutes: 6,
    moralTag: '🌿 Dũng cảm & yêu quê hương',
    hook: 'Chú bé lên ba bỗng cất tiếng nói đầu tiên, ăn cơm lớn nhanh như thổi và cưỡi ngựa sắt bay lên trời xanh!',
    image: './assets/images/fairy-thanh-giong.svg',
    themeColor: '#EAF4EC',
    accentColor: '#4E7D5A',
    pages: [
      {
        title: 'Em bé làng Gióng lên ba tuổi',
        emoji: '👶',
        sfx: 'warm',
        paragraphs: [
          'Ngày xửa ngày xưa, ở làng Gióng yên bình bên những lũy tre xanh rì rào, có hai vợ chồng bác nông dân hiền lành sinh được một cậu bé khôi ngô, đôi mắt đen láy sáng ngời.',
          'Lạ một điều là đến tận ba tuổi, em bé vẫn chỉ nằm cười hiền lành trong chiếc nôi tre, chưa cất tiếng gọi ba mẹ mà cũng chưa tập đi bước nào.',
          'Dù hơi lo một chút, mẹ vẫn ôm bé vỗ về thật dịu dàng mỗi ngày: "Con ngoan của mẹ, rồi con sẽ nói thật to và lớn thật khỏe nhé!"'
        ],
        funPhrase: 'À ơi, bé ngoan của mẹ lớn mau nhé!',
        echoWord: 'Lớn mau',
        parentPrompt: {
          '18-24': 'Ôm bé vỗ về nhẹ nhàng và nói: "Bé ngoan lớn mau nhé!"',
          '24-30': 'Hỏi bé: "Em bé làng Gióng thích nằm trong chiếc nôi làm bằng gì nhỉ?" (Nôi tre!).',
          '30-36': 'Trò chuyện cùng bé: "Hồi nhỏ bé cũng từ từ mới biết nói như chú bé Gióng đấy!"'
        }
      },
      {
        title: 'Tiếng nói đầu tiên thật vang dội',
        emoji: '📣',
        sfx: 'drum',
        paragraphs: [
          'Một hôm, ngoài đường làng vang lên tiếng trống "tùng tùng tùng!" và tiếng loa của sứ giả nhà vua đi tìm người tài giỏi giúp bảo vệ làng quê yên bình.',
          'Nghe thấy tiếng sứ giả, điều kỳ diệu xảy ra! Em bé bỗng bật dậy, cất tiếng nói đầu tiên thật rõ ràng và vang ấm: "Mẹ ơi, mời sứ giả vào đây cho con nói chuyện với ạ!"',
          'Mẹ mừng rơi nước mắt! Trước mặt sứ giả, cậu bé lễ phép xin nhà vua rèn cho một chú ngựa sắt thật khỏe và chiếc áo giáp sáng lấp lánh.'
        ],
        funPhrase: 'Tùng tùng tùng! Mẹ ơi, con biết nói rồi!',
        echoWord: 'Mẹ ơi',
        parentPrompt: {
          '18-24': 'Vỗ nhịp lên đùi giả tiếng trống: "Tùng tùng tùng! Mẹ ơi!"',
          '24-30': 'Hỏi bé: "Câu đầu tiên cậu bé Gióng gọi ai nhỉ?" (Gọi Mẹ ơi!).',
          '30-36': 'Mời bé nói thật rõ ràng và lễ phép giống cậu bé Gióng nhé.'
        }
      },
      {
        title: 'Ăn cơm ngon lớn nhanh như thổi',
        emoji: '🍚',
        sfx: 'crunch',
        paragraphs: [
          'Từ hôm đó, cậu bé ăn cơm rất giỏi! Bát cơm trắng dẻo thơm mùi gạo mới cùng cà muối giòn tan: "Măm măm! Ngon quá!". Cậu ăn hết bát này đến bát khác, lớn vùn vụt như thổi.',
          'Quần áo vừa may hôm qua, hôm nay đã ngắn mất rồi! Cả làng nghe tin ai cũng thương, người mang gạo nếp, người mang khoai lang, người góp vải mới may áo cho cậu bé lớn khỏe.',
          'Chỉ ít lâu sau, cậu bé ngày nào đã vươn vai trở thành một chàng trai cao lớn, khỏe mạnh và tràn đầy sức sống.'
        ],
        funPhrase: 'Măm măm ngon quá! Ăn khỏe để cao lớn!',
        echoWord: 'Ăn khỏe',
        parentPrompt: {
          '18-24': 'Giơ hai tay lên cao cùng bé nói: "Cao lớn! Ăn giỏi quá!"',
          '24-30': 'Hỏi bé: "Chú bé Gióng ăn món gì mà lớn nhanh như thổi nhỉ?" (Cơm ngon!).',
          '30-36': 'Khích lệ bé: "Bé ăn ngoan mỗi bữa cũng sẽ khỏe mạnh như Thánh Gióng đấy!"'
        }
      },
      {
        title: 'Chú ngựa sắt phi nước đại lộc cộc',
        emoji: '🐴',
        sfx: 'horse',
        paragraphs: [
          'Sáng sớm nắng vàng rực rỡ, sứ giả mang tới một chú ngựa sắt oai phong cao lớn. Chú bé Gióng vươn vai một cái — "Vút!" — nhảy phóc lên lưng ngựa.',
          'Chú ngựa sắt bỗng hí vang vui vẻ, phun ra những tia sáng vàng ấm áp lấp lánh như pháo hoa, rồi phóng bước chạy thật nhanh: "Lộc cộc, lộc cộc, lộc cộc!".',
          'Bà con hai bên đường vẫy tay reo hò cổ vũ, gửi trọn niềm tin yêu theo từng bước chân vững vàng của hai bạn.'
        ],
        funPhrase: 'Lộc cộc, lộc cộc! Ngựa sắt chạy nhanh quá!',
        echoWord: 'Lộc cộc',
        parentPrompt: {
          '18-24': 'Bập môi kêu tiếng vó ngựa vui tai: "Lộc cộc, lộc cộc!"',
          '24-30': 'Chỉ chú ngựa trong tranh: "Chú ngựa đang chạy chậm hay chạy nhanh nhỉ?"',
          '30-36': 'Hỏi bé: "Con thấy cậu bé Gióng cưỡi ngựa có dũng cảm không?"'
        }
      },
      {
        title: 'Nhổ khóm tre xanh bảo vệ làng quê',
        emoji: '🎋',
        sfx: 'wind',
        paragraphs: [
          'Khi tới bìa rừng nơi những kẻ xấu đang định quấy phá mùa màng của dân làng, Gióng vung chiếc roi sắt sáng lấp lánh làm chúng giật mình bỏ chạy tán loạn.',
          'Roi sắt vừa gãy, Gióng liền nhanh trí nhổ ngay những khóm tre xanh mướt bên đường, vung lên "vù vù!" đuổi sạch bóng kẻ xấu ra khỏi bờ cõi.',
          'Cả cánh đồng lúa vàng và ngôi làng nhỏ lại trở về yên bình, tiếng chim hót lại ngân vang khắp bụi tre xanh.'
        ],
        funPhrase: 'Vù vù! Khóm tre xanh bảo vệ làng quê!',
        echoWord: 'Cây tre',
        parentPrompt: {
          '18-24': 'Chỉ những thân tre xanh hai bên tranh và nói: "Cây tre! Lá xanh!"',
          '24-30': 'Hỏi bé: "Chú bé Gióng đã cầm cành cây gì màu xanh trên tay nhỉ?"',
          '30-36': 'Giải thích nhẹ nhàng: cây tre là biểu tượng thân thương của làng quê Việt Nam.'
        }
      },
      {
        title: 'Cưỡi ngựa bay lên bầu trời mây trắng',
        emoji: '☁️',
        sfx: 'celebrate',
        paragraphs: [
          'Giúp xong dân làng bình yên, Gióng cưỡi ngựa đi lên đỉnh núi Sóc lộng gió. Chàng ngoái lại vẫy tay chào mẹ hiền và bà con lần cuối với nụ cười rạng rỡ.',
          'Một làn mây vàng êm ái sà xuống đón cả người lẫn ngựa nhẹ nhàng bay vút lên bầu trời xanh bao la.',
          'Từ đó về sau, mỗi khi nhìn thấy những bụi tre xanh rì rào trong gió, mọi người lại mỉm cười nhớ đến cậu bé Gióng hiếu thảo và dũng cảm.'
        ],
        funPhrase: 'Vẫy tay chào bạn Gióng bay lên trời xanh!',
        echoWord: 'Bay cao',
        parentPrompt: {
          '18-24': 'Cùng bé vẫy tay lên cao chào: "Tạm biệt bạn Gióng nhé!"',
          '24-30': 'Chỉ đám mây và ông mặt trời trên tranh cùng bé gọi tên nhé.',
          '30-36': 'Hỏi bé: "Bé thích nhất chi tiết nào trong truyện Thánh Gióng?"'
        }
      }
    ],
    ending: {
      moral: 'Ăn ngoan, yêu thương gia đình và dũng cảm giúp đỡ mọi người sẽ giúp bé lớn lên thật khỏe mạnh, đáng yêu.',
      questions: [
        'Con có thích tiếng ngựa chạy "lộc cộc" của Thánh Gióng không?',
        'Hôm nay con sẽ ăn cơm thật ngon để cao lớn giống cậu bé Gióng nhé!'
      ]
    }
  },

  /* =========================================================================
     8. SỰ TÍCH BÁNH CHƯNG BÁNH GIẦY — Cổ tích Việt Nam (~6 phút)
     ========================================================================= */
  {
    id: 'banh-chung-banh-giay',
    title: 'Sự Tích Bánh Chưng Bánh Giầy',
    shortTitle: 'Bánh Chưng Bánh Giầy',
    origin: 'vietnam',
    originLabel: 'Cổ tích Việt Nam',
    bedtimeFriendly: true,
    readMinutes: 6,
    moralTag: '🌾 Biết ơn hạt gạo & gia đình',
    hook: 'Bánh Chưng xanh hình vuông như đất mẹ, Bánh Giầy trắng hình tròn như bầu trời — hương vị Tết ấm áp!',
    image: './assets/images/fairy-banh-chung.jpg',
    themeColor: '#FDF4DE',
    accentColor: '#C58A21',
    pages: [
      {
        title: 'Mùa xuân về trên đất nước Văn Lang',
        emoji: '🌸',
        sfx: 'warm',
        paragraphs: [
          'Ngày xửa ngày xưa, vào đời Vua Hùng thứ sáu, đất nước mình thanh bình, hoa đào nở hồng rực mỗi độ xuân về. Nhà vua có rất nhiều người con trai, trong đó hoàng tử Lang Liêu là người hiền hậu và giản dị nhất.',
          'Không thích những món đồ xa hoa, Lang Liêu chỉ yêu thích ra đồng trồng lúa cùng bà con, chăm sóc từng bông lúa trĩu hạt vàng ươm.',
          'Mùa xuân năm ấy, Vua Hùng mời các hoàng tử đến và dặn: "Tết sắp tới rồi, ai tìm được món ngon ý nghĩa nhất dâng lên tổ tiên, cha sẽ khen thưởng thật xứng đáng!"'
        ],
        funPhrase: 'Hoa đào nở rồi! Tết sắp đến rồi bé ơi!',
        echoWord: 'Hoa đào',
        parentPrompt: {
          '18-24': 'Chỉ cành hoa đào hồng trong tranh và mời bé nói: "Hoa đào! Màu hồng!"',
          '24-30': 'Hỏi bé: "Hoàng tử Lang Liêu thích trồng cây gì trên cánh đồng nhỉ?" (Cây lúa!).',
          '30-36': 'Nhắc bé nhớ lại không khí vui vẻ của ngày Tết bên ông bà nhé.'
        }
      },
      {
        title: 'Giấc mơ kỳ diệu về hạt gạo quý',
        emoji: '🌙',
        sfx: 'magic',
        paragraphs: [
          'Các anh của Lang Liêu vội vã lên rừng xuống biển tìm bao nhiêu món lạ. Riêng Lang Liêu nghĩ mãi mà chưa biết làm món gì vì trong nhà chỉ có lúa gạo và đỗ xanh do chính tay mình trồng.',
          'Đêm hôm ấy, khi ánh trăng dịu dàng chiếu qua cửa sổ, Lang Liêu mơ thấy một vị tiên hiền từ đến mỉm cười bảo: "Trong trời đất không gì quý bằng hạt gạo nuôi sống con người!"',
          'Vị tiên dịu dàng dặn: "Con hãy lấy gạo nếp thơm làm hai thứ bánh: một bánh hình vuông như mặt đất, một bánh hình tròn như bầu trời cao rộng nhé!"'
        ],
        funPhrase: 'Hạt gạo trắng thơm! Hình vuông và hình tròn!',
        echoWord: 'Hình tròn',
        parentPrompt: {
          '18-24': 'Vẽ hình tròn trong không khí cùng bé và nói: "Hình tròn! Bánh tròn!"',
          '24-30': 'Hỏi bé: "Trên khay gỗ có hai chiếc bánh hình gì nhỉ?" (Hình vuông và hình tròn!).',
          '30-36': 'Hỏi bé: "Vì sao vị tiên lại nói hạt gạo là thứ quý nhất trên đời?"'
        }
      },
      {
        title: 'Gói chiếc Bánh Chưng xanh vuông vắn',
        emoji: '🟩',
        sfx: 'tap',
        paragraphs: [
          'Tỉnh dậy, Lang Liêu mừng lắm! Chàng liền chọn những hạt gạo nếp trắng ngần thơm phức, hạt đỗ xanh vàng ươm béo bùi và những tàu lá dong xanh mướt vừa rửa sạch bong.',
          'Chàng khéo léo xếp lá dong, đổ gạo trắng, đặt nhân đỗ vàng và chút thịt thơm vào giữa rồi buộc dây lạt tre thật gọn gàng thành chiếc bánh hình vuông vắn.',
          'Nồi bánh được đặt lên bếp lửa hồng reo "lách tách, lục bục!" suốt đêm, tỏa mùi lá dong chín thơm lừng khắp cả gian nhà ấm cúng.'
        ],
        funPhrase: 'Bánh Chưng xanh vuông vắn! Thơm quá đi thôi!',
        echoWord: 'Bánh Chưng',
        parentPrompt: {
          '18-24': 'Chỉ chiếc bánh xanh vuông trên tay hoàng tử: "Bánh Chưng! Màu xanh!"',
          '24-30': 'Mời bé hít hà giả vờ ngửi mùi bánh chín: "Thơm quá!"',
          '30-36': 'Cùng bé kể tên nguyên liệu gói bánh: gạo nếp, đỗ xanh và lá dong.'
        }
      },
      {
        title: 'Giã chiếc Bánh Giầy trắng mịn tròn xoe',
        emoji: '⚪',
        sfx: 'drum',
        paragraphs: [
          'Bên cạnh đó, Lang Liêu đồ một chõ xôi nếp dẻo thật thơm rồi dùng chiếc chày gỗ giã đều tay: "Thình thịch, thình thịch!".',
          'Hạt xôi trắng dần trở nên mịn màng, dẻo quánh như đám mây nhỏ. Lang Liêu nặn thành những chiếc bánh tròn xoe, trắng muốt đặt cạnh chiếc Bánh Chưng xanh trên chiếc khay gỗ sạch sẽ.',
          'Nhìn hai chiếc bánh mộc mạc mà đẹp mắt, Lang Liêu mỉm cười thật ấm lòng.'
        ],
        funPhrase: 'Thình thịch, thình thịch! Bánh Giầy tròn xoe!',
        echoWord: 'Bánh Giầy',
        parentPrompt: {
          '18-24': 'Vỗ nhịp giả tiếng giã bánh vui tai: "Thình thịch! Bánh tròn!"',
          '24-30': 'Chỉ chiếc bánh trắng tròn trong tranh: "Bánh Giầy có màu gì con nhỉ?" (Màu trắng!).',
          '30-36': 'Hỏi bé: "Bánh Giầy hình tròn tượng trưng cho điều gì nhỉ?" (Bầu trời!).'
        }
      },
      {
        title: 'Vua Hùng nếm thử và khen ngợi hết lời',
        emoji: '👑',
        sfx: 'sparkle',
        paragraphs: [
          'Ngày đầu xuân, các hoàng tử mang bao nhiêu sơn hào hải vị dâng lên. Đến lượt Lang Liêu, chàng lễ phép dâng khay bánh giản dị rồi kể ý nghĩa của Bánh Chưng vuông như Đất và Bánh Giầy tròn như Trời.',
          'Vua Hùng nếm thử một miếng, đôi mắt sáng rực lên vui vẻ: "Ôi chao! Bánh dẻo thơm, bùi ngọt và tràn đầy tấm lòng biết ơn hạt gạo quê hương!"',
          'Nhà vua khen ngợi Lang Liêu trước tất cả mọi người, vì món quà quý nhất luôn được làm ra bằng đôi tay chăm chỉ và trái tim yêu thương.'
        ],
        funPhrase: 'Ngon quá! Bánh dẻo thơm và ấm áp tình thương!',
        echoWord: 'Ngon quá',
        parentPrompt: {
          '18-24': 'Giơ ngón tay cái lên khen cùng bé: "Ngon quá! Giỏi quá!"',
          '24-30': 'Hỏi bé: "Vua Hùng ăn thử bánh của Lang Liêu thấy ngon hay không ngon?"',
          '30-36': 'Khen bé khi bé ăn hết cơm mà không làm rơi vãi hạt gạo quý nhé.'
        }
      },
      {
        title: 'Hương bánh Tết sum vầy mỗi năm',
        emoji: '🏮',
        sfx: 'celebrate',
        paragraphs: [
          'Từ mùa xuân tuyệt đẹp ấy, nhà vua đặt tên bánh vuông lá xanh là Bánh Chưng, bánh tròn trắng mịn là Bánh Giầy.',
          'Cứ mỗi dịp Tết đến xuân về, hoa đào hoa mai đua nở, các gia đình Việt Nam lại quây quần bên nồi Bánh Chưng xanh ấm áp, kể cho các bạn nhỏ nghe chuyện hoàng tử Lang Liêu.',
          'Ăn miếng bánh thơm bùi, bé nhớ luôn yêu quý từng hạt cơm trắng và thương ông bà ba mẹ thật nhiều nhé!'
        ],
        funPhrase: 'Chúc mừng năm mới! Cả nhà mình sum vầy!',
        echoWord: 'Cả nhà',
        parentPrompt: {
          '18-24': 'Vỗ tay vui vẻ cùng bé: "Tết vui quá! Thương ba mẹ!"',
          '24-30': 'Hỏi bé: "Bánh Chưng hình vuông hay hình tròn nhỉ?"',
          '30-36': 'Hỏi bé: "Tết đến bé thích ăn Bánh Chưng cùng ai nhất?"'
        }
      }
    ],
    ending: {
      moral: 'Biết ơn từng hạt gạo thơm, yêu lao động và trân trọng bữa cơm sum vầy cùng gia đình là điều quý giá nhất.',
      questions: [
        'Con nhớ bánh nào hình vuông, bánh nào hình tròn chưa nào?',
        'Khi ăn cơm mỗi ngày, mình sẽ cảm ơn ai đã nấu cơm ngon cho bé nhỉ?'
      ]
    }
  },

  /* =========================================================================
     9. SỰ TÍCH QUẢ DƯA HẤU (MAI AN TIÊM) — Cổ tích Việt Nam (~6 phút)
     ========================================================================= */
  {
    id: 'qua-dua-hau',
    title: 'Mai An Tiêm Và Quả Dưa Hấu Đỏ',
    shortTitle: 'Quả Dưa Hấu',
    origin: 'vietnam',
    originLabel: 'Cổ tích Việt Nam',
    bedtimeFriendly: true,
    readMinutes: 6,
    moralTag: '🍉 Tự lập & chăm chỉ',
    hook: 'Hạt giống lạ từ đàn chim trắng nở thành vườn dưa vỏ xanh ruột đỏ ngọt mát giữa biển khơi!',
    image: './assets/images/fairy-dua-hau.svg',
    themeColor: '#FBECE6',
    accentColor: '#C86247',
    pages: [
      {
        title: 'Gia đình Mai An Tiêm trên hòn đảo xanh',
        emoji: '🏝️',
        sfx: 'splash',
        paragraphs: [
          'Ngày xưa, có chàng trai tên là Mai An Tiêm rất thông minh, tháo vát và luôn tin rằng đôi bàn tay chăm chỉ có thể tạo nên tất cả.',
          'Vì một hiểu lầm nhỏ, gia đình An Tiêm được đưa ra sống ở một hòn đảo vắng giữa biển xanh rì rào sóng vỗ: "Rì rào… rì rào…".',
          'Chẳng hề nản lòng, hai vợ chồng nắm tay nhau mỉm cười, cùng dựng một mái lều tranh ấm áp bên bãi cát vàng và tìm suối nước ngọt cho con nhỏ.'
        ],
        funPhrase: 'Rì rào, rì rào! Sóng biển xanh vỗ bờ cát!',
        echoWord: 'Biển xanh',
        parentPrompt: {
          '18-24': 'Chỉ làn nước biển xanh trong tranh và làm sóng tay: "Rì rào! Biển xanh!"',
          '24-30': 'Hỏi bé: "Nhà của gia đình Mai An Tiêm nằm ở đâu nhỉ?" (Trên hòn đảo!).',
          '30-36': 'Hỏi bé: "Khi ra đảo vắng, chú Mai An Tiêm có buồn khóc không?"'
        }
      },
      {
        title: 'Đàn chim trắng mang hạt giống kỳ lạ',
        emoji: '🕊️',
        sfx: 'bird',
        paragraphs: [
          'Một buổi sáng nắng vàng trong trẻo, trên bầu trời bỗng có một đàn chim biển trắng muốt bay lượn ngang qua: "Vù vù! Chíp chíp!".',
          'Một chú chim đậu trên cành cây gần nhà, đánh rơi xuống bãi cát mấy hạt nhỏ màu đen nhánh như hạt huyền. An Tiêm tò mò nhặt lên ngắm nghía rồi reo vui:',
          '"Chim ăn được thì chắc chắn người cũng ăn được! Mình hãy gieo những hạt giống quý này xuống đất xem cây gì sẽ mọc lên nhé!"'
        ],
        funPhrase: 'Chíp chíp! Đàn chim trắng tặng hạt giống nhỏ!',
        echoWord: 'Hạt giống',
        parentPrompt: {
          '18-24': 'Chỉ mấy chú chim trên bầu trời trong tranh: "Con chim! Bay bay!"',
          '24-30': 'Hỏi bé: "Hạt giống mà chú chim đánh rơi có màu gì nhỉ?" (Màu đen!).',
          '30-36': 'Khen sự nhanh trí của An Tiêm: biết quan sát thiên nhiên để học hỏi.'
        }
      },
      {
        title: 'Dây dưa vươn lá và ra quả tròn xoe',
        emoji: '🌱',
        sfx: 'water',
        paragraphs: [
          'Ngày nào An Tiêm và vợ con cũng xách nước suối tưới mát cho luống đất mới: "Tí tách, róc rách!". Chẳng bao lâu, những mầm non xanh biếc vươn lên đón nắng mai.',
          'Dây cây bò lan khắp bãi cát, trổ những bông hoa vàng xinh xắn rồi kết thành bao nhiêu là quả tròn xoe, vỏ màu xanh thẫm có những đường vằn thật đẹp!',
          'Mỗi ngày qua đi, những quả xanh ấy càng thêm căng mọng và lớn dần bằng cả chiếc gối tròn.'
        ],
        funPhrase: 'Tưới nước róc rách! Quả xanh lớn tròn xoe!',
        echoWord: 'Tròn xoe',
        parentPrompt: {
          '18-24': 'Vòng hai tay thành hình quả dưa tròn xoe: "Quả dưa! Tròn xoe!"',
          '24-30': 'Chỉ vào quả dưa hấu trên tranh: "Vỏ quả dưa có màu gì thế con?" (Màu xanh!).',
          '30-36': 'Hỏi bé: "Cây cần những gì để lớn nhanh và ra quả ngọt nhỉ?" (Nắng và nước!).'
        }
      },
      {
        title: 'Bổ quả dưa vỏ xanh ruột đỏ ngọt lịm',
        emoji: '🍉',
        sfx: 'crunch',
        paragraphs: [
          'Đến ngày quả chín, An Tiêm nhẹ nhàng bổ đôi một quả lớn ra xem thử. Ôi chao, cả nhà ồ lên thích thú trước điều bất ngờ tuyệt đẹp!',
          'Bên trong lớp vỏ xanh là phần ruột đỏ au mọng nước, điểm xuyết những hạt đen li ti xinh xắn. Cả nhà cắn thử một miếng: "Rốp rốp! Mát quá! Ngọt lịm luôn!"',
          'Món quả ngọt mát lành ấy giúp gia đình An Tiêm tràn đầy sức khỏe dưới nắng biển ấm áp.'
        ],
        funPhrase: 'Rốp rốp! Dưa hấu vỏ xanh ruột đỏ ngọt quá!',
        echoWord: 'Dưa hấu',
        parentPrompt: {
          '18-24': 'Chỉ miếng dưa đỏ trong tranh và giả vờ cắn: "Rốp rốp! Ngọt quá!"',
          '24-30': 'Hỏi bé: "Bên trong quả dưa hấu có màu gì rực rỡ thế con?" (Màu đỏ!).',
          '30-36': 'Đố bé: "Bé có thích ăn dưa hấu mát vào ngày trời nắng không?"'
        }
      },
      {
        title: 'Những quả dưa vượt sóng gửi về đất liền',
        emoji: '🌊',
        sfx: 'splash',
        paragraphs: [
          'Vườn dưa ngày càng sai quả, ăn không hết, An Tiêm liền khắc tên mình lên vỏ mấy quả dưa tròn rồi nhẹ nhàng thả xuống biển xanh cho sóng đẩy trôi vào đất liền.',
          'Những quả dưa bồng bềnh trên sóng nước như những chiếc thuyền xanh nhỏ xíu, trôi mãi vào tận bãi cát gần làng quê.',
          'Người dân nhặt được bổ ra ăn thử ai cũng tấm tắc khen ngon, lại thấy tên Mai An Tiêm trên vỏ nên lập tức báo tin vui về cho Vua Hùng!'
        ],
        funPhrase: 'Bồng bềnh, bồng bềnh! Quả dưa bơi về đất liền!',
        echoWord: 'Bơi về',
        parentPrompt: {
          '18-24': 'Chỉ quả dưa đang nổi trên sóng biển bên phải tranh: "Quả dưa bơi!"',
          '24-30': 'Hỏi bé: "Chú An Tiêm làm thế nào để gửi quả dưa về cho mọi người?"',
          '30-36': 'Hỏi bé: "Mọi người ăn dưa hấu thấy ngon nên đã làm gì nhỉ?"'
        }
      },
      {
        title: 'Đoàn tụ vui vẻ và mùa dưa ngọt mãi',
        emoji: '🎉',
        sfx: 'celebrate',
        paragraphs: [
          'Vua Hùng nếm thử miếng dưa đỏ ngọt mát, cảm phục ý chí chăm chỉ của Mai An Tiêm nên liền cho thuyền lớn ra đón cả gia đình chàng trở về đất liền đoàn tụ.',
          'An Tiêm vui vẻ chia sẻ những hạt giống dưa hấu quý cho bà con khắp nơi cùng trồng. Từ đó, quả dưa hấu vỏ xanh ruột đỏ trở thành món quả thân quen ngọt ngào của mọi nhà.',
          'Mỗi khi thưởng thức miếng dưa mát lành, bé nhớ khen đôi tay chăm chỉ của chú Mai An Tiêm nhé!'
        ],
        funPhrase: 'Hoan hô Mai An Tiêm! Quả dưa hấu thật ngon!',
        echoWord: 'Hoan hô',
        parentPrompt: {
          '18-24': 'Vỗ tay vui vẻ cùng bé: "Hoan hô! Quả dưa ngon!"',
          '24-30': 'Mời bé nói trọn cụm: "Quả dưa hấu đỏ!"',
          '30-36': 'Hỏi bé: "Con học được điều gì từ chú Mai An Tiêm?"'
        }
      }
    ],
    ending: {
      moral: 'Chăm chỉ làm việc bằng chính đôi tay mình và không bỏ cuộc sẽ luôn mang lại quả ngọt tuyệt vời.',
      questions: [
        'Con nhớ quả dưa hấu vỏ màu gì, ruột màu gì và hạt màu gì không?',
        'Đàn chim trắng trong truyện đã mang món quà nhỏ gì tới cho chú An Tiêm nhỉ?'
      ]
    }
  },

  /* =========================================================================
     10. CÂY TRE TRĂM ĐỐT — Cổ tích Việt Nam (~6 phút)
     ========================================================================= */
  {
    id: 'cay-tre-tram-dot',
    title: 'Cây Tre Trăm Đốt Diệu Kỳ',
    shortTitle: 'Cây Tre Trăm Đốt',
    origin: 'vietnam',
    originLabel: 'Cổ tích Việt Nam',
    bedtimeFriendly: true,
    readMinutes: 6,
    moralTag: '✨ Thật thà & phép màu',
    hook: 'Câu thần chú vui tai "Khắc nhập! Khắc nhập!" và "Khắc xuất! Khắc xuất!" từ ông Bụt hiền từ.',
    image: './assets/images/fairy-cay-tre.jpg',
    themeColor: '#EAF4EC',
    accentColor: '#4E7D5A',
    pages: [
      {
        title: 'Anh Khoai hiền lành siêng năng',
        emoji: '🌾',
        sfx: 'warm',
        paragraphs: [
          'Ngày xửa ngày xưa, ở một ngôi làng xanh mát có anh nông dân tên là Khoai. Anh Khoai có chiếc nón lá đội đầu, tính tình thật thà, chịu khó và luôn sẵn lòng giúp đỡ mọi người.',
          'Hằng ngày, anh Khoai đi cày ruộng, gánh nước và chăm vườn cho ông Phú Ông giàu có trong làng. Ông Phú Ông hứa rằng nếu anh làm việc chăm chỉ, ông sẽ thưởng thật hậu hĩnh và tổ chức tiệc vui cho anh.',
          'Tin lời hứa ấy, anh Khoai ngày nào cũng mỉm cười làm việc từ sáng sớm tới chiều tà chẳng ngại nắng mưa.'
        ],
        funPhrase: 'Anh Khoai chăm chỉ, nụ cười thật hiền!',
        echoWord: 'Anh Khoai',
        parentPrompt: {
          '18-24': 'Chỉ anh Khoai đội nón lá trong tranh và nói: "Cái nón! Anh Khoai!"',
          '24-30': 'Hỏi bé: "Anh Khoai đội chiếc nón gì trên đầu nhỉ?" (Nón lá!).',
          '30-36': 'Trò chuyện cùng bé: "Khi mình hứa điều gì với ai, mình có nên giữ lời không?"'
        }
      },
      {
        title: 'Thử thách tìm cây tre một trăm đốt',
        emoji: '🎋',
        sfx: 'wind',
        paragraphs: [
          'Đến ngày hẹn, ông Phú Ông keo kiệt lại muốn tìm cách thoái thác. Ông nghĩ ra một câu đố thật khó: "Anh hãy vào rừng tìm cho ta đúng MỘT cây tre dài tròn một trăm đốt mang về đây!"',
          'Anh Khoai thật thà vác dao vào khu rừng tre xanh bát ngát. Anh đi hết đồi này sang suối nọ, ngước lên đếm từng thân tre cao vút: "Một đốt, hai đốt, ba đốt…"',
          'Nhưng cây tre cao nhất rừng cũng chỉ có chừng bốn mươi đốt thôi! Tìm mãi tới chiều mà không thấy cây nào đủ trăm đốt, anh Khoai buồn rầu ngồi nghỉ trên tảng đá.'
        ],
        funPhrase: 'Một đốt, hai đốt, ba đốt… cây tre cao quá!',
        echoWord: 'Cây tre',
        parentPrompt: {
          '18-24': 'Cùng bé đếm đốt ngón tay vui vẻ: "Một, hai, ba!"',
          '24-30': 'Hỏi bé: "Anh Khoai đang vào rừng tìm cây gì nhỉ?" (Cây tre!).',
          '30-36': 'Hỏi bé: "Theo con, ngoài rừng có cây tre nào dài đến một trăm đốt không?"'
        }
      },
      {
        title: 'Ông Bụt râu bạc hiện ra giúp đỡ',
        emoji: '👴',
        sfx: 'magic',
        paragraphs: [
          'Bỗng nhiên giữa rừng tre tỏa ra một làn ánh sáng vàng dịu ấm áp, tiếng gió hát xào xạc thật êm tai. Ông Bụt râu tóc bạc phơ, nụ cười hiền hậu hiện ra bên cạnh anh Khoai.',
          'Ông Bụt hỏi han dịu dàng rồi mỉm cười bảo: "Con đừng buồn nữa! Con hãy chặt đủ một trăm đốt tre rời xếp ngay ngắn lại đây, rồi ta sẽ dạy con một câu thần chú thật vui!"',
          'Anh Khoai mừng rỡ cảm ơn ông Bụt rồi nhanh nhẹn đi chặt đủ một trăm khúc tre xanh tươi xếp gọn thành hàng.'
        ],
        funPhrase: 'Tinh tinh! Ông Bụt hiền từ đến giúp rồi!',
        echoWord: 'Ông Bụt',
        parentPrompt: {
          '18-24': 'Chỉ ông Bụt râu trắng trong tranh: "Ông Bụt! Râu trắng!"',
          '24-30': 'Hỏi bé: "Ông Bụt dặn anh Khoai chặt bao nhiêu đốt tre nhỉ?"',
          '30-36': 'Hỏi bé: "Con đoán xem câu thần chú của ông Bụt sẽ làm điều gì kỳ diệu?"'
        }
      },
      {
        title: 'Phép màu: Khắc nhập! Khắc nhập!',
        emoji: '✨',
        sfx: 'sparkle',
        paragraphs: [
          'Ông Bụt vẫy tay tỏa những đốm sáng lấp lánh rồi dạy anh Khoai đọc vang: "KHẮC NHẬP! KHẮC NHẬP!"',
          'Kỳ diệu làm sao! Vừa dứt lời, cả một trăm khúc tre xanh bỗng rung nhẹ "cộc cộc cộc!" rồi tự bay lên gắn liền khít vào nhau thành một cây tre dài thẳng tắp đúng một trăm đốt!',
          'Thấy cây tre dài quá khó vác qua đường rừng, ông Bụt lại mỉm cười dạy thêm câu thứ hai: "KHẮC XUẤT! KHẮC XUẤT!". Thế là cây tre lại tách rời thành hai bó nhỏ gọn gàng cho anh Khoai gánh về làng!'
        ],
        funPhrase: 'Khắc nhập, khắc nhập! Khắc xuất, khắc xuất!',
        echoWord: 'Khắc nhập',
        parentPrompt: {
          '18-24': 'Vỗ hai bàn tay dính vào nhau: "Khắc nhập!" rồi mở ra: "Khắc xuất!" — bé sẽ cười thích mê!',
          '24-30': 'Mời bé chơi trò chạm tay cùng ba mẹ và hô: "Khắc nhập! Khắc xuất!"',
          '30-36': 'Hỏi bé: "Câu nào làm các đốt tre dính lại, câu nào làm tre tách ra nhỉ?"'
        }
      },
      {
        title: 'Ông Phú Ông bất ngờ và nhận bài học',
        emoji: '😄',
        sfx: 'bounce',
        paragraphs: [
          'Về tới sân nhà, anh Khoai đặt hai bó tre xuống. Ông Phú Ông cười lớn bảo: "Đây là trăm khúc tre rời chứ đâu phải một cây tre trăm đốt!"',
          'Anh Khoai chỉ mỉm cười hô nhẹ: "KHẮC NHẬP! KHẮC NHẬP!". Tức thì các đốt tre liền gắn tắp lự thành cây tre trăm đốt dài ngoằng! Ông Phú Ông tò mò chạy lại sờ vào cây tre thì bàn tay cũng dính luôn vào thân tre không gỡ ra được!',
          'Ông Phú Ông hốt hoảng nhận ra mình đã sai khi không giữ lời hứa, liền rối rít xin lỗi anh Khoai và hứa từ nay sẽ luôn sống thật thà, công bằng với mọi người.'
        ],
        funPhrase: 'Ui da! Dính chặt rồi! Xin lỗi anh Khoai nhé!',
        echoWord: 'Xin lỗi',
        parentPrompt: {
          '18-24': 'Đặt tay bé dính nhẹ vào tay ba mẹ cười vui: "Khắc nhập! Dính rồi!"',
          '24-30': 'Hỏi bé: "Ông Phú Ông đã nói câu gì khi biết mình làm sai nhỉ?" (Xin lỗi!).',
          '30-36': 'Nhấn mạnh bài học: nói dối hay nuốt lời sẽ làm mọi người buồn.'
        }
      },
      {
        title: 'Khắc xuất và bữa tiệc vui cả làng',
        emoji: '🎉',
        sfx: 'celebrate',
        paragraphs: [
          'Thấy ông Phú Ông đã thật lòng biết lỗi, anh Khoai hiền hậu hô ngay: "KHẮC XUẤT! KHẮC XUẤT!". Cây tre liền buông tay ông Phú Ông ra nhẹ nhàng.',
          'Ông Phú Ông giữ đúng lời hứa, thưởng hậu hĩnh cho anh Khoai và mở một bữa tiệc ấm cúng mời cả làng cùng chung vui ca hát.',
          'Từ đó, anh Khoai có cuộc sống thật hạnh phúc, còn các bạn nhỏ khắp nơi vẫn thích chơi trò đọc câu thần chú vui nhộn "Khắc nhập! Khắc xuất!" mãi không chán.'
        ],
        funPhrase: 'Khắc xuất! Mở tay ra nào! Hoan hô anh Khoai!',
        echoWord: 'Khắc xuất',
        parentPrompt: {
          '18-24': 'Chơi thêm một lượt cùng bé: "Khắc nhập" (nắm tay) — "Khắc xuất" (bung tay reo vui)!',
          '24-30': 'Hỏi bé: "Cuối truyện anh Khoai có vui vẻ tha lỗi cho ông Phú Ông không?"',
          '30-36': 'Hỏi bé: "Nếu có phép màu Khắc nhập, bé muốn ghép đồ chơi nào lại với nhau?"'
        }
      }
    ],
    ending: {
      moral: 'Sống thật thà, giữ đúng lời hứa và biết tha thứ sẽ luôn mang lại niềm vui và phép màu trong cuộc sống.',
      questions: [
        'Mình cùng chơi lại trò "Khắc nhập — Khắc xuất" với hai bàn tay thêm một lần nhé!',
        'Trong truyện Cây Tre Trăm Đốt, ai là người hiền lành hay giúp đỡ nhất nhỉ?'
      ]
    }
  },

  /* =========================================================================
     11. SỰ TÍCH HOA CÚC TRẮNG — Cổ tích Việt Nam (~5 phút)
     ========================================================================= */
  {
    id: 'hoa-cuc-trang',
    title: 'Bông Hoa Cúc Trắng Hiếu Thảo',
    shortTitle: 'Hoa Cúc Trắng',
    origin: 'vietnam',
    originLabel: 'Cổ tích Việt Nam',
    bedtimeFriendly: true,
    readMinutes: 5,
    moralTag: '🤍 Hiếu thảo & yêu mẹ',
    hook: 'Cô bé hiếu thảo kiên nhẫn xé từng cánh hoa trắng thành trăm cánh nhỏ để mẹ sống thật lâu bên em.',
    image: './assets/images/fairy-hoa-cuc-trang.jpg',
    themeColor: '#FDF4DE',
    accentColor: '#C58A21',
    pages: [
      {
        title: 'Hai mẹ con trong ngôi nhà gỗ ấm áp',
        emoji: '🏡',
        sfx: 'warm',
        paragraphs: [
          'Ngày xưa, bên sườn đồi ngập tràn lá vàng mùa thu, có hai mẹ con sống bên nhau trong một ngôi nhà gỗ nhỏ thật ấm áp. Cô bé rất ngoan, ngày nào cũng ôm mẹ thật chặt và hôn lên má mẹ.',
          'Thế nhưng một buổi sáng trời trở gió se lạnh, mẹ bị ốm mệt, nằm nghỉ trên chiếc giường chăn ấm. Cô bé lo lắm, cứ ngồi bên cạnh đắp chăn và mang nước ấm cho mẹ uống từng ngụm nhỏ.',
          'Cô bé thì thầm thật dịu dàng: "Mẹ ơi, con thương mẹ nhiều lắm! Con sẽ đi tìm bông hoa thuốc quý về để mẹ mau khỏe lại nhé!"'
        ],
        funPhrase: 'Mẹ ơi, con thương mẹ nhiều lắm ạ!',
        echoWord: 'Thương mẹ',
        parentPrompt: {
          '18-24': 'Ôm bé vào lòng và thủ thỉ cùng bé: "Thương mẹ! Thương con!"',
          '24-30': 'Hỏi bé: "Khi mẹ bị mệt, cô bé đã làm gì chăm sóc mẹ nhỉ?"',
          '30-36': 'Hỏi bé: "Mỗi khi ba mẹ mệt, bé sẽ làm gì để ba mẹ vui?"'
        }
      },
      {
        title: 'Bước chân nhỏ băng qua đồng cỏ thu',
        emoji: '🍂',
        sfx: 'wind',
        paragraphs: [
          'Sáng sớm hôm sau, cô bé mặc áo ấm rồi men theo con đường đầy lá vàng rơi "xào xạc, xào xạc" đi về phía khu rừng phía xa.',
          'Gió thu thổi nhè nhẹ làm mấy chiếc lá bay xoay tròn trong nắng mai. Những chú bướm vàng bay theo bên cạnh như muốn cổ vũ bước chân nhỏ bé.',
          'Đi mãi qua bãi cỏ thơm, cô bé gặp một ông cụ râu trắng hiền hậu đang đứng dưới gốc cây lớn mỉm cười nhìn em.'
        ],
        funPhrase: 'Xào xạc, xào xạc! Lá vàng mùa thu rơi nhẹ!',
        echoWord: 'Lá vàng',
        parentPrompt: {
          '18-24': 'Chỉ những chiếc lá vàng và chú bướm trong tranh: "Lá vàng! Con bướm!"',
          '24-30': 'Hỏi bé: "Khu vườn trong tranh có màu gì ấm áp thế con?" (Màu vàng!).',
          '30-36': 'Khen sự dũng cảm của cô bé nhỏ khi đi tìm hoa cho mẹ.'
        }
      },
      {
        title: 'Lời nhắn kỳ diệu về bông hoa trắng',
        emoji: '🌼',
        sfx: 'magic',
        paragraphs: [
          'Nghe cô bé kể chuyện đi tìm thuốc cho mẹ, ông cụ cảm động xoa đầu em và chỉ về phía ngọn đồi đầy nắng ấm phía trước:',
          '"Trên thảm cỏ kia có một bông hoa trắng tinh khôi tỏa sáng dịu dàng. Con hãy hái bông hoa ấy mang về — hoa có bao nhiêu cánh thì mẹ con sẽ khỏe mạnh sống bên con bấy nhiêu năm dài!"',
          'Cô bé cúi đầu cảm ơn ông cụ thật lễ phép rồi chạy thật nhanh lên sườn đồi ngập tràn ánh nắng.'
        ],
        funPhrase: 'Bông hoa trắng xinh! Cảm ơn ông cụ ạ!',
        echoWord: 'Bông hoa',
        parentPrompt: {
          '18-24': 'Chỉ bông hoa trắng phát sáng trên tay cô bé: "Bông hoa! Màu trắng!"',
          '24-30': 'Hỏi bé: "Bông hoa quý mà cô bé tìm thấy có màu gì nhỉ?" (Màu trắng!).',
          '30-36': 'Hỏi bé: "Ông cụ đã nói điều gì đặc biệt về số cánh của bông hoa?"'
        }
      },
      {
        title: 'Đếm cánh hoa trắng tinh khôi',
        emoji: '✨',
        sfx: 'sparkle',
        paragraphs: [
          'Quả nhiên, giữa bãi cỏ xanh mượt có một bông hoa trắng tuyệt đẹp đang khẽ đung đưa tỏa hương thơm dịu. Cô bé quỳ xuống nâng niu bông hoa trong hai bàn tay nhỏ bé.',
          'Em cẩn thận đếm từng cánh hoa: "Một cánh… hai cánh… ba cánh… bốn cánh… năm cánh!".',
          'Bông hoa ban đầu chỉ có năm cánh lớn thôi! Cô bé bỗng nghĩ: "Mình muốn mẹ khỏe mạnh sống thật lâu, thật lâu bên mình cơ!"'
        ],
        funPhrase: 'Một, hai, ba, bốn, năm! Con muốn mẹ khỏe thật lâu!',
        echoWord: 'Một hai ba',
        parentPrompt: {
          '18-24': 'Cùng bé đếm 5 ngón tay xinh xắn: "Một, hai, ba, bốn, năm!"',
          '24-30': 'Hỏi bé: "Lúc mới tìm thấy, bông hoa có mấy cánh nhỉ?" (Năm cánh!).',
          '30-36': 'Hỏi bé: "Con đoán cô bé thông minh sẽ làm gì với năm cánh hoa lớn đó?"'
        }
      },
      {
        title: 'Xé nhẹ từng cánh thành trăm cánh hoa xinh',
        emoji: '🤍',
        sfx: 'lullaby',
        paragraphs: [
          'Cô bé khẽ khàng dùng đôi ngón tay nhỏ xíu tách nhẹ từng cánh hoa lớn thành hai cánh nhỏ, rồi tách tiếp thành bốn, thành tám, thành hàng trăm cánh hoa trắng mảnh mai mềm mại!',
          'Kỳ diệu thay, bông hoa chẳng hề bị héo mà lại nở xòe tròn trịa, rực rỡ và thơm ngát hơn gấp trăm lần, với vô vàn cánh hoa trắng tinh khôi không sao đếm xuể!',
          'Đôi mắt cô bé long lanh niềm vui, em ôm chặt bông hoa chạy ù về ngôi nhà gỗ thân yêu.'
        ],
        funPhrase: 'Đẹp quá! Bông hoa nở trăm cánh trắng tinh khôi!',
        echoWord: 'Đẹp quá',
        parentPrompt: {
          '18-24': 'Xòe rộng hai bàn tay như bông hoa đang nở và nói: "Nở hoa! Đẹp quá!"',
          '24-30': 'Hỏi bé: "Bây giờ bông hoa có ít cánh hay rất nhiều cánh nhỉ?" (Rất nhiều!).',
          '30-36': 'Khen sự khéo léo và tình yêu thương mẹ vô bờ của cô bé nhé.'
        }
      },
      {
        title: 'Mẹ khỏe mạnh mỉm cười bên bông Cúc Trắng',
        emoji: '💛',
        sfx: 'celebrate',
        paragraphs: [
          'Vừa về tới nhà, cô bé chạy tới đặt bông hoa trắng thơm ngát vào tay mẹ. Điều kỳ diệu liền xảy ra: hương hoa dịu dàng lan tỏa làm mẹ khỏe mạnh ngay tức thì!',
          'Mẹ ngồi dậy ôm chầm lấy cô con gái bé bỏng vào lòng, hai mẹ con cùng cười thật hạnh phúc bên khung cửa sổ ấm ánh đèn vàng.',
          'Từ đó, loài hoa có trăm cánh trắng tinh khôi ấy được gọi là Hoa Cúc Trắng — biểu tượng dịu dàng của lòng hiếu thảo và tình yêu gia đình.'
        ],
        funPhrase: 'Mẹ khỏe rồi! Hai mẹ con ôm nhau thật ấm!',
        echoWord: 'Ôm mẹ',
        parentPrompt: {
          '18-24': 'Mời bé thơm má và ôm ba mẹ thật chặt: "Ôm ba mẹ nào!"',
          '24-30': 'Hỏi bé: "Loài hoa có rất nhiều cánh trắng tên là hoa gì con nhỉ?" (Hoa Cúc Trắng!).',
          '30-36': 'Thủ thỉ cùng bé trước khi ngủ: "Ba mẹ luôn yêu thương bé thật nhiều!"'
        }
      }
    ],
    ending: {
      moral: 'Tình yêu thương và sự quan tâm dịu dàng dành cho ba mẹ là phép màu ấm áp nhất trên đời.',
      questions: [
        'Bé có muốn tặng ba mẹ một cái ôm thật ấm giống cô bé Hoa Cúc Trắng không?',
        'Bông hoa Cúc Trắng có màu gì và nở nhiều cánh hay ít cánh nhỉ?'
      ]
    }
  },

  /* =========================================================================
     12. CÔ BÉ QUÀNG KHĂN ĐỎ — Cổ tích Thế giới (Bản dịu dàng cho bé, ~6 phút)
     ========================================================================= */
  {
    id: 'co-be-quang-khan-do',
    title: 'Cô Bé Quàng Khăn Đỏ Thăm Bà',
    shortTitle: 'Quàng Khăn Đỏ',
    origin: 'world',
    originLabel: 'Cổ tích Thế giới',
    bedtimeFriendly: true,
    readMinutes: 6,
    moralTag: '❤️ Nghe lời mẹ & cẩn thận',
    hook: 'Chiếc khăn choàng đỏ xinh xắn, giỏ bánh mật ong thơm lừng và bài học nhớ đi thẳng đường về nhà bà ngoại!',
    image: './assets/images/fairy-khan-do.svg',
    themeColor: '#FBECE6',
    accentColor: '#C86247',
    pages: [
      {
        title: 'Chiếc khăn choàng đỏ xinh xắn bà tặng',
        emoji: '🧣',
        sfx: 'warm',
        paragraphs: [
          'Ở một ngôi làng nhỏ ven khu rừng đầy hoa dại, có một cô bé rất dễ thương. Vì bà ngoại may tặng em một chiếc áo choàng có mũ màu đỏ tươi thật đẹp nên ai cũng gọi em là Cô Bé Quàng Khăn Đỏ.',
          'Một buổi sáng nắng ấm, mẹ nướng những chiếc bánh mật ong thơm phức xếp gọn vào chiếc giỏ mây xinh xắn và dặn em mang sang biếu bà ngoại đang hơi mệt.',
          'Mẹ nắm tay em dặn thật dịu dàng: "Con yêu nhớ đi thẳng trên con đường lớn tới nhà bà nhé, đừng la cà nói chuyện với người lạ trên đường nha con!"'
        ],
        funPhrase: 'Khăn đỏ xinh quá! Con nhớ lời mẹ dặn ạ!',
        echoWord: 'Khăn đỏ',
        parentPrompt: {
          '18-24': 'Chỉ chiếc áo choàng đỏ và chiếc giỏ bánh trong tranh: "Khăn đỏ! Giỏ bánh!"',
          '24-30': 'Hỏi bé: "Cô bé mang giỏ bánh thơm đi thăm ai nhỉ?" (Thăm bà ngoại!).',
          '30-36': 'Hỏi bé: "Mẹ đã dặn Cô Bé Quàng Khăn Đỏ điều gì trước khi đi?"'
        }
      },
      {
        title: 'Con đường rợp nắng và tiếng chim hót',
        emoji: '🐦',
        sfx: 'bird',
        paragraphs: [
          'Cô Bé Quàng Khăn Đỏ vui vẻ xách giỏ bánh bước đi tung tăng trên con đường đất mịn: "Lộp cộp, lộp cộp!".',
          'Hai bên đường, những bông hoa cúc trắng và hoa hồng phấn đua nhau nở rộ. Một chú chim xanh đậu trên cành hót líu lo: "Chíp chíp! Chào bạn Khăn Đỏ!"',
          'Khăn Đỏ mỉm cười vẫy tay chào bạn chim xanh, lòng háo hức chỉ mong mau đến nhà bà ngoại để ôm bà một cái thật chặt.'
        ],
        funPhrase: 'Chíp chíp! Chào bạn chim xanh trên đường nhé!',
        echoWord: 'Chim xanh',
        parentPrompt: {
          '18-24': 'Chỉ chú chim xanh nhỏ bên trái tranh và kêu: "Chíp chíp!"',
          '24-30': 'Hỏi bé: "Hai bên con đường có những bông hoa màu gì xinh thế?"',
          '30-36': 'Mời bé vẫy tay nói: "Cháu chào bà ngoại ạ!" thật lễ phép.'
        }
      },
      {
        title: 'Gặp chú Sói tinh nghịch bên bụi hoa',
        emoji: '🐺',
        sfx: 'wind',
        paragraphs: [
          'Khi gần tới khu vườn hoa, một chú Sói xám tinh nghịch đánh hơi thấy mùi bánh mật ong thơm lừng liền nhảy ra hỏi chuyện: "Chào cô bé! Trong giỏ có gì thơm thế? Cô bé đi đâu vậy?"',
          'Khăn Đỏ hơi quên lời mẹ dặn, thật thà chỉ về phía ngôi nhà mái ngói đỏ ấm áp đằng xa: "Cháu mang bánh sang thăm bà ngoại ở ngôi nhà kia ạ!"',
          'Sói xám giả vờ chỉ bãi hoa bên đường để Khăn Đỏ mải hái hoa, còn Sói thì chạy đường tắt đến gõ cửa nhà bà trước.'
        ],
        funPhrase: 'Nhớ lời mẹ dặn: không kể đường cho người lạ nhé!',
        echoWord: 'Nhớ lời',
        parentPrompt: {
          '18-24': 'Lắc nhẹ ngón tay dịu dàng cùng bé: "Không theo người lạ nhé!"',
          '24-30': 'Hỏi bé: "Bạn Sói thấy mùi gì thơm trong giỏ của Khăn Đỏ nhỉ?" (Bánh thơm!).',
          '30-36': 'Nhắc nhẹ bé: khi đi chơi luôn ở gần ba mẹ và không đi theo người lạ.'
        }
      },
      {
        title: 'Tiếng gõ cửa cộc cộc ở nhà bà ngoại',
        emoji: '🚪',
        sfx: 'knock',
        paragraphs: [
          'Sói xám tới nhà bà gõ cửa "cộc cộc cộc!". Bà ngoại tinh mắt nhìn qua ô cửa sổ nhỏ, nhận ra ngay đó là chú Sói hay nghịch ngợm chứ không phải cháu gái mình!',
          'Bà ngoại thông minh bèn lặng lẽ đi ra cửa sau gọi bác Tiều Phu tốt bụng đang ở khu vườn bên cạnh tới giúp, rồi khóa cửa phòng thật an toàn.',
          'Một lát sau, Cô Bé Quàng Khăn Đỏ ôm bó hoa dại tươi tắn tới nơi. Thấy Sói xám đội chiếc mũ ngủ của bà trốn sau cánh cửa, em liền nhận ra ngay điểm lạ!'
        ],
        funPhrase: 'Cộc cộc cộc! Sao tai bà hôm nay to thế nhỉ?',
        echoWord: 'Cộc cộc',
        parentPrompt: {
          '18-24': 'Gõ nhẹ lên bàn ba tiếng cùng bé: "Cộc cộc cộc! Ai đấy?"',
          '24-30': 'Chỉ vào tai và mắt của bé chơi trò vui: "Tai bé đâu? Mắt bé đâu?"',
          '30-36': 'Khen bà ngoại thật bình tĩnh và thông minh khi gọi người lớn giúp đỡ.'
        }
      },
      {
        title: 'Bác Tiều Phu tốt bụng kịp thời giúp đỡ',
        emoji: '🌲',
        sfx: 'clap',
        paragraphs: [
          'Cô Bé Quàng Khăn Đỏ nhanh trí lùi lại gọi lớn: "Bà ơi! Bác Tiều Phu ơi!". Đúng lúc ấy, bà ngoại cùng bác Tiều Phu cao lớn hiền hậu bước tới gõ chiếc gậy gỗ "cốp cốp!" xuống sân.',
          'Thấy bác Tiều Phu nghiêm nghị nhắc nhở, chú Sói xám giật mình xấu hổ cụp tai xuống, vội vàng chạy tọt thẳng vào rừng sâu và hứa không bao giờ dám tới quấy rầy nhà bà nữa!',
          'Cả khu vườn lại trở nên thật yên tĩnh và an toàn.'
        ],
        funPhrase: 'Hoan hô bác Tiều Phu! An toàn rồi!',
        echoWord: 'An toàn',
        parentPrompt: {
          '18-24': 'Vỗ tay reo vui: "Hoan hô! An toàn rồi!"',
          '24-30': 'Hỏi bé: "Ai đã cùng bà ngoại đuổi chú Sói tinh nghịch đi nhỉ?"',
          '30-36': 'Dạy bé: khi gặp chuyện sợ hãi, hãy chạy lại gần và gọi to ba mẹ hoặc ông bà.'
        }
      },
      {
        title: 'Tiệc bánh mật ong ấm áp bên bà ngoại',
        emoji: '🍯',
        sfx: 'celebrate',
        paragraphs: [
          'Bà ngoại mở rộng vòng tay ôm Cô Bé Quàng Khăn Đỏ thật chặt. Khăn Đỏ rúc vào lòng bà thủ thỉ: "Cháu xin lỗi bà và mẹ ạ! Từ nay cháu sẽ luôn nhớ đi thẳng đường và nghe lời mẹ dặn!"',
          'Bà ngoại xoa đầu cháu mỉm cười hiền hậu, pha một ấm trà hoa cúc thơm rồi cùng cháu gái và bác Tiều Phu thưởng thức những chiếc bánh mật ong ngọt lịm.',
          'Ánh nắng chiều chiếu qua khung cửa sổ ấm áp, tràn ngập tiếng cười ríu rít của hai bà cháu.'
        ],
        funPhrase: 'Cháu thương bà ngoại! Bánh mật ong ngon quá!',
        echoWord: 'Bà ngoại',
        parentPrompt: {
          '18-24': 'Ôm bé thật ấm và nói: "Thương bà ngoại! Ăn bánh ngon!"',
          '24-30': 'Hỏi bé: "Hai bà cháu cùng nhau ăn món bánh gì ngọt lịm nhỉ?"',
          '30-36': 'Hỏi bé: "Cuối tuần bé có muốn đến thăm ông bà giống bạn Khăn Đỏ không?"'
        }
      }
    ],
    ending: {
      moral: 'Luôn nghe lời ba mẹ dặn, cẩn thận khi gặp người lạ và biết gọi người lớn giúp đỡ sẽ giúp bé luôn an toàn.',
      questions: [
        'Chiếc khăn choàng của cô bé có màu gì đẹp thế con?',
        'Khi đi ra ngoài chơi, bé nhớ phải đi cạnh ai nhỉ?'
      ]
    }
  },

  /* =========================================================================
     13. VỊT CON XẤU XÍ HÓA THIÊN NGA — Cổ tích Andersen (~6 phút)
     ========================================================================= */
  {
    id: 'vit-con-thien-nga',
    title: 'Chú Vịt Con Hóa Thiên Nga Trắng',
    shortTitle: 'Vịt Con & Thiên Nga',
    origin: 'world',
    originLabel: 'Cổ tích Thế giới',
    bedtimeFriendly: true,
    readMinutes: 6,
    moralTag: '🦢 Yêu bản thân & dịu dàng',
    hook: 'Chú vịt xám lớn khác biệt trải qua mùa đông lành lạnh, để rồi mùa xuân nở rộ thành Thiên Nga tuyệt đẹp!',
    image: './assets/images/fairy-vit-con.svg',
    themeColor: '#E9F3FA',
    accentColor: '#4981AA',
    pages: [
      {
        title: 'Ổ trứng ấm bên bờ hồ hoa sen',
        emoji: '🥚',
        sfx: 'duck',
        paragraphs: [
          'Vào một buổi sáng mùa hè nắng ấm bên hồ sen hồng, cô Vịt Mẹ đang ấp một ổ trứng tròn xinh trong bụi cỏ mềm. Bỗng từng vỏ trứng khẽ kêu: "Tách! Tách! Tách!".',
          'Những chú vịt con lông vàng óng như cục bông lần lượt chui ra, kêu ríu rít: "Cạp cạp! Mẹ ơi, thế giới rộng lớn quá!"',
          'Chỉ còn quả trứng to nhất nằm cuối ổ là nở muộn hơn một chút. Một lát sau, quả trứng ấy cũng khẽ nứt ra — một chú vịt con có bộ lông xám mềm và chiếc cổ cao hơn hẳn các anh chị bước ra mỉm cười chào nắng mai.'
        ],
        funPhrase: 'Tách tách! Cạp cạp! Chào các bạn vịt con!',
        echoWord: 'Cạp cạp',
        parentPrompt: {
          '18-24': 'Bắt chước tiếng vịt con kêu vui cùng bé: "Cạp cạp cạp!"',
          '24-30': 'Chỉ bạn vịt vàng nhỏ trên tranh: "Vịt con có bộ lông màu gì nhỉ?"',
          '30-36': 'Hỏi bé: "Quả trứng nở sau cùng có điểm gì khác các quả trứng kia?"'
        }
      },
      {
        title: 'Chú vịt xám bơi giỏi nhưng hơi buồn',
        emoji: '💧',
        sfx: 'splash',
        paragraphs: [
          'Cô Vịt Mẹ dẫn đàn con xuống hồ tập bơi. Chú vịt xám nhảy "tõm!" xuống nước, bơi lướt đi êm ái và giỏi nhất đàn luôn!',
          'Thế nhưng vài bạn trong sân lại hay xì xào trêu đùa vì chú có bộ lông xám và dáng vẻ khác mọi người. Chú vịt nhỏ hơi buồn bã, cụp đôi cánh mềm xuống.',
          'Vịt Mẹ ôm chú vào cánh vỗ về: "Con đừng buồn nhé! Mỗi bạn nhỏ đều có nét đẹp riêng thật đáng yêu mà!"'
        ],
        funPhrase: 'Tõm! Chú vịt nhỏ bơi thật giỏi trên mặt hồ!',
        echoWord: 'Bơi giỏi',
        parentPrompt: {
          '18-24': 'Đưa tay vẫy như bơi trên mặt nước: "Tõm! Bơi bơi!"',
          '24-30': 'Hỏi bé: "Mình có nên trêu chọc các bạn khác mình không con?" (Không!).',
          '30-36': 'Trò chuyện dịu dàng: mỗi bạn nhỏ đều đặc biệt và đáng được yêu thương.'
        }
      },
      {
        title: 'Chuyến đi khám phá hồ nước mùa thu',
        emoji: '🍂',
        sfx: 'wind',
        paragraphs: [
          'Muốn tìm những người bạn thân thiện biết lắng nghe mình, chú vịt xám nhỏ quyết định đi dạo dọc theo bờ lau sậy xanh mát.',
          'Một chiều mùa thu trong vắt, chú ngước lên bầu trời và thấy một đàn chim lớn có bộ lông trắng muốt như mây bay lượn thật duyên dáng. Đôi cánh trắng vỗ nhịp nhàng êm ái qua ánh hoàng hôn vàng.',
          'Chú vịt xám ngắm nhìn say sưa, trong lòng trào dâng một cảm giác thân quen kỳ lạ mà chú chưa hiểu vì sao.'
        ],
        funPhrase: 'Đàn chim trắng bay trên trời đẹp quá đi!',
        echoWord: 'Chim trắng',
        parentPrompt: {
          '18-24': 'Chỉ lên cao vẫy tay làm cánh chim bay nhẹ: "Bay bay! Trắng quá!"',
          '24-30': 'Hỏi bé: "Đàn chim bay trên trời có bộ lông màu gì đẹp thế?"',
          '30-36': 'Hỏi bé: "Con đoán đàn chim trắng duyên dáng ấy là loài chim gì nhỉ?"'
        }
      },
      {
        title: 'Mùa đông ấm áp trong căn bếp nhỏ',
        emoji: '❄️',
        sfx: 'warm',
        paragraphs: [
          'Mùa đông lành lạnh ghé về, gió thổi nhẹ làm mặt hồ se lạnh. May mắn thay, một bác nông dân tốt bụng đi ngang qua thấy chú vịt nhỏ đang co ro liền bế chú về nhà sưởi ấm bên bếp lửa hồng.',
          'Suốt mùa đông ấy, chú được ăn những hạt thóc thơm và nằm ngủ êm ái trong chiếc giỏ rơm ấm áp. Chú lớn lên từng ngày, đôi cánh ngày một rộng dài và mềm mượt hơn.',
          'Không lâu sau, ánh nắng ấm áp của mùa xuân bắt đầu gõ cửa, làm những nụ hoa sen hồng khẽ hé nở trở lại.'
        ],
        funPhrase: 'Ấm áp quá! Mùa xuân nắng đẹp lại về rồi!',
        echoWord: 'Mùa xuân',
        parentPrompt: {
          '18-24': 'Xoa hai bàn tay ấm áp vào nhau cùng bé: "Ấm quá! Ấm quá!"',
          '24-30': 'Hỏi bé: "Ai đã tốt bụng đón chú vịt nhỏ về sưởi ấm mùa đông?"',
          '30-36': 'Hỏi bé: "Sau mùa đông lạnh thì mùa gì ấm áp sẽ tới nhỉ?" (Mùa xuân!).'
        }
      },
      {
        title: 'Soi bóng xuống mặt hồ trong veo',
        emoji: '✨',
        sfx: 'magic',
        paragraphs: [
          'Chú vịt nhỏ hân hoan vỗ cánh bay ra mặt hồ sen lung linh ánh nắng xuân. Khi cúi đầu xuống uống ngụm nước mát trong veo, chú bỗng ngỡ ngàng tròn xoe đôi mắt!',
          'Hình ảnh phản chiếu dưới mặt nước không còn là chú vịt xám bé nhỏ ngày nào nữa, mà là một bạn THIÊN NGA trắng muốt thanh tú với chiếc cổ cong mềm mại như dải lụa!',
          'Hóa ra từ đầu, quả trứng lớn ấy chính là một quả trứng Thiên Nga lạc vào ổ vịt đấy!'
        ],
        funPhrase: 'Ôi kỳ diệu quá! Mình là bạn Thiên Nga trắng!',
        echoWord: 'Thiên Nga',
        parentPrompt: {
          '18-24': 'Chỉ bạn Thiên Nga trắng muốt giữa tranh: "Thiên Nga! Trắng xinh!"',
          '24-30': 'Hỏi bé: "Khi soi xuống nước, chú vịt xám đã hóa thành bạn gì nhỉ?"',
          '30-36': 'Hỏi bé: "Lúc nhận ra mình là Thiên Nga trắng, bạn ấy cảm thấy thế nào?"'
        }
      },
      {
        title: 'Trái tim khiêm tốn và niềm vui bên bạn mới',
        emoji: '🦢',
        sfx: 'celebrate',
        paragraphs: [
          'Các bạn Thiên Nga trắng khác bơi tới mỉm cười chào đón bạn mới, còn những bạn nhỏ đứng bên bờ hồ vỗ tay reo vui: "Ôi! Bạn Thiên Nga mới xinh đẹp và dịu dàng quá!"',
          'Bạn Thiên Nga khẽ cúi đầu cảm ơn, trong lòng ngập tràn hạnh phúc nhưng vẫn luôn giữ trái tim hiền hòa, thân thiện với cả những chú vịt vàng nhỏ bé bên bờ sen.',
          'Ánh nắng xuân lấp lánh trên mặt nước như mỉm cười chúc mừng một hành trình trưởng thành thật ngọt ngào.'
        ],
        funPhrase: 'Chào bạn Thiên Nga trắng dịu dàng nhé!',
        echoWord: 'Xinh đẹp',
        parentPrompt: {
          '18-24': 'Vẫy tay chào bạn Thiên Nga và hoa sen hồng trên tranh nhé!',
          '24-30': 'Mời bé khen bạn Thiên Nga: "Bạn Thiên Nga xinh quá!"',
          '30-36': 'Nhắn nhủ bé: "Bé luôn là bạn nhỏ thật đặc biệt và tuyệt vời trong mắt ba mẹ!"'
        }
      }
    ],
    ending: {
      moral: 'Mỗi bạn nhỏ đều có vẻ đẹp đặc biệt riêng — hãy luôn yêu thương bản thân và đối xử dịu dàng với mọi người bạn quanh mình.',
      questions: [
        'Con thích nhất hình ảnh nào trên mặt hồ: bạn Thiên Nga trắng, vịt vàng hay hoa sen hồng?',
        'Nếu thấy một bạn nhỏ hơi buồn, con sẽ nói câu gì để bạn ấy vui lên nhỉ?'
      ]
    }
  },

  /* =========================================================================
     14. CHÚ MÈO ĐI HIA THÔNG MINH — Cổ tích Thế giới (~6 phút)
     ========================================================================= */
  {
    id: 'meo-di-hia',
    title: 'Chú Mèo Đi Hia Thông Minh',
    shortTitle: 'Mèo Đi Hia',
    origin: 'world',
    originLabel: 'Cổ tích Thế giới',
    bedtimeFriendly: false,
    readMinutes: 6,
    moralTag: '🐱 Nhanh trí & trung thành',
    hook: 'Chú mèo cam đi đôi hia da kêu lộc cộc, đội mũ lông vũ và dùng trí thông minh giúp cậu chủ đổi đời!',
    image: './assets/images/fairy-meo-di-hia.svg',
    themeColor: '#FDF4DE',
    accentColor: '#C58A21',
    pages: [
      {
        title: 'Người bạn mèo cam đặc biệt nhất',
        emoji: '🐱',
        sfx: 'cat',
        paragraphs: [
          'Ngày xưa, có một chàng trai trẻ hiền lành làm nghề xay bột mì. Khi lớn lên ra ở riêng, tài sản duy nhất chàng có bên mình là một chú mèo cam mắt tròn xoe vô cùng lanh lợi.',
          'Chàng trai hơi lo lắng thở dài: "Mèo ơi, mình chẳng có ruộng vườn gì cả, hai bạn mình làm sao đây?"',
          'Thật bất ngờ, chú mèo cam vươn vai kêu "Meo meo!" rồi cất giọng vui vẻ đáp: "Cậu chủ đừng lo nhé! Cậu chỉ cần tặng mình một đôi hia da xinh xắn và chiếc mũ rộng vành thôi, mình sẽ giúp cậu!"'
        ],
        funPhrase: 'Meo meo! Cậu chủ ơi, để Mèo thông minh giúp nhé!',
        echoWord: 'Meo meo',
        parentPrompt: {
          '18-24': 'Chỉ chú mèo cam trong tranh và bắt chước tiếng kêu: "Meo meo! Con mèo!"',
          '24-30': 'Hỏi bé: "Chú mèo cam xin cậu chủ món đồ gì đi ở chân nhỉ?" (Đôi hia / đôi giày!).',
          '30-36': 'Hỏi bé: "Đội chiếc mũ lông vàng lên, bạn Mèo trông có bảnh bao không?"'
        }
      },
      {
        title: 'Lộc cộc, lộc cộc — Mèo đi đôi hia mới!',
        emoji: '👢',
        sfx: 'knock',
        paragraphs: [
          'Cậu chủ tin tưởng mang về một đôi hia da màu nâu bóng loáng và chiếc mũ xanh có cắm chiếc lông vũ vàng óng ánh. Chú mèo xỏ chân vào đôi hia, bước đi vang tiếng vui tai: "Lộc cộc, lộc cộc!".',
          'Mèo đội mũ ngay ngắn, thắt chiếc thắt lưng khóa vàng rồi vẫy tay chào cậu chủ thật tự tin: "Mèo Đi Hia lên đường đây! Cậu chủ đợi tin vui nhé!"',
          'Trên con đường lát đá đầy nắng, ai đi ngang qua cũng ngoái nhìn mỉm cười vì chưa từng thấy chú mèo nào lịch sự và đáng yêu đến thế.'
        ],
        funPhrase: 'Lộc cộc, lộc cộc! Mèo Đi Hia bước đi thật oai!',
        echoWord: 'Đôi hia',
        parentPrompt: {
          '18-24': 'Chỉ đôi giày của bé rồi chỉ đôi hia của Mèo: "Đôi hia! Lộc cộc!"',
          '24-30': 'Hỏi bé: "Trên mũ của bạn Mèo có cắm chiếc gì màu vàng nhỉ?" (Lông vũ!).',
          '30-36': 'Mời bé giậm chân nhẹ nhàng đi diễu hành giống chú Mèo Đi Hia nhé!'
        }
      },
      {
        title: 'Món quà ngon gửi tặng Nhà Vua',
        emoji: '🎁',
        sfx: 'sparkle',
        paragraphs: [
          'Với đôi chân nhanh thoăn thoắt, Mèo Đi Hia vào khu vườn hái một giỏ đầy những trái dâu tây chín mọng, cà rốt giòn ngọt và táo đỏ thơm lừng.',
          'Chú mạnh dạn bước tới lâu đài xinh đẹp, cúi đầu ngả chiếc mũ lông vũ chào thật lễ phép trước Nhà Vua: "Thưa Đức Vua, cậu chủ tốt bụng của thần gửi biếu Người giỏ hoa quả tươi ngon nhất ạ!"',
          'Nhà Vua và Công Chúa thích thú cười vang, khen chú Mèo vừa thông minh vừa có phép lịch sự tuyệt vời.'
        ],
        funPhrase: 'Con chào Đức Vua ạ! Giỏ quả tươi ngon quá!',
        echoWord: 'Chào ạ',
        parentPrompt: {
          '18-24': 'Cùng bé cúi đầu chào lịch sự giống Mèo Đi Hia: "Chào ạ!"',
          '24-30': 'Chỉ tòa lâu đài phía sau trong tranh: "Ai sống ở tòa lâu đài kia nhỉ?" (Nhà Vua!).',
          '30-36': 'Khen sự lễ phép của Mèo Đi Hia khi nói chuyện với người lớn.'
        }
      },
      {
        title: 'Cả đồng cỏ cùng ca ngợi cậu chủ hiền',
        emoji: '🌾',
        sfx: 'bird',
        paragraphs: [
          'Một buổi sáng đẹp trời, Nhà Vua và Công Chúa đi xe ngựa dạo chơi dọc theo những cánh đồng lúa mì vàng óng ả. Mèo Đi Hia chạy trước thật nhanh để chào hỏi các bác nông dân vui tính ven đường.',
          'Mèo nhiệt tình giúp các bác thu gom lúa, chia nước mát rồi kể thật nhiều chuyện tốt đẹp về cậu chủ hiền lành, chăm chỉ của mình.',
          'Khi xe ngựa đi qua, mọi người ai cũng mỉm cười khen ngợi cậu chủ là người bạn tốt bụng nhất vùng, khiến Nhà Vua càng thêm quý mến chàng.'
        ],
        funPhrase: 'Chạy nhanh lộc cộc! Ai cũng khen cậu chủ tốt bụng!',
        echoWord: 'Tốt bụng',
        parentPrompt: {
          '18-24': 'Vẫy tay vui vẻ giống chú Mèo đang chào mọi người trong tranh nhé!',
          '24-30': 'Hỏi bé: "Bạn Mèo đã giúp các bác nông dân làm gì?"',
          '30-36': 'Hỏi bé: "Khi mình tốt bụng giúp đỡ mọi người, mọi người sẽ cảm thấy thế nào?"'
        }
      },
      {
        title: 'Màn đố vui biến hình thông minh',
        emoji: '🪄',
        sfx: 'magic',
        paragraphs: [
          'Ở cuối con đường có một tòa lâu đài cổ của bác Phù Thủy thích khoe khoang tài biến hình. Mèo Đi Hia gõ cửa "cộc cộc!" rồi khẽ khen: "Nghe nói bác biến hóa siêu lắm, có thể hóa thành bạn Sư Tử lớn được không ạ?"',
          'Bác Phù Thủy thích chí hóa "Bùm!" thành chú Sư Tử to lớn. Mèo vỗ tay rồi cười tinh nghịch đố tiếp: "Thế bác có biến nhỏ xíu lại thành một chú Chuột nhắt bé tí được không ạ?"',
          'Bác Phù Thủy vừa hóa "Bùm!" thành chú Chuột nhắt, Mèo Đi Hia liền nhanh nhẹn chụp chiếc mũ lông úp nhẹ lại, khiến bác Phù Thủy bật cười chịu thua và đồng ý nhường khu vườn rộng cho bà con trồng hoa!'
        ],
        funPhrase: 'Bùm! Biến thành Chuột nhắt! Mèo thông minh quá!',
        echoWord: 'Thông minh',
        parentPrompt: {
          '18-24': 'Chơi ú òa bằng tay cùng bé: "Bùm! Ú òa! Chuột nhắt chít chít!"',
          '24-30': 'Hỏi bé: "Bác Phù Thủy đã biến thành hai con vật gì nhỉ?" (Sư Tử và Chuột nhắt!).',
          '30-36': 'Hỏi bé: "Mèo Đi Hia thắng nhờ sức mạnh hay nhờ sự thông minh nhỉ?"'
        }
      },
      {
        title: 'Tình bạn gắn bó mãi bên lâu đài hoa',
        emoji: '🏰',
        sfx: 'celebrate',
        paragraphs: [
          'Nhờ sự thông minh và tấm lòng trung thành của Mèo Đi Hia, cậu chủ hiền lành được Nhà Vua mời vào lâu đài, kết bạn thân thiết cùng Công Chúa và sống cuộc đời thật hạnh phúc.',
          'Mèo Đi Hia vẫn là người bạn thân nhất của cậu chủ. Mỗi chiều nắng vàng, chú lại xỏ đôi hia nâu bóng loáng đi dạo "lộc cộc" quanh vườn hoa cùng các bạn nhỏ trong vương quốc.',
          'Câu chuyện nhắc bé rằng trí thông minh đi cùng tấm lòng tốt sẽ mở ra bao điều kỳ diệu!'
        ],
        funPhrase: 'Meo meo! Hoan hô chú Mèo Đi Hia tuyệt vời!',
        echoWord: 'Tuyệt vời',
        parentPrompt: {
          '18-24': 'Đập tay khen cùng bé: "Giỏi quá! Meo meo!"',
          '24-30': 'Hỏi bé: "Con thích chiếc mũ hay đôi hia của bạn Mèo hơn?"',
          '30-36': 'Hỏi bé: "Nếu bé có một bạn mèo thông minh, bé muốn đi chơi đâu cùng bạn?"'
        }
      }
    ],
    ending: {
      moral: 'Bình tĩnh, thông minh, lễ phép và trung thành với bạn bè sẽ giúp vượt qua mọi thử thách một cách thật nhẹ nhàng.',
      questions: [
        'Con thích nhất tiếng "meo meo" hay tiếng đôi hia đi "lộc cộc" của chú Mèo?',
        'Bác Phù Thủy trong truyện đã biến hình thành con vật nào bé xíu nhỉ?'
      ]
    }
  },

  /* =========================================================================
     15. NÀNG BẠCH TUYẾT VÀ BẢY CHÚ LÙN — Cổ tích Thế giới (Bản êm dịu, ~6 phút)
     ========================================================================= */
  {
    id: 'bach-tuyet-bay-chu-lun',
    title: 'Bạch Tuyết Và Bảy Chú Lùn Vui Tính',
    shortTitle: 'Bạch Tuyết & 7 Chú Lùn',
    origin: 'world',
    originLabel: 'Cổ tích Thế giới',
    bedtimeFriendly: true,
    readMinutes: 6,
    moralTag: '🎀 Nhân hậu & tình bạn đẹp',
    hook: 'Ngôi nhà gỗ tí hon giữa rừng hoa, bảy chiếc giường nhỏ xinh và bài ca vui tươi của bảy chú lùn!',
    image: './assets/images/fairy-bach-tuyet.svg',
    themeColor: '#E9F3FA',
    accentColor: '#4981AA',
    pages: [
      {
        title: 'Nàng công chúa nhỏ có trái tim nhân hậu',
        emoji: '🎀',
        sfx: 'warm',
        paragraphs: [
          'Ngày xửa ngày xưa, ở một vương quốc rợp hoa thơm có nàng công chúa nhỏ tên là Bạch Tuyết. Nàng có mái tóc đen mượt cài chiếc nơ đỏ xinh, giọng hát trong trẻo và trái tim yêu thương mọi loài vật.',
          'Mỗi sáng, Bạch Tuyết thường ra vườn hát khẽ gọi đàn chim xanh và những chú nai con đốm trắng tới chơi đùa cùng mình.',
          'Một hôm muốn tránh xa bà dì hay cáu kỉnh ở lâu đài, Bạch Tuyết được các bạn chim rừng và bạn nai con dẫn đường đi sâu vào một khu rừng đầy nắng ấm.'
        ],
        funPhrase: 'Chào công chúa Bạch Tuyết! Chiếc nơ đỏ thật xinh!',
        echoWord: 'Bạch Tuyết',
        parentPrompt: {
          '18-24': 'Chỉ Bạch Tuyết và bạn nai đốm trong tranh: "Bạch Tuyết! Bạn nai!"',
          '24-30': 'Hỏi bé: "Trên tóc của Bạch Tuyết có cài chiếc nơ màu gì nhỉ?" (Màu đỏ!).',
          '30-36': 'Hỏi bé: "Những bạn nhỏ nào trong rừng đã dẫn đường giúp Bạch Tuyết?"'
        }
      },
      {
        title: 'Ngôi nhà gỗ tí hon có bảy chiếc giường nhỏ',
        emoji: '🏡',
        sfx: 'knock',
        paragraphs: [
          'Đi qua một thảm cỏ xanh rì đầy hoa dại, Bạch Tuyết bắt gặp một ngôi nhà gỗ xinh xắn tí hon có ống khói nhỏ tỏa làn khói trắng bồng bềnh.',
          'Gõ cửa "cộc cộc cộc!" không thấy ai thưa, Bạch Tuyết khẽ bước vào và ồ lên thích thú: trong nhà có bảy chiếc ghế gỗ nhỏ xíu, bảy chiếc bát xinh và bảy chiếc giường nhỏ xếp hàng ngay ngắn!',
          'Thấy nhà hơi bừa bộn một chút, Bạch Tuyết cùng các bạn chim xanh và sóc nhỏ liền vui vẻ giúp quét dọn sạch bong rồi nấu một nồi súp rau củ thơm phức.'
        ],
        funPhrase: 'Bảy chiếc ghế nhỏ, bảy chiếc giường xinh quá!',
        echoWord: 'Nhà nhỏ',
        parentPrompt: {
          '18-24': 'Chỉ ngôi nhà gỗ ấm cúng bên trái tranh: "Ngôi nhà nhỏ! Cộc cộc!"',
          '24-30': 'Hỏi bé: "Bạch Tuyết đã giúp làm gì trong ngôi nhà tí hon?" (Dọn nhà & nấu súp!).',
          '30-36': 'Khen sự gọn gàng: "Ở nhà bé cũng thích tự dọn đồ chơi cho sạch đẹp nhé!"'
        }
      },
      {
        title: 'Hì hà hì hục! Bảy Chú Lùn về nhà',
        emoji: '🎵',
        sfx: 'clap',
        paragraphs: [
          'Chiều buông nắng vàng dịu, từ phía con đường rừng vang lên tiếng hát rộn ràng vui tai: "Hì hà hì hục! Đi làm về nào! Một hai, một hai!".',
          'Bảy Chú Lùn đội bảy chiếc mũ nhọn đủ sắc màu đỏ, xanh, vàng bước vào nhà. Các chú ngạc nhiên reo lên: "Ôi! Ai đã dọn nhà sạch bóng và nấu súp thơm lừng thế này?"',
          'Gặp nàng Bạch Tuyết hiền hậu mỉm cười chào hỏi, cả bảy chú lùn đều mừng rỡ vỗ tay mời nàng ở lại làm người bạn thân thiết trong ngôi nhà gỗ.'
        ],
        funPhrase: 'Hì hà hì hục! Bảy chú lùn đội mũ xinh về nhà!',
        echoWord: 'Chú lùn',
        parentPrompt: {
          '18-24': 'Chỉ mấy chú lùn đội mũ nhọn râu trắng bên phải tranh: "Chú lùn! Mũ xinh!"',
          '24-30': 'Hỏi bé: "Mũ của các chú lùn có những màu gì đẹp thế con?"',
          '30-36': 'Cùng bé hành quân tại chỗ và hát vui: "Hì hà hì hục! Một hai, một hai!"'
        }
      },
      {
        title: 'Những buổi tối ca hát ấm áp bên bếp lửa',
        emoji: '🔥',
        sfx: 'guitar',
        paragraphs: [
          'Từ hôm đó, ngôi nhà nhỏ giữa rừng lúc nào cũng tràn ngập tiếng cười ấm áp. Ban ngày các chú lùn chăm chỉ đi tìm những viên đá quý lấp lánh, còn Bạch Tuyết ở nhà chăm vườn hoa cùng bạn nai đốm.',
          'Buổi tối, cả nhà quây quần bên bàn ăn thưởng thức món bánh táo nướng thơm lừng, rồi các chú lùn thổi sáo, đánh đàn cho Bạch Tuyết hát những bài hát ru dịu dàng.',
          'Các chú lùn còn ân cần dặn Bạch Tuyết khi ở nhà một mình nhớ cẩn thận, đừng nhận đồ ăn lạ của người không quen nhé!'
        ],
        funPhrase: 'La la la! Cùng ca hát nhảy múa thật vui nào!',
        echoWord: 'Ca hát',
        parentPrompt: {
          '18-24': 'Đung đưa nhẹ nhàng theo nhịp hát cùng bé: "La la la! Vui quá!"',
          '24-30': 'Hỏi bé: "Các chú lùn đã dặn Bạch Tuyết điều gì khi ở nhà?"',
          '30-36': 'Hỏi bé: "Buổi tối ở nhà, bé thích cùng ba mẹ đọc truyện hay ca hát?"'
        }
      },
      {
        title: 'Giấc ngủ sâu và sự chăm sóc của bạn bè',
        emoji: '🍎',
        sfx: 'lullaby',
        paragraphs: [
          'Một buổi chiều, bà dì khó tính hóa trang thành bà lão mang một quả táo đỏ mọng chứa phép ngủ sâu đến tặng Bạch Tuyết. Quên lời dặn, Bạch Tuyết vừa cắn một miếng nhỏ liền ngáp dài rồi thiếp ngủ êm đềm trên chiếc giường hoa.',
          'Bảy Chú Lùn về thấy bạn ngủ say mãi không tỉnh thì thương lắm, ngày nào cũng hái những bông hoa rừng thơm nhất đặt quanh giường và hát khẽ gọi bạn dậy.',
          'Đúng lúc ấy, chàng Hoàng Tử tốt bụng đi ngang qua khu rừng nghe tiếng chim rừng kể chuyện liền bước tới nhẹ nhàng đánh thức phép màu bằng lời chúc chân thành.'
        ],
        funPhrase: 'Tỉnh dậy đi nào bạn Bạch Tuyết ơi!',
        echoWord: 'Tỉnh dậy',
        parentPrompt: {
          '18-24': 'Chơi nhắm mắt ngủ rồi mở mắt cười tươi cùng bé: "Ngủ khò… Tỉnh dậy rồi!"',
          '24-30': 'Hỏi bé: "Quả táo trong truyện có màu gì nhỉ?" (Màu đỏ!).',
          '30-36': 'Nhắc nhẹ bé: chỉ ăn món ăn do ba mẹ hoặc người thân đưa cho thôi nhé.'
        }
      },
      {
        title: 'Tỉnh giấc rạng rỡ và niềm vui sum họp',
        emoji: '🌟',
        sfx: 'celebrate',
        paragraphs: [
          'Phép ngủ sâu tan biến trong làn ánh sáng lấp lánh! Nàng Bạch Tuyết chớp mắt tỉnh dậy mỉm cười tươi tắn: "Chào các bạn chú lùn yêu quý! Mình tỉnh dậy rồi đây!"',
          'Bảy Chú Lùn nhảy cẫng lên reo hò, chim xanh hót vang rộn rã và bạn nai con chạy vòng quanh chúc mừng.',
          'Từ đó, Bạch Tuyết, Hoàng Tử và Bảy Chú Lùn thường xuyên thăm nhau, cùng mở những bữa tiệc trà bánh ngoài khu vườn đầy hoa thơm ngát.'
        ],
        funPhrase: 'Hoan hô! Bạch Tuyết và Bảy Chú Lùn thật hạnh phúc!',
        echoWord: 'Hạnh phúc',
        parentPrompt: {
          '18-24': 'Vỗ tay cười tươi cùng bé: "Hoan hô! Vui quá!"',
          '24-30': 'Hỏi bé: "Có tất cả mấy chú lùn làm bạn với Bạch Tuyết nhỉ?" (Bảy chú lùn!).',
          '30-36': 'Hỏi bé: "Bé thích nhất chú lùn nào: chú hay cười, chú thích hát hay chú hay ngủ?"'
        }
      }
    ],
    ending: {
      moral: 'Lòng nhân hậu, sự gọn gàng chăm chỉ và tình bạn chân thành sẽ luôn được mọi người yêu thương, che chở.',
      questions: [
        'Con nhớ trong ngôi nhà gỗ có mấy chiếc giường nhỏ cho các chú lùn nhỉ?',
        'Mình cùng chúc Bạch Tuyết và bảy chú lùn một giấc ngủ thật êm nhé!'
      ]
    }
  },

  /* =========================================================================
     16. KIẾN CHĂM CHỈ VÀ VE SẦU CA HÁT — Ngụ ngôn cổ tích (~5 phút)
     ========================================================================= */
  {
    id: 'kien-va-ve-sau',
    title: 'Kiến Chăm Chỉ Và Ve Sầu Ca Hát',
    shortTitle: 'Kiến & Ve Sầu',
    origin: 'world',
    originLabel: 'Cổ tích Thế giới',
    bedtimeFriendly: true,
    readMinutes: 5,
    moralTag: '🐜 Chăm chỉ & rộng lòng',
    hook: 'Mùa hè đàn Kiến tha hạt gạo một-hai đều bước, bạn Ve Sầu gảy đàn ve-ve — và cái kết ấm lòng mùa đông!',
    image: './assets/images/fairy-kien-ve-sau.svg',
    themeColor: '#FDF4DE',
    accentColor: '#C58A21',
    pages: [
      {
        title: 'Mùa hè rực nắng trên cánh đồng xanh',
        emoji: '☀️',
        sfx: 'guitar',
        paragraphs: [
          'Vào một mùa hè nắng vàng rực rỡ, trên cành cây xanh mát có một bạn Ve Sầu rất thích âm nhạc. Ngày nào Ve Sầu cũng ôm chiếc đàn gỗ nhỏ, vừa rung cánh vừa hát vang: "Ve ve ve! Hè vui quá đi!"',
          'Ở ngay bãi cỏ phía dưới, đàn Kiến nâu nhỏ xíu lại đang nối đuôi nhau đi thành hàng thật thẳng tắp.',
          'Mỗi chú Kiến đều cõng trên lưng một hạt lúa mì vàng ươm to gần bằng cả người mình, vừa đi vừa nhịp nhàng đếm bước: "Một hai, một hai! Mang hạt về nhà!"'
        ],
        funPhrase: 'Ve ve ve! Một hai, một hai, Kiến tha hạt về!',
        echoWord: 'Ve ve',
        parentPrompt: {
          '18-24': 'Chỉ bạn Ve Sầu gảy đàn và hai bạn Kiến cõng hạt trên tranh: "Ve ve! Bạn Kiến!"',
          '24-30': 'Hỏi bé: "Trên lưng các bạn Kiến nhỏ đang cõng gì màu vàng thế?" (Hạt lúa!).',
          '30-36': 'Hỏi bé: "Mùa hè bạn Ve Sầu thích làm gì nhất nhỉ?" (Đàn hát!).'
        }
      },
      {
        title: 'Lời rủ chơi và lời khuyên nhỏ của Kiến',
        emoji: '🐜',
        sfx: 'tap',
        paragraphs: [
          'Thấy đàn Kiến làm việc miệt mài dưới nắng, Ve Sầu cười tít mắt gọi xuống: "Bạn Kiến ơi, trời đẹp thế này sao không nghỉ tay lên đây nghe mình đàn hát cho vui?"',
          'Chú Kiến nhỏ lau nhẹ giọt mồ hôi, mỉm cười hiền hòa đáp: "Tiếng đàn của bạn hay lắm! Nhưng chúng mình phải tích trữ thức ăn trước khi mùa đông lạnh tới. Bạn Ve Sầu cũng cất thêm chút đồ ăn đi nhé!"',
          'Ve Sầu phẩy tay cười giòn tan: "Ôi, mùa đông còn lâu lắm mà! Bây giờ cứ ca hát trước đã! Ve ve ve!"'
        ],
        funPhrase: 'Kiến chăm chỉ làm việc, chuẩn bị cho mùa đông!',
        echoWord: 'Chăm chỉ',
        parentPrompt: {
          '18-24': 'Giả vờ gảy đàn ghi-ta nhỏ cùng bé: "Tưng tưng! Ve ve!"',
          '24-30': 'Hỏi bé: "Bạn Kiến khuyên bạn Ve Sầu nên chuẩn bị gì nhỉ?" (Đồ ăn!).',
          '30-36': 'Trò chuyện cùng bé: vừa biết làm việc vừa biết vui chơi sẽ rất tuyệt.'
        }
      },
      {
        title: 'Ngôi nhà nhỏ của Kiến đầy ắp hạt thơm',
        emoji: '🏠',
        sfx: 'warm',
        paragraphs: [
          'Suốt mùa hè rồi sang cả mùa thu, đàn Kiến vẫn kiên nhẫn hợp sức cùng nhau tha từng hạt lúa, hạt ngô và mẩu bánh ngọt về ngôi nhà đất tròn ấm cúng.',
          'Cả kho nhỏ bên trong nhà Kiến xếp đầy ắp thức ăn thơm lừng, đèn vàng thắp lên sáng ấm qua hai ô cửa sổ tròn xinh.',
          'Khi công việc đã hoàn tất gọn gàng, đàn Kiến vui vẻ quây quần nghỉ ngơi, sẵn sàng đón mùa đông.'
        ],
        funPhrase: 'Kho đầy hạt thơm! Nhà Kiến ấm áp quá!',
        echoWord: 'Ấm áp',
        parentPrompt: {
          '18-24': 'Chỉ ngôi nhà đất tròn có cửa sổ vàng bên trái tranh: "Nhà bạn Kiến!"',
          '24-30': 'Hỏi bé: "Ngôi nhà của bạn Kiến có mấy ô cửa sổ tròn màu vàng nhỉ?" (Hai ô!).',
          '30-36': 'Hỏi bé: "Làm xong việc sớm rồi mới nghỉ ngơi, bé thấy có thoải mái không?"'
        }
      },
      {
        title: 'Gió mùa đông thổi lạnh ngoài đồng cỏ',
        emoji: '🌬️',
        sfx: 'wind',
        paragraphs: [
          'Rồi mùa đông lạnh cũng gõ cửa! Gió thổi "vi vu, vi vu", lá xanh rụng hết, ngoài cánh đồng chẳng còn hạt lúa hay chiếc lá non nào nữa.',
          'Bạn Ve Sầu ôm chiếc đàn nhỏ run cầm cập vì lạnh và đói bụng. Lúc này Ve Sầu mới nhớ ra lời khuyên tốt bụng của bạn Kiến hồi mùa hè.',
          'Ve Sầu ngại ngùng bước tới trước cánh cửa gỗ nhỏ của nhà Kiến, khẽ gõ cửa: "Cộc cộc cộc! Kiến ơi, cho mình sưởi ấm một chút được không?"'
        ],
        funPhrase: 'Vi vu lạnh quá! Cộc cộc cộc, Kiến ơi mở cửa nhé!',
        echoWord: 'Cộc cộc',
        parentPrompt: {
          '18-24': 'Ôm vai giả vờ hơi lạnh "hừ lạnh quá" rồi gõ nhẹ "cộc cộc cộc!"',
          '24-30': 'Hỏi bé: "Mùa đông tới, bạn Ve Sầu cảm thấy thế nào nhỉ?" (Lạnh và đói!).',
          '30-36': 'Hỏi bé: "Nếu con là bạn Kiến, con có mở cửa cho Ve Sầu vào sưởi ấm không?"'
        }
      },
      {
        title: 'Bát súp nóng và tấm lòng rộng mở của Kiến',
        emoji: '🥣',
        sfx: 'warm',
        paragraphs: [
          'Cánh cửa gỗ liền mở ra! Chú Kiến nhỏ chẳng hề trách mắng mà nở nụ cười ấm áp đón Ve Sầu vào nhà sưởi ấm bên lò lửa nhỏ.',
          'Đàn Kiến múc ngay một bát súp lúa mì nóng hổi thơm phức mời Ve Sầu ăn cho lại sức. Ve Sầu vừa ăn vừa xúc động nói: "Cảm ơn các bạn Kiến nhiều lắm! Từ mùa hè sau, mình cũng sẽ chăm chỉ làm việc cùng các bạn!"',
          'Ăn xong ấm bụng, Ve Sầu ôm cây đàn gảy một bản nhạc thật êm ái tặng cả gia đình Kiến nghe trước khi đi ngủ.'
        ],
        funPhrase: 'Cảm ơn bạn Kiến tốt bụng! Chia sẻ thật vui!',
        echoWord: 'Cảm ơn',
        parentPrompt: {
          '18-24': 'Giả vờ nâng bát súp thổi nhẹ "phù phù" rồi nói: "Cảm ơn bạn Kiến!"',
          '24-30': 'Hỏi bé: "Bạn Ve Sầu đã tặng lại gì cho gia đình Kiến nhỉ?" (Bản nhạc hay!).',
          '30-36': 'Khen tấm lòng tốt của đàn Kiến: biết giúp đỡ bạn bè khi bạn gặp khó khăn.'
        }
      },
      {
        title: 'Mùa xuân sau vừa làm việc vừa ca hát',
        emoji: '🎶',
        sfx: 'celebrate',
        paragraphs: [
          'Mùa xuân ấm áp quay trở lại, cỏ hoa lại nở rộ đầy đồng. Giữ đúng lời hứa, mỗi buổi sáng bạn Ve Sầu cùng đàn Kiến ra đồng chăm chỉ gom hạt lúa vàng mang về nhà.',
          'Đến buổi chiều làm xong việc, Ve Sầu lại gảy đàn ghi-ta "tưng tưng, ve ve!" cho cả đàn Kiến cùng nhảy múa hát ca tưng bừng.',
          'Từ đó, Kiến và Ve Sầu trở thành đôi bạn thân thiết nhất trên đồng cỏ — lúc làm thì thật chăm, lúc chơi thì thật vui!'
        ],
        funPhrase: 'Làm thật chăm, chơi thật vui! Hoan hô Kiến và Ve Sầu!',
        echoWord: 'Thật vui',
        parentPrompt: {
          '18-24': 'Vỗ tay theo nhịp cùng bé: "Một hai, một hai! Thật vui!"',
          '24-30': 'Hỏi bé: "Bây giờ bạn Ve Sầu có còn lười làm việc nữa không?" (Không!).',
          '30-36': 'Khích lệ bé: "Giống Kiến và Ve Sầu, bé vừa chăm ngoan vừa chơi thật vui nhé!"'
        }
      }
    ],
    ending: {
      moral: 'Chăm chỉ chuẩn bị trước, biết chia sẻ rộng lòng và cân bằng giữa làm việc với niềm vui ca hát sẽ giúp mỗi ngày đều trọn vẹn.',
      questions: [
        'Con thích làm bạn Kiến chăm chỉ hay bạn Ve Sầu biết đàn hát?',
        'Trong truyện, bạn Kiến đã làm gì thật đáng yêu khi Ve Sầu tới gõ cửa mùa đông?'
      ]
    }
  }
];
