"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type LightboxGalleryProps = {
  images: string[];
  altPrefix: string;
  className?: string;
};

export function LightboxGallery({
  images,
  altPrefix,
  className = "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3",
}: LightboxGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

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
              setActive((i) => (i === null ? 0 : Math.min(images.length - 1, i + 1)));
            }}
            aria-label="Image suivante"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="relative max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
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
