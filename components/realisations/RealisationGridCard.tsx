"use client";

import Image from "next/image";
import Link from "next/link";
import { countProjectPhotos, countProjectRooms, type Project } from "@/lib/realisations";
import { cn } from "@/lib/utils";

type Props = { project: Project; className?: string };

export function RealisationGridCard({ project, className }: Props) {
  const nRooms = countProjectRooms(project);
  const nPhotos = countProjectPhotos(project);

  return (
    <Link
      href={`/realisations/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl bg-brand-offwhite shadow-card ring-1 ring-black/5",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={project.coverAfter}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-brand-red px-3 py-1 text-xs font-heading font-bold uppercase text-white shadow">
          {nRooms} pièces · {nPhotos} photos
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/55">
          <span className="translate-y-3 rounded-md border-2 border-white bg-white/10 px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wide text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Voir le projet →
          </span>
        </div>
      </div>
      <div className="border-t border-black/5 bg-white px-4 py-3">
        <p className="font-heading text-base font-bold text-brand-black">{project.title}</p>
        <p className="mt-1 text-xs text-brand-muted">{project.location}</p>
      </div>
    </Link>
  );
}
