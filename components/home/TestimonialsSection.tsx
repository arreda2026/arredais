"use client";

import { motion } from "framer-motion";
import { RedAccentLine } from "@/components/RedAccentLine";
import { useMessages } from "@/components/i18n/MessagesProvider";

export function TestimonialsSection() {
  const messages = useMessages();
  const testimonials = messages.home.testimonials;

  return (
    <section className="bg-brand-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl uppercase text-brand-black sm:text-5xl">
            {messages.home.testimonialsTitle}
          </h2>
          <RedAccentLine />
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative overflow-hidden rounded-xl border border-black/5 bg-brand-offwhite/60 p-6 shadow-card"
            >
              <span
                className="pointer-events-none absolute -left-1 -top-6 font-display text-8xl leading-none text-brand-red/25"
                aria-hidden
              >
                “
              </span>
              <p className="relative z-10 font-body text-sm leading-relaxed text-brand-gray">{t.quote}</p>
              <footer className="relative z-10 mt-4 font-heading text-sm font-bold text-brand-black">
                {t.name}
                <span className="mt-1 block text-xs font-medium text-brand-muted">{t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
