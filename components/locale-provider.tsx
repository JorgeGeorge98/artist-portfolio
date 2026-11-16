"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getTranslator, localizePath, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>("es");
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const locale = useContext(LocaleContext);
  return { locale, t: getTranslator(locale), path: (value: string) => localizePath(locale, value) };
}
