import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return <><SiteHeader /><main className="site-shell section-space"><p className="eyebrow mb-6 text-muted">404 / Página no encontrada</p><h1 className="section-title font-display">Esta página no está aquí.</h1><p className="mt-6 text-muted">Puedes volver al inicio o descubrir las obras de la colección.</p><div className="mt-8 flex flex-wrap gap-8"><Link href="/" className="text-link py-3 underline">Volver al inicio</Link><Link href="/gallery" className="text-link py-3 underline">Explorar la colección</Link></div></main></>;
}
