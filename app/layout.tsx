import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

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
    <html
      lang="fr"
      className={cn(
        bebas.variable,
        montserrat.variable,
        inter.variable,
        "font-body"
      )}
    >
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
