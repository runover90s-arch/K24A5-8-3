# ĐỐI CHIẾU MASTER PROMPT — GALAXY LETTERS 08.03.2027

Đây là hồ sơ triển khai kỹ thuật và các điểm cần xác nhận, **không phải giấy chứng nhận đã chạy thành công trên mọi điện thoại**.

| Mục Master Prompt | Tình trạng / file liên quan |
|---|---|
| 0–1. Concept digital storytelling | 6 cảnh: `IntroScene`, `StudentLookup`, nhận diện `App`, `Envelope`, `LetterView`, `ClosingScene` |
| 2. Kiến trúc | **Giải pháp tương đương**: native TypeScript + HTML/CSS/Canvas/SVG/Web Animations thay React/Vite/Motion; `node:test` thay Vitest; `scripts/build.mjs` |
| 3. Palette, font có dấu, sao/tinh vân | `src/styles/`, `GalaxyBackground.ts`, canvas sao nhiều lớp, gradient aurora, quỹ đạo và shooting star |
| 4. Storyboard 6 cảnh | `src/App.ts`, `src/components`; intro có bỏ qua; STT→nhận diện→phong thư→giấy→chúc cuối |
| 5. Morph | `MorphTransition.ts` giữ **một phần tử DOM** qua tất cả scene, CSS chuyển vị trí/kích thước/hình dạng; envelope 3D flap và giấy trượt |
| 6. Dữ liệu/STT | `src/data/recipients.ts`: 24 người, STT 5/18/19/33/35/36/45/46 theo yêu cầu; STT 34 **không có thư**; không lưu 46 họ tên |
| 7. 24 thư | `src/data/letters.ts`: **24 thư × 3 đoạn × 120–180 từ**, nội dung khác nhau; không bịa kỷ niệm |
| 8. Cá nhân hóa | `src/utils/visualSeed.ts`: bảng màu/chòm sao theo STT, seed ổn định |
| 9. Responsive | `src/styles/responsive.css`: breakpoint 320, 350, 520, 720 và landscape; safe areas, 100dvh, touch target |
| 10. Hiệu năng | Canvas DPR giới hạn, tối đa 350 sao, 30/45 FPS tùy thiết bị; stop khi tab ẩn; CSS fallback |
| 11. Accessibility | semantic/main/form/label/aria-live/focus/inert; `prefers-reduced-motion`, skip, nội dung hiện không chờ typewriter |
| 12. Âm thanh | `AudioToggle.ts`: âm thanh tự tạo với Web Audio; **mặc định vô hiệu hóa** tại config; không auto-play |
| 13. Cấu trúc repo | Có `src/components`, `data`, `utils`, `hooks`, `styles`, `tests`, `public`, `scripts`, `README.md` |
| 14. GitHub Pages | `.github/workflows/deploy.yml`, Node22, `npm ci`, test/build, Pages artifact & deploy; asset URL tương đối; OG URL tuyệt đối khi build CI |
| 15. Cấu hình tập trung | `src/data/eventConfig.ts`; countdown tùy chọn, không khóa trước/sau ngày sự kiện |
| 16. Micro-interaction | Nút có glow/hover, constellation SVG draw, comet particle, light bloom, phong thư seal, paper unfolding |
| 17. SEO/chia sẻ | `index.html`, `public/favicon.svg`, `public/og-cover.svg`, `public/og-cover.png`; no recipient metadata |
| 18. Kiểm thử | `tests/` gồm unit/data/asset/DOM logic, **34/34** thành công; Chromium URLBlocklist chặn localhost; đã kiểm thử trực tiếp HTML độc lập bằng set_content ở 4 viewport, chưa thay thế kiểm thử trên điện thoại thật |
| 19. Thứ tự ưu tiên | Đúng STT, các thư, mobile, deploy, morph, động nền, âm thanh tùy chọn |
| 20. Đầu ra | Mã nguồn, `dist/` (build), `standalone/index.html`, workflow, README và hồ sơ QA; chưa đăng lên GitHub vì chưa có repository được chỉ định |
| 21. Cảm xúc | Thư riêng trên giấy, hiệu ứng nền dịu khi đọc, lời chúc cuối yên tĩnh |

## Kết quả đã chạy

