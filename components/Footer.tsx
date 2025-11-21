import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-between py-12 px-4 md:px-12 bg-[#ccff00] text-black relative overflow-hidden">
      
      <div className="w-full border-b border-black/20 pb-8 flex justify-between items-end">
        <span className="font-mono text-sm tracking-widest">(INICJUJ_KONTAKT)</span>
        <span className="font-mono text-sm tracking-widest">V.2025.11</span>
      </div>

      <div className="z-10 my-auto">
        <motion.h2 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[14vw] leading-[0.8] font-black uppercase tracking-tighter hover:tracking-widest transition-all duration-700 cursor-pointer"
        >
            Rozpocznij<br/>Projekt
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-black/20 pt-12 z-10">
        <div className="col-span-1 md:col-span-2">
            <p className="text-2xl md:text-4xl font-bold max-w-md leading-tight">
                Gotowi, by zepsuć internet? Czekamy na sygnał.
            </p>
        </div>
        <div>
            <h3 className="font-mono text-sm uppercase mb-4 opacity-50">Koordynaty</h3>
            <ul className="space-y-1 text-xl font-bold uppercase">
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">Twitter / X</a></li>
                <li><a href="#" className="hover:underline">LinkedIn</a></li>
            </ul>
        </div>
        <div>
            <h3 className="font-mono text-sm uppercase mb-4 opacity-50">Transmisja</h3>
            <a href="mailto:hello@vortex.com" className="text-xl md:text-2xl font-bold uppercase hover:bg-black hover:text-[#ccff00] transition-colors px-2 -ml-2">
                hello@vortex.com
            </a>
        </div>
      </div>

      {/* Giant background decoration */}
      <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-[80vw] h-[80vw] rounded-full border-[2px] border-black/10 pointer-events-none animate-pulse" />
    </section>
  );
};