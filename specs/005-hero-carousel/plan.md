# Implementation Plan: Hero Image Carousel

**Branch**: `005-hero-carousel` | **Date**: 2026-01-29 | **Spec**: [spec.md](./spec.md)

## Summary

Implement a cinematic hero section image carousel that displays 3+ rotating images with smooth cross-fade transitions, left-to-right gradient overlay, animated text overlays, and auto-play functionality (5-second intervals with hover-to-pause). The carousel will replace the current static hero background while preserving existing CTA buttons and scroll indicators. Critical requirements include zero layout shift (CLS=0), 60fps animations, WCAG AA accessibility, and reserved space (60-80px) at the top for a future navigation menu.

## Technical Context

**Language/Version**: TypeScript 5.3+ (strict mode enabled)
**Primary Dependencies**:
- Next.js 15.1.5 (App Router, React 19)
- Framer Motion 12.29.2 (animations)
- Tailwind CSS 4.1.18 (styling)

**Storage**: Static JSON configuration file for carousel slide data (`src/data/carousel.json`)
**Testing**: Manual testing only (per user request - no unit/integration tests required)
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: Web application (Next.js frontend)
**Performance Goals**:
- First Contentful Paint < 1.5s
- 60fps animations (16.67ms per frame)
- Carousel bundle < 10KB gzipped

**Constraints**:
- Must use existing Framer Motion library (no new animation dependencies)
- Zero layout shift during transitions (CLS = 0)
- Reserve 60-80px at top for future navigation menu
- Must maintain existing hero elements (CTA buttons, scroll indicator)

**Scale/Scope**:
- 3-5 carousel slides initially (scalable to more)
- Single component integration into existing Hero section
- Responsive across 3 breakpoints (mobile 320px+, tablet 768px+, desktop 1920px+)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

This feature plan complies with constitutional principles with the following adjustments:

- [x] **Code Quality Excellence**: TypeScript strict mode enforced, Framer Motion patterns established, ESLint compliance required
- [ ] **Testing Standards**: **EXCEPTION GRANTED** - User explicitly requested manual testing only; no automated tests will be written per user directive
- [x] **UX Consistency**: Existing design system maintained (Tailwind classes, color palette, typography), WCAG AA compliance via contrast ratios and prefers-reduced-motion support
- [x] **Performance Requirements**: Performance budgets established (FCP < 1.5s, 60fps, bundle < 10KB, CLS = 0), Core Web Vitals monitored
- [x] **UI Excellence**: Visual hierarchy preserved, 60fps animations, mobile-optimized touch targets, zero visual bugs

**Complexity Justification**:

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Testing Standards (80% coverage) | User explicitly opted for manual testing only | User will perform manual testing; automated tests deemed unnecessary for this feature scope |

## Project Structure

### Documentation (this feature)

```text
specs/005-hero-carousel/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (implementation plan)
├── research.md          # Phase 0 research findings
├── data-model.md        # Phase 1 data model
├── quickstart.md        # Phase 1 developer guide
└── contracts/           # Phase 1 TypeScript interfaces
    └── carousel.types.ts
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx                    # MODIFY - Integrate carousel
│   │   └── HeroCarousel.tsx            # NEW - Carousel component
│   └── ui/
│       └── CarouselSlide.tsx           # NEW - Individual slide component
├── data/
│   └── carousel.json                   # NEW - Slide configuration
├── types/
│   └── carousel.ts                     # NEW - TypeScript interfaces
├── lib/
│   └── carousel-animations.ts          # NEW - Framer Motion variants
└── hooks/
    └── useCarousel.ts                  # NEW - Carousel state management (auto-play/pause logic)

public/
└── images/
    └── carousel/                       # EXISTS - 3 images already present
        ├── Gemini_Generated_Image_8ic3kn8ic3kn8ic3.png
        ├── Gemini_Generated_Image_hxqkybhxqkybhxqk.png
        └── Gemini_Generated_Image_owf50owf50owf50o.png
```

**Structure Decision**: Single web application structure maintained. New carousel components follow existing patterns (`components/sections/` for page sections, `components/ui/` for reusable elements, `hooks/` for custom React hooks). Static data stored in `data/` directory per existing convention (`content.json`, `portfolio.json`, `technologies.json`).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Testing Standards (no automated tests) | User explicitly requested manual testing only for this feature | Automated tests would add development time without user-perceived value; user prefers to manually verify carousel behavior |

---

## Phase 0: Research & Design Decisions

### Research Tasks

