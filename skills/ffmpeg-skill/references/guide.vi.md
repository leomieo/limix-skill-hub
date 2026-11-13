# ffmpeg-skill — hướng dẫn tiếng Việt

Sửa video và âm thanh bằng FFmpeg cục bộ — cắt, ghép, đổi khung hình, đổi tốc độ, phụ đề (kể cả karaoke highlight), overlay, xóa khoảng lặng, đồng bộ, chuẩn hóa loudness (LUFS), HDR→SDR, xuất bản theo từng nền tảng và kiểm tra kết quả. 42 tool Python thuần (chỉ thư viện chuẩn, không cloud, không API key) dạy agent quy trình cố định probe → sửa ít phá hủy nhất → check → verify, tự đo lại file đầu ra thay vì tin lời của chính mình. Cần FFmpeg 6.1+ và Python 3.10+. Dùng bất cứ khi nào người dùng nhắc file video/âm thanh (mp4, mov, wav, m4a), footage, phụ đề, reel/short, xuất YouTube/TikTok, LUFS hoặc ffmpeg — dù không nói chữ "sửa".

## Cách dùng

- Gọi kỹ năng bằng tên gốc `ffmpeg-skill` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng ffmpeg-skill cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **quarantined**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/kajisho5/ffmpeg-skill — commit `92dabd8372dafd033055a3b22d3fb71b39ac3cfd`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
