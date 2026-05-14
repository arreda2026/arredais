"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  title: string;
  category?: string;
  duration?: string;
  location?: string;
  beforeCaption?: string;
  afterCaption?: string;
  /** Affiche titre + pastilles (défaut true). false pour intégration dans une pièce. */
  showMeta?: boolean;
  className?: string;
};

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  category,
  duration,
  location,
  beforeCaption,
  afterCaption,
  showMeta = true,
  className,
}: BeforeAfterSliderProps) {
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPct((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    const onTouchMoveWindow = (e: TouchEvent) => {
      if (!dragging.current) return;
      const t = e.touches[0];
      if (t) setFromClientX(t.clientX);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMoveWindow, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMoveWindow);
      window.removeEventListener("touchend", onUp);
    };
  }, [setFromClientX]);

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl bg-brand-offwhite shadow-card ring-1 ring-black/5",
        className
      )}
    >
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none"
        onMouseDown={(e) => {
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          const t = e.touches[0];
          if (t) setFromClientX(t.clientX);
        }}
      >
        <motion.div
          key={afterImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0"
        >
          <Image
            src={afterImage}
            alt={`Après — ${title}`}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <motion.div
            key={beforeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0"
          >
            <Image
              src={beforeImage}
              alt={`Avant — ${title}`}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-md"
          style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        />

        <button
          type="button"
          className="absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-brand-black bg-white text-brand-black shadow-lg"
          style={{ left: `${pct}%` }}
          aria-label="Faire glisser pour comparer avant et après"
          onMouseDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
            setFromClientX(e.clientX);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            dragging.current = true;
            const t = e.touches[0];
            if (t) setFromClientX(t.clientX);
          }}
        >
          <span className="flex gap-0.5 text-xs font-bold" aria-hidden>
            ◀ ▶
          </span>
        </button>

        <span className="pointer-events-none absolute left-3 top-3 rounded bg-brand-black px-2 py-1 text-xs font-heading font-bold uppercase text-white">
          Avant
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded bg-white px-2 py-1 text-xs font-heading font-bold uppercase text-brand-black ring-1 ring-black/10">
          Après
        </span>
      </div>

      {(showMeta || beforeCaption || afterCaption) && (
        <figcaption className="space-y-1 px-4 py-3">
          {showMeta && (
            <>
              <p className="font-heading text-base font-bold text-brand-black">{title}</p>
              <div className="flex flex-wrap gap-2 text-xs text-brand-gray">
                {category && (
                  <span className="rounded-full bg-brand-offwhite px-2 py-0.5">{category}</span>
                )}
                {duration && (
                  <span className="rounded-full bg-brand-offwhite px-2 py-0.5">{duration}</span>
                )}
                {location && (
                  <span className="rounded-full bg-brand-offwhite px-2 py-0.5">{location}</span>
                )}
              </div>
            </>
          )}
          {(beforeCaption || afterCaption) && (
            <p className="text-xs text-brand-muted">
              {beforeCaption && <span className="mr-2">Avant : {beforeCaption}</span>}
              {afterCaption && <span>Après : {afterCaption}</span>}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
