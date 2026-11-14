# Limix Skill Hub

Kho Skills cho Limix Bot theo mô hình **English Core + Vietnamese Layer + Bilingual Discovery**.

Xem toàn bộ kho tại [skills/](skills/) hoặc [danh mục đầy đủ](registry/catalog.json).

## 10 skill/tool mới thêm

Sắp theo thứ tự thêm vào kho, mới nhất trước; cột “Ngày tạo” là ngày tạo repo nguồn. Sao dùng badge GitHub tự cập nhật.

| Skill/tool | Nguồn | Sao | Ngày tạo | Mô tả ngắn |
|---|---|---:|---|---|
| [improve-architecture](skills/improve-architecture/SKILL.md) | [daveebbelaar/bama](https://github.com/daveebbelaar/bama) | ![Sao](https://img.shields.io/github/stars/daveebbelaar/bama?style=social) | 2026-10-24 | Rà soát điểm khó bảo trì trong ứng dụng Swift/macOS; đề xuất module và refactor từng bước có bằng chứng giữ nguyên hành vi. Trạng thái: review-required. |
| [build-and-verify](skills/build-and-verify/SKILL.md) | [daveebbelaar/bama](https://github.com/daveebbelaar/bama) | ![Sao](https://img.shields.io/github/stars/daveebbelaar/bama?style=social) | 2026-10-24 | Build ứng dụng SwiftUI trên macOS và kiểm tra ảnh cửa sổ sáng/tối, bố cục cùng tương tác trước khi bàn giao. Trạng thái: review-required. |
| [ux-design](skills/ux-design/SKILL.md) | [daveebbelaar/bama](https://github.com/daveebbelaar/bama) | ![Sao](https://img.shields.io/github/stars/daveebbelaar/bama?style=social) | 2026-10-24 | Rà soát UX một tính năng macOS: tên gọi, luồng thao tác, cách mở giao diện, trạng thái, câu chữ và khả năng tiếp cận. Trạng thái: review-required. |
| [find-reverse-engineered](skills/find-reverse-engineered/SKILL.md) | [alexgaoth/awesome-reverse-engineered](https://github.com/alexgaoth/awesome-reverse-engineered) | ![Sao](https://img.shields.io/github/stars/alexgaoth/awesome-reverse-engineered?style=social) | 2026-10-11 | Tìm dự án mã nguồn mở reverse engineering phù hợp cho ứng dụng, giao thức hoặc định dạng thiếu API chính thức; đối chiếu license và hoạt động. Trạng thái: quarantined. |
| [new-term-radar](skills/new-term-radar/SKILL.md) | [zhuyansen/new-term-radar](https://github.com/zhuyansen/new-term-radar) | ![Sao](https://img.shields.io/github/stars/zhuyansen/new-term-radar?style=social) | 2026-10-12 | Thu thập tên mô hình và sản phẩm AI mới rồi ưu tiên từ khóa theo dữ liệu nguồn; cần Python, gói CLI và khóa API có phí. Trạng thái: quarantined. |
| [archify](skills/archify/SKILL.md) | [tt-a1i/archify](https://github.com/tt-a1i/archify) | ![Sao](https://img.shields.io/github/stars/tt-a1i/archify?style=social) | 2026-04-15 | Sơ đồ HTML tương tác; cách ly vì gói chưa đủ runtime. |
| [ffmpeg-cli](skills/ffmpeg-cli/SKILL.md) | [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) | ![Sao](https://img.shields.io/github/stars/FFmpeg/FFmpeg?style=social) | 2011-04-14 | Xử lý audio/video; adapter của kho, chờ duyệt. |
| [threejs-development](skills/threejs-development/SKILL.md) | [mrdoob/three.js](https://github.com/mrdoob/three.js) | ![Sao](https://img.shields.io/github/stars/mrdoob/three.js?style=social) | 2010-03-23 | Lập trình 3D trình duyệt; adapter của kho, chờ duyệt. |
| [remotion-integration](skills/remotion-integration/SKILL.md) | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | ![Sao](https://img.shields.io/github/stars/remotion-dev/remotion?style=social) | 2020-06-23 | Mục tham chiếu; chờ xem xét quyền phân phối skill. |
| [hyperframes](skills/hyperframes/SKILL.md) | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | ![Sao](https://img.shields.io/github/stars/heygen-com/hyperframes?style=social) | 2026-03-10 | Core chính thức; cách ly để duyệt telemetry và phụ thuộc. |

## Sử dụng

Core và script giữ tiếng Anh; hướng dẫn Việt nằm riêng trong từng mục. Xem trạng thái và quyền trong manifest trước khi dùng; thêm vào kho không có nghĩa đã được duyệt hoặc chạy thử.

[Hướng dẫn bảo trì](docs/hybrid-maintenance.md) · [Kiểm chứng](migration-reports/hybrid-verification.json)

[Khai báo tool/framework/module](docs/skill-requirements.md): manifest và catalog có bằng chứng nguồn, tách dependency khai báo với gợi ý và file thiếu trong gói. Đây là kiểm tra tĩnh; chưa kiểm tra phần mềm trên máy đích.
