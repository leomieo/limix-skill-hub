# Phân tích: claude-guardian (DUNHKpcc/Claude-Guardian)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 8/30)
- **Repo gốc:** https://github.com/DUNHKpcc/Claude-Guardian
- **Sao:** 1.991 | **Ngày tạo:** 15/10/2026 | **Push gần nhất:** 11/11/2026
- **Giấy phép:** GPL-3.0 | **Tác giả:** DUNHKpcc

## Lý do chọn
- Gần 2.000★ chỉ sau chưa đầy một tháng phát hành, phản ánh nhu cầu cực kỳ cấp thiết của cộng đồng lập trình viên và người dùng tự động hóa AI agent: phòng tránh rủi ro bị khóa tài khoản hoặc gián đoạn dịch vụ khi vận hành các agent cường độ cao (Claude Code, Cursor, Codex, Limix Bot).
- Đúc kết kinh nghiệm thực chiến phong phú: kiểm tra độ uy tín của địa chỉ IP xuất (Residential vs Datacenter), chặn rò rỉ WebRTC/DNS/IPv6, cách ly luồng dữ liệu giữa máy cục bộ, máy ảo (VM) và máy chủ ảo (VPS).
- Thiết lập cơ chế phân cấp thẩm quyền thao tác 3 tầng (A/B/C) cực kỳ chặt chẽ, đảm bảo agent không bao giờ tự ý can thiệp thông tin nhạy cảm hay thay đổi hệ thống ngoài tầm kiểm soát của người dùng.

## Làm gì
Quy trình bảo vệ và tối ưu môi trường vận hành Agent:
1. `Phân cấp thẩm quyền thao tác (Permission Tiers)`:
   - **Tầng A (Chỉ đọc & Phân tích)**: Khảo sát cấu hình máy, kiểm tra rò rỉ DNS, kiểm tra IP xuất ra, không ghi đè bất kỳ cài đặt nào.
   - **Tầng B (Cấu hình ứng dụng)**: Thiết lập biến môi trường chạy agent, cấu hình port proxy cục bộ (HTTP/SOCKS5).
   - **Tầng C (Thay đổi hệ thống mạng)**: Can thiệp cấu hình firewall hệ điều hành (Windows Firewall, macOS Packet Filter) hoặc tạo TUN adapter — bắt buộc có xác nhận rõ ràng của người dùng trước khi thực hiện.
2. `Khảo sát & Kiểm định lối ra mạng (Egress Verification)`:
   - Đảm bảo toàn bộ lưu lượng kết nối của agent đi qua lối ra IPv4 cố định, triệt tiêu nguy cơ rò rỉ IPv6 động khiến hệ thống AI nhận diện hành vi bất thường.
   - Phân biệt rõ ràng giữa proxy cục bộ (Mixed/HTTP) và giao thức xuất (SOCKS5/Shadowsocks).
3. `Chẩn đoán mã lỗi dịch vụ`:
   - Phân loại nguyên nhân và xử lý triệt để các mã lỗi phổ biến: 403 Forbidden (chặn vùng địa lý/vân tay proxy bẩn), 429 Rate Limit (tần suất gọi quá dày), 529 Overloaded (quá tải máy chủ).
4. `Nguyên tắc đạo đức & an toàn tuyệt đối`:
   - Không bao giờ lưu trữ mật khẩu, mã OTP, số thẻ thanh toán hay cookie phiên đăng nhập.
   - Thao tác thanh toán và đăng nhập luôn được hướng dẫn để người dùng tự thực hiện trực tiếp trên trang chính thống.

## Điểm mạnh
- Cung cấp giải pháp kỹ thuật hạ tầng mạng bài bản thay vì các mẹo vặt thiếu kiểm chứng.
- Hỗ trợ đa nền tảng (Windows, macOS, Linux, VM, VPS).
- Cách giao tiếp trực diện, tôn trọng quyền riêng tư và an toàn dữ liệu của người dùng.

## Điểm yếu / rủi ro
- Các thao tác can thiệp firewall hoặc TUN adapter đòi hỏi quyền quản trị viên (Admin/root) và sự am hiểu cơ bản về mạng từ người dùng.

## Độ phù hợp với Limix Bot
Cực kỳ cao: Limix Bot vận hành liên tục các tác vụ tự động hóa và điều phối nhiều bot chuyên môn trên máy tính của người dùng cũng như VPS. Kỹ năng này đóng vai trò như một "tấm khiên" bảo vệ đường truyền và tài khoản AI luôn thông suốt, an toàn và bền vững.
