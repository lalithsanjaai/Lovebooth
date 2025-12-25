// LoveBooth Configuration & Constants

// Live Filters for Camera Feed (CSS Classes)
export const LIVE_FILTERS = [
    { id: 'normal', name: 'Normal', class: 'brightness-100 contrast-100' },
    { id: 'bw', name: 'B&W', class: 'grayscale brightness-110 contrast-120' },
    { id: 'vintage', name: 'Vintage', class: 'sepia-[0.3] contrast-110 brightness-110' },
    { id: 'soft', name: 'Soft', class: 'brightness-110 contrast-90 saturate-90 blur-[0.5px]' },
    { id: 'warm', name: 'Warm', class: 'sepia-[0.2] hue-rotate-[-30deg] saturate-110' },
    { id: 'cool', name: 'Cool', class: 'hue-rotate-[30deg] saturate-110 brightness-105' },
    { id: 'rose', name: 'Rose', class: 'contrast-110 saturate-125 sepia-[0.3] hue-rotate-[-10deg]' }
];

// Editor Filters (CSS Classes applied to captured images)
export const EDITOR_FILTERS = [
    { id: 'normal', name: 'Normal', class: 'brightness-100 contrast-100' },
    { id: 'rose', name: 'Neon Rose', class: 'brightness-110 contrast-110 sepia-[0.2] hue-rotate-[-330deg] saturate-150' },
    { id: 'vintage', name: 'Midnight', class: 'brightness-75 contrast-150 saturate-150 hue-rotate-[180deg]' },
    { id: 'bw', name: 'Noir Glow', class: 'grayscale brightness-125 contrast-125 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' },
    { id: 'dreamy', name: 'Cyberpunk', class: 'hue-rotate-[290deg] saturate-200 contrast-110' },
    { id: 'soft', name: 'Soft', class: 'brightness-110 contrast-90 saturate-90 blur-[0.5px]' }
];

// Sticker Library
export const STICKER_LIBRARY = ['❤️', '✨', '🌹', '🎀', '💌', '🧸', '💋', '💍', '🥂', '🦢', '🐰', '🍰', '🍭', '🍓', '🍒'];

// Frame Color Palette
export const FRAME_COLORS = [
    '#FFFFFF', // White
    '#FFD1DC', // Pastel Pink 
    '#E6E6FA', // Lavender
    '#F0F4F8', // Alice Blue
    '#A7C7E7', // Pastel Blue
    '#FDFD96', // Pastel Yellow
    '#FFB7B2', // Melon
    '#E2F0CB', // Tea Green
    '#FF2E63', // Neon Pink (Vibrant)
    '#08D9D6'  // Neon Cyan (Vibrant)
];

// Frame Style Categories
export const FRAME_CATEGORIES = [
    { id: 'none', label: 'None', style: {} },
    { id: 'simple', label: 'Simple', style: { border: '12px solid white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' } },
    { id: 'pastel', label: 'Pastel', style: { padding: '12px', backgroundColor: '#FFF0F5', border: '3px solid #FFB7B2' } },
    { id: 'cute', label: 'Cute', style: { border: '8px dashed #FFD1DC', borderRadius: '24px', padding: '4px' } },
    { id: 'neon', label: 'Neon', style: { border: '5px solid #FF2E63', boxShadow: '0 0 20px #FF2E63, inset 0 0 10px #FF2E63' } },
    { id: 'polaroid', label: 'Polaroid', style: { padding: '16px 16px 60px 16px', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' } },
    { id: 'love', label: 'Love', style: { border: '8px double #FF69B4', borderRadius: '12px' } }
];

// Google Fonts Options
export const FONT_FAMILIES = [
    { id: 'outfit', name: 'Modern', value: "'Outfit', sans-serif" },
    { id: 'pacifico', name: 'Handwritten', value: "'Pacifico', cursive" },
    { id: 'fredoka', name: 'Cute', value: "'Fredoka', sans-serif" },
    { id: 'dancing', name: 'Elegant', value: "'Dancing Script', cursive" },
    { id: 'bangers', name: 'Comic', value: "'Bangers', system-ui" }
];

// Gradient Presets for Frames
export const GRADIENT_PRESETS = [
    'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)', // Warm Peach
    'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)', // Lavender Dream
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)', // Aqua Splash
    'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)', // Sunset Vibes
    'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)', // Fresh Mint
    'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)'  // Cloud Nine
];

// Frame Patterns (CSS Backgrounds)
export const FRAME_PATTERNS = [
    { id: 'checkers', name: 'Checkers', value: 'repeating-conic-gradient(#fff 0% 25%, #E5E5F7 0% 50%) 50% / 20px 20px' },
    { id: 'grid', name: 'Grid', value: 'radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px) 50% / 10px 10px' },
    { id: 'dots', name: 'Polka', value: 'radial-gradient(#CE7E5A 2px, transparent 2px) 0 0 / 15px 15px' },
    { id: 'diagonal', name: 'Stripes', value: 'repeating-linear-gradient(45deg, #FFD1DC, #FFD1DC 10px, #ffffff 10px, #ffffff 20px)' },
    { id: 'hearts', name: 'Hearts', value: 'radial-gradient(circle at 60% 60%, #ffb7b2 2px, transparent 2.5px) 0 0 / 10px 10px, radial-gradient(circle at 40% 40%, #ffb7b2 2px, transparent 2.5px) 5px 5px / 12px 12px' } // Simplified hearts/sparkles abstract
];
