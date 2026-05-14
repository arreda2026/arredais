"use client";

import { motion } from "framer-motion";
import { RedAccentLine } from "@/components/RedAccentLine";
import { CornerMark } from "@/components/CornerMark";
import { ServiceIcon } from "@/components/ServiceIcon";
import { useMessages } from "@/components/i18n/MessagesProvider";

export function ServicesSection() {
  const messages = useMessages();
  const services = messages.home.services;

  return (
    <section className="bg-brand-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="font-display text-4xl uppercase text-brand-black sm:text-5xl">
            {messages.home.servicesTitle}
          </h2>
          <RedAccentLine />
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={`${s.title}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-xl border border-black/5 bg-white p-6 shadow-card transition-shadow hover:shadow-lg"
            >
              <div className="absolute left-0 top-0 h-1 w-0 bg-brand-red transition-all duration-300 group-hover:w-full" />
              <CornerMark position="tl" />
              <CornerMark position="br" />
              <div className="text-brand-black">
                <ServiceIcon name={s.icon} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-brand-black">{s.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-brand-gray">{s.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
