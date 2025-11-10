import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import IndustriesSection from "@/components/industries-section";
import GoogleGrantsSection from "@/components/google-grants-section";
import ServicesSection from "@/components/services-section";
import AISolutionsSection from "@/components/ai-solutions-section";
import CaseStudiesSection from "@/components/case-studies-section";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import TrustedBySection from "@/components/trusted-by-section";
export default function Home() {
  // Desactivar temporalmente el loader para pruebas
  const isLoading = false;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden bg-gradient-light relative">

      <Navigation />
      <HeroSection />
      <TrustedBySection />
      <IndustriesSection />
      <GoogleGrantsSection />
      <ServicesSection />
      <AISolutionsSection />
      <CaseStudiesSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
