# planning-with-files — hướng dẫn tiếng Việt

Duy trì kế hoạch, phát hiện và tiến độ nhiều bước trong các tệp của dự án; hỗ trợ khôi phục trạng thái theo mã kế hoạch.

## Cách dùng

- Yêu cầu tác vụ và cung cấp đầu vào, đích đến cùng định dạng mong muốn.
- Ví dụ: “Dùng planning-with-files để chia công việc triển khai thành các giai đoạn và ghi lại tiến độ.”
- Làm theo quy trình, giới hạn và yêu cầu duyệt trong `SKILL.md` gốc. Chỉ đọc reference mà tác vụ cần.

## Lưu ý

Bash hoặc PowerShell được dùng cho các script tương ứng; một số tiện ích cần Python 3. orjson tùy chọn và có dự phòng bằng JSON chuẩn. Core khai báo lifecycle hooks chạy shell để đọc/ghi tệp cục bộ; chỉ thẩm định tĩnh, không kích hoạt hoặc chạy hooks.

Tệp hướng dẫn này chỉ hỗ trợ sử dụng; không thay đổi core tiếng Anh hoặc tự cấp quyền chạy script.
