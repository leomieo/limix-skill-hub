<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: universal-modder (rehan-remade/universal-modder)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 2/30)
- **Repo gốc:** https://github.com/rehan-remade/universal-modder
- **Sao:** 9.634 | **Ngày tạo:** 30/09/2026 | **Push gần nhất:** 12/11/2026 (đang hoạt động mạnh)
- **Giấy phép:** MIT | **Tác giả:** rehan-remade

## Lý do chọn
- Số sao cao nhất trong các repo skill mới còn lại của chu kỳ (trên 9.6k chỉ sau ~6 tuần).
- Đang hoạt động: push ngay hôm nay chạy; có knowledge base cộng đồng và hub mod sắp mở (universalmodder.com).
- Hệ sinh thái rộng nhất: Claude Code, Codex, Cursor, Gemini CLI, Copilot, OpenCode đều có hướng dẫn cài chính thức.

## Làm gì
13 skill + CLI `um` + MCP fal, cho agent mod gần như bất kỳ game PC nào: recon engine/chọn route → lab an toàn (backup save) → đọc code thật → build slice chạy được → sinh asset (fal) → xác minh trong game thật → quay video → ghi field note vào knowledge base cho agent sau.

## Điểm mạnh
- Quy trình 10 bước có kỷ luật, có benchmark thực tế (3 dự án đã ship: Terraria, AoE II, Minecraft-in-GTA V).
- Knowledge base "AI viết cho AI" — kiến thức tích lũy qua PR, không phải rediscover.
- Chuẩn Agent Skills đa agent; quy tắc đạo đức rõ ràng (không ship file game, không decompile dump, không cheat người chơi khác).

## Điểm yếu / rủi ro
- Nặng về môi trường: cần game cài sẵn, Python 3.10+, ffmpeg, Blender (3D), key fal cho asset — cài đặt nhiều bước.
- Game mod đụng ToS của nhà phát hành — dùng phải trong khung được phép, game người dùng sở hữu.
- Rất nhiều script/tool → luôn ở trạng thái **review-required** theo quy tắc hub (kèm script không tự cài).

## Độ phù hợp với Limix Bot
Trung bình-cao cho kịch bản cá nhân: Leo chơi game PC và muốn agent hỗ trợ mod thử nghiệm. Limix Bot nên đóng vai "tư vấn route + giải thích skill" thay vì trực tiếp chạy `um` trừ khi có quyền shell trên máy Leo. Khuyến nghị: chỉ kích hoạt theo yêu cầu cụ thể từng lần mod.
