# find-reverse-engineered — hướng dẫn tiếng Việt

Tìm dự án mã nguồn mở reverse engineering phù hợp cho ứng dụng, giao thức hoặc định dạng thiếu API chính thức; đối chiếu license và hoạt động.

Gọi bằng tên gốc hoặc mô tả mục tiêu bằng tiếng Việt. Cung cấp đầu vào, phạm vi file/dự án và kết quả cần nhận. Agent chỉ đọc core khi chọn skill, rồi đọc reference cần thiết. Đây là hướng dẫn ngắn, không thay core.

Core có ví dụ curl tải script từ nhánh main rồi pipe vào python3. Đây là đường tải mã chưa pin; không chạy. Chỉ giữ byte để duyệt thủ công.

Script có mạng, cache và khả năng clone repo; không có hành động nào trong số đó được thực thi trong đợt tuyển chọn.

## Điều kiện

- Python 3 standard library; SKILL.md tool description and scripts/re_index.py imports
- Network access to external index and GitHub; scripts/re_index.py
- Filesystem cache ~/.cache/awesome-reverse-engineered; SKILL.md tool description

Trạng thái: **quarantined**; chỉ đối chiếu nguồn và quét tĩnh. Chưa chạy script, model, provider, build macOS hoặc API. Metadata và allowed-tools trong core không cấp quyền. Cần duyệt riêng trước khi chạy hoặc cài dependency.

Nguồn: https://github.com/alexgaoth/awesome-reverse-engineered/tree/80f551625282c47c2984bde35280c32d0aa4be58/plugin/skills/find-reverse-engineered
