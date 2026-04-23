import type { Metadata } from "next";
import { RealisationsClient } from "@/components/realisations/RealisationsClient";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description: "Galerie photo des réalisations ARREDA.",
  openGraph: {
    title: "Nos réalisations | ARREDA",
    description: "Parcourez les projets livrés par ARREDA en images.",
  },
};

export default function RealisationsPage() {
  return <RealisationsClient />;
}
