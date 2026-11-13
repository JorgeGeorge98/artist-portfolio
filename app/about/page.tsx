import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { SiteHeader } from "@/components/site-header";
import { PaintBackground } from "@/components/paint-background";
import { PaintedText } from "@/components/painted-text";
import { Reveal } from "@/components/reveal";
import { TouchFeedback } from "@/components/touch-feedback";

export const metadata: Metadata = {
  title: "Sobre mí — Daniela Salem",
  description: "La práctica artística de Daniela Salem: cuerpo, color e introspección. Conoce su proceso creativo y su trayectoria entre Venezuela y España.",
};

export default function AboutPage() {
  return (
    <>
      <PaintBackground />
      <TouchFeedback />
      <a className="skip-link" href="#main">Saltar al contenido</a>
      <SiteHeader about />
      <main id="main" lang="es" className="artist-profile">
        <section className="site-shell profile-hero" aria-labelledby="artist-about-title">
          <div className="profile-introduction">
            <p className="eyebrow profile-kicker"><span aria-hidden="true" />Sobre mí / Artista plástica</p>
            <PaintedText as="h1" id="artist-about-title" className="profile-name font-display">Daniela<br /><em>Salem.</em></PaintedText>
            <ul className="profile-qualifications" aria-label="Formación académica">
              <li><span>Grado en Bellas Artes</span><span className="text-muted">Universidad de Salamanca</span></li>
              <li><span>Máster Universitario en Formación del Profesorado</span><span className="text-muted">Universidad de Almería</span></li>
            </ul>
            <p className="profile-statement font-display">Mi práctica artística surge de una necesidad íntima de autoconocimiento: explorar quién soy y plasmar las complejidades de mi mundo interior.</p>
            <a href="#practica" className="text-link profile-read-link">Conoce mi universo <Arrow className="rotate-90 !h-4 !w-4" /></a>
          </div>
          <figure className="profile-portrait">
            <div className="profile-photo"><Image src="/images/Daniela Salem.png" width={595} height={773} alt="Daniela Salem sentada junto a una de sus pinturas de una figura humana en tonos azules, verdes y amarillos." sizes="(max-width: 767px) 85vw, (max-width: 1280px) 39vw, 460px" preload className="h-auto w-full" /></div>
            <figcaption><span>Daniela Salem</span><span>Una mirada desde dentro</span></figcaption>
          </figure>
          <nav className="profile-chapters" aria-label="Secciones de Sobre mí"><a href="#practica"><span>01</span> La mirada</a><a href="#proceso"><span>02</span> El gesto</a><a href="#trayectoria"><span>03</span> El camino</a><span className="profile-chapters-note">Cuerpo. Materia. Transformación.</span></nav>
        </section>

        <section id="practica" className="site-shell profile-chapter" aria-labelledby="practice-title">
          <Reveal className="profile-chapter-heading"><p className="eyebrow text-muted">01 / La mirada</p><PaintedText as="h2" id="practice-title" className="profile-heading font-display">El cuerpo como<br /><em>punto de partida.</em></PaintedText></Reveal>
          <Reveal className="profile-prose">
            <p>Está profundamente vinculada a mi experiencia personal con la fibromialgia y el dolor crónico, vivencias que han influido en mi manera de percibir y representar el cuerpo, las emociones y el espacio. A través del arte, proyecto y exploro este proceso de transformación, convirtiendo las sensaciones físicas y emocionales en una búsqueda de armonía, aceptación y equilibrio.</p>
            <p>Tomando como referencia la fuerza expresiva de las formas curvas y la escultura griega clásica, trabajo la figura humana desde una perspectiva contemporánea, integrándola en atmósferas dinámicas envolventes.</p>
          </Reveal>
        </section>

        <section id="proceso" className="profile-process" aria-labelledby="process-title">
          <div className="site-shell profile-chapter">
            <Reveal className="profile-chapter-heading"><p className="eyebrow text-paper/70">02 / El gesto</p><PaintedText as="h2" id="process-title" light className="profile-heading font-display">Capas de materia.<br /><em>Huellas de emoción.</em></PaintedText><div className="profile-materials" aria-label="Materiales">Gesso<span aria-hidden="true" />Acrílico<span aria-hidden="true" />Gesto</div></Reveal>
            <Reveal className="profile-prose">
              <p>Mediante la superposición de capas de gesso y acrílico, utilizo la mancha, la materia y la pincelada gestual como recursos de exploración e introspección. El color adquiere un papel fundamental en la construcción de cada obra, no solo como elemento compositivo, sino también como expresión de estados emocionales y huella de mi propio proceso creativo.</p>
              <p>En este lenguaje plástico, las figuras escultóricas abandonan su rigidez inicial para adquirir movimiento y fundirse progresivamente con el entorno. Los contrastes cromáticos, las texturas y la gestualidad pictórica reflejan una transición entre la tensión y la serenidad, dando forma a una búsqueda constante de equilibrio entre el cuerpo, las emociones y el espacio.</p>
            </Reveal>
          </div>
        </section>

        <section id="trayectoria" className="site-shell profile-chapter profile-biography" aria-labelledby="biography-title">
          <Reveal className="profile-chapter-heading"><p className="eyebrow text-muted">03 / El camino</p><PaintedText as="h2" id="biography-title" className="profile-heading font-display">De Caracas<br /><em>a España.</em></PaintedText><p className="profile-location">Un recorrido entre creación y enseñanza.</p></Reveal>
          <Reveal className="profile-prose profile-milestones">
            <div><h3 className="eyebrow">El origen / Caracas</h3><p>Nací en Caracas, Venezuela; desde niña mostré interés por el arte.</p></div>
            <div><h3 className="eyebrow">2016 / Salamanca</h3><p>En 2016 me trasladé a España para estudiar el Grado en Bellas Artes en la Universidad de Salamanca, donde tuve una formación integral y luego me especialicé en pintura.</p></div>
            <div><h3 className="eyebrow">Ampliar la mirada / Sevilla</h3><p>Durante mi formación realicé un programa de intercambio en la Universidad de Sevilla, una experiencia que enriqueció mi práctica artística y amplió mi perspectiva sobre el arte contemporáneo.</p></div>
            <div><h3 className="eyebrow">Creación y enseñanza</h3><p>Posteriormente cursé un Máster en Formación del Profesorado, combinando mi interés por la creación artística con la enseñanza.</p></div>
          </Reveal>
        </section>

        <section className="site-shell profile-invitation" aria-labelledby="profile-invitation-title">
          <Reveal><p className="eyebrow text-muted">La mirada continúa</p><Link href="/gallery" className="profile-collection-link"><PaintedText as="h2" id="profile-invitation-title" className="font-display">Dentro de <em>la obra.</em></PaintedText><span className="profile-collection-arrow" aria-hidden="true"><Arrow diagonal /></span></Link></Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
