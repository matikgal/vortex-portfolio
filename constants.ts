import { Project, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Manifest', href: '#studio' },
  { label: 'Możliwości', href: '#services' },
  { label: 'Projekty', href: '#work' },
  { label: 'Nagrody', href: '#awards' },
  { label: 'Kontakt', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "VOID_RUNNER",
    category: "WebGL / Web3",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    year: "2025"
  },
  {
    id: 2,
    title: "ACID_PROTOCOL",
    category: "Interfejs DeFi",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop",
    year: "2025"
  },
  {
    id: 3,
    title: "NEON_DEATH",
    category: "Film Interaktywny",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    year: "2024"
  },
  {
    id: 4,
    title: "CYBER_FLESH",
    category: "Moda Cyfrowa",
    image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1000&auto=format&fit=crop",
    year: "2024"
  }
];

export const SERVICES = [
  {
    id: "01",
    title: "IMMERSYJNY WEBGL",
    desc: "Interakcje oparte na fizyce, przeczące logice przeglądarki."
  },
  {
    id: "02",
    title: "KREATYWNY DEV",
    desc: "Kod jako sztuka. Wydajność jako religia."
  },
  {
    id: "03",
    title: "STRATEGIA CYFROWA",
    desc: "Nawigacja w chaosie nowoczesnego webu."
  },
  {
    id: "04",
    title: "ANIMACJA 3D",
    desc: "Renderowanie rzeczywistości, które nie powinny istnieć."
  }
];

export const AWARDS = [
  { year: "2025", org: "AWWWARDS", title: "Strona Dnia", project: "Void_Runner" },
  { year: "2025", org: "FWA", title: "FWA Dnia", project: "Void_Runner" },
  { year: "2024", org: "CSS DESIGN", title: "Najlepsze UI/UX", project: "Acid_Protocol" },
  { year: "2024", org: "AWWWARDS", title: "Nagroda Deweloperska", project: "Neon_Death" },
  { year: "2023", org: "WEBBY", title: "Najlepszy Eksperyment", project: "Cyber_Flesh" },
  { year: "2023", org: "FWA", title: "Doskonałość Mobilna", project: "Cyber_Flesh" },
];

export const TEAM = [
  { name: "KAI_ZERO", role: "Założyciel / Wizja", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80" },
  { name: "EVA_CORE", role: "Lead WebGL", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80" },
  { name: "REX_FLUX", role: "Dyr. Kreatywny", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80" }
];