"use client";

import { useLocale } from "@/components/locale-provider";
import { localizePath } from "@/lib/i18n";

import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { PaintedText } from "@/components/painted-text";

export function SiteHeader({ gallery = false, about = false }: { gallery?: boolean; about?: boolean }) {
  const { locale, t, path } = useLocale();
  return (
    <header className="site-shell site-header flex min-h-25 items-center justify-between gap-6 border-b border-line">
      <PaintedText as="a" href={path("/")} className="artist-logo" aria-label={t("Daniela Salem, inicio")}>Daniela Salem<span className="ml-1 text-accent">.</span></PaintedText>
      <nav aria-label={t("Navegación principal")} className="font-display flex items-center gap-5 text-xs sm:gap-10 sm:text-sm">
        <Link className="nav-link" href={path("/gallery")} aria-current={gallery ? "page" : undefined}>{t("Colección")}</Link>
        <Link className="nav-link" href={path("/about")} aria-current={about ? "page" : undefined}>{t("Sobre mí")}</Link>
        <Link className="nav-link flex items-center gap-2" href={path("/#contact")}>{t("Contacto")} <Arrow diagonal className="hidden !h-3.5 !w-3.5 sm:block" /></Link>
        <div className="language-switch" role="group" aria-label={locale === "es" ? "Idioma" : "Language"}>
          {(["es", "en"] as const).map((language) => (
            <a key={language} href={localizePath(language, gallery ? "/gallery" : about ? "/about" : "/")} lang={language} hrefLang={language} aria-label={language === "es" ? "Español" : "English"} aria-current={locale === language ? "true" : undefined} onClick={(event) => { event.currentTarget.hash = window.location.hash; }}>{language.toUpperCase()}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}
