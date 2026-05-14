"use client";

import Link from "next/link";
import { useMessages } from "@/components/i18n/MessagesProvider";
import { useLocale } from "@/lib/i18n/useLocale";
import { localizedPath } from "@/lib/i18n/href";

export function PrintActions() {
  const messages = useMessages();
  const locale = useLocale();
  const p = messages.printActions;

  return (
    <div className="mt-10 flex flex-wrap gap-3 print:hidden">
      <button
        type="button"
        className="rounded-lg bg-brand-black px-4 py-2 font-heading text-sm font-semibold uppercase text-white hover:bg-black/85"
        onClick={() => window.print()}
      >
        {p.printPdf}
      </button>
      <Link
        href={localizedPath(locale, "/partenaires")}
        className="rounded-lg border-2 border-brand-black px-4 py-2 font-heading text-sm font-semibold uppercase text-brand-black hover:bg-brand-offwhite"
      >
        {p.backPartners}
      </Link>
    </div>
  );
}
