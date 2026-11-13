---
name: stickman-video-director
description: "Biến chủ đề, bài viết, kịch bản hoặc yêu cầu thành video hoạt hình người que (stickman) nhiều phong cách cho YouTube/TikTok/Reels. Hỗ trợ 2 chế độ: Đạo diễn (Director Mode) lập storyboard 5 giai đoạn và prompt chi tiết cho Gemini Omni Flash/video AI; và Tự hành (Autopilot Mode) tích hợp TTS, phụ đề và render trực tiếp qua CLI với 11 phong cách thị giác (Classic B&W, Modern Beanie, Prehistoric Cave, Cozy Storytelling, Historical Cartoon, Amber Noir, Minimal Line Art, Retro TV, Survival Thriller, Character Explainer)."
---

# Đạo Diễn Video Người Que (Stickman Video Director)

Biến bất kỳ kịch bản, bài viết hay ý tưởng nào thành video hoạt hình người que lôi cuốn, tối ưu hóa cho các kênh video dạng ngắn (TikTok, Shorts, Reels) hoặc video giải thích dài trên YouTube.

---

## Hai chế độ hoạt động trong một kỹ năng

Dựa trên yêu cầu của người dùng, phân định rõ luồng xử lý theo 2 nhánh độc lập:

1. **Nhánh A · Đạo diễn (Director Mode - A1 đến A6):**
   - Tạo đề xuất phân cảnh (storyboard proposal) và chuỗi $N$ prompt độc lập sinh video clip ~10 giây (cho Gemini Omni Flash, Runway, Luma, Kling...).
   - `A1`: Cổ điển tối giản (Classic Minimalist) - Nền sáng (nét đen) hoặc nền tối (nét trắng).
   - `A2`: Zeke mũ len hiện đại (Modern Beanie Zeke) - `A2A` (Studio công nghệ cao, lưới phối cảnh xám nhạt, UI cyan phát quang) và `A2B` (Bối cảnh điện ảnh nhiều màu).
   - `A3`: Thời tiền sử vẽ tay / Hài đen (Prehistoric Cave / Dark Comedy) - Đầu trắng đặc, tứ chi que đen, trang phục da thú.
   - `A4`: Chữa lành & Ấm áp (Cozy Storytelling) - Nhân vật tối giản đầu trắng trong bối cảnh hoạt hình 2D full-color.
   - `A5`: Hoạt hình lịch sử (Historical Cartoon) - Trang phục cổ trang cel-shaded.
   - `A6`: Amber Noir (Hổ phách & Bóng tối) - Nhân vật áo hoodie cam trong đô thị ánh vàng ấm và bóng đổ sâu.

2. **Nhánh B · Tự hành (Autopilot Mode - B1 đến B5):**
   - Sản xuất trực tiếp video MP4 hoàn chỉnh kèm giọng đọc thuyết minh (TTS), phụ đề động ngữ nghĩa và hiệu ứng âm thanh SFX đồng bộ qua công cụ render cục bộ.
   - `B1`: Nét vẽ tay tối giản (Minimal Line Art).
   - `B2`: Vẽ tay màu sắc (Colorful Hand-Drawn).
   - `B3`: Truyền hình cổ điển thập niên 90 (Retro TV) - Hiệu ứng quét CRT, hạt nhiễu analog.
   - `B4`: Phim ngắn giật gân / Sinh tồn (Survival Thriller) - Giọng đọc trầm ấm kịch tính (Brian / ElevenLabs), hook thính giác ngay từ khung hình đầu tiên, cổng kiểm soát nỗi sợ dẫn dắt bởi cốt truyện.
   - `B5`: Diễn giả giải thích (Character Explainer) - Nhân vật thuyết trình ở góc dưới bên phải, kết hợp hoạt hình que diễn xuất tình huống bên trái, phụ đề tối đa 3 dòng.

---

## Quy tắc thiết lập ban đầu (Setup Gate)

Trước khi lập kế hoạch kịch bản, bắt buộc phải xác định đủ 4 yếu tố:
1. **Nội dung nguồn:** Bài viết, chủ đề, kịch bản thô hoặc tài liệu đầu vào.
2. **Tỷ lệ khung hình:** Ngang `16:9` (YouTube) hoặc dọc `9:16` (TikTok / Shorts / Reels).
3. **Thời lượng mục tiêu:** Bội số của 10 giây (mặc định: `60s` tương ứng 6 clip nếu người dùng không chỉ định).
4. **Phong cách thị giác & Theme:** Chọn 1 trong các phong cách A1–A6 hoặc B1–B5.

Nếu thiếu tỷ lệ khung hình hoặc phong cách, hãy đặt câu hỏi ngắn gọn làm rõ một lần duy nhất. Không tự ý ngầm chọn phong cách mà không thông báo.

---

## Động cơ nhịp tim 5 giai đoạn (5-Stage High-Completion Heartbeat Engine)

Mọi kịch bản phải được cấu trúc theo công thức giữ chân người xem đạt tỷ lệ xem hết (retention rate) tối đa:

