# Khai báo tool và module cho ứng dụng quét kho

## Trường đang tương thích với Limix Bot

- `manifest.json.requiredCapabilities`: yêu cầu tool/framework/runtime cần có. Limix Bot hiện đọc và hiển thị trường này trong chi tiết Hybrid Skill; đây là khai báo, không phải kết quả kiểm tra máy.
- `manifest.json.compatibility.status` và `notes`: tình trạng và lý do chưa tương thích. Thiếu module trong gói không thể được giải quyết chỉ bằng cài Node.js hoặc npm.
- `registry/catalog.json.dependencies`: ID của các tool installer đã biết từ bộ phân loại hiện có; không đưa tên module tùy ý vào đây.
- `registry/catalog.json.compatibility.runtimes`: gợi ý runtime từ quét nội dung; gợi ý không phải dependency đã chứng minh.

## Dữ liệu có cấu trúc trong catalog

Mỗi mục có `requirements` phiên bản 1:

| Trường | Ý nghĩa |
|---|---|
| `capabilities` | Sao chép từ requiredCapabilities; yêu cầu khai báo |
| `runtimeHints` | Runtime/installerId từ bộ phân loại; cần kiểm tra thực tế |
| `missingPackageFiles` | Danh sách đầy đủ đường dẫn upstream bị loại khỏi gói, lấy từ inventory |
| `packageCompleteness` | incomplete / retained-source-files-verified / unverified; không có nghĩa runtime đã hoạt động |
| `environmentStatus` | not-tested; kho chưa quét máy đích |
| `autoInstall` | false; metadata không cho phép tự chạy lệnh cài đặt |

Đây là mở rộng catalog của Hub. Mã nguồn ứng dụng đã kiểm tra hiện chỉ hiển thị trường manifest nói trên; chưa xác nhận ứng dụng tiêu thụ trường `requirements` mới. Muốn hiển thị từng module thiếu hoặc cung cấp nút sửa gói/cài dependency, ứng dụng cần adapter riêng; thay đổi đó chưa được triển khai trong lần cập nhật kho này.

Archify khai báo Node.js >=18 từ package.json tại commit ghim. Package.json đó không khai báo dependencies/optionalDependencies, vì vậy không tự bịa danh sách gói npm cần cài. 120 đường dẫn bị loại là file/module của chính bản phân phối Archify: cần khôi phục gói đầy đủ đúng commit trước khi kích hoạt. Metadata không biến bản thiếu thành bản chạy được.

Không thêm trường mới vào manifest Hybrid strict hoặc thay core gốc. Giữ inventory, checksum và cổng duyệt. Không dùng một lệnh cài tải từ metadata bên thứ ba làm hành động tự động.
