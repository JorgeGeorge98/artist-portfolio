import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
for (const route of ["index.html", "about.html", "gallery.html", "en.html", "en/about.html", "en/gallery.html", "404.html", "_headers", "_redirects"]) {
  await access(path.join(root, route));
}
let count = 0;
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await inspect(file); continue; }
    count++;
    const parts = path.relative(root, file).split(path.sep);
    const segment = parts.findIndex(part => part.startsWith("__next."));
    if (segment >= 0 && segment < parts.length - 1 && file.endsWith(".txt")) {
      await access(path.join(root, ...parts.slice(0, segment), parts.slice(segment).join(".")));
    }
    if ((await stat(file)).size > 25 * 1024 * 1024) throw new Error(`Cloudflare Pages file exceeds 25 MiB: ${file}`);
    if (!entry.name.endsWith(".html")) continue;
    const html = await readFile(file, "utf8");
    if (html.includes("/_next/image?")) throw new Error(`Runtime image optimizer reference: ${file}`);
    for (const match of html.matchAll(/(?:src|href)="(\/(?:optimized|_next\/static|artworks|images|gallery-artworks)\/[^"?]+)"/g)) {
      await access(path.join(root, decodeURIComponent(match[1])));
    }
  }
}
await inspect(root);
if (count > 20000) throw new Error(`Cloudflare Pages free-plan file count exceeded: ${count}`);
console.log(`Static export verified: 6 pages, a 404, local assets, ${count} files within Pages limits.`);
