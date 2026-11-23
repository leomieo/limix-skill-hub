# Limix Skill Hub

Kho Skills cho Limix Bot theo mô hình **English Core + Vietnamese Layer + Bilingual Discovery**.

Xem toàn bộ kho tại [skills/](skills/) hoặc [danh mục đầy đủ](registry/catalog.json).

## 10 skill/tool mới thêm

Sắp theo thứ tự thêm vào kho, mới nhất trước; sao và ngày tạo lấy từ GitHub tại thời điểm kiểm tra.

| Skill/tool | Nguồn | Sao | Ngày tạo | Mô tả ngắn |
|---|---|---:|---|---|
| [document-app](skills/document-app/SKILL.md) | [phuryn/product-engineering](https://github.com/phuryn/product-engineering) | 773 | 2026-10-29 | Đối chiếu mã nguồn và hành vi sản phẩm để viết tài liệu ứng dụng cho người đọc phù hợp. **Cách ly.** |
| [positioning-angles](skills/positioning-angles/SKILL.md) | [boringmarketer/boring-marketing-skills](https://github.com/boringmarketer/boring-marketing-skills) | 806 | 2026-11-16 | Xây dựng và so sánh các góc định vị sản phẩm theo khách hàng, lựa chọn thay thế và bằng chứng khác biệt. **Cách ly.** |
| [antialgorithm](skills/antialgorithm/SKILL.md) | [mankidev/antialgorithm](https://github.com/mankidev/antialgorithm) | 762 | 2026-11-14 | Tạo nhiều hướng sáng tạo và sàng lọc phương án dễ đoán khi đặt tên, thiết kế và lên ý tưởng. **Cách ly.** |
| [jury](skills/jury/SKILL.md) | [juliobsz/skills](https://github.com/juliobsz/skills) | 1403 | 2026-10-12 | Đánh giá trang web theo thang điểm về bố cục, kiểu chữ, chuyển động và chất lượng hiển thị dựa trên ảnh chụp. **Cách ly.** |
| [inference-optimisation](skills/inference-optimisation/SKILL.md) | [sybil-solutions/inference-optimisation-skill](https://github.com/sybil-solutions/inference-optimisation-skill) | 2077 | 2026-11-16 | Lập kế hoạch đo tốc độ suy luận mô hình cục bộ bằng đường cơ sở, phép đo lặp lại và thử từng thay đổi. **Cách ly.** |
| [better-design](skills/better-design/SKILL.md) | [Moddingflow/better-design](https://github.com/Moddingflow/better-design) | 52 | 2026-09-26 | Hướng dẫn agent thiết kế giao diện có định hướng nghệ thuật, hệ token, chuyển động, khả năng truy cập và kiểm chứng bằng giao diện thật. Chờ duyệt tĩnh. |
| [convert-site](skills/convert-site/SKILL.md) | [ethanplusai/astro-conversion-kit](https://github.com/ethanplusai/astro-conversion-kit) | 135 | 2026-10-22 | Điều phối quy trình chuyển website đang chạy sang Astro tĩnh, giữ URL và nội dung, đối chiếu sai khác. Cách ly vì core có lệnh cài gói và tạo PR; thiếu 3 tệp cấu hình ẩn. |
| [e2e-red-triage](skills/e2e-red-triage/SKILL.md) | [sno-ai/sno-station-skills](https://github.com/sno-ai/sno-station-skills) | 865 | 2026-10-01 | Phân loại lỗi kiểm thử đầu cuối, phân biệt lỗi sản phẩm với lỗi môi trường; chỉ gọi thủ công. Chờ duyệt tĩnh. |
| [huashu-motion](skills/huashu-motion/SKILL.md) | [alchaincyf/huashu-motion](https://github.com/alchaincyf/huashu-motion) | 2866 | 2026-10-18 | Tạo video giới thiệu sản phẩm và đồ họa chuyển động bằng HTML/GSAP, hỗ trợ góp ý theo khung hình. Cách ly vì wrapper có thể chạy gói npm chưa ghim phiên bản. |
| [papermorph](skills/papermorph/SKILL.md) | [DozenTwelve/Papermorph](https://github.com/DozenTwelve/Papermorph) | 1774 | 2026-10-03 | Tạo sách web và bài học hoạt hình có lời dẫn, sách tranh tương tác, phim tài liệu và bản đồ khám phá. Cách ly vì quét phát hiện ký tự Unicode vô hình trong tài liệu toán. |

## Sử dụng

Core và script giữ tiếng Anh; hướng dẫn Việt nằm riêng trong từng mục. Xem trạng thái và quyền trong manifest trước khi dùng; thêm vào kho không có nghĩa đã được duyệt hoặc chạy thử.

[Hướng dẫn bảo trì](docs/hybrid-maintenance.md) · [Kiểm chứng](migration-reports/hybrid-verification.json)

[Khai báo tool/framework/module](docs/skill-requirements.md): manifest và catalog có bằng chứng nguồn, tách dependency khai báo với gợi ý và file thiếu trong gói. Đây là kiểm tra tĩnh; chưa kiểm tra phần mềm trên máy đích.
