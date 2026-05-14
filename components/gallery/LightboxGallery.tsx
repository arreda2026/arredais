"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type LightboxGalleryProps = {
  images: string[];
  altPrefix: string;
  /** Grille type masonry (défaut) ou carrousel + vignettes */
  layout?: "grid" | "carousel";
  className?: string;
};

export function LightboxGallery({
  images,
  altPrefix,
  layout = "grid",
  className = "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3",
}: LightboxGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const go = useCallback(
    (dir: -1 | 1) => {
      setSlide((i) => {
        const n = images.length;
        if (n <= 0) return 0;
        return (i + dir + n) % n;
      });
    },
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") {
        setActive((i) => (i === null ? 0 : Math.min(images.length - 1, i + 1)));
      }
      if (e.key === "ArrowLeft") {
        setActive((i) => (i === null ? 0 : Math.max(0, i - 1)));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  useEffect(() => {
    if (layout !== "carousel" || active !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [layout, active, go]);

  useEffect(() => {
    setSlide((s) => Math.min(s, Math.max(0, images.length - 1)));
  }, [images.length]);

  if (images.length === 0) return null;

  if (layout === "carousel") {
    const safe = Math.min(slide, images.length - 1);
    const src = images[safe]!;

    return (
      <>
        <div className="mt-6 space-y-4">
          <div
            className="relative overflow-hidden rounded-2xl bg-brand-black/5 ring-1 ring-black/5"
            role="region"
            aria-roledescription="carousel"
            aria-label={altPrefix}
          >
            <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
              <button
                type="button"
                className="relative h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-brand-black focus-visible:ring-offset-2"
                onClick={() => setActive(safe)}
                aria-label={`Agrandir l’image ${safe + 1} sur ${images.length}`}
              >
                <Image
                  src={src}
                  alt={`${altPrefix} — ${safe + 1}`}
                  fill
                  className="object-contain bg-brand-black/40"
                  sizes="(max-width: 768px) 100vw, min(1024px, 90vw)"
                  priority={safe === 0}
                />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="absolute left-2 top-1/2 z-[1] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-black shadow-md ring-1 ring-black/10 transition hover:bg-white md:left-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(-1);
                    }}
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 z-[1] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-black shadow-md ring-1 ring-black/10 transition hover:bg-white md:right-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(1);
                    }}
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden />
                  </button>
                </>
              )}
            </div>

            <p className="sr-only" aria-live="polite">
              Image {safe + 1} sur {images.length}
            </p>
            <div className="flex items-center justify-center gap-1.5 border-t border-black/5 bg-white/80 px-3 py-2">
              <span className="font-heading text-xs font-semibold uppercase tracking-wide text-brand-muted">
                {safe + 1} / {images.length}
              </span>
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin [-webkit-overflow-scrolling:touch]">
              {images.map((thumb, i) => (
                <button
                  key={`${thumb}-${i}`}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Afficher l’image ${i + 1}`}
                  aria-current={i === safe ? "true" : undefined}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition-shadow md:h-[4.5rem] md:w-32",
                    i === safe
                      ? "ring-brand-black shadow-md"
                      : "ring-transparent opacity-75 hover:opacity-100 hover:ring-black/40"
                  )}
                >
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="128px"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {active !== null && (
          <div
            className="fixed inset-0 z-[200000] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse image"
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={() => setActive(null)}
              aria-label="Fermer la visionneuse"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="absolute left-2 top-1/2 z-[1] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:left-6"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i === null ? 0 : Math.max(0, i - 1)));
              }}
              aria-label="Image précédente"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 z-[1] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:right-6"
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) =>
                  i === null ? 0 : Math.min(images.length - 1, i + 1)
                );
              }}
              aria-label="Image suivante"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div
              className="relative max-h-[85vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={images[active]}
                  alt={`${altPrefix} ${active + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-sm text-white/85">
                {active + 1} / {images.length}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className={className}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl shadow-card ring-1 ring-black/5"
          >
            <Image
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              width={900}
              height={700}
              className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[200000] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse image"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
            aria-label="Fermer la visionneuse"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:left-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? 0 : Math.max(0, i - 1)));
            }}
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:right-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) =>
                i === null ? 0 : Math.min(images.length - 1, i + 1)
              );
            }}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full">
              <Image
                src={images[active]}
                alt={`${altPrefix} ${active + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-white/85">
              {active + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
