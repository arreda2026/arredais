import { CONTACT_EMAIL, SITE_URL, WHATSAPP_E164 } from "@/lib/constants";

const phone = `+${WHATSAPP_E164.replace(/\D/g, "")}`;

const json = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ARREDA",
  description: "Fabricant de meubles sur mesure à Conakry, Guinée",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Conakry",
    addressCountry: "GN",
  },
  telephone: phone,
  foundingDate: "2024",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
