import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Factory, Home, Ruler, Truck } from "lucide-react";
import { RedAccentLine } from "@/components/RedAccentLine";
import { GuineaRibbon } from "@/components/GuineaRibbon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/messages";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/href";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "ARREDA : menuiserie et mobilier sur mesure à Conakry — histoire, mission, savoir-faire et fabrication locale.",
  openGraph: {
    title: "À propos | ARREDA",
    description: "Design, fabrication et pose : une équipe dédiée au sur mesure en Guinée.",
  },
};

const savoirFaire = [
  {
    icon: Ruler,
    title: "Conception sur mesure",
    text: "Prise de cotes, plans et choix des volumes pour s’adapter à votre pièce, à vos habitudes et à votre budget.",
  },
  {
    icon: Factory,
    title: "Fabrication à l’atelier",
    text: "Découpe, assemblage et finitions dans notre atelier à Conakry : contrôle qualité à chaque étape.",
  },
  {
    icon: Truck,
    title: "Livraison & pose",
    text: "Transport soigné et installation sur site par nos équipes pour un rendu conforme à ce qui a été validé.",
  },
  {
    icon: Home,
    title: "Résidentiel & pro",
    text: "Villas, appartements, bureaux, commerces : mobilier fixe ou modulaire, du dressing à la cuisine équipée.",
  },
] as const;

const parcours = [
  { n: "01", title: "Échange & visite", desc: "Compréhension du besoin, conseils matériaux et visite technique si nécessaire." },
  { n: "02", title: "Proposition", desc: "Estimation, planning indicatif et validation des plans avant lancement fabrication." },
  { n: "03", title: "Production", desc: "Fabrication dans nos ateliers avec points d’étape pour les projets les plus complexes." },
  { n: "04", title: "Livraison", desc: "Pose, réglages et remise des ouvrages prêts à l’usage." },
] as const;

