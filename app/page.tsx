import { HeroSection } from "@/components/home/HeroSection";
import { TeaserRealisations } from "@/components/home/TeaserRealisations";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { StatsBar } from "@/components/StatsCounter";
import { stats } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar items={stats} />
      <TeaserRealisations />
      <ServicesSection />
      <PillarsSection />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
