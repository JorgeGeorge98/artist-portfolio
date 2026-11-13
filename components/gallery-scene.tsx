"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { artworks } from "@/content/artworks";
import { useReducedMotion } from "@/components/use-reduced-motion";
import type { GalleryRoom } from "@/lib/gallery-room";

export function GalleryScene({ selected }: { selected: number }) {
  const host = useRef<HTMLDivElement>(null);
  const room = useRef<GalleryRoom | null>(null);
  const reduceMotion = useReducedMotion();
  const settings = useRef({ selected, reduceMotion });
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const artwork = artworks[selected];

  useEffect(() => {
    settings.current = { selected, reduceMotion };
    room.current?.select(selected, reduceMotion);
  }, [selected, reduceMotion]);

  useEffect(() => {
    let cancelled = false;
    let instance: GalleryRoom | null = null;
    const fail = () => {
      if (cancelled) return;
      setStatus("fallback");
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
      }, canvas);
      room.current = instance;
    }).catch(fail);

    return () => {
      cancelled = true;
      instance?.dispose();
      room.current = null;
    };
  }, []);

  return (
    <div className="gallery-scene" data-state={status}>
      <div ref={host} className="gallery-render" role="img" aria-label={`Sala de exposición con ${artwork.title} bajo un foco. ${artwork.alt}`} />
      {status === "loading" && <div className="gallery-loading" role="status"><span className="gallery-loading-mark" aria-hidden="true" /><p className="eyebrow">Abriendo la galería</p></div>}
      {status === "ready" && <div className="gallery-scene-note eyebrow" aria-hidden="true">La galería <span> / </span> {String(selected + 1).padStart(2, "0")}</div>}
      {status === "fallback" && <div className="gallery-fallback"><Image src={artwork.src} alt={artwork.alt} width={artwork.width} height={artwork.height} sizes="(max-width: 767px) 85vw, 65vw" className="h-auto max-h-[48svh] w-auto max-w-full object-contain" /><p className="mt-4 text-center text-xs text-muted" role="status">La galería 3D no está disponible en este dispositivo. Puedes seguir explorando las pinturas.</p></div>}
    </div>
  );
}
