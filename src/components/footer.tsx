import { Network } from "lucide-react";
import { SiLinkedin,} from "react-icons/si";

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
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-12 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Network className="text-white text-lg" />
              </div>
              <span className="text-2xl font-bold gradient-text font-['Conexos']">Conexos</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Transformamos negocios españoles con IA y marketing digital 
              para generar leads de alta calidad y maximizar conversiones.
            </p>
            <div className="flex space-x-4">
             
                
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
