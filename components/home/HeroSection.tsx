"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GuineaRibbon } from "@/components/GuineaRibbon";
import { RedAccentLine } from "@/components/RedAccentLine";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { useMessages } from "@/components/i18n/MessagesProvider";
import { useLocale } from "@/lib/i18n/useLocale";
import { localizedPath } from "@/lib/i18n/href";

const heroImage = "/images/hero-accueil.webp";

const wa = buildWhatsAppUrl(defaultWhatsAppMessage);

export function HeroSection() {
  const messages = useMessages();
  const locale = useLocale();
  const h = messages.home.hero;

  return (
    <section className="bg-brand-offwhite">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <h1 className="font-display normal-case leading-[1.05] text-brand-black">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="block text-4xl sm:text-6xl lg:text-[4.25rem]"
            >
              {h.line1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className="mt-3 block max-w-xl text-2xl font-medium leading-snug tracking-tight text-brand-black sm:text-3xl lg:text-[2.1rem]"
            >
              {h.line2}
            </motion.span>
            <RedAccentLine className="mt-4" />
          </h1>

          <GuineaRibbon className="mt-6 max-w-xs rounded-sm" />

          <p className="mt-6 max-w-xl font-body text-lg text-brand-gray">{h.lead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={localizedPath(locale, "/realisations")}
              className={cn(
                buttonVariants({ size: "lg" }),
                "border-0 bg-brand-black font-heading font-semibold uppercase tracking-wide text-white hover:bg-black/85"
              )}
            >
              {h.ctaRealisations}
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-2 border-brand-black bg-white font-heading font-semibold uppercase tracking-wide text-brand-black hover:bg-brand-offwhite"
              )}
            >
              {h.ctaQuote}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-2 -top-2 h-full w-full rounded-lg border-4 border-brand-red lg:-right-4 lg:-top-4" />
          <div className="relative overflow-hidden rounded-lg bg-white shadow-card">
            <Image
              src={heroImage}
              alt={h.heroAlt}
              width={1024}
              height={682}
              className="aspect-[512/341] h-auto w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-heading font-bold uppercase text-brand-black shadow-lg ring-1 ring-black/5">
            {h.badge}
          </div>
        </div>
      </div>
    </section>
  );
}
