import sharp from "sharp";

const paintings = await Promise.all(
  ["serenidad.jpg", "percepcion.jpg", "entrelazados.jpg"].map(file =>
    sharp(`public/artworks/${file}`).rotate().resize(240, 390, { fit: "cover" }).toBuffer(),
  ),
);
const lettering = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <text x="70" y="120" font-family="Georgia, serif" font-size="66" fill="#005565">Daniela Salem<tspan fill="#d0b121">.</tspan></text>
  <text x="72" y="167" font-family="Arial, sans-serif" font-size="21" fill="#455f66" letter-spacing="3">PINTURA CONTEMPORÁNEA</text>
  <text x="875" y="555" font-family="Arial, sans-serif" font-size="19" fill="#005565">danielasalem.art</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#fffaf2" } })
  .composite([...paintings.map((input, index) => ({ input, left: 70 + index * 265, top: 210 })), { input: lettering }])
  .jpeg({ quality: 90 }).toFile("public/social-preview.jpg");
