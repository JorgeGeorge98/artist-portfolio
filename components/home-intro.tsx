"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";


export function HomeIntro({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (finished) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || window.matchMedia("(forced-colors: active)").matches || window.location.hash) {
      setFinished(true);
      return;
    }
    setReady(true);
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
      {!finished && <div className="home-intro" data-ready={ready} aria-label="Bienvenida a Daniela Salem">
        <div className="intro-signature">
          <p className="intro-label">Pintura contemporánea</p>
          <p className="intro-name font-display">Daniela <em>Salem</em></p>
          <span className="intro-rule" aria-hidden="true" />
        </div>
        <button className="intro-skip" onClick={() => setFinished(true)}>Entrar <span aria-hidden="true">↗</span></button>
      </div>}
      <div ref={content}>{children}</div>
    </>
  );
}
