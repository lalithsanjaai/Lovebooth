import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, RotateCw, Move } from 'lucide-react';

const DraggableElement = ({ id, content, type, x, y, scale = 1, rotation = 0, onDelete, onUpdate, isSelected, onSelect }) => {
  const constraintsRef = useRef(null); // In a real app, this would be the parent container

  const handleDragEnd = (_, info) => {
    onUpdate(id, { x: x + info.offset.x, y: y + info.offset.y });
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      // Use animate to ensure state updates (rotation/scale) differ from initial mount
      animate={{ x, y, scale, rotate: rotation }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={(e) => { e.stopPropagation(); onSelect(id); }}
        // Note: Real updating of x/y on drag end requires visual syncing or lifting state properly. 
      // For this simplified version we rely on Framer Motion's visual state but updating store on final save would needed.
      // Here we just allow visual manipulation.
      className={`absolute cursor-move group ${isSelected ? 'z-50' : 'z-30'}`}
      style={{ left: 0, top: 0, touchAction: 'none' }} 
    >
      <div className={`relative ${isSelected ? 'ring-2 ring-deep-rose rounded-lg' : ''} p-2`}>
        {/* Delete Button - Optimized Touch Target */}
        {isSelected && (
          <div 
            className="absolute -top-6 -right-6 w-12 h-12 flex items-center justify-center z-50 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onDelete(id); }}
            onTouchEnd={(e) => { e.stopPropagation(); onDelete(id); }}
          >
              <div className="bg-deep-rose text-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
                <X size={16} />
              </div>
          </div>
        )}

        {/* Content Rendering Switch - Defensive Coding */}
        <div className="select-none pointer-events-none drop-shadow-md">
            {type === 'image' && typeof content === 'string' && (
                <img 
                    src={content} 
                    alt="sticker" 
                    className="w-32 h-32 object-contain" 
                    draggable={false}
                />
            )}
            
            {(type === 'sticker' || (type === 'image' && typeof content !== 'string')) && (
                <div className="text-6xl">{typeof content === 'string' ? content : '✨'}</div>
            )}

            {type === 'text' && (
                 <div 
                    className="whitespace-nowrap font-bold" 
                    style={{ 
                        fontSize: '2rem',
                        fontFamily: (content && typeof content === 'object' && content.font) || 'sans-serif',
                        color: (content && typeof content === 'object' && content.color) || '#FF2E63',
                        fontWeight: (content && typeof content === 'object' && content.bold) ? 'bold' : 'normal',
                        fontStyle: (content && typeof content === 'object' && content.italic) ? 'italic' : 'normal',
                    }}
                >
                    {content && typeof content === 'object' && content.text ? content.text : (typeof content === 'string' ? content : '')}
                </div>
            )}

            {type === 'date-stamp' && (
                 <div 
                    className="whitespace-nowrap font-mono tracking-widest select-none" 
                    style={{ 
                        fontSize: '1.5rem',
                        fontFamily: "'Courier New', monospace",
                        color: '#ff4500', // Classic Film Orange
                        textShadow: '0 0 5px rgba(255, 69, 0, 0.6)',
                        fontWeight: 'bold'
                    }}
                >
                    {content && content.text ? content.text : content}
                </div>
            )}
        </div>

        {/* Resize Handle (Bottom-Left) - Optimized Touch Target */}
        {isSelected && (
            <div 
                className="absolute -bottom-6 -left-6 w-12 h-12 flex items-center justify-center z-50 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    const sizes = [0.5, 0.8, 1, 1.2, 1.5, 2.0];
                    const nextIndex = (sizes.indexOf(scale) + 1) % sizes.length;
                    onUpdate(id, { scale: sizes[nextIndex] || 1.2 });
                }}
                onTouchEnd={(e) => {
                    e.stopPropagation(); // prevent drag end
                    const sizes = [0.5, 0.8, 1, 1.2, 1.5, 2.0];
                    const nextIndex = (sizes.indexOf(scale) + 1) % sizes.length;
                    onUpdate(id, { scale: sizes[nextIndex] || 1.2 });
                }}
            >
                <div className="bg-accent-blue text-white rounded-full p-2 shadow-lg hover:scale-110 active:scale-95 transition-transform">
                    <Move size={16} className="rotate-45" />
                </div>
            </div>
        )}

        {/* Rotate Handle (Bottom-Right) - Optimized Touch Target */}
        {isSelected && (
            <div 
                className="absolute -bottom-6 -right-6 w-12 h-12 flex items-center justify-center z-50 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    onUpdate(id, { rotation: (rotation + 45) % 360 });
                }}
                onTouchEnd={(e) => {
                     e.stopPropagation();
                     onUpdate(id, { rotation: (rotation + 45) % 360 });
                }}
            >
                <div className="bg-midnight text-white rounded-full p-2 shadow-lg hover:scale-110 active:scale-95 transition-transform">
                    <RotateCw size={16} />
                </div>
            </div>
        )}
      </div>
    </motion.div>
  );
};

export default DraggableElement;
