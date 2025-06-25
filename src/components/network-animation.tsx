import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Network } from "lucide-react";

export default function NetworkAnimation() {
  return (
    <>
      <div className="network-bg" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <svg
          width="800"
          height="400"
          viewBox="0 0 800 400"
          className="w-full h-full max-w-4xl opacity-30"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "hsl(244, 86%, 65%)", stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: "hsl(244, 86%, 65%)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "hsl(261, 83%, 71%)", stopOpacity: 0 }} />
            </linearGradient>
            <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: "hsl(244, 86%, 65%)", stopOpacity: 1 }} />
              <stop offset="70%" style={{ stopColor: "hsl(261, 83%, 71%)", stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: "hsl(217, 91%, 60%)", stopOpacity: 0.6 }} />
            </radialGradient>
          </defs>
          
          {/* Animated connection paths */}
          <motion.path
            d="M150,200 Q300,100 450,200 T750,200"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            strokeDasharray="10 5"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -50 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M200,150 Q400,250 600,150 Q700,100 800,150"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            strokeDasharray="10 5"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -50 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
          <motion.path
            d="M100,300 Q250,200 400,300 Q550,400 700,300"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            strokeDasharray="10 5"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -50 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          />
          
          {/* Connection nodes */}
          <motion.circle
            cx="150" cy="200" r="4"
            fill="hsl(244, 86%, 65%)"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="300" cy="100" r="4"
            fill="hsl(244, 86%, 65%)"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.circle
            cx="450" cy="200" r="4"
            fill="hsl(244, 86%, 65%)"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.circle
            cx="600" cy="150" r="4"
            fill="hsl(244, 86%, 65%)"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.circle
            cx="750" cy="200" r="4"
            fill="hsl(244, 86%, 65%)"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
          
          {/* Central connection hub */}
          <motion.g>
            <motion.circle
              cx="400" cy="200" r="20"
              fill="hsl(244, 86%, 65%)"
              opacity="0.2"
              initial={{ scale: 1 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="400" cy="200" r="12"
              fill="url(#hubGradient)"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <Network className="absolute transform -translate-x-1/2 -translate-y-1/2" 
                     style={{ left: '50%', top: '50%', color: 'white', opacity: 0.9 }} />
          </motion.g>
        </svg>
      </motion.div>
    </>
  );
}
