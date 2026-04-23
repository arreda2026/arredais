import type { Metadata } from "next";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="font-body">
      <body className="min-h-screen bg-brand-white text-brand-black antialiased">
        <JsonLd />
        <Analytics />
        <Navbar />
        <main className="min-h-[50vh]">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
