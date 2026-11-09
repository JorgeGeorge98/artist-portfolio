import type { Metadata } from "next";
import Link from "next/link";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { SiteHeader } from "@/components/site-header";
import { PaintBackground } from "@/components/paint-background";
import { PaintedText } from "@/components/painted-text";
import { TouchFeedback } from "@/components/touch-feedback";

export const metadata: Metadata = {
  title: "Gallery — Daniela Salem",
  description: "Discover Daniela Salem’s paintings, search the collection, and step inside an immersive virtual gallery.",
};

export default function GalleryPage() {
  return (
    <>
      <PaintBackground />
      <TouchFeedback />
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader gallery />
      <main id="main" className="site-shell gallery-page">
        <div className="mb-10">
          <p className="eyebrow mb-5 text-muted">Daniela Salem / The collection</p>
          <PaintedText as="h1" className="section-title font-display">The <em>Gallery</em></PaintedText>
          <p className="mt-6 max-w-110 text-sm leading-7 text-muted">Colour, gesture, and a different way of seeing. Explore the paintings at your own pace.</p>
        </div>
        <ArtworkGallery catalogue />
      </main>
      <footer className="site-shell flex flex-wrap items-center justify-between gap-5 border-t border-line py-8 text-xs text-muted">
        <p>© Daniela Salem / A world in colour.</p>
        <Link href="/#contact" className="text-link py-3">Enquire about a painting ↗</Link>
      </footer>
    </>
  );
}
