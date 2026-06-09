import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { RedAccentLine } from "@/components/RedAccentLine";
import { ContactQuickForm } from "@/components/contact/ContactQuickForm";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Adresse, horaires et formulaire — ARREDA à Conakry.",
};

const wa = buildWhatsAppUrl(defaultWhatsAppMessage);

export default function ContactPage() {
  return (
    <div className="bg-brand-white px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-5xl uppercase text-brand-black sm:text-6xl">Contact</h1>
        <RedAccentLine />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Adresse"
              body="Usine ARREDA Italian Style — Yimbaya (près de la Sonapi), Conakry, Guinée"
            />
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="Téléphone"
              body={
                <a href={PHONE_TEL_HREF} className="text-brand-black underline">
                  {PHONE_DISPLAY}
                </a>
              }
            />
            <InfoCard
              icon={<MessageCircle className="h-5 w-5" />}
              title="WhatsApp"
              body={
                <a href={wa} className="text-brand-black underline">
                  {PHONE_DISPLAY}
                </a>
              }
            />
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              body={
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-black underline">
                  {CONTACT_EMAIL}
                </a>
              }
            />
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Horaires"
              body="Lun – Sam, 8h – 18h"
            />
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61571500554920"
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-heading font-semibold uppercase hover:border-brand-black"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-heading font-semibold uppercase hover:border-brand-black"
              >
                Instagram
              </a>
              <a
                href={wa}
                className="rounded-full border border-brand-wa px-4 py-2 text-sm font-heading font-semibold uppercase text-brand-wa hover:bg-brand-wa/10"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <ContactQuickForm />

            <div className="mt-8 overflow-hidden rounded-xl border border-black/5 shadow-card">
              <iframe
                title="Carte — Usine ARREDA Italian Style, Yimbaya"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2102.713803265612!2d-13.600663054275838!3d9.59740799942655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd50029bad9ef%3A0x8bf8a987c24cb016!2sUsine%20de%20Arreda%20Italian%20Style!5e0!3m2!1sfr!2s!4v1776525768966!5m2!1sfr!2s"
                width="100%"
                height={450}
                className="h-[280px] w-full max-w-full sm:h-[360px] md:h-[450px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="text-brand-black">{icon}</div>
      <div>
        <p className="font-heading text-sm font-bold uppercase text-brand-black">{title}</p>
        <div className="mt-1 font-body text-sm text-brand-gray">{body}</div>
      </div>
    </div>
  );
}
