import GalleryPage, { generateMetadata as localizedMetadata } from "@/app/[lang]/gallery/page";

export function generateMetadata() {
  return localizedMetadata({ params: Promise.resolve({ lang: "es" }) });
}
export default function SpanishGallery() {
  return <GalleryPage params={Promise.resolve({ lang: "es" })} />;
}
