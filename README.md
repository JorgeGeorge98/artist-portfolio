# Daniela Salem — portfolio prototype

A responsive contemporary painting portfolio built with Next.js App Router, TypeScript, and Tailwind CSS 4.

## Local development

```sh
npm install
npm run dev
```

Open the local address printed by Next.js (normally http://localhost:3000).

```sh
npm run lint
npx tsc --noEmit
npm run build
```

## Structure

- `app/page.tsx`: homepage, navigation, introduction, and contact/footer.
- `app/globals.css`: design tokens, responsive composition, and reduced-motion styles.
- `public/textures/canvas-weave.svg`: lightweight, seamless linen weave and fine grain beneath the paint; the texture is static and does not cover artwork or text.
- `components/artwork-gallery.tsx`: gallery and native modal artwork viewer. Supports Escape, arrow keys, focus containment, and return focus.
- `components/gallery-scene.tsx`: loads the 3D gallery only when the artwork dialog opens, with a normal-image fallback when WebGL 2 is unavailable.
- `public/textures/gallery-quartz.webp`: generated ivory quartz-look porcelain for the 3D walls, with physically lit grain, mineral roughness variation, and a satin finish. Provenance and prompt: `docs/gallery-materials.md`.
- `lib/gallery-room.ts`: Three.js room, individual spotlights, frame shadows, and a camera that pans between paintings. Images retain their original aspect ratios and relative pixel sizes (200 image pixels per scene unit); these mockup sizes are not real artwork dimensions. Reduced motion switches views immediately. Rendering runs on demand and GPU resources are disposed when the viewer closes.
- `components/reveal.tsx`: progressive scroll animation using IntersectionObserver and the Web Animations API. Content is readable without JavaScript; reduced-motion preferences are respected.
- `components/painted-text.tsx`: desktop hover/focus pigment effects; on touch devices the logo sweeps once on arrival and headings sweep once as they enter view. Touch links and cards have immediate press feedback. Reduced motion disables automatic sweeps and retains static press colors.
- `components/use-touch-input.ts`: detects hover/pointer capability, including tablets, rather than relying on viewport width.
- `components/touch-feedback.tsx`: passive pointer feedback for touch controls, cleared on release, cancellation, or scroll without delaying their actions.
- `components/paint-background.tsx`: starts empty, then paints randomized textures across the background. Each stroke shifts color, rests, and fades out on its own timer. The center is more transparent to protect readability. Timers and animation pause in hidden tabs and under reduced motion; decorative layers cannot intercept clicks.
- `lib/paint-strokes.ts`: per-visit RNG, full-background placement, stroke lifetimes, and a six-active-stroke limit (plus briefly fading layers).
- `docs/paint-textures.md`: texture provenance, generation prompts, and animation tuning notes.
- `content/artworks.ts`: typed artwork catalogue, actual source dimensions, and descriptive alternative text.

## Artwork assets

The supplied assets are in `public/artworks/`, rather than `public/images/artworks/`:

| Filename | Pixel dimensions |
| --- | --- |
| `ojo.png` | 452 × 310 |
| `mujer.png` | 190 × 287 |
| `panteon.png` | 382 × 290 |

All artwork uses `next/image` with its original aspect ratio and no cropping. Higher-resolution originals are recommended before launch. Working display titles follow the filenames; themes and introductory copy are draft editorial text, not confirmed artist statements. No medium, date, dimensions in centimetres, or availability is invented.

## Before launch

- Confirm biography, artwork titles, and final copy with the artist.
- Replace the reserved placeholder email `hello@danielasalem.example` and generic Instagram/Pinterest destinations with verified contact information.
- This visual prototype uses a mail link; it does not yet contain a contact form or email delivery backend.
- Add the final domain and social sharing image to metadata when available.

System serif and sans-serif fonts keep rendering independent of external font services. Motion powers the paint effects; entrance reveals use native browser APIs. Reduced-motion preferences stop pigment movement and retain a static hover color treatment. Forced-colors mode hides decorative pigment layers.
