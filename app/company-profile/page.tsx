import type { Metadata } from "next";
import { GuineaRibbon } from "@/components/GuineaRibbon";
import { PrintActions } from "./PrintActions";

export const metadata: Metadata = {
  title: "Company profile",
  robots: { index: false, follow: true },
};

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen bg-white px-6 py-10 text-brand-black print:p-8">
      <div className="mx-auto max-w-3xl print:max-w-none">
        <GuineaRibbon className="mb-6" />
        <h1 className="font-display text-5xl uppercase">ARREDA</h1>
        <p className="mt-2 font-heading text-sm font-bold uppercase tracking-widest text-brand-red">
          Company profile — 2026
        </p>
        <p className="mt-6 font-body text-sm leading-relaxed text-brand-gray">
          ARREDA est un fabricant de meubles sur mesure basé à Conakry, Guinée. Nous dessinons,
          fabriquons et installons des solutions résidentielles, bureaux et hôtellerie avec une
          équipe locale et un atelier d’environ 500m².
        </p>
        <section className="mt-8 space-y-3 font-body text-sm text-brand-gray">
          <h2 className="font-heading text-base font-bold text-brand-black">Chiffres</h2>
          <ul className="list-disc pl-5">
            <li>Création 2024 — Conakry</li>
            <li>200+ projets livrés</li>
            <li>100% fabrication locale</li>
            <li>Segment : mobilier sur mesure & aménagement</li>
          </ul>
        </section>
        <section className="mt-8 space-y-3 font-body text-sm text-brand-gray">
          <h2 className="font-heading text-base font-bold text-brand-black">Besoins partenaires</h2>
          <ul className="list-disc pl-5">
            <li>Fourniture de bois certifié / volumes réguliers</li>
            <li>Machines CNC, finition, aspiration industrielle</li>
            <li>Investissement pour capacité et export de gamme</li>
          </ul>
        </section>
        <PrintActions />
        <p className="mt-10 text-xs text-brand-muted">
          Document interne — remplacer par le PDF officiel dans{" "}
          <code className="rounded bg-brand-offwhite px-1">public/documents/arreda-company-profile.pdf</code>{" "}
          si disponible.
        </p>
      </div>
    </div>
  );
}
