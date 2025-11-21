import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Manifesto: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  const text = "Odrzucamy przeciętność. Projektujemy chaos. Doświadczenia cyfrowe nie powinny być tylko oglądane — powinny być odczuwane. Gwałtowne. Piękne. Trwałe.";
  const words = text.split(" ");

  return (
    <section id="studio" className="py-40 px-4 min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden border-y border-white/10">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
             backgroundSize: '40px 40px' 
           }} 
      />

      <motion.div 
        style={{ scale, rotate }}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-8 md:gap-y-4 leading-none">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0, skewY: 10 }}
              whileInView={{ y: 0, opacity: 1, skewY: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.02,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              viewport={{ once: true, margin: "-10%" }}
              className={`text-5xl md:text-8xl lg:text-9xl font-black uppercase ${
                ['chaos.', 'gwałtowne.', 'odczuwane.'].includes(word.toLowerCase()) 
                  ? 'text-[#ccff00] acid-glow' 
                  : 'text-white'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div className="mt-20 flex gap-4 uppercase tracking-widest font-mono text-xs text-white/40">
         <span>Przewiń</span>
         <span>///</span>
         <span>Odkryj</span>
         <span>///</span>
         <span>Zakłóć</span>
      </div>
    </section>
  );
};