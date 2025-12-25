import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const colors = ['#FF2E63', '#252A34', '#08D9D6', '#EAEAEA', '#FF9A9E'];

const ConfettiPiece = ({ delay, x }) => (
    <motion.div
        initial={{ y: '110vh', x: x, rotate: 0 }}
        animate={{ 
            y: '-20vh', 
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            x: x + (Math.random() * 200 - 100)
        }}
        transition={{ 
            duration: 2 + Math.random(), 
            delay: delay, 
            ease: "easeOut" 
        }}
        className="fixed w-3 h-3 rounded-sm z-50 pointer-events-none"
        style={{ 
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: '50%' 
        }}
    />
);

const ConfettiBurst = () => {
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: (Math.random() * 100 - 50) + 'vw',
    delay: Math.random() * 0.5
  }));

  return (
    <>
        {pieces.map(p => <ConfettiPiece key={p.id} {...p} />)}
    </>
  );
};

export default ConfettiBurst;
