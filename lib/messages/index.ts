import type { Locale } from "@/lib/i18n/config";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";

export type Messages = typeof fr;

const dictionaries = {
  fr,
  en,
} as const satisfies Record<Locale, Messages>;

export function getDictionary(locale: Locale): Messages {
  return locale === "en" ? dictionaries.en : dictionaries.fr;
}
