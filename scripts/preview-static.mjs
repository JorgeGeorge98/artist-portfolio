// Local preview of exported files: no Next.js server or image optimizer.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".ttf": "font/ttf", ".woff2": "font/woff2" };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (["/es", "/es/", "/es/about", "/es/gallery"].includes(pathname)) {
      response.writeHead(301, { Location: pathname.replace(/^\/es/, "") || "/" }); response.end(); return;
    }
    const base = path.resolve(root, `.${pathname}`);
    if (base !== root && !base.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
    let found;
    for (const candidate of [base, `${base}.html`, path.join(base, "index.html")]) {
      try { if ((await stat(candidate)).isFile()) { found = candidate; break; } } catch { /* Try the next static path. */ }
    }
    const file = found || path.join(root, "404.html");
    response.writeHead(found ? 200 : 404, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
    response.end(request.method === "HEAD" ? undefined : await readFile(file));
  } catch { response.writeHead(400); response.end("Invalid request or missing build. Run npm run build first."); }
}).listen(port, "127.0.0.1", () => console.log(`Static preview: http://127.0.0.1:${port}`));
