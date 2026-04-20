"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { GuineaRibbon } from "@/components/GuineaRibbon";
import { RedAccentLine } from "@/components/RedAccentLine";
import { ServiceIcon } from "@/components/ServiceIcon";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Lang = "fr" | "en";

const STORAGE_KEY = "arreda-partners-lang";

const copy = {
  fr: {
    heroKicker: "Investisseurs & partenaires",
    heroTitle: "ARREDA ouvre ses portes à l’international",
    heroText:
      "Fabrication locale, croissance démographique et besoin d’équipements : l’Afrique de l’Ouest offre un terrain solide pour des partenariats durables.",
    metrics: [
      { k: "2024", v: "Création à Conakry" },
      { k: "500m²", v: "Atelier équipé" },
      { k: "200+", v: "Projets livrés" },
      { k: "100%", v: "Fabrication locale" },
    ],
    marketTitle: "Opportunité de marché",
    marketText:
      "Le segment du mobilier sur mesure est sous-doté alors que l’urbanisation et le tertiaire accélèrent. ARREDA combine savoir-faire artisanal et industrialisation légère pour scaler.",
    needs: [
      {
        icon: "refresh",
        title: "Fourniture de bois",
        desc: "Essences certifiées, volumes réguliers et qualité stable pour sécuriser notre production.",
        cta: "Discuter bois",
      },
      {
        icon: "briefcase",
        title: "Machines & équipements",
        desc: "CNC, finition, aspiration : nous cherchons des marques fiables avec service en Afrique de l’Ouest.",
        cta: "Proposer une machine",
      },
      {
        icon: "palette",
        title: "Investissement & partenariat",
        desc: "Co-investissement sur capacité, export de gamme ou licensing de design.",
        cta: "Parler financement",
      },
    ],
    adv: [
      "Main d’œuvre locale qualifiée",
      "Marché en forte croissance",
      "Position stratégique en Afrique de l’Ouest",
      "Environnement des affaires favorable",
    ],
    download: "Télécharger le catalogue ARREDA (PDF)",
    formTitle: "Contact international",
    labels: {
      name: "Nom",
      company: "Société",
      country: "Pays",
      interest: "Intérêt",
      message: "Message",
      send: "Envoyer via WhatsApp",
    },
  },
  en: {
    heroKicker: "Investors & partners",
    heroTitle: "ARREDA welcomes international collaboration",
    heroText:
      "Local manufacturing, demographic growth and equipment needs make West Africa a strong foundation for long-term partnerships.",
    metrics: [
      { k: "2024", v: "Founded in Conakry" },
      { k: "500m²", v: "Equipped workshop" },
      { k: "200+", v: "Delivered projects" },
      { k: "100%", v: "Local manufacturing" },
    ],
    marketTitle: "Market opportunity",
    marketText:
      "Custom furniture remains underserved while urbanization accelerates. ARREDA blends craftsmanship with light industrialization to scale.",
    needs: [
      {
        icon: "refresh",
        title: "Wood supply",
        desc: "Certified species, steady volumes and consistent quality to secure production.",
        cta: "Discuss wood",
      },
      {
        icon: "briefcase",
        title: "Machinery & equipment",
        desc: "CNC, finishing, dust extraction: we look for reliable brands with regional support.",
        cta: "Propose equipment",
      },
      {
        icon: "palette",
        title: "Investment & partnership",
        desc: "Co-investment in capacity, product line export or design licensing.",
        cta: "Discuss funding",
      },
    ],
    adv: [
      "Skilled local workforce",
      "Fast-growing market",
      "Strategic West Africa location",
      "Business-friendly environment",
    ],
    download: "Download the ARREDA catalog (PDF)",
    formTitle: "International contact",
    labels: {
      name: "Name",
      company: "Company",
      country: "Country",
      interest: "Interest",
      message: "Message",
      send: "Send via WhatsApp",
    },
  },
} as const;

const selectFieldClass = cn(
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#ddd] bg-white py-2 pl-3 pr-10 font-heading text-sm font-semibold text-brand-black",
  "transition-colors hover:border-brand-red/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
);

const countries = [
  "Guinée",
  "Sénégal",
  "Côte d’Ivoire",
  "France",
  "Turquie",
  "Chine",
  "Émirats arabes unis",
  "Autre",
];

