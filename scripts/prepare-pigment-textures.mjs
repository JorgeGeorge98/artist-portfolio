import sharp from "sharp";
import { fileURLToPath } from "node:url";

// Recolour both original brushes without losing their alpha or bristle texture.
const directory = fileURLToPath(new URL("../public/textures/", import.meta.url));
const pigments = ["96c6a2", "299ba2", "d0b121", "11477b", "ae401e"];
for (const texture of ["teal", "ochre"]) {
  const { data, info } = await sharp(`${directory}brush-${texture}.webp`)
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (const pigment of pigments) {
    const rgb = pigment.match(/../g).map(channel => parseInt(channel, 16));
    const pigmentLuminance = rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
    const chroma = rgb.map(channel => channel - pigmentLuminance);
    const pixels = Buffer.from(data);
    for (let i = 0; i < pixels.length; i += 4) {
      // Keep every pixel's original luminance. Only replace its chroma;
      // reduce saturation near black/white to avoid clipping bristle detail.
      const luminance = data[i] * .2126 + data[i + 1] * .7152 + data[i + 2] * .0722;
      let saturation = 1;
      for (const offset of chroma) {
        if (offset > 0) saturation = Math.min(saturation, (255 - luminance) / offset);
        if (offset < 0) saturation = Math.min(saturation, luminance / -offset);
      }
      for (let channel = 0; channel < 3; channel++) {
        pixels[i + channel] = Math.round(luminance + chroma[channel] * saturation);
      }
    }
    await sharp(pixels, { raw: info }).webp({ lossless: true })
      .toFile(`${directory}brush-${texture}-${pigment}.webp`);
  }
}
