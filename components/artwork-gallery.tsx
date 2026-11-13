"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { artworks } from "@/content/artworks";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";
import { PaintedText } from "@/components/painted-text";
import { ArtworkRibbon } from "@/components/artwork-ribbon";
import { GalleryScene } from "@/components/gallery-scene";

export function ArtworkGallery({ catalogue = false, ribbon = false }: { catalogue?: boolean; ribbon?: boolean }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const visibleArtworks = artworks.map((item, index) => ({ item, index })).filter(({ item }) =>
    `${item.title} ${item.description} ${item.dimensions} ${item.year ?? ""} ${item.alt}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedQuery),
  );
  const [selected, setSelected] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [viewerMode, setViewerMode] = useState<"image" | "gallery">("image");
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const artwork = artworks[selected];

  function openArtwork(index: number, mode: "image" | "gallery" = "image") {
    setSelected(index);
    setViewerMode(mode);
    setIsOpen(true);
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function restoreScroll() {
    setIsOpen(false);
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }

  useEffect(() => () => {
    if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
  }, []);

  function navigate(direction: number) {
    setSelected((current) => (current + direction + artworks.length) % artworks.length);
  }

  return (
    <>
      {catalogue && <>
        <div className="gallery-invitation">
          <div><p className="eyebrow mb-3 text-lime">Otra perspectiva</p><PaintedText as="h2" light className="font-display text-3xl sm:text-4xl">Adéntrate. <em>Quédate un rato.</em></PaintedText><p className="mt-3 max-w-100 text-sm leading-6 text-paper/75">Descubre las pinturas en las paredes de una galería virtual tranquila y llena de luz.</p></div>
          <button className="gallery-enter" onClick={() => openArtwork(0, "gallery")} aria-haspopup="dialog">Entrar en la galería <Arrow /></button>
        </div>
        <div className="gallery-search-row">
          <div className="w-full sm:max-w-110"><label htmlFor="artwork-search" className="eyebrow mb-3 block text-muted">Encuentra una obra</label><div className="flex items-center gap-3 border-b border-ink pb-3"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><input id="artwork-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en la colección" className="min-h-11 min-w-0 flex-1 bg-transparent text-sm outline-offset-2" /></div></div>
          <p className="text-xs text-muted" role="status" aria-atomic="true">{visibleArtworks.length} {visibleArtworks.length === 1 ? "obra" : "obras"}{normalizedQuery && (visibleArtworks.length === 1 ? " encontrada" : " encontradas")}</p>
        </div>
        {visibleArtworks.length === 0 && <div className="border-y border-line py-16 text-center"><p className="font-display text-3xl">No se han encontrado obras.</p><p className="mt-3 text-sm text-muted">Prueba con otra búsqueda.</p><button className="text-link mt-5 min-h-11 border-b border-ink text-sm" onClick={() => setQuery("")}>Mostrar todas las obras</button></div>}
      </>}
      {ribbon ? <ArtworkRibbon onSelect={openArtwork} viewerOpen={isOpen} /> : <div className={catalogue ? "catalogue-grid" : "artwork-grid"}>
        {(catalogue ? visibleArtworks : artworks.slice(0, 3).map((item, index) => ({ item, index }))).map(({ item, index }) => (
          <Reveal key={item.src} className={`artwork-item artwork-item-${index + 1}`}>
            <button className="artwork-button group w-full text-left" onClick={() => openArtwork(index)} aria-label={`Ver obra ${index + 1}: ${item.title} en el visor`} aria-haspopup="dialog">
              <div className="artwork-mat relative flex items-center justify-center">
                <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes={catalogue ? "(max-width: 639px) 85vw, (max-width: 1023px) 42vw, 28vw" : index === 1 ? "(max-width: 767px) 65vw, 27vw" : "(max-width: 767px) 80vw, 44vw"} className="artwork-image h-auto w-full" />
                <span className="view-artwork absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink" aria-hidden="true"><Arrow diagonal /></span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-3 border-t border-line pt-4">
                <div><PaintedText as="h3" className="font-display text-[30px] leading-none">{item.title}</PaintedText>{!catalogue && <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">{item.description}</p>}<p className="mt-2 text-xs text-muted">{item.dimensions}{item.year && <> · {item.year}</>}</p></div>
                <span className="eyebrow pt-1 text-muted">{String(index + 1).padStart(2, "0")}</span>
              </div>
            </button>
          </Reveal>
        ))}
        {!catalogue && <Reveal className="gallery-note flex flex-col justify-center">
          <span className="mb-7 block h-px w-12 bg-accent" />
          <PaintedText as="p" className="font-display text-[clamp(2rem,3.4vw,3.3rem)] leading-[1.16] tracking-[-0.035em]">Una forma familiar.<br />Un color inesperado.<br /><em>Otra manera de mirar.</em></PaintedText>
          <p className="mt-7 max-w-65 text-sm leading-7 text-muted">Una invitación a detener la mirada y encontrar tu propio significado en cada trazo.</p>
        </Reveal>}
      </div>}

      <dialog ref={dialog} className={`artwork-dialog ${viewerMode === "image" ? "editorial-viewer" : ""}`} aria-labelledby="artwork-title" aria-describedby="artwork-description" onClose={restoreScroll} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
        <div className="viewer-panel">
          <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
            <span className="eyebrow">{viewerMode === "gallery" ? "Dentro de la galería" : "Una mirada más cercana"}</span>
            <button className="text-link flex min-h-11 items-center gap-3 text-sm" onClick={() => dialog.current?.close()} aria-label="Cerrar el visor de obras">Cerrar <span className="text-2xl font-light" aria-hidden="true">×</span></button>
          </div>
          <div className="viewer-image py-5">
            {isOpen && (viewerMode === "gallery" ? <GalleryScene selected={selected} /> : (
              <div className="artwork-editorial" key={artwork.src}>
                <div className="artwork-title-rail">
                  <span className="editorial-number" aria-hidden="true">{String(selected + 1).padStart(2, "0")}</span>
                  <p className="eyebrow text-muted mb-4">Daniela Salem</p>
                  <PaintedText as="h2" id="artwork-title" className="editorial-title font-display">{artwork.title}</PaintedText>
                  <span className="editorial-rule" aria-hidden="true" />
                </div>
                <div className="artwork-detail-image">
                  <Image src={artwork.src} alt={artwork.alt} width={artwork.width} height={artwork.height} unoptimized loading="eager" className="detail-original" />
                </div>
                <div className="artwork-dimensions-rail"><span className="eyebrow text-muted">Dimensiones</span><p className="mt-4 font-display text-xl leading-relaxed">{artwork.dimensions}</p>{artwork.year && <><span className="eyebrow mt-5 block text-muted">Año</span><p className="mt-2">{artwork.year}</p></>}<span className="editorial-rule" aria-hidden="true" /></div>
              </div>
            ))}
          </div>
          <div className="viewer-details flex items-start justify-between gap-5 border-t border-line pt-5">
            <div className="min-w-0 max-w-170" aria-live="polite" aria-atomic="true">
              <p className="eyebrow mb-2 text-muted">{String(selected + 1).padStart(2, "0")} / {String(artworks.length).padStart(2, "0")}</p>
              {viewerMode === "gallery" ? <PaintedText as="h2" id="artwork-title" className="font-display text-3xl sm:text-4xl">{artwork.title}</PaintedText> : <p className="eyebrow text-muted">Sobre la obra</p>}
              <p id="artwork-description" className="mt-3 text-sm leading-7 text-muted whitespace-pre-line">{artwork.description}</p>
              {viewerMode === "gallery" && <p className="mt-3 text-xs tracking-wide text-muted">{artwork.dimensions}{artwork.year && <> · {artwork.year}</>}</p>}
            </div>
            <div className="flex gap-2"><button className="viewer-control" onClick={() => navigate(-1)} aria-label="Obra anterior"><Arrow className="rotate-180" /></button><button className="viewer-control" onClick={() => navigate(1)} aria-label="Obra siguiente"><Arrow /></button></div>
          </div>
        </div>
      </dialog>
    </>
  );
}
