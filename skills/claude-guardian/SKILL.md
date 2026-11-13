---
name: claude-guardian
description: Hướng dẫn và thiết lập môi trường vận hành an toàn cho tài khoản Claude và AI Agent: chuẩn bị đăng ký & kênh thanh toán, nhịp độ hoạt động tránh thuật toán quét bất thường, cấu hình mạng sạch trên máy cục bộ (Clash TUN, Windows Firewall, Mac PF) / Máy ảo (VM) / Máy chủ riêng ảo (VPS), xác minh IP xuất ra chỉ chạy IPv4, tối ưu hóa đường truyền, chẩn đoán xử lý lỗi 403/429/529 và dọn dẹp dấu vết thiết bị cũ. Mọi thay đổi hệ thống được phân cấp thẩm quyền A/B/C rõ ràng.
---

# Claude Guardian

Quy trình chuẩn bị môi trường, kiểm tra đường truyền mạng, bảo vệ tài khoản và xử lý sự cố kết nối cho các tác tử AI (Agent) hoạt động ổn định, lâu dài.

## Nguyên tắc giao tiếp với người dùng

Các quy định kiểm soát trong kỹ năng này là **hướng dẫn hành động dành cho Agent thực thi, không phải lời thoại để đọc cho người dùng nghe**:

1. **Nêu rõ đã làm gì, quan sát thấy gì, và bước tiếp theo ai sẽ làm gì.**
2. **Kết luận dựa trên bằng chứng cụ thể:** Đã kiểm tra thì báo kết quả, chưa kiểm tra thì nói rõ "chưa kiểm tra, bước tiếp theo sẽ kiểm tra". Câu từ gãy gọn, không đính kèm các câu miễn trừ trách nhiệm sáo rỗng.
3. **Giới hạn chỉ nêu khi người dùng muốn vượt qua:** Nếu người dùng yêu cầu thanh toán hộ, hãy trả lời thẳng: "Thao tác thanh toán cần bạn tự thực hiện trên trang chính thức của dịch vụ, các bước cụ thể tôi đã liệt kê sẵn bên dưới".
4. **Không cam đoan tuyệt đối 100%:** Trong thế giới AI, không ai có thể đảm bảo tài khoản không bao giờ bị khóa; mục tiêu cốt lõi của quy trình này là triệt tiêu các rủi ro kỹ thuật kiểm soát được xuống mức thấp nhất.

## Thứ tự triển khai môi trường

1. **Khảo sát lộ trình chạy:** Xác định môi trường vận hành là máy cục bộ (Local), máy ảo (VM) hay máy chủ đám mây (VPS).
2. **Kiểm định lối ra mạng (Egress Verification):**
   - Xác minh toàn bộ lưu lượng của Agent đi qua một địa chỉ IPv4 duy nhất, không để rò rỉ IPv6.
   - Kiểm tra rò rỉ DNS (DNS leak) và kiểm tra loại IP (IP Type: Residential/ISP sạch thay vì dải IP Datacenter bị gán nhãn rủi ro cao).
3. **Phân cấp thẩm quyền thao tác:**
   - **Tầng A (Chỉ đọc & Kiểm tra):** Chạy các lệnh kiểm tra kết nối, xem cổng mạng, đọc file log. Hoàn toàn an toàn, tự động thực thi.
   - **Tầng B (Cấu hình ứng dụng):** Thiết lập biến môi trường `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` trong phạm vi phiên làm việc của Agent.
   - **Tầng C (Thay đổi hệ điều hành & Mạng):** Sửa đổi bảng định tuyến (routing table), cấu hình Windows Firewall hoặc macOS Packet Filter, kích hoạt TUN mode. Bắt buộc báo trước và nhận được sự đồng ý của người dùng.
4. **Chẩn đoán sự cố mạng & Mã lỗi:**
   - **Lỗi 403 Forbidden:** Do địa chỉ IP nằm trong danh sách đen của Cloudflare/Anthropic hoặc vị trí địa lý không được hỗ trợ. Hướng dẫn chuyển đổi sang proxy sạch hoặc VPS đạt chuẩn.
   - **Lỗi 429 Rate Limit:** Tần suất gửi yêu cầu quá dày đặc. Kích hoạt cơ chế chờ theo hàm mũ (exponential backoff) và giảm số lượng sub-agent chạy đồng thời.
   - **Lỗi 529 Overloaded:** Máy chủ nhà cung cấp bị quá tải. Tạm hoãn tác vụ và lên lịch kích hoạt lại tự động sau khi tải hạ nhiệt.