1. **Framer Motion Animation Patterns**
   - Research best practices for cross-fade carousel transitions using AnimatePresence
   - Investigate layout shift prevention strategies (layoutId, initial positioning)
   - Document 60fps animation optimization techniques

2. **Carousel State Management**
   - Research auto-play timer patterns with pause/resume functionality
   - Investigate hover detection across desktop/mobile (pointer events API)
   - Document prefers-reduced-motion CSS media query integration

3. **Responsive Image Handling**
   - Research Next.js Image optimization for carousel use cases
   - Investigate object-fit: cover behavior across browsers
   - Document aspect ratio preservation strategies

4. **Gradient Overlay Implementation**
   - Research CSS gradient best practices for smooth rendering (no banding)
   - Investigate z-index layering for image → gradient → text
   - Document contrast ratio calculation methods for WCAG AA compliance

5. **Height Calculation Strategy**
   - Research viewport height calculation approaches (`100vh` vs `100dvh` vs JS)
   - Investigate nav menu space reservation patterns (CSS calc, max-height)
   - Document mobile viewport height quirks (address bar hide/show)

### Expected Research Outputs

**File**: `research.md` - Consolidated findings with:
- Decision matrix for each research area
- Rationale for chosen approaches
- Code examples for critical patterns
- Performance implications documented

---

## Phase 1: Design & Contracts

### Data Model

**File**: `data-model.md`

#### Entity: CarouselSlide

**Purpose**: Represents a single slide in the hero carousel

**Fields**:
- `id` (string, required): Unique identifier for the slide (e.g., "slide-1")
- `image` (string, required): Path to image file relative to `/public` (e.g., "/images/carousel/slide-1.png")
- `imageAlt` (string, required): Accessible description of image for screen readers
- `headline` (string, required): Primary text overlay (5-10 words max)
- `subtitle` (string, optional): Secondary text overlay (10-20 words max)
- `order` (number, required): Display order (0-indexed)

**Validation Rules**:
- `id` must be unique across all slides
- `image` path must point to existing file in `/public/images/carousel/`
- `headline` length: 5-50 characters (enforced in UI, soft limit in data)
- `subtitle` length: 0-100 characters
- `order` must be non-negative integer

**Relationships**:
- Collection of CarouselSlide entities forms the complete carousel
- No dependencies between slides (each slide is independent)

#### Entity: CarouselConfig

**Purpose**: Global carousel behavior configuration

**Fields**:
- `autoPlayInterval` (number, required): Milliseconds between transitions (default: 5000ms)
- `transitionDuration` (number, required): Fade animation duration in ms (default: 800ms)
- `textAnimationDuration` (number, required): Text fade-in duration in ms (default: 500ms)
- `pauseOnHover` (boolean, required): Enable hover-to-pause (default: true)
- `respectReducedMotion` (boolean, required): Disable animations for prefers-reduced-motion (default: true)

**Validation Rules**:
- `autoPlayInterval` must be >= 3000ms (minimum 3 seconds between slides)
- `transitionDuration` must be >= 300ms and <= 1500ms
- `textAnimationDuration` must be >= 300ms and <= 600ms

### API Contracts

**File**: `contracts/carousel.types.ts`

```typescript
/**
 * Represents a single carousel slide with image and text overlay
 */
export interface CarouselSlide {
  id: string;
  image: string;
  imageAlt: string;
  headline: string;
  subtitle?: string;
  order: number;
}

/**
 * Global carousel behavior configuration
 */
export interface CarouselConfig {
  autoPlayInterval: number;
  transitionDuration: number;
  textAnimationDuration: number;
  pauseOnHover: boolean;
  respectReducedMotion: boolean;
}

/**
 * Complete carousel data structure loaded from JSON
 */
export interface CarouselData {
  config: CarouselConfig;
  slides: CarouselSlide[];
}

/**
 * Hook return value for useCarousel custom hook
 */
export interface UseCarouselReturn {
  currentSlide: CarouselSlide;
  currentIndex: number;
  totalSlides: number;
  isPlaying: boolean;
  isPaused: boolean;
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  pause: () => void;
  resume: () => void;
}

/**
 * Props for HeroCarousel component
 */
export interface HeroCarouselProps {
  slides: CarouselSlide[];
  config?: Partial<CarouselConfig>;
  className?: string;
  reservedTopSpace?: number; // Height in px for nav menu (default: 70px)
}

/**
 * Props for CarouselSlide component
 */
export interface CarouselSlideProps {
  slide: CarouselSlide;
  isActive: boolean;
  textAnimationDuration: number;
}
```

