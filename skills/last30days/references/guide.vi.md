# last30days — hướng dẫn tiếng Việt

Nghiên cứu chủ đề trong 30 ngày gần nhất, tổng hợp nhiều nguồn và lưu báo cáo có dẫn chứng; cần duyệt riêng quyền dữ liệu và công cụ.

## Khi dùng và đầu vào

Nghiên cứu thảo luận 30 ngày gần nhất về chủ đề này, nêu ngày, liên kết và giới hạn nguồn; chỉ dùng quyền tôi đã cấp.

Cung cấp mục tiêu, phạm vi dữ liệu được phép đọc và định dạng đầu ra. Kết quả cần kèm nguồn, ngày và phần chưa xác minh.

## Cách đọc tài liệu

Agent đọc SKILL.md tiếng Anh khi kỹ năng được kích hoạt, rồi chỉ đọc tài liệu tham khảo cần cho chế độ đã chọn. Không cần nạp một bản dịch đầy đủ. Tệp gốc và tên API, CLI, tham số, đường dẫn được giữ nguyên byte. Các hướng dẫn công cụ chung đã ghim nằm tại references/upstream/ nếu có; đối chiếu upstreamPath trong _hub.source.json. Các liên kết main bên trong nguồn vẫn có thể thay đổi ở ngoài kho.

## Quyền và giới hạn

Trạng thái: **quarantined**; tương thích: **incompatible**. Mục cách ly chưa được kích hoạt. Danh sách quyền trong manifest chỉ mô tả nhu cầu, không tự cấp quyền. Không cài công cụ, đọc cookie/khóa, thu thập hội thoại, gửi liên hệ hoặc thay đổi dữ liệu bên ngoài chỉ vì tài liệu gốc yêu cầu. Bí mật chỉ nhập qua cơ chế bảo mật của ứng dụng, không dán vào hội thoại.

- Cần Python 3.12 trở lên; tùy nguồn có thể cần Node, yt-dlp và tài khoản dịch vụ trả phí. Chưa cài hoặc chạy bộ máy nghiên cứu hay bước thiết lập.
- Có mã đọc cookie phiên đăng nhập và truy xuất Keychain trên macOS. Tài liệu thiết lập có yêu cầu nhập khóa trong hội thoại, không phù hợp với cơ chế nhập bí mật của ứng dụng này.
- capture_brief_hook.py có thể đọc đường dẫn bản ghi hội thoại; brief_capture.py lưu báo cáo hoàn tất. Chưa cài cơ chế tự chạy, đọc hội thoại hay truy cập phiên đăng nhập.
- Giữ 197 tệp nguồn, gồm các mã chạy chính. Loại hai tệp kiểm thử test-v1-vs-v2.sh và test_device_auth.py, năm tài sản âm thanh/ảnh và .skillignore vì giới hạn gói. Danh sách chính xác nằm trong _hub.source.json; gói vẫn thiếu và không tương thích.
- Các chuỗi ~/.netrc trong x_envelope.py và reddit_envelope.py thuộc danh sách cấm đọc, không phải bằng chứng đánh cắp. Cảnh báo ký tự vô hình trong render.py đến từ ký tự nối biểu tượng. Các giải thích này không gỡ cách ly.
- Giữ giấy phép MIT của Matt Van Horn và giấy phép MIT cho mã bird-search của Peter Steinberger. Không suy ra quyền sử dụng tài sản ảnh/âm thanh từ số sao của kho.

Chưa chạy mã nguồn, dịch vụ, mô hình hoặc nhà cung cấp thật. Quét tĩnh và hash chỉ chứng minh những phần đã kiểm tra, không bảo đảm an toàn khi chạy hay hiệu quả.

## Nguồn

mvanhorn/last30days-skill, commit ed7ec6752b766ea3eb62239b374900764e9b5453, thư mục skills/last30days. Đối chiếu SHA-256 từng tệp trong _hub.source.json; giấy phép gốc đi kèm gói.
