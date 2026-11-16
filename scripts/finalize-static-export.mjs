import { readdir, copyFile } from "node:fs/promises";
import path from "node:path";

// Next 16.4 on Windows can export nested RSC segment paths with directory
// separators, while its browser router requests a dot-separated filename.
// Add the expected aliases; on Linux's correctly flattened export this is a no-op.
const root = path.resolve("out");
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await visit(file); continue; }
    const parts = path.relative(root, file).split(path.sep);
    const segment = parts.findIndex(part => part.startsWith("__next."));
    if (segment < 0 || segment === parts.length - 1 || !file.endsWith(".txt")) continue;
    const alias = path.join(root, ...parts.slice(0, segment), parts.slice(segment).join("."));
    await copyFile(file, alias);
  }
}
await visit(root);