1. **Móc câu vàng (Golden Hook) [0–10% thời lượng]:**
   - Khơi dậy sự tò mò tức thì bằng câu hỏi phi trực giác hoặc nghịch lý thị giác gây sốc trong 2–5 giây đầu. Tuyệt đối không mở đầu bằng lời chào sáo rỗng.
2. **Bẻ gãy định kiến (Disrupting Assumptions) [10–30% thời lượng]:**
   - Nêu lên quan niệm phổ biến mà mọi người đều tin là đúng, sau đó dùng 1 câu ngắn gọn đập tan định kiến đó để tạo xung đột nhận thức.
3. **Bóc trần bí mật nội bộ (Unveiling Insider Secrets) [30–65% thời lượng]:**
   - Lật mở cơ chế vận hành ngầm, quy luật ẩn giấu hoặc nguyên nhân cốt lõi của vấn đề.
4. **Khải thị chân lý tối hậu (Ultimate Truth Revelation) [65–85% thời lượng]:**
   - Đúc kết bài học đắt giá dưới góc nhìn tâm lý học, bản chất hành vi hoặc quy luật kinh doanh với độ thỏa mãn nhận thức cao nhất.
5. **Nâng tầm & Kích thích thảo luận (Elevation & Interactive Discussion) [85–100% thời lượng]:**
   - Kết thúc bằng một câu đúc kết đáng nhớ kèm câu hỏi mở kích thích người xem để lại bình luận tranh luận sôi nổi.

---

## Quy chuẩn biên soạn kịch bản & Prompt AI

### 1. Phân bổ lời thoại thuyết minh (VO Word Count)
- Tốc độ chuẩn: khoảng **20–25 từ tiếng Anh** (hoặc 35–45 từ tiếng Việt) cho mỗi clip 10 giây.
- Video 30s: ~60–75 từ (3 clip); Video 60s: ~120–150 từ (6 clip); Video 3 phút: ~360–450 từ (18 clip).

### 2. Nhịp độ hành động thị giác
- Mỗi clip 10 giây phải có **3 nhịp chuyển động định thời**: `[0–3s]`, `[3–7s]`, và `[7–10s]`.
- Tuyệt đối không để nhân vật đứng yên bất động (idle). Hành động cụ thể: nhảy, chạm màn hình phát sáng, vẽ đường quang học, bước qua cánh cửa...
- Mỗi 2 đến 3 giây phải có một thay đổi thị giác rõ rệt.

### 3. Khóa cứng tính nhất quán của nhân vật (Character Anchor Freeze)
- **Style 1 (Minimalist):** Khóa cố định đoạn mô tả nhân vật và lặp lại nguyên văn trong mọi prompt clip:
  - Giữ đúng 2 tay, 2 chân, độ dày nét vẽ đồng nhất, nhân vật đơn sắc trắng hoặc đen.
  - Điểm nhấn màu sắc (accent colors) giới hạn tối đa 3 màu bão hòa nổi bật (đỏ tươi, xanh lam điện, vàng ấm).
- **Style 2 (Beanie Zeke):**
  - Luôn mô tả nhất quán: nhân vật que 2D đội mũ len đỏ tươi (không có cục bông), áo thun vàng, quần short đen.
  - `Style 2A`: Không gian studio trắng tinh khiết, lưới phối cảnh sàn xám nhạt, giao diện holographic kính phát quang cyan/blue. Ràng buộc âm (Negative constraint): `STRICTLY MINIMALIST, NO CIRCUIT BOARD TEXTURES, NO SCI-FI WALL PANELS, NO CRACKED CONCRETE`.

### 4. Tính nhất quán của giọng đọc (Voice Continuity)
- Chọn hồ sơ giọng đọc hoàn chỉnh ở Giai đoạn A, sau đó lặp lại nguyên văn khối mô tả giọng đọc trong từng prompt: khóa cao độ (timbre), âm sắc (register), ngữ điệu (accent), tốc độ (pace) và xử lý phòng thu.
- Thuyết minh chỉ là âm thanh lồng tiếng (`Audio voiceover only, strictly no speech bubbles, no dialogue boxes`).

### 5. Khử sạch rác thị giác (Zero Visual Slop)
- Mặc định clip sinh ra không chứa văn bản, chữ cái, con số hoặc nhãn UI ngẫu nhiên trên khung hình để tránh lỗi biến dạng chữ của AI. Mọi chữ hiển thị cần thiết sẽ được bổ sung ở khâu hậu kỳ hoặc phụ đề.
- Chuyển cảnh mượt mà: điểm kết thúc của clip trước phải nối khớp với điểm bắt đầu của clip sau thông qua hành động, hướng chuyển động của nhân vật hoặc đạo cụ tương tác.

---

## Quy trình triển khai 2 pha (Two-Phase Execution)

1. **Pha A (Đề xuất đạo diễn):** Soạn thảo kịch bản tổng thể, cấu trúc 5 giai đoạn, lời thoại thuyết minh theo từng clip 10 giây và định hướng hình ảnh. Chờ người dùng xác nhận phê duyệt.
2. **Pha B (Tạo Prompt độc lập):** Chỉ sau khi người dùng đồng ý Pha A, tiến hành xuất đầy đủ chuỗi prompt độc lập chi tiết từng giây cho công cụ sinh video.
