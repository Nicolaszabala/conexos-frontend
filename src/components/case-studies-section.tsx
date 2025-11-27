import { motion } from "framer-motion";
import { Tag, Bot, Mail, Cloud, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const caseStudies = [
  {
    title: "Asociación Petís - Comunidad de Apoyo a la Crianza en Pontevedra",
    description: "Desarrollamos una plataforma headless moderna (Drupal + Next.js) que permite a esta asociación de apoyo a la lactancia y crianza gestionar su comunidad y contenido autónomamente, creando un espacio seguro para familias.",
    metrics: [
      { value: "0", label: "Tickets Soporte/Mes" },
      { value: "100%", label: "Gestión Autónoma" }
    ],
    tags: [
      { icon: Tag, label: "Asociación" },
      { icon: Bot, label: "Headless CMS" },
      { icon: Cloud, label: "Next.js + Drupal" }
    ],
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    testimonial: "Un lugar seguro donde criar en rede. La plataforma nos permite gestionar toda nuestra comunidad sin depender de técnicos.",
    client: "Asociación Petís, Pontevedra"
  },
  {
    title: "E-commerce Vino - Recuperación Automatizada de Carritos",
    description: "Implementamos un sistema de automatización que recupera carritos abandonados mediante email marketing inteligente y segmentación dinámica.",
    metrics: [
      { value: "30%", label: "Carritos Recuperados" },
      { value: "45%", label: "Aumento Conversión" }
    ],
    tags: [
      { icon: Tag, label: "E-commerce" },
      { icon: Mail, label: "Email Marketing" },
      { icon: TrendingUp, label: "Automatización" }
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    testimonial: "Recuperamos ventas que antes perdíamos. El sistema funciona solo.",
    client: "E-commerce Vinos, España"
  }
];

export default function CaseStudiesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="casos" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-12 relative z-10">
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
            Proyectos reales con resultados medibles. Así ayudamos a organizaciones
            a escalar su captación mediante tecnología y automatización.
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
                <Card className="n8n-card">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{study.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{study.description}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-6 mb-6 p-6 bg-muted/50 rounded-xl">
                      {study.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center">
                          <div className="text-4xl font-bold n8n-text-gradient mb-1">{metric.value}</div>
                          <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    {'testimonial' in study && (
                      <div className="mb-6 p-4 border-l-4 border-accent bg-muted/30 rounded">
                        <p className="text-foreground italic mb-2">"{study.testimonial}"</p>
                        <p className="text-sm text-muted-foreground">— {study.client}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                      {study.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="flex items-center gap-1 px-3 py-1.5 bg-background/80 border border-border rounded-full text-sm text-foreground"
                        >
                          <tag.icon className="h-3.5 w-3.5" />
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
