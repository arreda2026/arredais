"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RedAccentLine } from "@/components/RedAccentLine";
import { realisationImages } from "@/lib/media";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const teaser = realisationImages.slice(0, 6);

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
          <p className="mt-4 max-w-2xl font-body text-brand-gray">
            Quelques réalisations récentes livrées par ARREDA. Découvrez la galerie complète
            pour voir plus de projets.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teaser.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href="/realisations"
                className="block overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-black/5"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={src}
                    alt={`Réalisation ARREDA ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
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
