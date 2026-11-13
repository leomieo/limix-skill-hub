# geo-sleuth — hướng dẫn tiếng Việt

Skill định vị ảnh chụp bằng agent — đưa cho agent một bức ảnh và bảo "tìm nơi này được chụp ở đâu", nó trả về tọa độ máy ảnh (kèm bán kính sai số), hướng ống kính và ảnh bằng chứng vệ tinh, giải trình từng bước bằng file lệnh đã chạy. Dữ liệu OpenStreetMap, độ cao địa hình, tile vệ tinh và street view thay cho chữ trong ảnh: khoảng cách mố cầu làm thước đo, bóng đổ làm la bàn, đường viền núi khớp với dữ liệu elevation. Chạy với Claude Code, Codex, Cursor, Gemini CLI, OpenCode, GitHub Copilot.

## Cách dùng

- Gọi kỹ năng bằng tên gốc `geo-sleuth` hoặc mô tả yêu cầu bằng tiếng Việt.
- Ví dụ: “Dùng geo-sleuth cho tác vụ của tôi; giải thích kết quả bằng tiếng Việt.”
- Cung cấp đầu vào và kết quả mong muốn. Các điều kiện, giới hạn và bước duyệt tuân theo `SKILL.md` gốc.

## Ngôn ngữ và giới hạn

Tài liệu này chỉ giải thích cho người dùng; không thay đổi quy trình thực thi. Agent đọc `SKILL.md` khi kích hoạt, chỉ đọc reference phù hợp khi cần. Không nạp đồng thời bản dịch đầy đủ. Giữ nguyên tên Tool, API, MCP, CLI, tham số, mã nguồn và đường dẫn.

Trạng thái: **quarantined**. Chưa chạy thử script hoặc dịch vụ ngoài. Việc quét tĩnh không bảo đảm an toàn; quyền sử dụng do Limix Bot và chủ bot quyết định.

Nguồn: https://github.com/Oldcircle/geo-sleuth — commit `d56c35789565e9459f0663e860c470e98e9c30d1`.

Phân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.
