"use client";

import Link from "next/link";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMessages } from "@/components/i18n/MessagesProvider";
import { useLocale } from "@/lib/i18n/useLocale";
import { localizedPath } from "@/lib/i18n/href";

const wa = buildWhatsAppUrl(defaultWhatsAppMessage);

export function FinalCTA() {
  const messages = useMessages();
  const locale = useLocale();
  const c = messages.home.finalCta;

  return (
    <section className="bg-brand-black py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="font-display text-4xl uppercase leading-tight sm:text-5xl">{c.title}</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "border-0 bg-white font-heading font-semibold uppercase text-brand-black hover:bg-brand-offwhite"
            )}
          >
            {c.whatsapp}
          </a>
          <Link
            href={localizedPath(locale, "/devis")}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-2 border-white bg-transparent font-heading font-semibold uppercase text-white hover:bg-white/10"
            )}
          >
            {c.quoteForm}
          </Link>
        </div>
      </div>
    </section>
  );
}
