/**
 * TypeScript Type Definitions for Hero Image Carousel
 *
 * Feature: 005-hero-carousel
 * Last Updated: 2026-01-29
 *
 * This file defines all TypeScript interfaces and types for the hero carousel feature.
 * These contracts ensure type safety across components, hooks, and data structures.
 */

/**
 * Represents a single carousel slide with image and text overlay
 *
 * @example
 * ```json
 * {
 *   "id": "slide-1",
 *   "image": "/images/carousel/hero-ai.png",
 *   "imageAlt": "Futuristic AI technology interface",
 *   "headline": "AI-Powered Engineering",
 *   "subtitle": "Building intelligent systems that scale",
 *   "order": 0
 * }
 * ```
 */
export interface CarouselSlide {
  /** Unique identifier for the slide (e.g., "slide-1", "hero-innovation") */
  id: string;

  /** Path to image file relative to /public (e.g., "/images/carousel/slide-1.png") */
  image: string;

  /** Accessible description of image for screen readers (10-150 characters) */
  imageAlt: string;

  /** Primary text overlay - bold, large (5-50 characters) */
  headline: string;

  /** Optional secondary text overlay - smaller (0-100 characters) */
  subtitle?: string;

  /** Display order, 0-indexed (must be unique and sequential) */
  order: number;
}

/**
 * Global carousel behavior configuration
 *
 * Controls animation timing, auto-play behavior, and accessibility settings.
 *
 * @example
 * ```json
 * {
 *   "autoPlayInterval": 5000,
 *   "transitionDuration": 800,
 *   "textAnimationDuration": 500,
 *   "pauseOnHover": true,
 *   "respectReducedMotion": true
 * }
 * ```
 */
export interface CarouselConfig {
  /** Milliseconds between auto-advance transitions (minimum 3000ms) */
  autoPlayInterval: number;

  /** Cross-fade animation duration in milliseconds (300-1500ms range) */
  transitionDuration: number;

  /** Text fade-in animation duration in milliseconds (300-600ms range) */
  textAnimationDuration: number;

  /** Enable hover-to-pause functionality on desktop (pointer events) */
  pauseOnHover: boolean;

  /** Disable animations when prefers-reduced-motion is enabled (WCAG AA) */
  respectReducedMotion: boolean;
}

/**
 * Complete carousel data structure loaded from JSON
 *
 * Root entity that combines configuration and slide collection.
 * Loaded from src/data/carousel.json at build time.
 *
 * @example
 * ```typescript
 * import carouselData from '@/data/carousel.json';
 * const { config, slides } = carouselData;
 * ```
 */
export interface CarouselData {
  /** Global carousel configuration */
  config: CarouselConfig;

  /** Array of carousel slides (minimum 1, recommended 3+ for auto-play) */
  slides: CarouselSlide[];
}

/**
 * Runtime state and control methods for carousel playback
 *
 * Return value from the useCarousel custom hook.
 * Provides access to current state and imperative control methods.
 *
 * @example
 * ```typescript
 * const {
 *   currentSlide,
 *   currentIndex,
 *   isPlaying,
 *   pause,
 *   resume
 * } = useCarousel(slides, config);
 * ```
 */
export interface UseCarouselReturn {
  /** Currently active slide object */
  currentSlide: CarouselSlide;

  /** 0-indexed position of current slide */
  currentIndex: number;

  /** Total number of slides in carousel */
  totalSlides: number;

  /** Whether auto-play is currently active (false if < 3 slides) */
  isPlaying: boolean;

  /** Whether carousel is paused due to hover (desktop only) */
  isPaused: boolean;

  /** Navigate to specific slide by index (0-indexed) */
  goToSlide: (index: number) => void;

  /** Advance to next slide (loops back to first slide after last) */
  goToNext: () => void;

  /** Go back to previous slide (loops to last slide from first) */
  goToPrevious: () => void;

  /** Pause auto-play (user-triggered, not hover) */
  pause: () => void;

  /** Resume auto-play after manual pause */
  resume: () => void;
}

/**
 * Props for HeroCarousel component
 *
 * Main carousel container component that handles layout, state management,
 * and animation orchestration.
 *
 * @example
 * ```tsx
 * <HeroCarousel
 *   slides={carouselData.slides}
 *   config={carouselData.config}
 *   reservedTopSpace={70}
 *   className="hero-carousel-custom"
 * />
 * ```
 */
export interface HeroCarouselProps {
  /** Array of slides to display (minimum 1 required) */
  slides: CarouselSlide[];

  /** Optional partial config to override defaults */
  config?: Partial<CarouselConfig>;

  /** Additional CSS classes for carousel container */
  className?: string;

  /**
   * Height in pixels reserved at top of viewport for navigation menu
   * Used to calculate carousel height: calc(100dvh - reservedTopSpace)
   * @default 70
   */
  reservedTopSpace?: number;
}

/**
 * Props for CarouselSlide component
 *
 * Individual slide component that renders image, gradient overlay, and text content.
 * Handles text animation when slide becomes active.
 *
 * @example
 * ```tsx
 * <CarouselSlide
 *   slide={currentSlide}
 *   isActive={true}
 *   textAnimationDuration={500}
 * />
 * ```
 */
export interface CarouselSlideProps {
  /** Slide data to display (image, text, alt text) */
  slide: CarouselSlide;

  /** Whether this slide is currently active (triggers text animation) - Optional, auto-managed by AnimatePresence */
  isActive?: boolean;

  /** Duration of text fade-in animation in milliseconds (300-600ms) - Optional, uses default from animation variants */
  textAnimationDuration?: number;
}

