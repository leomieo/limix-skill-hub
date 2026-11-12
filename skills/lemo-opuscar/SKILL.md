---
name: lemo-opuscar
description: "Chỉ đạo và sản xuất video ngắn hoàn toàn bằng mã nguồn (code) theo 99 phong cách nghệ thuật từ thư viện Lemo-Opuscar (sơn dầu đắp nổi Impasto, màu nước, tranh khắc gỗ Ukiyo-e, báo cáo vệ tinh, giải phẫu sản phẩm Teardown...). Dùng khi người dùng yêu cầu làm video, phim ngắn, hoạt họa, phim quảng cáo, video giải thích từ ảnh vệ tinh, dữ liệu CAD, quét laser hoặc tài liệu lưu trữ; hoặc khi cần tự tạo phong cách phim riêng biệt bằng Three.js, Canvas và WebGL mà không cần mô hình sinh video tốn kém."
---

# Lemo-Opuscar: Sản xuất phim ngắn hoàn toàn bằng mã nguồn

Lemo-Opuscar là thư viện phong cách phim bằng code (Three.js, WebGL, Canvas, Motion Graphics). Kỹ năng này hướng dẫn agent lựa chọn, thiết kế và render phim trực tiếp bằng code thay vì phụ thuộc vào mô hình AI video ngốn chi phí.

## Quy trình thực hiện

1. **Khởi tạo thư viện:**
   - Kiểm tra các công cụ môi trường cần thiết (`Node.js`, `ffmpeg`, `Python`).
   - Sử dụng kho lưu trữ mã nguồn phong cách có sẵn (`styles/`) hoặc khởi tạo phong cách mới trong thư mục dự án.

2. **Chọn và tinh chỉnh phong cách (Style Treatment):**
   - Lựa chọn 1 trong 99 phong cách có sẵn phù hợp với chủ đề (khoa học, nghệ thuật cổ điển, điện ảnh tài liệu, giải thích dữ liệu...).
   - Xác lập kịch bản phân cảnh (`TREATMENT.md`), xác định các tham số thị giác (bảng màu, nhịp camera, hiệu ứng ánh sáng, phông chữ).

3. **Lập trình khung cảnh và diễn hoạt (Motion & Scene Code):**
   - Viết mã nguồn render khung hình bằng Three.js, Canvas hoặc shader WebGL.
   - Định nghĩa timeline chuyển động mượt mà bằng mã nguồn toán học hoặc GSAP.
   - Nhúng dữ liệu thật nếu có (bản đồ, mô hình 3D, dữ liệu ảnh vệ tinh).

4. **Kết xuất và xuất bản:**
   - Dùng script render trích xuất chuỗi frame chất lượng cao.
   - Ghép âm thanh, giọng thuyết minh (TTS) và nhạc nền với `ffmpeg`.
   - Xuất file video hoàn chỉnh và báo cáo thông số kỹ thuật cho người dùng.

## Lưu ý an toàn
- Không can thiệp hoặc thay đổi các tệp video đã có sẵn của người dùng ngoài phạm vi yêu cầu.
- Các gói phụ thuộc mới phải cài đặt cục bộ trong thư mục dự án (`npm install` hoặc tương đương).
