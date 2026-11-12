---
name: replica-skill
description: Bộ 11 skill "nhân bản" (clone) bất kỳ ứng dụng nào theo quy trình clean-room, MIT, miễn phí, không cần đăng ký hay API key. replica-recon phân tích ngược ứng dụng muốn clone (màn hình, luồng, component, mô hình dữ liệu, bảng feature); replica-architect chọn stack và vẽ schema; replica-design dựng lại design system; replica-build rebuild từng màn hình; replica-backend thêm auth/DB/thanh toán; replica-test click qua mọi luồng để tìm bug; replica-diff chấm điểm độ tương đồng; replica-entrepreneur đọc review thật để tìm điểm người dùng ghét; replica-brand, replica-launch, replica-deploy đưa sản phẩm riêng lên domain của bạn. Dùng khi người dùng nói "clone app X", "reverse engineer X", "làm phiên bản riêng của X".
license: MIT
compatibility: Claude Code (plugin/skill folder), Claude.ai (dán SKILL.md), các agent hỗ trợ Agent Skills
version: 2026-11-12
---

# Replica Skill (Việt hóa)

> Nguồn gốc: https://github.com/Jakeschincariol/replica-skill - MIT. Bản gốc tiếng Anh của skill đầu tiên (`replica-recon`) xem `SKILL.en.md`; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
11 skill chạy **theo đúng thứ tự**, mỗi skill đọc kết quả của skill trước trong thư mục `replica/` của dự án:

```
recon -> architect -> design -> build -> backend -> test -> diff -> entrepreneur -> brand -> launch -> deploy
```

| Lệnh | Việc |
|---|---|
| `/replica-recon` | Phân tích ngược app: màn hình, luồng, component, mô hình dữ liệu, từ trang public, ảnh chụp, store listing và account của bạn. |
| `/replica-architect` | Chọn stack, DB, API; vẽ schema (kể cả constraint chống double-booking) và thứ tự build. |
| `/replica-design` | Dựng lại design system: màu, type scale, spacing 8px, spec component — bằng token, icon/font mở, ngôn từ của bạn. |
| `/replica-build` | Rebuild từng màn hình từ recon map, tick từng feature trong `features.csv`. |
| `/replica-backend` | Auth, DB, thanh toán, tích hợp (Google Calendar qua API của Google, Stripe, email nhắc). |
| `/replica-test` | Kế hoạch test từ các luồng; spec Playwright cho happy path và edge case (múi giờ, slot bị chiếm giữa lúc đặt, double submit); ghi bug theo độ nghiêm trọng đến khi hết S1/S2. |
| `/replica-diff` | Chấm điểm đối chiếu bản clone với bản gốc (điểm parity + phần còn thiếu). |
| `/replica-entrepreneur` | Đọc review thật của app gốc để tìm điều người dùng ghét → biến thành fix và góc định vị khác biệt. |
| `/replica-brand` | Đặt tên, rebrand để sản phẩm là của bạn. |
| `/replica-launch` | Landing page, pricing, listing App Store. |
| `/replica-deploy` | Deploy lên domain của bạn. |

## Cài đặt
```sh
# Claude Code (plugin marketplace)
/plugin marketplace add Jakeschincariol/replica-skill
/plugin install replica-skill@replica-skill

# Hoặc copy thủ công (lệnh hiện không có namespace)
git clone https://github.com/Jakeschincariol/replica-skill.git
cp -r replica-skill/replica-* ~/.claude/skills/

# Per-project: copy vào .claude/skills/ của repo
# Không có Claude Code: dán SKILL.md lên đầu chat → chạy như một mode (mất tool Python nhưng giữ nguyên phương pháp)
```
Tool cần Python ≥ 3.8, không cần pip install gì thêm.

## Nguyên tắc quan trọng
**Rebuild thứ một app *làm*, không phải thứ app *sở hữu*** — tính năng và luồng, theo clean-room; KHÔNG copy code, logo, văn bản, nội dung của app gốc. Các skill tự thực thi nguyên tắc này (ví dụ: partner marketplace của app gốc được đánh dấu out-of-scope).

## Điểm mạnh / lưu ý
- **Mạnh:** quy trình end-to-end hiếm có (từ recon đến deploy, cả business angle qua review người dùng), phát hiện bug có kỷ luật (S1/S2), chỉ số parity đo được; zero dependency, đa agent.
- **Lưu ý:** clone app là vùng nhạy cảm về pháp lý — chỉ dùng cho app bạn có quyền phân tích, không xâm phạm bản quyền/thương hiệu của bên thứ ba; kết quả tốt nhất khi theo đúng thứ tự 11 skill.
