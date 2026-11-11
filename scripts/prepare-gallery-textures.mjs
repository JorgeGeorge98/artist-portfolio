import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.join(root, "public/artworks");
const destination = path.join(root, "public/gallery-artworks");
await mkdir(destination, { recursive: true });
const files = (await readdir(source)).filter((file) => /\.(jpe?g|png|webp)$/i.test(file));
for (const file of files) {
  await sharp(path.join(source, file))
    .autoOrient()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path.join(destination, file.replace(/\.[^.]+$/, ".webp")));
}
console.log(`Prepared ${files.length} gallery textures. Catalogue text was left unchanged.`);
