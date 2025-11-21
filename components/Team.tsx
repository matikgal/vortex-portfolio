import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TEAM } from '../constants';

export const Team: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="py-32 px-4 md:px-12 bg-[#050505] border-y border-white/10 overflow-hidden">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Heading Area */}
            <div className="md:col-span-4 flex flex-col justify-center sticky top-32 h-fit">
                <h2 className="text-7xl font-black uppercase mb-8 leading-none">
                    Nasz<br/>
                    <span className="text-transparent text-stroke-heavy">Zespół</span>
                </h2>
                <p className="text-xl text-white/60 uppercase font-mono max-w-xs">
                    Ludzie łączący się z maszynami, by tworzyć niemożliwe.
                </p>
                
                <div className="mt-12 w-24 h-24 rounded-full border border-[#ccff00] flex items-center justify-center animate-spin-slow">
                    <div className="w-2 h-2 bg-[#ccff00]" />
                </div>
            </div>

            {/* Grid Area */}
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-16 md:mt-0">
                {TEAM.map((member, i) => (
                    <motion.div 
                        key={i}
                        style={{ y: i % 2 === 0 ? 0 : y }}
                        className={`relative ${i === 1 ? 'md:mt-32' : ''}`}
                    >
                        <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 mb-4 group">
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-[#ccff00] mix-blend-overlay opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        </div>
                        
                        <h3 className="text-4xl font-bold uppercase">{member.name}</h3>
                        <p className="font-mono text-[#ccff00] text-sm tracking-widest uppercase">{member.role}</p>
                    </motion.div>
                ))}
                
                {/* Placeholder for "Join Us" */}
                <div className="relative md:mt-32 flex flex-col justify-center items-center border border-dashed border-white/20 aspect-[4/5] hover:bg-[#ccff00] hover:text-black transition-colors cursor-pointer group">
                    <span className="text-6xl font-black">+</span>
                    <span className="font-mono uppercase tracking-widest mt-4 group-hover:font-bold">Dołącz do nas</span>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};