export default async function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const messages = getDictionary(locale);
  const nav = messages.nav;

  return (
    <div className="bg-brand-white">
      <section className="border-b border-black/5 bg-brand-white px-4 py-12 md:py-14">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-brand-muted">
            <Link href={localizedPath(locale, "/")} className="hover:text-brand-black/80">
              {nav.home}
            </Link>{" "}
            / <span className="text-brand-black">{nav.about}</span>
          </nav>
          <h1 className="mt-4 font-display text-5xl uppercase leading-none text-brand-black sm:text-6xl md:text-7xl">
            À propos d’ARREDA
          </h1>
          <RedAccentLine />
          <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-brand-gray md:text-xl">
            ARREDA conçoit et fabrique du mobilier sur mesure en Guinée : du premier croquis à la pose chez vous, avec
            une exigence de finition et un accompagnement clair à chaque étape.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-brand-black md:text-3xl">
            Notre histoire
          </h2>
          <RedAccentLine />
          <div className="mt-6 space-y-4 font-body leading-relaxed text-brand-gray">
            <p>
              ARREDA est née en 2024 d’une idée simple : offrir des intérieurs durables et soignés, pensés pour le climat
              et les usages locaux, sans se limiter aux catalogues importés. Nous réunissons menuisiers, designers et
              équipes de pose pour livrer des projets résidentiels et professionnels à Conakry et sur le territoire.
            </p>
            <p>
              Chaque chantier est l’occasion de combiner esthétique italienne (notre ADN stylistique), matériaux choisis
              avec discernement et savoir-faire artisanal. Notre objectif : un résultat qui dure, facile à vivre au
              quotidien et aligné sur ce que vous aviez en tête.
            </p>
            <p className="font-medium text-brand-black">
              Ce qui nous distingue : fabrication locale, transparence sur les délais, et une relation de proximité
              avec nos clients — avant, pendant et après la livraison.
            </p>
          </div>
          <ul className="mt-8 space-y-3 border-l-2 border-brand-red pl-5 font-body text-sm text-brand-gray md:text-base">
            <li>Devis détaillé et conseils pour prioriser les postes selon votre budget.</li>
            <li>Essences de bois et stratifiés adaptés à l’humidité et à l’usage (cuisine, salle de bain, bureau).</li>
            <li>Suivi de chantier et respect des engagements annoncés.</li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] ring-1 ring-black/5 lg:sticky lg:top-24">
          <Image
            src="/images/about-notre-histoire.webp"
            alt="Atelier et savoir-faire ARREDA"
            width={900}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-black/5 bg-brand-offwhite px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl uppercase text-brand-black sm:text-4xl">Mission & vision</h2>
          <RedAccentLine />
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            <Card className="border-t-4 border-brand-red bg-white shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold uppercase text-brand-black">Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-body leading-relaxed text-brand-gray">
                <p>
                  Concevoir et fabriquer des meubles sur mesure qui améliorent le quotidien des familles et des
                  entreprises en Guinée, avec un service clé en main : mesures, fabrication, livraison et installation.
                </p>
                <p>
                  Nous voulons rendre le sur mesure accessible sans sacrifier la qualité — grâce à une organisation
                  locale et des processus clairs.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-brand-red bg-white shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold uppercase text-brand-black">Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-body leading-relaxed text-brand-gray">
                <p>
                  Devenir une référence en Afrique de l’Ouest pour l’aménagement intérieur artisanal exigeant, reconnu
                  pour la fiabilité de nos livraisons et la finesse de nos finitions.
                </p>
                <p>
                  À terme, porter plus loin le savoir-faire « made in Guinea » en collaborant avec des architectes,
                  promoteurs et marques qui partagent nos standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <h2 className="font-display text-3xl uppercase text-brand-black sm:text-4xl">Notre savoir-faire</h2>
        <RedAccentLine />
        <p className="mt-4 max-w-2xl font-body text-brand-gray">
          Quatre piliers qui structurent chaque collaboration avec ARREDA.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {savoirFaire.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-black/5 bg-brand-offwhite/60 p-6 shadow-card ring-1 ring-black/[0.04]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/5 text-brand-black">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-sm font-bold uppercase tracking-wide text-brand-black">{title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-brand-gray">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-black px-4 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">Votre projet, en quatre temps</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-brand-red" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {parcours.map((step) => (
              <div key={step.n} className="relative border-l border-white/20 pl-6 sm:border-l-0 sm:pl-0 lg:border-l lg:pl-6 first:lg:border-l-0 first:lg:pl-0">
                <span className="font-display text-4xl leading-none text-brand-black/40">{step.n}</span>
                <h3 className="mt-2 font-heading text-sm font-bold uppercase tracking-wide text-white">{step.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="rounded-2xl border border-black/5 bg-brand-offwhite p-8 shadow-card md:p-12">
          <GuineaRibbon className="mx-auto mb-8 max-w-md rounded-sm" />
          <h2 className="text-center font-display text-3xl uppercase text-brand-black sm:text-4xl">Fierté guinéenne</h2>
          <p className="mx-auto mt-5 max-w-2xl text-center font-body leading-relaxed text-brand-gray">
            Nos couleurs, nos quartiers et la réalité du terrain guident nos choix techniques et esthétiques. ARREDA est
            fier de fabriquer à Conakry pour les familles et les entreprises du pays, et pour les partenaires qui
            investissent en Afrique de l’Ouest.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body text-sm leading-relaxed text-brand-muted">
            Le drapeau guinéen rappelle notre ancrage local ; le style « Italian » incarne notre exigence de lignes
            sobres et de finitions soignées.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={localizedPath(locale, "/realisations")}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-2 border-brand-black bg-white font-heading font-semibold uppercase text-brand-black hover:bg-brand-offwhite"
              )}
            >
              {messages.aboutPage.ctaProjects}
            </Link>
            <Link
              href={localizedPath(locale, "/devis")}
              className={cn(
                buttonVariants({ size: "lg" }),
                "border-0 bg-brand-black font-heading font-semibold uppercase text-white hover:bg-black/85"
              )}
            >
              {nav.quote}
            </Link>
            <Link
              href={localizedPath(locale, "/contact")}
              className="font-heading text-sm font-semibold uppercase text-brand-black underline-offset-4 hover:text-brand-black/70 hover:underline"
            >
              {nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
