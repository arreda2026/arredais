/** Accepte uniquement G-XXXXXXXX (évite injection dans les scripts analytics). */
function sanitizeGaMeasurementId(raw: string | undefined): string {
  const v = (raw ?? "").trim();
  return /^G-[A-Z0-9]+$/i.test(v) ? v : "G-XXXXXXXXXX";
}

/** Accepte uniquement GTM-XXXXXXX */
function sanitizeGtmId(raw: string | undefined): string {
  const v = (raw ?? "").trim();
  return /^GTM-[A-Z0-9]+$/i.test(v) ? v : "GTM-XXXXXXX";
}

/** Chiffres uniquement, sans + (ex. 224610978797) */
export const WHATSAPP_E164 =
  process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "224610978797";

const phoneDigits = WHATSAPP_E164.replace(/\D/g, "");

/** Affichage lisible (ex. +224 610 978 797 pour 224 + 9 chiffres) */
export const PHONE_DISPLAY =
  phoneDigits.startsWith("224") && phoneDigits.length === 12
    ? `+224 ${phoneDigits.slice(3, 6)} ${phoneDigits.slice(6, 9)} ${phoneDigits.slice(9)}`
    : `+${phoneDigits}`;

export const PHONE_TEL_HREF = `tel:+${phoneDigits}`;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@arredaitalianstyle.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arredaitalianstyle.com";

export const GA_MEASUREMENT_ID = sanitizeGaMeasurementId(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
);

export const GTM_ID = sanitizeGtmId(process.env.NEXT_PUBLIC_GTM_ID);
