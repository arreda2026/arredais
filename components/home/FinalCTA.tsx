import Link from "next/link";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const wa = buildWhatsAppUrl(defaultWhatsAppMessage);

export function FinalCTA() {
  return (
    <section className="bg-brand-red py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="font-display text-4xl uppercase leading-tight sm:text-5xl">
          Prêt à transformer votre espace ?
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "border-0 bg-white font-heading font-semibold uppercase text-brand-red hover:bg-brand-offwhite"
            )}
          >
            WhatsApp
          </a>
          <Link
            href="/devis"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-2 border-white bg-transparent font-heading font-semibold uppercase text-white hover:bg-white/10"
            )}
          >
            Formulaire devis
          </Link>
        </div>
      </div>
    </section>
  );
}
