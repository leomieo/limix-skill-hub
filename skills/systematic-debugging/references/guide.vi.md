# systematic-debugging — hướng dẫn tiếng Việt

Evidence-driven debugging workflow for isolating root causes before changing code.

## Cách dùng

- Đọc core tiếng Anh theo đúng phạm vi tác vụ; giữ nguyên tên API, lệnh và đường dẫn.
- Kiểm tra repository, phiên bản và thay đổi hiện có trước khi áp dụng.
- Chỉ chạy kiểm thử hoặc lệnh cài đặt khi người dùng đã yêu cầu và môi trường đã sẵn sàng.

## Giới hạn

Core được giữ nguyên byte từ commit nguồn đã ghim. Kiểm tra của Hub chỉ xác minh đóng gói, hash và metadata; chưa chứng minh tương thích runtime. Không tự chạy script nguồn hoặc cài dependency bên thứ ba.

Nguồn: https://github.com/obra/superpowers/tree/22f0b463e7a5e579904dd6211a520321035526f7
