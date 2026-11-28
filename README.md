# Limix Skill Hub

Kho Skills cho Limix Bot theo mô hình **English Core + Vietnamese Layer + Bilingual Discovery**.

Xem toàn bộ kho tại [skills/](skills/) hoặc [danh mục đầy đủ](registry/catalog.json).

## 10 skill/tool mới thêm

Sắp theo thứ tự thêm vào kho, mới nhất trước; sao và ngày tạo lấy từ GitHub tại thời điểm kiểm tra.

| Skill/tool | Nguồn | Sao | Ngày tạo | Mô tả ngắn |
|---|---|---:|---|---|
| [impeccable](skills/impeccable/SKILL.md) | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 118100 | 2025-11-16 | Bộ từ vựng thiết kế và kiểm toán UI/UX, responsive, accessibility và phát hiện AI slop; **cách ly** do cảnh báo quét tĩnh trong script trình duyệt. |
| [accessibility-engineering](skills/accessibility-engineering/SKILL.md) | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 121000 | 2026-02-15 | Kiểm toán WCAG 2.2 AA bằng axe-core/pa11y, kiểm thử bàn phím và screen reader; tự sửa lỗi theo nguyên nhân gốc. |
| [visual-explainer](skills/visual-explainer/SKILL.md) | [nicobailon/visual-explainer](https://github.com/nicobailon/visual-explainer) | 11297 | 2026-02-16 | Tạo trang HTML tự chứa để giải thích hệ thống, mã, kế hoạch hoặc dữ liệu bằng sơ đồ, hình và diễn giải trực quan. Cách ly để xem xét cảnh báo quét tĩnh. |
| [drawio-skill](skills/drawio-skill/SKILL.md) | [Agents365-ai/drawio-skill](https://github.com/Agents365-ai/drawio-skill) | 10964 | 2026-03-03 | Tạo, chỉnh sửa và kiểm định sơ đồ draw.io có thể tiếp tục sửa; hỗ trợ kiến trúc, UML, ERD, swimlane và chuyển đổi từ mã. Chờ duyệt tĩnh. |
| [planning-with-files](skills/planning-with-files/SKILL.md) | [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) | 28256 | 2026-01-03 | Duy trì kế hoạch, phát hiện và tiến độ nhiều bước trong các tệp của dự án; có hooks tùy chọn chưa kích hoạt. Chờ duyệt tĩnh. |
| [douyin-spider](skills/douyin-spider/SKILL.md) | [cv-cat/DouYin_Spider](https://github.com/cv-cat/DouYin_Spider) | 3742 | 2023-10-17 | Hướng dẫn do Hub biên soạn cho công cụ dữ liệu Douyin; ngoại lệ theo yêu cầu. Chưa xác minh giấy phép, không kèm mã nguồn. **Cách ly.** |
| [rust-anything](skills/rust-anything/SKILL.md) | [erkamyaman/rust-anything](https://github.com/erkamyaman/rust-anything) | 9893 | 2026-11-16 | Lập kế hoạch chuyển mã sang Rust, ghi lại hành vi chương trình gốc và đối chiếu từng phần trước khi chuyển sang bản mới. Chờ duyệt tĩnh. |
| [last30days](skills/last30days/SKILL.md) | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | 75502 | 2026-01-23 | Nghiên cứu chủ đề trong 30 ngày gần nhất, tổng hợp nhiều nguồn và lưu báo cáo có dẫn chứng; cần duyệt riêng quyền dữ liệu và công cụ. **Cách ly.** |
| [aso](skills/aso/SKILL.md) | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 62771 | 2026-01-15 | Đánh giá trang ứng dụng trên App Store hoặc Google Play từ nội dung, hình ảnh và đánh giá thực tế; ưu tiên dữ liệu chỉ đọc của ứng dụng sở hữu. Chờ duyệt tĩnh. |
| [prospecting](skills/prospecting/SKILL.md) | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 62771 | 2026-01-15 | Tìm và xác minh khách hàng tiềm năng theo hồ sơ phù hợp, tín hiệu mua và bằng chứng công khai, kể cả phát biểu trên podcast. **Cách ly.** |

## Sử dụng

Core và script giữ tiếng Anh; hướng dẫn Việt nằm riêng trong từng mục. Xem trạng thái và quyền trong manifest trước khi dùng; thêm vào kho không có nghĩa đã được duyệt hoặc chạy thử.

[Hướng dẫn bảo trì](docs/hybrid-maintenance.md) · [Kiểm chứng](migration-reports/hybrid-verification.json)

[Khai báo tool/framework/module](docs/skill-requirements.md): manifest và catalog có bằng chứng nguồn, tách dependency khai báo với gợi ý và file thiếu trong gói. Đây là kiểm tra tĩnh; chưa kiểm tra phần mềm trên máy đích.
