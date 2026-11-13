# claude-guardian — hướng dẫn tiếng Việt

Hướng dẫn và thiết lập môi trường vận hành an toàn cho tài khoản Claude và AI Agent: chuẩn bị đăng ký & kênh thanh toán, nhịp độ hoạt động tránh thuật toán quét bất thường, cấu hình mạng sạch trên máy cục bộ (Clash TUN, Windows Firewall, Mac PF) / Máy ảo (VM) / Máy chủ riêng ảo (VPS), xác minh IP xuất ra chỉ chạy IPv4, tối ưu hóa đường truyền, chẩn đoán xử lý lỗi 403/429/529 và dọn dẹp dấu vết thiết bị cũ. Mọi thay đổi hệ thống được phân cấp thẩm quyền A/B/C rõ ràng.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `claude-guardian` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng claude-guardian cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **quarantined**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/DUNHKpcc/Claude-Guardian — commit `ec53265c84131e26b7097498a5fe0680fdeffed7`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
