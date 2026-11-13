import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { SiteHeader } from "@/components/site-header";
import { PaintBackground } from "@/components/paint-background";
import { PaintedText } from "@/components/painted-text";
import { TouchFeedback } from "@/components/touch-feedback";

export const metadata: Metadata = {
  title: "Colección — Daniela Salem",
  description: "Descubre las pinturas de Daniela Salem, explora la colección y adéntrate en una galería virtual inmersiva.",
};

export default function GalleryPage() {
  return (
    <>
      <PaintBackground />
      <TouchFeedback />
      <a className="skip-link" href="#main">Saltar al contenido</a>
      <SiteHeader gallery />
      <main id="main" className="site-shell gallery-page">
        <div className="mb-10">
          <p className="eyebrow mb-5 text-muted">Daniela Salem / La colección</p>
          <PaintedText as="h1" className="section-title font-display">La <em>colección</em></PaintedText>
          <p className="mt-6 max-w-110 text-sm leading-7 text-muted">Color, gesto y otra forma de mirar. Descubre las pinturas a tu ritmo.</p>
        </div>
        <ArtworkGallery catalogue />
      </main>
      <SiteFooter />
    </>
  );
}
