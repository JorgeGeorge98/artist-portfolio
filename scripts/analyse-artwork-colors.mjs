import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const directory = path.join(root, "public/artworks");
const files = (await fs.readdir(directory)).filter((file) => /\.(jpe?g|png|webp)$/i.test(file));
const bins = new Float64Array(4096 * 4);
let total = 0;
for (const file of files) {
  const { data } = await sharp(path.join(directory, file)).autoOrient().toColourspace("srgb").removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const offset = ((r >> 4) * 256 + (g >> 4) * 16 + (b >> 4)) * 4;
    bins[offset]++;
    bins[offset + 1] += r;
    bins[offset + 2] += g;
    bins[offset + 3] += b;
    total++;
  }
}
const points = [];
for (let i = 0; i < bins.length; i += 4) {
  if (bins[i]) points.push({ count: bins[i], rgb: [bins[i + 1], bins[i + 2], bins[i + 3]].map((value) => value / bins[i]) });
}
const distance = (a, b) => a.reduce((sum, value, i) => sum + (value - b[i]) ** 2, 0);
// Deterministic, weighted farthest-point initialization followed by weighted RGB k-means.
const centers = [points.reduce((a, b) => a.count > b.count ? a : b).rgb.slice()];
while (centers.length < 5) {
  const next = points.reduce((best, point) => {
    const score = point.count * Math.min(...centers.map((center) => distance(point.rgb, center)));
    return score > best.score ? { score, point } : best;
  }, { score: -1 });
  centers.push(next.point.rgb.slice());
}
let groups;
for (let iteration = 0; iteration < 100; iteration++) {
  groups = centers.map(() => ({ count: 0, sums: [0, 0, 0] }));
  for (const point of points) {
    let closest = 0;
    for (let i = 1; i < centers.length; i++) if (distance(point.rgb, centers[i]) < distance(point.rgb, centers[closest])) closest = i;
    const group = groups[closest];
    group.count += point.count;
    point.rgb.forEach((value, channel) => { group.sums[channel] += value * point.count; });
  }
  let movement = 0;
  groups.forEach((group, i) => {
    const next = group.sums.map((value) => value / group.count);
    movement += distance(centers[i], next);
    centers[i] = next;
  });
  if (movement < 0.000001) break;
}
const colors = groups.map((group, i) => ({
  hex: "#" + centers[i].map((value) => Math.round(value).toString(16).padStart(2, "0")).join("").toUpperCase(),
  pixels: group.count,
  frequency: Number((group.count / total * 100).toFixed(2)),
})).sort((a, b) => b.pixels - a.pixels);
console.log(JSON.stringify({ files: files.length, totalPixels: total, method: "Full-resolution sRGB pixels, 4-bit RGB histogram, five weighted k-means clusters; larger images contribute more pixels.", colors }, null, 2));
