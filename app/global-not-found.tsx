import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Daniela Salem",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return <html lang="es"><body>
    <main className="site-shell section-space">
      <p className="eyebrow mb-8">Daniela Salem / 404</p>
      <h1 className="text-4xl">Esta página no está aquí.</h1>
      <p lang="en" className="mt-4 text-xl text-muted">This page isn&apos;t here.</p>
      <div className="mt-10 flex flex-wrap gap-8">
        <Link className="text-link min-h-11 underline" href="/">Volver al inicio</Link>
        <Link className="text-link min-h-11 underline" href="/en" lang="en">Back to home</Link>
      </div>
    </main>
  </body></html>;
}
