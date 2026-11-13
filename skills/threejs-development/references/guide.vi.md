# threejs-development — hướng dẫn tiếng Việt

Hướng dẫn tích hợp Three.js cho đồ họa 3D trên trình duyệt: scene, camera, mesh, WebGL/WebGPU và vòng lặp animation. Do Limix Skill Hub biên soạn dựa trên README và metadata nguồn; không phải skill chính thức của mrdoob.

## Cách dùng và giới hạn

Đây là hướng dẫn tích hợp do Limix Skill Hub biên soạn. Repo chính thức không có `SKILL.md` tại commit đã kiểm tra. `references/upstream/README.md`, `LICENSE` và `package.json` là bản nguồn được giữ nguyên byte; không bao gồm toàn bộ thư viện.

Cung cấp dự án, cảnh 3D mong muốn, nền tảng trình duyệt và yêu cầu tương tác. Agent phải kiểm tra phiên bản Three.js đã cài trước khi chọn API; tài liệu về renderer hoặc addon cần khớp phiên bản. Không tự đổi WebGL sang WebGPU, nâng dependency hoặc lấy asset bên ngoài. Chưa có kiểm chứng render trong trình duyệt.

## Ví dụ yêu cầu

- Tạo một cảnh Three.js có khối lập phương xoay.
- Sửa camera và kích thước canvas của dự án Three.js.

## Tải tài liệu theo nhu cầu

Tìm bằng tên/mô tả/aliases trong manifest. Khi kích hoạt mới đọc SKILL.md; reference chỉ đọc khi cần. Không nạp hai bản tài liệu đầy đủ trùng nội dung. Không dịch API, tên Tool, CLI, biến hay đường dẫn.

Trạng thái: **review-required**. Chưa tự bật skill/tool hoặc chạy script từ nguồn. Nguồn: https://github.com/mrdoob/three.js/tree/acf77e4c7ea413a0a9638baacef3d78e254b2cac.
