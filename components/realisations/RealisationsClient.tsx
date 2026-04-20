"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RedAccentLine } from "@/components/RedAccentLine";
import { RealisationGridCard } from "@/components/realisations/RealisationGridCard";
import { projects, type ProjectFilter } from "@/lib/data";

const filters: ProjectFilter[] = [
  "Tous",
  "Salon",
  "Cuisine",
  "Bureau",
  "Chambre",
  "Commercial",
  "Particulier",
  "Entreprise",
];

export function RealisationsClient() {
  const [active, setActive] = useState<ProjectFilter>("Tous");

  const filtered = useMemo(() => {
    if (active === "Tous") return projects;
    if (active === "Particulier") {
      return projects.filter((p) => p.clientType === "Particulier");
    }
    if (active === "Entreprise") {
      return projects.filter((p) => p.clientType === "Entreprise");
    }
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="bg-brand-white px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-5xl uppercase text-brand-black sm:text-6xl">
          Réalisations
        </h1>
        <RedAccentLine />
        <p className="mt-4 max-w-2xl font-body text-brand-gray">
          Avant / après par pièce sur des chantiers réels. Ouvrez un projet pour comparer les
          espaces en détail.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isOn = active === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`rounded-full px-4 py-2 font-heading text-xs font-semibold uppercase tracking-wide transition-colors ${
                  isOn
                    ? "bg-brand-red text-white"
                    : "bg-brand-offwhite text-brand-black hover:bg-brand-muted/30"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <RealisationGridCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
