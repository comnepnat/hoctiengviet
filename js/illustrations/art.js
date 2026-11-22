/**
 * Bộ tranh minh họa sách tranh thủ công (Warm Storybook Vector Art)
 * Thiết kế bo tròn mềm mại, màu sắc tự nhiên Montessori dành riêng cho mắt bé 18–36 tháng.
 */

const SVG_WRAP = (inner) =>
  `<svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;

export const ART_MAP = {
  // 1. MÈO
  meo: SVG_WRAP(`
    <path d="M118 118 C138 116 144 96 132 84" stroke="#E8A267" stroke-width="11" stroke-linecap="round"/>
    <ellipse cx="80" cy="112" rx="38" ry="30" fill="#F2B880"/>
    <ellipse cx="80" cy="118" rx="22" ry="18" fill="#FFF4E6"/>
    <polygon points="44,58 38,24 68,44" fill="#F2B880" stroke="#D48E52" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="46,52 43,32 61,44" fill="#F6B8B8"/>
    <polygon points="116,58 122,24 92,44" fill="#F2B880" stroke="#D48E52" stroke-width="2.5" stroke-linejoin="round"/>
    <polygon points="114,52 117,32 99,44" fill="#F6B8B8"/>
    <circle cx="80" cy="70" r="36" fill="#F2B880"/>
    <path d="M72 38 L76 48 M80 36 L80 49 M88 38 L84 48" stroke="#D48E52" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="65" cy="68" r="5" fill="#3E2F26"/>
    <circle cx="63.5" cy="66.5" r="1.8" fill="#FFFFFF"/>
    <circle cx="95" cy="68" r="5" fill="#3E2F26"/>
    <circle cx="93.5" cy="66.5" r="1.8" fill="#FFFFFF"/>
    <circle cx="55" cy="78" r="6" fill="#E07A5F" opacity="0.35"/>
    <circle cx="105" cy="78" r="6" fill="#E07A5F" opacity="0.35"/>
    <polygon points="76,75 84,75 80,80" fill="#E07A5F"/>
    <path d="M73 84 Q76.5 89 80 84 Q83.5 89 87 84" stroke="#3E2F26" stroke-width="2.8" stroke-linecap="round" fill="none"/>
    <path d="M36 74 L52 76 M35 82 L52 81 M124 74 L108 76 M125 82 L108 81" stroke="#8C6B54" stroke-width="2.2" stroke-linecap="round"/>
    <ellipse cx="64" cy="136" rx="10" ry="7" fill="#FFF4E6"/>
    <ellipse cx="96" cy="136" rx="10" ry="7" fill="#FFF4E6"/>
  `),

  // 2. CHÓ
  cho: SVG_WRAP(`
    <path d="M120 112 C136 104 140 88 134 80" stroke="#C58B5B" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="80" cy="114" rx="36" ry="28" fill="#D9A06E"/>
    <ellipse cx="80" cy="118" rx="19" ry="18" fill="#FDF2E4"/>
    <ellipse cx="42" cy="74" rx="15" ry="26" transform="rotate(14 42 74)" fill="#A96E42"/>
    <ellipse cx="118" cy="74" rx="15" ry="26" transform="rotate(-14 118 74)" fill="#A96E42"/>
    <circle cx="80" cy="68" r="35" fill="#D9A06E"/>
    <ellipse cx="94" cy="64" rx="14" ry="13" fill="#B57B4D" opacity="0.55"/>
    <ellipse cx="80" cy="80" rx="18" ry="13" fill="#FDF2E4"/>
    <circle cx="65" cy="64" r="5" fill="#3E2F26"/>
    <circle cx="63.5" cy="62.5" r="1.8" fill="#FFFFFF"/>
    <circle cx="95" cy="64" r="5" fill="#3E2F26"/>
    <circle cx="93.5" cy="62.5" r="1.8" fill="#FFFFFF"/>
    <ellipse cx="80" cy="75" rx="7" ry="5.5" fill="#3E2F26"/>
    <path d="M72 84 Q80 91 88 84" stroke="#3E2F26" stroke-width="2.8" stroke-linecap="round"/>
    <ellipse cx="80" cy="91" rx="5.5" ry="6.5" fill="#E07A5F"/>
    <rect x="58" y="96" width="44" height="9" rx="4.5" fill="#E07A5F"/>
    <circle cx="80" cy="103" r="5" fill="#E9B44C"/>
  `),

  // 3. VỊT
  vit: SVG_WRAP(`
    <path d="M24 128 Q52 120 80 128 T136 128" stroke="#659EC7" stroke-width="6" stroke-linecap="round" opacity="0.55"/>
    <ellipse cx="82" cy="104" rx="44" ry="28" fill="#F5C94E"/>
    <path d="M122 98 Q138 90 134 106 Q128 114 116 112 Z" fill="#F5C94E"/>
    <path d="M62 104 Q84 94 106 106 Q92 122 68 118 Z" fill="#E5B135"/>
    <circle cx="62" cy="62" r="28" fill="#F5C94E"/>
    <path d="M58 34 Q64 24 68 35 Q74 28 73 37" stroke="#E5B135" stroke-width="4" stroke-linecap="round" fill="none"/>
    <ellipse cx="36" cy="66" rx="16" ry="9" fill="#E07A5F"/>
    <path d="M24 67 Q36 70 46 66" stroke="#B6553B" stroke-width="2" stroke-linecap="round"/>
    <circle cx="56" cy="57" r="4.8" fill="#3E2F26"/>
    <circle cx="54.5" cy="55.5" r="1.7" fill="#FFFFFF"/>
    <circle cx="68" cy="66" r="5.5" fill="#E07A5F" opacity="0.32"/>
  `),

  // 4. GÀ TRỐNG
  ga: SVG_WRAP(`
    <path d="M110 86 C134 62 146 82 128 102 C142 96 144 114 122 116" fill="#679A74"/>
    <path d="M108 92 C128 74 136 90 120 108" fill="#4E7D5A"/>
    <ellipse cx="82" cy="102" rx="36" ry="28" fill="#F7E4C8"/>
    <path d="M68 102 Q86 92 104 105 Q92 120 72 114 Z" fill="#E2A45B"/>
    <circle cx="64" cy="60" r="24" fill="#F7E4C8"/>
    <path d="M52 38 C52 24 64 24 64 36 C68 24 80 26 76 40 C84 34 88 44 78 48 Z" fill="#D95D4E"/>
    <polygon points="41,60 28,65 41,70" fill="#E5AA3E"/>
    <ellipse cx="44" cy="76" rx="5.5" ry="7.5" fill="#D95D4E"/>
    <circle cx="56" cy="57" r="4.5" fill="#3E2F26"/>
    <circle cx="54.5" cy="55.5" r="1.6" fill="#FFFFFF"/>
    <path d="M72 128 L72 142 M66 142 L78 142 M92 128 L92 142 M86 142 L98 142" stroke="#E5AA3E" stroke-width="4" stroke-linecap="round"/>
  `),

  // 5. BÒ SỮA
  bo: SVG_WRAP(`
    <ellipse cx="80" cy="112" rx="40" ry="28" fill="#FFFFFF" stroke="#D8CBB8" stroke-width="2.5"/>
    <ellipse cx="62" cy="108" rx="14" ry="11" fill="#4A3F39"/>
    <ellipse cx="102" cy="118" rx="11" ry="9" fill="#4A3F39"/>
    <path d="M48 44 Q42 28 54 34" stroke="#E5AA3E" stroke-width="7" stroke-linecap="round"/>
    <path d="M112 44 Q118 28 106 34" stroke="#E5AA3E" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="38" cy="58" rx="14" ry="8" transform="rotate(-15 38 58)" fill="#4A3F39"/>
    <ellipse cx="122" cy="58" rx="14" ry="8" transform="rotate(15 122 58)" fill="#4A3F39"/>
    <rect x="46" y="38" width="68" height="62" rx="30" fill="#FFFFFF" stroke="#D8CBB8" stroke-width="2.5"/>
    <ellipse cx="96" cy="54" rx="14" ry="12" fill="#4A3F39"/>
    <ellipse cx="80" cy="84" rx="28" ry="18" fill="#F6C5BE"/>
    <circle cx="64" cy="60" r="4.8" fill="#3E2F26"/>
    <circle cx="62.5" cy="58.5" r="1.7" fill="#FFFFFF"/>
    <circle cx="96" cy="60" r="4.8" fill="#3E2F26"/>
    <circle cx="94.5" cy="58.5" r="1.7" fill="#FFFFFF"/>
    <circle cx="69" cy="82" r="3.5" fill="#B57068"/>
    <circle cx="91" cy="82" r="3.5" fill="#B57068"/>
    <path d="M72 91 Q80 97 88 91" stroke="#8C4E47" stroke-width="2.6" stroke-linecap="round"/>
  `),

  // 6. HEO CON
  heo: SVG_WRAP(`
    <path d="M122 108 C136 102 136 116 128 118 C138 122 134 130 124 124" stroke="#E5989B" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <ellipse cx="80" cy="112" rx="38" ry="28" fill="#F7B7BC"/>
    <polygon points="46,56 38,30 68,44" fill="#F29DA4" stroke="#DF828A" stroke-width="2" stroke-linejoin="round"/>
    <polygon points="114,56 122,30 92,44" fill="#F29DA4" stroke="#DF828A" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="80" cy="70" r="37" fill="#F7B7BC"/>
    <circle cx="64" cy="62" r="4.8" fill="#3E2F26"/>
    <circle cx="62.5" cy="60.5" r="1.6" fill="#FFFFFF"/>
    <circle cx="96" cy="62" r="4.8" fill="#3E2F26"/>
    <circle cx="94.5" cy="60.5" r="1.6" fill="#FFFFFF"/>
    <ellipse cx="80" cy="78" rx="18" ry="12" fill="#EC8F97"/>
    <ellipse cx="73" cy="78" rx="3.2" ry="4.5" fill="#A64E56"/>
    <ellipse cx="87" cy="78" rx="3.2" ry="4.5" fill="#A64E56"/>
    <path d="M72 94 Q80 100 88 94" stroke="#A64E56" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="64" cy="136" rx="9" ry="7" fill="#EC8F97"/>
    <ellipse cx="96" cy="136" rx="9" ry="7" fill="#EC8F97"/>
  `),

  // 7. CHIM NHỎ
  chim: SVG_WRAP(`
    <path d="M24 120 Q80 108 136 116" stroke="#8C6B54" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="122" cy="108" rx="10" ry="5" transform="rotate(-24 122 108)" fill="#679A74"/>
    <polygon points="106,86 138,70 132,94" fill="#4981AA"/>
    <ellipse cx="78" cy="84" rx="36" ry="30" fill="#659EC7"/>
    <ellipse cx="66" cy="92" rx="22" ry="18" fill="#FCE7C8"/>
    <path d="M68 78 Q94 68 112 86 Q96 102 74 96 Z" fill="#4981AA"/>
    <polygon points="44,74 28,80 44,86" fill="#E5AA3E"/>
    <circle cx="58" cy="74" r="4.8" fill="#3E2F26"/>
    <circle cx="56.5" cy="72.5" r="1.7" fill="#FFFFFF"/>
    <circle cx="64" cy="83" r="5" fill="#E07A5F" opacity="0.35"/>
    <path d="M74 112 L74 122 M88 112 L88 122" stroke="#E5AA3E" stroke-width="3.5" stroke-linecap="round"/>
  `),

  // 8. SỮA
  sua: SVG_WRAP(`
    <rect x="46" y="42" width="68" height="92" rx="16" fill="#E9F3FA" stroke="#B6D3E6" stroke-width="4"/>
    <path d="M51 64 Q66 56 80 64 T109 64 L109 124 Q109 130 103 130 L57 130 Q51 130 51 124 Z" fill="#FFFFFF"/>
    <rect x="76" y="20" width="9" height="44" rx="4.5" transform="rotate(14 76 20)" fill="#E07A5F"/>
    <circle cx="68" cy="96" r="4.2" fill="#3E2F26"/>
    <circle cx="92" cy="96" r="4.2" fill="#3E2F26"/>
    <path d="M74 106 Q80 112 86 106" stroke="#3E2F26" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="60" cy="104" r="5" fill="#E07A5F" opacity="0.28"/>
    <circle cx="100" cy="104" r="5" fill="#E07A5F" opacity="0.28"/>
  `),

  // 9. CHUỐI
  chuoi: SVG_WRAP(`
    <path d="M40 106 C56 128 112 126 126 62 C130 48 122 36 116 36 C112 58 92 94 46 96 C38 96 36 102 40 106 Z" fill="#F5CB4C" stroke="#D9A726" stroke-width="3"/>
    <path d="M32 94 C48 116 100 112 114 52 C117 42 112 32 106 32 C102 52 84 82 40 84 C32 84 28 89 32 94 Z" fill="#FBE07A" stroke="#D9A726" stroke-width="3"/>
    <rect x="106" y="24" width="14" height="14" rx="4" transform="rotate(14 106 24)" fill="#8C6B54"/>
    <circle cx="80" cy="84" r="3.8" fill="#3E2F26"/>
    <circle cx="95" cy="78" r="3.8" fill="#3E2F26"/>
    <path d="M84 90 Q90 94 94 87" stroke="#3E2F26" stroke-width="2.4" stroke-linecap="round"/>
  `),

  // 10. TÁO
  tao: SVG_WRAP(`
    <path d="M80 46 Q82 28 94 24" stroke="#7A563C" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="102" cy="36" rx="16" ry="8" transform="rotate(-22 102 36)" fill="#679A74"/>
    <path d="M80 50 C54 40 32 62 36 96 C40 126 64 138 80 132 C96 138 120 126 124 96 C128 62 106 40 80 50 Z" fill="#E06354"/>
    <ellipse cx="56" cy="74" rx="9" ry="15" transform="rotate(-18 56 74)" fill="#FFFFFF" opacity="0.28"/>
    <circle cx="67" cy="92" r="4.5" fill="#3E2F26"/>
    <circle cx="93" cy="92" r="4.5" fill="#3E2F26"/>
    <path d="M74 102 Q80 109 86 102" stroke="#3E2F26" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="58" cy="100" r="5.5" fill="#FFFBF2" opacity="0.32"/>
    <circle cx="102" cy="100" r="5.5" fill="#FFFBF2" opacity="0.32"/>
  `),

  // 11. CƠM
  com: SVG_WRAP(`
    <ellipse cx="80" cy="78" rx="44" ry="26" fill="#FFFFFF" stroke="#E5DAC8" stroke-width="3"/>
    <circle cx="62" cy="68" r="10" fill="#FFFFFF"/>
    <circle cx="80" cy="62" r="12" fill="#FFFFFF"/>
    <circle cx="98" cy="68" r="10" fill="#FFFFFF"/>
    <path d="M104 74 L126 42" stroke="#C58B5B" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="129" cy="38" rx="9" ry="6" transform="rotate(-55 129 38)" fill="#D9A06E"/>
    <path d="M32 82 H128 C126 116 106 132 80 132 C54 132 34 116 32 82 Z" fill="#659EC7"/>
    <rect x="36" y="90" width="88" height="8" rx="4" fill="#FDF4DE"/>
    <rect x="62" y="128" width="36" height="9" rx="4.5" fill="#4981AA"/>
    <circle cx="68" cy="110" r="3.8" fill="#FFFFFF"/>
    <circle cx="92" cy="110" r="3.8" fill="#FFFFFF"/>
    <path d="M74 117 Q80 122 86 117" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  `),

  // 12. NƯỚC
  nuoc: SVG_WRAP(`
    <path d="M80 26 C80 26 42 74 42 100 C42 122 59 138 80 138 C101 138 118 122 118 100 C118 74 80 26 80 26 Z" fill="#78B6DF"/>
    <path d="M62 82 Q56 96 62 110" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" opacity="0.5"/>
    <circle cx="68" cy="100" r="4.5" fill="#2A4458"/>
    <circle cx="92" cy="100" r="4.5" fill="#2A4458"/>
    <path d="M74 110 Q80 116 86 110" stroke="#2A4458" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="58" cy="108" r="5" fill="#FFFFFF" opacity="0.35"/>
    <circle cx="102" cy="108" r="5" fill="#FFFFFF" opacity="0.35"/>
  `),

  // 13. BÁNH
  banh: SVG_WRAP(`
    <path d="M44 82 L54 130 H106 L116 82 Z" fill="#E8B97D"/>
    <path d="M62 84 L66 128 M80 84 L80 128 M98 84 L94 128" stroke="#C99251" stroke-width="3" stroke-linecap="round"/>
    <path d="M38 84 C38 58 58 46 80 46 C102 46 122 58 122 84 C114 92 104 84 96 90 C88 95 72 95 64 90 C56 84 46 92 38 84 Z" fill="#F6C8CB"/>
    <circle cx="80" cy="40" r="12" fill="#E06354"/>
    <path d="M80 28 Q86 18 94 22" stroke="#679A74" stroke-width="4" stroke-linecap="round"/>
    <circle cx="62" cy="68" r="3" fill="#E5AA3E"/>
    <circle cx="96" cy="66" r="3" fill="#679A74"/>
    <circle cx="80" cy="76" r="3" fill="#659EC7"/>
    <circle cx="70" cy="108" r="3.6" fill="#3E2F26"/>
    <circle cx="90" cy="108" r="3.6" fill="#3E2F26"/>
    <path d="M75 115 Q80 120 85 115" stroke="#3E2F26" stroke-width="2.4" stroke-linecap="round"/>
  `),

  // 14. Ô TÔ
  oto: SVG_WRAP(`
    <path d="M36 82 L50 52 C54 44 62 42 72 42 H98 C108 42 114 46 118 54 L130 82 Z" fill="#E07A5F"/>
    <path d="M54 54 H78 V78 H46 Z" fill="#E9F3FA"/>
    <path d="M86 54 H110 L118 78 H86 Z" fill="#E9F3FA"/>
    <rect x="20" y="76" width="120" height="38" rx="16" fill="#E07A5F"/>
    <circle cx="132" cy="92" r="7" fill="#FBE07A"/>
    <circle cx="28" cy="92" r="5" fill="#F6B8B8"/>
    <circle cx="52" cy="114" r="17" fill="#3E2F26"/>
    <circle cx="52" cy="114" r="8" fill="#EFE5D4"/>
    <circle cx="110" cy="114" r="17" fill="#3E2F26"/>
    <circle cx="110" cy="114" r="8" fill="#EFE5D4"/>
  `),

  // 15. TÀU HỎA
  tauhoa: SVG_WRAP(`
    <circle cx="50" cy="36" r="10" fill="#E9F3FA"/>
    <circle cx="66" cy="26" r="13" fill="#E9F3FA"/>
    <rect x="42" y="46" width="16" height="26" rx="4" fill="#3E2F26"/>
    <rect x="30" y="68" width="66" height="44" rx="12" fill="#679A74"/>
    <rect x="86" y="46" width="44" height="66" rx="10" fill="#E07A5F"/>
    <rect x="94" y="56" width="28" height="22" rx="6" fill="#FDF4DE"/>
    <rect x="82" y="40" width="52" height="10" rx="5" fill="#C86247"/>
    <polygon points="30,112 18,118 30,96" fill="#E5AA3E"/>
    <circle cx="48" cy="116" r="14" fill="#3E2F26"/>
    <circle cx="48" cy="116" r="6" fill="#E5AA3E"/>
    <circle cx="80" cy="116" r="14" fill="#3E2F26"/>
    <circle cx="80" cy="116" r="6" fill="#E5AA3E"/>
    <circle cx="114" cy="116" r="14" fill="#3E2F26"/>
    <circle cx="114" cy="116" r="6" fill="#E5AA3E"/>
  `),

  // 16. MÁY BAY
  maybay: SVG_WRAP(`
    <path d="M52 84 L30 116 L54 114 L84 92 Z" fill="#4981AA"/>
    <path d="M72 68 L104 34 L118 40 L94 74 Z" fill="#E5AA3E"/>
    <ellipse cx="80" cy="80" rx="54" ry="20" transform="rotate(-14 80 80)" fill="#659EC7"/>
    <circle cx="64" cy="82" r="6" fill="#FFFBF2"/>
    <circle cx="82" cy="77" r="6" fill="#FFFBF2"/>
    <circle cx="100" cy="73" r="6" fill="#FFFBF2"/>
    <path d="M28 92 L22 72 L38 78 Z" fill="#E07A5F"/>
    <path d="M74 90 L98 122 L112 116 L94 86 Z" fill="#E5AA3E"/>
  `),

  // 17. QUẢ BÓNG
  bong: SVG_WRAP(`
    <circle cx="80" cy="80" r="48" fill="#FBE07A" stroke="#D9A726" stroke-width="3"/>
    <path d="M44 48 C62 66 62 94 44 112" stroke="#E07A5F" stroke-width="16" stroke-linecap="round"/>
    <path d="M116 48 C98 66 98 94 116 112" stroke="#659EC7" stroke-width="16" stroke-linecap="round"/>
    <circle cx="80" cy="80" r="48" stroke="#D9A726" stroke-width="3" fill="none"/>
    <circle cx="80" cy="80" r="14" fill="#FFFFFF"/>
    <circle cx="62" cy="54" r="6" fill="#FFFFFF" opacity="0.45"/>
  `),

  // 18. GẤU BÔNG
  gau: SVG_WRAP(`
    <circle cx="50" cy="40" r="14" fill="#C98F5B"/>
    <circle cx="50" cy="40" r="7" fill="#F2CAA2"/>
    <circle cx="110" cy="40" r="14" fill="#C98F5B"/>
    <circle cx="110" cy="40" r="7" fill="#F2CAA2"/>
    <ellipse cx="80" cy="110" rx="34" ry="30" fill="#C98F5B"/>
    <ellipse cx="80" cy="112" rx="19" ry="18" fill="#F5DFC6"/>
    <circle cx="46" cy="102" r="12" fill="#C98F5B"/>
    <circle cx="114" cy="102" r="12" fill="#C98F5B"/>
    <circle cx="62" cy="134" r="12" fill="#B57B48"/>
    <circle cx="98" cy="134" r="12" fill="#B57B48"/>
    <circle cx="80" cy="66" r="32" fill="#C98F5B"/>
    <ellipse cx="80" cy="74" rx="15" ry="11" fill="#F5DFC6"/>
    <ellipse cx="80" cy="70" rx="5.5" ry="4" fill="#3E2F26"/>
    <path d="M74 77 Q80 82 86 77" stroke="#3E2F26" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="67" cy="60" r="4.2" fill="#3E2F26"/>
    <circle cx="93" cy="60" r="4.2" fill="#3E2F26"/>
    <path d="M56 92 Q80 104 104 92 L100 102 Q80 112 60 102 Z" fill="#679A74"/>
  `),

  // 19. XE ĐẠP
  xedap: SVG_WRAP(`
    <circle cx="46" cy="108" r="24" stroke="#3E2F26" stroke-width="7" fill="#FFFBF2"/>
    <circle cx="46" cy="108" r="5" fill="#E07A5F"/>
    <circle cx="114" cy="108" r="24" stroke="#3E2F26" stroke-width="7" fill="#FFFBF2"/>
    <circle cx="114" cy="108" r="5" fill="#E07A5F"/>
    <path d="M46 108 L76 108 L98 68 L62 68 Z" stroke="#679A74" stroke-width="6" stroke-linejoin="round" fill="none"/>
    <path d="M114 108 L96 56 L112 52" stroke="#679A74" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M62 68 L56 54" stroke="#679A74" stroke-width="6" stroke-linecap="round"/>
    <rect x="44" y="48" width="24" height="8" rx="4" fill="#8C6B54"/>
    <circle cx="114" cy="52" r="6" fill="#E5AA3E"/>
  `),

  // 20. BA
  ba: SVG_WRAP(`
    <path d="M40 140 C42 112 58 102 80 102 C102 102 118 112 120 140 Z" fill="#659EC7"/>
    <circle cx="80" cy="68" r="34" fill="#FAD7BD"/>
    <path d="M46 66 C46 38 64 28 84 30 C106 32 116 46 114 66 C104 50 90 48 76 48 C62 48 52 54 46 66 Z" fill="#4A382D"/>
    <circle cx="67" cy="68" r="4.5" fill="#3E2F26"/>
    <circle cx="93" cy="68" r="4.5" fill="#3E2F26"/>
    <path d="M70 84 Q80 92 90 84" stroke="#3E2F26" stroke-width="3" stroke-linecap="round"/>
    <circle cx="58" cy="78" r="5.5" fill="#E07A5F" opacity="0.3"/>
    <circle cx="102" cy="78" r="5.5" fill="#E07A5F" opacity="0.3"/>
  `),

  // 21. MẸ
  me: SVG_WRAP(`
    <path d="M42 74 C40 42 58 26 80 26 C102 26 120 42 118 74 L124 114 H36 Z" fill="#543D31"/>
    <path d="M40 140 C44 112 60 102 80 102 C100 102 116 112 120 140 Z" fill="#E07A5F"/>
    <circle cx="80" cy="68" r="32" fill="#FAD7BD"/>
    <path d="M48 64 C56 44 74 42 84 44 C96 46 106 54 112 64 C104 44 92 36 80 36 C64 36 52 46 48 64 Z" fill="#543D31"/>
    <circle cx="68" cy="69" r="4.4" fill="#3E2F26"/>
    <circle cx="92" cy="69" r="4.4" fill="#3E2F26"/>
    <path d="M71 84 Q80 91 89 84" stroke="#C86247" stroke-width="3" stroke-linecap="round"/>
    <circle cx="58" cy="78" r="5.5" fill="#E07A5F" opacity="0.35"/>
    <circle cx="102" cy="78" r="5.5" fill="#E07A5F" opacity="0.35"/>
  `),

  // 22. ÔNG BÀ
  ongba: SVG_WRAP(`
    <path d="M22 136 C24 114 36 106 52 106 C68 106 78 114 80 136 Z" fill="#679A74"/>
    <circle cx="52" cy="76" r="24" fill="#FAD7BD"/>
    <path d="M28 72 C30 52 44 48 56 48 C68 48 76 56 76 72 C68 62 56 60 44 60 C36 60 32 64 28 72 Z" fill="#D5D0CA"/>
    <circle cx="44" cy="76" r="3.5" fill="#3E2F26"/>
    <circle cx="60" cy="76" r="3.5" fill="#3E2F26"/>
    <path d="M45 87 Q52 92 59 87" stroke="#3E2F26" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M80 136 C82 114 94 106 110 106 C126 106 138 114 140 136 Z" fill="#A97CA3"/>
    <circle cx="110" cy="48" r="11" fill="#D5D0CA"/>
    <circle cx="110" cy="76" r="24" fill="#FAD7BD"/>
    <path d="M86 72 C88 54 100 50 110 50 C122 50 134 56 134 72 C126 62 114 60 104 60 C96 60 90 64 86 72 Z" fill="#D5D0CA"/>
    <circle cx="102" cy="76" r="3.5" fill="#3E2F26"/>
    <circle cx="118" cy="76" r="3.5" fill="#3E2F26"/>
    <path d="M103 87 Q110 92 117 87" stroke="#3E2F26" stroke-width="2.5" stroke-linecap="round"/>
  `),

  // 23. ĐÔI MẮT
  mat: SVG_WRAP(`
    <ellipse cx="52" cy="84" rx="24" ry="18" fill="#FFFFFF" stroke="#3E2F26" stroke-width="4"/>
    <circle cx="54" cy="84" r="10" fill="#4A3428"/>
    <circle cx="50" cy="80" r="3.5" fill="#FFFFFF"/>
    <path d="M34 62 Q52 52 70 62" stroke="#3E2F26" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="108" cy="84" rx="24" ry="18" fill="#FFFFFF" stroke="#3E2F26" stroke-width="4"/>
    <circle cx="106" cy="84" r="10" fill="#4A3428"/>
    <circle cx="102" cy="80" r="3.5" fill="#FFFFFF"/>
    <path d="M90 62 Q108 52 126 62" stroke="#3E2F26" stroke-width="4" stroke-linecap="round"/>
  `),

  // 24. CÁI MŨI
  mui: SVG_WRAP(`
    <circle cx="80" cy="80" r="50" fill="#FAD7BD"/>
    <path d="M80 48 C80 68 72 86 68 92 C64 98 72 106 80 106 C88 106 96 98 92 92 C88 86 84 74 84 64" fill="#F2BE9B" stroke="#C78A62" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="52" cy="96" r="8" fill="#E07A5F" opacity="0.32"/>
    <circle cx="108" cy="96" r="8" fill="#E07A5F" opacity="0.32"/>
    <path d="M58 66 Q64 60 70 66" stroke="#3E2F26" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M90 66 Q96 60 102 66" stroke="#3E2F26" stroke-width="3.2" stroke-linecap="round"/>
  `),

  // 25. BÀN TAY
  tay: SVG_WRAP(`
    <rect x="52" y="76" width="56" height="54" rx="24" fill="#FAD7BD"/>
    <rect x="44" y="42" width="14" height="44" rx="7" fill="#FAD7BD"/>
    <rect x="61" y="30" width="14" height="52" rx="7" fill="#FAD7BD"/>
    <rect x="79" y="28" width="14" height="54" rx="7" fill="#FAD7BD"/>
    <rect x="97" y="40" width="14" height="46" rx="7" fill="#FAD7BD"/>
    <rect x="30" y="74" width="32" height="15" rx="7.5" transform="rotate(26 30 74)" fill="#FAD7BD"/>
    <circle cx="71" cy="98" r="4" fill="#3E2F26"/>
    <circle cx="91" cy="98" r="4" fill="#3E2F26"/>
    <path d="M75 108 Q81 114 87 108" stroke="#3E2F26" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M32 34 L24 26 M128 34 L136 26 M80 16 L80 8" stroke="#E5AA3E" stroke-width="4" stroke-linecap="round"/>
  `),

  // 26. MẶT TRỜI
  mattroi: SVG_WRAP(`
    <g stroke="#E5AA3E" stroke-width="7" stroke-linecap="round">
      <line x1="80" y1="16" x2="80" y2="30"/>
      <line x1="80" y1="130" x2="80" y2="144"/>
      <line x1="16" y1="80" x2="30" y2="80"/>
      <line x1="130" y1="80" x2="144" y2="80"/>
      <line x1="35" y1="35" x2="45" y2="45"/>
      <line x1="115" y1="115" x2="125" y2="125"/>
      <line x1="125" y1="35" x2="115" y2="45"/>
      <line x1="45" y1="115" x2="35" y2="125"/>
    </g>
    <circle cx="80" cy="80" r="38" fill="#F8CA4D"/>
    <circle cx="67" cy="76" r="4.5" fill="#3E2F26"/>
    <circle cx="93" cy="76" r="4.5" fill="#3E2F26"/>
    <path d="M72 88 Q80 96 88 88" stroke="#3E2F26" stroke-width="3" stroke-linecap="round"/>
    <circle cx="58" cy="84" r="5.5" fill="#E07A5F" opacity="0.35"/>
    <circle cx="102" cy="84" r="5.5" fill="#E07A5F" opacity="0.35"/>
  `),

  // 27. MƯA
  mua: SVG_WRAP(`
    <path d="M44 86 H118 C130 86 138 77 138 66 C138 56 130 48 120 48 C116 34 102 26 88 28 C76 22 58 28 54 44 C40 44 30 54 30 66 C30 78 36 86 44 86 Z" fill="#C9DFEE"/>
    <path d="M54 102 C54 102 46 114 46 120 C46 125 50 128 54 128 C58 128 62 125 62 120 C62 114 54 102 54 102 Z" fill="#659EC7"/>
    <path d="M82 108 C82 108 74 120 74 126 C74 131 78 134 82 134 C86 134 90 131 90 126 C90 120 82 108 82 108 Z" fill="#659EC7"/>
    <path d="M110 100 C110 100 102 112 102 118 C102 123 106 126 110 126 C114 126 118 123 118 118 C118 112 110 100 110 100 Z" fill="#659EC7"/>
    <circle cx="70" cy="60" r="3.8" fill="#3E2F26"/>
    <circle cx="94" cy="60" r="3.8" fill="#3E2F26"/>
    <path d="M76 69 Q82 74 88 69" stroke="#3E2F26" stroke-width="2.5" stroke-linecap="round"/>
  `),

  // 28. BÔNG HOA
  hoa: SVG_WRAP(`
    <path d="M80 86 V140" stroke="#679A74" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="64" cy="118" rx="16" ry="8" transform="rotate(24 64 118)" fill="#679A74"/>
    <ellipse cx="96" cy="114" rx="16" ry="8" transform="rotate(-24 96 114)" fill="#679A74"/>
    <circle cx="80" cy="40" r="18" fill="#F4A599"/>
    <circle cx="108" cy="60" r="18" fill="#F4A599"/>
    <circle cx="98" cy="92" r="18" fill="#F4A599"/>
    <circle cx="62" cy="92" r="18" fill="#F4A599"/>
    <circle cx="52" cy="60" r="18" fill="#F4A599"/>
    <circle cx="80" cy="68" r="20" fill="#F8CA4D"/>
    <circle cx="73" cy="65" r="3.5" fill="#3E2F26"/>
    <circle cx="87" cy="65" r="3.5" fill="#3E2F26"/>
    <path d="M75 74 Q80 79 85 74" stroke="#3E2F26" stroke-width="2.4" stroke-linecap="round"/>
  `),

  // 29. MẶT TRĂNG
  trang: SVG_WRAP(`
    <path d="M98 30 C64 34 42 62 46 94 C50 124 78 140 108 130 C86 124 72 104 74 80 C76 58 84 42 98 30 Z" fill="#F6CA54"/>
    <polygon points="116,42 120,52 130,52 122,58 125,68 116,62 107,68 110,58 102,52 112,52" fill="#E5AA3E"/>
    <circle cx="122" cy="88" r="5" fill="#E5AA3E" opacity="0.8"/>
    <circle cx="106" cy="96" r="3.5" fill="#E5AA3E" opacity="0.65"/>
    <path d="M58 84 Q63 89 68 84" stroke="#3E2F26" stroke-width="2.6" stroke-linecap="round"/>
  `),

  // 30. CÂY XANH
  cay: SVG_WRAP(`
    <rect x="70" y="92" width="20" height="48" rx="8" fill="#9E7353"/>
    <circle cx="58" cy="76" r="28" fill="#78AD85"/>
    <circle cx="102" cy="76" r="28" fill="#679A74"/>
    <circle cx="80" cy="52" r="32" fill="#85BA92"/>
    <circle cx="64" cy="66" r="5" fill="#E07A5F"/>
    <circle cx="96" cy="58" r="5" fill="#E07A5F"/>
    <circle cx="84" cy="82" r="5" fill="#F8CA4D"/>
  `)
};

export function getIllustration(id) {
  return ART_MAP[id] || ART_MAP.meo;
}
