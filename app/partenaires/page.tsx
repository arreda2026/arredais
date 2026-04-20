import type { Metadata } from "next";
import { PartenairesClient } from "@/components/partenaires/PartenairesClient";

export const metadata: Metadata = {
  title: "Partenaires internationaux",
  description: "Opportunités bois, machines et investissement — ARREDA Guinée.",
  openGraph: {
    title: "Partenaires Internationaux | ARREDA Guinée",
    description: "Pitch investisseur et contact international.",
  },
};

export default function PartenairesPage() {
  return <PartenairesClient />;
}
