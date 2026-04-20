import type { Metadata } from "next";
import Image from "next/image";
import { RedAccentLine } from "@/components/RedAccentLine";
import { equipment, processSteps, unsplash } from "@/lib/data";

export const metadata: Metadata = {
  title: "Atelier de production",
  description: "Processus, machines et galerie de l’atelier ARREDA à Conakry.",
};

const gallery = [
  unsplash.atelier,
  unsplash.bois,
  unsplash.cuisine,
  unsplash.bureau,
  unsplash.salon,
  unsplash.hero,
];

export default function AtelierPage() {
  return (
    <div className="bg-brand-white">
      <section className="px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl uppercase text-brand-black sm:text-6xl">
            Atelier de production
          </h1>
          <RedAccentLine />
          <p className="mt-4 max-w-2xl font-body text-brand-gray">
            Un parcours clair, de la sélection du bois à la pose chez vous.
          </p>
        </div>
      </section>

      <section className="bg-brand-offwhite px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:flex-col md:snap-none md:overflow-visible">
            {processSteps.map((s, i) => (
              <div
                key={s.title}
                className="min-w-[240px] snap-start rounded-xl border border-black/5 bg-white p-5 shadow-card md:min-w-0 md:flex md:gap-6"
              >
                <span className="font-display text-4xl text-brand-red">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-2xl" aria-hidden>
                    {s.emoji}
                  </p>
                  <h2 className="mt-2 font-heading text-lg font-bold text-brand-black">{s.title}</h2>
                  <p className="mt-2 font-body text-sm text-brand-gray">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl uppercase text-brand-black">Galerie atelier</h2>
          <RedAccentLine />
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {gallery.map((src, i) => (
              <div key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-xl shadow-card ring-1 ring-black/5">
                <Image
                  src={src}
                  alt={`Atelier ARREDA — cliché ${i + 1}`}
                  width={800}
                  height={600 + (i % 3) * 120}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-offwhite px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl uppercase text-brand-black">
            Nos machines & équipements
          </h2>
          <RedAccentLine />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((e) => (
              <div key={e.title} className="rounded-xl border border-black/5 bg-white p-5 shadow-card">
                <h3 className="font-heading font-bold text-brand-black">{e.title}</h3>
                <p className="mt-2 text-sm text-brand-gray">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-red py-14 text-center text-white">
        <p className="mx-auto max-w-4xl px-4 font-display text-3xl uppercase leading-tight sm:text-4xl">
          ARREDA fabrique ses meubles — nous ne sommes pas revendeurs
        </p>
      </section>
    </div>
  );
}
