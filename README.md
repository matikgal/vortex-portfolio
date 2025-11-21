# VORTEX - Awwwards Style Interactive Showcase

## Opis Projektu

VORTEX to w pełni interaktywna strona typu "Awwwards", stworzona jako pokaz zaawansowanych możliwości współczesnego frontendu. Projekt łączy w sobie estetykę brutalizmu i acid design z najnowszymi technologiami webowymi, takimi jak WebGL, aby dostarczyć użytkownikowi unikalne, immersyjne doświadczenie.

Jest to projekt portfolio, który demonstruje umiejętności w zakresie kreatywnego developmentu, animacji 3D, projektowania interakcji oraz tworzenia złożonych, ale wydajnych interfejsów użytkownika.

## Użyte Technologie

Poniżej znajduje się lista kluczowych technologii i bibliotek wykorzystanych w projekcie:

- **Framework:** React
- **Język:** TypeScript
- **Grafika 3D:** Three.js (@react-three/fiber, @react-three/drei)
- **Animacje:** Framer Motion
- **Styling:** Tailwind CSS
- **Płynne Przewijanie:** Lenis
- **Ikony:** Lucide React

## Instalacja i Uruchomienie

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu
npm run preview
```

## Deployment na GitHub Pages

### Automatyczny deployment (zalecany)

Projekt jest skonfigurowany do automatycznego deploymentu na GitHub Pages przy każdym pushu do brancha `main`.

**Kroki:**

1. Upewnij się, że masz repozytorium na GitHubie
2. W ustawieniach repozytorium przejdź do **Settings → Pages**
3. W sekcji **Source** wybierz **GitHub Actions**
4. Wypchnij kod na branch `main`:
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```
5. GitHub Actions automatycznie zbuduje i wdroży stronę
6. Strona będzie dostępna pod: `https://matikgal.github.io/vortex-portfolio/`

### Manualny deployment

Możesz też wdrożyć stronę ręcznie:

```bash
npm run deploy
```

## Struktura Projektu

```
vortex/
├── components/          # Komponenty React
│   ├── Scene3D.tsx     # Scena WebGL
│   ├── Hero.tsx        # Sekcja hero
│   ├── Navigation.tsx  # Nawigacja
│   └── ...
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── index.html          # Główny plik HTML
├── index.tsx           # Entry point aplikacji
├── App.tsx             # Główny komponent
└── vite.config.ts      # Konfiguracja Vite
```

## Licencja

Projekt stworzony jako portfolio showcase.
