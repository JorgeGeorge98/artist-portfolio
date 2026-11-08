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
- `components/artwork-gallery.tsx`: gallery and native modal artwork viewer. Supports Escape, arrow keys, focus containment, and return focus.
- `components/reveal.tsx`: progressive scroll animation using IntersectionObserver and the Web Animations API. Content is readable without JavaScript; reduced-motion preferences are respected.
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

System serif and sans-serif fonts keep rendering independent of external font services. Animations use native browser APIs; no animation dependency is required.
