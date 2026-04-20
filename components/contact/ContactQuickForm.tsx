"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactQuickForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState(
    "Bonjour ARREDA, je souhaite des informations sur vos services."
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [name && `Nom: ${name}`, message].filter(Boolean).join("\n\n");
    window.open(buildWhatsAppUrl(text), "_blank");
  }

  return (
    <form
      className="space-y-4 rounded-xl border border-black/5 bg-brand-offwhite/50 p-6 shadow-card"
      onSubmit={onSubmit}
    >
      <h2 className="font-heading text-lg font-bold text-brand-black">Message rapide</h2>
      <div>
        <Label htmlFor="n">Nom</Label>
        <Input id="n" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="m">Message</Label>
        <Textarea id="m" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <p className="text-xs text-brand-muted">
        Pour un devis détaillé, préférez le{" "}
        <Link href="/devis" className="text-brand-red underline">
          formulaire devis
        </Link>
        .
      </p>
      <button
        type="submit"
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full bg-brand-red text-white hover:bg-brand-deepred"
        )}
      >
        Ouvrir WhatsApp
      </button>
    </form>
  );
}
