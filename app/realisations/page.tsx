import type { Metadata } from "next";
import { RealisationsClient } from "@/components/realisations/RealisationsClient";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description: "Transformation d’intérieurs — avant / après à Conakry — ARREDA.",
  openGraph: {
    title: "Nos réalisations | ARREDA",
    description: "Avant / après : salons, cuisines, bureaux et hôtels à Conakry.",
  },
};

export default function RealisationsPage() {
  return <RealisationsClient />;
}
