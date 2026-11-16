"use client";

import { useLocale } from "@/components/locale-provider";

import { PaintedText } from "@/components/painted-text";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  const { t, path } = useLocale();
  return <><SiteHeader /><main className="site-shell section-space"><p className="eyebrow mb-6 text-muted">{t("404 / Página no encontrada")}</p><PaintedText as="h1" className="section-title font-display">{t("Esta página no está aquí.")}</PaintedText><p className="mt-6 text-muted">{t("Puedes volver al inicio o descubrir las obras de la colección.")}</p><div className="mt-8 flex flex-wrap gap-8"><Link href={path("/")} className="text-link py-3 underline">{t("Volver al inicio")}</Link><Link href={path("/gallery")} className="text-link py-3 underline">{t("Explorar la colección")}</Link></div></main></>;
}
