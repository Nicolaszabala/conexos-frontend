import { motion } from "framer-motion";
import { Tag, Bot, Mail, Cloud, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const caseStudies = [
  {
    title: "E-commerce Fashion - 340% Aumento en Leads",
    description: "Implementamos un sistema de IA para personalización de productos y automatización de email marketing, resultando en un incremento masivo de leads cualificados.",
    metrics: [
      { value: "340%", label: "Aumento Leads" },
      { value: "85%", label: "Tasa Conversión" }
    ],
    tags: [
      { icon: Tag, label: "E-commerce" },
      { icon: Bot, label: "IA Personalización" },
      { icon: Mail, label: "Email Marketing" }
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
  },
  {
    title: "SaaS B2B - 250% ROI en 6 Meses",
    description: "Desarrollamos un sistema de lead scoring con IA y automatización de nurturing que transformó su proceso de ventas completo.",
    metrics: [
      { value: "250%", label: "ROI Obtenido" },
      { value: "60%", label: "Reducción Costes" }
    ],
    tags: [
      { icon: Cloud, label: "SaaS" },
      { icon: Users, label: "B2B" },
      { icon: TrendingUp, label: "Lead Scoring" }
    ],
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
  }
];

export default function CaseStudiesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="casos" className="py-20 bg-secondary">
      <div className="container mx-auto px-12">
        <motion.div
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Casos de <span className="n8n-text-gradient">Éxito</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre cómo hemos ayudado a empresas españolas a multiplicar 
            sus leads y optimizar sus procesos con IA.
          </p>
        </motion.div>

        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <div key={study.title} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                className={index % 2 === 1 ? 'lg:order-2' : ''}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <img
                  src={study.image}
                  alt={study.title}
                  className="rounded-2xl shadow-lg w-full"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                className={index % 2 === 1 ? 'lg:order-1' : ''}
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
              >
                <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{study.title}</h3>
                    <p className="text-muted-foreground mb-6">{study.description}</p>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      {study.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center">
                          <div className="text-3xl font-bold gradient-text">{metric.value}</div>
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      {study.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="flex items-center">
                          <tag.icon className="mr-1 h-4 w-4" />
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
