import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
}

export default function HeroParticlesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });

  // Paleta dorada cálida - con #ffb759
  const colors = [
    "rgb(255, 183, 89)",   // #ffb759 - Naranja dorado (color principal)
    "rgb(255, 140, 66)",   // Naranja más vibrante
    "rgb(236, 72, 153)",   // Rosa/Magenta
    "rgb(251, 191, 36)",   // Amarillo dorado
    "rgb(244, 63, 94)",    // Rosa rojizo
  ];

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.parentElement?.getBoundingClientRect();
        if (rect) {
          setDimensions({ width: rect.width, height: rect.height });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Crear nodos
    const nodeCount = 40;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 4 + 3, // Nodos más grandes (3-7px)
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    nodesRef.current = nodes;

    // Función para calcular distancia
    const distance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    // Función de animación
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Limpiar canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Actualizar y dibujar nodos
      const maxConnectionDistance = 180;
      const mouseInfluenceRadius = 150;

      nodesRef.current.forEach((node, i) => {
        // Mover nodo
        node.x += node.vx;
        node.y += node.vy;

        // Rebotar en los bordes
        if (node.x <= 0 || node.x >= dimensions.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= dimensions.height) node.vy *= -1;

        // Mantener dentro de límites
        node.x = Math.max(0, Math.min(dimensions.width, node.x));
        node.y = Math.max(0, Math.min(dimensions.height, node.y));

        // Influencia del mouse
        if (mouseRef.current.isHovering) {
          const distToMouse = distance(node.x, node.y, mouseRef.current.x, mouseRef.current.y);
          if (distToMouse < mouseInfluenceRadius) {
            const angle = Math.atan2(mouseRef.current.y - node.y, mouseRef.current.x - node.x);
            const force = (1 - distToMouse / mouseInfluenceRadius) * 0.3;
            node.vx += Math.cos(angle) * force;
            node.vy += Math.sin(angle) * force;
          }
        }

        // Limitar velocidad
        const maxSpeed = 1;
        const speed = Math.sqrt(node.vx ** 2 + node.vy ** 2);
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        // Dibujar conexiones
        nodesRef.current.forEach((otherNode, j) => {
          if (i >= j) return;

          const dist = distance(node.x, node.y, otherNode.x, otherNode.y);

          if (dist < maxConnectionDistance) {
            const opacity = 1 - (dist / maxConnectionDistance);

            // Gradiente para la línea - MÁS OPACO
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
            gradient.addColorStop(0, node.color.replace('rgb', 'rgba').replace(')', `, ${opacity * 0.6})`));
            gradient.addColorStop(1, otherNode.color.replace('rgb', 'rgba').replace(')', `, ${opacity * 0.6})`));

            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 2.5; // Líneas más gruesas
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();

            // Pulso de datos viajando por la conexión (ocasional)
            if (Math.random() < 0.005) {
              const progress = Math.random();
              const pulseX = node.x + (otherNode.x - node.x) * progress;
              const pulseY = node.y + (otherNode.y - node.y) * progress;

              ctx.fillStyle = node.color.replace('rgb', 'rgba').replace(')', ', 0.8)');
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
              ctx.fill();

              // Glow del pulso
              ctx.shadowBlur = 10;
              ctx.shadowColor = node.color;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        });

        // Dibujar nodo con glow fuerte
        ctx.shadowBlur = 25;
        ctx.shadowColor = node.color;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Centro brillante blanco
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Ring exterior más visible
        ctx.strokeStyle = node.color.replace('rgb', 'rgba').replace(')', ', 0.6)');
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [dimensions]);

  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovering: true
      };
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Canvas para la red de conexiones */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ opacity: 0.85 }}
      />

      {/* Gradiente de fondo sutil - TONOS DORADOS CÁLIDOS */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-pink-400/3 to-yellow-400/5 pointer-events-none" />

      {/* Highlights decorativos - TONOS DORADOS CÁLIDOS */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-pink-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
