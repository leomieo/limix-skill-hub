---
name: instagram-agent-skill
description: 13 skill điều hành một tài khoản Instagram bằng agent — viết Reels từ 26 công thức hook (chấm điểm trước khi quay), tìm reel viral trong ngách và xếp hạng theo bội số, linter caption, score profile theo rubric 100 điểm, kế hoạch tuần, humanizer tẩy "AI slop". MIT, không cần đăng ký, không cần API key. 5 tool Python chạy cục bộ (hookscore.py, beats.py, caption.py, humanize.py, detect.py, swipe.py). KHÔNG tự đăng bài — mọi thứ kết thúc bằng bản copy, người dùng tự đăng. Dùng khi người dùng cần nội dung Instagram: "viết reel", "caption này ổn chưa", "score profile của tôi", "kế hoạch tuần".
license: MIT
compatibility: Claude Code / Codex (cần python3 cho 5 tool chạy cục bộ) | hoạt động cả dạng dán SKILL.md vào chat nhưng mất 5 tool | đọc file voice.md của người dùng
version: 2026-11-12
---

# Instagram agent skill (Việt hóa)

> Nguồn gốc: https://github.com/Jakeschincariol/instagram-agent-skill — MIT. Bản gốc tiếng Anh xem `SKILL.en.md` (trích từ README gốc); phân tích chi tiết xem `PHAN-TICH.md`.

## Dùng để làm gì

13 skill chạy một tài khoản Instagram: một cái viết Reels từ **26 công thức hook** và **chấm điểm hook trước khi bạn tốn một lần quay**; một cái tự đi tìm những reel đang chạy tốt trong ngách của bạn và xếp hạng theo mức mỗi reel vượt qua chính median của tài khoản đó; một cái viết caption và chỉ chính xác phần feed hiển thị trước dấu "... more"; một cái chấm điểm profile của bạn theo thang 100 và viết lại những phần bị mất điểm; một cái lên kế hoạch tuần.

Và một cái là **humanizer** — lý do khiến các skill còn lại dùng được: nó tẩy gạch ngang em dash, từ vựng "slop" và các ký tự watermark vô hình khỏi bản nháp, rồi chấm điểm phần còn lại qua bảng 5 kiểm tra trước khi bạn nhìn thấy.

**Không có gì được đăng cho đến khi bạn gật đầu.** Các skill chỉ viết. Bạn là người đăng.

## Cài đặt / dùng thế nào

Dán vào Claude:

```
https://github.com/Jakeschincariol/instagram-agent-skill

Install this skill, then confirm /ig-reel works.
```

Hoặc tự làm trong Claude Code:

```bash
git clone https://github.com/Jakeschincariol/instagram-agent-skill.git
cp -r instagram-agent-skill/skills/ig-* ~/.claude/skills/
```

Hoặc cài dạng plugin:

```
/plugin marketplace add Jakeschincariol/instagram-agent-skill
/plugin install instagram-agent
```

Cài theo dự án thay vì toàn cục: copy các thư mục tương tự vào `.claude/skills/` của repo. Không có Claude Code? Dán một file `SKILL.md` bất kỳ lên đầu đoạn chat — nó chạy như một chế độ, nhưng bạn mất 5 tool Python (là phần cốt lõi của `/ig-reel` và `/ig-human`).

Sau đó dành 10 phút cho `templates/voice.md`: copy sang `~/.claude/instagram/voice.md` và điền vào, hoặc gửi cho Claude 3 reel của chính bạn và nói "write my voice.md from these". Mọi skill đều đọc file này.

## 13 lệnh

| Lệnh | Làm gì |
|---|---|
| `/ig-reel` | Một ý tưởng thành một Reel. Ba hook từ 26 công thức (`skills/ig-reel/hooks.json`), chấm điểm, rồi script, chữ trên màn hình và bảng beat có mốc thời gian. |
| `/ig-viral` | Đi tìm cái đang chạy trong ngách của bạn, xếp theo bội số trên median từng tài khoản, gọi tên công thức, ghi swipe file. |
| `/ig-caption` | Caption có kiểm tra lint. Hiện đúng 125 ký tự mà feed thực sự hiển thị trước khi người xem chạm. |
| `/ig-carousel` | Bài lướt qua: bìa đáng để lướt, chữ từng slide, file 1080x1350. |
| `/ig-story` | Chuỗi story hằng ngày, sticker nào làm nhiệm vụ nào, và phễu DM bắt đầu từ người kia nhắn trước. |
| `/ig-profile` | Chấm profile theo rubric 12 phần (`skills/ig-profile/rubric.json`) trên thang 100, viết lại theo thứ tự "sửa trước". |
| `/ig-plan` | Cả tuần: đăng gì, format nào, lúc nào, và 10 tài khoản nên tương tác. |
| `/ig-human` | Humanizer. Hai script thật sự chạy. Xem dưới. |
| `/ig-comment` | Bình luận bài của người khác. 9 kiểu, chọn theo loại bài thật sự. Không bao giờ "🔥🔥🔥". |
| `/ig-reply` | Thread dưới bài của bạn. Phân loại keyword / lead / substance / question / support / noise, viết theo thứ tự đó. |
| `/ig-dm` | Trả lời tự động theo keyword, tin nhắn đầu, pitch hợp tác, và hai lần follow-up. Hai thôi. |
| `/ig-repurpose` | Một video/podcast/newsletter thành một tuần reel + carousel, mỗi cái tự đứng được. |
| `/ig-audit` | Mổ xẻ những gì đã đăng. Xếp theo bội số outlier, gửi theo reach chứ không theo views. |

