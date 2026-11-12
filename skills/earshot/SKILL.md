---
name: earshot
description: "Cung cấp khả năng thẩm âm cho AI Agent: đánh giá, lựa chọn, cắt tỉa, xác minh và so sánh âm thanh khi agent không thể tự nghe — chọn hiệu ứng âm thanh SFX, nhạc nền, tìm khoảnh khắc sạch nhất trong bản ghi, phân biệt âm thanh thu thực tế hay tổng hợp bằng code (p_real), kiểm tra đồng bộ âm thanh - video (sync, LUFS, dBTP), tạo âm thanh từ code và thư viện SFX tích hợp."
---

# earshot: Đôi tai cho AI Agent

Bạn không thể tự nghe bằng tai. Tuyệt đối không bao giờ nhận định một đoạn âm thanh "nghe hay" hoặc "rất phù hợp" nếu không có số liệu đo lường cụ thể từ earshot bảo chứng (ví dụ trích dẫn: *"khớp tốt, z +3.9; p_real 0.96; -14.2 LUFS"*).

earshot chạy hoàn toàn cục bộ trên CPU máy tính (dữ liệu âm thanh không bao giờ rời khỏi máy) và lưu bộ đệm (cache) cho mọi kết quả nhúng và phân tích trên đĩa cứng.

## Cài đặt (Một lần duy nhất)

```bash
pip install -e "/đường-dẫn/tới/earshot[mcp,llm]"
earshot doctor  # Kiểm tra các gói phụ thuộc, ffmpeg và các mô hình âm học
```

Hai cách thức gọi:
- **CLI:** `earshot <lệnh> ... [--json] [--out kết_quả.json]`
- **MCP Server (Mô hình nạp sẵn trên bộ nhớ):** Cấu hình MCP server trong ứng dụng của agent để gọi các công cụ: `measure`, `describe`, `match`, `rank`, `find`, `compare`, `ab`, `realness`, `timeline`, `sheet`, `critique`, `sfx_list`, `sfx_render`.

---

## 5 Vòng lặp ứng dụng

### Vòng lặp 1: Lựa chọn tài nguyên âm thanh (SFX / Nhạc nền)
1. `earshot rank "tiếng gõ nhẹ bằng vồ nỉ vào khối gỗ" downloads/sfx/ --top 5`: Lọc ra danh sách 5 ứng viên hàng đầu từ thư mục âm thanh thô.
2. `earshot find winner.ogg "tiếng gõ búa đơn lẻ rõ nét" --top 3`: Tìm chính xác khoảnh khắc tốt nhất trong file để cắt (thời điểm bắt đầu / kết thúc tính bằng giây).
3. `earshot describe winner.ogg --start 1.12 --end 1.48`: Đo lường đặc tính âm học thực tế (độ dốc tấn công attack / phân rã decay).
4. `earshot realness winner.ogg --start 1.12 --end 1.48`: Đo lường chỉ số `p_real` (xác suất âm thanh thu âm thực tế so với âm thanh tổng hợp bằng code). Khi người dùng yêu cầu âm thanh chuyên nghiệp, không chọn các mẫu có p_real quá thấp ("likely code-synthesized").
5. `earshot ab a.ogg b.ogg --query "tiếng rít gió lướt nhanh sắc nét"`: So sánh đối đầu giữa 2 file ứng viên.

### Vòng lặp 2: Đánh giá bản phối âm hoặc âm thanh phim (Mix & Soundtrack Review)
1. `earshot timeline film.mp4 --cues cues.json`: Xuất bảng dòng thời gian nghe: các sự kiện âm thanh, mức âm lượng, phân đoạn, đường cong độ lớn (loudness curve) và độ lệch đồng bộ hình-tiếng (`offset_ms` giữa hình ảnh và âm thanh).
2. `earshot sheet film.mp4 -o sheet.png`: Xuất ra file ảnh PNG phân tích trực quan kết hợp: khung hình video, biểu đồ phổ tần (spectrogram), mức LUFS, nhịp beat và các điểm cắt cảnh được đánh dấu màu theo độ lệch đồng bộ (xanh lá = chuẩn từng frame, vàng = lệch dưới 100ms, đỏ = thiếu tiếng). **Agent mở ảnh PNG này bằng công cụ đọc ảnh để nhìn thấy toàn bộ cấu trúc âm thanh**.
3. `earshot critique film.mp4`: Bảng điểm đánh giá đối chiếu với tiêu chuẩn âm thanh của các video quảng bá chuyên nghiệp (phân loại: đạt chuẩn phát hành / suýt soát / cần sửa gấp).
4. `earshot measure mix.wav`: Đo lường chính xác các chỉ số kỹ thuật: LUFS tích hợp, đỉnh thực tế true peak dBTP, dải động âm lượng LRA, ngưỡng ồn nền noise floor.

### Vòng lặp 3: So sánh A/B khi tinh chỉnh (A/B a change)
- `earshot ab before.wav after.wav --query "tiếng kick ấm và có lực"`: Chỉ ra chính xác bản sau khác bản trước ở đâu bằng từ ngữ định lượng (lớn hơn bao nhiêu dB, sáng hơn ở dải tần nào, đuôi vang dài hơn bao nhiêu giây).

### Vòng lặp 4: Tạo âm thanh bằng code (earshot forge)
Dùng khi người dùng muốn tự tay tổng hợp âm thanh bằng thuật toán: agent viết code tổng hợp mẫu, gọi earshot đo lường và cải thiện dần thông số theo vòng lặp phản hồi.

### Vòng lặp 5: Sử dụng ngân hàng âm thanh có sẵn (Sound Bank)
Khai thác kho hiệu ứng âm thanh phong phú tích hợp sẵn (`sfx_list`, `sfx_render`) mà không cần nạp mô hình nặng.
