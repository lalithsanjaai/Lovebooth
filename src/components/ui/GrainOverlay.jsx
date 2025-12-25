import React from 'react';

const GrainOverlay = ({ opacity = 0.05 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay overflow-hidden">
      {/* SVG Noise Filter */}
      <svg className="absolute w-full h-full opacity-60">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.6" 
            stitchTiles="stitch" 
            numOctaves="3"
          />
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      
      {/* Optional Animated Grain using CSS keyframes (if desired, but SVG is often sufficient) */}
      <style>{`
        @keyframes shift-noise {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }
        
        rect {
            animation: shift-noise 1s steps(10) infinite;
        }
      `}</style>
    </div>
  );
};

export default GrainOverlay;
