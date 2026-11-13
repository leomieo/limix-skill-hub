---
name: bang-motion
description: "Tạo đồ họa chuyển động (motion graphics) điện ảnh chạy trực tiếp trên trình duyệt bằng HTML5, CSS và GSAP (hỗ trợ Three.js khi cần). Chuyên tạo video quảng cáo (promo), đoạn mở đầu (opener/intro), bumper, kinetic typography và video giải thích (explainer) tỷ lệ 16:9 hoặc 9:16. Sản phẩm chuyển động tự nhiên như video thực thụ, không bị thô cứng như slide PowerPoint. Xuất ra tệp index.html độc lập xem ngay hoặc kết xuất video MP4."
license: MIT
---

# Bang Motion — Đồ họa Chuyển động Web Chuẩn Điện ảnh

Bộ quy tắc và giải pháp kỹ thuật giúp coding agent xây dựng các sản phẩm motion graphic chất lượng cao trên nền tảng web.

## Nguyên tắc Thiết kế (Không làm Slide PowerPoint)

1. **Nhịp thở và Tính Liên tục:**
   - Không đổi cảnh đột ngột bằng các hiệu ứng fade/slide ngắt quãng kiểu bài giảng.
   - Các yếu tố hình ảnh chuyển tiếp mượt mà qua chuyển động camera, di chuyển vật thể dẫn dắt ánh nhìn hoặc phóng to/thu nhỏ tiêu cự (scale zoom).

2. **Chuyển động có Quán tính (Kinetic & Inertia):**
   - Mọi chuyển động đều phải sử dụng đường cong gia tốc tự nhiên (`power2.out`, `expo.out`, `back.out` hoặc custom cubic-bezier). Tuyệt đối không dùng chuyển động tuyến tính (`linear`) cho chuyển động thị giác.

3. **5 Phong cách Explainer Chuyên nghiệp:**
   - **Báo chí thị giác (Visual Journalism):** Tông màu tối, hạt phim (film grain), ảnh tư liệu thực tế kèm chú thích nguồn và đường highlight nổi bật.
   - **Cắt dán hoạt họa (Cartoon Collage):** Nền giấy kraft/kem, các mảnh minh họa cắt dán (cutout) chuyển động sinh động.
   - **Bản vẽ cổ điển (Vintage Sketch):** Nền giấy sepia, nét khắc kim loại, font chữ cổ điển có chân và hiệu ứng mực loang.
   - **Danh mục tối giản (Clean Catalog):** Lưới đồ họa tinh gọn, ảnh cắt nền chuẩn xác, màu sắc tương phản cao.
   - **Dòng chảy liên tục (Continuous Flow):** Một đường dẫn hoặc đối tượng chuyển động xuyên suốt các phân cảnh không điểm dừng.

## Công cụ & Định dạng Kết xuất

- **Bản giao duy nhất (`index.html`):** Chạy độc lập trên mọi trình duyệt hiện đại qua CDN (GSAP, Google Fonts). Không đòi hỏi người xem phải chạy `npm install`.
- **Thanh điều khiển Debug (`?debug=1`):** Tích hợp thanh trượt scrub timeline để tua lại, dừng hình tại từng khung hình khóa và tinh chỉnh tọa độ.
- **Đồng bộ Thoại (Voiceover Sync):** Tự động phát hiện khoảng dừng âm thanh bằng Web Audio API để khớp phụ đề và hoạt họa chuẩn xác từng giây.
