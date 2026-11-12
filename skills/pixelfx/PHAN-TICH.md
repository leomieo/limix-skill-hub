# Phân tích: pixelfx (patch-gg/pixelfx)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 2/30)
- **Repo gốc:** https://github.com/patch-gg/pixelfx
- **Sao:** 7.103 | **Ngày tạo:** 30/10/2026 | **Push gần nhất:** 12/11/2026 (đang hoạt động mạnh)
- **Giấy phép:** MIT | **Tác giả:** patch-gg (block "pixelfx" trên Patch)

## Lý do chọn
- 7.1k sao chỉ sau 13 ngày, push ngay hôm nay chạy — tốc độ tăng sao thuộc top đầu trong các skill game/dev mới.
- Kho hiệu ứng định lượng (244 hiệu ứng) + phương pháp craft có phương pháp luận (Hugo Duprez) — hữu ích cho mọi agent làm game.
- Zero dependency, Node thuần: dễ cài, dễ kiểm chứng, dễ chạy thử.

## Làm gì
Thư viện 244 hiệu ứng pixel art viết bằng JS (mỗi hiệu ứng 1 file trong `src/fx/<category>/`), vẽ vào 2 buffer màu + sáng; không dùng ảnh nên chơi live, đổi màu/lật/đổi seed, xuất sprite sheet Aseprite-style cho Godot/Unity/GameMaker/Defold/LÖVE/Bevy. Skill `pixelfx` kèm vòng **draft → render → nhìn → chỉnh** để tạo hiệu ứng mới như một pixel artist khắt khe; hiệu ứng có nhân vật được "diễn xuất" trọn vẹn.

## Điểm mạnh
- Quy mô + catalog có tổ chức (20 nhóm hiệu ứng, `docs/CATALOG.md`); gallery online xem ngay không cần cài.
- Định dạng xuất chuẩn (PNG grid + JSON Aseprite) → dùng được trong engine nào cũng được.
- Phương pháp "code là đất sét, tin vào mắt" — agent phải tự soi contact sheet, không prompt một-lần.

## Điểm yếu / rủi ro
- Cần Node 18+ và agent phải có khả năng mở/xem PNG để chạy đúng vòng craft (môi trường headless cần công cụ đọc ảnh).
- Phạm vi hẹp (VFX pixel art) — là skill chuyên sâu, không phải công cụ đa dụng.

## Độ phù hợp với Limix Bot
Trung bình-cao: khi Leo cần asset cho dự án game nhỏ hoặc demo có "juice", bot có thể sinh hiệu ứng và xuất sprite sheet mà không cần trình thiết kế. Chạy tốt trong môi trường bot có Node + đọc ảnh. Review-required (kèm script render).
