# anything2explainer — hướng dẫn tiếng Việt

Đưa một chủ đề vào, nhận ra một video explainer motion-graphics có thuyết minh — skill Claude Code / Codex biến bất kỳ chủ đề nào thành video motion-graphics nền đen có giọng đọc TTS, phụ đề căn theo từng từ và thanh tiến độ chương, tiếng Trung hoặc tiếng Anh, mỗi frame đều vẽ bằng code với Remotion (React + TypeScript). Không stock footage, không model video sinh, không lấy frame từ ai. Kèm 9 giai đoạn quy trình, 4 checkpoint hỏi người dùng, đa agent dựng song song và QC định lượng. Dùng khi người dùng cần video giải thích/giáo dục/khoa học về một chủ đề, hoặc muốn biến bài viết/tài liệu thành video.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `anything2explainer` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng anything2explainer cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **review-required**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/Vincentwei1021/anything2explainer — commit `0b85f6c7bfc4ef094ee1afb6c68c06fcf329cfab`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
