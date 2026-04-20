"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { RedAccentLine } from "@/components/RedAccentLine";
import { RealisationGridCard } from "@/components/realisations/RealisationGridCard";
import { buttonVariants } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WHATSAPP_E164 } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { getSimilarProjects, type Project, type Room } from "@/lib/realisations";

const SCROLL_OFFSET = 96;

type ViewMode = "compare" | "side";

type LightboxState = {
  roomId: string;
  index: number;
};

function roomScrollId(room: Room) {
  return `room-${room.id}`;
}

function flatPhotos(room: Room): { photo: Room["before"][number]; label: "Avant" | "Après" }[] {
  return [
    ...room.before.map((photo) => ({ photo, label: "Avant" as const })),
    ...room.after.map((photo) => ({ photo, label: "Après" as const })),
  ];
}

export function ProjectDetailClient({ project }: { project: Project }) {
  const rooms = project.rooms;
  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id ?? "");
  const similar = useMemo(() => getSimilarProjects(project, 3), [project]);

  const scrollToRoom = useCallback((roomId: string) => {
    const el = document.getElementById(`room-${roomId}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveRoomId(roomId);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          const id = visible[0].target.id.replace("room-", "");
          setActiveRoomId(id);
        }
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -55% 0px`, threshold: [0.12, 0.25, 0.4] }
    );
    const t = window.requestAnimationFrame(() => {
      rooms.forEach((r) => {
        const el = document.getElementById(roomScrollId(r));
        if (el) obs.observe(el);
      });
    });
    return () => {
      window.cancelAnimationFrame(t);
      obs.disconnect();
    };
  }, [rooms]);

  const waHref = useMemo(() => {
    const text = `Bonjour ARREDA, le projet « ${project.title} » m'intéresse. Pouvez-vous m'en dire plus ?`;
    return buildWhatsAppUrl(text, WHATSAPP_E164);
  }, [project.title]);

  return (
    <div className="bg-brand-white pb-20">
      <section className="border-b border-black/5 px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <nav className="text-sm text-brand-muted">
              <Link href="/" className="hover:text-brand-red">
                Accueil
              </Link>
              {" > "}
              <Link href="/realisations" className="hover:text-brand-red">
                Réalisations
              </Link>
              {" > "}
              <span className="text-brand-black">{project.title}</span>
            </nav>
            <h1 className="mt-4 font-display text-4xl uppercase leading-tight text-brand-black sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <RedAccentLine />
            <p className="mt-4 max-w-xl font-body text-brand-gray">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-offwhite px-3 py-1 text-xs font-heading font-semibold uppercase text-brand-black">
                {project.location}
              </span>
              <span className="rounded-full bg-brand-offwhite px-3 py-1 text-xs font-heading font-semibold uppercase text-brand-black">
                {project.duration}
              </span>
              <span className="rounded-full bg-brand-offwhite px-3 py-1 text-xs font-heading font-semibold uppercase text-brand-black">
                {project.year}
              </span>
              <span className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-heading font-semibold uppercase text-brand-red">
                {project.category}
              </span>
            </div>
          </div>
          <div className="lg:pt-8">
            <BeforeAfterSlider
              beforeImage={project.coverBefore}
              afterImage={project.coverAfter}
              title={project.title}
              showMeta={false}
              className="shadow-lg"
            />
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-[90] border-b border-black/10 bg-brand-white/95 backdrop-blur supports-[backdrop-filter]:bg-brand-white/80">
        <nav
          className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 scrollbar-thin"
          aria-label="Pièces du projet"
        >
          {rooms.map((r) => {
            const active = activeRoomId === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => scrollToRoom(r.id)}
                className={cn(
                  "shrink-0 whitespace-nowrap border-b-2 px-3 py-2 font-heading text-sm font-semibold uppercase tracking-wide transition-colors",
                  active
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-brand-black hover:text-brand-red"
                )}
              >
                <span className="mr-1.5" aria-hidden>
                  {r.icon}
                </span>
                {r.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14">
        {rooms.map((room) => (
          <RoomSection key={room.id} room={room} projectTitle={project.title} />
        ))}
      </div>

      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-xl bg-brand-black px-6 py-12 text-center text-white md:px-12">
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            Vous voulez le même résultat ?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/75">
            Parlons de votre projet — nous revenons vers vous avec une proposition adaptée.
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 inline-flex border-0 bg-brand-wa font-heading font-semibold uppercase text-white hover:bg-brand-wa/90"
            )}
          >
            Écrire sur WhatsApp
          </a>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4">
          <h2 className="font-display text-3xl uppercase text-brand-black">Projets similaires</h2>
          <RedAccentLine />
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {similar.map((p) => (
              <RealisationGridCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function RoomSection({ room, projectTitle }: { room: Room; projectTitle: string }) {
  const [mode, setMode] = useState<ViewMode>("compare");
  const [bi, setBi] = useState(0);
  const [ai, setAi] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const before = room.before[bi];
  const after = room.after[ai];
  const flat = useMemo(() => flatPhotos(room), [room]);

  const openLightboxAt = (index: number) => {
    setLightbox({ roomId: room.id, index });
  };

  useEffect(() => {
    if (!lightbox || lightbox.roomId !== room.id) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((lb) =>
          lb
            ? {
                ...lb,
                index: Math.min(flat.length - 1, lb.index + 1),
              }
            : null
        );
      if (e.key === "ArrowLeft")
        setLightbox((lb) =>
          lb ? { ...lb, index: Math.max(0, lb.index - 1) } : null
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, room.id, flat.length]);

  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null || !lightbox) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (dx < -50)
      setLightbox((lb) =>
        lb
          ? { ...lb, index: Math.min(flat.length - 1, lb.index + 1) }
          : null
      );
    else if (dx > 50)
      setLightbox((lb) =>
        lb ? { ...lb, index: Math.max(0, lb.index - 1) } : null
      );
  };

  const lbEntry =
    lightbox && lightbox.roomId === room.id ? flat[lightbox.index] : undefined;

  return (
    <section id={roomScrollId(room)} className="scroll-mt-28">
      <div className="flex flex-col gap-4 border-b border-black/5 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-heading text-2xl font-bold text-brand-black">
          <span className="mr-2" aria-hidden>
            {room.icon}
          </span>
          {room.name}
        </h2>
        <div className="flex w-fit rounded-lg border border-black/10 p-0.5">
          <button
            type="button"
            onClick={() => setMode("compare")}
            className={cn(
              "rounded-md px-3 py-1.5 font-heading text-xs font-semibold uppercase transition-colors",
              mode === "compare"
                ? "bg-brand-red text-white"
                : "text-brand-black hover:bg-brand-offwhite"
            )}
          >
            ⇄ Comparaison
          </button>
          <button
            type="button"
            onClick={() => setMode("side")}
            className={cn(
              "rounded-md px-3 py-1.5 font-heading text-xs font-semibold uppercase transition-colors",
              mode === "side"
                ? "bg-brand-red text-white"
                : "text-brand-black hover:bg-brand-offwhite"
            )}
          >
            ▦ Côte à côte
          </button>
        </div>
      </div>

      {mode === "compare" && before && after && (
        <div className="mt-6 space-y-4">
          <div className="relative">
            <BeforeAfterSlider
              beforeImage={before.url}
              afterImage={after.url}
              title={`${projectTitle} — ${room.name}`}
              beforeCaption={before.caption}
              afterCaption={after.caption}
              showMeta={false}
            />
            <button
              type="button"
              onClick={() => openLightboxAt(bi)}
              className="absolute bottom-16 right-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur hover:bg-black/75"
              aria-label="Agrandir la vue avant"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Agrandir
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-heading font-bold uppercase text-brand-red">
                Avant
              </p>
              <div className="flex flex-wrap gap-2">
                {room.before.map((ph, i) => (
                  <button
                    key={ph.id}
                    type="button"
                    title="Clic : choisir la photo · double-clic : plein écran"
                    onClick={() => setBi(i)}
                    onDoubleClick={() => openLightboxAt(i)}
                    className={cn(
                      "relative h-16 w-24 overflow-hidden rounded-md ring-2 transition-shadow",
                      bi === i ? "ring-brand-red" : "ring-transparent hover:ring-brand-red/40"
                    )}
                  >
                    <Image
                      src={ph.url}
                      alt={ph.caption ?? ""}
                      fill
                      className="object-cover"
                      sizes="96px"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-heading font-bold uppercase text-brand-muted">
                Après
              </p>
              <div className="flex flex-wrap gap-2">
                {room.after.map((ph, i) => (
                  <button
                    key={ph.id}
                    type="button"
                    title="Clic : choisir la photo · double-clic : plein écran"
                    onClick={() => setAi(i)}
                    onDoubleClick={() => openLightboxAt(room.before.length + i)}
                    className={cn(
                      "relative h-16 w-24 overflow-hidden rounded-md ring-2 transition-shadow",
                      ai === i ? "ring-brand-red" : "ring-transparent hover:ring-brand-red/40"
                    )}
                  >
                    <Image
                      src={ph.url}
                      alt={ph.caption ?? ""}
                      fill
                      className="object-cover"
                      sizes="96px"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === "side" && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-heading font-bold uppercase text-brand-red">Avant</p>
            {room.before.map((ph, i) => (
              <button
                key={ph.id}
                type="button"
                className="relative block w-full overflow-hidden rounded-xl text-left ring-1 ring-black/5"
                onClick={() => openLightboxAt(i)}
              >
                <span className="absolute left-2 top-2 z-[1] rounded bg-brand-red px-2 py-0.5 text-xs font-heading font-bold uppercase text-white">
                  Avant
                </span>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={ph.url}
                    alt={ph.caption ?? "Avant"}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-heading font-bold uppercase text-brand-muted">Après</p>
            {room.after.map((ph, i) => (
              <button
                key={ph.id}
                type="button"
                className="relative block w-full overflow-hidden rounded-xl text-left ring-1 ring-black/5"
                onClick={() => openLightboxAt(room.before.length + i)}
              >
                <span className="absolute left-2 top-2 z-[1] rounded bg-white px-2 py-0.5 text-xs font-heading font-bold uppercase text-brand-red ring-1 ring-black/10">
                  Après
                </span>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={ph.url}
                    alt={ph.caption ?? "Après"}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {lbEntry && lightbox && (
        <div
          className="fixed inset-0 z-[200000] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse"
          onClick={() => setLightbox(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Fermer"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-[1] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:left-6"
            aria-label="Précédent"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lb) =>
                lb ? { ...lb, index: Math.max(0, lb.index - 1) } : null
              );
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-[1] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:right-6"
            aria-label="Suivant"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lb) =>
                lb
                  ? {
                      ...lb,
                      index: Math.min(flat.length - 1, lb.index + 1),
                    }
                  : null
              );
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div
            className="relative max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full min-w-[280px] max-w-[90vw]">
              <Image
                src={lbEntry.photo.url}
                alt={lbEntry.photo.caption ?? lbEntry.label}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <p className="mt-4 text-center text-sm text-white/90">
              <span className="font-heading font-bold">{lbEntry.label}</span>
              {" · "}
              {lightbox.index + 1} / {flat.length}
              {lbEntry.photo.caption && (
                <>
                  {" — "}
                  {lbEntry.photo.caption}
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
