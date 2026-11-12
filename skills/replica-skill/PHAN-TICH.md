# Phân tích: replica-skill (Jakeschincariol/replica-skill)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 2/30)
- **Repo gốc:** https://github.com/Jakeschincariol/replica-skill
- **Sao:** 9.041 | **Ngày tạo:** 03/10/2026 | **Push gần nhất:** 03/10/2026
- **Giấy phép:** MIT | **Tác giả:** Jakeschincariol

## Lý do chọn
- 9k sao chỉ sau ~10 ngày (tạo 03/10, đo 12/11) — một trong những repo skill tăng nhanh nhất tuần.
- Zero-friction tuyệt đối: MIT, không đăng ký, không API key, không pip install gì thêm (Python 3.8 thuần).
- Đúng bài toán xây sản phẩm của bot: từ "clone app này" đi đến bản chạy được có test, có deploy.

## Làm gì
Bộ 11 skill chuỗi: `replica-recon` (phân tích ngược app → recon map, features.csv) → `replica-architect` (stack/schema) → `replica-design` (design system dạng token) → `replica-build` (rebuild từng màn hình) → `replica-backend` (auth/DB/thanh toán) → `replica-test` (Playwright, bug theo mức S1/S2) → `replica-diff` (điểm parity so với bản gốc) → `replica-entrepreneur` (đọc review thật tìm điểm người dùng ghét) → `replica-brand` → `replica-launch` → `replica-deploy`.

## Điểm mạnh
- Quy trình end-to-end hiếm thấy trong một bộ skill (đến cả landing page, pricing, App Store listing, deploy domain riêng).
- Chỉ số parity đo được + quy trình test kỷ luật → kết quả kiểm chứng được, không "cảm tính".
- Clean-room rõ ràng: rebuild cái app *làm*, không lấy cái app *sở hữu* (code, logo, nội dung) — các skill tự thực thi.

## Điểm yếu / rủi ro
- Repo không push lại từ ngày tạo (3 ngày sau đó) — không có phiên bản ổn định tiếp theo; nhưng skill là markdown + Python thuần nên ít hỏng theo thời gian.
- Clone app là vùng nhạy cảm pháp lý — chỉ dùng cho app mình có quyền phân tích; không xâm phạm thương hiệu/bản quyền bên thứ ba.
- Skill thuần hướng Claude Code; agent khác phải dán SKILL.md thủ công và mất tool Python.

## Độ phù hợp với Limix Bot
Cao: đúng nhu cầu "xây demo/mvp cho người dùng" của bot. Chạy được trên OpenCode/Codex nếu copy thư mục skill (giữ phần phương pháp); các tool Python chạy khi bot có quyền shell. Khuyến nghị review-required.
