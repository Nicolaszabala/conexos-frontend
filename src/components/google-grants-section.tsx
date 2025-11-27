import { motion } from "framer-motion";
import { Check, ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function GoogleGrantsSection() {
  const { ref, isVisible } = useScrollReveal();

  const benefits = [
    {
      icon: DollarSign,
      title: "$10,000 USD/mes en publicidad gratis",
      description: "Hasta $120,000/año en anuncios de Google pagados por Google"
    },
    {
      icon: TrendingUp,
      title: "Posicionamiento Premium",
      description: "Aparece en los primeros resultados de búsqueda sin coste"
    },
    {
      icon: Users,
      title: "Captación Automatizada",
      description: "Convertimos clics en donantes recurrentes mediante automatización"
    }
  ];

  const steps = [
    "Validamos elegibilidad de tu ONG",
    "Aplicamos y gestionamos tu cuenta de Google Grants",
    "Creamos campañas optimizadas para conversión",
    "Automatizamos el seguimiento de leads",
    "Reportes mensuales de rendimiento"
  ];

  return (
    <section id="google-grants" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements - TONOS CÁLIDOS ACTUALIZADOS */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{background: 'linear-gradient(to bottom right, rgba(252, 186, 3, 0.1), rgba(252, 61, 3, 0.1))'}} />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl" style={{background: 'linear-gradient(to bottom right, rgba(252, 186, 3, 0.1), rgba(252, 61, 3, 0.1))'}} />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[58.08px] relative z-10" ref={ref}>
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full border" style={{background: 'linear-gradient(to right, rgba(252, 186, 3, 0.1), rgba(252, 61, 3, 0.1))', borderColor: 'rgba(252, 186, 3, 0.2)'}}>
            <span className="text-sm font-semibold" style={{color: '#fc3d03'}}>Programa Exclusivo para ONGs</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Google Ad Grants
            <span className="n8n-text-gradient block mt-2">$120,000/año en Publicidad Gratuita</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos <strong className="text-foreground">especialistas certificados</strong> en gestionar Google Ad Grants.
            Maximizamos tu presupuesto de $10K mensuales para captar donantes de alto valor.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-5xl mx-auto">
          <div className="n8n-card p-10 md:p-12">
            {/* Google Grants Logo Placeholder */}
            <div className="flex justify-center mb-10">
              <div className="relative">
                <div className="text-center">
                  {/* Logo placeholder - will be replaced with actual Google Grants logo */}
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-lg border-2 border-orange-500/20">
                    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Google "G" logo simplified */}
                      <path d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" fill="#EA4335"/>
                      <path d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" fill="#4285F4"/>
                      <path d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" fill="#FBBC05"/>
                      <path d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48z" fill="#34A853"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-2xl font-bold" style={{color: '#525050'}}>Google</div>
                      <div className="text-sm text-gray-600 font-semibold">Ad Grants</div>
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 blur-2xl scale-110" style={{background: 'linear-gradient(to right, rgba(252, 186, 3, 0.2), rgba(252, 61, 3, 0.2))'}} />
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #fcba03, #fc3d03)'}}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="rounded-2xl p-8 border" style={{background: 'linear-gradient(to bottom right, rgba(252, 186, 3, 0.05), rgba(252, 61, 3, 0.05))', borderColor: 'rgba(252, 186, 3, 0.1)'}}>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Cómo Gestionamos tu Google Ad Grants
              </h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{background: 'linear-gradient(to bottom right, #fcba03, #fc3d03)'}}>
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-foreground font-medium">{step}</p>
                    </div>
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <a href="https://zcal.co/conexos/15min" target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                <Button className="hero-button px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto whitespace-normal sm:whitespace-nowrap">
                  <span className="inline sm:inline">Consulta Gratuita sobre Google Grants</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                </Button>
              </a>
              <p className="text-sm text-muted-foreground mt-4">
                Evaluamos tu elegibilidad sin compromiso
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <div className="n8n-card p-6">
            <p className="text-muted-foreground">
              <strong className="text-foreground">¿Tu ONG califica?</strong> Organizaciones benéficas registradas 501(c)(3) o equivalente local pueden acceder a este programa.
              Te ayudamos con todo el proceso de aplicación y gestión continua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
