import React from "react";
import HeroSection from "@/components/home/HeroSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import FooterSection from "@/components/home/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PhilosophySection />
      <FeaturedProjects />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}