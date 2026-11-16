# code-review — hướng dẫn tiếng Việt

Systematic code review workflow focused on correctness, regressions and actionable findings.

## Cách dùng

- Đọc core tiếng Anh theo đúng phạm vi tác vụ; giữ nguyên tên API, lệnh và đường dẫn.
- Kiểm tra repository, phiên bản và thay đổi hiện có trước khi áp dụng.
- Chỉ chạy kiểm thử hoặc lệnh cài đặt khi người dùng đã yêu cầu và môi trường đã sẵn sàng.

## Giới hạn

Core được giữ nguyên byte từ commit nguồn đã ghim. Kiểm tra của Hub chỉ xác minh đóng gói, hash và metadata; chưa chứng minh tương thích runtime. Không tự chạy script nguồn hoặc cài dependency bên thứ ba.

Nguồn: https://github.com/mattpocock/skills/tree/5863806dd4e15c63174bee4e7515a4256792ecfa
