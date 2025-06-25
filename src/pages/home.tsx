import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AISolutionsSection from "@/components/ai-solutions-section";
import CaseStudiesSection from "@/components/case-studies-section";
import TeamSection from "@/components/team-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import NeuralNetworkLoader from "@/components/neural-network-loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <NeuralNetworkLoader />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AISolutionsSection />
      <CaseStudiesSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
