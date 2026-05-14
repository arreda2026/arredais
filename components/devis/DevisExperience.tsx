"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  Paperclip,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { unsplash } from "@/lib/data";
import { useMessages } from "@/components/i18n/MessagesProvider";
import { useLocale } from "@/lib/i18n/useLocale";
import { localizedPath } from "@/lib/i18n/href";

const COMMUNES = [
  "Kaloum",
  "Dixinn",
  "Matam",
  "Ratoma",
  "Matoto",
  "Kipé",
  "Nongo",
  "Hamdallaye",
  "Lambandji",
  "Cosa",
  "Sonfonia",
  "Yattaya",
  "Kobaya",
  "Wanindara",
  "Autre",
] as const;

const PROJECT_TYPES = [
  { value: "Résidentiel", emoji: "🏠" },
  { value: "Bureau", emoji: "💼" },
  { value: "Commercial", emoji: "🏨" },
  { value: "Hôtellerie", emoji: "✨" },
] as const;

const MEUBLES = ["Salon", "Cuisine", "Chambre", "Bureau", "Autre"] as const;

const BUDGETS = [
  "< 5M GNF",
  "5–15M GNF",
  "15–50M GNF",
  "> 50M GNF",
] as const;

const DELAIS = [
  {
    value: "Urgent (< 2 semaines)",
    title: "Urgent",
    sub: "< 2 semaines",
    emoji: "⚡",
  },
  {
    value: "Normal (~ 1 mois)",
    title: "Normal",
    sub: "~ 1 mois",
    emoji: "📅",
  },
  {
    value: "Flexible",
    title: "Flexible",
    sub: "Pas de délai strict",
    emoji: "🕐",
  },
] as const;

const STEPS_LEFT = [
  { num: "01", label: "Votre projet" },
  { num: "02", label: "Détails" },
  { num: "03", label: "Vos coordonnées" },
] as const;

const STEP_TITLES = [
  "Votre projet",
  "Détails du projet",
  "Coordonnées & envoi",
] as const;

const DESC_MAX = 500;

type FormState = {
  type: string;
  meuble: string;
  budget: string;
  longueur: string;
  largeur: string;
  hauteur: string;
  description: string;
  photos: File[];
  delai: string;
  nom: string;
  telephone: string;
  email: string;
  quartier: string;
};

const initialForm: FormState = {
  type: "",
  meuble: "",
  budget: "",
  longueur: "",
  largeur: "",
  hauteur: "",
  description: "",
  photos: [],
  delai: "",
  nom: "",
  telephone: "",
  email: "",
  quartier: "",
};

const NP = "Non précisé";

function orNp(v: string): string {
  return v.trim() || NP;
}

function formatDimsForMessage(f: FormState): string {
  if (!f.longueur.trim() && !f.largeur.trim() && !f.hauteur.trim()) return NP;
  return `${f.longueur || "—"} × ${f.largeur || "—"} × ${f.hauteur || "—"} cm`;
}

