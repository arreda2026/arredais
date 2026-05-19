"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5000;

const fadeTransition = "transition-opacity duration-700 ease-in-out";

export type PersonnelSlide = {
  src: string;
  label: string;
};

type Props = {
  slides: PersonnelSlide[];
  labels: {
    prev: string;
    next: string;
    counter: string;
    goTo: string;
    carouselLabel: string;
    pausedHint: string;
  };
};

export function PersonnelCarousel({ slides, labels }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = slides.length;
  const safe = count > 0 ? Math.min(index, count - 1) : 0;
  const current = slides[safe];

  const go = useCallback(
    (dir: -1 | 1) => {
      if (count <= 0) return;
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, count - 1)));
  }, [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  if (!current || count === 0) return null;

  const counterText = labels.counter
    .replace("{current}", String(safe + 1))
    .replace("{total}", String(count));

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden rounded-2xl bg-brand-black/5 ring-1 ring-black/5"
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.carouselLabel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <div className="relative aspect-[4/5] w-full bg-brand-black/5 sm:aspect-[3/4] md:aspect-[4/3]">
          {slides.map((slide, i) => {
            const active = i === safe;
            return (
              <Image
                key={slide.src}
                src={slide.src}
                alt={active ? slide.label : ""}
                fill
                aria-hidden={!active}
                className={cn(
                  "object-cover object-top",
                  fadeTransition,
                  active ? "z-10 opacity-100" : "z-0 opacity-0"
                )}
                sizes="(max-width: 768px) 100vw, min(560px, 45vw)"
                priority={i === 0}
              />
            );
          })}

          {count > 1 && (
            <>
              <button
                type="button"
                className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-black shadow-md ring-1 ring-black/10 transition hover:bg-white md:left-3"
                onClick={() => go(-1)}
                aria-label={labels.prev}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-black shadow-md ring-1 ring-black/10 transition hover:bg-white md:right-3"
                onClick={() => go(1)}
                aria-label={labels.next}
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </>
          )}
        </div>

        <div className="border-t border-black/5 bg-white px-4 py-3 text-center">
          <div className="relative mx-auto min-h-[1.25rem] max-w-sm">
            {slides.map((slide, i) => {
              const active = i === safe;
              return (
                <p
                  key={slide.src}
                  aria-hidden={!active}
                  className={cn(
                    "font-heading text-sm font-bold uppercase tracking-wide text-brand-black",
                    fadeTransition,
                    active
                      ? "relative opacity-100"
                      : "pointer-events-none absolute inset-x-0 top-0 opacity-0"
                  )}
                >
                  {slide.label}
                </p>
              );
            })}
          </div>
          <p className="mt-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
            {counterText}
            {paused ? <span className="sr-only"> — {labels.pausedHint}</span> : null}
          </p>
        </div>

        <p className="sr-only" aria-live="polite">
          {current.label} — {counterText}
        </p>
      </div>

      {count > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={labels.goTo.replace("{role}", slide.label)}
              aria-current={i === safe ? "true" : undefined}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-500 ease-in-out",
                i === safe ? "scale-110 bg-brand-black" : "bg-black/20 hover:bg-black/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
