# Limix Skill Hub

Kho Skills cho Limix Bot theo mô hình **English Core + Vietnamese Layer + Bilingual Discovery**.

Xem toàn bộ kho tại [skills/](skills/) hoặc [danh mục đầy đủ](registry/catalog.json).

## 10 skill/tool mới thêm

Sắp theo thứ tự thêm vào kho, mới nhất trước; sao và ngày tạo lấy từ GitHub tại thời điểm kiểm tra.

| Skill/tool | Nguồn | Sao | Ngày tạo | Mô tả ngắn |
|---|---|---:|---|---|
| [douyin-spider](skills/douyin-spider/SKILL.md) | [cv-cat/DouYin_Spider](https://github.com/cv-cat/DouYin_Spider) | 3742 | 2023-10-17 | Hướng dẫn do Hub biên soạn cho công cụ dữ liệu Douyin; ngoại lệ theo yêu cầu. Chưa xác minh giấy phép, không kèm mã nguồn. **Cách ly.** |
| [rust-anything](skills/rust-anything/SKILL.md) | [erkamyaman/rust-anything](https://github.com/erkamyaman/rust-anything) | 9893 | 2026-11-16 | Lập kế hoạch chuyển mã sang Rust, ghi lại hành vi chương trình gốc và đối chiếu từng phần trước khi chuyển sang bản mới. Chờ duyệt tĩnh. |
| [last30days](skills/last30days/SKILL.md) | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | 75502 | 2026-01-23 | Nghiên cứu chủ đề trong 30 ngày gần nhất, tổng hợp nhiều nguồn và lưu báo cáo có dẫn chứng; cần duyệt riêng quyền dữ liệu và công cụ. **Cách ly.** |
| [aso](skills/aso/SKILL.md) | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 62771 | 2026-01-15 | Đánh giá trang ứng dụng trên App Store hoặc Google Play từ nội dung, hình ảnh và đánh giá thực tế; ưu tiên dữ liệu chỉ đọc của ứng dụng sở hữu. Chờ duyệt tĩnh. |
| [prospecting](skills/prospecting/SKILL.md) | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 62771 | 2026-01-15 | Tìm và xác minh khách hàng tiềm năng theo hồ sơ phù hợp, tín hiệu mua và bằng chứng công khai, kể cả phát biểu trên podcast. **Cách ly.** |
| [customer-research](skills/customer-research/SKILL.md) | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 62771 | 2026-01-15 | Phân tích phỏng vấn, khảo sát và phản hồi công khai để tìm nhu cầu, phản đối và ngôn ngữ khách hàng có dẫn chứng. Chờ duyệt tĩnh. |
| [leaving-pr-comments](skills/leaving-pr-comments/SKILL.md) | [t3dotgg/tstack](https://github.com/t3dotgg/tstack) | 4346 | 2026-10-24 | Soạn phản hồi pull request trên GitHub, ghi rõ ai viết và thay mặt ai, rồi đối chiếu nội dung với bằng chứng. Chờ duyệt tĩnh. |
| [ste80-humanizer](skills/ste80-humanizer/SKILL.md) | [Dodaios/ste80-humanizer](https://github.com/Dodaios/ste80-humanizer) | 1113 | 2026-11-09 | Biên tập tài liệu tiếng Anh bằng câu ngắn, câu chủ động và từ dễ hiểu, giữ nguyên dữ kiện. **Cách ly.** |
| [cinematic-film](skills/cinematic-film/SKILL.md) | [Moh4696/cinematic-skill](https://github.com/Moh4696/cinematic-skill) | 951 | 2026-11-09 | Lập bảng nhịp và dựng phim từ ảnh, tư liệu và bản đồ để chuyển động khớp với lời thuyết minh. **Cách ly.** |
| [cook](skills/cook/SKILL.md) | [Leonxlnx/cook](https://github.com/Leonxlnx/cook) | 817 | 2026-10-31 | Cải tiến bản dựng hình ảnh qua các vòng chụp, đối chiếu và sửa theo tiêu chí đã thống nhất. **Cách ly.** |

## Sử dụng

Core và script giữ tiếng Anh; hướng dẫn Việt nằm riêng trong từng mục. Xem trạng thái và quyền trong manifest trước khi dùng; thêm vào kho không có nghĩa đã được duyệt hoặc chạy thử.

[Hướng dẫn bảo trì](docs/hybrid-maintenance.md) · [Kiểm chứng](migration-reports/hybrid-verification.json)

[Khai báo tool/framework/module](docs/skill-requirements.md): manifest và catalog có bằng chứng nguồn, tách dependency khai báo với gợi ý và file thiếu trong gói. Đây là kiểm tra tĩnh; chưa kiểm tra phần mềm trên máy đích.
