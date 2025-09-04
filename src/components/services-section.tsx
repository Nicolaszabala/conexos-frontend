import { motion } from "framer-motion";
import { Megaphone, Bot, Target, TrendingUp, PenTool, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const services = [
  {
    icon: Megaphone,
    title: "Marketing Digital Integral",
    description: "Estrategias 360° que incluyen SEO, SEM, redes sociales y content marketing optimizadas con IA para maximizar conversiones.",
    features: ["Auditoría digital completa", "Estrategia personalizada", "Reporting en tiempo real"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },
  {
    icon: Bot,
    title: "Automatización con IA",
    description: "Implementamos chatbots inteligentes, automatización de procesos y sistemas de IA para optimizar la generación y cualificación de leads.",
    features: ["Chatbots conversacionales", "Lead scoring automático", "Personalización dinámica"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },
  {
    icon: Target,
    title: "Generación de Leads",
    description: "Sistemas avanzados de captura y nurturing que convierten visitantes en clientes potenciales de alta calidad mediante IA predictiva.",
    features: ["Landing pages optimizadas", "Email marketing inteligente", "Segmentación avanzada"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },
  {
    icon: TrendingUp,
    title: "Analytics Avanzados",
    description: "Dashboards personalizados con IA que proporcionan insights profundos sobre el comportamiento del cliente y optimización de campañas.",
    features: ["KPIs en tiempo real", "Predicción de tendencias", "Reportes automatizados"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },
  {
    icon: PenTool,
    title: "Contenido Inteligente",
    description: "Creación de contenido optimizado con IA que resuena con tu audiencia y mejora el posicionamiento orgánico de tu marca.",
    features: ["Copywriting con IA", "Optimización SEO", "Distribución multicanal"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },
  {
    icon: Settings,
    title: "CRM Inteligente",
    description: "Implementación y optimización de CRM con IA para automatizar el seguimiento de leads y maximizar las conversiones de ventas.",
    features: ["Integración completa", "Workflows automáticos", "Scoring predictivo"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  }
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="servicios" className="py-20 bg-secondary">
      <div className="container mx-auto px-12">
        <motion.div
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros <span className="n8n-text-gradient">Servicios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hacemos que tu negocio crezca, mientras te centras en lo que sabes hacer. <br></br> Nosotros, nos encargamos del marketing y la tecnología
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="n8n-card h-full">
                <CardContent className="p-8">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                    loading="lazy"
                  />
                  <div className="w-12 h-12 n8n-gradient-bg rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
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
