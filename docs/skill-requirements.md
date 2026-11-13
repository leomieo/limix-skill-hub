# Khai báo tool và module cho ứng dụng quét kho

## Trường đang tương thích với Limix Bot

- `manifest.json.requiredCapabilities`: tóm tắt tool/framework/runtime và capability để luồng nhập Hybrid có thể đọc. Luồng đồng bộ app đã kiểm tra trước đây có bước ghi đè trường này thành `[]`; khai báo trong kho không sửa được bước đó. Đây không phải kết quả kiểm tra máy.
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
| `detected` | Từng runtime/tool/framework/package/module/MCP/agent capability, trạng thái và bằng chứng `file`, `line` |
| `diagnostics` | Định dạng dependency không hỗ trợ hoặc cần xem thủ công; không bỏ qua như đã xác minh |
| `analysisStatus` | static-review-required; cần xem xét trước khi sử dụng |
| `coverage` | Số file văn bản đã xét, có ứng viên hoặc chưa phát hiện yêu cầu ngoài |

Đây là mở rộng catalog của Hub. Theo lần kiểm tra mã nguồn ứng dụng trước đó, luồng Hub đọc `dependencies` và `compatibility.runtimes`, chưa đọc `requirements`. Hai trường cũ vẫn được giữ, chỉ dùng installer ID đã biết (`node`, `ffmpeg`, `docker`, `jdk`, `ghidra`); Python không có installer ID. Muốn hiển thị từng module/capability với bằng chứng hoặc cung cấp nút sửa gói/cài dependency, ứng dụng cần adapter riêng. Lần cập nhật này chỉ sửa kho nội dung; chưa thử luồng quét trong app.

## Áp dụng cho toàn kho và những lần cập nhật sau

Chạy `npm run catalog`: xác minh hash nguồn của toàn bộ Hybrid skill trước khi ghi, cập nhật `requiredCapabilities` trong manifest cục bộ rồi dựng catalog. Workflow hằng ngày cũng dùng lệnh này. Không chạy script của skill, không cài phần mềm, không thay core, license hay inventory nguồn.

- `declared`: đọc tên/phiên bản và scope từ `package.json` (dependencies, devDependencies, optionalDependencies, peerDependencies, engines), dòng đơn giản của `requirements*.txt`, hoặc tên server trong cấu hình MCP. Dev/optional/peer không đồng nghĩa bắt buộc cho mọi tác vụ.
- `import-hint`: tên import JavaScript/Python từ mã nguồn. Có thể là module nội bộ, thư viện chuẩn Python, dependency tùy chọn hoặc tên import khác tên distribution (PIL/Pillow). Không tự chuyển thành lệnh cài.
- `installation-command-hint`: tên gói từ ví dụ `npm install`/`pnpm add`/`yarn add`/`pip install`. Có thể chỉ dành cho một workflow hoặc tùy chọn; không chạy lệnh đó. URL và tham số credential không được đưa vào dữ liệu kết quả.
- `mention-hint`, `file-type-hint`: xuất hiện trong tài liệu/mã hoặc được gợi ý bởi đuôi file; có thể chỉ là ví dụ hoặc công cụ thay thế.
- `reference-hint`: tên slash skill xuất hiện trong tài liệu, ví dụ `/li-human`; cần kiểm tra skill liên quan. Không giả định Hub đã chứa skill đó.

Mỗi bằng chứng chỉ chứa đường dẫn và số dòng, không sao chép giá trị credential, command hay biến môi trường từ cấu hình. Bộ quét dùng quy tắc tĩnh, không phải trình phân tích đầy đủ mọi ngôn ngữ; các định dạng như pyproject/Cargo cần review thủ công khi có. Không phát hiện yêu cầu ngoài không chứng minh skill chạy độc lập. Không biết phần mềm nào thực sự thiếu trên máy người dùng cho đến khi app kiểm tra môi trường.

Danh sách `missingPackageFiles` là đường dẫn upstream đã bị loại khi đóng gói; không trộn vào npm/pip dependency. Trạng thái cách ly và quyết định duyệt giữ nguyên.

Trước cập nhật đã lưu Git bundle và bản catalog ở thư mục tác vụ bên ngoài repo. Rollback thay đổi công khai bằng cách revert commit cập nhật này rồi chạy `npm run catalog` bằng phiên bản công cụ trước đó; không reset hoặc force push lịch sử chung.

Archify khai báo Node.js >=18 từ package.json tại commit ghim. Package.json đó không khai báo dependencies/optionalDependencies, vì vậy không tự bịa danh sách gói npm cần cài. 120 đường dẫn bị loại là file/module của chính bản phân phối Archify: cần khôi phục gói đầy đủ đúng commit trước khi kích hoạt. Metadata không biến bản thiếu thành bản chạy được.

Không thêm trường mới vào manifest Hybrid strict hoặc thay core gốc. Giữ inventory, checksum và cổng duyệt. Không dùng một lệnh cài tải từ metadata bên thứ ba làm hành động tự động.
