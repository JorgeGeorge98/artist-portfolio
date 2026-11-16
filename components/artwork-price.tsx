"use client";

import { useLocale } from "@/components/locale-provider";

import type { Artwork } from "@/content/artworks";

const euroFormat = {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
} as const;

export function ArtworkPrice({ artwork }: { artwork: Artwork }) {
  const { locale, t } = useLocale();
  const euros = new Intl.NumberFormat(locale === "en" ? "en-GB" : "es-ES", euroFormat);
  if (artwork.sold) return <p className="mt-3 text-sm font-medium text-ink">{t("Vendido")}</p>;
  if (artwork.price === null) return null;
  return (
    <p className="mt-3 text-base font-medium text-ink">
      {euros.format(artwork.price)}
      {artwork.priceNote && <span className="ml-2 text-sm font-normal text-muted">{artwork.priceNote}</span>}
    </p>
  );
}
