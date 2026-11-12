# Phân tích: golive-skill (mikehasa/golive-skill)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 4/30)
- **Repo gốc:** https://github.com/mikehasa/golive-skill
- **Sao:** 1.501 | **Ngày tạo:** 23/09/2026 | **Push gần nhất:** 11/10/2026
- **Giấy phép:** MIT (repo + skill riêng) | **Tác giả:** mikehasa (homepage trytofu.ai) | **Ngôn ngữ:** TypeScript | **Phiên bản:** 0.1.0-alpha.9

## Lý do chọn
- Mảng hub còn trống hoàn toàn: **devops/go-live cho sản phẩm agent-built** — các skill trước lo dựng app/nội dung, chưa có skill nào lo "từ repo lên production".
- Thiết kế an toàn xuất sắc cho một skill chạm hạ tầng thật: plan phải duyệt, 3 cấp cờ `--confirm-dns/live/destroy`, teardown chỉ xóa thứ chứng minh được là nó tạo, status chỉ đọc và không bao giờ báo "clean" khi không đọc được.
- Tài liệu xác thực (VALIDATION.md) tách rạchoi "đã live-test" khỏi "chỉ mock-covered" — trung thực hiếm thấy.

## Làm gì
Skill + CLI cục bộ 0-dependency đưa app agent-built lên production trên tài khoản của chính người dùng: detect → plan → approve → apply → verify → handoff/teardown. Đã live-test: Vercel + Supabase/Neon/Netlify (hosting + database + env wiring + CRUD), domain DNS (Porkbun, GoDaddy), email (Resend), Stripe test-mode payments, Supabase Auth (SMTP, password recovery, isolation). Kèm `golive status` (drift check chỉ đọc) và `golive handoff` (tài liệu sở hữu GOLIVE_HANDOVER.md).

## Điểm mạnh
- "Skipped is not passed" — triết lý kiểm chứng đúng: deploy xong ≠ app chạy; report ghi pass/fail/warning/skipped kèm bước người còn lại.
- Giữ secrets ngoài chat tuyệt đối: giá trị key không nằm trong argv/plan/state/report, chỉ fingerprint; file credentials 0600 ngoài repo và ghi thẳng giới hạn của nó.
- Vòng đời trọn: không chỉ deploy mà còn teardown có bằng chứng sở hữu và handoff tài liệu chuyển giao.
- 6 ngôn ngữ README, cài qua 3 kênh (Skills CLI, npm, ClawHub).

## Điểm yếu / rủi ro
- **Early alpha 0.1.0-alpha.9**: nhiều phần roadmap chỉ mock-covered; rollback chỉ Netlify; Cloudflare DNS chưa phải đường live-test.
- Skill chạm hạ tầng thật + viết credentials file + chạy CLI lớn → **review-required** cứng theo quy tắc hub; chỉ dùng khi Leo tự duyệt từng plan và tự chạy các bước login.
- Giới hạn tự nêu: cờ xác nhận là argument agent truyền — agent đã login provider có thể ghi mà không cần plan golive (TRUST.md thừa nhận); bắt buộc con người giám sát agent.
- Push cuối 11/10 — nhịp phát triển chậm hơn tháng trước nhưng vẫn trong alpha care.

## Độ phù hợp với Limix Bot
Trung bình-cao cho kịch bản Leo nhờ bot deploy sản phẩm: là skill duy nhất trong hub bao trùm "từ repo tới URL chạy thật + dọn dẹp". Phải luôn chạy ở chế độ test-mode/trước `--confirm-live` và mỗi lần deploy cần Leo duyệt plan.
