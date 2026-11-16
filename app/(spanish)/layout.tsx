import RootLayout, { generateMetadata as localizedMetadata } from "@/app/[lang]/layout";
import type { ReactNode } from "react";

export function generateMetadata() {
  return localizedMetadata({ params: Promise.resolve({ lang: "es" }) });
}

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <RootLayout params={Promise.resolve({ lang: "es" })}>{children}</RootLayout>;
}
