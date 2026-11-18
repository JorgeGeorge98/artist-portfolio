import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";

export function pageMetadata(lang: Locale, pathname: string, title: string, description: string): Metadata {
  const es = new URL(pathname, siteUrl).href;
  const en = new URL(`/en${pathname === "/" ? "" : pathname}`, siteUrl).href;
  const url = lang === "en" ? en : es;
  const images = [{ url: new URL("/social-preview.jpg", siteUrl).href, width: 1200, height: 630, alt: "Daniela Salem — Pintura contemporánea" }];
  return {
    title, description,
    alternates: { canonical: url, languages: { es, en, "x-default": es } },
    openGraph: { title, description, url, siteName: "Daniela Salem", type: "website", locale: lang === "en" ? "en_GB" : "es_ES", alternateLocale: lang === "en" ? "es_ES" : "en_GB", images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
