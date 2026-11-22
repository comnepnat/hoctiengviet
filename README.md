# Bi Bô — Ứng Dụng Học Nói Tiếng Việt Tự Nhiên Cho Bé (18 tháng – 3 tuổi)

**Bi Bô** là ứng dụng web (PWA) học nói tiếng Việt được thiết kế dịu mắt, ít kích thích theo tinh thần **Montessori & Hanen (It Takes Two to Talk)**, giúp bé từ **18 tháng đến 3 tuổi** làm quen âm thanh, từ đơn, cụm từ và câu giao tiếp hàng ngày một cách tự nhiên cùng ba mẹ.

## Tính năng nổi bật

1. **Tự động thích nghi 3 giai đoạn phát triển**
   - **18–24 tháng**: Từ tượng thanh (*meo meo, bíp bíp, tí tách*) & từ đơn quen thuộc, trò chơi 2 lựa chọn lớn.
   - **24–30 tháng**: Mở rộng sang cụm 2–3 từ tự nhiên (*mèo kêu meo meo, bé ăn chuối*).
   - **30–36 tháng**: Câu ngắn giao tiếp, chào hỏi lễ phép và hỏi đáp đời sống.

2. **Sách tranh biết nói (30 thẻ hình thủ công, 5 chủ đề)**
   - Chủ đề: *Bạn động vật*, *Đồ ăn ngon*, *Xe & Đồ chơi*, *Gia đình & Cơ thể*, *Thiên nhiên*.
   - Nút **Nghe lại**, **Nói chậm từng tiếng**, và **Bé nói nhé** với sóng âm trực quan + chế độ **Echo phát lại giọng bé** (luôn khen ngợi mọi nỗ lực phát âm, không bao giờ báo sai gắt).

3. **Nghe & Tìm bạn (Không áp lực, không báo sai)**
   - Rèn luyện hiểu ngôn ngữ trước khi nói, hướng dẫn nhẹ nhàng khi bé chạm nhầm và mời bé nhắc lại từ khi chọn đúng.

4. **Chuyện nhỏ mỗi ngày (4 bức tranh màu nước tương tác)**
   - *Buổi sáng của bé*, *Đi công viên chơi*, *Giờ ăn ngon miệng*, *Giờ đi ngủ êm dịu*.
   - Bé chạm vào từng đồ vật trong tranh để nghe câu chuyện gắn với sinh hoạt hằng ngày.

5. **Truyện cổ tích đặc sắc (16 truyện đọc trọn vẹn dưới 10 phút)**
   - Tuyển chọn **8 truyện cổ tích Việt Nam** (*Cây Khế, Chú Cuội Cung Trăng, Cô Tấm & Cá Bống, Thánh Gióng, Bánh Chưng Bánh Giầy, Mai An Tiêm & Dưa Hấu, Cây Tre Trăm Đốt, Hoa Cúc Trắng*) và **8 truyện cổ tích Thế giới** (*Thỏ & Rùa, Củ Cải Khổng Lồ, Ba Chú Heo Con, Cô Bé Quàng Khăn Đỏ, Vịt Con Hóa Thiên Nga, Mèo Đi Hia, Bạch Tuyết & 7 Chú Lùn, Kiến & Ve Sầu*).
   - **Giọng đọc tiếng Việt tự nhiên**: tự xếp hạng & chọn giọng Neural/Natural tốt nhất của trình duyệt (ngắt nghỉ theo từng câu thoại, giữ cao độ tự nhiên), hỗ trợ **Giọng AI cao cấp** (OpenAI / Google Neural2 / ElevenLabs, lưu cache offline), **Ba Mẹ tự thu âm từng trang**, nhạc hộp ru ngủ êm dịu và **Chế độ Đêm Êm Dịu**.

6. **Hỏi Gấu Mây — nhập ngôn ngữ tự nhiên (gõ hoặc nói)**
   - Ô nhập trên trang chủ hiểu câu tiếng Việt tự nhiên, có dấu hoặc không dấu: *"kể chuyện Cây Khế"*, *"con gì kêu gâu gâu?"*, *"kể một truyện trước khi ngủ"*, *"cho bé xem các con vật"*, *"xem tranh đi công viên"*, *"chơi trò chơi"*, *"nói: con yêu mẹ"*.
   - Nút micro dùng nhận dạng giọng nói tiếng Việt của trình duyệt (vi-VN) khi được hỗ trợ.
   - Chạy hoàn toàn offline, không cần API Key. Các yêu cầu đổi cài đặt (hẹn giờ, độ tuổi, thu âm, giọng đọc) luôn phải qua cổng Ba Mẹ.

7. **Góc Ba Mẹ (có cổng khóa giữ 1,5 giây)**
   - **Phòng thu giọng Ba Mẹ**: Ba mẹ tự thu âm giọng thật cho từng thẻ hình (lưu cục bộ bằng IndexedDB, hoạt động offline, không tải dữ liệu lên máy chủ).
   - **Nhật ký những từ đầu tiên**: Đánh dấu các từ bé đã bắt đầu nói được & xem mốc phát triển ngôn ngữ tham khảo.
   - **Hẹn giờ Bạn Gấu buồn ngủ**: Nhắc bé dừng chơi êm dịu sau 10 / 15 / 20 phút.

## Giọng Google Cloud Text-to-Speech

Vào **Góc Ba Mẹ → Cài đặt & Giọng đọc → ☁️ Giọng AI tự nhiên**, chọn *Google Cloud TTS*, dán API Key rồi bấm **Lưu & kiểm tra khóa**. Nếu dự án chưa có giọng Chirp 3 HD, app tự chuyển sang Neural2 → WaveNet → Standard; nếu lỗi liên tiếp 3 lần (sai khóa, hết hạn mức, mất mạng) app tạm dùng giọng thiết bị. Mỗi hãng (Google / OpenAI / ElevenLabs) có ô khóa riêng, nên khóa của hãng này không bao giờ bị gửi sang hãng khác. Khóa được gửi qua header `X-Goog-Api-Key`, không nằm trong URL.

Vì khóa nằm trong trình duyệt, hãy giới hạn nó trong Google Cloud Console:
- **API restrictions** → chỉ cho phép *Cloud Text-to-Speech API*.
- **Application restrictions** → *Websites* → chỉ tên miền đang chạy app.
- Đặt hạn mức (quota) hoặc cảnh báo ngân sách để tránh phát sinh chi phí.

## Chạy ứng dụng tại máy

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:4173`. Chạy kiểm thử bộ hiểu câu tự nhiên: `npm test`. Trên điện thoại (iOS/Android), có thể chọn **"Thêm vào màn hình chính" (Add to Home Screen)** để dùng như ứng dụng cài đặt sẵn.
