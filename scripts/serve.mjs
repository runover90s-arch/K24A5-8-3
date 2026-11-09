import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(projectRoot, 'dist');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.txt': 'text/plain', '.json': 'application/json' };

export function startServer(port = 4173) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    let name;
    try { name = decodeURIComponent(url.pathname); } catch { res.writeHead(400).end(); return; }
    // Thử root rồi thử path dưới /TEN-REPOSITORY/ cho QA bản project Pages.
    const trimmed = name.replace(/^\/+/, '');
    const relativeName = trimmed.startsWith('galaxy-letters-8-3-2027/') ? trimmed.slice('galaxy-letters-8-3-2027/'.length) : trimmed;
    const full = resolve(join(root, relativeName || 'index.html'));
    if (!full.startsWith(root + sep) && full !== root) { res.writeHead(403).end(); return; }
    try {
      const details = await stat(full);
      if (!details.isFile()) { res.writeHead(404).end('Not found'); return; }
      const data = await readFile(full);
      const type = MIME[extname(full)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': `${type}${type.startsWith('text/') || type==='application/json' ? '; charset=utf-8' : ''}`, 'Cache-Control': 'no-cache', 'X-Content-Type-Options':'nosniff' });
      res.end(data);
    } catch { res.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' }).end('Không tìm thấy tài nguyên'); }
  });
  server.listen(port, '0.0.0.0', () => console.log(`🌌 Website: http://localhost:${port}/ (hoặc /galaxy-letters-8-3-2027/)`));
  return server;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) startServer(Number(process.env.PORT ?? 4173));
