import type { Locale } from "@/lib/i18n/config";

/** Préfixe la route avec la locale (`/about` → `/fr/about`). */
export function localizedPath(locale: Locale, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `/${locale}`;
  return `/${locale}${p}`;
}
