import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NAV_ITEMS } from '../constants'

export const Navigation: React.FC = () => {
	const [activeSection, setActiveSection] = useState('')
	const [navColor, setNavColor] = useState('white')
	const [showLogo, setShowLogo] = useState(true)

	// Hide logo on scroll (mobile only)
	useEffect(() => {
		const handleLogoVisibility = () => {
			const scrollPosition = window.scrollY
			setShowLogo(scrollPosition < 100)
		}

		window.addEventListener('scroll', handleLogoVisibility)
		return () => window.removeEventListener('scroll', handleLogoVisibility)
	}, [])

	// Detect background color based on scroll position
	useEffect(() => {
		const handleColorChange = () => {
			const windowHeight = window.innerHeight

			// Check if we're in a yellow section (services section)
			const servicesSection = document.getElementById('services')
			if (servicesSection) {
				const rect = servicesSection.getBoundingClientRect()
				if (rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2) {
					setNavColor('black')
					return
				}
			}

			setNavColor('white')
		}

		window.addEventListener('scroll', handleColorChange)
		handleColorChange() // Initial check
		return () => window.removeEventListener('scroll', handleColorChange)
	}, [])

	// Scroll spy to detect active section
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY

			// Simple check to clear active state at top
			if (scrollPosition < 100) {
				setActiveSection('')
				return
			}

			// Check which section is currently in view
			NAV_ITEMS.forEach(item => {
				const sectionId = item.href.replace('#', '')
				const element = document.getElementById(sectionId)

				if (element) {
					const { offsetTop, offsetHeight } = element
					// If we are within the section (with some buffer for the header)
					if (scrollPosition >= offsetTop - 200 && scrollPosition < offsetTop + offsetHeight - 200) {
						setActiveSection(item.href)
					}
				}
			})
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault()
		const targetId = href.replace('#', '')
		const elem = document.getElementById(targetId)

		if (elem) {
			elem.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}

	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 1, delay: 0.5 }}
			className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 md:py-8 backdrop-blur-md bg-black/30 md:bg-transparent md:backdrop-blur-none border-b border-white/10 md:border-none">
			{/* Mobile Layout */}
			<div className="md:hidden flex flex-col items-center gap-3">
				{/* Logo - shows only at top */}
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: showLogo ? 1 : 0, height: showLogo ? 'auto' : 0 }}
					transition={{ duration: 0.3 }}
					className="overflow-hidden">
					<div className="text-xl font-black tracking-tighter font-syne text-white leading-none cursor-default">
						VORTEX
					</div>
					<div className="text-[9px] font-mono tracking-widest text-[#ccff00] mt-1 text-center">
						ZAŁ. 2025 // SYSTEM.AKTYWNY
					</div>
				</motion.div>

				{/* Links */}
				<ul className="flex flex-row flex-wrap justify-center gap-x-3 gap-y-1">
					{NAV_ITEMS.map((item, i) => {
						const isActive = activeSection === item.href
						return (
							<li key={item.label}>
								<motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.8 + i * 0.1 }}>
									<a
										href={item.href}
										onClick={e => handleScrollClick(e, item.href)}
										className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
											isActive ? 'text-[#ccff00]' : 'text-white hover:text-[#ccff00]'
										}`}>
										{item.label}
									</a>
								</motion.div>
							</li>
						)
					})}
				</ul>
			</div>

			{/* Desktop Layout - Full with mix-blend-difference */}
			<div className="hidden md:flex md:flex-row md:justify-between md:items-start mix-blend-difference">
				<div className="flex flex-col items-start">
					<div className="text-3xl font-black tracking-tighter font-syne leading-none cursor-default text-white">
						VORTEX
					</div>
					<div className="text-[10px] font-mono tracking-widest text-white mt-1">ZAŁ. 2025 // SYSTEM.AKTYWNY</div>
				</div>

				<ul className="flex flex-col items-end gap-2">
					{NAV_ITEMS.map((item, i) => {
						const isActive = activeSection === item.href
						return (
							<li key={item.label}>
								<motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.8 + i * 0.1 }}>
									<a
										href={item.href}
										onClick={e => handleScrollClick(e, item.href)}
										className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 group relative flex items-center justify-end gap-2 text-white ${
											isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
										}`}>
										<span
											className={`h-[1px] bg-white transition-all duration-300 ${
												isActive ? 'w-8' : 'w-0 group-hover:w-4'
											}`}></span>
										{item.label}
									</a>
								</motion.div>
							</li>
						)
					})}
				</ul>
			</div>
		</motion.nav>
	)
}
