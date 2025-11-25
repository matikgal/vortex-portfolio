import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Marquee } from './Marquee'

export const Hero: React.FC = () => {
	const { scrollY } = useScroll()
	const y1 = useTransform(scrollY, [0, 500], [0, 200])
	const y2 = useTransform(scrollY, [0, 500], [0, -200])
	const rotate = useTransform(scrollY, [0, 500], [0, 10])

	return (
		<section className="min-h-screen w-full flex flex-col justify-center relative overflow-hidden pt-20 pointer-events-none">
			{/* Background Chaos */}
			<div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
				<Marquee text="SYSTEM VORTEX //" direction="left" className="rotate-12 translate-y-40" />
				<Marquee text="NULL POINTER //" direction="right" className="-rotate-6 translate-y-96" />
			</div>

			<div className="container mx-auto px-4 z-10 relative pointer-events-auto">
				<div className="relative min-h-[60vh] md:min-h-0 flex flex-col justify-center">
					<motion.h1
						initial={{ x: -200, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
						className="text-[18vw] sm:text-[20vw] md:text-[18vw] leading-[0.8] font-black mix-blend-difference text-white relative z-20"
						style={{ x: y1 }}>
						CYFROWY
					</motion.h1>

					<motion.h1
						initial={{ x: 200, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
						className="text-[18vw] sm:text-[20vw] md:text-[18vw] leading-[0.8] font-black text-[#ccff00] relative z-10 -mt-[6vw] sm:-mt-[4vw] ml-[5vw] sm:ml-[10vw] acid-glow"
						style={{ x: y2 }}>
						CHAOS
					</motion.h1>

					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 1, type: 'spring' }}
						className="absolute top-[10%] right-[10%] md:right-[20%] w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-white rounded-full mix-blend-exclusion flex items-center justify-center z-30"
						style={{ rotate }}>
						<p className="text-black font-bold text-sm sm:text-lg md:text-2xl text-center rotate-[-15deg]">
							ODKRYJ
							<br />
							WIĘCEJ
						</p>
					</motion.div>

					{/* Mobile Extra Content */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.2, duration: 0.8 }}
						className="mt-12 md:hidden flex flex-col gap-4">
						<div className="border border-[#ccff00] p-4 backdrop-blur-sm bg-black/30">
							<p className="text-[#ccff00] font-mono text-xs tracking-widest mb-2">SYSTEM_STATUS</p>
							<p className="text-white text-sm">Kreatywne studio cyfrowe łamiące granice możliwego</p>
						</div>

						<div className="flex gap-4">
							<div className="flex-1 border border-white/20 p-3 text-center">
								<p className="text-2xl font-black text-[#ccff00]">25+</p>
								<p className="text-xs text-white/60 font-mono">PROJEKTÓW</p>
							</div>
							<div className="flex-1 border border-white/20 p-3 text-center">
								<p className="text-2xl font-black text-[#ccff00]">10+</p>
								<p className="text-xs text-white/60 font-mono">NAGRÓD</p>
							</div>
							<div className="flex-1 border border-white/20 p-3 text-center">
								<p className="text-2xl font-black text-[#ccff00]">100%</p>
								<p className="text-xs text-white/60 font-mono">CHAOS</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="absolute bottom-8 left-8 flex flex-col gap-2 z-20 pointer-events-auto">
				<div className="w-40 h-[1px] bg-[#ccff00]" />
				<p className="text-[#ccff00] font-mono text-xs tracking-[0.3em]">STATUS SYSTEMU: NIESTABILNY</p>
			</motion.div>

			{/* Vertical Side Elements */}
			<div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 z-20 pointer-events-auto">
				{['01', '02', '03', '04'].map((num, i) => (
					<div key={i} className="w-2 h-2 bg-white/20 rounded-full" />
				))}
			</div>
		</section>
	)
}
