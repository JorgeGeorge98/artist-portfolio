import { english } from "@/content/english";

export type Locale = "es" | "en";
export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}
export function getTranslator(locale: Locale) {
  return (text: string) => locale === "en" ? (english[text] ?? english[text.replace(/\s+/g, " ").trim()] ?? text) : text;
}
export function localizePath(locale: Locale, path: string) {
  return locale === "en" ? `/en${path === "/" ? "" : path.startsWith("/#") ? path.slice(1) : path}` : path;
}
