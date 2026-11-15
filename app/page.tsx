import Image from "next/image";
import { artworks } from "@/content/artworks";
import { HomeIntro } from "@/components/home-intro";
import { SiteHeader } from "@/components/site-header";
import { Arrow } from "@/components/arrow";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { Reveal } from "@/components/reveal";
import { PaintBackground } from "@/components/paint-background";
import { PaintedText } from "@/components/painted-text";
import { TouchFeedback } from "@/components/touch-feedback";
import { contact } from "@/content/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  const featured = artworks[0];
  return (
    <HomeIntro>
      <PaintBackground />
      <TouchFeedback />
      <a className="skip-link" href="#main">Saltar al contenido</a>
      <SiteHeader />

      <main id="main">
        <section className="artist-hero" aria-labelledby="hero-title">
          <div className="site-shell artist-hero-layout">
            <Reveal className="artist-hero-copy">
              <p className="artist-hero-eyebrow">Cuerpo · Materia · Transformación</p>
              <h1 id="hero-title" className="artist-hero-title font-display">Del cuerpo<br /><em className="equilibrium-pigment">al equilibrio.</em></h1>
              <blockquote className="artist-hero-manifesto">
                <p>“El arte es un vehículo de sanación y evolución personal donde el cuerpo y la materia transforman el dolor en equilibrio.”</p>
              </blockquote>
            </Reveal>
            <figure className="artist-hero-art">
              <div className="artist-hero-image">
                <Image src={featured.src} alt={featured.alt} width={featured.width} height={featured.height} sizes="(max-width: 767px) 85vw, (max-width: 1280px) 46vw, 580px" preload className="h-auto w-full" />
                <span className="artist-hero-side" aria-hidden="true">Pintura seleccionada — Daniela Salem</span>
              </div>
              <figcaption className="artist-hero-caption">
                <span><span className="artist-hero-index">01</span>{featured.title}</span>
                <span>{featured.dimensions}{featured.year && <> · {featured.year}</>}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="work" className="ribbon-section" aria-labelledby="work-title">
          <ArtworkGallery ribbon />
        </section>

        <section id="about" className="about-section relative overflow-hidden bg-forest text-ink" aria-labelledby="about-title">
          <div className="site-shell section-space relative z-1">
            <Reveal className="about-grid grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
              <div><p className="eyebrow text-ink">02 / Detrás de las pinturas</p><span className="about-monogram mt-12 block font-display italic text-[var(--panel-emphasis)]" aria-hidden="true">ds.</span><p className="mt-5 text-sm text-ink">Daniela Salem<br /><span className="mt-1 block text-xs">Pintora contemporánea</span></p></div>
              <div><PaintedText as="h2" id="about-title" className="about-title font-display">El arte comienza<br />donde las palabras<br /><em className="text-[var(--panel-emphasis)]">terminan.</em></PaintedText><div className="mt-9 grid gap-6 text-sm leading-7 text-ink sm:grid-cols-2"><p>Un rostro, un símbolo, un lugar en la memoria. Las pinturas de Daniela Salem llevan formas familiares a un mundo de color vibrante y gesto expresivo.</p><p>Un espacio para la curiosidad y la conexión. Un lugar para detenerse, sentir y descubrir algo diferente en cada mirada.</p></div><a className="text-link mt-9 inline-flex min-h-11 items-center gap-8 border-b border-ink/30 pb-2 text-sm" href="/about">Conoce a la artista <Arrow diagonal /></a></div>
            </Reveal>
          </div>
          <span className="about-orbit" aria-hidden="true" />
        </section>

        <section id="contact" className="site-shell section-space" aria-labelledby="contact-title">
          <Reveal>
            <p className="eyebrow mb-8 text-muted">03 / Hablemos</p>
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <PaintedText as="h2" id="contact-title" className="contact-title font-display">¿Algo ha<br />captado tu <em>mirada?</em></PaintedText>
              <div className="min-w-0 pb-2 md:max-w-90"><p className="mb-6 text-sm leading-7 text-muted">Para conversar sobre las obras,<br />colaborar o simplemente saludar.</p><a className="text-link inline-flex min-h-11 max-w-full items-center gap-3 border-b border-ink pb-2 text-sm sm:text-base" href={contact.emailHref}><span className="break-all">{contact.email}</span><Arrow diagonal className="shrink-0" /></a><a className="text-link mt-4 flex min-h-11 items-center gap-3 text-sm" href={contact.instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Daniela Salem: @artdsalem, se abre en una nueva pestaña">Instagram / {contact.instagram} <Arrow diagonal className="!h-3 !w-3" /></a></div>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter backToTop />
    </HomeIntro>
  );
}
