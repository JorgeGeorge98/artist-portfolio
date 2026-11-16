"use client";

import type { ImageLoaderProps } from "next/image";

// Matching responsive files are generated before development and production builds.
export default function staticImageLoader({ src, width }: ImageLoaderProps) {
  return `/optimized${src.split("/").map(segment => encodeURIComponent(segment)).join("/")}/${width}.webp`;
}
