import { Network, Phone, Mail, MapPin } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import ConexosLogo from "@/components/conexos-logo";

const footerSections = [
  {
    title: "Servicios",
    links: [
      "Marketing Digital",
      "Automatización IA",
      "Generación de Leads",
      "Analytics Avanzados",
      "CRM Inteligente"
    ]
  },
  {
    title: "Empresa",
    links: [
      "Servicios",
      "Soluciones IA",
      "Equipo"
    ]
  },
  {
    title: "Legal",
    links: [
      "Política de Privacidad",
      "Términos de Servicio",
      "Cookies",
      "RGPD"
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[58.08px] py-10 md:py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Logo y descripción */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
              <ConexosLogo size={36} variant="gradient" />
              <span className="text-xl md:text-2xl font-extrabold n8n-text-gradient tracking-tight">
                Conexos
              </span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              Sistemas de captación automatizada para organizaciones con propósito.
              Desarrollo técnico + automatización + estrategia.
            </p>

            {/* Información de contacto */}
            <div className="space-y-2 md:space-y-3">
              <a
                href="tel:+34634443713"
                className="flex items-center gap-2 md:gap-3 text-foreground hover:text-primary transition-colors group touch-manipulation min-h-[44px]"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0" style={{background: 'linear-gradient(to bottom right, #fcba03, #fc3d03)'}}>
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>
                <span className="font-medium text-sm md:text-base">+34 634 443 713</span>
              </a>

              <a
                href="mailto:info@conexos.es"
                className="flex items-center gap-2 md:gap-3 text-foreground hover:text-primary transition-colors group touch-manipulation min-h-[44px]"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0" style={{background: 'linear-gradient(to bottom right, #fc3d03, #fcba03)'}}>
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>
                <span className="font-medium text-sm md:text-base">info@conexos.es</span>
              </a>

              <div className="flex items-center gap-2 md:gap-3 text-muted-foreground min-h-[44px]">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>
                <span className="font-medium text-sm md:text-base">Galicia, España</span>
              </div>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">{section.title}</h3>
              <ul className="space-y-2 md:space-y-3 text-muted-foreground">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="inline-block py-2 text-sm md:text-base hover:text-foreground transition-colors touch-manipulation min-h-[44px] flex items-center">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



        <div className="border-t border-border mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 text-center text-muted-foreground">
          <p className="text-xs md:text-sm">&copy; 2025 Conexos. Todos los derechos reservados. Hecho con ❤️ en Galicia.</p>
        </div>
      </div>
    </footer>
  );
}
