import Home, { generateMetadata as localizedMetadata } from "@/app/[lang]/page";

export function generateMetadata() {
  return localizedMetadata({ params: Promise.resolve({ lang: "es" }) });
}
export default function SpanishHome() {
  return <Home params={Promise.resolve({ lang: "es" })} />;
}
