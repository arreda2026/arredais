"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RedAccentLine } from "@/components/RedAccentLine";
import { RealisationGridCard } from "@/components/realisations/RealisationGridCard";
import { projects } from "@/lib/realisations";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMessages } from "@/components/i18n/MessagesProvider";
import { useLocale } from "@/lib/i18n/useLocale";
import { localizedPath } from "@/lib/i18n/href";

const teaser = projects.slice(0, 6);

export function TeaserRealisations() {
  const messages = useMessages();
  const locale = useLocale();
  const t = messages.home.teaser;

  return (
    <section className="bg-gradient-to-b from-brand-offwhite via-brand-offwhite to-brand-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-brand-black">
            {t.portfolio}
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-none text-brand-black sm:text-5xl md:text-6xl">
            {t.title}
          </h2>
          <RedAccentLine />
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-brand-gray md:text-lg">{t.lead}</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-7">
          {teaser.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <RealisationGridCard project={project} priority={i < 3} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={localizedPath(locale, "/realisations")}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-2 border-brand-black font-heading font-semibold uppercase text-brand-black"
            )}
          >
            {t.ctaAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
