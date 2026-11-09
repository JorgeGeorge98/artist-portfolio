import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { PaintedText } from "@/components/painted-text";

export function SiteHeader({ gallery = false }: { gallery?: boolean }) {
  return (
    <header className="site-shell flex min-h-25 items-center justify-between gap-6 border-b border-line">
      <PaintedText as="a" href="/" className="artist-logo" aria-label="Daniela Salem, home">Daniela Salem<span className="ml-1 text-accent">.</span></PaintedText>
      <nav aria-label="Main navigation" className="flex items-center gap-5 text-xs sm:gap-10 sm:text-sm">
        <Link className="nav-link" href="/gallery" aria-current={gallery ? "page" : undefined}>Gallery</Link>
        <Link className="nav-link" href="/#about">About</Link>
        <Link className="nav-link flex items-center gap-2" href="/#contact">Contact <Arrow diagonal className="hidden !h-3.5 !w-3.5 sm:block" /></Link>
      </nav>
    </header>
  );
}
