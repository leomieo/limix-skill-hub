<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: ex-ussr-kinship-research (DenisSergeevitch/ex-ussr-kinship-research)

## Thông tin (đo qua GitHub API ngày 13/11/2026, lần chạy 7/30)
- **Repo gốc:** https://github.com/DenisSergeevitch/ex-ussr-kinship-research
- **Sao:** 2.383 | **Ngày tạo:** 25/10/2026 | **Push gần nhất:** 12/11/2026
- **Giấy phép:** MIT | **Tác giả:** Denis Sergeevitch

## Lý do chọn
- Hơn 2.300★ sau chưa đầy 3 tuần ra mắt, là một trong những kỹ năng nghiên cứu dữ liệu lịch sử và chứng cứ gốc (evidence-first genealogy & archival research) đồ sộ và khoa học nhất trên GitHub.
- Thiết lập quy trình nghiên cứu điều tra nhân thân chuẩn mực pháp lý: phân định rõ ràng giữa bản ghi gốc và suy diễn chủ quan, thiết lập chuỗi bằng chứng có thể tái lập (reproducible registers) và gán nhãn độ tin cậy bằng trạng thái logic thay vì xác suất ảo.
- Hỗ trợ tra cứu lưu trữ trên toàn bộ 15 quốc gia thuộc Liên Xô cũ và Đế quốc Nga: sổ hộ tịch giáo hội, đăng ký dân sự, hồ sơ quân ngũ Thế chiến I/II, tài liệu di cư và lưu đày.

## Làm gì
Bộ công cụ điều tra lưu trữ và dựng phả hệ độc lập:
1. `case-intake`: Tiếp nhận câu hỏi nghiên cứu, dữ liệu đã biết và phạm vi giới hạn đạo đức (tuyệt đối không theo dõi người còn sống).
2. `evidence-protocol`: Phân loại chứng cứ minh bạch: `hypothesis`, `single-source`, `corroborated`, `strongly-corroborated`, `contradicted`, `unresolved`. Các bản sao hoặc trích lục từ cùng một gốc được gom vào một `independence_group` để chống tính điểm trùng lặp.
3. `identity-resolution`: Cơ chế phân biệt người trùng tên (namesakes disambiguation) bằng số nhà, cha mẹ, người đỡ đầu hoặc đơn vị quân đội.
4. `jurisdiction-model`: Tra cứu phân cấp địa giới hành chính theo thời điểm diễn ra sự kiện lịch sử thay vì bản đồ hiện đại.
5. Xuất báo cáo HTML chi tiết kèm sơ đồ phả hệ GEDCOM và nhật ký tra cứu CSV đầy đủ.

## Điểm mạnh
- Phương pháp luận nghiên cứu tài liệu cực kỳ chặt chẽ, có thể áp dụng làm hình mẫu cho mọi tác vụ nghiên cứu hồ sơ điều tra hoặc pháp lý.
- Tự động giao tiếp bằng ngôn ngữ của người dùng dù kho tài liệu gốc bằng nhiều thứ tiếng (Nga, Ba Lan, Romania, Đức, Yiddish...).
- Quy chuẩn đạo đức rõ ràng: cấm tuyệt đối việc sử dụng kỹ năng để theo dõi hoặc truy tìm người còn sống.

## Điểm yếu / rủi ro
- Là kỹ năng nghiên cứu thuần văn bản và dữ liệu, an toàn tuyệt đối.
- Cần có sự kiên nhẫn và lượng tài liệu quét lưu trữ tương đối lớn từ người dùng khi điều tra các trường hợp phức tạp.

## Độ phù hợp với Limix Bot
Cao: Cung cấp phương pháp luận mẫu mực về quản trị chuỗi chứng cứ (evidence chain), phân biệt danh tính và kiểm định tính độc lập của nguồn tin cho các bot nghiên cứu và thẩm định trong Limix Bot (như Assayer, Tracer).
