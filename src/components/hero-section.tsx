import { motion } from "framer-motion";
import { Rocket, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroParticlesAnimation from "@/components/hero-particles-animation";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal();
  const [counters, setCounters] = useState({
    leads: 0,
    satisfaction: 0,
    projects: 0,
    experience: 0,
  });

  useEffect(() => {
    if (isVisible) {
      const targets = { leads: 500, satisfaction: 95, projects: 150, experience: 24 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      const intervals: number[] = [];
      
      Object.entries(targets).forEach(([key, target]) => {
        const increment = target / steps;
        let current = 0;

        const intervalId = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(intervalId);
          }
          setCounters(prev => ({ ...prev, [key]: Math.ceil(current) }));
        }, stepTime);
        
        intervals.push(intervalId);
      });

      return () => intervals.forEach(clearInterval);
    }
  }, [isVisible]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      <HeroParticlesAnimation />
      
      <div className="container mx-auto px-12 text-center relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transforma tu negocio con{" "}
            <span className="n8n-text-gradient">IA y Marketing Digital</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Generamos leads cualificados y automatizamos procesos con soluciones
            de inteligencia artificial para empresas españolas que buscan crecer
            exponencialmente.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button className="hero-button px-8 py-4 text-lg font-semibold">
              <Rocket className="mr-2 h-5 w-5" />
              Comenzar Ahora
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-muted-foreground hover:border-primary"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="stats-counter">{counters.leads}</div>
              <p className="text-muted-foreground">Leads Generados</p>
            </div>
            <div className="text-center">
              <div className="stats-counter">{counters.satisfaction}%</div>
              <p className="text-muted-foreground">Satisfacción</p>
            </div>
            <div className="text-center">
              <div className="stats-counter">{counters.projects}</div>
              <p className="text-muted-foreground">Proyectos IA</p>
            </div>
            <div className="text-center">
              <div className="stats-counter">{counters.experience}</div>
              <p className="text-muted-foreground">Meses Experiencia</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
