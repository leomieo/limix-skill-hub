#!/usr/bin/env node
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { migrateHybridSkill } from '../lib/hybrid.mjs';

const args = process.argv.slice(2);
const root = args.includes('--root') ? path.resolve(args[args.indexOf('--root') + 1]) : path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const aliases = {
  'agent-autoloop': ['Tự động hóa tác vụ', 'Lịch chạy agent'], anatomy: ['Minh họa kỹ thuật', 'Giải thích tương tác'], 'answer-me-with-html': ['Báo cáo HTML', 'Giải thích bằng trang web'], anything2explainer: ['Video giải thích', 'Dựng video thuyết minh'], 'api-anything': ['Lấy dữ liệu website', 'Biến website thành API'], arena: ['Đấu trường phản biện', 'So sánh chiến lược'], 'bang-motion': ['Đồ họa chuyển động', 'Video quảng cáo'], 'beautiful-rust': ['Lập trình Rust', 'Đánh giá mã Rust'], 'claude-animated-shorts': ['Video hoạt hình ngắn', 'Dựng Shorts'], 'claude-guardian': ['Bảo vệ tài khoản agent', 'An toàn đường truyền'], 'day-trader-skill': ['Giao dịch có kiểm soát', 'Phân tích rủi ro giao dịch'], 'digital-human-koubo': ['Video người ảo', 'Nhân vật nói chuyện'], earshot: ['Kiểm tra âm thanh', 'Phân tích phổ âm'], 'elephant-goldfish-model': ['Phản biện đặc tả', 'Thiết kế đa tác tử'], 'ex-ussr-kinship-research': ['Nghiên cứu phả hệ', 'Hồ sơ lưu trữ lịch sử'], 'ffmpeg-skill': ['Dựng video ffmpeg', 'Xử lý âm thanh video'], 'founder-skill': ['Cố vấn khởi nghiệp', 'Thẩm định kinh doanh'], 'geo-sleuth': ['Xác minh địa điểm ảnh', 'Điều tra vị trí'], golive: ['Triển khai ứng dụng', 'Đưa ứng dụng lên mạng'], 'grandet-api-price-finder': ['So sánh giá API', 'Tìm API mô hình AI'], 'huashu-art-motion': ['Hoạt họa nghệ thuật', 'Đồ họa chuyển động'], 'instagram-agent-skill': ['Quản lý Instagram', 'Viết nội dung Instagram'], 'lemo-opuscar': ['Dựng phim bằng mã', 'Phong cách phim ngắn'], 'linkedin-agent-skill': ['Quản lý LinkedIn', 'Viết nội dung LinkedIn'], 'logo-design': ['Thiết kế logo', 'Nhận diện thương hiệu'], motionmaxxing: ['Đồ họa chuyển động', 'Hoạt họa GSAP'], 'motionsites-web-builder': ['Thiết kế landing page', 'Xây dựng website'], 'oil-ui': ['Thiết kế giao diện', 'Đánh giá UI UX'], pixelfx: ['Hiệu ứng pixel art', 'Tạo sprite sheet'], 'rea-video': ['Phân tích video', 'Tái hiện video'], reanimate: ['Tái tạo chuyển động giao diện', 'Phân tích hoạt họa'], 'replica-skill': ['Tái tạo ứng dụng', 'Nghiên cứu ứng dụng mẫu'], 'socratic-tutor': ['Gia sư Socratic', 'Học bằng câu hỏi'], 'stack-diagram': ['Sơ đồ kiến trúc', 'Vẽ sơ đồ hệ thống'], stageshow: ['Minh họa sản phẩm', 'Ảnh giới thiệu sản phẩm'], 'stickman-video-director': ['Video người que', 'Đạo diễn hoạt hình'], teardown: ['Mô phỏng tháo rời', 'Minh họa máy móc 3D'], tstack: ['Quy trình pull request', 'Đánh giá mã nguồn'], 'universal-modder': ['Mod game PC', 'Chỉnh sửa trò chơi'], unslop: ['Duyệt thẩm mỹ giao diện', 'Loại bỏ thiết kế sáo rỗng'], 'youtube-agent-skill': ['Quản lý YouTube', 'Kịch bản YouTube'],
};
const ids = (await readdir(path.join(root, 'skills'), { withFileTypes: true })).filter((entry) => entry.isDirectory() && !entry.name.startsWith('.')).map((entry) => entry.name).sort();
const report = { schemaVersion: 1, scope: 'English core preservation; scripts downloaded as inert bytes only', results: [], errors: [] };
const now = new Date().toISOString();
const pending = [...ids];
await Promise.all(Array.from({ length: 3 }, async () => {
  while (pending.length) {
    const id = pending.shift();
    try { const result = await migrateHybridSkill(root, id, { aliases: aliases[id] ?? [], now, update: args.includes('--update') }); report.results.push(result); console.log(`${result.state}: ${id} verified=${result.verified}`); }
    catch (error) { report.errors.push({ id, error: error.message }); console.log(`BLOCKED: ${id}: ${error.message}`); }
  }
}));
report.results.sort((a,b) => a.id.localeCompare(b.id));
report.errors.sort((a,b) => a.id.localeCompare(b.id));
await mkdir(path.join(root, 'migration-reports'), { recursive: true });
await writeFile(path.join(root, 'migration-reports', 'hybrid-2026-11-13.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`hybrid: ${report.results.length} processed, ${report.results.filter((result) => result.verified).length} source-verified, ${report.errors.length} errors`);
if (report.errors.length) process.exitCode = 1;
