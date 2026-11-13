<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->

# Phân tích: anatomy

- **Nguồn:** https://github.com/wheresryan22/anatomy
- **Số sao:** 26.861 (đo ngày 2026-11-12) — cao nhất trong kết quả tìm kiếm skill "agent skill" tạo từ 09/2026.
- **Ngày tạo repo:** 2026-10-08 · lần push cuối 2026-10-18 · giấy phép MIT.
- **Loại skill:** text + script Node cục bộ (build/audit/capture), 0 dependency.

## Lý do chọn
- Repo mới (~1 tháng) nhưng tăng sao nhanh vượt trội: ~27k★ chỉ sau ~1 tháng là mức rất hiếm trong danh mục agent skill.
- Có vòng tự kiểm chứng thật (audit hình học, headless Chrome, kiểm tra nét đứt) — đúng triết lý "verify trước khi giao" mà hub Limix Skill khuyến khích.
- Hỗ trợ đa agent theo chuẩn Agent Skill (Claude Code, Antigravity, OpenCode, Codex, MiniMax Code) — trùng với hệ sinh thái Limix Bot.

## Ước lượng theo thang điểm hub (tự đánh giá, chưa chạy thử)
- Chức năng & tài liệu: cao (README + 8 tài liệu tham khảo + 8 examples hoàn chỉnh, trang đã commit).
- Bảo mật: tốt — không dependency, không gọi API trả phí; script chạy cục bộ.
- Tương thích: tốt (chuẩn SKILL.md, đa agent).
- Chạy thử thật: chưa chạy — cần review-required theo quy tắc hub (kèm tool).
- Bảo trì/nguồn gốc: có CI, changelog, form issue; author hoạt động nhưng lần push cuối đã 3+ tuần.

## Phù hợp Limix Bot
Dùng khi cần minh họa tương tác cho trang explainer/tài liệu/bài đăng. Chạy trong thread riêng vì build tốn thời gian. Không thay thế cho biểu đồ dữ liệu (dùng `stack-diagram` hoặc `answer-me-with-html` cho việc đó).
