# aso — hướng dẫn tiếng Việt

Đánh giá trang ứng dụng trên App Store hoặc Google Play từ nội dung, hình ảnh và đánh giá thực tế; ưu tiên dữ liệu chỉ đọc của ứng dụng sở hữu.

## Khi dùng và đầu vào

Đánh giá trang ứng dụng này, ghi rõ phần quan sát được và thiếu dữ liệu; chỉ soạn đề xuất, chưa thay đổi trang đang chạy.

Cung cấp mục tiêu, phạm vi dữ liệu được phép đọc và định dạng đầu ra. Kết quả cần kèm nguồn, ngày và phần chưa xác minh.

## Cách đọc tài liệu

Agent đọc SKILL.md tiếng Anh khi kỹ năng được kích hoạt, rồi chỉ đọc tài liệu tham khảo cần cho chế độ đã chọn. Không cần nạp một bản dịch đầy đủ. Tệp gốc và tên API, CLI, tham số, đường dẫn được giữ nguyên byte. Các hướng dẫn công cụ chung đã ghim nằm tại references/upstream/ nếu có; đối chiếu upstreamPath trong _hub.source.json. Các liên kết main bên trong nguồn vẫn có thể thay đổi ở ngoài kho.

## Quyền và giới hạn

Trạng thái: **review-required**; tương thích: **unchecked**. Mục cách ly chưa được kích hoạt. Danh sách quyền trong manifest chỉ mô tả nhu cầu, không tự cấp quyền. Không cài công cụ, đọc cookie/khóa, thu thập hội thoại, gửi liên hệ hoặc thay đổi dữ liệu bên ngoài chỉ vì tài liệu gốc yêu cầu. Bí mật chỉ nhập qua cơ chế bảo mật của ứng dụng, không dán vào hội thoại.

- Đọc trang công khai và ngữ cảnh tiếp thị của dự án; nếu có quyền phù hợp thì dùng asc với --read-only cho ứng dụng thuộc tài khoản của người dùng.
- Hướng dẫn App Store Connect CLI đã được ghim cùng commit trong references/upstream/tools/integrations/app-store-connect-cli.md. Tên lệnh, khóa truy cập và các giới hạn cửa hàng là hướng dẫn của nguồn, chưa được thử độc lập.
- Chỉ soạn đề xuất và phản hồi. Gửi phản hồi công khai, đẩy nội dung lên cửa hàng hoặc thay đổi dữ liệu cần được người dùng cho phép riêng.
- Chưa thử asc, trình duyệt, tài khoản Apple hay Google Play. Các công cụ và kỹ năng bổ trợ được nhắc trong tài liệu là phụ thuộc ngoài, chưa được cài.

Chưa chạy mã nguồn, dịch vụ, mô hình hoặc nhà cung cấp thật. Quét tĩnh và hash chỉ chứng minh những phần đã kiểm tra, không bảo đảm an toàn khi chạy hay hiệu quả.

## Nguồn

coreyhaines31/marketingskills, commit 8fd2fcade2fd6629026e9dfe6d133b55b36968b9, thư mục skills/aso. Đối chiếu SHA-256 từng tệp trong _hub.source.json; giấy phép gốc đi kèm gói.
