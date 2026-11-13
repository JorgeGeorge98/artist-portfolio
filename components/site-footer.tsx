import { Arrow } from "@/components/arrow";
import { contact } from "@/content/contact";

export function SiteFooter({ backToTop = false }: { backToTop?: boolean }) {
  return (
    <footer className="site-shell border-t border-line pb-8 pt-7">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-xs text-muted">
        <p>© Daniela Salem <span className="mx-2 text-line">/</span> Un mundo de color.</p>
        <div className="flex min-w-0 flex-wrap items-center gap-x-7 gap-y-1">
          <a href={contact.emailHref} className="text-link inline-flex min-h-11 min-w-0 items-center gap-2"><span className="break-all">{contact.email}</span><Arrow diagonal className="!h-3 !w-3 shrink-0" /></a>
          <a href={contact.instagramHref} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 items-center gap-2" aria-label="Instagram de Daniela Salem: @artdsalem, se abre en una nueva pestaña">{contact.instagram}<Arrow diagonal className="!h-3 !w-3" /></a>
          {backToTop && <a href="#" className="text-link inline-flex min-h-11 min-w-11 items-center justify-center" aria-label="Volver al inicio"><Arrow className="-rotate-90" /></a>}
        </div>
      </div>
    </footer>
  );
}
