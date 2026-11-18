"use client";

import { useLocale } from "@/components/locale-provider";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getArtworks } from "@/content/localized-artworks";
import { useReducedMotion } from "@/components/use-reduced-motion";
import type { GalleryRoom } from "@/lib/gallery-room";
import { Arrow } from "@/components/arrow";
import { ArtworkPrice } from "@/components/artwork-price";

function GalleryTitle({ title }: { title: string }) {
  const heading = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const element = heading.current;
    if (!element) return;
    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      element.style.removeProperty("font-size");
      element.style.removeProperty("overflow-wrap");
      let size = parseFloat(getComputedStyle(element).fontSize);
      while (element.scrollWidth > element.clientWidth + 1 && size > 16) {
        size -= 0.5;
        element.style.fontSize = `${size}px`;
      }
      if (element.scrollWidth > element.clientWidth + 1) element.style.overflowWrap = "anywhere";
    };
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    fit();
    void document.fonts.ready.then(fit);
    return () => { cancelled = true; observer.disconnect(); };
  }, [title]);

  return <h2 ref={heading} id="artwork-title" className="font-display">{title}</h2>;
}

export function GalleryScene({ selected, soundOn, onToggleSound, onNavigate, onInquire }: { selected: number; soundOn: boolean; onToggleSound: () => void; onNavigate: (direction: number) => void; onInquire: () => void }) {
  const { locale, t, path } = useLocale();
  const artworks = getArtworks(locale);
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const hud = useRef<HTMLDivElement>(null);
  const room = useRef<GalleryRoom | null>(null);
  const reduceMotion = useReducedMotion();
  const settings = useRef({ selected, reduceMotion });
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const [overview, setOverview] = useState(false);
  const [previousSelected, setPreviousSelected] = useState(selected);
  if (previousSelected !== selected) {
    setPreviousSelected(selected);
    setOverview(false);
  }
  const artwork = artworks[selected];

  useEffect(() => {
    settings.current = { selected, reduceMotion };
    if (hud.current) hud.current.scrollTop = 0;
    room.current?.select(selected, reduceMotion);
  }, [selected, reduceMotion]);

  useEffect(() => {
    let cancelled = false;
    let instance: GalleryRoom | null = null;
    const fail = () => {
      if (cancelled) return;
      setStatus("fallback");
      if (scene.current) scene.current.dataset.moving = "false";
      if (hud.current) hud.current.inert = false;
      room.current?.dispose();
      room.current = null;
    };

    // Three.js and GPU resources are loaded only when the dialog is open.
    void import("@/lib/gallery-room").then(({ GalleryRoom }) => {
      if (cancelled || !host.current) return;
      const canvas = document.createElement("canvas");
      if (!canvas.getContext("webgl2", { antialias: true, alpha: false, powerPreference: "low-power" })) { fail(); return; }
      instance = new GalleryRoom(host.current, settings.current.selected, {
        onReady: () => { if (!cancelled) setStatus("ready"); },
        onError: fail,
        reducedMotion: settings.current.reduceMotion,
        onFrame: ({ left, right, top, moving }) => {
          if (!scene.current || !hud.current) return;
          scene.current.dataset.moving = String(moving);
          const mobileDetails = window.matchMedia("(max-width: 899px), (max-aspect-ratio: 1/1)").matches;
          hud.current.inert = mobileDetails ? scene.current.dataset.overview === "true" : moving;
          scene.current.style.setProperty("--art-left", `${left}px`);
          scene.current.style.setProperty("--art-right", `${right}px`);
          scene.current.style.setProperty("--art-top", `${top}px`);
        },
      }, canvas);
      room.current = instance;
    }).catch(fail);

    return () => {
      cancelled = true;
      instance?.dispose();
      room.current = null;
    };
  }, [locale]);

  return (
    <div ref={scene} className="gallery-scene" data-state={status} data-overview={overview}>
      <button className="gallery-sound text-link" onClick={onToggleSound} aria-pressed={soundOn} aria-label={locale === "en" ? (soundOn ? "Mute gallery music" : "Play gallery music") : (soundOn ? "Silenciar música de la galería" : "Activar música de la galería")}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z" />{soundOn ? <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></> : <path d="m16 9 6 6m0-6-6 6" />}</svg>
        <span>{locale === "en" ? `Sound ${soundOn ? "on" : "off"}` : `Sonido ${soundOn ? "activado" : "desactivado"}`}</span>
      </button>
      <div ref={host} className="gallery-render" role="img" aria-label={locale === "en" ? `Gallery room with ${artwork.title} under a spotlight. ${artwork.alt}` : `Sala de exposición con ${artwork.title} bajo un foco. ${artwork.alt}`} />
      {status === "loading" && <div className="gallery-loading" role="status"><span className="gallery-loading-mark" aria-hidden="true" /><p className="eyebrow">{t("Abriendo la galería")}</p></div>}
      <div ref={hud} className="gallery-hud" aria-live="polite" aria-atomic="true">
        <div className="gallery-hud-identity" key={`identity-${selected}`}>
          <p className="eyebrow gallery-hud-kicker">Daniela Salem / {t("La colección")}</p>
          <GalleryTitle title={artwork.title} />
          <dl className="gallery-hud-facts">
            <div><dt>{t("Dimensiones")}</dt><dd>{artwork.dimensions}</dd></div>
            {artwork.year && <div><dt>{t("Año")}</dt><dd>{artwork.year}</dd></div>}
            <div><dt>{locale === "en" ? "Medium" : "Técnica"}</dt><dd>{t("Acrílico")}</dd></div>
          </dl>
          <ArtworkPrice artwork={artwork} />
          {!artwork.sold && <a href={path("/#contact")} onClick={onInquire} className="text-link gallery-hud-inquire">{t("Consultar")} <Arrow diagonal /></a>}
        </div>
        <div className="gallery-hud-story" key={`story-${selected}`}>
          <p className="eyebrow">{t("Sobre la obra")}</p>
          <div className="gallery-hud-description" tabIndex={0} role="region" aria-label={t("Sobre la obra")}><p id="artwork-description">{artwork.description}</p></div>
        </div>
      </div>
      <div className="gallery-navigation">
        <p className="gallery-location"><span className="eyebrow">{locale === "en" ? "The daylight corridor" : "El corredor de luz"}</span><span>{String(selected + 1).padStart(2, "0")} / {String(artworks.length).padStart(2, "0")}</span></p>
        <div className="flex items-center gap-3">
          {status === "ready" && <button className="gallery-overview text-link" aria-pressed={overview} onClick={() => { setOverview(!overview); room.current?.setOverview(!overview); }}>{overview ? (locale === "en" ? "Back to the artwork" : "Volver a la obra") : (locale === "en" ? "View the corridor" : "Ver el corredor")}</button>}
          <button className="viewer-control" onClick={() => { setOverview(false); onNavigate(-1); }} aria-label={t("Obra anterior")}><Arrow className="rotate-180" /></button><button className="viewer-control" onClick={() => { setOverview(false); onNavigate(1); }} aria-label={t("Obra siguiente")}><Arrow /></button>
        </div>
      </div>
      {status === "fallback" && <div className="gallery-fallback"><Image src={artwork.src} alt={artwork.alt} width={artwork.width} height={artwork.height} sizes="(max-width: 767px) 85vw, 65vw" className="h-auto max-h-[48svh] w-auto max-w-full object-contain" /><p className="mt-4 text-center text-xs text-muted" role="status">{t("La galería 3D no está disponible en este dispositivo. Puedes seguir explorando las pinturas.")}</p></div>}
    </div>
  );
}
