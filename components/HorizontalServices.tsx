import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SERVICES } from '../constants';

export const HorizontalServices: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Increased height from 150vh to 500vh to make the scroll much slower and smoother
  const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-85%" : "-50%"]);

  return (
    <section ref={targetRef} id="services" className="relative h-[500vh] bg-[#ccff00]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 pl-20">
          
          <div className="flex flex-col justify-center min-w-[80vw] md:min-w-[40vw]">
             <h2 className="text-black text-8xl md:text-[10rem] font-black leading-[0.8] uppercase tracking-tighter">
                Nasze<br/>Systemy<br/>Główne
             </h2>
             <p className="mt-8 text-black font-mono text-xl uppercase tracking-widest max-w-md">
                Wdrażanie kreatywności klasy wojskowej do sieci konsumenckiej.
             </p>
          </div>

          {SERVICES.map((service) => (
            <div key={service.id} className="group relative h-[70vh] w-[80vw] md:w-[40vw] flex flex-col justify-between border-l-2 border-black p-8 md:p-12 hover:bg-black/5 transition-colors duration-500">
              <div className="flex justify-between items-start">
                 <span className="text-black font-mono text-2xl">({service.id})</span>
                 <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-[#ccff00] transition-all duration-300">
                    →
                 </div>
              </div>
              
              <div>
                <h3 className="text-6xl md:text-8xl font-bold text-black mb-8 uppercase leading-none group-hover:skew-x-6 transition-transform duration-500 origin-left">
                    {service.title}
                </h3>
                <div className="w-full h-[2px] bg-black mb-4" />
                <p className="text-black font-bold text-2xl md:text-3xl uppercase opacity-80">
                    {service.desc}
                </p>
              </div>
            </div>
          ))}
          
          {/* Spacer at the end */}
          <div className="min-w-[10vw]" />
        </motion.div>
      </div>
    </section>
  );
};