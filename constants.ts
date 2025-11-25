import { Project, NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
	{ label: 'Manifest', href: '#studio' },
	{ label: 'Możliwości', href: '#services' },
	{ label: 'Projekty', href: '#work' },
	{ label: 'Zespół', href: '#team' },
	{ label: 'Nagrody', href: '#awards' },
	{ label: 'Kontakt', href: '#contact' },
]

export const PROJECTS: Project[] = [
	{
		id: 1,
		title: 'VOID_RUNNER',
		category: 'WebGL / Web3',
		image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=90&w=2000&auto=format&fit=crop',
		year: '2025',
	},
	{
		id: 2,
		title: 'ACID_PROTOCOL',
		category: 'Interfejs DeFi',
		image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=90&w=2000&auto=format&fit=crop',
		year: '2025',
	},
	{
		id: 3,
		title: 'NEON_DEATH',
		category: 'Film Interaktywny',
		image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=90&w=2000&auto=format&fit=crop',
		year: '2024',
	},
	{
		id: 4,
		title: 'CYBER_FLESH',
		category: 'Moda Cyfrowa',
		image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=90&w=2000&auto=format&fit=crop',
		year: '2024',
	},
]

export const SERVICES = [
	{
		id: '01',
		title: 'IMMERSYJNY WEBGL',
		desc: 'Interakcje oparte na fizyce, przeczące logice przeglądarki.',
	},
	{
		id: '02',
		title: 'KREATYWNY DEV',
		desc: 'Kod jako sztuka. Wydajność jako religia.',
	},
	{
		id: '03',
		title: 'STRATEGIA CYFROWA',
		desc: 'Nawigacja w chaosie nowoczesnego webu.',
	},
	{
		id: '04',
		title: 'ANIMACJA 3D',
		desc: 'Renderowanie rzeczywistości, które nie powinny istnieć.',
	},
]

export const AWARDS = [
	{ year: '2025', org: 'AWWWARDS', title: 'Strona Dnia', project: 'Void_Runner' },
	{ year: '2025', org: 'FWA', title: 'FWA Dnia', project: 'Void_Runner' },
	{ year: '2024', org: 'CSS DESIGN', title: 'Najlepsze UI/UX', project: 'Acid_Protocol' },
	{ year: '2024', org: 'AWWWARDS', title: 'Nagroda Deweloperska', project: 'Neon_Death' },
	{ year: '2023', org: 'WEBBY', title: 'Najlepszy Eksperyment', project: 'Cyber_Flesh' },
	{ year: '2023', org: 'FWA', title: 'Doskonałość Mobilna', project: 'Cyber_Flesh' },
]

export const TEAM = [
	{
		name: 'KAI_ZERO',
		role: 'Założyciel / Wizja',
		image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&auto=format&fit=crop&q=90',
	},
	{
		name: 'EVA_CORE',
		role: 'Lead WebGL',
		image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=90',
	},
	{
		name: 'REX_FLUX',
		role: 'Dyr. Kreatywny',
		image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=90',
	},
]
