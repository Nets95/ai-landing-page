# ai-landing Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-26

## Active Technologies
- TypeScript 5.3+ (strict mode per constitution) + Next.js 15.1.5, React 19, Tailwind CSS 4.1.18, Framer Motion 12.29.2 (003-redesign-ui)
- Static JSON files (content.json, technologies.json, portfolio.json) (003-redesign-ui)
- TypeScript 5.3+ (strict mode enabled) (005-hero-carousel)
- Static JSON configuration file for carousel slide data (`src/data/carousel.json`) (005-hero-carousel)

- TypeScript 5.3+ (strict mode for type safety per constitution) (001-ai-engineer-landing)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

## Code Style

TypeScript 5.3+ (strict mode for type safety per constitution): Follow standard conventions

## Recent Changes
- 005-hero-carousel: Added TypeScript 5.3+ (strict mode enabled), Hero image carousel with auto-play, hover-to-pause, text animations, WCAG AA accessibility
- 003-redesign-ui: Added TypeScript 5.3+ (strict mode per constitution) + Next.js 15.1.5, React 19, Tailwind CSS 4.1.18, Framer Motion 12.29.2

- 001-ai-engineer-landing: Added TypeScript 5.3+ (strict mode for type safety per constitution)

## Hero Carousel (005-hero-carousel)

### Components
- `src/components/sections/HeroCarousel.tsx` - Main carousel container with auto-play and hover-to-pause
- `src/components/ui/CarouselSlide.tsx` - Individual slide with image, gradient overlay, and animated text
- `src/hooks/useCarousel.ts` - Custom hook managing carousel state and auto-play
- `src/lib/carousel-animations.ts` - Framer Motion animation variants with reduced motion support
- `src/types/carousel.ts` - TypeScript interfaces and type definitions
- `src/data/carousel.json` - Carousel configuration and slide content

### Features
- Auto-play with 5-second intervals (configurable)
- Hover-to-pause on desktop (pointer events)
- Smooth cross-fade transitions (800ms)
- Text animations with fade + upward motion (500ms)
- Keyboard navigation (Arrow keys, Escape)
- WCAG AA accessibility (screen readers, reduced motion, 4.5:1 contrast)
- Responsive design (mobile-first with dvh viewport units)
- Graceful degradation (auto-play disabled with < 3 slides)
- Zero layout shift (CLS = 0)

### Configuration
Edit `src/data/carousel.json` to customize:
```json
{
  "config": {
    "autoPlayInterval": 5000,      // milliseconds between slides
    "transitionDuration": 800,     // cross-fade duration
    "textAnimationDuration": 500,  // text fade-in duration
    "pauseOnHover": true           // enable hover-to-pause
  }
}
```

### Adding New Slides
Add slide objects to `slides` array in `src/data/carousel.json`:
```json
{
  "id": "slide-4",
  "order": 3,
  "image": "/images/carousel/your-image.png",
  "imageAlt": "Descriptive alt text for accessibility",
  "headline": "Your Headline",
  "subtitle": "Optional subtitle text"
}
```

**Requirements:**
- Minimum 3 slides for auto-play functionality
- Images should be optimized (WebP format, < 500KB each recommended)
- Use descriptive alt text for accessibility (WCAG AA)
- Order determines sequence (0-indexed)

### Keyboard Navigation
- **Tab** - Focus carousel
- **Left Arrow** - Previous slide
- **Right Arrow** - Next slide
- **Escape** - Pause/resume auto-play

### Accessibility Features
- ARIA labels and live regions for screen readers
- Prefers-reduced-motion support (removes translateY motion)
- High contrast text (4.5:1 ratio minimum)
- Semantic HTML with proper heading hierarchy
- Focus indicators for keyboard navigation

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
