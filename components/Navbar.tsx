"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/atelier", label: "Atelier" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[110] border-b-2 border-brand-red bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-md bg-brand-offwhite/80 p-1">
              <Image
                src="/logo/arreda-logo.webp"
                alt="ARREDA"
                width={120}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "font-heading text-sm font-semibold uppercase tracking-wide text-brand-black transition-colors hover:text-brand-red",
                    active && "text-brand-red underline decoration-brand-red decoration-2 underline-offset-8"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/devis"
              className={cn(
                buttonVariants({ size: "lg" }),
                "border-0 bg-brand-red font-heading font-semibold uppercase tracking-wide text-white hover:bg-brand-deepred"
              )}
            >
              Demander un devis
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-red/20 text-brand-black lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5 text-brand-red" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 px-8 py-10">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-lg font-bold uppercase tracking-wide text-brand-red"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/devis"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-md bg-brand-red px-4 py-3 text-center font-heading text-sm font-semibold uppercase text-white"
              >
                Demander un devis
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
