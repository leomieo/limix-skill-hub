# Phân tích: instagram-agent-skill (Jakeschincariol/instagram-agent-skill)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 4/30)
- **Repo gốc:** https://github.com/Jakeschincariol/instagram-agent-skill
- **Sao:** 6.138 | **Ngày tạo:** 13/09/2026 | **Push gần nhất:** 13/09/2026
- **Giấy phép:** MIT | **Tác giả:** Jake Schincariol (opusjake.ai) — cùng tác giả với day-trader-skill và replica-skill đã có trong hub

## Lý do chọn
- Sao cao nhất trong nhóm ứng viên chưa chọn (6.138★), đứng thứ 2 toàn bảng chỉ sau anatomy (đã chọn).
- 1.194 fork — tỷ lệ fork/sao rất cao cho thấy cộng đồng đang lấy về dùng thật.
- Lấp đúng mảng hub còn trống: **nội dung mạng xã hội/marketing**, khác hoàn toàn các nhóm video-render, design, devops đã có.

## Làm gì
13 skill điều hành một tài khoản Instagram: `/ig-reel` (viết Reel từ 26 công thức hook, chấm điểm trước khi quay), `/ig-viral` (tìm reel đang chạy trong ngách, xếp theo bội số trên median từng tài khoản), `/ig-caption` (preview đúng 125 ký tự feed hiển thị), `/ig-carousel`, `/ig-story`, `/ig-profile` (rubric 100 điểm), `/ig-plan`, `/ig-human` (humanizer tẩy dấu vết AI), `/ig-comment`, `/ig-reply`, `/ig-dm`, `/ig-repurpose`, `/ig-audit`. Kèm 5 tool Python chạy cục bộ không cần network: `hookscore.py`, `beats.py`, `caption.py`, `humanize.py`/`detect.py`, `swipe.py`.

## Điểm mạnh
- Trung thực hiếm có: tự công bố kết quả test bất lợi cho sản phẩm của mình (hook scorer AUC 0,56 — gần như tung đồng xu — khi tách hit/miss của cùng creator) và rút ra cách dùng đúng: **dùng để giết hook yếu, không dùng để chọn hook thắng**.
- Thiết kế an toàn từ gốc: không đăng tự động (vi phạm ToS Instagram), không scrape, không mật khẩu — mọi thứ kết thúc bằng bản copy cho người dùng tự đăng.
- Humanizer xử lý được dấu vết AI thật: ký tự vô hình (zero-width, BOM...), 154 cụm từ "slop", typography.
- Hoạt động cả khi chỉ dán SKILL.md vào chat (mất 5 tool nhưng vẫn dùng được phần văn bản).

## Điểm yếu / rủi ro
- Số liệu nền tảng nhanh cũ: cap hashtag 30 → 5 (12/2025) là ví dụ; cần kiểm tra lại khi dùng.
- 5 tool Python là script tự chạy → **review-required** theo quy tắc hub (đã scan: không có pattern nguy hiểm, không network).
- Dữ liệu đo từ YouTube Shorts thay vì Reels (Instagram không cho lấy view count hợp pháp) — hook grammar giống nhau nhưng là giới hạn thật.
- Cùng tác giả Jakeschincariol với 2 skill trong hub — chọn vì chất lượng và số sao, nhưng cần đa dạng nguồn ở các lần sau.

## Độ phù hợp với Limix Bot
Trung bình-cao: các lệnh viết nội dung (`/ig-caption`, `/ig-human`, `/ig-profile`) chạy tốt ngay trong chat; 5 tool chỉ cần python3. Phù hợp nếu Leo dùng Limix Bot để lo nội dung mạng xã hội. Skill kèm script → review-required.
