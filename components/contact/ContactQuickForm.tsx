"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useMessages } from "@/components/i18n/MessagesProvider";
import { useLocale } from "@/lib/i18n/useLocale";
import { localizedPath } from "@/lib/i18n/href";

export function ContactQuickForm() {
  const messages = useMessages();
  const locale = useLocale();
  const q = messages.contactQuickForm;
  const [name, setName] = useState("");
  const [message, setMessage] = useState(q.defaultMessage);

  useEffect(() => {
    setMessage(q.defaultMessage);
  }, [q.defaultMessage]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [name && `${q.waNamePrefix}${name}`, message].filter(Boolean).join("\n\n");
    window.open(buildWhatsAppUrl(text), "_blank");
  }

  return (
    <form
      className="space-y-4 rounded-xl border border-black/5 bg-brand-offwhite/50 p-6 shadow-card"
      onSubmit={onSubmit}
    >
      <h2 className="font-heading text-lg font-bold text-brand-black">{q.title}</h2>
      <div>
        <Label htmlFor="n">{q.name}</Label>
        <Input id="n" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="m">{q.message}</Label>
        <Textarea id="m" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <p className="text-xs text-brand-muted">
        {q.hintPrefix}{" "}
        <Link href={localizedPath(locale, "/devis")} className="text-brand-black underline">
          {q.hintLink}
        </Link>
        {q.hintSuffix}
      </p>
      <button
        type="submit"
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full bg-brand-black text-white hover:bg-black/85"
        )}
      >
        {q.openWhatsApp}
      </button>
    </form>
  );
}
