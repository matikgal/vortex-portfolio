import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Cpu, Code, Scan } from 'lucide-react';
import { Project } from '../types';

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const col1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [400, -200]);

  return (
    <section id="work" className="py-32 px-2 md:px-8 relative z-10 bg-[#050505]" ref={containerRef}>
      
      {/* Vertical floating text background */}
      <div className="absolute top-0 left-12 h-full hidden md:block overflow-hidden pointer-events-none z-0 opacity-10">
        <motion.div style={{ y: col1Y }} className="text-9xl font-bold text-stroke whitespace-nowrap writing-vertical-rl rotate-180">
          WYBRANE_PRACE WYBRANE_PRACE
        </motion.div>
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        <div className="mb-32 pl-8 md:pl-32">
          <h2 className="text-7xl md:text-9xl font-bold text-white mb-4 uppercase">
            Indeks<br/><span className="text-[#ccff00] ml-20 italic">Projektów</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 w-full">
          {/* Column 1 */}
          <motion.div style={{ y: col1Y }} className="flex flex-col gap-24 md:pt-0">
            {PROJECTS.filter((_, i) => i % 2 === 0).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i * 2} />
            ))}
          </motion.div>

          {/* Column 2 - Offset */}
          <motion.div style={{ y: col2Y }} className="flex flex-col gap-24 md:mt-48">
            {PROJECTS.filter((_, i) => i % 2 !== 0).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={(i * 2) + 1} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const RotatingBadge = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-40 pointer-events-none opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500">
        <div className="relative w-full h-full animate-[spin_4s_linear_infinite]">
            <svg viewBox="0 0 100 100" width="100" height="100" className="w-full h-full overflow-visible">
                <defs>
                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text fontSize="12" fill="#ccff00" fontWeight="bold" letterSpacing="2">
                    <textPath xlinkHref="#circle">
                        ZOBACZ PROJEKT • ZOBACZ PROJEKT •
                    </textPath>
                </text>
            </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <ArrowUpRight className="w-8 h-8 text-black bg-[#ccff00] rounded-full p-1" />
        </div>
    </div>
);

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      className="group relative cursor-none hover-trigger perspective-1000"
    >
      {/* Project Number */}
      <div className="absolute -left-12 top-12 text-[#ccff00] font-mono text-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        (0{index + 1})
      </div>

      <RotatingBadge />

      <div className="overflow-hidden relative aspect-[3/4] mb-4 border border-white/10 bg-[#111] transition-all duration-500 group-hover:border-[#ccff00]">
        {/* Image Container with Rotation Effect */}
        <div className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2 origin-center">
            <div className="absolute inset-0 bg-[#ccff00] opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10 mix-blend-multiply" />
            <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
        </div>

        {/* Tech Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-[#ccff00] p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] z-30">
            <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-white uppercase text-lg">Specyfikacja Techniczna</h4>
                <Scan className="text-[#ccff00] w-5 h-5 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4 font-mono text-xs text-[#ccff00]/80">
                <div className="flex items-center gap-2">
                    <Code size={12} />
                    <span>React / Three.js</span>
                </div>
                <div className="flex items-center gap-2">
                    <Cpu size={12} />
                    <span>WebGL 2.0</span>
                </div>
                <div className="col-span-2 border-t border-white/10 pt-2 mt-2 text-white/50">
                    RENDER_TIME: 16ms<br/>
                    POLY_COUNT: 1.2M
                </div>
            </div>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ y: 0 }}
          whileHover={{ y: -50 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-4xl md:text-5xl font-bold uppercase mb-2 group-hover:text-[#ccff00] transition-colors">{project.title}</h3>
          <p className="text-white/50 font-mono uppercase tracking-widest text-sm">{project.category} // {project.year}</p>
        </motion.div>
        
        <motion.div
           className="absolute top-full left-0 w-full"
           initial={{ y: 50 }}
           whileHover={{ y: -80 }} // Moves up into view
           transition={{ duration: 0.4 }}
        >
           <h3 className="text-4xl md:text-5xl font-bold uppercase mb-2 text-transparent text-stroke-heavy">{project.title}</h3>
        </motion.div>
      </div>
    </motion.div>
  )
}