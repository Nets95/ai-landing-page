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

---

## Neon Cyberpunk Design System (Extended from Carousel)

**Added**: 2026-01-29 | **Origin**: 005-hero-carousel

The neon cyberpunk text styling initially implemented for carousel overlays has been extended site-wide, creating a unified futuristic brand identity.

### Color Palette

| Color | Value | Usage |
|-------|-------|-------|
| **Cyan Primary** | `rgb(34, 211, 238)` / `text-cyan-400` | Main headings, primary emphasis |
| **Cyan Subtle** | `rgb(103, 232, 249)` / `text-cyan-300` | Body text, navigation, labels |
| **Cyan Dark** | `rgb(6, 182, 212)` / `border-cyan-500` | Borders, accents |
| **Magenta** | `rgb(236, 72, 153)` / `text-pink-500` | Special highlights |
| **Purple** | `rgb(168, 85, 247)` / `text-purple-500` | Badge variations |

### Text Glow Levels

**Primary Heading Glow** (h1, h2):
```css
text-shadow: 
  0 0 10px rgba(34, 211, 238, 0.8),
  0 0 20px rgba(34, 211, 238, 0.6),
  0 0 30px rgba(34, 211, 238, 0.4),
  0 0 40px rgba(6, 182, 212, 0.3);
```

**Subtitle Glow** (h3, card titles):
```css
text-shadow: 
  0 0 8px rgba(103, 232, 249, 0.7),
  0 0 15px rgba(103, 232, 249, 0.5),
  0 0 25px rgba(103, 232, 249, 0.3);
```

**Subtle Glow** (labels, body text):
```css
text-shadow: 
  0 0 5px rgba(103, 232, 249, 0.5),
  0 0 10px rgba(103, 232, 249, 0.3);
```

### Card/Border Glows

**Default Card**:
```css
border: 1px solid rgba(6, 182, 212, 0.3);
box-shadow: 
  0 0 10px rgba(6, 182, 212, 0.2),
  0 0 20px rgba(6, 182, 212, 0.1),
  inset 0 0 10px rgba(6, 182, 212, 0.05);
```

**Card Hover**:
```css
border: 1px solid rgba(6, 182, 212, 0.6);
box-shadow: 
  0 0 15px rgba(6, 182, 212, 0.4),
  0 0 30px rgba(6, 182, 212, 0.2),
  inset 0 0 15px rgba(6, 182, 212, 0.1);
```

### Quick Reference Patterns

**Large Heading**:
```tsx
<h2
  className="text-5xl md:text-6xl font-bold text-cyan-400 uppercase tracking-wide"
  style={{
    textShadow: '0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(34, 211, 238, 0.6)',
  }}
>
  Heading
</h2>
```

**Button (Primary)**:
```tsx
<button
  className="px-6 py-3 bg-cyan-500/20 border border-cyan-500 text-cyan-400 
             uppercase tracking-wide rounded-lg"
  style={{
    textShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
    boxShadow: '0 0 15px rgba(6, 182, 212, 0.4), inset 0 0 15px rgba(6, 182, 212, 0.1)',
  }}
>
  Button
</button>
```

**Badge/Tag**:
```tsx
<span
  className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/50 text-cyan-300 
             text-sm uppercase tracking-wide rounded-lg"
  style={{ textShadow: '0 0 5px rgba(103, 232, 249, 0.4)' }}
>
  Badge
</span>
```

### Global Utility Classes (globals.css)

- `.neon-text-cyan` - Primary heading glow
- `.neon-text-cyan-subtle` - Subtitle glow
- `.neon-text-magenta` - Magenta accent glow
- `.neon-text-purple` - Purple accent glow
- `.neon-glow-cyan` - Box-shadow glow
- `.neon-glow-magenta` - Magenta box-shadow

### Components Using Neon Styling

- **Header**: Logo, navigation links
- **Hero**: Carousel text (original), scroll indicator
- **TechShowcase**: Headings, filters, technology cards
- **Portfolio**: Headings, filters, portfolio cards, modal
- **Contact**: Headings, form labels, social links
- **Footer**: Navigation, social icons, copyright
- **Buttons**: All primary and secondary buttons
- **Cards**: All card components (technology, portfolio, contact)
- **Forms**: Labels, success messages

### Documentation

Complete design system documentation available at:
- **[specs/005-hero-carousel/design-system.md](specs/005-hero-carousel/design-system.md)** - Comprehensive styling guide
- **[specs/005-hero-carousel/quickstart.md](specs/005-hero-carousel/quickstart.md)** - Quick reference with copy-paste patterns
- **[specs/005-hero-carousel/spec.md](specs/005-hero-carousel/spec.md)** - Site-wide extension details

### Accessibility

- All text maintains WCAG AA compliance (4.5:1+ contrast ratios)
- Neon effects are decorative CSS (screen reader compatible)
- `prefers-reduced-motion` support maintained
- No performance impact (GPU-accelerated text-shadow)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
