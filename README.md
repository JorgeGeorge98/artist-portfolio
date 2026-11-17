# Daniela Salem portfolio

Bilingual contemporary art portfolio built with Next.js App Router, TypeScript,
Tailwind CSS, Motion and Three.js. Prepared as a static Cloudflare Pages site.

## Development and verification

Use Node.js 22 (also specified in `.node-version`).

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

`npm run build` generates responsive images, exports the site to `out/`, then
checks routes, referenced assets and Cloudflare Pages file-size/count limits.
The export finalizer also supplies flattened navigation-file aliases when building
on Windows, to avoid a Next.js 16.4 static-export prefetch filename mismatch.
`npm run preview` serves the exported files at http://127.0.0.1:3000, without a
Next.js server. Stop development before previewing on the same port.

## Cloudflare Pages deployment

Create a **Pages** project connected to this Git repository. Use these settings:

| Setting | Value |
| --- | --- |
| Root directory | Directory containing this package.json; `artist-portfolio` if the repository includes its parent folder, otherwise leave blank |
| Framework preset | Next.js (Static HTML Export), or None with the settings below |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `22` (`.node-version`, or set `NODE_VERSION=22`) |

Use a Git-integrated Pages project for automatic builds on pushes. No deployment
command, Worker, Next.js adapter, runtime secrets or paid image service is needed.
For manual dashboard deployment, build locally and upload the contents of `out/`.
Attach the final domain in the Pages project's Custom domains settings after
checking the preview deployment. This repository preparation does not publish it.

Set the build environment variable `SITE_URL` to the full production URL (including
`https://`) for absolute Spanish/English SEO alternate links. Rebuild after changing
the domain. Without it, builds use `CF_PAGES_URL` on Cloudflare, the Vercel production
URL on Vercel, or localhost for local development. Set `SITE_URL` for local builds
intended for manual upload too.

## Routes and languages

Spanish is the default: `/`, `/about`, `/gallery`.
English: `/en`, `/en/about`, `/en/gallery`.

`app/(spanish)` supplies Spanish route wrappers. The page components in
`app/[lang]` are shared by both languages, and only English is exported through
the dynamic language segment. All six routes are HTML files; no Proxy or
server rewrite is needed. `public/_redirects` redirects the former `/es` URLs.
A bilingual `404.html` handles unknown URLs with a real 404 on Pages.
`public/_headers` sets static-asset caching and basic response headers.

Update both versions when editing text. English UI translations are in
`content/english.ts`, and artwork descriptions in `content/localized-artworks.ts`.
Artwork titles remain in Spanish.

## Artwork and image updates

- Original paintings: `public/artworks/`.
- Catalogue, prices, availability and physical dimensions: `content/artworks.ts`.
- Hero artist photos: `public/images/`, selected in `components/hero-photos.tsx`.
- Contacts: `content/contact.ts` (email, Instagram and WhatsApp).
- 3D artwork textures: `public/gallery-artworks/`.

After replacing artwork images, update their catalogue pixel dimensions and
regenerate the 3D copies:

```sh
node scripts/prepare-gallery-textures.mjs
npm run build
```

Responsive WebP sizes are generated automatically before development and builds
by `scripts/prepare-static-images.mjs`. They are ignored by Git and cached locally
using source-content hashes. The `next/image` loader serves these static files;
there is no `/_next/image` endpoint. The detail viewer still loads the original
high-resolution painting. All derivatives retain their source aspect ratio.
The brushstroke textures and their behavior are independent of this image step.

The site retains its intro collage, animated paintings, search, accessible artwork
dialog, 3D gallery, hover effects, and reduced-motion support. Contact currently
uses email and social links. A future email-sending form would need a separate
service or endpoint.

## Before publishing

Check both languages, mobile navigation, search, artwork details, sold labels,
inquiry links and the 3D gallery on the Pages preview URL. Confirm final artwork
information with the artist. Add the real domain/social sharing image to metadata
when those are available. Keep originals under Cloudflare Pages' 25 MiB per-file
limit; the build checks this and the free-plan 20,000-file limit.
