import React from 'react';
import { motion } from 'framer-motion';

const CartoonMoon = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 z-20 pointer-events-none origin-top animate-swing-slow">
        {/* String */}
        <div className="w-[2px] h-32 md:h-48 bg-gradient-to-b from-vintage-gold to-transparent mx-auto absolute -top-32 md:-top-48 left-0 right-0"></div>
        
        {/* Main Moon Container */}
        <motion.div 
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="git relative -mt-1 filter drop-shadow-[0_0_35px_rgba(255,215,0,0.2)]"
        >
            {/* The Moon SVG with Face */}
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[150px] h-[150px] md:w-[220px] md:h-[220px]">
                {/* Soft Outer Glow - Static */}
                <circle cx="100" cy="100" r="70" fill="#FFD700" filter="url(#glow-blur)" opacity="0.1" />
                
                {/* Moon Shape */}
                <path d="M140 20C120 20 100 40 100 80C100 120 130 140 150 140C110 200 40 160 40 80C40 20 110 -20 140 20Z" fill="url(#moonLoader)" stroke="#FFF8E7" strokeWidth="1.5"/>
                
                {/* --- FACE --- */}
                {/* Left Eye */}
                <motion.ellipse 
                    cx="85" cy="85" rx="4" ry="6" fill="#5c4d3c"
                    animate={{ scaleY: [1, 0.1, 1] }} // Blink
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1], delay: 1 }}
                />
                
                {/* Right Eye */}
                <motion.ellipse 
                    cx="115" cy="85" rx="4" ry="6" fill="#5c4d3c"
                    animate={{ scaleY: [1, 0.1, 1] }} // Blink
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1], delay: 1 }}
                />

                {/* Blush Cheeks */}
                <ellipse cx="78" cy="95" rx="5" ry="3" fill="#FFA07A" opacity="0.4" />
                <ellipse cx="122" cy="95" rx="5" ry="3" fill="#FFA07A" opacity="0.4" />

                {/* Smile */}
                <path d="M95 98 Q100 105, 105 98" stroke="#5c4d3c" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

                <defs>
                    <linearGradient id="moonLoader" x1="40" y1="0" x2="150" y2="150" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFF9E5" /> 
                        <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                    <filter id="glow-blur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Dangling Star */}
            <motion.div 
                 animate={{ rotate: [5, -5, 5] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-6 left-8 origin-top"
            >
                <div className="w-[1px] h-10 bg-vintage-gold/50 mx-auto"></div>
                <div className="text-2xl filter drop-shadow-md animate-pulse">✨</div>
            </motion.div>
        </motion.div>
    </div>
  );
};

const Loader = () => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 bg-vintage-cream flex flex-col items-center justify-center overflow-hidden"
    >
        {/* Background Particles */}
        <div className="absolute inset-0 opacity-30">
             {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-pastel-pink"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                        scale: [0, 1, 0], 
                        opacity: [0, 0.5, 0],
                        y: [-20, -100],
                        x: Math.random() * 40 - 20
                    }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: Math.random() * 2,
                        ease: "easeOut" 
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 40 + 20}px`
                    }}
                >
                    ♥
                </motion.div>
             ))}
        </div>

        {/* The Star of the Show: Cartoon Moon */}
        <CartoonMoon />

        {/* Cinematic Title */}
        <motion.div 
            className="absolute bottom-1/4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            <h1 className="text-4xl md:text-6xl font-cute font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink via-purple-300 to-accent-blue tracking-tight mb-4 drop-shadow-sm">
                LoveBooth
            </h1>
            <motion.div 
                className="flex items-center justify-center gap-2 text-moonlight/60 font-bold uppercase tracking-widest text-sm"
            >
                <span>Loading Magic</span>
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >...</motion.span>
            </motion.div>
        </motion.div>

    </motion.div>
  );
};

export default Loader;
