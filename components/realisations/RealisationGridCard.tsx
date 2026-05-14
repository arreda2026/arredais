"use client";

import Image from "next/image";
import Link from "next/link";
import {
  countProjectPhotos,
  countProjectRooms,
  projectIsAfterPhotosOnly,
  type Project,
} from "@/lib/realisations";
import { useMessages } from "@/components/i18n/MessagesProvider";
import { useLocale } from "@/lib/i18n/useLocale";
import { localizedPath } from "@/lib/i18n/href";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  className?: string;
  /** Grande carte « éditoriale » (page d’accueil ou tête de liste). */
  variant?: "default" | "featured";
  priority?: boolean;
};

export function RealisationGridCard({
  project,
  className,
  variant = "default",
  priority = false,
}: Props) {
  const messages = useMessages();
  const locale = useLocale();
  const nRooms = countProjectRooms(project);
  const nPhotos = countProjectPhotos(project);
  const afterOnly = projectIsAfterPhotosOnly(project);
  const featured = variant === "featured";

  const badge = afterOnly
    ? `${nPhotos} photos`
    : `${nRooms} espaces · ${nPhotos} photos`;

  return (
    <Link
      href={localizedPath(locale, `/realisations/${project.slug}`)}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-brand-black outline-none ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-500 ease-out",
        "shadow-[0_22px_50px_-20px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:shadow-[0_32px_64px_-22px_rgba(0,0,0,0.45)]",
        "focus-visible:ring-2 focus-visible:ring-brand-black focus-visible:ring-offset-2",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          featured
            ? "aspect-[5/3] min-h-[240px] md:aspect-[2.25/1] md:min-h-[min(46vw,480px)] lg:min-h-[440px]"
            : "aspect-[3/4] min-h-[320px] sm:min-h-0 sm:aspect-[3/4]"
        )}
      >
        <Image
          src={project.coverAfter}
          alt={project.title}
          fill
          priority={priority}
          className="object-cover object-center transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-[1.03]"
          sizes={
            featured
              ? "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, min(1200px, 100vw)"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,_transparent_0%,_rgba(0,0,0,0.35)_100%)] opacity-70 mix-blend-multiply"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10"
          aria-hidden
        />

        <div className="pointer-events-none absolute right-4 top-4 md:right-6 md:top-6">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-heading font-semibold uppercase tracking-[0.18em] text-white/95 backdrop-blur-md">
            {badge}
          </span>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-0 bg-brand-black transition-all duration-500 ease-out group-hover:w-full"
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
          <p
            className={cn(
              "font-display uppercase leading-[0.95] tracking-tight text-white",
              featured ? "text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]" : "text-xl sm:text-2xl"
            )}
          >
            {project.title}
          </p>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-white/75 md:text-base">
            {project.location}
          </p>
          <p className="mt-5 flex translate-y-1 items-center gap-2 font-heading text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {messages.projectPage.discoverProject}
            <span className="text-brand-black" aria-hidden>
              →
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