## 5 tool chạy thật (không phụ thuộc, không network, chạy trên máy bạn)

```bash
python3 hookscore.py hooks.txt              # xếp hạng các phương án hook
python3 beats.py script.txt --target 30     # định thời trước khi quay
python3 caption.py caption.txt --keywords "..."   # preview 125 ký tự + lint caption
python3 humanize.py draft.txt --report      # dọn sạch, hiện từng thay đổi
python3 detect.py draft.txt                 # chấm điểm 5 kiểm tra "độ người"
python3 swipe.py captured.tsv --out ~/.claude/instagram/swipe.md  # xếp hạng outlier
```

- `hookscore.py`: bảng 5 thuộc tính hook (đầu ra như `-> 85.6 STRONG ...`, kèm dealbreaker cho hook yếu).
- `beats.py` ước tính từng line nói mất bao lâu, xếp thành timecode, và gắn cờ 4 thứ giết một Reel khi dựng: hook quá 3 giây, beat đủ dài để người xem bỏ đi, chuỗi line không có gì cụ thể, và không lặp về line đầu (loop).
- `caption.py`: Instagram chỉ cho caption khoảng **125 ký tự** trong feed; tool in ra đúng cửa sổ đó như một người lạ đang lướt đọc, kiểm tra hashtag (cap hiện tại **5 bài một**, không phải 30), hook có con số/tên cụ thể, một CTA duy nhất.
- `humanize.py`/`detect.py`: bỏ ký tự vô hình (zero-width, BOM, tag Unicode...), sửa typography (em dash → phẩy), thay 154 từ cụm "slop" bằng cách viết thường (`skills/ig-human/slop.json`, bạn được phép sửa); phần "cờ chứ không sửa tự động": "It's not just X, it's Y", quy tắc ba, emoji list, hashtag wall... những cấu trúc cần phán đoán nên đưa về cho agent viết lại.
- `swipe.py`: view thô không phải bằng chứng — tài khoản 2 triệu follower đạt 400k view chỉ là một ngày bình thường; tài khoản 4k follower đạt 400k view là đã tìm ra điều gì đó. Xếp hạng theo **bội số trên median của chính tài khoản đó**.

## Kết quả đo được (phần đáng đọc nhất)

Tác giả đã test hook scorer trên **74 hook short-form thật**:
1. **Bắt hook tốt rất tốt** — với 10 hook cố ý viết tệ: AUC 0,83.
2. **Không chọn được hook thắng** — tách hit/miss của cùng một creator: **AUC 0,56 (gần như tung đồng xu)**. Cách dùng trung thực: giết hook yếu hiển nhiên trước khi quay, rồi tin vào biểu đồ retention của chính bạn.
3. Formula classifier từng hỏng và chính bài test phát hiện: regex `match` chỉ khớp **8%** hook thật; viết lại theo lời nói phiên transcript lên **49%**, phần còn lại tool từ chối đoán (đúng).

## Giới hạn — phần trung thực

- **Không đăng lên Instagram.** Đăng tự động (browser automation, tool thứ ba) vi phạm Điều khoản Instagram và bị action-block. Mọi skill kết thúc bằng một block copy — và bạn là người đăng. Ngoại lệ duy nhất: auto-reply theo keyword trong DM mà Instagram chính thức hỗ trợ.
- **`/ig-viral` chỉ đọc, không scrape**: ~10 tài khoản với tốc độ người thật, bạn tự lái browser, không bao giờ hỏi mật khẩu.
- **5 kiểm tra detect là heuristic cục bộ**, không phải API của GPTZero/Turnitin — không hứa verdict của dịch vụ đó, và không ai bán "undetectable" một cách trung thực.
- **Không bịa số liệu**: thiếu số thì trả về `{{your number}}` kèm cờ, mọi lần.
- **Số trên nền tảng hết hạn**: cap hashtag 30 → 5 (12/2025) là ví dụ; nếu repo nói khác Instagram hiện tại, Instagram đúng.
