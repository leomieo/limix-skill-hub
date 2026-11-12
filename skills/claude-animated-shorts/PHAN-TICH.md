# Phân tích: claude-animated-shorts (mromidev/claude-animated-shorts)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 4/30)
- **Repo gốc:** https://github.com/mromidev/claude-animated-shorts
- **Sao:** 3.042 | **Ngày tạo:** 01/11/2026 | **Push gần nhất:** 01/11/2026
- **Giấy phép:** MIT (code + docs) | **Tác giả:** mromidev

## Lý do chọn
- **Mới nhất + tăng sao nhanh nhất** trong nhóm chưa chọn: tạo 01/11 (11 ngày trước), 3.042★ — tốc độ ~275★/ngày, top tuyệt đối của tuần.
- Kèm repo đã được chăm chút từ ngày tạo: skill file 15 KB, template nguồn đầy đủ của short kiểm chứng (67 giây), 1.200 reference frames.
- Thể hiện rõ triết lý "đo số liệu thay vì cảm tính": STYLE_BIBLE đo từ 20 short tham chiếu, 7 reports bằng số, verifier chấm từng mảng.

## Làm gì
Làm short hoạt hình dọc 55-70 giây kiểu "2D nhân vật trong thế giới 3D nhiều màu" — render three.js trong Remotion, không AI video generator. Quy trình 11 bước: chọn chuyện thật có nhân-quả vật lý → script theo công thức beat → giọng đọc + words.json → shot plan `story.ts` → dựng thế giới (lights/build/paint/world) → nhân vật (toon/cast) → post (ink/lens blur/grade) → âm thanh tổng hợp → look check side-by-side → render 2K + QA từng frame → giao file. Kèm vòng "look-match" tái sử dụng: đo tham chiếu bằng số → sandbox 5 chủ (cam/world/mat/char/post) → merge → verify bởi agent mới.

## Điểm mạnh
- Skill file là mức chi tiết hiếm thấy: đầy đủ giá trị look cuối (preset ánh sáng, albedo, độ dày mực, thông số camera) để tái tạo đúng phong cách, cộng Gotchas và "bẫy nhìn sai" rút từ thực tế render.
- Quy trình look-match (đo → sandbox → merge → verify) là phương pháp dùng lại được cho mọi yêu cầu "làm giống X", không chỉ short hoạt hình.
- Đạo đức nguồn rõ: 20 short tham chiếu là tài liệu nghiên cứu riêng, cấm copy truyện/nhân vật, chỉ học look.

## Điểm yếu / rủi ro
- Nặng máy và nặng disk: render 2K ~4 fps, mỗi Remotion bundle chiếm ~1,3 GB temp không tự xóa (tác giả ghi rõ từng đầy 60+ GB ổ hệ thống một lần). **review-required** theo quy tắc hub.
- Skill gốc viết cho harness của chính tác giả (Opus max verifier, SendMessage, SendUserFile) — dùng ở harness khác phải thay bằng cơ chế tương ứng.
- Push duy nhất ngày 01/11 — repo còn rất non, chưa thấy vòng bảo trì nào.
- Cần Node + Python + ffmpeg + Remotion; với Limix Bot cần môi trường render riêng.

## Độ phù hợp với Limix Bot
Trung bình: chất lượng nội dung cao nhưng yêu cầu môi trường render nặng; phù hợp khi Leo cần video ngắn dạng truyện trên máy có GPU/disk thoải mái. Bẫy "cờ đỏ + sao vàng đọc thành cờ Việt Nam" là chi tiết đáng nhớ cho mọi job video của bot.
