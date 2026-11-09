import { spawnSync } from 'node:child_process';
import { watch } from 'node:fs';
import { resolve } from 'node:path';
import { startServer } from './serve.mjs';
function rebuild() {
  const result = spawnSync(process.execPath, ['scripts/build.mjs'], { stdio: 'inherit' });
  if (result.status !== 0) console.error('Không thể build lại mã nguồn.');
}
rebuild();
startServer(Number(process.env.PORT ?? 5173));
let debounce;
for (const path of ['src', 'public']) {
  watch(resolve(path), { recursive: true }, () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => { rebuild(); console.log('↻ Đã cập nhật, hãy tải lại trang trong trình duyệt.'); }, 280);
  });
}
watch(resolve('index.html'), () => { clearTimeout(debounce); debounce = setTimeout(rebuild, 280); });
