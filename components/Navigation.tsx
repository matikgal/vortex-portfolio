import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../constants';

export const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Simple check to clear active state at top
      if (scrollPosition < 100) {
        setActiveSection('');
        return;
      }

      // Check which section is currently in view
      NAV_ITEMS.forEach((item) => {
        const sectionId = item.href.replace('#', '');
        const element = document.getElementById(sectionId);
        
        if (element) {
            const { offsetTop, offsetHeight } = element;
            // If we are within the section (with some buffer for the header)
            if (scrollPosition >= offsetTop - 200 && scrollPosition < offsetTop + offsetHeight - 200) {
                setActiveSection(item.href);
            }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
        elem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 flex flex-col items-center md:flex-row md:justify-between md:items-start px-4 md:px-8 py-6 md:py-8 mix-blend-difference"
    >
      <div className="flex flex-col items-center md:items-start">
        <div className="text-2xl md:text-3xl font-black tracking-tighter font-syne text-white leading-none cursor-default">
          VORTEX
        </div>
        <div className="text-[10px] font-mono tracking-widest text-[#ccff00] mt-1">
            ZAŁ. 2025 // SYSTEM.AKTYWNY
        </div>
      </div>

      <ul className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-2 mt-6 md:mt-0 md:flex-col md:items-end md:gap-2">
        {NAV_ITEMS.map((item, i) => {
          const isActive = activeSection === item.href;
          
          return (
            <li key={item.label} className="overflow-hidden">
              <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.8 + (i * 0.1) }}
              >
                  <a
                  href={item.href}
                  onClick={(e) => handleScrollClick(e, item.href)}
                  className={`text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 group relative flex items-center justify-end gap-2 ${isActive ? 'text-[#ccff00]' : 'text-white hover:text-[#ccff00]'}`}
                  >
                  {/* Active Indicator Line */}
                  <span className={`h-[1px] bg-[#ccff00] transition-all duration-300 ${isActive ? 'w-8' : 'w-0 group-hover:w-4'}`}></span>
                  
                  {item.label}
                  </a>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};