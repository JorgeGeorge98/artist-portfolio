export type BrushStroke = {
  id: string;
  texture: "teal" | "ochre";
  top: number;
  left: number;
  width: number;
  angle: number;
  mirrored: boolean;
  opacity: number;
  hue: number;
  hueDrift: number;
  colorDuration: number;
  drawDuration: number;
  holdDuration: number;
  fadeDuration: number;
};

export const MAX_ACTIVE_STROKES = 6;

// Artwork-inspired pigment families, applied independently of the brush texture.
const PIGMENT_HUES = [
  5,   // golden yellow
  65,  // leaf green
  130, // turquoise
  175, // cobalt blue
  215, // violet
  300, // warm rose
  335, // vermilion
];

/** A new seed is chosen in the browser on each page load. */
export function createPaintRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), state | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function createStroke(random: () => number, id: string): BrushStroke {
  const texture = random() > 0.42 ? "teal" : "ochre";
  const hue = PIGMENT_HUES[Math.floor(random() * PIGMENT_HUES.length)];
  return {
    id,
    texture,
    top: random() * 100,
    left: random() * 100,
    width: 14 + random() * 12,
    angle: -80 + random() * 160,
    mirrored: random() > 0.5,
    opacity: 0.7 + random() * 0.25,
    hue: hue + (random() - 0.5) * 12,
    hueDrift: 4 + random() * 5,
    colorDuration: 30 + random() * 15,
    drawDuration: 2.8 + random() * 1.7,
    holdDuration: 9 + random() * 4,
    fadeDuration: 5 + random() * 2,
  };
}
