import Image from "next/image";
import { HomeIntro } from "@/components/home-intro";
import { SiteHeader } from "@/components/site-header";
import { Arrow } from "@/components/arrow";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { Reveal } from "@/components/reveal";
import { artworks } from "@/content/artworks";
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
        <section className="site-shell hero hero-compact relative" aria-labelledby="hero-title">
          <div className="hero-topline flex justify-between gap-6">
            <p className="eyebrow flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Pintura contemporánea</p>
            <p className="eyebrow hidden text-muted sm:block">Color. Gesto. Intuición.</p>
          </div>
          <div className="hero-composition">
            <div className="hero-copy relative z-10">
              <PaintedText as="h1" id="hero-title" className="hero-title font-display" mobileDelay={0.5}>Entre<br />emoción<br /><span className="whitespace-nowrap">y <em>color.</em></span></PaintedText>
              <p className="mt-8 max-w-70 text-sm leading-7 text-muted">Pinturas de Daniela Salem.<br />Una exploración del mundo interior<br className="hidden sm:block" /> y del color que nos rodea.</p>
              <a className="text-link mt-7 inline-flex min-h-11 items-center gap-7 border-b border-ink pb-2 text-sm" href="/gallery">Explorar las pinturas <Arrow /></a>
            </div>
            <figure className="hero-art relative">
              <div className="hero-art-frame relative">
                <Image src={featured.src} alt={featured.alt} width={featured.width} height={featured.height} sizes="(max-width: 767px) 85vw, (max-width: 1280px) 48vw, 580px" preload className="relative z-1 h-auto w-full" />
              </div>
              <figcaption className="mt-5 flex items-center justify-between gap-4 text-xs text-muted"><span><span className="mr-3 text-ink">01</span> {featured.title}</span><span className="italic">{featured.dimensions}{featured.year && <> · {featured.year}</>}</span></figcaption>
              <span className="hero-side-label eyebrow text-muted" aria-hidden="true">Pintura seleccionada — Daniela Salem</span>
            </figure>
          </div>
          <div className="hero-bottom flex items-center justify-between border-t border-line py-5">
            <span className="eyebrow text-muted">Una mirada propia</span>
            <a href="#work" className="text-link flex min-h-8 items-center gap-4 text-xs">Mirar más de cerca <Arrow className="!h-4 !w-4 rotate-90" /></a>
          </div>
        </section>

        <section id="work" className="ribbon-section" aria-labelledby="work-title">
          <ArtworkGallery ribbon />
        </section>

        <section id="about" className="about-section relative overflow-hidden bg-forest text-paper" aria-labelledby="about-title">
          <div className="site-shell section-space relative z-1">
            <Reveal className="about-grid grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
              <div><p className="eyebrow text-paper/65">02 / Detrás de las pinturas</p><span className="about-monogram mt-12 block font-display italic text-lime" aria-hidden="true">ds.</span><p className="mt-5 text-sm text-paper/65">Daniela Salem<br /><span className="mt-1 block text-xs">Pintora contemporánea</span></p></div>
              <div><PaintedText as="h2" id="about-title" className="about-title font-display" light>El arte comienza<br />donde las palabras<br /><em className="text-lime">terminan.</em></PaintedText><div className="mt-9 grid gap-6 text-sm leading-7 text-paper/75 sm:grid-cols-2"><p>Un rostro, un símbolo, un lugar en la memoria. Las pinturas de Daniela Salem llevan formas familiares a un mundo de color vibrante y gesto expresivo.</p><p>Un espacio para la curiosidad y la conexión. Un lugar para detenerse, sentir y descubrir algo diferente en cada mirada.</p></div><a className="text-link mt-9 inline-flex min-h-11 items-center gap-8 border-b border-paper/40 pb-2 text-sm" href="/about">Conoce a la artista <Arrow diagonal /></a></div>
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
