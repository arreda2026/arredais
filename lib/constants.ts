/** Chiffres uniquement, sans + (ex. 224620397383) */
export const WHATSAPP_E164 =
  process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "224620397383";

const phoneDigits = WHATSAPP_E164.replace(/\D/g, "");

/** Affichage lisible (ex. +224 620 39 73 83 pour 224 + 9 chiffres) */
export const PHONE_DISPLAY =
  phoneDigits.startsWith("224") && phoneDigits.length === 12
    ? `+224 ${phoneDigits.slice(3, 6)} ${phoneDigits.slice(6, 8)} ${phoneDigits.slice(8, 10)} ${phoneDigits.slice(10)}`
    : phoneDigits.startsWith("224") && phoneDigits.length > 12
      ? `+224 ${phoneDigits.slice(3, 6)} ${phoneDigits.slice(6, 9)} ${phoneDigits.slice(9)}`
      : `+${phoneDigits}`;

export const PHONE_TEL_HREF = `tel:+${phoneDigits}`;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@arredaitalianstyle.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arredaitalianstyle.com";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-XXXXXXXXXX";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-XXXXXXX";
