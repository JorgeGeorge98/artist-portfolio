import type { Metadata } from "next";
import { getTranslator, localizePath, type Locale } from "@/lib/i18n";
import { PaintedText } from "@/components/painted-text";
import { HeroPhotos } from "@/components/hero-photos";
import { HomeIntro } from "@/components/home-intro";
import { SiteHeader } from "@/components/site-header";
import { Arrow } from "@/components/arrow";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { Reveal } from "@/components/reveal";
import { PaintBackground } from "@/components/paint-background";
import { TouchFeedback } from "@/components/touch-feedback";
import { contact } from "@/content/contact";
import { SiteFooter } from "@/components/site-footer";

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang: locale } = await params;
  const t = getTranslator(locale);
  const path = (value: string) => localizePath(locale, value);
  return (
    <HomeIntro>
      <PaintBackground />
      <TouchFeedback />
      <a className="skip-link" href="#main">{t("Saltar al contenido")}</a>
      <SiteHeader />

      <main id="main">
        <section className="artist-hero" aria-labelledby="hero-title">
          <div className="site-shell artist-hero-layout">
            <Reveal className="artist-hero-copy">
              <p className="artist-hero-eyebrow">{t("Cuerpo · Emoción · Transformación")}</p>
              <h1 id="hero-title" className="artist-hero-title font-display">{t("Transformación")}<br />{t("y sanación")}<br /><em className="equilibrium-pigment">{t("a través del color")}</em></h1>
              <blockquote className="artist-hero-manifesto">
                <p>{t("“El arte es un vehículo de sanación y evolución personal donde el cuerpo y la materia transforman el dolor en equilibrio.”")}</p>
              </blockquote>
            </Reveal>
            <HeroPhotos />
          </div>
        </section>

        <section id="work" className="ribbon-section" aria-labelledby="work-title">
          <ArtworkGallery ribbon />
        </section>

        <section id="about" className="about-section relative overflow-hidden bg-forest text-ink" aria-labelledby="about-title">
          <div className="site-shell section-space relative z-1">
            <Reveal className="about-grid grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
              <div><p className="eyebrow text-ink">{t("02 / Detrás de las pinturas")}</p><span className="about-monogram mt-12 block font-display italic text-[var(--panel-emphasis)]" aria-hidden="true">ds.</span><p className="mt-5 text-sm text-ink">Daniela Salem<br /><span className="mt-1 block text-xs">{t("Pintora contemporánea")}</span></p></div>
              <div><h2 id="about-title" className="about-title font-display">{t("El arte comienza")}<br />{t("donde las palabras")}<br /><em className="text-[var(--panel-emphasis)]">{t("terminan.")}</em></h2><div className="mt-9 grid gap-6 text-sm leading-7 text-ink sm:grid-cols-2"><p>{t("A lo largo de mi trayectoria, el arte se ha convertido en una forma de explorar experiencias personales, emociones y distintas maneras de percibir el mundo.")}</p><p>{t("Me interesa expresar a través del arte aquello que muchas veces resulta difícil explicar con palabras y crear obras que permitan al espectador encontrar su propia interpretación.")} </p></div>
                    <a className="text-link mt-9 inline-flex min-h-11 items-center gap-8 border-b border-ink/30 pb-2 text-sm" href={path("/about")}>{t("Conoce a la artista")} <Arrow diagonal /></a></div>
            </Reveal>
          </div>
          <span className="about-orbit" aria-hidden="true" />
        </section>

        <section id="contact" className="site-shell section-space" aria-labelledby="contact-title">
          <Reveal>
            <p className="eyebrow mb-8 text-muted">{t("03 / Hablemos")}</p>
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <PaintedText as="h2" id="contact-title" className="contact-title font-display">{t("¿Algo ha")}<br />{t("captado tu")} <em>{t("mirada?")}</em></PaintedText>
              <div className="min-w-0 pb-2 md:max-w-90"><p className="mb-6 text-sm leading-7 text-muted">{t("Para conversar sobre las obras,")}<br />{t("colaborar o simplemente saludar.")}</p><a className="text-link inline-flex min-h-11 max-w-full items-center gap-3 border-b border-ink pb-2 text-sm sm:text-base" href={contact.emailHref}><span className="break-all">{contact.email}</span><Arrow diagonal className="shrink-0" /></a><a className="text-link mt-4 flex min-h-11 items-center gap-3 text-sm" href={contact.instagramHref} target="_blank" rel="noopener noreferrer" aria-label={t("Instagram de Daniela Salem: @artdsalem, se abre en una nueva pestaña")}>Instagram / {contact.instagram} <Arrow diagonal className="!h-3 !w-3" /></a><a className="text-link mt-2 flex min-h-11 items-center gap-3 text-sm" href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={t("Contactar por WhatsApp")}>WhatsApp / {contact.whatsapp} <Arrow diagonal className="!h-3 !w-3" /></a></div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter backToTop />
    </HomeIntro>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
 const { lang } = await params;
 const title = lang === "en" ? "Daniela Salem — Contemporary painting" : "Daniela Salem — Pintura contemporánea";
 const description = lang === "en" ? "Explore Daniela Salem's paintings: a world of expressive colour, intuitive gestures and unexpected ways of seeing." : "Explora las pinturas de Daniela Salem: un mundo de color expresivo, gestos intuitivos y formas inesperadas de mirar.";
 return { title, description, openGraph: { title, description, locale: lang === "en" ? "en_GB" : "es_ES" }, alternates: { languages: { es: "/", en: "/en", "x-default": "/" } } };
}