/**
 * Validation error types for carousel data
 *
 * Used for runtime validation of carousel.json data.
 * Critical errors prevent carousel from rendering.
 * Warnings are logged but don't block rendering.
 */
export enum CarouselValidationError {
  /** Missing required config object */
  MISSING_CONFIG = 'MISSING_CONFIG',

  /** Missing required slides array */
  MISSING_SLIDES = 'MISSING_SLIDES',

  /** Slides array is empty */
  NO_SLIDES = 'NO_SLIDES',

  /** Duplicate slide ID found */
  DUPLICATE_ID = 'DUPLICATE_ID',

  /** Duplicate slide order value */
  DUPLICATE_ORDER = 'DUPLICATE_ORDER',

  /** autoPlayInterval below minimum threshold (< 3000ms) */
  INVALID_AUTO_PLAY_INTERVAL = 'INVALID_AUTO_PLAY_INTERVAL',

  /** transitionDuration outside valid range (300-1500ms) */
  INVALID_TRANSITION_DURATION = 'INVALID_TRANSITION_DURATION',

  /** textAnimationDuration outside valid range (300-600ms) */
  INVALID_TEXT_ANIMATION_DURATION = 'INVALID_TEXT_ANIMATION_DURATION',

  /** Image path doesn't start with /images/carousel/ */
  INVALID_IMAGE_PATH = 'INVALID_IMAGE_PATH',

  /** Missing required slide field (id, image, imageAlt, headline, order) */
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
}

/**
 * Validation result for carousel data
 *
 * Returned by validation functions to indicate success/failure
 * and provide error details for debugging.
 *
 * @example
 * ```typescript
 * const result = validateCarouselData(data);
 * if (!result.isValid) {
 *   console.error('Critical errors:', result.criticalErrors);
 *   console.warn('Warnings:', result.warnings);
 * }
 * ```
 */
export interface CarouselValidationResult {
  /** Whether validation passed (no critical errors) */
  isValid: boolean;

  /** Critical errors that prevent carousel from rendering */
  criticalErrors: Array<{
    type: CarouselValidationError;
    message: string;
    field?: string;
  }>;

  /** Non-critical warnings (logged but don't block rendering) */
  warnings: Array<{
    type: CarouselValidationError;
    message: string;
    field?: string;
  }>;
}

/**
 * Default carousel configuration values
 *
 * Used when config is not provided or partially provided.
 * Ensures carousel always has valid configuration.
 */
export const DEFAULT_CAROUSEL_CONFIG: CarouselConfig = {
  autoPlayInterval: 5000, // 5 seconds
  transitionDuration: 800, // 800ms
  textAnimationDuration: 500, // 500ms
  pauseOnHover: true,
  respectReducedMotion: true,
};

/**
 * Minimum carousel configuration constraints
 *
 * Used for validation to ensure configuration values are within
 * acceptable ranges per functional requirements.
 */
export const CAROUSEL_CONSTRAINTS = {
  MIN_AUTO_PLAY_INTERVAL: 3000, // 3 seconds minimum (FR-015)
  MIN_TRANSITION_DURATION: 300, // 300ms minimum (FR-004)
  MAX_TRANSITION_DURATION: 1500, // 1500ms maximum
  MIN_TEXT_ANIMATION_DURATION: 300, // 300ms minimum (FR-013)
  MAX_TEXT_ANIMATION_DURATION: 600, // 600ms maximum (FR-013)
  MIN_SLIDES_FOR_AUTO_PLAY: 3, // Auto-play requires 3+ slides (FR-023)
  RECOMMENDED_IMAGE_WIDTH: 1920, // Pixels
  MAX_HEADLINE_LENGTH: 50, // Characters (soft limit)
  MAX_SUBTITLE_LENGTH: 100, // Characters (soft limit)
} as const;

/**
 * Type guard to check if data conforms to CarouselData interface
 *
 * Useful for runtime type checking of imported JSON data.
 *
 * @example
 * ```typescript
 * import data from '@/data/carousel.json';
 * if (isCarouselData(data)) {
 *   // TypeScript now knows data is CarouselData
 *   const { config, slides } = data;
 * }
 * ```
 */
export function isCarouselData(data: unknown): data is CarouselData {
  if (typeof data !== 'object' || data === null) return false;

  const obj = data as Record<string, unknown>;

  // Check config
  if (typeof obj.config !== 'object' || obj.config === null) return false;

  // Check slides
  if (!Array.isArray(obj.slides)) return false;

  return true;
}

/**
 * Type guard to check if object is a valid CarouselSlide
 *
 * @example
 * ```typescript
 * if (isCarouselSlide(obj)) {
 *   console.log(obj.headline); // TypeScript knows obj is CarouselSlide
 * }
 * ```
 */
export function isCarouselSlide(obj: unknown): obj is CarouselSlide {
  if (typeof obj !== 'object' || obj === null) return false;

  const slide = obj as Record<string, unknown>;

  return (
    typeof slide.id === 'string' &&
    typeof slide.image === 'string' &&
    typeof slide.imageAlt === 'string' &&
    typeof slide.headline === 'string' &&
    (slide.subtitle === undefined || typeof slide.subtitle === 'string') &&
    typeof slide.order === 'number'
  );
}

/**
 * Type for Framer Motion animation variants
 *
 * Used in carousel-animations.ts to define animation states.
 * Not exported as part of public API, but defined here for reference.
 *
 * @internal
 */
export interface CarouselAnimationVariants {
  /** Initial state before animation */
  initial: Record<string, unknown>;

  /** Active/visible state during animation */
  animate: Record<string, unknown>;

  /** Exit state when transitioning out */
  exit: Record<string, unknown>;
}
