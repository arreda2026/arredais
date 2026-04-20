import { WHATSAPP_E164 } from "@/lib/constants";

export function buildWhatsAppUrl(
  message: string,
  phoneDigits: string = WHATSAPP_E164
): string {
  const clean = phoneDigits.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  "Bonjour ARREDA, je souhaite un devis pour un meuble sur mesure.";
