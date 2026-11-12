---
name: digital-human-koubo
description: "Sản xuất video người ảo (digital human) dạng nói chuyện (talking head) chuyên nghiệp từ ảnh chân dung: tích hợp Renoise MCP sinh chuyển động và khẩu hình, 5 phong cách dựng biên tập (giải thích kiểu Tiểu Lâm, video ngắn hoa tự, bản tin phát hành, hướng dẫn chi tiết, đa ngôn ngữ), 48 linh kiện đồ họa đóng gói chuẩn creator (chữ chìm sau người, bằng chứng ảnh chụp, bản đồ, bình luận, đinh số hook), cắt đoạn 15s tự động, sửa phát âm không mất khẩu hình và tự tạo ảnh bìa tích hợp khung đầu."
---

# digital-human-koubo: Kỹ năng sản xuất video người ảo nói chuyện

Bộ kỹ năng chuyên sâu để agent tự động hóa quy trình sản xuất video thuyết minh từ hình ảnh đại diện (avatar digital human) với tiêu chuẩn phát sóng chuyên nghiệp.

## Các quy tắc an toàn cốt lõi
- **Kiểm soát chi phí:** Luôn tính toán và báo trước số đoạn, số giây và chi phí token/credit cho người dùng phê duyệt trước khi gọi lệnh sinh video.
- **Minh bạch nhãn AI:** Mặc định gắn nhãn "Nội dung do AI thể hiện" hoặc thông báo tương ứng theo quy định pháp lý.
- **Bảo vệ bản quyền:** Chỉ sử dụng hình ảnh nhân vật do người dùng cung cấp hoặc nhân vật mẫu được ủy quyền.

## Quy trình sản xuất

1. **Khảo sát & Chọn phong cách:**
   - Đánh giá nội dung và tư liệu có sẵn để gợi ý 2 phong cách dựng phù hợp:
     - *Phong cách giải thích chuyên sâu (16:9)*: chữ nổi 3D chìm sau nhân vật, khung bảng thuyết minh kết hợp avatar góc nhỏ, biểu đồ động.
     - *Phong cách video ngắn hoa tự (9:16)*: phụ đề động nổi bật, hiệu ứng từ khóa, nhịp cắt nhanh.
     - *Bản tin phát hành / Hướng dẫn từng bước / Đa người dẫn đa ngôn ngữ*.

2. **Biên soạn kịch bản & Phân đoạn:**
   - Viết kịch bản theo nhịp chuẩn (mỗi câu khoảng 10 giây ~ 40-50 từ).
   - Đánh dấu góc quay: quay toàn cảnh (full), khung hình nhỏ giải thích (pip), tự sự cá nhân (vlog), hoặc góc tạo chiều sâu (depth).
   - Xử lý các từ viết tắt kỹ thuật, ký hiệu đặc biệt để phát âm chuẩn xác.

3. **Tạo hình & Tạo chuyển động:**
   - Phối hợp cùng công cụ sinh video (Renoise / Grok Video) để tạo từng đoạn chuyển động khuôn mặt và khẩu hình mượt mà.
   - Cơ chế tải song song ngắt quãng (range download) và kiểm tra toàn vẹn video bằng ffmpeg.

4. **Kiểm tra phát âm & Vá lỗi tự động:**
   - Dùng Whisper đối soát văn bản và âm thanh thực tế.
   - Sửa lỗi đọc sai từ bằng kỹ thuật vá âm thanh cục bộ (patch voice clone) giữ nguyên khẩu hình gốc mà không cần tốn chi phí quay lại toàn bộ phân cảnh.

5. **Dựng hậu kỳ & Đóng gói đồ họa (Remotion / FFmpeg):**
   - Canh chỉnh thời gian phụ đề chính xác từng chữ.
   - Phủ 48 linh kiện đồ họa cao cấp: hook mở đầu, chữ chìm sau lưng người dẫn (depth text), ảnh chụp bằng chứng, nhãn bản đồ, hiệu ứng âm thanh SFX đồng bộ.
   - Cân bằng âm lượng (loudness normalization -16 LUFS) và nhạc nền né giọng đọc (audio ducking).

6. **Tạo ảnh bìa & Khung hình mở đầu:**
   - Trích xuất khung hình cười tự nhiên nhất của nhân vật.
   - Thiết kế bìa đa tỉ lệ (16:9, 9:16, 3:4) và ghép trực tiếp vào 0.5s đầu của video.
