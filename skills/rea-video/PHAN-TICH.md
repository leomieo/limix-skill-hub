# Phân tích: rea-video (JuneYaooo/rea-video)

## Thông tin (đo qua GitHub API ngày 12/11/2026, lần chạy 5/30)
- **Repo gốc:** https://github.com/JuneYaooo/rea-video
- **Sao:** 7.410 | **Ngày tạo:** 29/10/2026 | **Push gần nhất:** 12/11/2026
- **Giấy phép:** Apache-2.0 | **Tác giả:** JuneYaooo

## Lý do chọn
- 7.410★ chỉ sau 2 tuần ra mắt (tạo ngày 29/10/2026), là một trong những repo skill tăng trưởng sao nhanh nhất trên GitHub.
- Lấp đầy nhu cầu thực tế rất lớn: khi người dùng đưa một video tham khảo triệu view và muốn "làm một clip giống hệt", các agent hiện tại thường chỉ phỏng đoán chung chung. rea-video cung cấp bộ khung phân tích chuẩn mực từ 11 loại footage, phát hiện chỉnh sửa AI, dòng thời gian chữ/sticker đến bóc tách âm thanh vocal/BGM.
- Hỗ trợ đa ngôn ngữ (--lang en, zh) và kiến trúc chia nhỏ dữ liệu `VIDEO.md` giúp agent đọc siêu tiết kiệm token (~2k token thay vì nạp file json hàng chục nghìn dòng).

## Làm gì
Bộ công cụ phân tích ngược video: bóc tách video tham khảo thành 3 tầng dữ liệu:
1. Tầng hình ảnh cơ sở: nhận diện 11 nguồn hình ảnh (live action, 3D CGI, 2D animation, AI video, screencast...) và các can thiệp AI (face-swap, lip-sync, stylize).
2. Tầng đóng gói đồ họa: trích xuất dòng thời gian phụ đề, từ khóa nổi bật, nhãn dán, hiệu ứng chuyển cảnh.
3. Tầng âm thanh: tách riêng giọng nói (vocals) và nhạc nền (music), phát hiện hiệu ứng âm thanh khớp vào từng nhịp chuyển động.
Cuối cùng đưa ra bản kế hoạch tái hiện (Remake Blueprint) chi tiết cho từng cảnh.

## Điểm mạnh
- Cực kỳ toàn diện: kết hợp cả thị giác máy tính, nhận diện ký tự (OCR), tách âm thanh (audio stem separation) và mô hình đa phương thức (VLM).
- Quy trình kiểm định độc lập (`apply-review`): agent có thể xem ảnh để sửa đổi và bổ sung phán đoán của công cụ, không bị phụ thuộc một chiều vào máy móc.
- Giấy phép Apache-2.0 hoàn toàn mở.

## Điểm yếu / rủi ro
- Phụ thuộc môi trường: cần Python ≥ 3.10 và ffmpeg cài sẵn trên máy.
- Với các video dài hoặc độ phân giải cao, việc tách stem và cắt frame đòi hỏi thời gian xử lý và dung lượng đĩa nhất định.

## Độ phù hợp với Limix Bot
Rất cao: Limix Bot thường xuyên tiếp nhận yêu cầu phân tích nội dung truyền thông, giải thích video và lên ý tưởng sản xuất video marketing/giải thích. Trạng thái: review-required (do có CLI tool Python).
