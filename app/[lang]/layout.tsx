import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/locale-provider";
import { isLocale } from "@/lib/i18n";

const sans = localFont({
  src: "../../public/fonts/dm-sans.ttf",
  variable: "--font-reading",
  display: "swap",
  weight: "100 1000",
});

const display = localFont({
  src: "../../public/fonts/Marcellus-Regular.ttf",
  weight: "400",
  variable: "--font-editorial",
  display: "swap",
});

const spanishMetadata: Metadata = {
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

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return spanishMetadata;
  return {
    title: "Daniela Salem — Contemporary painting",
    description: "Explore Daniela Salem's paintings: a world of expressive colour, intuitive gestures and unexpected ways of seeing.",
    openGraph: { title: "Daniela Salem — Between emotion and colour", description: "Discover a collection of works by contemporary painter Daniela Salem.", type: "website", locale: "en_GB" },
    icons: { icon: "/icon.svg" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html
      lang={lang}
      className={`${sans.variable} ${display.variable} antialiased`}
    >
      <body><LocaleProvider locale={lang}>{children}</LocaleProvider></body>
    </html>
  );
}
