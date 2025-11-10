import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import ConexosLogo from "@/components/conexos-logo";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Solo mostrar el menú cuando esté en el top de la página
      if (currentScrollY <= 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setIsScrolled(currentScrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (sectionId: string) => {
    // Si estamos en la página principal, hacer scroll
    if (location === "/") {
      scrollToSection(sectionId);
    } else {
      // Si estamos en otra página, navegar a la principal con el hash
      window.location.href = `/#${sectionId}`;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className={`fixed top-0 left-0 right-0 z-50 py-6 transition-all duration-300 ${
            isScrolled
              ? "bg-background/98 backdrop-blur-lg border-b border-border/50 shadow-lg"
              : "bg-background/80 backdrop-blur-sm"
          }`}
          style={{ 
            borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="container mx-auto px-12 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <ConexosLogo size={44} variant="gradient" />
              </div>
              <span className="text-2xl font-extrabold n8n-text-gradient tracking-tight">
                Conexos
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavigation("servicios")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Servicios
              </button>
              <button
                onClick={() => handleNavigation("soluciones")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Soluciones IA
              </button>
              <button
                onClick={() => handleNavigation("industrias")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Industrias
              </button>
              {/* <button
                onClick={() => handleNavigation("casos")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Casos de Éxito
              </button> */}

              <a href="#contacto">
                <Button className="hero-button px-6 py-2">
                  Contactar
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="text-white text-xl" />
              ) : (
                <Menu className="text-white text-xl" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-background/95 backdrop-blur-md border-t border-border mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="container mx-auto px-12 py-4 space-y-4">
                <button
                  onClick={() => handleNavigation("servicios")}
                  className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  Servicios
                </button>
                <button
                  onClick={() => handleNavigation("soluciones")}
                  className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  Soluciones IA
                </button>
                {/* <button
                  onClick={() => handleNavigation("casos")}
                  className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  Casos de Éxito
                </button> */}
                <button
                  onClick={() => handleNavigation("equipo")}
                  className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  Equipo
                </button>
                {/*<Link href="/blog" className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>*/}
                <a href="https://zcal.co/conexos/15min" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="hero-button w-full">
                    Contactar
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
