import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/gallery"].flatMap(pathname => {
    const es = new URL(pathname, siteUrl).href;
    const en = new URL(`/en${pathname === "/" ? "" : pathname}`, siteUrl).href;
    return [es, en].map(url => ({
      url,
      alternates: { languages: { es, en, "x-default": es } },
    }));
  });
}
