import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RedAccentLine } from "@/components/RedAccentLine";
import { GuineaRibbon } from "@/components/GuineaRibbon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unsplash } from "@/lib/data";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Histoire, mission et équipe ARREDA — menuiserie sur mesure à Conakry depuis 2024.",
  openGraph: {
    title: "À propos | ARREDA",
    description: "Fabrication locale, savoir-faire et fierté guinéenne.",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-brand-white">
      <section className="border-b border-black/5 bg-brand-white px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-red">
              Accueil
            </Link>{" "}
            / <span className="text-brand-black">À propos</span>
          </nav>
          <h1 className="mt-4 font-display text-5xl uppercase text-brand-black sm:text-6xl">
            À propos d’ARREDA
          </h1>
          <RedAccentLine />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold text-brand-black">Notre histoire</h2>
          <RedAccentLine />
          <p className="mt-4 font-body text-brand-gray">
            ARREDA est créée en 2024, portée par une conviction simple : proposer des
            intérieurs durables, beaux et adaptés au climat, sans dépendre uniquement
            d’importations coûteuses. Nous y assemblons une équipe de menuisiers, designers et
            poseurs pour livrer des projets résidentiels et professionnels à Conakry et dans
            l’intérieur du pays.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl shadow-card ring-1 ring-black/5">
          <Image
            src={unsplash.atelier}
            alt="Atelier de menuiserie ARREDA"
            width={900}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-brand-offwhite px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <Card className="border-t-4 border-brand-red bg-white shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-bold uppercase text-brand-black">
                Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="font-body text-brand-gray">
              Concevoir et fabriquer des meubles sur mesure qui améliorent le quotidien des
              familles et des entreprises en Guinée, avec un service clé en main.
            </CardContent>
          </Card>
          <Card className="border-t-4 border-brand-red bg-white shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-bold uppercase text-brand-black">
                Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="font-body text-brand-gray">
              Devenir la référence ouest-africaine de l’aménagement intérieur artisanal haut de
              gamme, en exportant aussi notre savoir-faire.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-brand-offwhite px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl uppercase text-brand-black">Équipe</h2>
          <RedAccentLine />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Direction", "Design", "Atelier", "Pose"].map((role) => (
              <div
                key={role}
                className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-card"
              >
                <div className="aspect-square bg-gradient-to-br from-brand-offwhite to-brand-muted/40" />
                <div className="p-4">
                  <p className="font-heading font-bold text-brand-black">{role}</p>
                  <p className="text-xs text-brand-muted">Photo à venir</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-xl border border-black/5 bg-brand-offwhite p-8 text-center shadow-card">
          <GuineaRibbon className="mx-auto mb-6 max-w-md rounded-sm" />
          <h2 className="font-display text-4xl uppercase text-brand-black">Fierté guinéenne</h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-brand-gray">
            Nos couleurs, nos quartiers et nos matériaux inspirent chaque projet. ARREDA est
            fier de fabriquer à Conakry pour les Guinéens et les partenaires qui croient en
            l’Afrique de l’Ouest.
          </p>
        </div>
      </section>
    </div>
  );
}
