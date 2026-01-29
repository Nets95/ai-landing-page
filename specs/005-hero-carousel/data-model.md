# Data Model: Hero Image Carousel

**Feature**: Hero Image Carousel
**Branch**: 005-hero-carousel
**Last Updated**: 2026-01-29

## Overview

This document defines the data structures for the hero carousel feature, including entities, relationships, validation rules, and state transitions.

---

## Entity Definitions

### 1. CarouselSlide

**Purpose**: Represents a single slide in the hero carousel with associated image and text content.

**Fields**:

| Field | Type | Required | Description | Validation Rules |
|-------|------|----------|-------------|------------------|
| `id` | string | Yes | Unique identifier for the slide | Must be unique across all slides; alphanumeric + hyphens only |
| `image` | string | Yes | Path to image file relative to `/public` | Must start with `/images/carousel/`; file must exist |
| `imageAlt` | string | Yes | Accessible description for screen readers | 10-150 characters; descriptive and meaningful |
| `headline` | string | Yes | Primary text overlay (bold, large) | 5-50 characters; no special formatting |
| `subtitle` | string | No | Secondary text overlay (smaller) | 0-100 characters; optional |
| `order` | number | Yes | Display order (0-indexed) | Non-negative integer; must be sequential |

**Example**:
```json
{
  "id": "slide-1",
  "image": "/images/carousel/hero-ai-engineering.png",
  "imageAlt": "Futuristic AI technology interface with neural networks",
  "headline": "AI-Powered Engineering",
  "subtitle": "Building intelligent systems that scale",
  "order": 0
}
```

**Business Rules**:
- Each slide must have a unique `id` (enforced at data load time)
- `order` values should be sequential (0, 1, 2, ...) for predictable behavior
- Missing or invalid images should log warnings but not crash the application
- Text content (headline + subtitle) should fit within gradient overlay area (soft limit, not enforced)

**State Lifecycle**:
- **Loaded**: Slide data parsed from JSON, validated
- **Preloading**: Image asset loading initiated
- **Ready**: Image loaded, ready to display
- **Active**: Currently visible in carousel
- **Transitioning Out**: Fading out during slide change
- **Inactive**: Not currently visible

---

### 2. CarouselConfig

**Purpose**: Global configuration for carousel behavior and animation settings.

**Fields**:

| Field | Type | Required | Default | Description | Validation Rules |
|-------|------|----------|---------|-------------|------------------|
| `autoPlayInterval` | number | Yes | 5000 | Milliseconds between auto-advance | >= 3000ms (3 seconds minimum) |
| `transitionDuration` | number | Yes | 800 | Cross-fade animation duration (ms) | 300-1500ms |
| `textAnimationDuration` | number | Yes | 500 | Text fade-in duration (ms) | 300-600ms |
| `pauseOnHover` | boolean | Yes | true | Enable hover-to-pause on desktop | true or false |
| `respectReducedMotion` | boolean | Yes | true | Disable animations for prefers-reduced-motion | true or false |

**Example**:
```json
{
  "autoPlayInterval": 5000,
  "transitionDuration": 800,
  "textAnimationDuration": 500,
  "pauseOnHover": true,
  "respectReducedMotion": true
}
```

**Business Rules**:
- `autoPlayInterval` must allow users adequate reading time (minimum 3 seconds)
- `transitionDuration` must be shorter than `autoPlayInterval` to prevent overlap
- `textAnimationDuration` must complete before next slide transition
- If `respectReducedMotion` is true, check `prefers-reduced-motion` media query at runtime

---

### 3. CarouselData (Root Entity)

**Purpose**: Container for complete carousel configuration and slides.

**Structure**:
```json
{
  "config": CarouselConfig,
  "slides": CarouselSlide[]
}
```

**Validation Rules**:
- Must contain exactly one `config` object
- Must contain at least 1 slide (graceful degradation if < 3)
- All slide `id` values must be unique
- All slide `order` values must be unique and sequential

**Example**:
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

---

## Component State (Runtime)

### CarouselState (managed by useCarousel hook)

**Purpose**: Runtime state for carousel playback and interaction.

**Fields**:

| Field | Type | Description |
|-------|------|-------------|
| `currentIndex` | number | Index of currently active slide (0-indexed) |
| `isPlaying` | boolean | Whether auto-play is active |
| `isPaused` | boolean | Whether carousel is paused (hover state) |
| `slides` | CarouselSlide[] | Array of loaded slides |
| `config` | CarouselConfig | Carousel configuration |

**State Transitions**:

```
[Initial Load]
  ↓
[isPlaying: false, currentIndex: 0]
  ↓ (3 or more slides loaded)
[isPlaying: true, currentIndex: 0]
  ↓ (autoPlayInterval elapsed)
[currentIndex increments: 0 → 1 → 2 → 0 (loop)]
  ↓ (user hovers - desktop only)
[isPaused: true, isPlaying: false]
  ↓ (user un-hovers)
[isPaused: false, isPlaying: true]
```

**Edge Cases**:
- **< 3 slides**: `isPlaying` remains false (static display)
- **prefers-reduced-motion**: Animations disabled, but slide advance still occurs
- **Tab inactive**: Auto-play continues (no pause when tab loses focus)

---

## Relationships

### Entity Relationship Diagram

```
CarouselData (1)
├── config (1) → CarouselConfig
└── slides (n) → CarouselSlide[]

Runtime:
CarouselState (1)
├── currentIndex → CarouselSlide (1)
├── slides → CarouselSlide[] (n)
└── config → CarouselConfig (1)
```

