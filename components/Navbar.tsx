"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { localizedPath } from "@/lib/i18n/href";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/messages";

const NAV_PATHS = [
  { path: "/", key: "home" },
  { path: "/about", key: "about" },
  { path: "/services", key: "services" },
  { path: "/realisations", key: "realisations" },
  { path: "/atelier", key: "atelier" },
  { path: "/partenaires", key: "partners" },
  { path: "/contact", key: "contact" },
] as const;

type NavKey = (typeof NAV_PATHS)[number]["key"];

function LanguageSwitch({ locale, messages }: { locale: Locale; messages: Messages }) {
  const pathname = usePathname();
  const stripped = pathname.replace(/^\/(fr|en)/, "") || "/";
  const pathForLocale = stripped === "/" ? "/" : stripped;

  return (
    <div
      role="group"
      aria-label={messages.lang.groupLabel}
      className="flex shrink-0 items-center gap-1 rounded-md border border-black/10 bg-white/80 p-0.5 text-xs font-heading font-bold uppercase tracking-wide"
    >
      <Link
        href={localizedPath("fr", pathForLocale)}
        className={cn(
          "rounded px-2 py-1 transition-colors",
          locale === "fr" ? "bg-brand-black text-white" : "text-brand-black hover:text-brand-black/70"
        )}
        aria-current={locale === "fr" ? "true" : undefined}
      >
        {messages.lang.fr}
      </Link>
      <Link
        href={localizedPath("en", pathForLocale)}
        className={cn(
          "rounded px-2 py-1 transition-colors",
          locale === "en" ? "bg-brand-black text-white" : "text-brand-black hover:text-brand-black/70"
        )}
        aria-current={locale === "en" ? "true" : undefined}
      >
        {messages.lang.en}
      </Link>
    </div>
  );
}

const devisButtonClass = cn(
  buttonVariants({ size: "lg" }),
  "border-0 bg-brand-black font-heading font-semibold uppercase tracking-wide text-white hover:bg-black/85"
);

type Props = { locale: Locale; messages: Messages };

export function Navbar({ locale, messages }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const n = messages.nav;

  const linkLabel = (key: NavKey) => n[key as keyof typeof n] as string;

  const devisHref = localizedPath(locale, "/devis");

  return (
    <>
      <header className="sticky top-0 z-[110] border-b-2 border-brand-red bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3">
          <Link href={localizedPath(locale, "/")} className="flex min-w-0 shrink-0 items-center gap-2">
            <Image
              src="/logo/ARREDA.png"
              alt="ARREDA"
              width={849}
              height={280}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 xl:flex xl:gap-5">
            {NAV_PATHS.map((item) => {
              const href = localizedPath(locale, item.path);
              const active =
                pathname === href || (item.path === "/" && (pathname === `/${locale}` || pathname === `/${locale}/`));
              return (
                <Link
                  key={item.path}
                  href={href}
                  className={cn(
                    "whitespace-nowrap font-heading text-sm font-semibold uppercase tracking-wide text-brand-black transition-colors hover:text-brand-black/70",
                    active &&
                      "text-brand-black underline decoration-brand-black decoration-2 underline-offset-8"
                  )}
                >
                  {linkLabel(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-1 justify-end xl:flex-none" />

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={devisHref}
              className={cn(
                devisButtonClass,
                "hidden max-w-[10rem] truncate text-xs sm:max-w-[12rem] sm:text-sm lg:inline-flex lg:max-w-none lg:text-base"
              )}
            >
              {n.quote}
            </Link>

            <Link
              href={devisHref}
              className={cn(
                buttonVariants({ size: "sm" }),
                "inline-flex max-w-[9rem] truncate border-0 bg-brand-black px-2 py-2 font-heading text-[10px] font-semibold uppercase leading-tight text-white hover:bg-black/85 sm:max-w-[11rem] sm:text-xs lg:hidden"
              )}
            >
              {n.quote}
            </Link>

            <LanguageSwitch locale={locale} messages={messages} />

            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-brand-red/20 text-brand-black lg:hidden"
              aria-label={open ? n.menuClose : n.menuOpen}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-0 z-[9998] bg-white lg:hidden"
          >
            <div className="flex h-16 items-center justify-end border-b-2 border-brand-red px-4">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-red/20"
                aria-label={n.menuCloseLabel}
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5 text-brand-red" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 px-8 py-10">
              {NAV_PATHS.map((item) => (
                <Link
                  key={item.path}
                  href={localizedPath(locale, item.path)}
                  onClick={() => setOpen(false)}
                  className="font-heading text-lg font-bold uppercase tracking-wide text-brand-black"
                >
                  {linkLabel(item.key)}
                </Link>
              ))}
              <Link
                href={devisHref}
                onClick={() => setOpen(false)}
                className="mt-4 rounded-md bg-brand-black px-4 py-3 text-center font-heading text-sm font-semibold uppercase text-white hover:bg-black/85"
              >
                {n.quote}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
