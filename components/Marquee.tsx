import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
  speed?: number;
  filled?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', className = '', speed = 20, filled = false }) => {
  
  // We need two copies of the content to create a seamless loop.
  // We animate both copies to the left (or right). When the first copy finishes, 
  // it instantly resets, but because the second copy is identical and in the exact position
  // where the first started, the reset is invisible.
  
  return (
    <div className={`flex overflow-hidden whitespace-nowrap select-none ${className}`}>
      <motion.div
        className="flex shrink-0 gap-8 pr-8 items-center"
        initial={{ x: direction === 'left' ? "0%" : "-100%" }}
        animate={{ x: direction === 'left' ? "-100%" : "0%" }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...Array(4)].map((_, i) => (
           <span 
            key={i} 
            className={`text-7xl sm:text-8xl md:text-[10rem] font-black uppercase font-Anton leading-none ${
              filled 
                ? 'text-current opacity-100' 
                : 'text-stroke opacity-20'
            }`}
          >
            {text}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="flex shrink-0 gap-8 pr-8 items-center"
        initial={{ x: direction === 'left' ? "0%" : "-100%" }}
        animate={{ x: direction === 'left' ? "-100%" : "0%" }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...Array(4)].map((_, i) => (
           <span 
            key={`clone-${i}`} 
            className={`text-7xl sm:text-8xl md:text-[10rem] font-black uppercase font-Anton leading-none ${
              filled 
                ? 'text-current opacity-100' 
                : 'text-stroke opacity-20'
            }`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};