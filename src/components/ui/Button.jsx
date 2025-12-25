import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  icon: Icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1";
  
  const variants = {
        primary: "bg-pastel-pink text-white border-b-4 border-pink-600 active:border-b-0 active:translate-y-1 hover:brightness-110",
        secondary: "bg-white text-deep-text border-2 border-gray-100 border-b-4 border-gray-200 active:border-b-2 active:translate-y-[2px] hover:bg-gray-50",
        outline: "border-2 border-pastel-pink text-pastel-pink hover:bg-pastel-pink hover:text-white border-b-4 active:border-b-2",
        ghost: "text-gray-500 hover:text-deep-text hover:bg-gray-100/50",
      };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </motion.button>
  );
};

export default Button;
