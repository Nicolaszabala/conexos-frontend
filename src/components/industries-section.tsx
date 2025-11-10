import { motion } from "framer-motion";
import { Heart, ShoppingBag, GraduationCap, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const industries = [
  {
    icon: Heart,
    title: "ONGs & Fundaciones",
    painPoint: "Pérdida de donantes por sistemas desconectados",
    solution: "Google Ad Grants ($120K/año gratis) + automatizaciones de captación",
    metric: "45% aumento en donantes recurrentes",
    gradient: "from-pink-500 to-rose-500",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
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
    gradient: "from-rose-500 to-pink-500",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
  },
];

export default function IndustriesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="industrias" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative gradient orbs - TONOS CÁLIDOS */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-12 relative z-10">
        <motion.div
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="n8n-text-gradient">Industrias</span> que Transformamos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluciones especializadas de captación automatizada para organizaciones con propósito.
            Cada industria tiene desafíos únicos que resolvemos con tecnología y estrategia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="n8n-card h-full group">
                <CardContent className="p-8">
                  {/* Icon with gradient */}
                  <div className={`w-16 h-16 ${industry.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <industry.icon className="text-white w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {industry.title}
                  </h3>

                  {/* Pain Point */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-destructive mb-1">
                      ❌ Desafío:
                    </p>
                    <p className="text-muted-foreground">
                      {industry.painPoint}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-accent mb-1">
                      ✅ Nuestra Solución:
                    </p>
                    <p className="text-foreground font-medium">
                      {industry.solution}
                    </p>
                  </div>

                  {/* Metric */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className={`text-2xl font-bold bg-gradient-to-r ${industry.gradient} bg-clip-text text-transparent`}>
                      {industry.metric}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
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
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            ¿Tu industria no está aquí? Hablemos sobre cómo podemos ayudarte.
          </p>
          <a href="https://zcal.co/conexos/15min" target="_blank" rel="noopener noreferrer">
            <button className="hero-button px-8 py-4 text-lg font-semibold inline-flex items-center gap-2">
              Agenda una Consulta Gratuita
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
