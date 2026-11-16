"use client";

import { useLocale } from "@/components/locale-provider";
import Image from "next/image";
import { artworks } from "@/content/artworks";

import { useEffect, useRef, useState, type ReactNode } from "react";

const introArtworks = [0, 2, 7, 9, 12, 14, 19, 20].map(index => artworks[index]);

export function HomeIntro({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (finished) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || window.matchMedia("(forced-colors: active)").matches || window.location.hash) {
      const skip = window.requestAnimationFrame(() => setFinished(true));
      return () => window.cancelAnimationFrame(skip);
    }
    const start = window.requestAnimationFrame(() => setReady(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (content.current) content.current.inert = true;
    const end = () => setFinished(true);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") end(); };
    const timer = window.setTimeout(end, 2100);
    document.addEventListener("keydown", onKey);
    reduced.addEventListener("change", end);
    const node = content.current;
    return () => {
      window.cancelAnimationFrame(start);
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      reduced.removeEventListener("change", end);
      document.body.style.overflow = previousOverflow;
      if (node) node.inert = false;
    };
  }, [finished]);

  return (
    <>
      <noscript><style>{".home-intro { display: none !important; }"}</style></noscript>
      {!finished && <div className="home-intro" data-ready={ready} aria-label={t("Bienvenida a Daniela Salem")}>
        <div className="intro-collage" aria-hidden="true">
          {introArtworks.map((artwork, index) => (
            <div className={`intro-collage-piece intro-collage-piece-${index + 1}`} key={artwork.src}>
              <Image src={artwork.gallerySrc} alt="" width={artwork.width} height={artwork.height} sizes="(max-width: 639px) 55vw, 32vw" loading="eager" />
            </div>
          ))}
        </div>
        <div className="intro-signature">
          <p className="intro-label">{t("Pintura contemporánea")}</p>
          <p className="intro-name font-display">Daniela Salem<span className="ml-1 text-accent">.</span></p>
          <span className="intro-rule" aria-hidden="true" />
        </div>
      </div>}
      <div ref={content}>{children}</div>
    </>
  );
}
