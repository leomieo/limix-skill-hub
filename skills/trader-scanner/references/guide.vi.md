# trader-scanner — hướng dẫn tiếng Việt

Bộ 11 skill day-trading cho agent — quét hàng nghìn biểu đồ tìm setup (opening-range breakout, bull flag, oversold bounce), theo dõi tin tức ảnh hưởng giá, bấm giờ điểm vào, đặt stop/target trước khi vào lệnh, "Cỗ máy thời gian" mô phỏng 10.000 phiên để nói xác suất thật, quản lý rủi ro, quản lý ngân sách, gửi lệnh sang broker (mặc định paper trading, không bao giờ tự đặt lệnh không có sự đồng ý), cảnh báo giá và đọc báo cáo kết quả kinh doanh. Toàn bộ tool là Python thuần đọc dữ liệu công khai miễn phí (Yahoo Finance, Nasdaq Trader, SEC EDGAR, House Clerk) — không đăng ký, không API key. Lưu ý rủi ro: chỉ là danh sách biểu đồ khớp luật, không phải dự đoán; hầu hết người day-trade thua lỗ. Dùng khi người dùng nói "scan thị trường", "tìm setup", "cổ phiếu đang breakout", "xây watchlist hôm nay".

## Cách dùng

- Gọi kỹ năng bằng tên gốc `trader-scanner` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng trader-scanner cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **review-required**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/Jakeschincariol/day-trader-skill — commit `3d0f4ef6986f4984b7c6bd46f7ff4f87744c3abd`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
