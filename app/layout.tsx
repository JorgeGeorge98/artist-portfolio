import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "../public/fonts/dm-sans.ttf",
  variable: "--font-reading",
  display: "swap",
  weight: "100 1000",
});

const display = localFont({
  src: [
    { path: "../public/fonts/lora.ttf", weight: "400 700", style: "normal" },
    { path: "../public/fonts/lora-italic.ttf", weight: "400 700", style: "italic" },
  ],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniela Salem — Pintura contemporánea",
  description: "Explora las pinturas de Daniela Salem: un mundo de color expresivo, gestos intuitivos y formas inesperadas de mirar.",
  openGraph: {
    title: "Daniela Salem — Entre emoción y color",
    description: "Descubre una selección de obras de la pintora contemporánea Daniela Salem.",
    type: "website",
    locale: "es_ES",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${display.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
