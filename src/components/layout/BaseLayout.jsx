import React from 'react';
import { motion } from 'framer-motion';
import GrainOverlay from '../ui/GrainOverlay';

const FloatingCloud = ({ delay, duration, left, top }) => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ 
      x: '100vw', 
      opacity: [0, 0.4, 0.4, 0],
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay,
      ease: "linear"
    }}
    style={{ top: top }}
    className="absolute pointer-events-none z-0"
  >
    <div className="w-24 h-12 bg-white/40 rounded-full blur-xl"></div>
  </motion.div>
);

const BaseLayout = ({ children, className = "" }) => {
  // Generate random clouds
  const clouds = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 20 + Math.random() * 10,
    top: `${10 + Math.random() * 80}%`
  }));

  return (
    <div className="relative w-screen h-screen overflow-hidden text-deep-text font-sans selection:bg-pastel-pink selection:text-deep-text">
       {/* Grain Overlay */}
       <GrainOverlay />

       {/* Gradient Mesh Background (Approximation) */}
       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-pink-50 to-blue-50 opacity-80 z-[-1]"></div>
       
       {/* Floating Clouds */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {clouds.map(c => (
          <FloatingCloud key={c.id} {...c} />
        ))}
      </div>

      {/* Main Content */}
      <motion.main 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Custom bezier for premium feel
        className={`relative z-10 w-full h-full flex ${className}`}
      >
        {children}
      </motion.main>

    </div>
  );
};

export default BaseLayout;
