import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';
import useStore from '../store/useStore';
import BaseLayout from '../components/layout/BaseLayout';
import Button from '../components/ui/Button';
import { Download, Edit2, Sticker, Palette, Share2, Upload, RotateCw, X, ChevronUp, Image as ImageIcon, Sparkles, Bold, Italic } from 'lucide-react';
import QRCode from 'qrcode';
import gifshot from 'gifshot';
import DraggableElement from '../components/editor/DraggableElement';
import TiltContainer from '../components/ui/TiltContainer';
import ConfettiBurst from '../components/ui/ConfettiBurst';

import { EDITOR_FILTERS, FRAME_CATEGORIES, FRAME_COLORS, STICKER_LIBRARY, FONT_FAMILIES, GRADIENT_PRESETS, FRAME_PATTERNS } from '../utils/constants';

// Safe Defaults
const SAFE_FILTERS = EDITOR_FILTERS || [];
const SAFE_FRAMES = FRAME_CATEGORIES || [];
const SAFE_STICKERS = STICKER_LIBRARY || [];
const SAFE_COLORS = FRAME_COLORS || [];
const SAFE_FONTS = FONT_FAMILIES || [];
const SAFE_GRADIENTS = GRADIENT_PRESETS || [];
const SAFE_PATTERNS = FRAME_PATTERNS || [];

const uniqueId = () => Math.random().toString(36).substr(2, 9);

