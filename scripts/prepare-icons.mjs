import { readFile, writeFile, rm } from "node:fs/promises";
import sharp from "sharp";

const source = await readFile("app/icon.svg");
const png = await sharp(source, { density: 288 }).resize(96, 96).png().toBuffer();
await writeFile("public/favicon-96.png", png);
await sharp(source, { density: 288 }).resize(180, 180).png().toFile("public/apple-touch-icon.png");
// ICO container with a PNG image, preserving the existing brand mark.
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = header[7] = 96;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("app/favicon.ico", Buffer.concat([header, png]));
// The App Router owns this URL; do not create a conflicting public asset.
await rm("public/favicon.ico", { force: true });
