"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { artworks } from "@/content/artworks";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";

export function ArtworkGallery() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const artwork = artworks[selected];

  function openArtwork(index: number) {
    setSelected(index);
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function restoreScroll() {
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
      <div className="artwork-grid">
        {artworks.map((item, index) => (
          <Reveal key={item.src} className={`artwork-item artwork-item-${index + 1}`}>
            <button className="artwork-button group w-full text-left" onClick={() => openArtwork(index)} aria-label={`View ${item.title} in the artwork viewer`} aria-haspopup="dialog">
              <div className="artwork-mat relative flex items-center justify-center">
                <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes={index === 1 ? "(max-width: 767px) 65vw, 27vw" : "(max-width: 767px) 80vw, 44vw"} className="artwork-image h-auto w-full" />
                <span className="view-artwork absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink" aria-hidden="true"><Arrow diagonal /></span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-3 border-t border-line pt-4">
                <div><h3 className="font-display text-[30px] leading-none">{item.title}</h3><p className="mt-2 text-xs text-muted">{item.theme}</p></div>
                <span className="eyebrow pt-1 text-muted">0{index + 1}</span>
              </div>
            </button>
          </Reveal>
        ))}
        <Reveal className="gallery-note flex flex-col justify-center">
          <span className="mb-7 block h-px w-12 bg-accent" />
          <p className="font-display text-[clamp(2rem,3.4vw,3.3rem)] leading-[1.16] tracking-[-0.035em]">A familiar shape.<br />An unexpected colour.<br /><em>A different way of seeing.</em></p>
          <p className="mt-7 max-w-65 text-sm leading-7 text-muted">An invitation to look a little longer, and find your own meaning in the marks.</p>
        </Reveal>
      </div>

      <dialog ref={dialog} className="artwork-dialog" aria-labelledby="artwork-title" aria-describedby="artwork-description" onClose={restoreScroll} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
        <div className="viewer-panel">
          <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
            <span className="eyebrow">A closer look</span>
            <button className="text-link flex min-h-11 items-center gap-3 text-sm" onClick={() => dialog.current?.close()} aria-label="Close artwork viewer">Close <span className="text-2xl font-light" aria-hidden="true">×</span></button>
          </div>
          <div className="viewer-image flex items-center justify-center py-6">
            <Image key={artwork.src} src={artwork.src} alt={artwork.alt} width={artwork.width} height={artwork.height} sizes="(max-width: 767px) 85vw, 65vw" className="h-auto max-h-[60svh] w-auto max-w-full object-contain" />
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
            <div aria-live="polite" aria-atomic="true"><h2 id="artwork-title" className="font-display text-3xl">{artwork.title}</h2><p id="artwork-description" className="mt-1 text-xs text-muted">{artwork.theme} · {selected + 1} of {artworks.length}</p></div>
            <div className="flex gap-2"><button className="viewer-control" onClick={() => navigate(-1)} aria-label="Previous artwork"><Arrow className="rotate-180" /></button><button className="viewer-control" onClick={() => navigate(1)} aria-label="Next artwork"><Arrow /></button></div>
          </div>
        </div>
      </dialog>
    </>
  );
}
