import { motion } from "framer-motion";
import { Heart, ShoppingBag, GraduationCap, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useShouldReduceAnimations } from "@/hooks/use-mobile";

const industries = [
  {
    icon: Heart,
    title: "ONGs & Fundaciones",
    painPoint: "Pérdida de donantes por sistemas desconectados",
    solution: "Google Ad Grants ($120K/año gratis) + automatizaciones de captación",
    metric: "45% aumento en donantes recurrentes",
    gradient: "from-[#fcba03] to-[#fc3d03]",
    iconBg: "bg-gradient-to-br from-[#fcba03] to-[#fc3d03]",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce / Retail",
    painPoint: "70% de carritos abandonados sin recuperar",
    solution: "Automatización de recuperación + email marketing inteligente",
    metric: "30% de carritos recuperados",
    gradient: "from-orange-500 to-amber-500",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
  },
  {
    icon: GraduationCap,
    title: "Educación / Academias",
    painPoint: "Leads fríos y proceso de inscripción manual",
    solution: "Flujos de nurturing educativos + CRM especializado",
    metric: "40% más inscripciones",
    gradient: "from-yellow-500 to-orange-500",
    iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
  },
  {
    icon: Stethoscope,
    title: "Salud / Wellness",
    painPoint: "Agendamiento manual y alta tasa de no-shows",
    solution: "Sistema de citas automatizado + recordatorios inteligentes",
    metric: "50% reducción en no-shows",
    gradient: "from-[#fc3d03] to-[#fcba03]",
    iconBg: "bg-gradient-to-br from-[#fc3d03] to-[#fcba03]",
  },
];

export default function IndustriesSection() {
  const { ref, isVisible } = useScrollReveal();
  const shouldReduceAnimations = useShouldReduceAnimations();

  return (
    <section id="industrias" className="py-12 md:py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Decorative gradient orbs - TONOS CÁLIDOS ACTUALIZADOS */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{backgroundColor: 'rgba(252, 186, 3, 0.1)'}} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{backgroundColor: 'rgba(252, 61, 3, 0.1)'}} />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[58.08px] relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-12 lg:mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="n8n-text-gradient">Transformamos</span> Industrias
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Soluciones especializadas de captación automatizada para organizaciones con propósito.
            <br className="hidden sm:block" />
            Cada industria tiene desafíos únicos que resolvemos con tecnología y estrategia.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: shouldReduceAnimations ? 0.3 : 0.6,
                delay: shouldReduceAnimations ? index * 0.05 : index * 0.1
              }}
            >
              <Card className="n8n-card h-full group">
                <CardContent className="p-5 sm:p-6 md:p-8">
                  {/* Icon with gradient */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${industry.iconBg} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <industry.icon className="text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 md:mb-3 text-foreground">
                    {industry.title}
                  </h3>

                  {/* Pain Point */}
                  <div className="mb-3 md:mb-4">
                    <p className="text-xs sm:text-sm font-semibold text-destructive mb-1">
                      ❌ Desafío:
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {industry.painPoint}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-3 md:mb-4">
                    <p className="text-xs sm:text-sm font-semibold text-accent mb-1">
                      ✅ Nuestra Solución:
                    </p>
                    <p className="text-sm sm:text-base text-foreground font-medium">
                      {industry.solution}
                    </p>
                  </div>

                  {/* Metric */}
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
                    <p className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${industry.gradient} bg-clip-text text-transparent`}>
                      {industry.metric}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Resultado promedio de nuestros clientes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 md:mt-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-base sm:text-lg text-muted-foreground mb-4 md:mb-6">
            ¿Tu industria no está aquí? Hablemos sobre cómo podemos ayudarte.
          </p>
          <a href="https://zcal.co/conexos/15min" target="_blank" rel="noopener noreferrer">
            <button className="hero-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold inline-flex items-center gap-2">
              Agenda una Consulta Gratuita
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
