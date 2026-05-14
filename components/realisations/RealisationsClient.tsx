"use client";

import { RedAccentLine } from "@/components/RedAccentLine";
import { RealisationGridCard } from "@/components/realisations/RealisationGridCard";
import { projects } from "@/lib/realisations";

export function RealisationsClient() {
  return (
    <div className="bg-gradient-to-b from-brand-offwhite/40 via-brand-white to-brand-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-brand-black">
          Portfolio
        </p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-none text-brand-black sm:text-6xl md:text-7xl">
          Réalisations
        </h1>
        <RedAccentLine />
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-brand-gray md:text-lg">
          Une sélection de chantiers livrés par ARREDA. Chaque fiche regroupe le récit du projet et une
          galerie — souvent uniquement après travaux, lorsque les clichés « avant » n&apos;existent pas.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => (
            <RealisationGridCard key={project.slug} project={project} priority={i < 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
