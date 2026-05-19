"use client";

import { useMemo } from "react";
import { RedAccentLine } from "@/components/RedAccentLine";
import { PersonnelCarousel } from "@/components/about/PersonnelCarousel";
import { useMessages } from "@/components/i18n/MessagesProvider";
import { personnelImageUrl, personnelMembers } from "@/lib/personnel";

export function PersonnelSection() {
  const messages = useMessages();
  const p = messages.aboutPage.personnel;

  const roles = p.roles;
  const slides = useMemo(
    () =>
      personnelMembers.map((member) => ({
        src: personnelImageUrl(member.file),
        label:
          roles[member.id as keyof typeof roles] ??
          member.file.replace(/\.[^.]+$/, ""),
      })),
    [roles]
  );

  return (
    <section className="border-y border-black/5 bg-brand-offwhite px-4 py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="font-display text-3xl uppercase text-brand-black sm:text-4xl">{p.title}</h2>
          <RedAccentLine />
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-brand-gray md:text-lg">
            {p.lead}
          </p>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <PersonnelCarousel
            slides={slides}
            labels={{
              prev: p.prev,
              next: p.next,
              counter: p.counter,
              goTo: p.goTo,
              carouselLabel: p.carouselLabel,
              pausedHint: p.pausedHint,
            }}
          />
        </div>
      </div>
    </section>
  );
}
