"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RedAccentLine } from "@/components/RedAccentLine";
import { pillars, unsplash } from "@/lib/data";

export function PillarsSection() {
  return (
    <section className="bg-brand-offwhite py-16">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl uppercase text-brand-black sm:text-5xl">
            Pourquoi ARREDA
          </h2>
          <RedAccentLine />
        </motion.div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-10">
            {pillars.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden rounded-xl border border-black/5 bg-white p-6 shadow-card"
              >
                <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[120px] leading-none text-brand-red/10">
                  {p.n}
                </span>
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">
                  {p.n}
                </p>
                <h3 className="mt-2 font-heading text-xl font-bold text-brand-black">
                  {p.title}
                </h3>
                <p className="mt-2 font-body text-brand-gray">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-xl shadow-card ring-1 ring-black/5"
          >
            <Image
              src={unsplash.bois}
              alt="Artisan travaillant le bois à l’atelier"
              width={900}
              height={1100}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
