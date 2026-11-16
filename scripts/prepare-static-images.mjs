import sharp from "sharp";
import { readdir, mkdir, readFile, writeFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../public/", import.meta.url));
const widths = [320, 480, 640, 828, 1080, 1440, 1920];
const folders = ["artworks", "images", "gallery-artworks"];
let generated = 0;
for (const folder of folders) {
  for (const filename of await readdir(path.join(root, folder))) {
    if (!/\.(jpe?g|png|webp)$/i.test(filename)) continue;
    const input = await readFile(path.join(root, folder, filename));
    const destination = path.join(root, "optimized", folder, filename);
    const fingerprint = createHash("sha256").update(input).update(`v1:${widths}:quality84`).digest("hex");
    const marker = path.join(destination, ".source-hash");
    try {
      if (await readFile(marker, "utf8") === fingerprint) {
        await Promise.all(widths.map(width => access(path.join(destination, `${width}.webp`))));
        continue;
      }
    } catch { /* First run or a missing derivative: rebuild this image. */ }
    await mkdir(destination, { recursive: true });
    for (const width of widths) {
      await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 84 })
        .toFile(path.join(destination, `${width}.webp`));
      generated++;
    }
    await writeFile(marker, fingerprint);
  }
}
console.log(`Static images ready: ${generated} responsive files generated.`);
