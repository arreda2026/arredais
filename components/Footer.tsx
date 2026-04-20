import Image from "next/image";
import Link from "next/link";
import { Camera, Share2 } from "lucide-react";
import { GuineaRibbon } from "@/components/GuineaRibbon";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL_HREF } from "@/lib/constants";

const wa = buildWhatsAppUrl(defaultWhatsAppMessage);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-footer text-white">
      <GuineaRibbon />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="rounded-md bg-white/5 p-2">
            <Image
              src="/logo/arreda-logo.webp"
              alt="ARREDA"
              width={140}
              height={56}
              className="h-12 w-auto"
            />
          </div>
          <p className="max-w-xl font-body text-sm text-white/80">
            <span className="font-heading font-bold uppercase tracking-wide text-white">
              ARREDA
            </span>{" "}
            — meubles sur mesure, de la conception à la pose, en Guinée depuis 2024.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <Link href="/about" className="hover:text-brand-red">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-red">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-brand-red">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/devis" className="hover:text-brand-red">
                  Devis
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>Résidentiel</li>
              <li>Bureaux</li>
              <li>Commercial</li>
              <li>Installation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>Conakry, Guinée</li>
              <li>
                <a href={PHONE_TEL_HREF} className="hover:text-brand-red">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-red">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={wa} className="hover:text-brand-red">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Réseaux
            </h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="rounded-full border border-white/20 p-2 hover:border-brand-red hover:text-brand-red"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="rounded-full border border-white/20 p-2 hover:border-brand-red hover:text-brand-red"
              >
                <Camera className="h-5 w-5" />
              </a>
              <a
                href={wa}
                aria-label="WhatsApp"
                className="rounded-full border border-white/20 p-2 hover:border-brand-wa hover:text-brand-wa"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-brand-red pt-6 text-center text-xs text-white/60">
          © {year} ARREDA — Tous droits réservés | Fait avec ❤️ à Conakry, Guinée
        </div>
      </div>
    </footer>
  );
}
