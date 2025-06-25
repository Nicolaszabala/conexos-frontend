import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SiLinkedin, SiX, SiGithub, SiInstagram } from "react-icons/si";

const teamMembers = [
  {
    name: "Carlos Martínez",
    role: "Director de Marketing",
    description: "15+ años en marketing digital y especialista en estrategias de growth hacking.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    social: [
      { icon: SiLinkedin, href: "#" },
      { icon: SiX, href: "#" }
    ]
  },
  {
    name: "Ana García",
    role: "Especialista en IA",
    description: "PhD en Machine Learning con experiencia en automatización de procesos.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    social: [
      { icon: SiLinkedin, href: "#" },
      { icon: SiGithub, href: "#" }
    ]
  },
  {
    name: "Miguel Torres",
    role: "Estratega Creativo",
    description: "Experto en contenido viral y campañas de alto impacto para redes sociales.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    social: [
      { icon: SiLinkedin, href: "#" },
      { icon: SiInstagram, href: "#" }
    ]
  },
  {
    name: "Laura Fernández",
    role: "Analista de Datos",
    description: "Especialista en business intelligence y optimización de conversiones.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    social: [
      { icon: SiLinkedin, href: "#" },
      { icon: SiX, href: "#" }
    ]
  }
];

export default function TeamSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="equipo" className="py-20">
      <div className="container mx-auto px-12">
        <motion.div
          className="text-center mb-16"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestro <span className="n8n-text-gradient">Equipo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Especialistas en marketing digital e IA que combinan creatividad 
            estratégica con expertise técnico para impulsar tu crecimiento.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="service-card text-center h-full">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.description}</p>
                  <div className="flex justify-center space-x-3">
                    {member.social.map((social, socialIndex) => (
                      <a
                        key={socialIndex}
                        href={social.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-lg"
                      >
                        <social.icon />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
