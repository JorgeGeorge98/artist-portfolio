import AboutPage, { generateMetadata as localizedMetadata } from "@/app/[lang]/about/page";

export function generateMetadata() {
  return localizedMetadata({ params: Promise.resolve({ lang: "es" }) });
}
export default function SpanishAbout() {
  return <AboutPage params={Promise.resolve({ lang: "es" })} />;
}
