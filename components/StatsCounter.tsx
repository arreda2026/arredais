"use client";

import { useEffect, useRef, useState } from "react";
import { useMessages } from "@/components/i18n/MessagesProvider";

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setInView(true);
      },
      { threshold: 0.1, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

function AnimatedNumber({
  value,
  suffix,
  duration = 1200,
  start,
}: {
  value: number;
  suffix: string;
  duration?: number;
  start: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, duration]);

  return (
    <span className="font-display text-4xl tracking-wide text-white sm:text-5xl">
      {n}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const messages = useMessages();
  const items = messages.home.statsBar;
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="w-full bg-brand-black py-10 text-white"
      aria-label={messages.home.statsAria}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <AnimatedNumber
              value={s.value}
              suffix={s.suffix}
              start={inView}
            />
            <p className="mt-2 font-heading text-xs font-semibold uppercase tracking-wide text-white/90 sm:text-sm">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
