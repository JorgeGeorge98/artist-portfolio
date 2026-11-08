import Image from "next/image";
import { Arrow } from "@/components/arrow";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { Reveal } from "@/components/reveal";
import { artworks } from "@/content/artworks";
import { PaintBackground } from "@/components/paint-background";
import { PaintedText } from "@/components/painted-text";

export default function Home() {
  const featured = artworks[0];

  return (
    <>
      <PaintBackground />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-shell flex min-h-25 items-center justify-between gap-6 border-b border-line">
        <PaintedText as="a" href="#" className="artist-logo" aria-label="Daniela Salem, home">Daniela Salem<span className="ml-1 text-accent">.</span></PaintedText>
        <nav aria-label="Main navigation" className="flex items-center gap-5 text-xs sm:gap-10 sm:text-sm">
          <a className="nav-link" href="#work">Work</a><a className="nav-link" href="#about">About</a><a className="nav-link flex items-center gap-2" href="#contact">Contact <Arrow diagonal className="hidden !h-3.5 !w-3.5 sm:block" /></a>
        </nav>
      </header>

      <main id="main">
        <section className="site-shell hero relative" aria-labelledby="hero-title">
          <div className="hero-topline flex justify-between gap-6">
            <p className="eyebrow flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Contemporary painting</p>
            <p className="eyebrow hidden text-muted sm:block">Colour. Gesture. Intuition.</p>
          </div>
          <div className="hero-composition">
            <div className="hero-copy relative z-10">
              <PaintedText as="h1" id="hero-title" className="hero-title font-display">Between<br />feeling<br /><span className="whitespace-nowrap">&amp; <em>colour.</em></span></PaintedText>
              <p className="mt-8 max-w-70 text-sm leading-7 text-muted">Paintings by Daniela Salem.<br />An exploration of the world within,<br className="hidden sm:block" /> and the colour all around us.</p>
              <a className="text-link mt-7 inline-flex min-h-11 items-center gap-7 border-b border-ink pb-2 text-sm" href="#work">Explore the paintings <Arrow /></a>
            </div>
            <figure className="hero-art relative">
              <div className="hero-art-frame relative">
                <Image src={featured.src} alt={featured.alt} width={featured.width} height={featured.height} sizes="(max-width: 767px) 85vw, (max-width: 1280px) 48vw, 580px" preload className="relative z-1 h-auto w-full" />
              </div>
              <figcaption className="mt-5 flex items-center justify-between gap-4 text-xs text-muted"><span><span className="mr-3 text-ink">01</span> Ojo</span><span className="italic">A window into another world</span></figcaption>
              <span className="hero-side-label eyebrow text-muted" aria-hidden="true">Selected painting — Daniela Salem</span>
            </figure>
          </div>
          <div className="hero-bottom flex items-center justify-between border-t border-line py-5">
            <span className="eyebrow text-muted">An independent perspective</span>
            <a href="#work" className="text-link flex min-h-8 items-center gap-4 text-xs">Take a closer look <Arrow className="!h-4 !w-4 rotate-90" /></a>
          </div>
        </section>

        <section id="work" className="site-shell section-space" aria-labelledby="work-title">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-18">
            <div><p className="eyebrow mb-5 text-muted">01 / The collection</p><PaintedText as="h2" id="work-title" className="section-title font-display">Selected <em>works</em></PaintedText></div>
            <p className="max-w-58 text-sm leading-6 text-muted">Three paintings. Three ways of seeing.<br /><span className="text-xs">Select a work to explore.</span></p>
          </Reveal>
          <ArtworkGallery />
        </section>

        <section id="about" className="about-section relative overflow-hidden bg-forest text-paper" aria-labelledby="about-title">
          <div className="site-shell section-space relative z-1">
            <Reveal className="about-grid grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
              <div><p className="eyebrow text-paper/65">02 / Behind the paintings</p><span className="about-monogram mt-12 block font-display italic text-lime" aria-hidden="true">ds.</span><p className="mt-5 text-sm text-paper/65">Daniela Salem<br /><span className="mt-1 block text-xs">Contemporary painter</span></p></div>
              <div><PaintedText as="h2" id="about-title" className="about-title font-display" light>Art begins where<br />words <em className="text-lime">leave off.</em></PaintedText><div className="mt-9 grid gap-6 text-sm leading-7 text-paper/75 sm:grid-cols-2"><p>A face, a symbol, a remembered place. Daniela Salem’s paintings bring familiar forms into a world of vivid colour and expressive gesture.</p><p>This is a space for curiosity and connection. A place to pause, to feel, and to discover something different each time you look.</p></div><a className="text-link mt-9 inline-flex min-h-11 items-center gap-8 border-b border-paper/40 pb-2 text-sm" href="#contact">Start a conversation <Arrow diagonal /></a></div>
            </Reveal>
          </div>
          <span className="about-orbit" aria-hidden="true" />
        </section>

        <section id="contact" className="site-shell section-space" aria-labelledby="contact-title">
          <Reveal>
            <p className="eyebrow mb-8 text-muted">03 / Let’s connect</p>
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <PaintedText as="h2" id="contact-title" className="contact-title font-display">Something<br />caught your <em>eye?</em></PaintedText>
              <div className="pb-2 md:max-w-80"><p className="mb-6 text-sm leading-7 text-muted">For conversations about the work,<br />collaborations, or simply to say hello.</p><a className="text-link inline-flex min-h-11 items-center gap-5 border-b border-ink pb-2 text-sm sm:text-base" href="mailto:hello@danielasalem.example">hello@danielasalem.example <Arrow diagonal /></a><p className="mt-3 text-[11px] text-muted">Contact address coming soon.</p></div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="site-shell border-t border-line pb-8 pt-7">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 text-xs text-muted">
          <p>© Daniela Salem <span className="mx-2 text-line">/</span> A world in colour.</p>
          <div className="flex items-center gap-7"><a className="text-link inline-flex min-h-11 items-center gap-2" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram placeholder link, opens in a new tab">Instagram <Arrow diagonal className="!h-3 !w-3" /></a><a className="text-link inline-flex min-h-11 items-center gap-2" href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest placeholder link, opens in a new tab">Pinterest <Arrow diagonal className="!h-3 !w-3" /></a><a href="#" className="text-link ml-3" aria-label="Back to top"><Arrow className="-rotate-90" /></a></div>
        </div>
      </footer>
    </>
  );
}
