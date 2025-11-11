import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import ConexosLogo from "@/components/conexos-logo";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-lg border-b border-border/50 shadow-lg py-3"
          : "bg-background/80 backdrop-blur-sm py-6"
      }`}
      style={{
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[58.08px] flex items-center justify-between">
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
              className="md:hidden p-3 -mr-3 touch-manipulation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="text-white w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="text-white w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Menú principal móvil"
              className="md:hidden bg-background/95 backdrop-blur-md border-t border-border mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 space-y-2">
                <button
                  onClick={() => handleNavigation("servicios")}
                  className="block w-full text-left py-4 px-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                >
                  Servicios
                </button>
                <button
                  onClick={() => handleNavigation("soluciones")}
                  className="block w-full text-left py-4 px-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                >
                  Soluciones IA
                </button>
                <button
                  onClick={() => handleNavigation("industrias")}
                  className="block w-full text-left py-4 px-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                >
                  Industrias
                </button>
                <button
                  onClick={() => handleNavigation("equipo")}
                  className="block w-full text-left py-4 px-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                >
                  Equipo
                </button>
                <a href="https://zcal.co/conexos/15min" target="_blank" rel="noopener noreferrer" className="block w-full pt-2">
                  <Button className="hero-button w-full py-4 touch-manipulation">
                    Contactar
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
    </nav>
  );
}
