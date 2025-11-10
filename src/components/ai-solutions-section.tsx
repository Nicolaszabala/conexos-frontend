import { motion } from "framer-motion";
import { Brain, MessageCircle, Eye, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useRef, useEffect } from "react";

const solutions = [
  {
    icon: Brain,
    title: "Machine Learning Predictivo",
    description: "Algoritmos que predicen el comportamiento del cliente y optimizan automáticamente tus campañas para maximizar conversiones."
  },
  {
    icon: MessageCircle,
    title: "Procesamiento de Lenguaje Natural",
    description: "Chatbots avanzados que entienden el contexto y proporcionan respuestas personalizadas 24/7 a tus clientes potenciales."
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Análisis automático de contenido visual para optimizar creatividades y mejorar el engagement en redes sociales."
  }
];

// Componente para el efecto de luces de colores
function ColorLightEffect({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
        
        // Actualizar CSS custom properties para el efecto
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovering(true));
      container.addEventListener('mouseleave', () => setIsHovering(false));

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovering(true));
        container.removeEventListener('mouseleave', () => setIsHovering(false));
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="color-light-effect rounded-2xl n8n-card p-8 relative overflow-hidden"
    >
      {/* Efecto de luces de colores con CSS custom properties */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `
            radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 50%),
            radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.12), transparent 40%),
            radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.08), transparent 30%)
          `
        }}
      />

      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function AISolutionsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="soluciones" className="py-20">
      <div className="container mx-auto px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Soluciones de <span className="n8n-text-gradient">IA Avanzada</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Aprovecha el poder de la IA para transformar tu estrategia de marketing 
              y ventas. Nuestras soluciones personalizadas se adaptan a las 
              necesidades específicas de tu negocio.
            </p>

            <div className="space-y-6 mb-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 n8n-gradient-bg rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <solution.icon className="text-white text-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="https://zcal.co/conexos/15min" target="_blank" rel="noopener noreferrer">
              <Button className="hero-button px-8 py-4 text-lg font-semibold">
                <Lightbulb className="mr-2 h-5 w-5" />
                Explorar Soluciones IA
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ColorLightEffect>
              <div className="text-center">
                <div className="w-20 h-20 n8n-gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Brain className="text-white w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">
                  Inteligencia Artificial
                </h3>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  Sistemas inteligentes que aprenden y se adaptan automáticamente
                  para optimizar tus resultados de marketing.
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm font-semibold text-foreground">ML</p>
                    <p className="text-xs text-muted-foreground mt-1">Machine Learning</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm font-semibold text-foreground">NLP</p>
                    <p className="text-xs text-muted-foreground mt-1">Natural Language</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm font-semibold text-foreground">CV</p>
                    <p className="text-xs text-muted-foreground mt-1">Computer Vision</p>
                  </div>
                </div>
              </div>
            </ColorLightEffect>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