- `npm ci --offline --ignore-scripts` → PASS.
- `npm test` → 34/34 PASS (gồm DOM integration mô phỏng khi Reduced Motion bật).
- `tsc -p tsconfig.json --pretty false` → PASS (TypeScript 5.8.3 có sẵn trong hệ tạo dự án).
- `npm run build` → PASS (Node 22.16.0), tạo `dist` và bản độc lập.
- `node --check` mã JavaScript sau compile → PASS (khi chạy công đoạn kiểm tra cuối).
- `Playwright/Chromium`: KHÔNG CHẠY ĐƯỢC vì Chromium cài đặt trong môi trường có policy `URLBlocklist: ["*"]`, chặn `http://127.0.0.1:4173/` và cả `file://` trước khi trang tải. Đây là chặn môi trường, **không thể diễn giải là lỗi hoặc thành công của website**.
- Chưa chạy đánh giá Lighthouse/FPS trên điện thoại thật; chưa xuất bản lên GitHub vì không có repository đã được cung cấp để push.

## Những điều phải duyệt trước khi công bố

1. Tên lớp hiện tại **chưa được xác nhận**. Giữ `currentClassName=''` cho tới lúc chủ repo điền.
2. Chữ ký hiện là `Một người bạn trong lớp` – chủ repo có thể thay.
3. Xác nhận lại tất cả 24 họ tên + STT mới trên danh sách lớp mới nhất, nhất là STT 33/34/35/36.
4. Xác nhận cách gọi thân mật (`displayName`) và sự đồng ý công bố tên/lá thư.
5. Nếu công khai mã nguồn, người xem mã vẫn đọc được danh sách 24 thư và `fullName`: **STT không phải cơ chế bảo mật**.
6. Cần kiểm tra thực tế trên iPhone Safari, Chrome Android và trình duyệt tích hợp trong Messenger/Zalo; mobile viewport 320, 360, 375, 390, 414, 430; tablet 768; desktop 1024–1440; màn hình ngang, bàn phím ảo, reduced motion.
7. Kiểm tra OG preview trên domain xuất bản và điều chỉnh nếu dùng custom domain.

**Ngoại lệ đối với đúng từng công nghệ trong prompt:** Không dùng React, Vite, Motion for React, Vitest. Các công nghệ ấy được đánh dấu là *ưu tiên* trong prompt, không phải bắt buộc, và được thay bằng những công cụ native, ít phụ thuộc. Không khẳng định đã đáp ứng tiêu chí công nghệ theo nghĩa đen.


## Cinematic intro acceptance

- Initial frame is pure black before the first story line.
- Story lines appear sequentially with enough time to read each one.
- The galaxy image is revealed gradually near the end of the intro.
- The original soundtrack is user-initiated and can be muted at any time.
- The intro can be skipped without waiting for the timed sequence.
- Reduced Motion removes camera and text movement while preserving the story and controls.
- The standalone HTML embeds both the image and MP3 assets.

- **New entry gate:** no intro timers and no audio playback before the welcome button is tapped; `audio.play()` is invoked synchronously within the user gesture.
- Browserless smoke tests simulate both successful audio playback and rejection (blocked autoplay) to verify retry/silent fallback.

### Bổ sung kiểm thử Chromium (bản bắt đầu bằng nhạc)

- Dùng Playwright Chromium headless mở nội dung `standalone/index.html` bằng `page.set_content()` do URLBlocklist chặn URL localhost.
- Các viewport kiểm thử: `320×568`, `390×844`, `844×390`, `1280×800` ở chế độ Reduced Motion.
- Chạm `Bước vào vũ trụ`, xác nhận `.audio-toggle` có `aria-pressed=true`, intro chạy, skip qua lookup, STT 19 hiển thị đúng `Gửi Ánh Minh,`. Không xuất hiện JS exception hay horizontal overflow.
- Kiểm tra timeline qua virtual clock: phase `black` ban đầu, `data-reveal=true` khoảng 40,5 giây, phase `final` sau 56,5 giây.
- Đã xử lý race condition timer trong intro: câu chữ không được xuất hiện đè lên tiêu đề cuối khi timer bị trì hoãn.
- **Chưa có kiểm thử thực địa trên iOS Safari, Messenger/Zalo in-app browser, chất lượng nhạc trên loa điện thoại và FPS trên máy yếu.**