function buildWhatsAppMessage(f: FormState): string {
  const siteHost = SITE_URL.replace(/^https?:\/\//, "");
  const photosLine =
    f.photos.length === 0 ? "Aucune" : `${f.photos.length} fichier(s)`;
  return `
🪵 *NOUVELLE DEMANDE DE DEVIS — ARREDA*

📋 *Projet*
- Type : ${orNp(f.type)}
- Meuble : ${orNp(f.meuble)}
- Budget : ${orNp(f.budget)}

📐 *Détails*
- Dimensions : ${formatDimsForMessage(f)}
- Délai : ${orNp(f.delai)}
- Description : ${f.description.trim() || "Non renseignée"}
- Photos de référence : ${photosLine}

👤 *Coordonnées*
- Nom : ${f.nom}
- WhatsApp : +224${f.telephone}
- Email : ${f.email.trim() || "Non renseigné"}
- Quartier : ${orNp(f.quartier)}

_Message généré depuis ${siteHost}_
`.trim();
}

function isValidEmail(s: string): boolean {
  if (!s.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export function DevisExperience() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const messages = useMessages();
  const locale = useLocale();

  useEffect(() => {
    const urls = form.photos.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [form.photos]);

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  const phoneOk = /^\d{9}$/.test(form.telephone);
  const emailOk = isValidEmail(form.email);
  /** Envoi : seuls nom + téléphone (9 chiffres) + email valide si renseigné. */
  const step3Ok = form.nom.trim().length > 0 && phoneOk && emailOk;

  const addPhotos = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (arr.length === 0) return;
    setPhotoError(null);
    setForm((prev) => {
      const merged = [...prev.photos, ...arr];
      if (merged.length > 5) {
        setPhotoError("Maximum 5 photos. Supprimez-en avant d’en ajouter.");
        return prev;
      }
      return { ...prev, photos: merged };
    });
  }, []);

  const removePhoto = (i: number) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, j) => j !== i),
    }));
    setPhotoError(null);
  };

  const goNext = () => {
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const goToStep = (s: number) => {
    if (s < step) setStep(s);
  };

  const handleSubmit = async () => {
    if (!step3Ok || submitting) return;
    setSubmitting(true);
    const message = buildWhatsAppMessage(form);
    console.log("[ARREDA Devis] Message WhatsApp:\n", message);

    await new Promise((r) => setTimeout(r, 1500));

    trackEvent("devis_submitted", {
      budget_range: form.budget,
      project_type: form.type,
    });

    window.open(buildWhatsAppUrl(message), "_blank");
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-brand-white px-4 py-16">
        <div className="devis-success-check mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-brand-green text-white shadow-lg">
          <Check className="h-12 w-12" strokeWidth={3} />
        </div>
        <h1 className="text-center font-display text-4xl uppercase tracking-tight text-brand-black sm:text-5xl">
          {messages.devis.successTitle}
        </h1>
        <p className="mt-4 max-w-md text-center font-body text-brand-gray">{messages.devis.successLead}</p>
        <p className="mt-2 max-w-md text-center font-body text-sm text-brand-muted">
          {messages.devis.successReply}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={localizedPath(locale, "/realisations")}
            className={cn(
              buttonVariants({ size: "lg" }),
              "border-0 bg-brand-black text-white hover:bg-black/85"
            )}
          >
            {messages.devis.seeRealisations}
          </Link>
          <Link
            href={localizedPath(locale, "/")}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-2 border-brand-black font-heading font-semibold uppercase text-brand-black"
            )}
          >
            {messages.devis.backHome}
          </Link>
        </div>
      </div>
    );
  }

  const activeLeftLabel = STEPS_LEFT[step - 1]?.label ?? "";

  return (
    <div className="min-h-screen bg-brand-white">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
        {/* Panneau gauche — desktop 40% */}
        <aside className="relative flex w-full flex-col bg-[#1A1A1A] text-white lg:w-[40%] lg:min-w-[320px] lg:max-w-xl">
          {/* Mobile : bandeau compact */}
          <div className="border-b border-white/10 px-4 py-3 lg:hidden">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black">
              Étape {step} / 3
            </p>
            <p className="font-heading text-sm font-bold text-white">{activeLeftLabel}</p>
          </div>

          <div className="hidden flex-1 flex-col px-8 py-10 lg:flex lg:px-10 lg:py-12">
            <Image
              src="/logo/ARREDA.png"
              alt="ARREDA"
              width={849}
              height={280}
              priority
              className="h-auto w-[min(100%,17.5rem)] max-w-full bg-transparent brightness-0 invert"
              sizes="(max-width: 1024px) 100vw, 280px"
            />

            <h2 className="mt-8 font-display text-[48px] uppercase leading-[0.95] tracking-tight text-white">
              Votre projet,
              <br />
              notre expertise.
            </h2>
            <span className="mt-4 inline-block h-[3px] w-[60px] rounded-full bg-brand-black" />

            <nav className="relative mt-12 flex flex-col gap-0" aria-label="Progression du formulaire">
              {STEPS_LEFT.map((s, i) => {
                const idx = i + 1;
                const completed = step > idx;
                const active = step === idx;
                return (
                  <div key={s.num} className="relative flex gap-4 pb-8 last:pb-0">
                    {i < STEPS_LEFT.length - 1 && (
                      <div
                        className="absolute left-[11px] top-7 h-[calc(100%-0.5rem)] w-px border-l border-dashed border-white/25"
                        aria-hidden
                      />
                    )}
                    <div className="relative z-10 flex shrink-0 flex-col items-center">
                      {completed ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-black text-xs text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      ) : active ? (
                        <span className="h-6 w-6 rounded-full bg-brand-black ring-4 ring-black/25" />
                      ) : (
                        <span className="h-6 w-6 rounded-full border-2 border-white/35 bg-transparent" />
                      )}
                    </div>
                    <div>
                      <p className="font-heading text-xs font-bold text-brand-black">{s.num}</p>
                      <p
                        className={cn(
                          "font-heading text-sm font-bold tracking-wide",
                          active && "text-white",
                          completed && "text-white/60",
                          !active && !completed && "text-white/40"
                        )}
                      >
                        {s.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto space-y-3 pt-10">
              {[
                "Devis gratuit & sans engagement",
                "Réponse sous 24h garantie",
                "Fabrication 100% locale à Conakry",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-start gap-3 rounded-lg bg-[#2a2a2a] px-4 py-3 text-sm text-white"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-black" strokeWidth={3} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Panneau droit — 60% */}
        <div className="flex flex-1 flex-col bg-brand-white lg:w-[60%]">
          <div className="border-b border-black/5 px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
            <div className="h-1 w-full overflow-hidden rounded-full bg-brand-offwhite">
              <motion.div
                className="h-full bg-brand-black"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-3 font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-black">
              Étape {step} / 3
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto max-w-2xl"
                >
                  <h3 className="font-display text-4xl uppercase leading-none text-brand-black">
                    {STEP_TITLES[0]}
                  </h3>
                  <span className="mt-3 inline-block h-[3px] w-[60px] rounded-full bg-brand-black" />

                  <p className="mt-4 rounded-lg border border-brand-black/20 bg-black/5 px-4 py-3 font-body text-sm leading-relaxed text-brand-gray">
                    Ces choix sont <strong className="text-brand-black">facultatifs</strong> : si
                    vous n’êtes pas sûr, passez à l’étape suivante — nous préciserons tout ensemble
                    sur WhatsApp.
                  </p>

                  <p className="mt-8 font-heading text-sm font-bold uppercase tracking-wide text-brand-gray">
                    Type de projet <span className="font-body font-normal normal-case text-brand-muted">(optionnel)</span>
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {PROJECT_TYPES.map((p) => {
                      const sel = form.type === p.value;
                      return (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, type: p.value }))}
                          className={cn(
                            "relative rounded-xl border-[1.5px] p-4 text-left transition-all",
                            sel
                              ? "border-2 border-brand-black bg-[#FEF0F0] text-brand-black shadow-sm"
                              : "border-[#ddd] bg-white text-[#555] hover:border-brand-black/50"
                          )}
                        >
                          {sel && (
                            <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-black text-[10px] text-white">
                              ✓
                            </span>
                          )}
                          <span className="text-2xl">{p.emoji}</span>
                          <p className="mt-2 font-heading text-sm font-bold">{p.value}</p>
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-8 font-heading text-sm font-bold uppercase tracking-wide text-brand-gray">
                    Type de meuble <span className="font-body font-normal normal-case text-brand-muted">(optionnel)</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {MEUBLES.map((m) => {
                      const sel = form.meuble === m;
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, meuble: m }))}
                          className={cn(
                            "rounded-full px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide transition-colors",
                            sel
                              ? "bg-brand-black text-white"
                              : "bg-brand-offwhite text-[#555] hover:bg-brand-muted/20"
                          )}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-8 font-heading text-sm font-bold uppercase tracking-wide text-brand-gray">
                    Budget (GNF) <span className="font-body font-normal normal-case text-brand-muted">(optionnel)</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {BUDGETS.map((b) => {
                      const sel = form.budget === b;
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, budget: b }))}
                          className={cn(
                            "rounded-full px-3 py-2 font-body text-xs font-semibold transition-colors sm:text-sm",
                            sel
                              ? "bg-brand-black text-white"
                              : "bg-brand-offwhite text-[#555] hover:bg-brand-muted/20"
                          )}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={goNext}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "mt-10 flex w-full items-center justify-center gap-2 border-0 bg-brand-black font-heading font-bold uppercase text-white hover:bg-black/85"
                    )}
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto max-w-2xl"
                >
                  <h3 className="font-display text-4xl uppercase leading-none text-brand-black">
                    {STEP_TITLES[1]}
                  </h3>
                  <span className="mt-3 inline-block h-[3px] w-[60px] rounded-full bg-brand-black" />

                  <p className="mt-4 rounded-lg border border-brand-black/20 bg-black/5 px-4 py-3 font-body text-sm leading-relaxed text-brand-gray">
                    Dimensions, texte, photos et délai sont{" "}
                    <strong className="text-brand-black">tous facultatifs</strong>. Indiquez seulement
                    ce dont vous disposez — nous compléterons le reste avec vous.
                  </p>

                  <p className="mt-8 font-heading text-sm font-bold text-brand-gray">
                    Dimensions (cm) <span className="font-body font-normal normal-case text-brand-muted">(optionnel)</span>
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(["longueur", "largeur", "hauteur"] as const).map((field, i) => (
                      <div key={field}>
                        <Label className="sr-only">{field}</Label>
                        <Input
                          inputMode="decimal"
                          placeholder={["L", "l", "H"][i]}
                          value={form[field]}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              [field]: e.target.value.replace(/[^\d.,]/g, ""),
                            }))
                          }
                          className="h-11 border-[#ddd] text-center focus-visible:border-brand-black"
                        />
                        <p className="mt-1 text-center text-xs text-brand-muted">cm</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-8 font-heading text-sm font-bold text-brand-gray">
                    Description <span className="font-body font-normal normal-case text-brand-muted">(optionnel)</span>
                  </p>
                  <div className="relative mt-2">
                    <Textarea
                      className="min-h-[120px] resize-y border-[#ddd] pb-8 focus-visible:border-brand-black"
                      placeholder="Décrivez votre projet : style souhaité, couleur du bois, utilisation principale, contraintes particulières..."
                      value={form.description}
                      maxLength={DESC_MAX}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                    <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-brand-muted">
                      {form.description.length} / {DESC_MAX}
                    </span>
                  </div>

                  <p className="mt-8 font-heading text-sm font-bold text-brand-gray">
                    Photos de référence <span className="font-body font-normal normal-case text-brand-muted">(optionnel)</span>
                  </p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.length) addPhotos(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files?.length) addPhotos(e.dataTransfer.files);
                    }}
                    onClick={() => fileRef.current?.click()}
                    className="mt-2 cursor-pointer rounded-xl border-2 border-dashed border-brand-black/60 bg-brand-offwhite/30 px-4 py-8 text-center transition-colors hover:bg-brand-offwhite/60"
                  >
                    <Paperclip className="mx-auto mb-2 h-8 w-8 text-brand-black" />
                    <p className="font-body text-sm font-medium text-brand-black">
                      Glissez vos photos ici ou cliquez pour choisir
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">
                      Formats acceptés : JPG, PNG — Max 5 fichiers
                    </p>
                  </div>
                  {photoError && (
                    <p className="mt-2 text-sm font-medium text-red-600">{photoError}</p>
                  )}

                  {form.photos.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {form.photos.map((file, i) => (
                        <div key={`${file.name}-${i}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-black/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={previews[i]}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removePhoto(i);
                            }}
                            className="absolute right-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white hover:bg-neutral-600"
                            aria-label="Supprimer la photo"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-lg border border-dashed border-black/10 bg-brand-offwhite/50 p-4">
                      <p className="mb-2 text-center text-xs font-medium text-brand-muted">
                        Exemple de photo utile (inspiration, pièce existante, détail bois…)
                      </p>
                      <div className="relative mx-auto h-40 max-w-xs overflow-hidden rounded-md opacity-90">
                        <Image
                          src={unsplash.salon}
                          alt="Exemple de référence pour votre devis"
                          fill
                          className="object-cover"
                          sizes="320px"
                        />
                      </div>
                    </div>
                  )}

                  <p className="mt-8 font-heading text-sm font-bold text-brand-gray">
                    Délai souhaité <span className="font-body font-normal normal-case text-brand-muted">(optionnel)</span>
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {DELAIS.map((d) => {
                      const sel = form.delai === d.value;
                      return (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, delai: d.value }))}
                          className={cn(
                            "rounded-xl border-[1.5px] p-4 text-left transition-all",
                            sel
                              ? "border-2 border-brand-black bg-[#FEF0F0] shadow-sm"
                              : "border-[#ddd] bg-white hover:border-brand-black/40"
                          )}
                        >
                          <span className="text-xl">{d.emoji}</span>
                          <p className="mt-1 font-heading text-sm font-bold text-brand-black">
                            {d.title}
                          </p>
                          <p className="text-xs text-brand-gray">{d.sub}</p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={goBack}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "flex-1 border-2 border-brand-black/15 font-heading font-bold uppercase"
                      )}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "flex-[2] border-0 bg-brand-black font-heading font-bold uppercase text-white hover:bg-black/85"
                      )}
                    >
                      Continuer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto max-w-2xl"
                >
                  <h3 className="font-display text-4xl uppercase leading-none text-brand-black">
                    {STEP_TITLES[2]}
                  </h3>
                  <span className="mt-3 inline-block h-[3px] w-[60px] rounded-full bg-brand-black" />

                  <div className="mt-8 rounded-xl border border-black/5 bg-brand-offwhite p-5 text-sm">
                    <p className="font-heading text-xs font-bold uppercase tracking-wide text-brand-black">
                      Récapitulatif
                    </p>
                    <ul className="mt-4 space-y-2 font-body text-brand-black">
                      <RecapRow
                        label="Type"
                        value={orNp(form.type)}
                        onEdit={() => goToStep(1)}
                      />
                      <RecapRow
                        label="Meuble"
                        value={orNp(form.meuble)}
                        onEdit={() => goToStep(1)}
                      />
                      <RecapRow
                        label="Budget"
                        value={orNp(form.budget)}
                        onEdit={() => goToStep(1)}
                      />
                      <RecapRow
                        label="Dimensions"
                        value={formatDimsForMessage(form)}
                        onEdit={() => goToStep(2)}
                      />
                      <RecapRow
                        label="Délai"
                        value={form.delai.trim() ? form.delai : NP}
                        onEdit={() => goToStep(2)}
                      />
                      <RecapRow
                        label="Photos"
                        value={
                          form.photos.length === 0
                            ? "Aucune"
                            : `${form.photos.length} fichier(s)`
                        }
                        onEdit={() => goToStep(2)}
                      />
                      <li className="flex flex-col gap-1 border-t border-black/5 pt-2 sm:flex-row sm:items-start sm:justify-between">
                        <span className="text-brand-muted">Description</span>
                        <span className="max-w-full flex-1 text-right text-brand-black sm:max-w-[70%]">
                          {form.description.trim()
                            ? `${form.description.slice(0, 120)}${form.description.length > 120 ? "…" : ""}`
                            : "Non renseignée"}
                        </span>
                        <button
                          type="button"
                          onClick={() => goToStep(2)}
                          className="text-left text-xs font-bold uppercase text-brand-black underline sm:text-right"
                        >
                          Modifier
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 space-y-5">
                    <div>
                      <Label htmlFor="nom" className="font-heading text-sm font-bold">
                        Nom complet *
                      </Label>
                      <Input
                        id="nom"
                        value={form.nom}
                        onChange={(e) => setForm((prev) => ({ ...prev, nom: e.target.value }))}
                        className="mt-1 h-11 border-[#ddd] focus-visible:border-brand-black"
                      />
                      {!form.nom.trim() && (
                        <p className="mt-1 text-xs text-brand-muted">Champ obligatoire</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="tel" className="font-heading text-sm font-bold">
                        Téléphone WhatsApp *
                      </Label>
                      <div className="mt-1 flex rounded-lg border border-[#ddd] focus-within:border-brand-black">
                        <span className="flex select-none items-center border-r border-[#ddd] bg-brand-offwhite px-3 font-mono text-sm text-brand-gray">
                          +224
                        </span>
                        <Input
                          id="tel"
                          inputMode="numeric"
                          maxLength={9}
                          value={form.telephone}
                          onBlur={() => setPhoneTouched(true)}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              telephone: e.target.value.replace(/\D/g, "").slice(0, 9),
                            }))
                          }
                          placeholder="620000000"
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                      {phoneTouched && !phoneOk && (
                        <p className="mt-1 text-sm text-red-600">
                          Numéro invalide — 9 chiffres après +224 (ex. 620 12 34 56)
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="mail" className="font-heading text-sm font-bold">
                        Email (optionnel)
                      </Label>
                      <Input
                        id="mail"
                        type="email"
                        value={form.email}
                        onBlur={() => setEmailTouched(true)}
                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="mt-1 h-11 border-[#ddd] focus-visible:border-brand-black"
                      />
                      {emailTouched && form.email.trim() && !emailOk && (
                        <p className="mt-1 text-sm text-red-600">Format d’email invalide</p>
                      )}
                    </div>

                    <div>
                      <Label className="font-heading text-sm font-bold" htmlFor="quartier">
                        Quartier / Commune{" "}
                        <span className="font-body font-normal normal-case text-brand-muted">
                          (optionnel)
                        </span>
                      </Label>
                      <div className="relative mt-1">
                        <select
                          id="quartier"
                          value={form.quartier}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, quartier: e.target.value }))
                          }
                          className={cn(
                            "h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#ddd] bg-white py-2 pl-3 pr-10 font-heading text-sm font-semibold text-brand-black",
                            "transition-colors hover:border-brand-black/40 focus:border-brand-black focus:outline-none focus:ring-2 focus:ring-black/15",
                            !form.quartier && "text-brand-muted"
                          )}
                        >
                          <option value="">Choisir un quartier</option>
                          {COMMUNES.map((c) => (
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
                      <p className="mt-1 text-xs text-brand-muted">
                        Aidez-nous à situer le chantier si vous le souhaitez.
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={submitting}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "flex-1 border-2 border-brand-black/15 font-heading font-bold uppercase"
                      )}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Retour
                    </button>
                    <button
                      type="button"
                      disabled={!step3Ok || submitting}
                      onClick={handleSubmit}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "flex-[2] font-heading font-bold uppercase",
                        step3Ok && !submitting
                          ? "border-0 bg-brand-black text-white hover:bg-black/85"
                          : "cursor-not-allowed bg-brand-muted/40 text-white"
                      )}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Préparation…
                        </>
                      ) : (
                        <>
                          📲 Envoyer sur WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}

function RecapRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-2 border-b border-black/5 py-2 last:border-0">
      <span className="text-brand-muted">{label}</span>
      <div className="flex flex-1 items-center justify-end gap-3">
        <span className="text-right font-medium text-brand-black">{value || "—"}</span>
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 text-xs font-bold uppercase text-brand-black underline"
        >
          Modifier
        </button>
      </div>
    </li>
  );
}
