# Limix Skill Hub

Kho Skills cho Limix Bot theo mô hình **English Core + Vietnamese Layer + Bilingual Discovery**.

Xem toàn bộ kho tại [skills/](skills/) hoặc [danh mục đầy đủ](registry/catalog.json).

## 10 skill/tool mới thêm

Sắp theo thứ tự thêm vào kho, mới nhất trước; sao và ngày tạo lấy từ GitHub tại thời điểm kiểm tra.

| Skill/tool | Nguồn | Sao | Ngày tạo | Mô tả ngắn |
|---|---|---:|---|---|
| [leaving-pr-comments](skills/leaving-pr-comments/SKILL.md) | [t3dotgg/tstack](https://github.com/t3dotgg/tstack) | 4346 | 2026-10-24 | Soạn phản hồi pull request trên GitHub, ghi rõ ai viết và thay mặt ai, rồi đối chiếu nội dung với bằng chứng. Chờ duyệt tĩnh. |
| [ste80-humanizer](skills/ste80-humanizer/SKILL.md) | [Dodaios/ste80-humanizer](https://github.com/Dodaios/ste80-humanizer) | 1113 | 2026-11-09 | Biên tập tài liệu tiếng Anh bằng câu ngắn, câu chủ động và từ dễ hiểu, giữ nguyên dữ kiện. **Cách ly.** |
| [cinematic-film](skills/cinematic-film/SKILL.md) | [Moh4696/cinematic-skill](https://github.com/Moh4696/cinematic-skill) | 951 | 2026-11-09 | Lập bảng nhịp và dựng phim từ ảnh, tư liệu và bản đồ để chuyển động khớp với lời thuyết minh. **Cách ly.** |
| [cook](skills/cook/SKILL.md) | [Leonxlnx/cook](https://github.com/Leonxlnx/cook) | 817 | 2026-10-31 | Cải tiến bản dựng hình ảnh qua các vòng chụp, đối chiếu và sửa theo tiêu chí đã thống nhất. **Cách ly.** |
| [brand-voice](skills/brand-voice/SKILL.md) | [boringmarketer/boring-marketing-skills](https://github.com/boringmarketer/boring-marketing-skills) | 823 | 2026-11-16 | Xây dựng hồ sơ giọng thương hiệu từ ví dụ có dẫn chứng và kiểm tra nội dung mới có lệch giọng hay không. **Cách ly.** |
| [document-app](skills/document-app/SKILL.md) | [phuryn/product-engineering](https://github.com/phuryn/product-engineering) | 773 | 2026-10-29 | Đối chiếu mã nguồn và hành vi sản phẩm để viết tài liệu ứng dụng cho người đọc phù hợp. **Cách ly.** |
| [positioning-angles](skills/positioning-angles/SKILL.md) | [boringmarketer/boring-marketing-skills](https://github.com/boringmarketer/boring-marketing-skills) | 806 | 2026-11-16 | Xây dựng và so sánh các góc định vị sản phẩm theo khách hàng, lựa chọn thay thế và bằng chứng khác biệt. **Cách ly.** |
| [antialgorithm](skills/antialgorithm/SKILL.md) | [mankidev/antialgorithm](https://github.com/mankidev/antialgorithm) | 762 | 2026-11-14 | Tạo nhiều hướng sáng tạo và sàng lọc phương án dễ đoán khi đặt tên, thiết kế và lên ý tưởng. **Cách ly.** |
| [jury](skills/jury/SKILL.md) | [juliobsz/skills](https://github.com/juliobsz/skills) | 1403 | 2026-10-12 | Đánh giá trang web theo thang điểm về bố cục, kiểu chữ, chuyển động và chất lượng hiển thị dựa trên ảnh chụp. **Cách ly.** |
| [inference-optimisation](skills/inference-optimisation/SKILL.md) | [sybil-solutions/inference-optimisation-skill](https://github.com/sybil-solutions/inference-optimisation-skill) | 2077 | 2026-11-16 | Lập kế hoạch đo tốc độ suy luận mô hình cục bộ bằng đường cơ sở, phép đo lặp lại và thử từng thay đổi. **Cách ly.** |

## Sử dụng

Core và script giữ tiếng Anh; hướng dẫn Việt nằm riêng trong từng mục. Xem trạng thái và quyền trong manifest trước khi dùng; thêm vào kho không có nghĩa đã được duyệt hoặc chạy thử.

[Hướng dẫn bảo trì](docs/hybrid-maintenance.md) · [Kiểm chứng](migration-reports/hybrid-verification.json)

[Khai báo tool/framework/module](docs/skill-requirements.md): manifest và catalog có bằng chứng nguồn, tách dependency khai báo với gợi ý và file thiếu trong gói. Đây là kiểm tra tĩnh; chưa kiểm tra phần mềm trên máy đích.
