"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RedAccentLine } from "@/components/RedAccentLine";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { projects } from "@/lib/data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const teaser = projects.slice(0, 3);

export function TeaserRealisations() {
  return (
    <section className="bg-brand-offwhite py-16">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="font-display text-4xl uppercase text-brand-black sm:text-5xl">
            Nos transformations
          </h2>
          <RedAccentLine />
        </motion.div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teaser.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link href={`/realisations/${p.slug}`} className="block">
                <BeforeAfterSlider
                  beforeImage={p.coverBefore}
                  afterImage={p.coverAfter}
                  title={p.title}
                  category={p.category}
                  duration={p.duration}
                  location={p.location}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/realisations"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-2 border-brand-red font-heading font-semibold uppercase text-brand-red"
            )}
          >
            Voir toutes les réalisations →
          </Link>
        </div>
      </div>
    </section>
  );
}
