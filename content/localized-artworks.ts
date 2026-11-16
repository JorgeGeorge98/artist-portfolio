import { artworks } from "@/content/artworks";
import type { Locale } from "@/lib/i18n";

// Shared series descriptions, keyed by an artwork in each series.
const series: [string, string][] = [
  ["Serenidad", "In my work, I explore how the body and its experiences are transformed through colour. Blue tones and gestural brushwork create a dynamic space where figures dissolve into their surroundings, shifting the burden of physical pain towards calm, stillness and balance.\n\nIn my paintings, I use art as a vehicle for resilience, communication and healing, guided by continual growth and hope."],
  ["Percepción", "My works reveal the layers, gestures and traces that are part of my creative process. I move away from the pursuit of perfection to find my own voice: a language brought to life through colour and direct, spontaneous brushstrokes."],
  ["Introspección", "This series explores the tension between outward strength and inner vulnerability, confronting the canons of symmetry in classical Greek sculpture with the lived experience of the body. Moving beyond aesthetic conventions, the work seeks an honest balance between matter, the body and its continual transformation."],
  ["Entrelazados", "In these works, drawings of hands take the place of words. The posture and movement of the figures create a direct dialogue about empathy and human connection."],
  ["Ruina en movimiento", "This series uses the metaphor of ruins to explore how memories and past experiences leave their mark on our present. Through these forms, the work reflects on memory, the passage of time and personal transformation."],
  ["Mirada interior", "These works approach the gaze as a bridge between the outside world and personal experience. The depiction of eyes and natural elements articulates an individual way of perceiving the world, reconciling what we see with what we feel through landscape and memory."],
];
const descriptions = new Map(series.map(([title, translation]) => [artworks.find(artwork => artwork.title === title)!.description, translation]));
const englishArtworks = artworks.map(artwork => ({
  ...artwork,
  description: descriptions.get(artwork.description) ?? artwork.description,
  dimensions: artwork.dimensions.replace("cada obra", "each artwork"),
  priceNote: artwork.priceNote === "por obra" ? "per artwork" : artwork.priceNote,
  alt: `${artwork.title}, painting by Daniela Salem.`,
}));
export function getArtworks(locale: Locale) {
  return locale === "en" ? englishArtworks : artworks;
}
