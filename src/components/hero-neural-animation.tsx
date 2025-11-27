import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useShouldReduceAnimations } from "@/hooks/use-mobile";

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
  delay: number;
  layer: number;
}

export default function HeroNeuralAnimation() {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [dataFlow, setDataFlow] = useState<{ from: number; to: number; progress: number }[]>([]);
  const shouldReduceAnimations = useShouldReduceAnimations();

  // Configuración de una red neuronal más compleja y visual
  const nodes: Node[] = [
    // Capa de entrada
    { id: 0, x: 15, y: 20, connections: [3, 4], delay: 0, layer: 0 },
    { id: 1, x: 35, y: 20, connections: [4, 5], delay: 0.2, layer: 0 },
    { id: 2, x: 25, y: 25, connections: [3, 5], delay: 0.4, layer: 0 },
    
    // Primera capa oculta
    { id: 3, x: 10, y: 45, connections: [6, 7], delay: 0.6, layer: 1 },
    { id: 4, x: 25, y: 45, connections: [7, 8], delay: 0.8, layer: 1 },
    { id: 5, x: 40, y: 45, connections: [8, 9], delay: 1.0, layer: 1 },
    
    // Segunda capa oculta
    { id: 6, x: 5, y: 70, connections: [10, 11], delay: 1.2, layer: 2 },
    { id: 7, x: 20, y: 70, connections: [11, 12], delay: 1.4, layer: 2 },
    { id: 8, x: 35, y: 70, connections: [12, 13], delay: 1.6, layer: 2 },
    { id: 9, x: 50, y: 70, connections: [13, 14], delay: 1.8, layer: 2 },
    
    // Tercera capa oculta
    { id: 10, x: 10, y: 95, connections: [15], delay: 2.0, layer: 3 },
    { id: 11, x: 25, y: 95, connections: [15, 16], delay: 2.2, layer: 3 },
    { id: 12, x: 40, y: 95, connections: [16, 17], delay: 2.4, layer: 3 },
    { id: 13, x: 55, y: 95, connections: [17], delay: 2.6, layer: 3 },
    { id: 14, x: 70, y: 95, connections: [17], delay: 2.8, layer: 3 },
    
    // Capa de salida
    { id: 15, x: 20, y: 120, connections: [], delay: 3.0, layer: 4 },
    { id: 16, x: 40, y: 120, connections: [], delay: 3.2, layer: 4 },
    { id: 17, x: 60, y: 120, connections: [], delay: 3.4, layer: 4 },
  ];

  useEffect(() => {
    const activateNodes = () => {
      setActiveNodes([]);
      setDataFlow([]);
      
      // Activar nodos por capas
      nodes.forEach((node) => {
        setTimeout(() => {
          setActiveNodes(prev => [...prev, node.id]);
          
          // Crear flujo de datos para las conexiones
          node.connections.forEach((targetId) => {
            setTimeout(() => {
              setDataFlow(prev => [...prev, { from: node.id, to: targetId, progress: 0 }]);
              
              // Animar el progreso del flujo de datos
              const flowId = `${node.id}-${targetId}`;
              const flowInterval = setInterval(() => {
                setDataFlow(prev => 
                  prev.map(flow => 
                    flow.from === node.id && flow.to === targetId 
                      ? { ...flow, progress: Math.min(flow.progress + 0.05, 1) }
                      : flow
                  )
                );
              }, 50);
              
              setTimeout(() => clearInterval(flowInterval), 2000);
            }, 200);
          });
        }, node.delay * 1000);
      });
    };

    activateNodes();

    // Reiniciar la animación cada 8 segundos
    const interval = setInterval(() => {
      activateNodes();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const isNodeActive = (nodeId: number) => activeNodes.includes(nodeId);
  const isConnectionActive = (fromId: number, toId: number) => 
    activeNodes.includes(fromId) && activeNodes.includes(toId);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-amber-900/5 to-orange-900/10" />
      
      {/* Efecto de partículas más dinámicas (reducido en mobile) */}
      <div className="absolute inset-0">
        {[...Array(shouldReduceAnimations ? 8 : 25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.8, 0],
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
      </div>

      {/* Red neuronal principal */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 80 140"
        className="absolute right-12 top-1/2 transform -translate-y-1/2 w-48 h-[28rem] opacity-80"
      >
        <defs>
          <linearGradient id="heroNodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsl(210, 100%, 70%)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(270, 100%, 70%)", stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="heroConnectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "hsl(210, 100%, 60%)", stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: "hsl(240, 100%, 70%)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(270, 100%, 60%)", stopOpacity: 0.8 }} />
          </linearGradient>
          
          <linearGradient id="dataFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "hsl(180, 100%, 70%)", stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: "hsl(180, 100%, 70%)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(180, 100%, 70%)", stopOpacity: 0 }} />
          </linearGradient>
          
          {/* Filtros optimizados para mobile (stdDeviation más bajo) */}
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation={shouldReduceAnimations ? "0.5" : "2"} result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation={shouldReduceAnimations ? "1" : "3"} result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Conexiones de fondo (siempre visibles pero sutiles) */}
        {nodes.map((node) =>
          node.connections.map((connectionId) => {
            const targetNode = nodes.find(n => n.id === connectionId);
            if (!targetNode) return null;

            return (
              <line
                key={`bg-${node.id}-${connectionId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke="hsl(210, 100%, 50%)"
                strokeWidth="0.5"
                opacity="0.1"
              />
            );
          })
        )}

        {/* Conexiones activas */}
        {nodes.map((node) =>
          node.connections.map((connectionId) => {
            const targetNode = nodes.find(n => n.id === connectionId);
            if (!targetNode) return null;

            return (
              <motion.line
                key={`active-${node.id}-${connectionId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke="url(#heroConnectionGradient)"
                strokeWidth="1.5"
                opacity={isConnectionActive(node.id, connectionId) ? 0.8 : 0}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isConnectionActive(node.id, connectionId) ? 1 : 0,
                  opacity: isConnectionActive(node.id, connectionId) ? 0.8 : 0
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: Math.max(node.delay, targetNode.delay),
                  ease: "easeInOut"
                }}
                filter="url(#heroGlow)"
              />
            );
          })
        )}

        {/* Flujo de datos animado */}
        {dataFlow.map((flow) => {
          const fromNode = nodes.find(n => n.id === flow.from);
          const toNode = nodes.find(n => n.id === flow.to);
          if (!fromNode || !toNode) return null;

          const x1 = fromNode.x;
          const y1 = fromNode.y;
          const x2 = toNode.x;
          const y2 = toNode.y;
          
          // Calcular posición del punto de datos
          const x = x1 + (x2 - x1) * flow.progress;
          const y = y1 + (y2 - y1) * flow.progress;

          return (
            <motion.circle
              key={`flow-${flow.from}-${flow.to}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r="1.5"
              fill="url(#dataFlowGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              filter="url(#strongGlow)"
            />
          );
        })}

        {/* Nodos */}
        {nodes.map((node) => (
          <motion.g key={node.id}>
            {/* Halo exterior del nodo */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="4"
              fill="url(#heroNodeGradient)"
              opacity={isNodeActive(node.id) ? 0.3 : 0}
              initial={{ scale: 0 }}
              animate={{ 
                scale: isNodeActive(node.id) ? 1 : 0,
                opacity: isNodeActive(node.id) ? 0.3 : 0
              }}
              transition={{ 
                duration: 1, 
                delay: node.delay,
                ease: "easeOut"
              }}
            />
            
            {/* Halo medio del nodo */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="2.5"
              fill="url(#heroNodeGradient)"
              opacity={isNodeActive(node.id) ? 0.5 : 0}
              initial={{ scale: 0 }}
              animate={{ 
                scale: isNodeActive(node.id) ? 1 : 0,
                opacity: isNodeActive(node.id) ? 0.5 : 0
              }}
              transition={{ 
                duration: 0.8, 
                delay: node.delay + 0.2,
                ease: "easeOut"
              }}
            />
            
            {/* Nodo principal */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="1.5"
              fill="url(#heroNodeGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isNodeActive(node.id) ? 1 : 0,
                opacity: isNodeActive(node.id) ? 1 : 0
              }}
              transition={{ 
                duration: 0.6, 
                delay: node.delay + 0.4,
                ease: "easeOut"
              }}
              filter="url(#strongGlow)"
            />

            {/* Pulso del nodo activo */}
            {isNodeActive(node.id) && (
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="3"
                fill="none"
                stroke="url(#heroNodeGradient)"
                strokeWidth="0.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2, 0],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: node.delay + 0.6
                }}
              />
            )}
          </motion.g>
        ))}
      </svg>

      {/* Red neuronal secundaria en el lado izquierdo */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 60 140"
        className="absolute left-12 top-1/2 transform -translate-y-1/2 w-36 h-[28rem] opacity-60"
      >
        {/* Nodos secundarios con animación diferente */}
        {[...Array(20)].map((_, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={`${15 + (i % 4) * 15}%`}
              cy={`${10 + Math.floor(i / 4) * 25}%`}
              r="1"
              fill="url(#heroNodeGradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              filter="url(#heroGlow)"
            />
            
            {/* Conexiones entre nodos secundarios */}
            {i % 2 === 0 && i < 18 && (
              <motion.line
                x1={`${15 + (i % 4) * 15}%`}
                y1={`${10 + Math.floor(i / 4) * 25}%`}
                x2={`${15 + ((i + 1) % 4) * 15}%`}
                y2={`${10 + Math.floor((i + 1) / 4) * 25}%`}
                stroke="url(#heroConnectionGradient)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.4, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.4 + 1,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
} 