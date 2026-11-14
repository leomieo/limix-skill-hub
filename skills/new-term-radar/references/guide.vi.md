# new-term-radar — hướng dẫn tiếng Việt

Thu thập tên mô hình và sản phẩm AI mới rồi ưu tiên từ khóa theo dữ liệu nguồn; cần Python, gói CLI và khóa API có phí.

Gọi bằng tên gốc hoặc mô tả mục tiêu bằng tiếng Việt. Cung cấp đầu vào, phạm vi file/dự án và kết quả cần nhận. Agent chỉ đọc core khi chọn skill, rồi đọc reference cần thiết. Đây là hướng dẫn ngắn, không thay core.

Gói skill chỉ có hướng dẫn, không có runtime CLI hoặc các skill ai-listening/seo-new-keywords-research đi kèm. PyPI package và API ngoài chưa xác minh.

Có API tính phí và liên kết giới thiệu; phải duyệt chi phí, dịch vụ và quyền riêng tư trước khi kích hoạt. Không thu thập khóa trong đợt này.

## Điều kiện

- Python >=3.10 and uv/uvx or pip; SKILL.md Before you run anything step 1
- new-term-radar==0.6.1 external PyPI package, not bundled; SKILL.md Before you run anything step 1
- AISA_API_KEY required; SKILL.md Before you run anything step 3
- Optional TRUSTMRR_API_KEY and GOANYAPI_API_KEY; SKILL.md Before you run anything steps 4-5

Trạng thái: **quarantined**; chỉ đối chiếu nguồn và quét tĩnh. Chưa chạy script, model, provider, build macOS hoặc API. Metadata và allowed-tools trong core không cấp quyền. Cần duyệt riêng trước khi chạy hoặc cài dependency.

Nguồn: https://github.com/zhuyansen/new-term-radar/tree/fe67ff1acab728141644a4a9741295469b4feee6/skills/new-term-radar
