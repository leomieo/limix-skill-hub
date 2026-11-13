<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: ffmpeg-skill (kajisho5/ffmpeg-skill)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 3/30)
- **Repo gốc:** https://github.com/kajisho5/ffmpeg-skill
- **Sao:** 5.170 | **Ngày tạo:** 03/09/2026 | **Push gần nhất:** 12/11/2026
- **Giấy phép:** MIT | **Tác giả:** kajisho5

## Lý do chọn
- 5.170★ — cao điểm nhất trong nhóm skill "tiện dụng hằng ngày", và vẫn push lại đúng hôm chạy (12/11/2026) — dự án còn sống và chăm chút.
- Lấp trống đúng nhu cầu lặp lại của bot: sửa video cục bộ mà không cần cloud, không API key.
- Chất lượng kỹ thuật nổi bật nhất trong toàn bộ ứng viên: CI test trên 4 phiên bản FFmpeg, OpenSSF Scorecard, machine-readable contract, npm + MCP server.

## Làm gì
42 tool Python thuần gọi ffmpeg/ffprobe: cắt, ghép, đổi khung hình/tốc độ, phụ đề động + karaoke, overlay, xóa khoảng lặng, đồng bộ, chuẩn hóa loudness, HDR→SDR, template xuất theo nền tảng, rồi `check`/`verify` đo lại file đầu ra. Quy trình cố định: probe → ưu tiên lossless → `--dry-run --json` → chạy chuỗi → check → verify → giữ bản gốc.

## Điểm mạnh
- Tự kiểm chứng là triết lý thật, không khẩu hiệu: file kết quả được đo lại bằng probe, lệch một dòng cũng bị bắt.
- `--dry-run` + `--json` giúp agent lập kế hoạch và báo cáo trung thực; `--timeout` mặc định 1800s chống treo.
- Demo trước/sau đều sinh từ script, ai cũng tái dựng được.

## Điểm yếu / rủi ro
- Phụ thuộc ffmpeg cài sẵn — hub không tự cài tool; bot cần shell và ffmpeg trên PATH.
- Số tool nhiều dễ gây quá tải; nhờ router dạng bảng + `--help` nên vẫn dùng được từng tool lẻ.
- Chỉ xử lý file mà người dùng có quyền — lưu ý bản quyền footage.

## Độ phù hợp với Limix Bot
Cao: máy Leo đã có ffmpeg (dùng cho các task media trước nay); skill giúp bot lần đầu có một quy trình dựng video có kỷ luật thay vì ghép lệnh tay. Skill kèm script → review-required.
