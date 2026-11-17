import { getTranslator, localizePath, type Locale } from "@/lib/i18n";
import { PaintedText } from "@/components/painted-text";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { SiteHeader } from "@/components/site-header";
import { PaintBackground } from "@/components/paint-background";
import { Reveal } from "@/components/reveal";
import { TouchFeedback } from "@/components/touch-feedback";


export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang: locale } = await params;
  const t = getTranslator(locale);
  const path = (value: string) => localizePath(locale, value);
  return (
    <>
      <PaintBackground />
      <TouchFeedback />
      <a className="skip-link" href="#main">{t("Saltar al contenido")}</a>
      <SiteHeader about />
      <main id="main" lang={locale} className="artist-profile">
        <section className="site-shell profile-hero" aria-labelledby="artist-about-title">
          <div className="profile-introduction">
            <p className="eyebrow profile-kicker"><span aria-hidden="true" />{t("Sobre mí / Artista plástica")}</p>
            <h1 id="artist-about-title" className="profile-name font-display">Daniela<br /><em className="hero-accent">Salem.</em></h1>
            <ul className="profile-qualifications" aria-label={t("Formación académica")}>
              <li><span>{t("Grado en Bellas Artes")}</span><span className="text-muted">{t("Universidad de Salamanca")}</span></li>
              <li><span>{t("Máster Universitario en Formación del Profesorado")}</span><span className="text-muted">{t("Universidad de Almería")}</span></li>
            </ul>
            <p className="profile-statement font-display">{t("Mi práctica artística surge de una necesidad íntima de autoconocimiento: explorar quién soy y plasmar mi mundo interior.")}</p>
            <a href="#practica" className="text-link profile-read-link">{t("Conoce mi universo")} <Arrow className="rotate-90 !h-4 !w-4" /></a>
          </div>
          <figure className="profile-portrait">
            <div className="profile-photo"><Image src="/images/Daniela Salem.png" width={595} height={773} alt={t("Daniela Salem sentada junto a una de sus pinturas de una figura humana en tonos azules, verdes y amarillos.")} sizes="(max-width: 767px) 85vw, (max-width: 1280px) 39vw, 460px" preload className="h-auto w-full" /></div>
            <figcaption><span>Daniela Salem</span><span>{t("Una mirada desde dentro")}</span></figcaption>
          </figure>
          <nav className="profile-chapters" aria-label={t("Secciones de Sobre mí")}><a href="#practica"><span>01</span> {t("La mirada")}</a><a href="#proceso"><span>02</span> {t("El gesto")}</a><a href="#trayectoria"><span>03</span> {t("El camino")}</a><a href="#proyectos"><span>04</span> {t("Proyectos")}</a><span className="profile-chapters-note">{t("Cuerpo · Emoción · Transformación")}</span></nav>
        </section>

        <section id="practica" className="site-shell profile-chapter" aria-labelledby="practice-title">
          <Reveal className="profile-chapter-heading"><p className="eyebrow text-muted">{t("01 / La mirada")}</p><PaintedText as="h2" id="practice-title" className="profile-heading font-display">{t("Percepción de mi")}<br /><em>{t("mundo interior.")}</em></PaintedText></Reveal>
          <Reveal className="profile-prose">
            <p>{t("Está profundamente vinculada a mi experiencia personal con la fibromialgia y el dolor crónico, vivencias que han influido en mi manera de percibir y representar el cuerpo, las emociones y el espacio. A través del arte, proyecto y exploro este proceso de transformación, convirtiendo las sensaciones físicas y emocionales en una búsqueda de armonía, aceptación y equilibrio.")}</p>
            <p>{t("A lo largo de mi trayectoria, el arte se ha convertido en una forma de explorar experiencias personales, emociones y distintas maneras de percibir el mundo. Me interesa expresar a través del arte aquello que muchas veces resulta difícil explicar con palabras y crear obras que permitan al espectador encontrar su propia interpretación. El color ocupa un lugar fundamental en mi trabajo. A través de una paleta vibrante, exploro la relación entre el color, la forma y la composición para expresar diferentes emociones y experiencias.")}</p>
            <p>{t("Tomando como referencia la fuerza expresiva de las formas curvas y la escultura griega clásica, trabajo la figura humana desde una perspectiva contemporánea, integrándola en atmósferas dinámicas envolventes.")}</p>
          </Reveal>
        </section>

        <section id="proceso" className="profile-process" aria-labelledby="process-title">
          <div className="site-shell profile-chapter">
            <Reveal className="profile-chapter-heading"><p className="eyebrow text-ink">{t("02 / El gesto")}</p><h2 id="process-title" className="profile-heading font-display"><em>{t("Proceso Creativo.")}</em></h2><div className="profile-materials" aria-label={t("Materiales")}>Gesso<span aria-hidden="true" />{t("Acrílico")}<span aria-hidden="true" />{t("Gesto")}</div></Reveal>
            <Reveal className="profile-prose">
              <p>{t("Mediante la superposición de capas de gesso y acrílico, utilizo la mancha, la materia y la pincelada gestual como recursos de exploración e introspección. El color adquiere un papel fundamental en la construcción de cada obra, no solo como elemento compositivo, sino también como expresión de estados emocionales y huella de mi propio proceso creativo.")}</p>
              <p>{t("La forma y el color se combinan para crear imágenes que reflejan una manera personal de sentir y comprender el mundo que nos rodea. Mi trabajo explora el cambio y la transformación, dejando espacio a la espontaneidad de cada proceso creativo, más allá de la búsqueda de la perfección.")}</p>
              <p>{t("A través de mis obras, busco transmitir equilibrio, fuerza y esperanza, entendiendo el arte como un medio para mostrar mi universo artístico.")}</p>
            </Reveal>
          </div>
        </section>

        <section id="trayectoria" className="site-shell profile-chapter profile-biography" aria-labelledby="biography-title">
          <Reveal className="profile-chapter-heading"><p className="eyebrow text-muted">{t("03 / El camino")}</p><PaintedText as="h2" id="biography-title" className="profile-heading font-display"><em>{t("Trayectoria.")}</em></PaintedText><p className="profile-location">{t("Un recorrido entre creación y enseñanza.")}</p></Reveal>
          <Reveal className="profile-prose profile-milestones">
            <div><PaintedText as="h3" className="eyebrow">{t("El origen / Caracas")}</PaintedText><p>{t("Nací en Caracas, Venezuela; desde niña mostré interés por el arte.")}</p></div>
            <div><PaintedText as="h3" className="eyebrow">2016 / Salamanca</PaintedText><p>{t("En 2016 me trasladé a España para estudiar el Grado en Bellas Artes en la Universidad de Salamanca, donde tuve una formación integral y luego me especialicé en pintura.")}</p></div>
            <div><PaintedText as="h3" className="eyebrow">{t("Ampliar la mirada / Sevilla")}</PaintedText><p>{t("Durante mi formación realicé un programa de intercambio en la Universidad de Sevilla, una experiencia que enriqueció mi práctica artística y amplió mi perspectiva sobre el arte contemporáneo.")}</p></div>
            <div><PaintedText as="h3" className="eyebrow">{t("Creación y enseñanza")}</PaintedText><p>{t("Posteriormente cursé un Máster en Formación del Profesorado, combinando mi interés por la creación artística con la enseñanza.")}</p></div>
          </Reveal>
        </section>

        <section id="proyectos" className="site-shell profile-chapter border-t border-line" aria-labelledby="projects-title">
          <Reveal className="profile-chapter-heading">
            <p className="eyebrow text-muted">{t("04 / Exposiciones")}</p>
            <PaintedText as="h2" id="projects-title" className="profile-heading font-display">{t("Proyectos")}</PaintedText>
          </Reveal>
          <Reveal>
            <ul className="divide-y divide-line">
              {[
                { title: "Cafetería La Galería", detail: t("Exposición individual"), year: "2024–2025" },
                { title: "Academia de Arte IONA", detail: t("Exposición colectiva"), year: "2024–2025" },
                { title: t("Exposición colectiva"), detail: t("Universidad de Salamanca · USAL"), year: "2018" },
                { title: t("Exposición colectiva"), detail: "Venezuela · Club Puerto Azul", year: "2015" },
              ].map((project) => (
                <li key={`${project.title}-${project.year}`} className="grid gap-3 py-7 first:pt-0 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <div>
                    <PaintedText as="h3" className="font-display text-2xl leading-snug">{project.title}</PaintedText>
                    <p className="mt-2 text-sm leading-7 text-muted">{project.detail}</p>
                  </div>
                  <p className="text-sm text-muted tabular-nums sm:pt-1">{project.year}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="site-shell profile-invitation" aria-labelledby="profile-invitation-title">
          <Reveal><p className="eyebrow text-muted">{t("La mirada continúa")}</p><Link href={path("/gallery")} className="profile-collection-link"><PaintedText as="h2" id="profile-invitation-title" className="font-display">{t("Dentro de")} <em>{t("la obra.")}</em></PaintedText><span className="profile-collection-arrow" aria-hidden="true"><Arrow diagonal /></span></Link></Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
 const { lang } = await params;
 const title = lang === "en" ? "About — Daniela Salem" : "Sobre mí — Daniela Salem";
 const description = lang === "en" ? "Daniela Salem's artistic practice: body, colour and introspection. Discover her creative process and her journey between Venezuela and Spain." : "La práctica artística de Daniela Salem: cuerpo, color e introspección. Conoce su proceso creativo y su trayectoria entre Venezuela y España.";
 return { title, description, openGraph: { title, description, locale: lang === "en" ? "en_GB" : "es_ES" }, alternates: { languages: { es: "/about", en: "/en/about", "x-default": "/about" } } };
}
