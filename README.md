# Limix Skill Hub

Kho Skills cho Limix Bot theo mô hình **English Core + Vietnamese Layer + Bilingual Discovery**.

Xem toàn bộ kho tại [skills/](skills/) hoặc [danh mục đầy đủ](registry/catalog.json).

## 10 skill/tool mới thêm

Sắp theo thứ tự thêm vào kho, mới nhất trước; sao và ngày tạo lấy từ GitHub tại thời điểm kiểm tra.

| Skill/tool | Nguồn | Sao | Ngày tạo | Mô tả ngắn |
|---|---|---:|---|---|
| [better-design](skills/better-design/SKILL.md) | [Moddingflow/better-design](https://github.com/Moddingflow/better-design) | 52 | 2026-09-26 | Hướng dẫn agent thiết kế giao diện có định hướng nghệ thuật, hệ token, chuyển động, khả năng truy cập và kiểm chứng bằng giao diện thật. Chờ duyệt tĩnh. |
| [convert-site](skills/convert-site/SKILL.md) | [ethanplusai/astro-conversion-kit](https://github.com/ethanplusai/astro-conversion-kit) | 135 | 2026-10-22 | Điều phối quy trình chuyển website đang chạy sang Astro tĩnh, giữ URL và nội dung, đối chiếu sai khác. Cách ly vì core có lệnh cài gói và tạo PR; thiếu 3 tệp cấu hình ẩn. |
| [e2e-red-triage](skills/e2e-red-triage/SKILL.md) | [sno-ai/sno-station-skills](https://github.com/sno-ai/sno-station-skills) | 865 | 2026-10-01 | Phân loại lỗi kiểm thử đầu cuối, phân biệt lỗi sản phẩm với lỗi môi trường; chỉ gọi thủ công. Chờ duyệt tĩnh. |
| [huashu-motion](skills/huashu-motion/SKILL.md) | [alchaincyf/huashu-motion](https://github.com/alchaincyf/huashu-motion) | 2866 | 2026-10-18 | Tạo video giới thiệu sản phẩm và đồ họa chuyển động bằng HTML/GSAP, hỗ trợ góp ý theo khung hình. Cách ly vì wrapper có thể chạy gói npm chưa ghim phiên bản. |
| [papermorph](skills/papermorph/SKILL.md) | [DozenTwelve/Papermorph](https://github.com/DozenTwelve/Papermorph) | 1774 | 2026-10-03 | Tạo sách web và bài học hoạt hình có lời dẫn, sách tranh tương tác, phim tài liệu và bản đồ khám phá. Cách ly vì quét phát hiện ký tự Unicode vô hình trong tài liệu toán. |
| [yomiyasu](skills/yomiyasu/SKILL.md) | [nanaism/yomiyasu](https://github.com/nanaism/yomiyasu) | 3351 | 2026-09-30 | Biên tập tiếng Nhật do AI tạo, giữ nguyên ý nghĩa, điều kiện và sắc thái. |
| [blender-core](skills/blender-core/SKILL.md) | [EL4CTEO/blender-skills](https://github.com/EL4CTEO/blender-skills) | 1975 | 2026-10-14 | Nền tảng điều khiển Blender bằng bpy, MCP hoặc CLI, kiểm tra môi trường và ngữ cảnh. |
| [live-panel](skills/live-panel/SKILL.md) | [ythx-101/live-panel-skill](https://github.com/ythx-101/live-panel-skill) | 864 | 2026-10-03 | Tạo sơ đồ kiến trúc chuyển động kiểu bảng giám sát và xuất video MP4. |
| [house-plan-designer](skills/house-plan-designer/SKILL.md) | [ZWD11/house-plan-designer](https://github.com/ZWD11/house-plan-designer) | 729 | 2026-10-06 | Dựng thiết kế nhà 2D/3D từ bản vẽ, kiểm tra kích thước, cửa và nội thất. |
| [ste](skills/ste/SKILL.md) | [dualface/ste-zh](https://github.com/dualface/ste-zh) | 901 | 2026-10-05 | Viết báo cáo kỹ thuật tiếng Trung ngắn gọn theo nguyên tắc ASD-STE100 khi được gọi rõ ràng. |

## Sử dụng

Core và script giữ tiếng Anh; hướng dẫn Việt nằm riêng trong từng mục. Xem trạng thái và quyền trong manifest trước khi dùng; thêm vào kho không có nghĩa đã được duyệt hoặc chạy thử.

[Hướng dẫn bảo trì](docs/hybrid-maintenance.md) · [Kiểm chứng](migration-reports/hybrid-verification.json)

[Khai báo tool/framework/module](docs/skill-requirements.md): manifest và catalog có bằng chứng nguồn, tách dependency khai báo với gợi ý và file thiếu trong gói. Đây là kiểm tra tĩnh; chưa kiểm tra phần mềm trên máy đích.
