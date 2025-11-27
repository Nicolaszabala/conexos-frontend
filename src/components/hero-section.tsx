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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-32">
      <HeroParticlesAnimation />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[58.08px] text-center relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="n8n-text-gradient">Soluciones Tecnológicas</span> para Empresas con Propósito
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex flex-wrap gap-2 justify-center mb-4">
              <span className="px-3 py-1 text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full border border-orange-500/20 text-foreground">
                Desarrollo de Software
              </span>
              <span className="px-3 py-1 text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full border border-orange-500/20 text-foreground">
                Marketing Digital
              </span>
              <span className="px-3 py-1 text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full border border-orange-500/20 text-foreground">
                Automatización con IA
              </span>
            </span>
            <br className="hidden sm:block" />
            <span className="hidden sm:inline">Un equipo completo de ingenieros, diseñadores y estrategas digitales trabajando para tu crecimiento.</span>
            <br className="hidden sm:block" />
            <span className="text-sm sm:text-base lg:text-lg mt-2 inline-block">Especialistas en ONGs, e-commerce, educación y salud.</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="https://zcal.co/conexos/15min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button className="hero-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto">
                <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Comenzar Ahora
              </Button>
            </a>

          </motion.div>

          {/* Stats - Optimizado para mobile */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center p-3 sm:p-4">
              <div className="stats-counter text-3xl sm:text-4xl md:text-4xl lg:text-5xl whitespace-nowrap">{counters.leads.toLocaleString()}+</div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-1 sm:mt-2">Leads Generados</p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="stats-counter text-3xl sm:text-4xl md:text-5xl">{counters.satisfaction}</div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-1 sm:mt-2">Industrias</p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="stats-counter text-3xl sm:text-4xl md:text-5xl">{counters.projects}+</div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-1 sm:mt-2">Proyectos</p>
            </div>
            <div className="text-center p-3 sm:p-4">
              <div className="stats-counter text-3xl sm:text-4xl md:text-5xl">{counters.experience}+</div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-1 sm:mt-2">Años de Experiencia</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
