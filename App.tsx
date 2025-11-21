import React, { Suspense, useState, useEffect } from 'react';
import { Scene3D } from './components/Scene3D';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Manifesto } from './components/Manifesto';
import { Footer } from './components/Footer';
import { HorizontalServices } from './components/HorizontalServices';
import { Awards } from './components/Awards';
import { Team } from './components/Team';
import { Marquee } from './components/Marquee';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 z-[100] bg-[#ccff00] flex flex-col items-center justify-center"
    exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
  >
    <motion.div className="overflow-hidden">
        <motion.h1
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="text-9xl font-black text-black tracking-tighter uppercase"
        >
        ŁADOWANIE
        </motion.h1>
    </motion.div>
    <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: "200px" }} 
        transition={{ duration: 1.5 }}
        className="h-2 bg-black mt-4" 
    />
  </motion.div>
);

const NoiseOverlay = () => (
    <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.04] mix-blend-overlay" 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
    />
)

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
        lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen w-full text-white selection:bg-[#ccff00] selection:text-black">
      <NoiseOverlay />
      
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <Navigation />
          
          <div className="relative z-0">
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
            
            <div className="relative z-10 flex flex-col">
                <Hero />
                
                <Marquee text="ZŁAM SIATKĘ +" direction="left" className="bg-[#ccff00] text-black py-4 rotate-2 scale-105 z-20 border-y-4 border-black" speed={10} filled={true} />
                
                <Manifesto />
                
                <HorizontalServices />
                
                <div className="py-20 bg-[#050505]">
                   <Marquee text="NAGRADZANY DESIGN /// CYFROWY BRUTALIZM ///" direction="right" className="text-white/20" />
                </div>

                <Gallery />
                
                <Team />
                
                <Awards />
                
                {/* Updated Footer Marquee for seamless loop and better styling */}
                <div className="bg-[#ccff00] py-12 border-y-8 border-black relative z-20">
                    <Marquee 
                        text="ROZPOCZNIJ PROJEKT /// INICJUJ PROTOKÓŁ ///" 
                        direction="left" 
                        className="text-black" 
                        speed={25} 
                        filled={true} 
                    />
                </div>
                
                <Footer />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default App;