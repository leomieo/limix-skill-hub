# Limix Skill Hub

Kho Skills cho Limix Bot theo mô hình **English Core + Vietnamese Layer + Bilingual Discovery**.

Xem toàn bộ kho tại [skills/](skills/) hoặc [danh mục đầy đủ](registry/catalog.json).

## 10 skill/tool mới thêm

Sắp theo thứ tự thêm vào kho, mới nhất trước; cột “Ngày tạo” là ngày tạo repo nguồn. Sao dùng badge GitHub tự cập nhật.

| Skill/tool | Nguồn | Sao | Ngày tạo | Mô tả ngắn |
|---|---|---:|---|---|
| [archify](skills/archify/SKILL.md) | [tt-a1i/archify](https://github.com/tt-a1i/archify) | ![Sao](https://img.shields.io/github/stars/tt-a1i/archify?style=social) | 2026-04-15 | Sơ đồ HTML tương tác; cách ly vì gói chưa đủ runtime. |
| [ffmpeg-cli](skills/ffmpeg-cli/SKILL.md) | [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) | ![Sao](https://img.shields.io/github/stars/FFmpeg/FFmpeg?style=social) | 2011-04-14 | Xử lý audio/video; adapter của kho, chờ duyệt. |
| [threejs-development](skills/threejs-development/SKILL.md) | [mrdoob/three.js](https://github.com/mrdoob/three.js) | ![Sao](https://img.shields.io/github/stars/mrdoob/three.js?style=social) | 2010-03-23 | Lập trình 3D trình duyệt; adapter của kho, chờ duyệt. |
| [remotion-integration](skills/remotion-integration/SKILL.md) | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | ![Sao](https://img.shields.io/github/stars/remotion-dev/remotion?style=social) | 2020-06-23 | Mục tham chiếu; chờ xem xét quyền phân phối skill. |
| [hyperframes](skills/hyperframes/SKILL.md) | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | ![Sao](https://img.shields.io/github/stars/heygen-com/hyperframes?style=social) | 2026-03-10 | Core chính thức; cách ly để duyệt telemetry và phụ thuộc. |
| [stickman-video-director](skills/stickman-video-director/SKILL.md) | [kaomei/stickman-video-director](https://github.com/kaomei/stickman-video-director) | ![Sao](https://img.shields.io/github/stars/kaomei/stickman-video-director?style=social) | 2026-08-03 | Đạo diễn video hoạt hình người que. |
| [claude-guardian](skills/claude-guardian/SKILL.md) | [DUNHKpcc/Claude-Guardian](https://github.com/DUNHKpcc/Claude-Guardian) | ![Sao](https://img.shields.io/github/stars/DUNHKpcc/Claude-Guardian?style=social) | 2026-10-15 | Bảo vệ môi trường hoạt động của agent. |
| [grandet-api-price-finder](skills/grandet-api-price-finder/SKILL.md) | [hanzohanzhe/Grandet](https://github.com/hanzohanzhe/Grandet) | ![Sao](https://img.shields.io/github/stars/hanzohanzhe/Grandet?style=social) | 2026-10-05 | Tìm và so sánh giá API mô hình AI. |
| [motionmaxxing](skills/motionmaxxing/SKILL.md) | [Tejashmakwana/motionmaxxing](https://github.com/Tejashmakwana/motionmaxxing) | ![Sao](https://img.shields.io/github/stars/Tejashmakwana/motionmaxxing?style=social) | 2026-10-06 | Thiết kế và thẩm định motion graphics. |
| [reanimate](skills/reanimate/SKILL.md) | [NiazMorshed2007/reanimate](https://github.com/NiazMorshed2007/reanimate) | ![Sao](https://img.shields.io/github/stars/NiazMorshed2007/reanimate?style=social) | 2026-10-29 | Phân tích và tái tạo chuyển động giao diện. |

## Sử dụng

Core và script giữ tiếng Anh; hướng dẫn Việt nằm riêng trong từng mục. Xem trạng thái và quyền trong manifest trước khi dùng; thêm vào kho không có nghĩa đã được duyệt hoặc chạy thử.

[Hướng dẫn bảo trì](docs/hybrid-maintenance.md) · [Kiểm chứng](migration-reports/hybrid-verification.json)

[Khai báo tool/framework/module](docs/skill-requirements.md): manifest và catalog có bằng chứng nguồn, tách dependency khai báo với gợi ý và file thiếu trong gói. Đây là kiểm tra tĩnh; chưa kiểm tra phần mềm trên máy đích.
