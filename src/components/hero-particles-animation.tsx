import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  color: string;
  opacity: number;
}

export default function HeroParticlesAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Crear partículas iniciales
    const createParticles = () => {
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.2 + 0.1,
          angle: Math.random() * Math.PI * 2,
          color: [
            "hsl(210, 100%, 70%)",
            "hsl(240, 100%, 70%)",
            "hsl(270, 100%, 70%)",
            "hsl(180, 100%, 70%)",
            "hsl(300, 100%, 70%)"
          ][Math.floor(Math.random() * 5)],
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      
      setParticles(newParticles);
    };

    createParticles();

    // Animar partículas
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => {
          // Mover partícula
          const newX = particle.x + Math.cos(particle.angle) * particle.speed;
          const newY = particle.y + Math.sin(particle.angle) * particle.speed;
          
          // Rebotar en los bordes
          let newAngle = particle.angle;
          if (newX <= 0 || newX >= 100) {
            newAngle = Math.PI - particle.angle;
          }
          if (newY <= 0 || newY >= 100) {
            newAngle = -particle.angle;
          }
          
          return {
            ...particle,
            x: Math.max(0, Math.min(100, newX)),
            y: Math.max(0, Math.min(100, newY)),
            angle: newAngle
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/3 to-cyan-900/5" />
      
      {/* Partículas principales */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: particle.id * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Partículas flotantes adicionales */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`floating-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Efecto de ondas de energía */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute rounded-full border border-blue-400/20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            width: `${10 + i * 5}%`,
            height: `${10 + i * 5}%`,
          }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0.8, 0, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Efecto de partículas brillantes que aparecen y desaparecen */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Efecto de gradiente radial en el centro */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, hsl(210, 100%, 70%) 0%, transparent 70%)'
        }}
      />
    </div>
  );
} 