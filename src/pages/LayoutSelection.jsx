import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import BaseLayout from '../components/layout/BaseLayout';
import Button from '../components/ui/Button';
import { Layout, Image, Grid } from 'lucide-react';

const LayoutOption = ({ id, title, icon: Icon, poses, description, isSelected, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, borderColor: '#FF2E63' }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(id, poses)}
    className={`relative flex flex-col items-center p-4 md:p-6 rounded-3xl border-2 transition-all duration-300 w-full md:w-64 min-h-[16rem] md:h-80 justify-between group touch-manipulation active:scale-95 ${
      isSelected 
        ? 'bg-surface border-love-pink shadow-[0_0_20px_rgba(255,46,99,0.3)]' 
        : 'bg-surface/50 border-white/10 hover:bg-surface hover:shadow-lg'
    }`}
  >
    <div className="flex-1 flex items-center justify-center w-full">
        <div className={`p-6 rounded-full transition-colors duration-300 ${isSelected ? 'bg-love-pink text-white' : 'bg-dark-bg text-gray-400 group-hover:text-love-pink'}`}>
            <Icon size={40} strokeWidth={1.5} />
        </div>
    </div>
    
    <div className="text-center w-full">
      <h3 className={`text-xl font-sans font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{title}</h3>
      <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{description}</p>
      
      <div className="mt-6 w-full h-1 rounded-full bg-dark-bg overflow-hidden">
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isSelected ? '100%' : '0%' }}
            className="h-full bg-gradient-to-r from-love-pink to-midnight"
        />
      </div>
    </div>
    
    {isSelected && (
        <motion.div 
            layoutId="checkmark"
            className="absolute top-4 right-4 text-love-pink drop-shadow-[0_0_8px_rgba(255,46,99,0.8)]"
        >
            <div className="bg-love-pink text-white rounded-full p-1 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
        </motion.div>
    )}
  </motion.button>
);

const LayoutSelection = () => {
  const navigate = useNavigate();
  const { setLayout, selectedLayout } = useStore();

  const handleSelect = (layoutId, poses) => {
    setLayout(layoutId, { poses, timer: 3 });
  };

  const handleContinue = () => {
    navigate('/camera');
  };

  const layouts = [
    { id: 'single', title: 'Classic Polaroid', icon: Image, poses: 1, description: 'One perfect capture.' },
    { id: 'strip', title: 'Love Strip', icon: Layout, poses: 3, description: 'Three poses, one strip.' },
    { id: 'collage', title: 'Memory Grid', icon: Grid, poses: 4, description: 'A 2x2 collage of fun.' },
  ];

  return (
    <BaseLayout>
      <div className="flex flex-col items-center justify-start w-full h-full relative overflow-hidden">
        {/* Scrollable Content Area */}
        <div className="flex-1 w-full overflow-y-auto custom-scrollbar px-4 py-6 md:py-8 pt-20 md:pt-8">
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-16 relative"
            >
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-64 h-32 bg-midnight/20 blur-[60px] rounded-full pointer-events-none"></div>
            <h2 className="text-4xl md:text-6xl font-romantic-script text-transparent bg-clip-text bg-gradient-to-r from-love-pink to-midnight mb-2 md:mb-4 drop-shadow-md pb-2">Choose Your Frame</h2>
            <p className="text-gray-400 font-sans tracking-wider uppercase text-xs md:text-sm">How do you want to tell your story?</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-24 md:mb-12 w-full max-w-5xl justify-items-center mx-auto">
            {layouts.map((layout) => (
                <LayoutOption
                key={layout.id}
                {...layout}
                isSelected={selectedLayout === layout.id}
                onClick={handleSelect}
                />
            ))}
            </div>
        </div>

        {/* Sticky Footer for Button */}
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-background via-background/95 to-transparent z-20 flex justify-center backdrop-blur-[2px]"
        >
            <Button 
                onClick={handleContinue} 
                className="text-lg md:text-xl px-20 py-4 w-full md:w-auto shadow-2xl shadow-love-pink/20"
                disabled={!selectedLayout}
            >
                Confirm Selection
            </Button>
        </motion.div>
      </div>
    </BaseLayout>
  );
};

export default LayoutSelection;
