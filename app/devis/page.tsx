import type { Metadata } from "next";
import { DevisExperience } from "@/components/devis/DevisExperience";

export const metadata: Metadata = {
  title: "Demande de devis",
  description:
    "Formulaire en 3 étapes — ARREDA prépare votre demande et vous oriente vers WhatsApp.",
};

export default function DevisPage() {
  return <DevisExperience />;
}
