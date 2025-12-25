import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react';

const ZoomPanWorkspace = ({ children, className = '', initialScale = 1 }) => {
    const constraintsRef = useRef(null);
    const [scale, setScale] = useState(initialScale);
    const [isDragging, setIsDragging] = useState(false);

    // Zoom handlers
    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.1));
    const handleReset = () => setScale(1);

    // Slider handler
    const handleSliderChange = (e) => {
        setScale(parseFloat(e.target.value));
    };

    return (
        <div className={`relative w-full h-full overflow-hidden flex flex-col ${className}`}>
            
            {/* Workspace Area */}
            <div 
                ref={constraintsRef} 
                className="flex-1 w-full h-full relative overflow-hidden bg-vintage-cream/20 cursor-move touch-none flex items-center justify-center"
            >
                {/* Grid Pattern Background for context */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ 
                        backgroundImage: 'radial-gradient(#CE7E5A 1px, transparent 1px)', 
                        backgroundSize: '20px 20px' 
                    }} 
                />

                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.1}
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    animate={{ scale: scale }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="origin-center shadow-2xl cursor-grab active:cursor-grabbing will-change-transform"
                    style={{ touchAction: 'none' }}
                >
                    {children}
                </motion.div>
            </div>

            {/* Floating Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                 <button onClick={handleReset} className="p-2 bg-white/90 backdrop-blur shadow-lg rounded-full text-vintage-brown hover:bg-white transition-colors" title="Reset View">
                    <RotateCcw size={18} />
                 </button>
            </div>

            {/* Bottom Floating Zoom Slider */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-xl border border-vintage-gold/20 z-20 pointer-events-auto">
                <button onClick={handleZoomOut} className="text-vintage-brown hover:scale-110 transition-transform"><ZoomOut size={16}/></button>
                <input 
                    type="range" 
                    min="0.1" 
                    max="2.5" 
                    step="0.05" 
                    value={scale} 
                    onChange={handleSliderChange}
                    className="w-32 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-vintage-red"
                />
                <button onClick={handleZoomIn} className="text-vintage-brown hover:scale-110 transition-transform"><ZoomIn size={16}/></button>
            </div>
        </div>
    );
};

export default ZoomPanWorkspace;
