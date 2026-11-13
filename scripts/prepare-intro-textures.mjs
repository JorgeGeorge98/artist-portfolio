import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";

const output = new URL("../public/textures/intro/", import.meta.url);
await mkdir(output, { recursive: true });
const palette = {
  gold: "#d0b121", yellow: "#e3c950", ochre: "#bc8b29",
  terracotta: "#ae401e", teal: "#299ba2", sage: "#96c6a2", blue: "#11477b",
};
for (const [name, color] of Object.entries(palette)) {
  const texture = ["teal", "blue", "sage"].includes(name) ? "teal" : "ochre";
  const neutral = await sharp(fileURLToPath(new URL(`../public/textures/brush-${texture}.webp`, import.meta.url)))
    .resize({ width: 640, withoutEnlargement: true })
    .grayscale().png().toBuffer();
  await sharp(neutral).tint(color).webp({ quality: 85 })
    .toFile(fileURLToPath(new URL(`${name}.webp`, output)));
}