**Static Data File**: `src/data/carousel.json`

```json
{
  "config": {
    "autoPlayInterval": 5000,
    "transitionDuration": 800,
    "textAnimationDuration": 500,
    "pauseOnHover": true,
    "respectReducedMotion": true
  },
  "slides": [
    {
      "id": "slide-1",
      "image": "/images/carousel/Gemini_Generated_Image_8ic3kn8ic3kn8ic3.png",
      "imageAlt": "Futuristic armored figure with glowing green chest in red-toned environment",
      "headline": "AI-Powered Engineering",
      "subtitle": "Building intelligent systems that scale",
      "order": 0
    },
    {
      "id": "slide-2",
      "image": "/images/carousel/Gemini_Generated_Image_hxqkybhxqkybhxqk.png",
      "imageAlt": "Blue-toned sci-fi scene with advanced technology elements",
      "headline": "Next-Gen Solutions",
      "subtitle": "Transforming ideas into reality",
      "order": 1
    },
    {
      "id": "slide-3",
      "image": "/images/carousel/Gemini_Generated_Image_owf50owf50owf50o.png",
      "imageAlt": "Advanced armored figure with blue glowing elements in red atmosphere",
      "headline": "Innovation at Scale",
      "subtitle": "Engineering the future, today",
      "order": 2
    }
  ]
}
```

### Developer Quickstart

**File**: `quickstart.md`

