---
name: geo-sleuth
description: Skill định vị ảnh chụp bằng agent — đưa cho agent một bức ảnh và bảo "tìm nơi này được chụp ở đâu", nó trả về tọa độ máy ảnh (kèm bán kính sai số), hướng ống kính và ảnh bằng chứng vệ tinh, giải trình từng bước bằng file lệnh đã chạy. Dữ liệu OpenStreetMap, độ cao địa hình, tile vệ tinh và street view thay cho chữ trong ảnh: khoảng cách mố cầu làm thước đo, bóng đổ làm la bàn, đường viền núi khớp với dữ liệu elevation. Chạy với Claude Code, Codex, Cursor, Gemini CLI, OpenCode, GitHub Copilot.
license: MIT
compatibility: Python ≥ 3.10 + uv + curl; agent chạy được shell; reverse image search cần Chrome/Playwright Chromium; match.py/sat_scan.py dùng torch (CUDA/MPS/CPU)
version: 2026-11-12
---

# geo-sleuth (Việt hóa)

> Nguồn gốc: https://github.com/Oldcircle/geo-sleuth — MIT. Bản gốc tiếng Anh xem `SKILL.en.md`; phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì
Từ **một tấm ảnh** (không cần chữ, biển số, mốc lịch sử trong khung hình), agent tìm **nơi chụp**: tọa độ máy ảnh ± bán kính sai số, hướng ống kính, và ảnh bằng chứng vệ tinh. Mọi kết luận phải trỏ về lệnh đã chạy trong session và file nó tạo ra — "dân số và độ nổi tiếng không phải bằng chứng".

Ví dụ từ repo (ảnh không có EXIF, không chữ):
- Ruộng lúa + cầu cạn: 27.335 đoạn cầu sắt OSM → 171 điểm → 14.372 vị trí camera khớp skyline → 22 → 1 → **±2 m** (Qingyuan, Quảng Đông).
- Đồi cát + dãy núi: giải thêm góc nghiêng máy 1° → **87 m** sau 32 phút (chạy mù, chỉ được gợi ý "ở Trung Quốc").
- Cây anh đào Vancouver: dữ liệu cây đường phố của thành phố + bóng đổ + độ dốc + street view → **±3 m**.

## Cài đặt
```bash
npx skills add Oldcircle/geo-sleuth
# hoặc một lệnh cho 6 agent:
npx skills add Oldcircle/geo-sleuth -g -a claude-code -a codex -a cursor -a gemini-cli -a opencode -a github-copilot -y
```
Yêu cầu Python 3.10+, `uv`, `curl`. Mỗi script tự khai báo dependency, dùng `uv run` (cài lần đầu tự động). Reverse image search cần Chrome hoặc Playwright Chromium (`uvx playwright install chromium`). Đầu tiên nên bảo agent chạy `doctor.py` từ `scripts/` của skill đã cài để kiểm tra môi trường (thêm `--network` để dò dịch vụ ngoài, không upload ảnh).

## Cách dùng
Đưa ảnh cho agent và nói:
> find where this photo was taken

Cơ chế 3 tầng:
| Tầng | Ai | Vai trò |
|---|---|---|
| **Quyết định** | scripts (`board.py`) | bảng ứng viên: manh mối, tỷ số likelihood, loại trừ, xếp hạng, thứ tự quét |
| **Nhận biết** | scripts + người | OCR, tra bảng manh mối, tìm mục tiêu trong tile vệ tinh (CLIP), so street view (DINOv2 + SIFT) |
| **Phán đoán** | model | đọc manh mối từ khung hình, đề xuất giả thuyết, chọn giữa vài kết quả top |

~20 script, mỗi cái một việc: `intake.py` (metadata + OCR + tìm ảnh ngược), `sun.py` (bóng đổ → thời điểm, hướng phố), `osm.py` (Overpass), `terrain.py` (skyline/ridge fit, giải cả roll), `match.py`, `gsv.py`/`baidu_pano.py`, `evidence.py` (ảnh bằng chứng: tile vệ tinh + quạt nhìn + lưới so sánh). Lỗi sai thường gặp: HTTP 403/429 hoặc CAPTCHA (xem ảnh chụp, thử lại sau), lần đầu tải model ~2,4 GB.

## Điểm mạnh
- Phương pháp định lượng đúng: "scripts xếp hạng, model chỉ phán xét" — giảm ảo tưởng của LLM; mọi kết luận gắn bằng chứng file.
- Tài liệu benchmark theo từng script + 2 case chạy mù với kết quả đo được (87 m / 3 m).
- Một skill chạy được ở 6 agent; chuẩn Agent Skill hoàn chỉnh (SKILL.md + scripts + references + data).
- Cảnh báo dùng có trách nhiệm rõ ràng: chỉ dùng ảnh của mình hoặc được phép phân tích, không dùng để tìm người không đồng ý.

## Điểm yếu
- Nặng về hạ tầng: Python, uv, Playwright, torch, model 2,4 GB; một case chạy mất 30–70 phút.
- Phụ thuộc dịch vụ ngoài (OSM Overpass, Baidu/Yandex reverse search, street view) — có thể gặp CAPTCHA/429.
- Dùng để định vị ảnh — tự nhiên có rủi ro quyền riêng tư; chỉ dùng cho ảnh hợp pháp/được phép.
- Chưa có CI Linux/Windows; bộ test mù công khai chưa có.

## Phù hợp với Limix Bot
Khá đặc thù nhưng có chỗ đứng: xác minh ảnh người dùng đưa (khi có quyền hợp lệ), nghiệp vụ điều tra/truy vết thông tin, hoặc demo năng lực agent trong dự án Skills của Limix. **Không dùng cho ảnh riêng tư của người khác**; chỉ chạy khi người dùng là chủ ảnh hoặc được phép. Chạy trong thread riêng vì thời gian giải dài.

## An toàn
Kèm nhiều script Python (cài bằng uv), gọi dịch vụ công khai (OSM, tile, reverse search) — có CAPTCHA/403 khi bị chặn. Repo tuyên bố rõ responsible-use. Theo quy tắc hub: **kèm tool → review-required**, chủ bot quyết bật; tuyệt đối không dùng để giám sát cá nhân.
