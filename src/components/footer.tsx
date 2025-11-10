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
      <div className="container mx-auto px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <ConexosLogo size={40} variant="gradient" />
              <span className="text-2xl font-extrabold n8n-text-gradient tracking-tight">
                Conexos
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Sistemas de captación automatizada para organizaciones con propósito.
              Desarrollo técnico + automatización + estrategia.
            </p>

            {/* Información de contacto */}
            <div className="space-y-3">
              <a
                href="tel:+34634443713"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">+34 634 443 713</span>
              </a>

              <a
                href="mailto:info@conexos.es"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">info@conexos.es</span>
              </a>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-yellow-500 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Galicia, España</span>
              </div>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

       

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Conexos. Todos los derechos reservados. Hecho con ❤️ en Galicia.</p>
        </div>
      </div>
    </footer>
  );
}
