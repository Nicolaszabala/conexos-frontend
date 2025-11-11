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
      const targets = { leads: 800000, satisfaction: 4, projects: 28, experience: 10 };
      const duration = 2000;
      const startTime = Date.now();
      let animationFrame: number;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic for smoother animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        setCounters({
          leads: Math.ceil(targets.leads * easeProgress),
          satisfaction: Math.ceil(targets.satisfaction * easeProgress),
          projects: Math.ceil(targets.projects * easeProgress),
          experience: Math.ceil(targets.experience * easeProgress),
        });

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isVisible]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-32">
      <HeroParticlesAnimation />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[58.08px] text-center relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="n8n-text-gradient">Paquete Completo de Soluciones IT</span> para Empresas con Propósito
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <strong className="text-foreground">Desarrollo Web - Marketing Digital - Automatización con IA</strong>
            <br />Un equipo completo de ingenieros, diseñadores y estrategas digitales trabajando para tu crecimiento.
            <br />
            <span className="text-lg mt-2 inline-block">Especialistas en ONGs, e-commerce, educación y salud.</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="https://zcal.co/conexos/15min" target="_blank" rel="noopener noreferrer">
              <Button className="hero-button px-8 py-4 text-lg font-semibold">
                <Rocket className="mr-2 h-5 w-5" />
                Comenzar Ahora
              </Button>
            </a>
            
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="stats-counter">{counters.leads}+</div>
              <p className="text-muted-foreground font-medium">Leads Generados</p>
            </div>
            <div className="text-center">
              <div className="stats-counter">{counters.satisfaction}</div>
              <p className="text-muted-foreground font-medium">Industrias</p>
            </div>
            <div className="text-center">
              <div className="stats-counter">{counters.projects}+</div>
              <p className="text-muted-foreground font-medium">Proyectos</p>
            </div>
            <div className="text-center">
              <div className="stats-counter">{counters.experience}+</div>
              <p className="text-muted-foreground font-medium">Años de Experiencia</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
