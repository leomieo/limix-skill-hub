---
name: universal-modder
description: Hệ 13 skill + CLI `um` + MCP fal giúp mọi AI coding agent (Claude Code, Codex, Cursor, Gemini CLI, Copilot, OpenCode) mod gần như bất kỳ game PC người dùng sở hữu: recon engine/chống gian lận, chọn route, dựng lab an toàn (backup save), đọc code thật, build từng "vertical slice" chạy được, tạo asset bằng fal, xác minh ngay trong game thật, quay video trình diễn và ghi field note vào knowledge base cho agent sau. Skill chính là mod-any-game. Dùng khi người dùng muốn mod, mở rộng, reverse-engineer hoặc mashup game ("thêm nuke vào Terraria", "làm văn minh mới cho Age of Empires II", "đưa Minecraft vào GTA V", "game này mod được không?").
license: MIT
compatibility: Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, OpenCode
version: 2026-11-12
---

# Universal Modder (Việt hóa)

> Nguồn gốc: https://github.com/rehan-remade/universal-modder - MIT © 2026. Bản gốc tiếng Anh của skill chính (`mod-any-game`) xem `SKILL.en.md` trong thư mục này; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Đưa AI coding agent thành "modder game PC chuyên nghiệp": từ một ý tưởng ("thêm tên lửa tự tìm mục tiêu vào Terraria") đi hết vòng đến mod **chạy thật trong game, có video ghi lại**. Agent tự: tìm game cài trên máy, nhận diện engine và route mod, dựng môi trường thí nghiệm an toàn (backup save trước khi đụng vào), đọc code thật của game, build một phần chạy được, sinh asset 2D/3D/âm thanh bằng fal, kiểm chứng ngay trong game đang chạy, cắt video trình diễn và đóng gói.

Quy trình chuẩn 10 bước của skill `mod-any-game`:
1. tìm kiếm trong knowledge base trước khi bắt đầu;
2. recon, chọn route;
3. dựng lab an toàn (save đã backup);
4. đọc code thật của game;
5. build một slice chạy được;
6. sinh asset;
7. xác minh trong game thật;
8. ghi hình;
9. đóng gói;
10. viết field note cho agent sau.

## Cài đặt
```sh
# Claude Code (plugin marketplace)
/plugin marketplace add rehan-remade/universal-modder
/plugin install universal-modder@universal-modder

# Codex
codex plugin marketplace add rehan-remade/universal-modder
codex plugin add universal-modder@universal-modder

# Gemini CLI
gemini extensions install https://github.com/rehan-remade/universal-modder

# Skills only (mọi agent)
npx skills add https://github.com/rehan-remade/universal-modder
```
Yêu cầu: Git, Python 3.10+, ffmpeg; khuyến nghị `uv`; Blender cần cho render 3D → sprite. Game Windows chạy natively hoặc từ WSL.

## CLI `um` — bộ công cụ chính
| Nhu cầu | Lệnh |
|---|---|
| Game nào cài sẵn, engine gì, anti-cheat gì, save ở đâu | `um scan --list`, `um scan "<game>"` |
| Sprite, texture, PBR, 3D, âm thanh, nhạc, giọng, video (fal) | `um fal <recipe>` hoặc MCP fal |
| Cắt / fit / pixelate / pack sprite; render 3D → sprite | `um sprite ...`, `um render3d ...` |
| Khởi động, chụp màn hình, click/gõ, ghi hình game Windows | `um win ...` |
| Backup save trước khi sửa; hoàn tác | `um backup create/diff/restore` |
| Cắt video trình diễn | `um video contact/compile/mux` |
| Lint mod trước khi chia sẻ (file game, code decompile, secrets) | `um publish check` |

## Knowledge base do AI viết cho AI
Thư mục `knowledge/` chứa **field notes**: cách game nào đó đã được mod thật — phiên bản chạy được, route và lý do, engine thực sự hoạt động ra sao, cách xác minh, và các bẫy (triệu chứng → nguyên nhân → cách sửa). Mỗi agent kết thúc một mod có thể mở PR đóng góp note, để agent sau khởi đầu từ nơi agent trước dừng lại:
```sh
um kb search "grand theft auto"              # xem prior art trước khi làm
um kb new --game "Hades II" --title "A new boon god" --from-scan hades --agent "Codex"
um kb check knowledge/games/hades-ii/a-new-boon-god.md
um kb pr knowledge/games/hades-ii/a-new-boon-god.md --yes    # sau khi người dùng đồng ý
```

## Điểm mạnh / lưu ý
- **Mạnh:** hệ skill hoàn chỉnh nhất hiện nay về mod game (13 skill: recon, reverse-engineering, fal-assets, asset-pipeline, game-automation, mashup-mods, port-a-mod, publish-mod, showcase-video…); cộng đồng lớn, cực nóng tăng sao; chuẩn Agent Skills đa agent; có quy tắc đạo đức rõ (không ship file game, không code decompile, không cheat người chơi khác).
- **Lưu ý:** cần game cài sẵn trên máy, phải có giấy phép game; asset qua fal cần `FAL_KEY` (dùng `um fal key set`, đừng export trong shell profile); là skill kèm nhiều tool/script nên luôn ở trạng thái cần bot xem xét trước khi cài.
