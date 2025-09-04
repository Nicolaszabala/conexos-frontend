import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SiLinkedin, SiX, SiInstagram } from "react-icons/si";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    value: "+34 634 443 713"
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@conexos.es"
  },
  {
    icon: MapPin,
    title: "Oficina",
    value: "Galicia, España"
  }
];

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "¡Formulario enviado!",
        description: "Nos pondremos en contacto contigo en 24 horas.",
      });
    }, 2000);
  };

  return (
    <section id="contacto" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para <span className="gradient-text">Transformar</span> tu Negocio?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Agenda una llamada gratuita y descubre cómo podemos 
              multiplicar tus leads con marketing digital.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                    <info.icon className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{info.title}</p>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex space-x-4">
              
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Solicita tu Consultoría Gratuita</h3>

                <form action="mailto:info@conexos.es"
  method="POST"
  encType="text/plain"
  className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                      Nombre Completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                      Email 
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@empresa.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-sm font-medium text-muted-foreground">
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Nombre de tu empresa"
                      required
                      className="mt-2"
                    />
                  </div>

                

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                      ¿Cómo podemos ayudarte?
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Cuéntanos sobre tus objetivos de marketing y IA..."
                      required
                      className="mt-2"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="hero-button w-full px-8 py-4 text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Enviando..." : "Contactar"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Al enviar este formulario, aceptas nuestra política de privacidad. 
                    Responderemos a la brevedad.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
