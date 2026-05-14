"use client";

import { useParams } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

export function useLocale(): Locale {
  const params = useParams();
  const raw = params?.locale;
  return typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;
}
