import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { SiLinkedin, SiX, SiInstagram } from "react-icons/si";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    value: "+34 634 443 713",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@conexos.es",
  },
  {
    icon: MapPin,
    title: "Oficina",
    value: "Galicia, España",
  },
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
    <section id="contacto" className="py-12 md:py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Decorative gradients - TONOS CÁLIDOS ACTUALIZADOS */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl" style={{backgroundColor: 'rgba(252, 61, 3, 0.1)'}} />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl" style={{backgroundColor: 'rgba(252, 186, 3, 0.1)'}} />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
          <div ref={ref}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              ¿Listo para <span className="gradient-text">Transformar</span> tu
              Negocio?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
              Agenda una llamada gratuita y descubre cómo podemos multiplicar
              tus leads con marketing digital.
            </p>

            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="flex items-center space-x-3 md:space-x-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                    background: index === 0 ? 'linear-gradient(to bottom right, #fcba03, #fc3d03)' : // Teléfono
                                index === 1 ? 'linear-gradient(to bottom right, #fc3d03, #fcba03)' : // Email
                                'linear-gradient(to bottom right, #fcba03, #fc3d03)' // Oficina
                  }}>
                    <info.icon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{info.title}</p>
                    <p className="text-muted-foreground text-sm sm:text-base">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4"></div>
          </div>

          <div>
            <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
              <CardContent className="p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">Contactar</h3>

                <form
                  action="https://formspree.io/f/mjkeprny"
                  method="POST"
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Nombre Completo
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      required
                      className="mt-2 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@empresa.com"
                      required
                      className="mt-2 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="company"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Nombre de tu empresa"
                      required
                      className="mt-2 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      ¿Cómo podemos ayudarte?
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Cuéntanos sobre tus objetivos de marketing y IA..."
                      required
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="hero-button w-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold touch-manipulation min-h-[48px]"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    {isSubmitting ? "Enviando..." : "Contactar"}
                  </Button>

                  <p className="text-xs sm:text-sm text-muted-foreground text-center">
                    Al enviar este formulario, aceptas nuestra política de
                    privacidad. Responderemos a la brevedad.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
