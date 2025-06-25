import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
  delay: number;
}

export default function NeuralNetworkLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  // Configuración de la red neuronal
  const nodes: Node[] = [
    { id: 0, x: 50, y: 20, connections: [1, 2], delay: 0 },
    { id: 1, x: 25, y: 50, connections: [3, 4], delay: 0.2 },
    { id: 2, x: 75, y: 50, connections: [4, 5], delay: 0.4 },
    { id: 3, x: 15, y: 80, connections: [6], delay: 0.6 },
    { id: 4, x: 50, y: 80, connections: [6, 7], delay: 0.8 },
    { id: 5, x: 85, y: 80, connections: [7], delay: 1.0 },
    { id: 6, x: 35, y: 95, connections: [8], delay: 1.2 },
    { id: 7, x: 65, y: 95, connections: [8], delay: 1.4 },
    { id: 8, x: 50, y: 110, connections: [], delay: 1.6 },
  ];

  useEffect(() => {
    // Simular activación secuencial de nodos
    const activateNodes = () => {
      nodes.forEach((node, index) => {
        setTimeout(() => {
          setActiveNodes(prev => [...prev, node.id]);
          setProgress(((index + 1) / nodes.length) * 100);
        }, node.delay * 1000);
      });
    };

    activateNodes();

    // Simular fin de carga
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const isNodeActive = (nodeId: number) => activeNodes.includes(nodeId);
  const isConnectionActive = (fromId: number, toId: number) => 
    activeNodes.includes(fromId) && activeNodes.includes(toId);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Efecto de partículas de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative w-96 h-96">
            {/* Fondo de red */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* SVG de la red neuronal */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 120"
              className="absolute inset-0 p-4"
            >
              <defs>
                <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "hsl(210, 100%, 50%)", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "hsl(270, 100%, 60%)", stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "hsl(210, 100%, 50%)", stopOpacity: 0 }} />
                  <stop offset="50%" style={{ stopColor: "hsl(210, 100%, 50%)", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "hsl(270, 100%, 60%)", stopOpacity: 0 }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Conexiones */}
              {nodes.map((node) =>
                node.connections.map((connectionId) => {
                  const targetNode = nodes.find(n => n.id === connectionId);
                  if (!targetNode) return null;

                  return (
                    <motion.line
                      key={`${node.id}-${connectionId}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${targetNode.x}%`}
                      y2={`${targetNode.y}%`}
                      stroke="url(#connectionGradient)"
                      strokeWidth="0.5"
                      opacity={isConnectionActive(node.id, connectionId) ? 0.8 : 0.1}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: isConnectionActive(node.id, connectionId) ? 1 : 0,
                        opacity: isConnectionActive(node.id, connectionId) ? 0.8 : 0.1
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: Math.max(node.delay, targetNode.delay),
                        ease: "easeInOut"
                      }}
                      filter="url(#glow)"
                    />
                  );
                })
              )}

              {/* Nodos */}
              {nodes.map((node) => (
                <motion.g key={node.id}>
                  {/* Halo del nodo */}
                  <motion.circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r="2"
                    fill="url(#nodeGradient)"
                    opacity={isNodeActive(node.id) ? 0.3 : 0}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: isNodeActive(node.id) ? 1 : 0,
                      opacity: isNodeActive(node.id) ? 0.3 : 0
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: node.delay,
                      ease: "easeOut"
                    }}
                  />
                  
                  {/* Nodo principal */}
                  <motion.circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r="1"
                    fill="url(#nodeGradient)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: isNodeActive(node.id) ? 1 : 0,
                      opacity: isNodeActive(node.id) ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.3, 
                      delay: node.delay,
                      ease: "easeOut"
                    }}
                    filter="url(#glow)"
                  />

                  {/* Pulso del nodo activo */}
                  {isNodeActive(node.id) && (
                    <motion.circle
                      cx={`${node.x}%`}
                      cy={`${node.y}%`}
                      r="3"
                      fill="none"
                      stroke="url(#nodeGradient)"
                      strokeWidth="0.5"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 2, 0],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: node.delay + 0.5
                      }}
                    />
                  )}
                </motion.g>
              ))}
            </svg>

            {/* Texto de carga */}
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.p
                className="text-sm text-muted-foreground mb-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Inicializando red neuronal...
              </motion.p>
              <motion.p
                className="text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {Math.round(progress)}% completado
              </motion.p>
            </motion.div>

            {/* Barra de progreso */}
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-700 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.div
                className="h-full n8n-gradient-bg rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 