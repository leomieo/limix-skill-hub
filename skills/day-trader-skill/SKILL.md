---
name: day-trader-skill
description: Bộ 11 skill day-trading cho agent — quét hàng nghìn biểu đồ tìm setup (opening-range breakout, bull flag, oversold bounce), theo dõi tin tức ảnh hưởng giá, bấm giờ điểm vào, đặt stop/target trước khi vào lệnh, "Cỗ máy thời gian" mô phỏng 10.000 phiên để nói xác suất thật, quản lý rủi ro, quản lý ngân sách, gửi lệnh sang broker (mặc định paper trading, không bao giờ tự đặt lệnh không có sự đồng ý), cảnh báo giá và đọc báo cáo kết quả kinh doanh. Toàn bộ tool là Python thuần đọc dữ liệu công khai miễn phí (Yahoo Finance, Nasdaq Trader, SEC EDGAR, House Clerk) — không đăng ký, không API key. Lưu ý rủi ro: chỉ là danh sách biểu đồ khớp luật, không phải dự đoán; hầu hết người day-trade thua lỗ. Dùng khi người dùng nói "scan thị trường", "tìm setup", "cổ phiếu đang breakout", "xây watchlist hôm nay".
license: MIT
compatibility: Python 3.8+ thuần (không pip install); Claude Code, Codex và mọi agent hỗ trợ Agent Skills
version: 2026-11-12
---

# Day Trader Skill (Việt hóa)

> Nguồn gốc: https://github.com/Jakeschincariol/day-trader-skill — MIT. Bản gốc tiếng Anh xem `SKILL.md` của `trader-scanner` (chép nguyên trong `SKILL.en.md`); phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
11 skill chạy một phiên day-trade trọn vẹn: từ lúc quét thị trường buổi sáng đến lúc đóng lệnh và xem lại kết quả. Dữ liệu đầu vào hoàn toàn miễn phí và công khai: biểu đồ Yahoo Finance, danh sách mã của Nasdaq Trader, hồ sơ SEC EDGAR và dữ liệu của House Clerk (biệt phái Hạ viện Mỹ). Không AI nào tự đặt lệnh: **mọi lệnh đều phải chờ bạn gật đầu, paper trading là mặc định**.

## Cài đặt / dùng thế nào
```
# Dán vào Claude:
https://github.com/Jakeschincariol/day-trader-skill

install skill
```

Hoặc cài plugin trong Claude Code:
```
/plugin marketplace add Jakeschincariol/day-trader-skill
/plugin install day-trader-skill@day-trader-skill
```

Cài thủ công (tên lệnh gọn, không namespace):
```bash
git clone https://github.com/Jakeschincariol/day-trader-skill.git
cp -r day-trader-skill/trader-* ~/.claude/skills/
```
Muốn dùng trong một project riêng thì copy vào `.claude/skills/` của repo đó. Không dùng Claude Code? Dán một file `SKILL.md` bất kỳ lên đầu đoạn chat — nó chạy như một chế độ làm việc (mất phần tool Python nhưng phương pháp vẫn chạy).

Yêu cầu: Python 3.8 trở lên, không cần cài gì thêm. Các tool đọc SEC (tin tức hồ sơ, analyst) cần bạn tự nhận diện: điền tên và email vào `trader/config.json` (`"sec_user_agent": "Your Name you@example.com"`) hoặc biến môi trường `SEC_USER_AGENT`.

## Gói 11 lệnh
| Lệnh | Vai trò | Làm gì |
| --- | --- | --- |
| `/trader-scanner` | Chart Scanner | Quét hàng nghìn biểu đồ tìm setup: opening-range breakout, bull flag, oversold bounce. Ghi ra `trader/watchlist.json`. |
| `/trader-news` | News Monitor | Theo dõi tin tức mới trên mọi cổ phiếu bạn theo dõi và đánh dấu cái nào đủ sức dịch chuyển giá. |
| `/trader-entry` | Entry Timer | Xem một setup từng cây nến và báo đúng khoảnh khắc nên vào lệnh. |
| `/trader-exit` | Exit Planner | Đặt stop và target **trước khi** bạn vào lệnh, để biết lúc nào phải ra. |
| `/trader-timemachine` | Time Machine | Chạy lại 10.000 phiên giả lập từ chính nến lịch sử của cổ phiếu + mọi lần setup này đã nổ trong quá khứ, rồi nói xác suất trung thực. |
| `/trader-risk` | Risk Manager | Kiểm tra từng lệnh với giới hạn của bạn và chặn mọi lệnh vượt giới hạn. |
| `/trader-budget` | Budget Manager | Định cỡ vị thế theo ngân sách và mức lỗ tối đa mỗi lệnh của bạn. |
| `/trader-broker` | Order Executor | Gửi lệnh đã duyệt sang broker — mặc định paper trading, không bao giờ không có "yes" của bạn. |
| `/trader-alerts` | Price Alerts | Reng reng khi giá, stop hoặc chuông mở cửa chạm ngưỡng. |
| `/trader-analyst` | Earnings Analyst | Đọc báo cáo kết quả kinh doanh và tóm tắt những gì quan trọng với lệnh của bạn. |
| `/trader-pelosi` | Congress Tracker | Theo dõi hồ sơ giao dịch của Quốc hội Mỹ (House Clerk) cho cổ phiếu bạn theo dõi. |

Ví dụ quét thị trường buổi sáng:
```bash
python3 "${CLAUDE_SKILL_DIR}/scan.py" universe   # -> trader/universe.txt
python3 "${CLAUDE_SKILL_DIR}/scan.py" daily     # trước giờ mở cửa -> trader/watchlist.json
python3 "${CLAUDE_SKILL_DIR}/scan.py" orb       # sau 9:50 ET -> watchlist intraday
```

## Điểm mạnh
- Không đăng ký, không API key, không pip install — Python thuần, dữ liệu miễn phí công khai.
- Quản trị rủi ro thật: risk manager chặn lệnh vượt giới hạn, budget manager định cỡ vị thế, time machine cho xác suất thay vì lời hứa.
- Mặc định an toàn: không có lệnh nào đi qua nếu thiếu sự đồng ý của người dùng, paper trading mặc định.

## Điểm yếu / rủi ro
- **Tài chính thật**: giá break-out một ngày không đảm bảo gì về lãi; bản thân repo tuyên bố hầu hết người day-trade thua lỗ. Chỉ dùng như công cụ hỗ trợ ra quyết định của chính bạn, không phải lời khuyên đầu tư.
- Skill `/trader-broker` kết nối broker — theo quy tắc hub phải **review-required**; chỉ bật khi Leo tự xem xét và dùng với tài khoản paper trước.
- Dữ liệu Yahoo/giữa phiên có thể trễ hoặc thiếu; exit code 1 khi không quét được, luôn đọc dòng lý do.

## Độ phù hợp với Limix Bot
Trung bình-cao: phù hợp khi Leo hỏi "scan thị trường hôm nay", "tin gì đang ảnh hưởng cổ phiếu X" — bot chạy được phần quét, tin tức và analyst ngay; phần broker để ở chế độ paper và chỉ chờ duyệt tay.