export function PartenairesClient() {
  const [lang, setLang] = useState<Lang>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "fr" || saved === "en") setLang(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, mounted]);

  useEffect(() => {
    setForm((f) => ({ ...f, interest: "" }));
  }, [lang]);

  const t = copy[lang];

  const interests = useMemo(
    () =>
      lang === "fr"
        ? ["Bois", "Machines", "Investissement", "Autre"]
        : ["Wood", "Machinery", "Investment", "Other"],
    [lang]
  );

  const [form, setForm] = useState({
    name: "",
    company: "",
    country: "",
    interest: "",
    message: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.country) return;
    const text = [
      `[${lang.toUpperCase()}] Contact partenaire ARREDA`,
      `Nom: ${form.name}`,
      `Société: ${form.company}`,
      `Pays: ${form.country}`,
      `Intérêt: ${form.interest}`,
      "",
      form.message,
    ].join("\n");
    window.open(buildWhatsAppUrl(text), "_blank");
  }

  return (
    <div className="bg-brand-white">
      <div className="border-b border-black/5 bg-brand-offwhite px-4 py-4">
        <div className="mx-auto flex max-w-7xl justify-end gap-2">
          <button
            type="button"
            className={`rounded-md px-4 py-2 font-heading text-sm font-bold uppercase ${
              lang === "fr" ? "bg-brand-red text-white" : "bg-white text-brand-black"
            }`}
            onClick={() => setLang("fr")}
          >
            FR
          </button>
          <button
            type="button"
            className={`rounded-md px-4 py-2 font-heading text-sm font-bold uppercase ${
              lang === "en" ? "bg-brand-red text-white" : "bg-white text-brand-black"
            }`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>
      </div>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl text-center">
          <GuineaRibbon className="mx-auto mb-6 max-w-lg rounded-sm" />
          <p className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
            {t.heroKicker}
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase text-brand-black sm:text-6xl">
            {t.heroTitle}
          </h1>
          <RedAccentLine className="mx-auto" />
          <p className="mx-auto mt-6 max-w-3xl font-body text-brand-gray">{t.heroText}</p>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {t.metrics.map((m) => (
              <div key={m.k} className="rounded-xl border border-black/5 bg-white p-4 shadow-card">
                <p className="font-display text-3xl text-brand-red">{m.k}</p>
                <p className="mt-1 text-xs text-brand-gray">{m.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-offwhite px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-4xl uppercase text-brand-black">{t.marketTitle}</h2>
          <RedAccentLine />
          <p className="mt-4 font-body text-brand-gray">{t.marketText}</p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {t.needs.map((n) => (
            <div
              key={n.title}
              className="rounded-xl border border-black/5 bg-white p-6 shadow-card transition-shadow hover:shadow-lg"
            >
              <div className="text-brand-red">
                <ServiceIcon name={n.icon} className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-brand-black">{n.title}</h3>
              <p className="mt-2 text-sm text-brand-gray">{n.desc}</p>
              <a
                className="mt-4 inline-block font-heading text-sm font-bold uppercase text-brand-red underline"
                href={buildWhatsAppUrl(`[Partners] ${n.title}: ${n.cta}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {n.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-offwhite px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-4xl uppercase text-brand-black">
            {lang === "fr" ? "Avantages" : "Advantages"}
          </h2>
          <RedAccentLine />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.adv.map((a) => (
              <li
                key={a}
                className="rounded-lg border border-black/5 bg-white px-4 py-3 text-sm text-brand-gray shadow-sm"
              >
                {a}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/docs/catalogue-arreda.pdf"
              download="CATALOGUE-ARREDA.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("pdf_downloaded", { file: "catalogue-arreda" })}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "inline-flex items-center justify-center border-2 border-brand-red font-heading font-semibold uppercase text-brand-red"
              )}
            >
              📄 {t.download}
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-4xl uppercase text-brand-black">{t.formTitle}</h2>
          <RedAccentLine />
          <form className="mt-8 space-y-4" onSubmit={submit}>
            <div>
              <Label htmlFor="name">{t.labels.name} *</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="company">{t.labels.company} *</Label>
              <Input
                id="company"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="partner-country">{t.labels.country} *</Label>
              <div className="relative mt-1">
                <select
                  id="partner-country"
                  required
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className={cn(selectFieldClass, !form.country && "text-brand-muted")}
                >
                  <option value="">—</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray"
                  aria-hidden
                />
              </div>
            </div>
            <div>
              <Label htmlFor="partner-interest">{t.labels.interest}</Label>
              <div className="relative mt-1">
                <select
                  id="partner-interest"
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className={cn(selectFieldClass, !form.interest && "text-brand-muted")}
                >
                  <option value="">—</option>
                  {interests.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray"
                  aria-hidden
                />
              </div>
            </div>
            <div>
              <Label htmlFor="msg">{t.labels.message} *</Label>
              <Textarea
                id="msg"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full border-0 bg-brand-red font-heading font-semibold uppercase text-white hover:bg-brand-deepred"
              )}
            >
              {t.labels.send}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
