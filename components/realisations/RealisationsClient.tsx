"use client";

import { RedAccentLine } from "@/components/RedAccentLine";
import { LightboxGallery } from "@/components/gallery/LightboxGallery";
import { realisationImages } from "@/lib/media";

export function RealisationsClient() {
  return (
    <div className="bg-brand-white px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-5xl uppercase text-brand-black sm:text-6xl">
          Réalisations
        </h1>
        <RedAccentLine />
        <p className="mt-4 max-w-2xl font-body text-brand-gray">
          Galerie de nos réalisations livrées. D&apos;autres projets seront ajoutés au fur et à mesure.
        </p>

        <LightboxGallery images={realisationImages} altPrefix="Réalisation ARREDA" />
      </div>
    </div>
  );
}
