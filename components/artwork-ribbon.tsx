"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { artworks } from "@/content/artworks";
import { Arrow } from "@/components/arrow";

export function ArtworkRibbon({ onSelect, viewerOpen }: { onSelect: (index: number) => void; viewerOpen: boolean }) {
  const [paused, setPaused] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  const cycleWidth = useRef(0);
  const drag = useRef<{ id: number; x: number; moved: boolean; time: number; velocity: number } | null>(null);
  const rebound = useRef<{ start: number; velocity: number; offset: number } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || viewerOpen) rebound.current = null;
    let frame = 0;
    let previous = 0;
    const strip = track.current;
    const group = strip?.firstElementChild;
    if (!strip || !group) return;
    const measure = () => { cycleWidth.current = group.getBoundingClientRect().width; };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(group);
    function tick(time: number) {
      const delta = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (element && strip && !paused && !viewerOpen && !drag.current && !document.hidden && !reducedMotion.matches && !element.querySelector(":focus-visible")) {
        const width = cycleWidth.current;
        if (width > 0) {
          let springTravel = 0;
          const spring = rebound.current;
          if (spring) {
            const elapsed = (time - spring.start) / 1000;
            // A damped spring carries the release forward, then gently pulls back.
            const offset = elapsed < 1.2 ? spring.velocity / 14 * Math.exp(-7 * elapsed) * Math.sin(14 * elapsed) : 0;
            springTravel = offset - spring.offset;
            spring.offset = offset;
            if (elapsed >= 1.2) rebound.current = null;
          }
          const next = position.current + element.scrollLeft + delta * 0.045 + springTravel;
          position.current = ((next % width) + width) % width;
          if (element.scrollLeft) element.scrollLeft = 0;
          strip.style.transform = `translate3d(${-position.current}px, 0, 0)`;
        }
      }
      frame = requestAnimationFrame(tick);
    }
    function resetForReducedMotion() {
      if (reducedMotion.matches) {
        rebound.current = null;
        position.current = 0;
        strip!.style.transform = "none";
      }
    }
    resetForReducedMotion();
    reducedMotion.addEventListener("change", resetForReducedMotion);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      reducedMotion.removeEventListener("change", resetForReducedMotion);
    };
  }, [paused, viewerOpen]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    rebound.current = null;
    drag.current = { id: event.pointerId, x: event.clientX, moved: false, time: performance.now(), velocity: 0 };
    suppressClick.current = false;
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const distance = current.x - event.clientX;
    if (!current.moved && Math.abs(distance) < 5) return;
    current.moved = true;
    suppressClick.current = true;
    setDragging(true);
    const now = performance.now();
    const elapsed = Math.max(now - current.time, 8);
    current.velocity = current.velocity * 0.3 + Math.max(-1.5, Math.min(1.5, distance / elapsed)) * 0.7;
    current.time = now;
    const element = event.currentTarget;
    if (!element.hasPointerCapture(event.pointerId)) element.setPointerCapture(event.pointerId);
    const width = cycleWidth.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !width) {
      element.scrollLeft += distance;
    } else {
      position.current = ((position.current + element.scrollLeft + distance) % width + width) % width;
      element.scrollLeft = 0;
      if (track.current) track.current.style.transform = `translate3d(${-position.current}px, 0, 0)`;
    }
    current.x = event.clientX;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (current?.id !== event.pointerId) return;
    const now = performance.now();
    if (event.type === "pointerup" && current.moved && now - current.time < 120 && !paused && !viewerOpen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rebound.current = { start: now, velocity: current.velocity * 1000, offset: 0 };
    }
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return (
    <div className="artwork-ribbon" data-paused={paused || viewerOpen}>
      <div className="site-shell ribbon-heading">
        <h2 id="work-title" className="eyebrow">La colección</h2>
        <button className="ribbon-pause text-link" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Reanudar movimiento" : "Pausar movimiento"}</button>
      </div>
      <div ref={viewport} className="ribbon-window" data-dragging={dragging} onFocusCapture={(event) => {
        if (event.target.matches(":focus-visible")) {
          rebound.current = null;
          position.current = 0;
          if (track.current) track.current.style.transform = "none";
          event.target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
        }
      }} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={(event) => { if (event.target === event.currentTarget) endDrag(event); }} onPointerLeave={(event) => { if (!drag.current?.moved) endDrag(event); }} onDragStart={(event) => event.preventDefault()} onClickCapture={(event) => { if (suppressClick.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); } }}>
        <div ref={track} className="ribbon-track">
          {[0, 1].map((copy) => (
            <div className="ribbon-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {artworks.map((artwork, index) => (
                <button key={artwork.src} className="ribbon-artwork" style={{ width: `calc(var(--ribbon-height) * ${artwork.width / artwork.height})` }} onClick={() => onSelect(index)} tabIndex={copy === 1 ? -1 : 0} aria-label={`Ver ${artwork.title}`} aria-haspopup="dialog">
                  <div className="ribbon-image">
                    <Image src={artwork.src} alt={copy === 1 ? "" : artwork.alt} width={artwork.width} height={artwork.height} sizes="(max-width: 767px) 330px, 540px" draggable={false} />
                    <span className="ribbon-view" aria-hidden="true"><Arrow diagonal /></span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="site-shell ribbon-footer"><p className="text-sm text-muted">Detén la mirada. Descubre cada obra.</p><Link href="/gallery" className="text-link inline-flex min-h-11 items-center gap-5 border-b border-ink text-sm">Explorar la colección <Arrow /></Link></div>
    </div>
  );
}