```markdown
# Hero Carousel - Developer Guide

## Overview

The hero carousel is a full-width, cinematic image carousel with animated text overlays, auto-play functionality, and accessibility features. It replaces the static hero background while maintaining existing CTA buttons and scroll indicators.

## Quick Start

### 1. Add a New Slide

Edit `src/data/carousel.json`:

\`\`\`json
{
  "slides": [
    // ... existing slides
    {
      "id": "slide-4",
      "image": "/images/carousel/your-image.png",
      "imageAlt": "Descriptive alt text for accessibility",
      "headline": "Your Headline Here",
      "subtitle": "Optional subtitle text",
      "order": 3
    }
  ]
}
\`\`\`

### 2. Add Image File

Place your image in `public/images/carousel/your-image.png`

**Image Requirements**:
- Minimum width: 1920px (for desktop displays)
- Recommended dimensions: 1920x1080 (16:9 aspect ratio)
- Format: WebP preferred (with PNG/JPG fallback)
- File size: < 500KB per image (optimize with tools like Squoosh)

### 3. Test Locally

\`\`\`bash
npm run dev
# Navigate to http://localhost:3000
# Observe carousel auto-play and transitions
\`\`\`

## Configuration

### Adjust Auto-Play Speed

Edit `src/data/carousel.json`:

\`\`\`json
{
  "config": {
    "autoPlayInterval": 5000,  // Change to 3000-10000ms
    "transitionDuration": 800,   // Fade duration (300-1500ms)
    "textAnimationDuration": 500 // Text fade-in (300-600ms)
  }
}
\`\`\`

### Disable Hover-to-Pause

\`\`\`json
{
  "config": {
    "pauseOnHover": false
  }
}
\`\`\`

## Component Architecture

\`\`\`
Hero.tsx (Modified)
└── HeroCarousel.tsx (New)
    ├── useCarousel hook (state management)
    ├── CarouselSlide.tsx (individual slide)
    │   ├── Image with gradient overlay
    │   └── Animated text content
    └── Framer Motion AnimatePresence (transitions)
\`\`\`

## Key Features

- **Auto-play**: 5-second intervals between slides
- **Hover-to-pause**: Desktop only (pointer events)
- **Accessibility**: prefers-reduced-motion support, WCAG AA contrast
- **Performance**: 60fps animations, zero layout shift
- **Responsive**: Mobile-first design with 3 breakpoints

## Troubleshooting

### Carousel not auto-playing

- Check if fewer than 3 slides configured (auto-play disabled for < 3 slides)
- Verify `autoPlayInterval` in config is >= 3000ms
- Check browser console for errors

### Images not loading

- Verify image paths start with `/images/carousel/`
- Ensure files exist in `public/images/carousel/`
- Check file permissions and case sensitivity

### Layout shift during transitions

- Verify carousel container has explicit height
- Check that images use `object-fit: cover`
- Ensure text overlay uses absolute positioning

## Performance Optimization

- Optimize images to < 500KB each (total carousel < 1.5MB)
- Use WebP format with PNG/JPG fallback
- Consider lazy loading for off-screen images (future enhancement)

## Accessibility

- Always provide descriptive `imageAlt` text
- Ensure text contrast ratio >= 4.5:1 (use browser DevTools)
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Verify keyboard navigation works (focus indicators visible)
\`\`\`

---

## Phase 2: Task Breakdown

**NOTE**: Task generation is handled by the `/speckit.tasks` command (separate from `/speckit.plan`). This section outlines the expected task categories only.

### Expected Task Categories

1. **Data Layer Setup**
   - Create TypeScript interfaces (`carousel.types.ts`)
   - Create carousel data file (`carousel.json`)
   - Add sample slide data (3 slides using existing images)

2. **Core Carousel Component**
   - Create `useCarousel` hook (state management, auto-play timer, pause/resume)
   - Create `HeroCarousel` component (container, layout, AnimatePresence)
   - Create `CarouselSlide` component (image, gradient overlay, text)

3. **Animation Implementation**
   - Define Framer Motion variants (`carousel-animations.ts`)
   - Implement cross-fade transitions (exit/enter animations)
   - Implement text fade-in from bottom animation
   - Add prefers-reduced-motion support

4. **Hero Section Integration**
   - Modify `Hero.tsx` to integrate carousel
   - Preserve existing CTA buttons and scroll indicator
   - Adjust z-index layering (carousel → buttons → scroll indicator)
   - Implement height calculation (100vh - 70px for nav space)

5. **Responsive Design**
   - Add mobile styles (320px+ breakpoint)
   - Add tablet styles (768px+ breakpoint)
   - Add desktop styles (1920px+ breakpoint)
   - Test text truncation on narrow viewports

6. **Accessibility & Polish**
   - Add ARIA labels for screen readers
   - Implement keyboard navigation (future: arrow keys)
   - Add focus indicators for interactive elements
   - Test contrast ratios (DevTools + manual verification)

7. **Performance Validation**
   - Run Lighthouse audit (target: 90+ performance score)
   - Verify 60fps animations (Chrome DevTools Performance tab)
   - Check bundle size impact (< 10KB for carousel code)
   - Measure First Contentful Paint (< 1.5s)

8. **Manual Testing**
   - Test auto-play functionality (5-second intervals)
   - Test hover-to-pause (desktop only)
   - Test graceful degradation (< 3 slides)
   - Test prefers-reduced-motion
   - Cross-browser testing (Chrome, Firefox, Safari, Edge)
   - Mobile device testing (iOS Safari, Android Chrome)

---

## Implementation Notes

### Critical Path

1. **Phase 0 Research** → Resolve Framer Motion patterns, height calculation strategy
2. **Phase 1 Design** → Define data model, create TypeScript interfaces
3. **Phase 2 Tasks** → Build carousel component, integrate into Hero, test manually

### Risk Mitigation

**Risk**: Layout shift during image transitions
**Mitigation**: Set explicit container height, use Framer Motion `layoutId`, test with Chrome DevTools CLS metric

**Risk**: Poor performance on mobile devices
**Mitigation**: Optimize images (< 500KB each), use CSS transforms (GPU-accelerated), profile with Lighthouse

**Risk**: Accessibility violations (contrast, motion)
**Mitigation**: Test contrast ratios with DevTools, implement prefers-reduced-motion, add ARIA labels

### Future Enhancements (Out of Scope)

- Manual navigation controls (prev/next buttons, dot indicators)
- Swipe gestures for mobile
- Lazy loading for off-screen images
- Dynamic content loading from CMS/API
- Keyboard navigation (arrow keys)
- Analytics tracking (slide impressions, interaction rates)

---

## Post-Phase 1 Constitution Check

**Re-validation after design phase**:

- [x] **Code Quality Excellence**: TypeScript interfaces defined with strict typing, ESLint rules maintained
- [ ] **Testing Standards**: **EXCEPTION MAINTAINED** - Manual testing approach confirmed per user request
- [x] **UX Consistency**: Design system compliance verified (Tailwind classes, existing color palette), accessibility requirements documented
- [x] **Performance Requirements**: Performance budgets confirmed feasible (FCP < 1.5s achievable with optimized images, 60fps animations validated via research)
- [x] **UI Excellence**: Visual hierarchy maintained (carousel as background layer, CTA buttons prominent), mobile optimization planned

**No new violations introduced during design phase. Ready to proceed to task generation (`/speckit.tasks`).**
