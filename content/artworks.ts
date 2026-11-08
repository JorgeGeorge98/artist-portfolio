export type Artwork = {
  title: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  theme: string;
};

// Working titles follow the supplied filenames; confirm final catalogue details.
export const artworks: Artwork[] = [
  {
    title: "Ojo",
    src: "/artworks/ojo.png",
    width: 452,
    height: 310,
    alt: "A deep blue eye surrounded by concentric green and gold rings and yellow petal-like forms on a turquoise ground.",
    theme: "Symbol & intuition",
  },
  {
    title: "Mujer",
    src: "/artworks/mujer.png",
    width: 190,
    height: 287,
    alt: "An expressive woman's profile in vivid yellow and green, outlined in cobalt blue against a turquoise background.",
    theme: "Figure & feeling",
  },
  {
    title: "Panteon",
    src: "/artworks/panteon.png",
    width: 382,
    height: 290,
    alt: "A classical columned temple floats within loose brushstrokes of green, turquoise, yellow, and warm red.",
    theme: "Place & memory",
  },
];
