# Limix Skill Hub

Kho Skills cho Limix Bot theo mô hình **English Core + Vietnamese Layer + Bilingual Discovery**.

Xem toàn bộ kho tại [skills/](skills/) hoặc [danh mục đầy đủ](registry/catalog.json).

## 10 skill/tool mới thêm

Sắp theo thứ tự thêm vào kho, mới nhất trước; cột “Ngày tạo” là ngày tạo repo nguồn. Sao dùng badge GitHub tự cập nhật.

| Skill/tool | Nguồn | Sao | Ngày tạo | Mô tả ngắn |
|---|---|---:|---|---|
| [yomiyasu](skills/yomiyasu/SKILL.md) | [nanaism/yomiyasu](https://github.com/nanaism/yomiyasu) | ![Sao](https://img.shields.io/github/stars/nanaism/yomiyasu?style=social) | 2026-09-30 | Cách ly, chưa thử thực thi; xem hướng dẫn Việt và manifest. |
| [blender-core](skills/blender-core/SKILL.md) | [EL4CTEO/blender-skills](https://github.com/EL4CTEO/blender-skills) | ![Sao](https://img.shields.io/github/stars/EL4CTEO/blender-skills?style=social) | 2026-10-14 | Cách ly, chưa thử thực thi; xem hướng dẫn Việt và manifest. |
| [live-panel](skills/live-panel/SKILL.md) | [ythx-101/live-panel-skill](https://github.com/ythx-101/live-panel-skill) | ![Sao](https://img.shields.io/github/stars/ythx-101/live-panel-skill?style=social) | 2026-10-03 | Gói thiếu file; Cách ly, chưa thử thực thi; xem hướng dẫn Việt và manifest. |
| [house-plan-designer](skills/house-plan-designer/SKILL.md) | [ZWD11/house-plan-designer](https://github.com/ZWD11/house-plan-designer) | ![Sao](https://img.shields.io/github/stars/ZWD11/house-plan-designer?style=social) | 2026-10-06 | Gói thiếu file; Cách ly, chưa thử thực thi; xem hướng dẫn Việt và manifest. |
| [ste](skills/ste/SKILL.md) | [dualface/ste-zh](https://github.com/dualface/ste-zh) | ![Sao](https://img.shields.io/github/stars/dualface/ste-zh?style=social) | 2026-10-05 | Cách ly, chưa thử thực thi; xem hướng dẫn Việt và manifest. |
| [find-skills](skills/find-skills/SKILL.md) | [vercel-labs/skills](https://github.com/vercel-labs/skills) | ![Sao](https://img.shields.io/github/stars/vercel-labs/skills?style=social) | 2026-01-14 | Tìm và cài skill Agent từ skills.sh/GitHub; core MIT, cần kiểm tra môi trường trước khi dùng. |
| [humanizer](skills/humanizer/SKILL.md) | [blader/humanizer](https://github.com/blader/humanizer) | ![Sao](https://img.shields.io/github/stars/blader/humanizer?style=social) | 2026-01-18 | Biên tập văn phong AI, giữ ý và dữ kiện; core MIT, không cần runtime riêng, chờ duyệt. |
| [craft-anything](skills/craft-anything/SKILL.md) | [storytold/craft-anything](https://github.com/storytold/craft-anything) | ![Sao](https://img.shields.io/github/stars/storytold/craft-anything?style=social) | 2026-10-31 | Điều tra phần mềm bằng MCP, core gốc và hướng dẫn Việt; cần CLI riêng, cách ly chờ duyệt. |
| [directing-stickman-videos](skills/directing-stickman-videos/SKILL.md) | [kaomei/stickman-video-director](https://github.com/kaomei/stickman-video-director) | ![Sao](https://img.shields.io/github/stars/kaomei/stickman-video-director?style=social) | 2026-08-03 | Storyboard và video người que; core gốc, hướng dẫn Việt, requirements có bằng chứng. Cách ly vì gói chưa đủ. |
| [improve-architecture](skills/improve-architecture/SKILL.md) | [daveebbelaar/bama](https://github.com/daveebbelaar/bama) | ![Sao](https://img.shields.io/github/stars/daveebbelaar/bama?style=social) | 2026-10-24 | Rà soát điểm khó bảo trì trong ứng dụng Swift/macOS; đề xuất module và refactor từng bước có bằng chứng giữ nguyên hành vi. Trạng thái: review-required. |

## Sử dụng

Core và script giữ tiếng Anh; hướng dẫn Việt nằm riêng trong từng mục. Xem trạng thái và quyền trong manifest trước khi dùng; thêm vào kho không có nghĩa đã được duyệt hoặc chạy thử.

[Hướng dẫn bảo trì](docs/hybrid-maintenance.md) · [Kiểm chứng](migration-reports/hybrid-verification.json)

[Khai báo tool/framework/module](docs/skill-requirements.md): manifest và catalog có bằng chứng nguồn, tách dependency khai báo với gợi ý và file thiếu trong gói. Đây là kiểm tra tĩnh; chưa kiểm tra phần mềm trên máy đích.