**Cardinality**:
- CarouselData : CarouselConfig = 1:1
- CarouselData : CarouselSlide = 1:n (minimum 1, recommended 3+)
- CarouselState : CarouselSlide (active) = 1:1 (one active slide at a time)

---

## Data Validation

### Load-Time Validation (src/data/carousel.json)

**Performed when JSON file is loaded**:

1. **Schema Validation**:
   - Verify `config` object exists with all required fields
   - Verify `slides` array exists and contains at least 1 element
   - Verify each slide has required fields (`id`, `image`, `imageAlt`, `headline`, `order`)

2. **Uniqueness Validation**:
   - Check all slide `id` values are unique
   - Check all slide `order` values are unique

3. **Range Validation**:
   - `autoPlayInterval` >= 3000ms
   - `transitionDuration` between 300-1500ms
   - `textAnimationDuration` between 300-600ms
   - `order` values are non-negative integers

4. **Path Validation**:
   - All `image` paths start with `/images/carousel/`
   - (Optional) Verify image files exist at specified paths

**Validation Errors**:
- **Critical** (prevent carousel from rendering):
  - Missing `config` or `slides`
  - No slides in array
  - Duplicate `id` values
  - Invalid `autoPlayInterval` (< 3000ms)

- **Warnings** (log but allow rendering):
  - Missing image files
  - Text content exceeds recommended length
  - Non-sequential `order` values

### Runtime Validation

**Performed during carousel operation**:

1. **State Consistency**:
   - `currentIndex` always within valid range [0, slides.length - 1]
   - Timer cleanup on component unmount (prevent memory leaks)

2. **User Interaction**:
   - Hover events only trigger pause/resume if `pauseOnHover` is true
   - Manual navigation (future) respects slide boundaries

---

## Performance Considerations

### Data Size

- **JSON file size**: ~1-2KB (negligible)
- **Image assets**: 3 images × ~2MB each = ~6MB unoptimized
  - **Optimized target**: 3 images × 400KB = ~1.2MB total
  - **Critical**: First image should be < 300KB for FCP < 1.5s

### Memory Usage

- **Slide objects**: ~500 bytes each × 5 slides = ~2.5KB (negligible)
- **Image memory**: 3 images loaded in DOM simultaneously (browser manages)
- **State updates**: Minimal (1 integer change per transition)

### Loading Strategy

1. **Priority loading**: First slide image loaded with `priority` flag
2. **Eager loading**: Remaining slides loaded immediately (no lazy loading)
3. **Preconnect**: No external CDN connections needed (local images)

---

## Migration & Versioning

### Current Version: 1.0

**Schema version**: Not versioned initially (future consideration)

### Future Schema Changes

**Potential additions** (not in scope for initial implementation):

- `link` (string, optional): CTA link for slide click-through
- `ctaText` (string, optional): Custom button text per slide
- `theme` (enum, optional): Light/dark text theme based on image brightness
- `videoUrl` (string, optional): Background video instead of image
- `parallaxIntensity` (number, optional): Parallax scroll effect strength

**Backward Compatibility Strategy**:
- Add new fields as optional to maintain backward compatibility
- Use default values for missing fields
- Validate schema version if versioning is added

---

## Data Access Patterns

### Read Operations

1. **Initial Load**:
   ```typescript
   import carouselData from '@/data/carousel.json';
   const { config, slides } = carouselData;
   ```

2. **Slide Lookup by Index**:
   ```typescript
   const currentSlide = slides[currentIndex];
   ```

3. **Configuration Access**:
   ```typescript
   const { autoPlayInterval, pauseOnHover } = config;
   ```

### Write Operations

**None at runtime** (read-only data structure). Changes require:
1. Edit `src/data/carousel.json` file
2. Restart development server or rebuild application
3. (Future) Admin interface for dynamic slide management

---

## Type Safety

All entities are defined with TypeScript interfaces in `src/types/carousel.ts`:

```typescript
export interface CarouselSlide {
  id: string;
  image: string;
  imageAlt: string;
  headline: string;
  subtitle?: string;
  order: number;
}

export interface CarouselConfig {
  autoPlayInterval: number;
  transitionDuration: number;
  textAnimationDuration: number;
  pauseOnHover: boolean;
  respectReducedMotion: boolean;
}

export interface CarouselData {
  config: CarouselConfig;
  slides: CarouselSlide[];
}
```

**Compile-time safety**:
- TypeScript strict mode enforced
- All component props typed with interfaces
- JSON import typed with `satisfies CarouselData`

---

## Testing Considerations

**Note**: Per user request, no automated tests are required. Manual testing should verify:

1. **Data Loading**:
   - Valid JSON parses correctly
   - Invalid JSON triggers console errors (graceful failure)

2. **Validation**:
   - Duplicate IDs logged as warnings
   - Missing required fields prevent carousel render

3. **State Transitions**:
   - Auto-advance works with >= 3 slides
   - Graceful degradation with < 3 slides (static display)
   - Pause/resume works on hover (desktop)

4. **Edge Cases**:
   - Empty slides array handled gracefully
   - Missing image files logged but don't crash
   - Very long text content truncates or wraps appropriately

---

## Related Documentation

- [Implementation Plan](./plan.md) - Overall technical approach
- [Research Document](./research.md) - Technology decisions and best practices
- [Quickstart Guide](./quickstart.md) - Developer guide for adding/modifying slides
- [TypeScript Contracts](./contracts/carousel.types.ts) - Interface definitions
