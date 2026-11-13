# Phân tích: reanimate (NiazMorshed2007/reanimate)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 8/30)
- **Repo gốc:** https://github.com/NiazMorshed2007/reanimate
- **Sao:** 1.591 | **Ngày tạo:** 29/10/2026 | **Push gần nhất:** 31/10/2026
- **Giấy phép:** MIT | **Tác giả:** Niaz Morshed

## Lý do chọn
- Giải quyết trực diện bài toán nan giải nhất của các kỹ sư Frontend và coding agent: tái lập hoạt họa (animation) và chuyển động tương tác từ website thực tế hoặc video tham chiếu.
- Các mô hình AI thông thường chỉ có thể ước lượng đại khái chuyển động bằng mắt, dẫn đến kết quả giật cục, sai lệch thời lượng và sai đường cong easing.
- `reanimate` đưa ra phương pháp luận chuẩn xác: trích xuất dữ liệu chuyển động từng khung hình (frame-by-frame), lập bảng đặc tả thông số (motion spec), sau đó tự động ghi hình bản code clone để đối chiếu sai số pixel và độ trễ chuyển động.
- Hỗ trợ toàn diện từ CSS/WAAPI, GSAP, Framer Motion đến Canvas, WebGL, WebGPU và Three.js.

## Làm gì
Quy trình 7 bước tái lập và kiểm định chuyển động:
1. `Scope`: Xác định phạm vi nhân bản (URL, phần tử widget, đoạn video 0:12 đến 0:15) và mức độ chuẩn xác:
   - `motion-faithful` (mặc định): Khớp chính xác thứ tự kích hoạt, độ trễ stagger, timing từng bước (±80ms), họ easing, hướng và khoảng cách chuyển động.
   - `pixel-faithful`: Khớp toàn bộ chuyển động kèm theo màu sắc, phông chữ, khoảng cách, bo góc (sai số pixel trung bình ≤ 2%).
   - `mixed`: Giữ nguyên chuyển động mẫu nhưng áp dụng nhận diện thương hiệu hoặc tính năng mới của người dùng.
2. `Capture`: Dùng công cụ ghi hình Playwright trích xuất `inspect.json` (thuộc tính CSS tính toán, keyframe, font) và `track.json` (tọa độ, kích thước, độ mờ opacity, ma trận transform trên từng khung hình). Đối với WebGL/Three.js, sử dụng Virtual Clock để cố định FPS và trích xuất shader source, uniform.
3. `Write Spec`: Lập bảng thông số chuyển động trong `.reanimate/<name>/spec.md` với các cột trigger, thời điểm bắt đầu, thời lượng duration, easing, transform.
4. `Build`: Lập trình mã nguồn tương thích với stack của dự án (React, Vue, Svelte, hoặc HTML thuần).
5. `Verify & Repeat`: Ghi hình bản clone, chạy script `compare.ts` và `easing.ts` để tạo ảnh so sánh filmstrip đối soát từng khung hình, lặp lại tinh chỉnh cho đến khi đạt chuẩn.
6. `Report`: Báo cáo bảng số liệu độ lệch timing, sai số pixel và ảnh filmstrip so sánh.

## Điểm mạnh
- Định lượng hóa chất lượng hoạt họa bằng số liệu thực nghiệm thay vì cảm tính "trông có vẻ giống".
- Cơ chế Virtual Clock giải quyết triệt để sự thiếu ổn định của phần cứng khi render Canvas/WebGL.
- Tự động phát hiện các thư viện animation phổ biến (GSAP, Framer Motion, Three.js) để tái sử dụng đúng ngữ cảnh.

## Điểm yếu / rủi ro
- Khi chạy bộ công cụ phân tích tự động đầy đủ cần cài đặt Bun, Playwright Chromium và ffmpeg (khoảng 250 MB).
- Các trang web yêu cầu đăng nhập hoặc video YouTube/Loom cần người dùng cung cấp file quay màn hình trực tiếp.

## Độ phù hợp với Limix Bot
Rất cao: Kỹ sư Frontend (Pixel) và lập trình viên (Dev) trong đội ngũ Limix Bot có thể dùng trực tiếp kỹ năng này để tạo ra các giao diện web mượt mà, chuyển động điện ảnh đạt đẳng cấp Awwwards cho các sản phẩm của người dùng.
