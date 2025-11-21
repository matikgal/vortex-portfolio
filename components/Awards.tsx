import React from 'react';
import { motion } from 'framer-motion';
import { AWARDS } from '../constants';

export const Awards: React.FC = () => {
  return (
    <section id="awards" className="py-32 px-4 md:px-12 bg-[#050505] text-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/20 pb-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Uznanie</h2>
            <p className="font-mono text-[#ccff00] text-xl uppercase tracking-widest mt-4 md:mt-0">Globalne Wyróżnienia</p>
        </div>

        <div className="flex flex-col">
            {AWARDS.map((award, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex flex-col md:flex-row items-baseline md:items-center justify-between py-8 md:py-12 border-b border-white/10 hover:border-black transition-colors duration-300 relative overflow-hidden cursor-pointer text-white hover:text-black"
                >
                    {/* Background - removed mix-blend-difference for solid contrast */}
                    <div className="absolute inset-0 bg-[#ccff00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10" />
                    
                    <div className="flex items-baseline gap-8 md:gap-16 relative z-10">
                        <span className="font-mono text-white/50 group-hover:text-black/60 transition-colors">{award.year}</span>
                        <h3 className="text-3xl md:text-5xl font-bold uppercase group-hover:translate-x-4 transition-transform duration-300">{award.org}</h3>
                    </div>
                    
                    <div className="flex items-center gap-4 md:gap-12 mt-4 md:mt-0 relative z-10">
                         <span className="text-lg md:text-2xl font-light uppercase tracking-wide text-white/80 group-hover:text-black transition-colors">{award.title}</span>
                         <span className="hidden md:inline-block w-20 h-[1px] bg-white/30 group-hover:bg-black/30 transition-colors" />
                         <span className="font-mono text-sm text-[#ccff00] group-hover:text-black border border-[#ccff00] group-hover:border-black px-2 py-1 rounded-full transition-colors">{award.project}</span>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};