// Tool Components defined outside to prevent re-renders losing focus
const FilterTools = ({ settings, updateSettings, capturedImages }) => (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-4">
        {SAFE_FILTERS.map(filter => (
            <button
                key={filter.id}
                onClick={() => updateSettings({ filter: filter.id })}
                className={`flex flex-col items-center gap-1 min-w-[70px] ${settings.filter === filter.id ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`}
            >
                <div className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${settings.filter === filter.id ? 'border-vintage-red' : 'border-transparent'}`}>
                    <img src={capturedImages[0]} className={`w-full h-full object-cover ${filter.class}`} alt={filter.name} />
                </div>
                <span className="text-xs font-bold text-vintage-brown">{filter.name}</span>
            </button>
        ))}
    </div>
);

const FrameTools = ({ settings, updateSettings }) => (
    <div className="space-y-4 px-4 pb-4">
        {/* Colors & Gradients */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide items-center">
                {/* Custom Color Picker */}
                <label className="w-10 h-10 rounded-full border-2 border-white/50 shrink-0 cursor-pointer overflow-hidden relative shadow-sm hover:scale-110 transition-transform">
                <input 
                    type="color" 
                    value={settings.frameColor}
                    onChange={(e) => updateSettings({ frameColor: e.target.value })}
                    className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Palette size={16} className="text-vintage-brown mix-blend-difference" />
                </div>
            </label>

            {[...SAFE_COLORS, ...SAFE_GRADIENTS].map((color, idx) => (
                <button
                    key={idx}
                    onClick={() => updateSettings({ frameColor: color })}
                    className={`w-10 h-10 rounded-full border-2 shrink-0 ${settings.frameColor === color ? 'border-vintage-red scale-110' : 'border-white/50'}`}
                    style={{ background: color }}
                />
            ))}
        </div>

        {/* Patterns */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {SAFE_PATTERNS.map((pat, idx) => (
                <button
                    key={idx}
                    onClick={() => updateSettings({ frameColor: pat.value })}
                    className={`min-w-[40px] h-10 rounded-lg border-2 text-[10px] font-bold text-vintage-brown/50 bg-white ${settings.frameColor === pat.value ? 'border-vintage-red scale-110' : 'border-white/50'}`}
                    style={{ background: pat.value }}
                    title={pat.name}
                />
            ))}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-3 gap-2">
            {SAFE_FRAMES.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => updateSettings({ frameCategory: cat.id, frameStyle: { style: cat.style } })}
                    className={`py-2 px-1 rounded-lg text-xs font-bold text-center truncate border ${settings.frameCategory === cat.id ? 'bg-vintage-red text-white border-vintage-red' : 'bg-white/50 text-vintage-brown border-vintage-brown/20'}`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    </div>
);

const StickerTools = ({ addSticker, handleUpload }) => (
    <div className="px-4 pb-4">
            <div className="grid grid-cols-4 gap-4 max-h-[200px] overflow-y-auto">
                <label className="flex flex-col items-center justify-center h-16 bg-white/50 rounded-lg border-2 border-dashed border-vintage-brown/30 cursor-pointer">
                <Upload size={20} className="text-vintage-brown" />
                <span className="text-[10px] font-bold text-vintage-brown mt-1">Upload</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
                {SAFE_STICKERS.map((sticker, idx) => (
                <button key={idx} onClick={() => addSticker(sticker)} className="text-3xl hover:scale-125 transition-transform">
                    {sticker}
                </button>
                ))}
            </div>
    </div>
);

const TextTools = ({ textInput, setTextInput, addText, textSettings, setTextSettings, addDateStamp }) => (
    <div className="px-4 pb-4 space-y-3">
            <div className="flex gap-2">
                <input 
                type="text" 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type something..."
                className="flex-1 min-w-0 px-4 py-2 rounded-xl border border-vintage-brown/20 bg-white/80 text-vintage-brown font-bold focus:outline-none focus:border-vintage-red"
                onKeyDown={(e) => e.key === 'Enter' && addText()}
                />
                <button onClick={addText} className="bg-vintage-red text-white p-2 rounded-xl">
                <ChevronUp size={20} />
                </button>
            </div>
            <div className="flex gap-2 items-center pb-2 overflow-x-auto scrollbar-hide">
                {/* Date Stamp Button - New Feature */}
                <button 
                    onClick={addDateStamp}
                    className="px-3 py-1 rounded-lg bg-orange-100 text-orange-600 text-xs font-bold border border-orange-200 hover:bg-orange-200 whitespace-nowrap"
                >
                    Date 📅
                </button>

                <div className="w-px h-6 bg-vintage-brown/20 mx-1"></div>

                {/* Style Toggles */}
                <button 
                onClick={() => setTextSettings(prev => ({ ...prev, bold: !prev.bold }))}
                className={`p-2 rounded-lg border ${textSettings.bold ? 'bg-vintage-brown text-white border-vintage-brown' : 'bg-white text-vintage-brown border-vintage-brown/20'}`}
                >
                <Bold size={16} />
                </button>
                <button 
                onClick={() => setTextSettings(prev => ({ ...prev, italic: !prev.italic }))}
                className={`p-2 rounded-lg border ${textSettings.italic ? 'bg-vintage-brown text-white border-vintage-brown' : 'bg-white text-vintage-brown border-vintage-brown/20'}`}
                >
                <Italic size={16} />
                </button>
                <div className="w-px h-6 bg-vintage-brown/20 mx-1"></div>

                {/* Fonts */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
                {SAFE_FONTS.map(font => (
                    <button
                        key={font.id}
                        onClick={() => setTextSettings(prev => ({ ...prev, font: font.value }))}
                        className={`px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${textSettings.font === font.value ? 'bg-vintage-brown text-white' : 'bg-white text-vintage-brown'}`}
                        style={{ fontFamily: font.value }}
                    >
                        {font.name}
                    </button>
                ))}
                </div>
            </div>
            <div className="flex gap-2 overflow-x-auto items-center">
                {/* Custom Color Picker */}
                <label className="w-6 h-6 rounded-full border border-vintage-brown/30 shrink-0 cursor-pointer overflow-hidden relative shadow-sm hover:scale-110 transition-transform">
                <input 
                    type="color" 
                    value={textSettings.color}
                    onChange={(e) => setTextSettings(prev => ({ ...prev, color: e.target.value }))}
                    className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Palette size={10} className="text-vintage-brown mix-blend-difference" />
                </div>
            </label>

                {SAFE_COLORS.map(color => (
                    <button
                    key={color}
                    onClick={() => setTextSettings(prev => ({ ...prev, color }))}
                    className={`w-6 h-6 rounded-full border ${textSettings.color === color ? 'border-vintage-brown scale-125' : 'border-transparent'}`}
                    style={{ background: color }}
                    />
                ))}
            </div>
    </div>
);

const Editor = () => {
    const navigate = useNavigate();
    const store = useStore();
    const capturedImages = store.capturedImages || [];
    const selectedLayout = store.selectedLayout || 'single';
    const settings = store.settings || { 
        filter: 'normal', 
        frameColor: '#ffffff', 
        frameStyle: { style: {} }, 
        frameCategory: 'none' 
    };
    const updateSettings = store.updateSettings;

    // Mobile specific state
    const [activeTab, setActiveTab] = useState(null); // 'filters', 'frames', 'stickers', 'text'

    const editorRef = useRef(null);
    const [elements, setElements] = useState([]);
    const [selectedElementId, setSelectedElementId] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [showShareModal, setShowShareModal] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    
    // Text State
    const [textSettings, setTextSettings] = useState({
        font: "'Outfit', sans-serif",
        color: '#CE7E5A', // Vintage Brown default
        bold: false,
        italic: false
    });
    const [textInput, setTextInput] = useState('');

    // Redirect if empty
    useEffect(() => {
        if (capturedImages.length === 0) navigate('/');
    }, [capturedImages, navigate]);

    if (capturedImages.length === 0) return null;

    // Actions
    // Actions
    const handleShare = async () => {
        if (navigator.share) {
            try {
                 const file = await htmlToImage.toBlob(editorRef.current);
                 await navigator.share({
                     title: 'My LoveBooth Memory',
                     text: 'Check out my photo strip! 📸',
                     files: [new File([file], 'lovebooth.png', { type: 'image/png' })]
                 });
                 return;
            } catch (err) {
                console.log('Share failed or cancelled', err);
                // Fallback to QR
            }
        }

        const url = 'https://lovebooth.vercel.app/memories/' + uniqueId();
        try {
            const qr = await QRCode.toDataURL(url);
            setQrCodeUrl(qr);
            setShowShareModal(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownload = async () => {
        setIsExporting(true);
        setSelectedElementId(null);
        setTimeout(async () => {
            if (editorRef.current) {
                try {
                    const dataUrl = await htmlToImage.toPng(editorRef.current, { cacheBust: true, pixelRatio: 2 });
                    const link = document.createElement('a');
                    link.download = `lovebooth-${uniqueId()}.png`;
                    link.href = dataUrl;
                    link.click();
                } catch(e) { console.error("Export failed", e); }
                setIsExporting(false);
            }
        }, 100);
    };

    const handleCreateGif = () => {
        if (!capturedImages || capturedImages.length === 0) return;
        gifshot.createGIF({
            images: capturedImages,
            interval: 0.5,
            gifWidth: 400,
            gifHeight: 400,
            numFrames: 10
        }, function(obj) {
            if(!obj.error) {
                const link = document.createElement('a');
                link.download = `lovebooth-${uniqueId()}.gif`;
                link.href = obj.image;
                link.click();
            }
        });
    };

    const addSticker = (sticker) => {
        setElements(prev => [...prev, {
            id: uniqueId(), type: 'sticker', content: sticker, x: 0, y: 0, rotation: 0, scale: 1
        }]);
    };

    const addText = () => {
        if (!textInput.trim()) return;
        setElements(prev => [...prev, {
            id: uniqueId(), type: 'text', content: { text: textInput, ...textSettings }, x: 0, y: 0, rotation: 0, scale: 1
        }]);
        setTextInput('');
    };

    const addDateStamp = () => {
        const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.');
        setElements(prev => [...prev, {
            id: uniqueId(), 
            type: 'date-stamp', 
            content: { 
                text: `'${date}`, // '20.12.25 style
            }, 
            x: 0, 
            y: 0, 
            rotation: 0, 
            scale: 0.8
        }]);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setElements(prev => [...prev, {
                    id: uniqueId(), type: 'image', content: reader.result, x: 0, y: 0, rotation: 0, scale: 1
                }]);
            };
            reader.readAsDataURL(file);
        }
    };

    const getLayoutClasses = () => {
        switch(selectedLayout) {
            case 'strip': return 'grid-cols-1 gap-4 p-4 w-full max-w-[280px]';
            case 'collage': return 'grid-cols-2 gap-2 p-2 w-full max-w-sm aspect-square';
            default: return 'grid-cols-1 p-6 w-full max-w-sm pb-16 aspect-[4/5]'; 
        }
    };


    return (
        <BaseLayout className="flex flex-col lg:flex-row h-[100dvh] overflow-hidden bg-vintage-cream/50">
             <ConfettiBurst />
             
             {/* Main Canvas Area - Responsive Flex Column */}
             <div className="flex-1 relative flex flex-col items-center justify-start lg:justify-center overflow-hidden min-h-0" onClick={() => setSelectedElementId(null)}>
                
                 {/* Top Bar Mobile - Compact & Fixed */}
                 <div className="w-full p-4 flex justify-between items-center z-30 lg:hidden shrink-0 pt-safe-top">
                     <Button onClick={() => navigate('/')} variant="ghost" className="bg-white/90 backdrop-blur rounded-full shadow-sm text-vintage-brown w-10 h-10 p-0 flex items-center justify-center"> <RotateCw size={18} /> </Button>
                     <Button onClick={handleDownload} className="bg-vintage-red text-white shadow-lg shadow-red-200/50 rounded-full px-5 py-2 font-bold text-xs flex items-center gap-2"> <Download size={14}/> Save </Button>
                 </div>

                 {/* Canvas Scroller/Container - Shrinks to fit */}
                 <div className="w-full flex-1 min-h-0 flex items-center justify-center p-4 pb-32 lg:p-8 overflow-hidden touch-none">
                  <TiltContainer className="flex items-center justify-center max-h-full max-w-full">
                    <div 
                        ref={editorRef}
                        className={`relative shadow-2xl transition-all duration-300 grid content-center justify-items-center ${getLayoutClasses()} bg-white origin-center`}
                        style={{ 
                            filter: settings.filter !== 'normal' ? undefined : 'none',
                            background: settings.frameColor || '#ffffff',
                            ...settings.frameStyle?.style,
                            gap: selectedLayout === 'collage' ? '8px' : '16px',
                            transformStyle: 'preserve-3d',
                            // Responsive Scale Logic could go here, but CSS 'contain' is easier
                            maxHeight: '100%',
                            maxWidth: '100%'
                        }}
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {capturedImages.map((img, idx) => (
                            <div key={idx} className={`relative overflow-hidden ${selectedLayout === 'single' ? 'aspect-square' : ''}`}>
                                <img src={img} alt="" className={`w-full h-full object-cover ${SAFE_FILTERS.find(f => f.id === settings.filter)?.class || ''}`} />
                            </div>
                        ))}
                        {/* Overlay Elements */}
                        <div className="absolute inset-0 z-10 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
                             {elements.map(el => (
                                 <div key={el.id} className="pointer-events-auto absolute" style={{ top: '50%', left: '50%' }}> 
                                    <DraggableElement 
                                        {...el}
                                        isSelected={selectedElementId === el.id}
                                        onSelect={setSelectedElementId}
                                        onDelete={() => setElements(prev => prev.filter(e => e.id !== el.id))}
                                        onUpdate={(id, up) => setElements(prev => prev.map(e => e.id === id ? { ...e, ...up } : e))}
                                    />
                                 </div>
                             ))}
                        </div>
                         {/* Watermark */}
                         {isExporting && (
                             <div className="absolute bottom-2 right-2 text-[10px] font-cute font-bold text-vintage-brown/50 opacity-50">LoveBooth</div>
                         )}
                    </div>
                  </TiltContainer>
                 </div>

             </div>

             {/* Desktop Sidebar (Hidden on Mobile) */}
             <div className="hidden lg:flex w-[400px] h-full bg-white/80 backdrop-blur-xl border-l border-white/50 flex-col z-20 shadow-2xl">
                 <div className="p-6 overflow-y-auto custom-scrollbar space-y-8 h-full">
                     <h2 className="text-2xl font-cute font-bold text-vintage-brown flex items-center gap-2"><Sparkles className="text-vintage-gold"/> Editor</h2>
                     <div><h3 className="text-xs font-bold text-vintage-brown/50 uppercase mb-2">Filters</h3> <FilterTools settings={settings} updateSettings={updateSettings} capturedImages={capturedImages} /></div>
                     <div><h3 className="text-xs font-bold text-vintage-brown/50 uppercase mb-2">Frames</h3> <FrameTools settings={settings} updateSettings={updateSettings} /></div>
                     <div><h3 className="text-xs font-bold text-vintage-brown/50 uppercase mb-2">Stickers</h3> <StickerTools addSticker={addSticker} handleUpload={handleUpload} /></div>
                     <div><h3 className="text-xs font-bold text-vintage-brown/50 uppercase mb-2">Text</h3> <TextTools textInput={textInput} setTextInput={setTextInput} addText={addText} textSettings={textSettings} setTextSettings={setTextSettings} addDateStamp={addDateStamp} /></div>
                     <div className="pt-4 flex gap-2">
                        <Button onClick={handleDownload} className="flex-1 bg-vintage-red hover:bg-red-400 text-white font-bold py-3 rounded-xl shadow-lg" icon={Download}>Save</Button>
                        <Button onClick={handleShare} variant="secondary" className="bg-white border text-vintage-brown p-3 rounded-xl" icon={Share2}></Button>
                     </div>
                 </div>
             </div>

             {/* Mobile Bottom Navigation (Hidden on Desktop) */}
             <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
                 
                 {/* Tool Panel (Slide Up) */}
                 <AnimatePresence>
                     {activeTab && (
                         <motion.div 
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-24 pt-6 border-t border-vintage-gold/20 max-h-[50vh] overflow-y-auto custom-scrollbar"
                         >
                             <div className="flex justify-between items-center px-6 mb-4 sticky top-0 bg-white z-10 pb-2">
                                 <h3 className="font-cute font-bold text-xl text-vintage-brown capitalize">{activeTab}</h3>
                                 <button onClick={() => setActiveTab(null)} className="p-1 bg-gray-100 rounded-full text-gray-400"><X size={16}/></button>
                             </div>
                             {activeTab === 'filters' && <FilterTools settings={settings} updateSettings={updateSettings} capturedImages={capturedImages} />}
                             {activeTab === 'frames' && <FrameTools settings={settings} updateSettings={updateSettings} />}
                             {activeTab === 'stickers' && <StickerTools addSticker={addSticker} handleUpload={handleUpload} />}
                             {activeTab === 'text' && <TextTools textInput={textInput} setTextInput={setTextInput} addText={addText} textSettings={textSettings} setTextSettings={setTextSettings} addDateStamp={addDateStamp} />}
                         </motion.div>
                     )}
                 </AnimatePresence>

                 {/* Tab Bar */}
                 <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-vintage-gold/30 shadow-lg pb-safe">
                     <div className="flex justify-around items-center p-2">
                         <button onClick={() => setActiveTab('filters')} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${activeTab === 'filters' ? 'text-vintage-red' : 'text-vintage-brown'}`}>
                             <Sparkles size={24} /> <span className="text-[10px] font-bold">Filters</span>
                         </button>
                         <button onClick={() => setActiveTab('frames')} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${activeTab === 'frames' ? 'text-vintage-red' : 'text-vintage-brown'}`}>
                             <ImageIcon size={24} /> <span className="text-[10px] font-bold">Frames</span>
                         </button>
                         <button onClick={() => setActiveTab('stickers')} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${activeTab === 'stickers' ? 'text-vintage-red' : 'text-vintage-brown'}`}>
                             <Sticker size={24} /> <span className="text-[10px] font-bold">Stickers</span>
                         </button>
                         <button onClick={() => setActiveTab('text')} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${activeTab === 'text' ? 'text-vintage-red' : 'text-vintage-brown'}`}>
                             <Edit2 size={24} /> <span className="text-[10px] font-bold">Text</span>
                         </button>
                     </div>
                 </div>
             </div>

             {/* Mobile Share Modal */}
             {showShareModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowShareModal(false)}>
                    <div className="bg-vintage-cream p-8 rounded-[2rem] shadow-2xl max-w-xs w-full text-center border-4 border-white" onClick={e => e.stopPropagation()}>
                        <h3 className="font-cute font-bold text-2xl text-vintage-brown mb-2">Share Memory</h3>
                        <div className="bg-white p-4 rounded-xl inline-block mb-6 shadow-inner">
                            {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40 mix-blend-multiply" />}
                        </div>
                        <Button onClick={() => setShowShareModal(false)} className="w-full bg-vintage-brown text-white rounded-xl py-3 font-bold border-0 shadow-none">Close</Button>
                    </div>
                </div>
            )}
        </BaseLayout>
    );
};

export default Editor;
