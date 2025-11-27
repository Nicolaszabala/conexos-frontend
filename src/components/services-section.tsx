import { motion } from "framer-motion";
import { Megaphone, Bot, Target, TrendingUp, PenTool, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useShouldReduceAnimations } from "@/hooks/use-mobile";

const services = [
  {
    icon: Megaphone,
    title: "Marketing Digital Integral",
    description: "Estrategias 360° que incluyen SEO, SEM, redes sociales y content marketing optimizadas con IA para maximizar conversiones.",
    features: ["Auditoría digital completa", "Estrategia personalizada", "Reporting en tiempo real"],
    image: "/fonts/mkt.jpg"
  },
  {
    icon: Bot,
    title: "Automatización con IA",
    description: "Implementamos chatbots inteligentes, automatización de procesos y sistemas de IA para optimizar la generación y cualificación de leads.",
    features: ["Chatbots conversacionales", "Lead scoring automático", "Personalización dinámica"],
    image: "/fonts/automation.jpg"
  },
  {
    icon: Target,
    title: "Generación de Leads",
    description: "Sistemas avanzados de captura y nurturing que convierten visitantes en clientes potenciales de alta calidad mediante IA predictiva.",
    features: ["Landing pages optimizadas", "Email marketing inteligente", "Segmentación avanzada"],
    image: "/fonts/funnel.jpg"
  },
  {
    icon: TrendingUp,
    title: "Analytics Avanzados",
    description: "Dashboards personalizados con IA que proporcionan insights profundos sobre el comportamiento del cliente y optimización de campañas.",
    features: ["KPIs en tiempo real", "Predicción de tendencias", "Reportes automatizados"],
    image: "/fonts/analytics.jpg"
  },
  {
    icon: PenTool,
    title: "Contenido Inteligente",
    description: "Creación de contenido optimizado con IA que resuena con tu audiencia y mejora el posicionamiento orgánico de tu marca.",
    features: ["Copywriting con IA", "Optimización SEO", "Distribución multicanal"],
    image: "/fonts/smart.jpg"
  },
  {
    icon: Settings,
    title: "CRM Inteligente",
    description: "Implementación y optimización de CRM con IA para automatizar el seguimiento de leads y maximizar las conversiones de ventas.",
    features: ["Integración completa", "Workflows automáticos", "Scoring predictivo"],
    image: "/fonts/crm.jpg"
  }
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollReveal();
  const shouldReduceAnimations = useShouldReduceAnimations();

  return (
    <section id="servicios" className="py-12 md:py-16 lg:py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[58.08px]">
        <motion.div
          className="text-center mb-10 md:mb-12 lg:mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Nuestros <span className="n8n-text-gradient">Servicios</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Soluciones completas de marketing digital con IA, automatización y desarrollo técnico.
            <br className="hidden sm:block" />
            <span className="text-foreground font-semibold mt-2 inline-block text-sm sm:text-base md:text-lg">Desde 1.500€/mes en retainers mensuales</span>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: shouldReduceAnimations ? 0.3 : 0.6,
                delay: shouldReduceAnimations ? index * 0.05 : index * 0.1
              }}
            >
              <Card className="n8n-card h-full">
                <CardContent className="p-5 sm:p-6 md:p-8">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-lg mb-4 md:mb-6"
                    loading="lazy"
                  />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 n8n-gradient-bg rounded-lg flex items-center justify-center mb-3 md:mb-4">
                    <service.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">{service.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6">{service.description}</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
