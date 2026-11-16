"use client";

import { useLocale } from "@/components/locale-provider";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/components/use-reduced-motion";
const photos = [
  "/images/IMG-20260818-WA0072.jpg",
  "/images/IMG-20260818-WA0123.jpg",
  "/images/IMG-20260818-WA0273.jpg",
  "/images/IMG-20260930-WA0108.jpg",
  "/images/IMG-20261002-WA0032.jpg",
  "/images/IMG-20261105-WA0047.jpg",
  "/images/IMG-20261105-WA0055.jpg",
  "/images/IMG-20261105-WA0072.jpg",
];

export function HeroPhotos() {
  const { t } = useLocale();
  const [active, setActive] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const start = window.setTimeout(() => setActive(Math.floor(Math.random() * photos.length)), 0);
    return () => window.clearTimeout(start);
  }, []);

  useEffect(() => {
    if (active === null || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(current => current === null ? 0 : (current + 1) % photos.length);
    }, 12000);
    return () => window.clearInterval(timer);
  }, [active, reducedMotion]);

  return (
    <figure className="artist-hero-art">
      <div className="artist-hero-image hero-photo-frame">
        <div className="hero-photo-stage">
          {active !== null && photos.map((photo, index) => (
            <Image key={photo} src={photo}
              alt={index === active ? t("Daniela Salem junto a sus pinturas") : ""}
              aria-hidden={index !== active}
              fill sizes="(max-width: 767px) 85vw, 470px"
              className={index === active ? "hero-photo is-active" : "hero-photo"}
            />
          ))}
        </div>
        <span className="artist-hero-side" aria-hidden="true">{t("Daniela Salem — Entre obras")}</span>
      </div>
    </figure>
  );
}
