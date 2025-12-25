import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import BaseLayout from '../components/layout/BaseLayout';
import Button from '../components/ui/Button';
import { Heart, Camera } from 'lucide-react';

const HangingMoon = () => (
    <div className="absolute top-0 right-8 md:right-24 z-0 pointer-events-none origin-top animate-swing-slow">
        {/* String - Made Visible */}
        <div className="w-[2px] h-20 md:h-32 bg-gradient-to-b from-vintage-gold to-transparent mx-auto"></div>
        
        {/* Main Moon Container */}
        <motion.div 
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative -mt-1 filter drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]"
        >
            {/* The Moon SVG - Simplified & Elegant */}
            <svg width="160" height="160" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[120px] h-[120px] md:w-[180px] md:h-[180px]">
                {/* Soft Outer Glow - Static & Subtle */}
                <circle cx="100" cy="100" r="70" fill="#FFD700" filter="url(#glow-blur)" opacity="0.08" />
                
                {/* Moon Shape - Clean Gradient */}
                <path d="M140 20C120 20 100 40 100 80C100 120 130 140 150 140C110 200 40 160 40 80C40 20 110 -20 140 20Z" fill="url(#moonFlat)" stroke="#FFF8E7" strokeWidth="1.5"/>
                
                <defs>
                    <linearGradient id="moonFlat" x1="40" y1="0" x2="150" y2="150" gradientUnits="userSpaceOnUse">
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
                <div className="w-[1px] h-8 bg-vintage-gold/50 mx-auto"></div>
                <div className="text-xl filter drop-shadow-md animate-pulse">✨</div>
            </motion.div>
        </motion.div>
    </div>
);

const SparklingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Math.random().toString(36).substr(2, 9);
            const size = Math.random() * 30 + 15;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 2 + 2;
            
            setHearts(prev => [...prev.slice(-50), { id, size, left, top, duration }]);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {hearts.map(heart => (
                <motion.div
                    key={heart.id}
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], y: -60 }}
                    transition={{ duration: heart.duration, ease: "easeInOut" }}
                    className="absolute text-white/50 filter drop-shadow-sm"
                    style={{ 
                        left: `${heart.left}%`, 
                        top: `${heart.top}%`,
                        fontSize: `${heart.size}px` 
                    }}
                >
                    ♥
                </motion.div>
            ))}
        </div>
    );
};

const Landing = () => {
  const navigate = useNavigate();
  const { setUserNames } = useStore();
  const [names, setNames] = useState('');

  const handleStart = () => {
    if (names.trim()) {
      setUserNames(names);
    }
    navigate('/layout');
  };

  return (
    <BaseLayout>
      <div className="flex flex-col items-center justify-center w-full h-full px-4 text-center z-10 overflow-y-auto py-8 relative">
        <SparklingHearts />
        <HangingMoon />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-6 md:mb-8"
        >
          <div className="pointer-events-none absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-pastel-pink to-purple-200 rounded-full blur-2xl opacity-60 animate-float-slow"></div>
          
          
          <h1 className="relative text-5xl md:text-8xl font-cute font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink via-purple-300 to-accent-blue drop-shadow-sm tracking-tight mb-2 text-shadow-pop px-2">
            LoveBooth
          </h1>
          <p className="text-lg md:text-xl text-moonlight font-cute font-bold tracking-widest uppercase text-shadow-sm px-4">
            Snap. Decorate. Cherish. 🌙🤍
          </p>
        </motion.div>

        {/* Interactive Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-panel p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] w-full max-w-sm md:max-w-md mx-auto"
        >
          
          <div className="space-y-4">
            <Button 
              onClick={handleStart} 
              className="w-full text-base md:text-lg py-4 md:py-5 bg-gradient-to-r from-pastel-pink to-accent-blue text-white shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-200/80 transform hover:-translate-y-1 transition-all rounded-xl md:rounded-2xl font-bold tracking-wide"
              icon={Camera}
            >
              Start Snapping!
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 md:absolute md:bottom-8 flex items-center gap-2 text-moonlight/60 text-xs font-bold tracking-widest uppercase opacity-60"
        >
          <span>Made with</span> 
          <span className="text-pastel-pink text-lg animate-bounce-soft">♥</span> 
          <span>for you</span>
        </motion.div>
      </div>
    </BaseLayout>
  );
};

export default Landing;
