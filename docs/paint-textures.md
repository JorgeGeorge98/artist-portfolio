# Paint texture assets

Generated using the built-in image-generation tool. The website uses full-resolution 1024 × 1536 WebP textures with alpha transparency; the source PNGs were converted at quality 92 without resizing or changing the artwork.

- `/public/textures/brush-teal.webp`: dense teal impasto, 464,918 bytes.
- `/public/textures/brush-ochre.webp`: dry ochre brushstroke, 411,206 bytes.

These are decorative generated textures, not paintings attributed to Daniela Salem. Artwork files remain unchanged.

## Teal generation prompt

Use case: photorealistic-natural. Asset type: high-definition transparent paintbrush texture for a fine-arts website, NOT a website mockup. Create ONE realistic elongated vertical brushstroke of artist's oil/acrylic paint, straight downwards with a slight natural curve, isolated on a genuinely transparent background. Portrait canvas, 1024 x 1536 or higher resolution. The single stroke occupies the central 70 percent of width and 90 percent of height, fully inside the canvas with breathing room. Macro top-down studio photograph of a broad flat hog-bristle brush dragged once across fine linen canvas and lifted at the end. Upper end has an irregular dense rounded press, lower end trails into many individual fine dry bristle strands. Rich raised impasto ridges, hundreds of varied longitudinal grooves, minute cracks, skips where the canvas tooth catches, subtle pigment pooling, visible weave only embedded in thin paint. Natural broken and feathered edges, no geometric outline. Predominantly muted teal and turquoise paint, with intimately mixed tiny veins of deep cobalt, olive, ochre and warm ivory. Keep most of the stroke a harmonious teal family, not rainbow stripes. Soft raking light from upper left reveals tactile ridges with gentle self-shadow and delicate highlights. No visible brush, no objects, no writing, no frame, no background canvas rectangle, no drop shadow outside the pigment, no vector look, no cartoon, no blur. Preserve transparent dry gaps within the paint and actual alpha outside the stroke.

## Ochre generation prompt

Use case: photorealistic-natural. Asset type: transparent high-resolution brushstroke texture for a contemporary painter's website. ONE single long vertical dry-brush stroke, portrait 1024x1536, fully contained with clear transparent margins. True macro top-down photograph of a flat hog-bristle brush pulled downward across fine linen with golden ochre oil paint, tiny veins of burnt sienna, muted citron, and warm cream. A slightly diagonal organic sweep, varying pressure: a broad bristly broken start, narrower middle, spreading into many long fine individual trails at the bottom. Rich physical paint ridges, visible hairline bristle furrows, subtle pigment variations, thin translucent scraped areas, tiny canvas-weave voids where paint skips the surface. Sophisticated real paint, fine detail, soft grazing studio illumination, not a perfect rectangle or leaf shape. Only pigment exists in the image: genuinely transparent background and transparent dry gaps. No canvas rectangle, no fake checkerboard, no colored haze or glow, no visible brush, no shadow outside the paint, no words or objects. Natural irregular edges with fine stray strands. Keep coloration primarily golden ochre, avoid rainbow bands.

## Animation

The page starts with no strokes. A fresh session seed from `crypto.getRandomValues` chooses positions across the entire visible background, rotation, width, opacity, and pigment family. The first stroke begins after 1.2–1.8 seconds; later strokes appear every 2.8–4.8 seconds. Each stroke paints in over 2.8–4.5 seconds, remains for 9–13 seconds, then fades out over 5–7 seconds independently of new strokes. Pigment drifts 7–14 degrees over a 30–45-second cycle. A six-active-stroke limit prevents accumulation, with a few fading layers briefly retained. A horizontal opacity mask makes the middle substantially more transparent than the edges, with a gentler treatment on mobile. Motion, creation, and lifetime timers pause in hidden tabs and under reduced motion. A reduced-motion page load stays clean and still.

