"use client";

import { useLocale } from "@/components/locale-provider";

import { Arrow } from "@/components/arrow";
import { contact } from "@/content/contact";

export function SiteFooter({ backToTop = false }: { backToTop?: boolean }) {
  const { t } = useLocale();
  return (
    <footer className="site-shell border-t border-line pb-8 pt-7">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-xs text-muted">
        <p>© Daniela Salem <span className="mx-2 text-line">/</span> {t("Un mundo de color.")}</p>
        <div className="flex min-w-0 flex-wrap items-center gap-x-7 gap-y-1">
          <a href={contact.emailHref} className="text-link inline-flex min-h-11 min-w-0 items-center gap-2"><span className="break-all">{contact.email}</span><Arrow diagonal className="!h-3 !w-3 shrink-0" /></a>
          <a href={contact.instagramHref} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 items-center gap-2" aria-label={t("Instagram de Daniela Salem: @artdsalem, se abre en una nueva pestaña")}>{contact.instagram}<Arrow diagonal className="!h-3 !w-3" /></a>
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 items-center gap-2" aria-label={t("Contactar por WhatsApp, se abre en una nueva pestaña")}>WhatsApp / {contact.whatsapp}<Arrow diagonal className="!h-3 !w-3" /></a>
          {backToTop && <a href="#" className="text-link inline-flex min-h-11 min-w-11 items-center justify-center" aria-label={t("Volver al inicio")}><Arrow className="-rotate-90" /></a>}
        </div>
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-x-1 text-xs text-muted">
        <span>{t("Desarrollado y Diseñado por")}</span>
        <a
          href="https://www.linkedin.com/in/jorge-javitt-b71124265/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link inline-flex min-h-11 items-center gap-1.5"
        >
          Jorge Javitt<Arrow diagonal className="!h-3 !w-3" />
        </a>
      </p>
    </footer>
  );
}
