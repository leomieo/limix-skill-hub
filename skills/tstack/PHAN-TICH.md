# Phân tích: tstack (t3dotgg/tstack)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 3/30)
- **Repo gốc:** https://github.com/t3dotgg/tstack
- **Sao:** 3.509 | **Ngày tạo:** 24/10/2026 | **Push gần nhất:** 11/11/2026
- **Giấy phép:** MIT | **Tác giả:** t3dotgg (Theo — T3 Chat, t3 Code)

## Lý do chọn
- 3.509★ chỉ sau ~19 ngày và push lại ngày 11/11 — tăng độ quan tâm ổn định.
- Tác giả là người dùng agent công khai lớn nhất trong nhóm ứng viên; bộ skill này là "cái ông ấy dùng mỗi ngày", độ tin cậy quy trình cao hơn hẳn trung bình.
- Bổ đúng mảng hub còn thiếu: **quy trình làm việc với PR/review**, không phải một năng lực riêng (video, design, trading...).

## Làm gì
9 skill quanh pull request: `full-send`/`full-stop` (đưa thay đổi đến merge hoặc dừng trước merge), `council` (review 3 model khác nhà cung cấp đến đồng thuận), `sol-loop` (review vòng lặp 2 agent), `file-pr` (PR ngắn dẫn bằng vấn đề), `takeover` (nhận việc của người khác, giữ credit), `babysit-pr` (trông CI + review bot), `modernize` (rebase PR cũ), `leaving-pr-comments`.

## Điểm mạnh
- Đơn giản đến mức không cần framework: mỗi skill là một SKILL.md + ít script, cài là copy.
- Chống tự động hóa mù quáng có chủ đích: `full-stop` cho người muốn chốt tay, `council` để nhiều model chặt chẽ nhau.
- Hướng dẫn "make them yours": cài cá nhân hóa vào CLAUDE.md/AGENTS.md thay vì sửa skill — nâng cấp không mất cài đặt.

## Điểm yếu / rủi ro
- `full-send` tự merge: nếu bật cho repo nhạy cảm là rủi ro thật — luôn review-required, chỉ dùng thay đổi thấp rủi ro.
- `council`/`sol-loop` phụ thuộc harness chạy model ngoài (OpenAI...) — với Limix Bot cần cấu hình thêm, không chạy được ngay.
- Gắn chặt quy trình Claude Code/Codex; ở harness khác phải dùng phương pháp thay cho lệnh.

## Độ phù hợp với Limix Bot
Trung bình-cao: `file-pr` + `babysit-pr` + `council` (nếu cấu hình được model phụ) giúp Leo giữ chất lượng khi nhiều agent chạy song song trên limix-skill-hub. Skill kèm script (`pr-wait`) → review-required.
