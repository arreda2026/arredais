import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/ServiceIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const msg = (title: string) =>
  `Bonjour ARREDA, je souhaite un devis pour : ${title}.`;

type ServiceEntry = {
  title: string;
  description: string;
  icon: string;
  readonly tags: readonly string[];
};

export function ServiceOfferCard({
  service,
  index,
  featured,
}: {
  service: ServiceEntry;
  index: number;
  featured: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  const href = buildWhatsAppUrl(msg(service.title));

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-card transition-shadow duration-300 hover:shadow-lg",
        featured
          ? "border-white/10 bg-[#1A1A1A] text-white"
          : "border-black/5 bg-white text-brand-black"
      )}
    >
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-1 origin-left scale-x-0 bg-brand-red transition-transform duration-300 ease-out group-hover:scale-x-100"
        aria-hidden
      />

      <span
        className={cn(
          "font-display text-6xl leading-none sm:text-7xl",
          featured ? "text-white/[0.08]" : "text-brand-black/[0.07]"
        )}
        aria-hidden
      >
        {num}
      </span>

      <div
        className={cn(
          "mt-4 inline-flex h-14 w-14 items-center justify-center rounded-xl",
          "bg-[#FDE8EA] text-brand-red"
        )}
      >
        <ServiceIcon name={service.icon} className="h-7 w-7" />
      </div>

      <h2
        className={cn(
          "mt-5 font-heading text-xl font-bold leading-snug",
          featured ? "text-white" : "text-brand-black"
        )}
      >
        {service.title}
      </h2>

      <p
        className={cn(
          "mt-3 flex-1 font-body text-sm leading-relaxed",
          featured ? "text-white/75" : "text-brand-gray"
        )}
      >
        {service.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <li key={tag}>
            <span
              className={cn(
                "inline-block rounded-full px-3 py-1 font-body text-xs font-medium",
                featured
                  ? "border border-white/15 bg-white/10 text-white/95"
                  : "border border-black/5 bg-brand-offwhite text-brand-gray"
              )}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group/cta mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide transition-colors",
          featured
            ? "text-white hover:text-brand-red"
            : "text-brand-red hover:text-brand-deepred"
        )}
      >
        Demander un devis
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover/cta:translate-x-1.5"
          aria-hidden
        />
      </Link>
    </article>
  );
}
