import React, { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import useSoundGen from '../hooks/useSoundGen';
import useCamera from '../hooks/useCamera';
import BaseLayout from '../components/layout/BaseLayout';
import Button from '../components/ui/Button';
import { Camera as CameraIcon, RotateCcw, Upload, Settings2 } from 'lucide-react';

import { LIVE_FILTERS } from '../utils/constants';

const COUNTDOWN_TIME = 3;

const CameraCapture = () => {
  const navigate = useNavigate();
  const { layoutConfig, addCapturedImage, clearImages, capturedImages } = useStore();
  const { webcamRef, capture } = useCamera();
  const { playClick, playBeep, playShutter } = useSoundGen();
  
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const [currentPose, setCurrentPose] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('normal');
  const [timerDuration, setTimerDuration] = useState(3);

  /* Ref for flash element to trigger animation manually if needed */
  const flashRef = useRef(null);
  
  // State for finite machine to prevent race conditions
  // 'idle' | 'counting' | 'capturing' | 'complete'
  const [captureState, setCaptureState] = useState('idle');

  // Clean up old images on mount
  useEffect(() => {
    clearImages();
  }, [clearImages]);

  const triggerCapture = useCallback(() => {
       if (captureState !== 'counting') return;
       setCaptureState('capturing');

       // 1. Audio & Visual Juice
       // 1. Audio & Visual Juice
       playShutter();

       // 2. Flash Animation
       if (flashRef.current) {
           flashRef.current.style.transition = 'none';
           flashRef.current.style.opacity = '1';
           
           // Force reflow
           void flashRef.current.offsetWidth;
           
           flashRef.current.style.transition = 'opacity 1.5s ease-out'; // Long "developing" fade
           flashRef.current.style.opacity = '0';
       }

       // 3. Actual Capture
       setTimeout(() => {
           const image = capture();
           if (image) {
               addCapturedImage(image);
               
               if (currentPose + 1 < layoutConfig.poses) {
                   setCurrentPose(prev => prev + 1);
                   setCountdown(timerDuration);
                   
                   setCaptureState('idle'); 
                   setTimeout(() => {
                        setCaptureState('counting');
                   }, 1500);
               } else {
                   setCaptureState('complete');
                   navigate('/editor');
               }
           } else {
               console.error("Capture failed");
               setCaptureState('idle'); // Reset on failure
           }
       }, 50); 

  }, [capture, addCapturedImage, currentPose, layoutConfig.poses, navigate, timerDuration, captureState, playShutter]);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (captureState === 'counting') {
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(c => c - 1);
                playBeep(); // Beep on tick
            }, 1000);
        } else {
            // Countdown finished, trigger capture
            triggerCapture();
        }
    }
    return () => clearTimeout(timer);
  }, [captureState, countdown, triggerCapture, playBeep]);

  const startSequence = () => {
    playClick();
    setCountdown(timerDuration);
    setCaptureState('counting');
  };

  const videoConstraints = {
    facingMode: "user",
    width: 1280,
    height: 720
  };
  
  const activeFilterClass = LIVE_FILTERS.find(f => f.id === selectedFilter)?.class || '';

  return (
    <BaseLayout>
      <div className="flex flex-col w-full h-[100dvh] relative justify-center overflow-hidden supports-[height:100svh]:h-[100svh]">
      
        {/* Controls Bar - Compact for Mobile */}
        <div className="flex justify-between md:justify-center items-center gap-4 md:gap-8 p-4 shrink-0 z-20 w-full pt- safe-top">
             {/* Upload Button */}
             <button 
                onClick={() => playClick()}
                className="bg-white/90 backdrop-blur-sm px-4 md:px-6 py-2 rounded-full shadow-sm border border-vintage-gold/50 text-vintage-brown font-bold text-xs md:text-sm hover:shadow-md transition-all flex items-center gap-2 active:scale-95"
             >
                <Upload size={14} className="md:w-4 md:h-4" /> <span className="hidden md:inline">Upload</span>
             </button>

             {/* Timer Slider (Visual) - Compact */}
             <div className="flex items-center gap-2 md:gap-3 bg-white/40 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-vintage-gold/50 shadow-sm">
                <span className="text-vintage-brown font-bold text-xs md:text-sm whitespace-nowrap">{timerDuration}s</span>
                <input 
                    type="range" 
                    min="3" 
                    max="10" 
                    value={timerDuration} 
                    onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                    className="w-20 md:w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pastel-pink touch-none"
                />
             </div>
             
             {/* Mobile Spacer to balance layout if needed or Settings Icon */}
             <div className="w-8 md:hidden"></div>
        </div>

        {/* Main Feed Area - Adjusted for Responsive Height */}
        <div className="flex-1 flex flex-col items-center px-2 md:px-4 relative z-10 w-full min-h-0 overflow-hidden text-center">
            
            {/* Background Animations */}
            <div className="hidden lg:block absolute top-20 left-20 animate-bounce-soft pointer-events-none">
                 <div className="w-24 h-12 bg-white rounded-full opacity-60 blur-md"></div>
            </div>
            {/* ... other decorations ... */}

            {/* Camera FrameContainer - Responsive Grid/Flex */}
            <div 
                className="relative w-full max-w-[90vw] md:max-w-4xl flex-1 flex flex-col justify-center min-h-0 basis-auto aspect-[3/4] md:aspect-[4/3] bg-gray-100 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lg border-4 md:border-8 border-white ring-2 md:ring-4 ring-pastel-pink/30 mb-2 md:mb-4 max-h-[60vh] md:max-h-[65vh] mx-auto"
            >
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        ...videoConstraints,
                        facingMode: "user" 
                    }}
                    onUserMediaError={(err) => {
                        console.error("Camera Error:", err);
                        setCaptureState('error');
                    }}
                    className={`w-full h-full object-cover transform scale-x-[-1] transition-all duration-300 ${activeFilterClass}`} 
                    playsInline // Crucial for iOS
                />

                {/* Error State Overlay */}
                {captureState === 'error' && (
                    <div className="absolute inset-0 bg-dark-bg/90 flex flex-col items-center justify-center text-center p-6 z-50">
                        <div className="bg-white/10 p-4 rounded-full mb-4 text-love-pink">
                             <Settings2 size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Camera Access Blocked</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            We can't see you! 🙈 <br/>
                            Please allow camera access in your browser settings or ensure you are using HTTPS.
                        </p>
                        <Button onClick={() => window.location.reload()} className="bg-love-pink text-white px-6">
                            Try Again
                        </Button>
                    </div>
                )}
                
                {/* Real Flash Overlay */}
                <div ref={flashRef} className="absolute inset-0 bg-white opacity-0 pointer-events-none transition-opacity duration-150 z-50"></div>

                {/* Countdown Overlay */}
                <AnimatePresence>
                    {captureState === 'counting' && countdown > 0 && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        key={countdown}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none text-shadow-pop"
                    >
                        <span className="text-6xl md:text-[10rem] font-cute font-bold text-white drop-shadow-lg">
                        {countdown}
                        </span>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Controls - Responsive Stack */}
            <div className="w-full flex flex-col items-center gap-2 md:gap-4 pb-4 md:pb-8 shrink-0 z-30 pb-safe-bottom">
                 {/* Filters */}
                 <div className="glass-panel rounded-full p-1.5 md:p-2 flex gap-2 overflow-x-auto max-w-full w-full md:w-auto px-4 md:px-2 scrollbar-hide border border-white/60 mb-1 mask-linear-fade">
                    {LIVE_FILTERS.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setSelectedFilter(filter.id)}
                            className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap uppercase tracking-wider flex-shrink-0 snap-center ${selectedFilter === filter.id ? 'bg-pastel-pink text-white shadow-md transform scale-105' : 'bg-transparent text-gray-500 hover:text-white hover:bg-white/10'}`}
                        >
                            {filter.name}
                        </button>
                    ))}
                 </div>

                 {/* Capture Button */}
                 {captureState === 'idle' ? (
                     <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startSequence}
                        className="bg-gradient-to-b from-vintage-red to-red-400 text-white font-bold text-base md:text-xl px-8 md:px-16 py-3 md:py-5 rounded-full shadow-[0_4px_14px_rgba(206,126,90,0.4)] border-4 border-white/80 ring-2 md:ring-4 ring-orange-200 flex items-center justify-center gap-2 md:gap-3 w-[80%] md:w-auto min-w-[200px] touch-manipulation"
                     >
                         <CameraIcon size={20} className="animate-pulse" />
                         Start Capture
                     </motion.button>
                 ) : (
                    <motion.div 
                        animate={{ scale: [1, 1.02, 1] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="h-[56px] md:h-[68px] px-8 md:px-12 rounded-full bg-white/80 backdrop-blur-md border border-pastel-pink/30 flex items-center justify-center text-pastel-pink font-bold uppercase tracking-widest text-sm md:text-lg shadow-inner w-[80%] md:w-auto"
                    >
                         {captureState === 'counting' ? 'Get Ready! 📸' : 'Say Cheese! ✨'}
                     </motion.div>
                 )}
            </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CameraCapture;
