import sharp from "sharp";

// Derive matching material maps from the quartz rather than unrelated noise.
// Two metres per tile keeps the mineral detail fine at viewing distance.
const size = 2048;
const source = "public/textures/gallery-quartz.webp";
console.log("Quartz source:", await sharp(source).metadata());
const height = await sharp(source).resize(size, size).greyscale().blur(0.6).raw().toBuffer();
const normals = Buffer.alloc(size * size * 3);
const roughness = Buffer.alloc(size * size);
const sample = (x, y) => height[((y + size) % size) * size + (x + size) % size] / 255;
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const dx = (sample(x - 1, y) - sample(x + 1, y)) * 2;
    const dy = (sample(x, y + 1) - sample(x, y - 1)) * 2;
    const length = Math.hypot(dx, dy, 1);
    const i = y * size + x;
    normals[i * 3] = Math.round((dx / length * 0.5 + 0.5) * 255);
    normals[i * 3 + 1] = Math.round((dy / length * 0.5 + 0.5) * 255);
    normals[i * 3 + 2] = Math.round((1 / length * 0.5 + 0.5) * 255);
    roughness[i] = Math.round(185 + sample(x, y) * 55);
  }
}
await sharp(normals, { raw: { width: size, height: size, channels: 3 } }).webp({ lossless: true }).toFile("public/textures/gallery-quartz-normal.webp");
await sharp(roughness, { raw: { width: size, height: size, channels: 1 } }).webp({ lossless: true }).toFile("public/textures/gallery-quartz-roughness.webp");
console.log("Gallery normal and roughness maps prepared at 2048 × 2048.");
