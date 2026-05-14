import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "./globals.css";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { isLocale, type Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARREDA | Meubles sur mesure à Conakry, Guinée",
    template: "%s | ARREDA",
  },
  description:
    "ARREDA fabrique des meubles sur mesure à Conakry : salons, cuisines, bureaux et aménagements commerciaux. Livraison et installation en Guinée.",
  keywords: [
    "meubles sur mesure Conakry",
    "menuiserie Guinée",
    "aménagement intérieur Conakry",
    "fabricant meubles Guinée",
    "custom furniture Guinea",
    "interior design Conakry",
  ],
  openGraph: {
    type: "website",
    locale: "fr_GN",
    siteName: "ARREDA",
    title: "ARREDA | Meubles sur mesure à Conakry, Guinée",
    description:
      "Fabrication locale, sur mesure et pose sur site. ARREDA transforme vos espaces en bois.",
    url: SITE_URL,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const raw = h.get("x-locale") ?? "fr";
  const locale: Locale = isLocale(raw) ? raw : "fr";
  const htmlLang = locale === "en" ? "en" : "fr";

  return (
    <html lang={htmlLang} className="font-body" suppressHydrationWarning>
      <body className="min-h-screen bg-brand-white text-brand-black antialiased">
        <JsonLd />
        <Analytics />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
