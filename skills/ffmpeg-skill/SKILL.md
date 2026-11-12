---
name: ffmpeg-skill
description: Sửa video và âm thanh bằng FFmpeg cục bộ — cắt, ghép, đổi khung hình, đổi tốc độ, phụ đề (kể cả karaoke highlight), overlay, xóa khoảng lặng, đồng bộ, chuẩn hóa loudness (LUFS), HDR→SDR, xuất bản theo từng nền tảng và kiểm tra kết quả. 42 tool Python thuần (chỉ thư viện chuẩn, không cloud, không API key) dạy agent quy trình cố định probe → sửa ít phá hủy nhất → check → verify, tự đo lại file đầu ra thay vì tin lời của chính mình. Cần FFmpeg 6.1+ và Python 3.10+. Dùng bất cứ khi nào người dùng nhắc file video/âm thanh (mp4, mov, wav, m4a), footage, phụ đề, reel/short, xuất YouTube/TikTok, LUFS hoặc ffmpeg — dù không nói chữ "sửa".
license: MIT
compatibility: FFmpeg 6.1+ | Python 3.10+ chỉ dùng thư viện chuẩn | Claude Code, Cursor, Codex, MCP client bất kỳ
version: 2026-11-12
---

# ffmpeg-skill (Việt hóa)

> Nguồn gốc: https://github.com/kajisho5/ffmpeg-skill — MIT. Bản gốc tiếng Anh xem `SKILL.en.md` (trích từ `skills/ffmpeg-skill/SKILL.md` của repo gốc); phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Biến agent thành một **trình dựng video chạy trên máy bạn**: 42 công cụ gọi `ffmpeg`/`ffprobe` làm thật mọi việc — cắt, ghép, bỏ khoảng lặng, fit đúng thời lượng và tỉ lệ khung, phụ đề động (kể cả karaoke từng chữ), overlay và motion graphics, HDR → SDR, xuất template cho từng nền tảng (YouTube/TikTok/Reels), rồi **tự kiểm tra** file kết quả bằng số đo lại chứ không tự tin miệng.

## Cài đặt / dùng thế nào
```sh
npx ffmpeg-skill
```
Cần FFmpeg 6.1+ (đã test trên 6.1, 7.1, 8, 9 trong CI) và Python 3.10+; chỉ dùng thư viện chuẩn, không pip install gì thêm. Có bản MCP server (`tools/list` hiện 12 tool lõi) và bản npm `ffmpeg-skill`.

Cài như Agent Skill cho Claude Code/Codex: copy `skills/ffmpeg-skill/` (hoặc cả repo) vào `~/.claude/skills/`. Mọi lệnh chạy dạng `python3 <skill-dir>/scripts/<tên>.py`; `--help` liệt kê hết flag.

Ví dụ:
```sh
python3 scripts/probe.py INPUT.mp4 --json          # đo trước, lập kế hoạch từ số thật
python3 scripts/cut.py INPUT.mp4 --start 10 --end 40 --json
python3 scripts/caption.py --animate pop --karaoke
python3 scripts/fit.py --aspect 9:16 --fit crop    # 16:9 -> 9:16
python3 scripts/silence.py --threshold -35
python3 scripts/loudness.py -I -14 --tp -1
python3 scripts/check.py OUTPUT.mp4 --platform tiktok --expect-identity S:M
```

## Quy trình (theo thứ tự)
0. **Doctor chỉ khi lỗi**: sau `kind: missing_tool` hoặc lỗi ffmpeg, chạy `scripts/_contract.py doctor`.
1. **Probe trước khi lập kế hoạch** (`probe.py`) — tin số đo, không tin phỏng đoán.
2. **Ưu tiên lossless**: không re-encode khi cắt/remux/đổi âm thanh là đủ.
3. **`--dry-run --json` rồi mới chạy**; tin số trong `--json`, đừng tin dòng summary.
4. **Chuỗi**: màu → cut → join → silence → fit → caption/overlay → sync → audio → loudness → export. Yêu cầu giao bài là một `render.py --template`; 3 bước trở lên là một `render.py` project.
5. **Check** bằng `check.py OUTPUT --platform X --expect-identity S:M` — sửa từng dòng lệch định dạng; chỉ sửa duration/aspect/fps/loudness khi yêu cầu đòi hỏi.
6. **Verify** từ probe của tool viết file: exit 0 và đủ số yêu cầu mới là thành công.
7. **Giữ bản gốc**: không bao giờ đè file nguồn; `--overwrite` chỉ cho file do chính job tạo.

## Điểm mạnh
- 42 tool có "hợp đồng máy đọc được" (machine-readable contract) + MCP server — agent biết chính xác mỗi tool nhận gì, trả gì.
- Tự kiểm chứng: check + verify đo lại file đầu ra, bắt lỗi thay vì mặc nhận thành công.
- CI thật: test trên 4 phiên bản FFmpeg, OpenSSF Scorecard, demo trước/sau có lệnh chính xác kèm theo, tái dựng được từ `demos/build.py`.

## Điểm yếu / rủi ro
- Cần FFmpeg cài sẵn trong máy (hub chỉ tải file dưới dạng văn bản + băm SHA-256; tool không tự cài, bot bật tay).
- Dùng nhiều số liệu chuyên môn (LUFS, HDR→SDR) — yêu cầu nên kèm thông số rõ, nếu không tool tự chọn mặc định.
- Script chạy cục bộ trên file của bạn: chỉ dùng cho video mà Leo có quyền xử lý.

## Độ phù hợp với Limix Bot
Cao: mọi yêu cầu "cắt/nén/đổi tỉ lệ video, thêm phụ đề, xuất video cho TikTok" đều chạy được ngay khi máy có ffmpeg; bot có shell nên gọi trực tiếp. Skill kèm script → review-required theo quy tắc hub.
