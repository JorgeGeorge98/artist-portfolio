import { pageMetadata } from "@/lib/seo";
import { getTranslator, type Locale } from "@/lib/i18n";
import { PaintedText } from "@/components/painted-text";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { SiteHeader } from "@/components/site-header";
import { PaintBackground } from "@/components/paint-background";
import { TouchFeedback } from "@/components/touch-feedback";


export default async function GalleryPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang: locale } = await params;
  const t = getTranslator(locale);
  return (
    <>
      <PaintBackground />
      <TouchFeedback />
      <a className="skip-link" href="#main">{t("Saltar al contenido")}</a>
      <SiteHeader gallery />
      <main id="main" className="site-shell gallery-page">
        <div className="mb-10">
          <p className="eyebrow mb-5 text-muted">{t("Daniela Salem / La colección")}</p>
          <PaintedText as="h1" className="section-title font-display">{t("La")} <em>{t("colección")}</em></PaintedText>
          <p className="mt-6 max-w-110 text-sm leading-7 text-muted">{t("Color, gesto y otra forma de mirar. Descubre las pinturas a tu ritmo.")}</p>
        </div>
        <ArtworkGallery catalogue />
      </main>
      <SiteFooter />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
 const { lang } = await params;
 const title = lang === "en" ? "Collection — Daniela Salem" : "Colección — Daniela Salem";
 const description = lang === "en" ? "Discover Daniela Salem's paintings, explore the collection and step into an immersive virtual gallery." : "Descubre las pinturas de Daniela Salem, explora la colección y adéntrate en una galería virtual inmersiva.";
 return pageMetadata(lang, "/gallery", title, description);
}
