import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SiLinkedin } from "react-icons/si";
import { useState } from "react";

const teamMembers = [
  {
    name: "Dana Fernández Rocha",
    role: "Co-Founder",
    title: "Lic. en Administración",
    description: "MBA - Master en Marketing Digital",
    image: "/fonts/daniconexos.jpg",
    
  },
  {
    name: "Nicolás Zabala",
    role: "Co-Founder",
    title: "Grado en Ingeniería de Software",
    description: "Full Stack Web Developer",
    image: "/fonts/nicoconexos.png",
    
  }
];

export default function TeamSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="equipo" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-12 relative z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="n8n-card text-center h-full">
                <CardContent className="p-6">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error(`Error loading image: ${member.image}`);
                        target.onerror = null;
                        target.src = '/placeholder-avatar.png';
                        target.alt = 'Imagen no disponible';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-lg font-medium text-gray-700 mb-2">{member.title}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.description}</p>
                 
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}