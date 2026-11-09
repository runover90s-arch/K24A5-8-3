import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('dist');
test('production assets tồn tại, nạp bằng đường dẫn tương đối để hoạt động tại GitHub project path', async () => {
  for(const asset of ['index.html','src/main.js','src/App.js','src/data/letters.js','styles/global.css','styles/responsive.css','favicon.svg','og-cover.png']) {
    assert.ok((await stat(resolve(output,asset))).size>0,`Thiếu ${asset}`);
  }
  const html = await readFile(resolve(output,'index.html'),'utf8');
  assert.match(html,/<html lang="vi">/);
  assert.match(html,/src="\.\/src\/main\.js"/);
  assert.match(html,/href="\.\/styles\/global\.css"/);
  assert.doesNotMatch(html,/src="\//); // Không dùng asset URL bắt đầu bằng dấu /.
});
test('không có tracker analytics và không tiết lộ người nhận trong metadata chung', async () => {
  const html = await readFile(resolve(output,'index.html'),'utf8');
  assert.doesNotMatch(html,/google-analytics|gtag\(|facebook\.net|pixel|Trần Thị Ánh Minh|Lee Huan Ling/i);
});
