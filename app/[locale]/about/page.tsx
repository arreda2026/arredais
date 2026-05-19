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
import { PersonnelSection } from "@/components/about/PersonnelSection";

const expertiseIcons = [Ruler, Factory, Truck, Home] as const;

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  if (!isLocale(params.locale)) return {};
  const ap = getDictionary(params.locale).aboutPage;
  return {
    title: ap.metaTitle,
    description: ap.metaDescription,
    openGraph: {
      title: ap.metaOgTitle,
      description: ap.metaOgDescription,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const messages = getDictionary(locale);
  const nav = messages.nav;
  const ap = messages.aboutPage;

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
            {ap.heroTitle}
          </h1>
          <RedAccentLine />
          <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-brand-gray md:text-xl">
            {ap.heroLead}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-brand-black md:text-3xl">
            {ap.historyTitle}
          </h2>
          <RedAccentLine />
          <div className="mt-6 space-y-4 font-body leading-relaxed text-brand-gray">
            <p>{ap.historyP1}</p>
            <p>{ap.historyP2}</p>
            <p className="font-medium text-brand-black">{ap.historyHighlight}</p>
          </div>
          <ul className="mt-8 space-y-3 border-l-2 border-brand-red pl-5 font-body text-sm text-brand-gray md:text-base">
            {ap.historyBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] ring-1 ring-black/5 lg:sticky lg:top-24">
          <Image
            src="/images/about-notre-histoire.webp"
            alt={ap.historyImageAlt}
            width={900}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-black/5 bg-brand-offwhite px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl uppercase text-brand-black sm:text-4xl">{ap.missionVisionTitle}</h2>
          <RedAccentLine />
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            <Card className="border-t-4 border-brand-red bg-white shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold uppercase text-brand-black">
                  {ap.missionTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-body leading-relaxed text-brand-gray">
                <p>{ap.missionP1}</p>
                <p>{ap.missionP2}</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-brand-red bg-white shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold uppercase text-brand-black">
                  {ap.visionTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-body leading-relaxed text-brand-gray">
                <p>{ap.visionP1}</p>
                <p>{ap.visionP2}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <h2 className="font-display text-3xl uppercase text-brand-black sm:text-4xl">{ap.expertiseTitle}</h2>
        <RedAccentLine />
        <p className="mt-4 max-w-2xl font-body text-brand-gray">{ap.expertiseLead}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {ap.expertise.map((item, i) => {
            const Icon = expertiseIcons[i] ?? Ruler;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-black/5 bg-brand-offwhite/60 p-6 shadow-card ring-1 ring-black/[0.04]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/5 text-brand-black">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-4 font-heading text-sm font-bold uppercase tracking-wide text-brand-black">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-brand-gray">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <PersonnelSection />

      <section className="bg-brand-black px-4 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">{ap.journeyTitle}</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-brand-red" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {ap.journey.map((step) => (
              <div
                key={step.n}
                className="relative border-l border-white/20 pl-6 sm:border-l-0 sm:pl-0 lg:border-l lg:pl-6 first:lg:border-l-0 first:lg:pl-0"
              >
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
          <h2 className="text-center font-display text-3xl uppercase text-brand-black sm:text-4xl">{ap.prideTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-center font-body leading-relaxed text-brand-gray">{ap.prideP1}</p>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body text-sm leading-relaxed text-brand-muted">
            {ap.prideP2}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={localizedPath(locale, "/realisations")}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-2 border-brand-black bg-white font-heading font-semibold uppercase text-brand-black hover:bg-brand-offwhite"
              )}
            >
              {ap.ctaProjects}
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
