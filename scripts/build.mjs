import { stripTypeScriptTypes } from 'node:module';
import { readFile, writeFile, mkdir, readdir, cp, rm } from 'node:fs/promises';
import { resolve, relative, dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Build không cần phụ thuộc npm: Node 22 loại bỏ chú thích kiểu TypeScript.
 * Dùng import đường dẫn .js tĩnh nên chạy chính xác dưới repo path và user.github.io.
 * Không cần Vite / webpack và không đưa compiler vào website.
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

async function compile(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const source = join(dir, item.name);
    if (item.isDirectory()) { await compile(source); continue; }
    const ext = extname(source);
    if (ext === '.ts') {
      const target = join(out, relative(root, source).replace(/\.ts$/, '.js'));
      await mkdir(dirname(target), { recursive: true });
      const content = await readFile(source, 'utf8');
      const code = stripTypeScriptTypes(content, { mode: 'strip', sourceUrl: source });
      await writeFile(target, `${code}\n`, 'utf8');
    } else if (ext !== '.map') {
      const target = join(out, relative(root, source));
      await mkdir(dirname(target), { recursive: true });
      await cp(source, target);
    }
  }
}
await compile(join(root, 'src'));
await cp(join(root, 'src', 'styles'), join(out, 'styles'), { recursive: true });
await cp(join(root, 'public'), out, { recursive: true, force: true });
let html = await readFile(join(root, 'index.html'), 'utf8');
// GitHub Pages có thể dùng cả repository thường lẫn username.github.io.
// Dựng URL OG tuyệt đối cho Messenger/Zalo khi có context CI của GitHub.
const repository = process.env.GITHUB_REPOSITORY;
if (repository && repository.includes('/')) {
  const [owner, repo] = repository.split('/');
  const pathBase = repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '' : `${repo}/`;
  const publicUrl = `https://${owner}.github.io/${pathBase}`;
  html = html.replaceAll('content="./og-cover.png"', `content="${publicUrl}og-cover.png"`);
  html = html.replace('</head>', `  <meta property="og:url" content="${publicUrl}" />\n</head>`);
}
await writeFile(join(out, 'index.html'), html, 'utf8');
// Xoá thư mục CSS bản sao để output gọn, các file được nạp từ /styles/.
await rm(join(out, 'src', 'styles'), { recursive: true, force: true });
console.log('✓ Build hoàn tất:', out);
