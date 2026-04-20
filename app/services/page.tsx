import type { Metadata } from "next";
import Link from "next/link";
import { RedAccentLine } from "@/components/RedAccentLine";
import { ServiceOfferCard } from "@/components/services/ServiceOfferCard";
import { services } from "@/lib/data";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mobilier résidentiel, bureaux, commerce, rénovation, conseil et installation — ARREDA.",
};

const wa = buildWhatsAppUrl(defaultWhatsAppMessage);

const heroStats = [
  { value: "200+", label: "Projets réalisés" },
  { value: "8 ans", label: "D’expérience" },
  { value: "100%", label: "Fabrication locale" },
] as const;

export default function ServicesPage() {
  return (
    <div className="bg-brand-white">
      <section className="relative overflow-hidden bg-brand-offwhite px-4 pb-16 pt-14 md:pb-24 md:pt-20">
        <p
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(5rem,22vw,14rem)] font-normal uppercase leading-none tracking-tight text-brand-black/[0.06]"
          aria-hidden
        >
          SERVICES
        </p>

        <div className="relative z-10 mx-auto max-w-7xl">
          <h1 className="max-w-3xl font-display text-5xl uppercase leading-[0.95] text-brand-black sm:text-6xl md:text-7xl">
            Ce que nous fabriquons
          </h1>
          <RedAccentLine />
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-brand-gray">
            De la conception à la pose, nous couvrons tout le cycle : résidentiel, bureaux,
            commerce et suivi terrain. Chaque projet est pensé pour le climat, les usages et votre
            budget à Conakry.
          </p>

          <div className="mt-12 grid grid-cols-1 divide-y divide-black/10 rounded-2xl border border-black/5 bg-white shadow-card sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mt-14">
            {heroStats.map((s) => (
              <div key={s.label} className="px-6 py-6 text-center sm:py-8">
                <p className="font-display text-4xl tracking-wide text-brand-red sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 font-heading text-xs font-semibold uppercase tracking-wider text-brand-gray">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-brand-muted">
            <Link href="/devis" className="font-medium text-brand-red underline underline-offset-4">
              Formulaire devis détaillé
            </Link>
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceOfferCard
              key={service.title}
              service={service}
              index={i}
              featured={service.title === "Mobilier de bureau"}
            />
          ))}
        </div>
      </section>

      <section className="bg-brand-red px-4 py-14 text-center md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl uppercase leading-tight text-white sm:text-5xl md:text-6xl">
            Un projet en tête ? Parlons-en tout de suite.
          </h2>
          <p className="mt-4 font-body text-sm text-white/85 md:text-base">
            Réponse rapide sur WhatsApp — devis, dimensions ou visite atelier.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 inline-flex border-0 bg-white font-heading text-sm font-bold uppercase tracking-wide text-brand-red shadow-lg hover:bg-brand-offwhite"
            )}
          >
            Écrire sur WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
