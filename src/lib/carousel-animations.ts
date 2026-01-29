/**
 * Framer Motion Animation Variants for Hero Carousel
 *
 * Feature: 005-hero-carousel
 * Last Updated: 2026-01-29
 *
 * Defines animation states for carousel cross-fade transitions and text animations.
 * Supports prefers-reduced-motion accessibility requirements.
 */

import type { Variants } from 'framer-motion';

/**
 * Check if user prefers reduced motion (WCAG AA compliance)
 * Returns true if prefers-reduced-motion: reduce is set
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Carousel slide cross-fade animation variants
 *
 * Used for smooth transitions between slides (FR-004)
 * - Duration: 800ms (FR-004)
 * - GPU-accelerated opacity transitions only
 * - Respects prefers-reduced-motion (FR-021)
 *
 * @example
 * ```tsx
 * <motion.div
 *   variants={slideVariants}
 *   initial="initial"
 *   animate="animate"
 *   exit="exit"
 * >
 *   <img src={slide.image} alt={slide.imageAlt} />
 * </motion.div>
 * ```
 */
export const slideVariants: Variants = {
  initial: {
    opacity: 0,
    position: 'absolute' as const,
    inset: 0,
  },
  animate: {
    opacity: 1,
    position: 'absolute' as const,
    inset: 0,
    transition: {
      opacity: {
        duration: 0.8, // 800ms cross-fade duration
        ease: 'easeOut',
      },
    },
  },
  exit: {
    opacity: 0,
    position: 'absolute' as const,
    inset: 0,
    transition: {
      opacity: {
        duration: 0.8, // 800ms cross-fade duration
        ease: 'easeIn',
      },
    },
  },
};

/**
 * Text fade-in animation variants with upward motion
 *
 * Used for headline and subtitle animations when slide becomes active (FR-012, FR-013)
 * - Duration: 500ms (FR-013: 300-600ms range)
 * - Motion: Fade in + upward motion from bottom (20px translateY)
 * - Respects prefers-reduced-motion (FR-021)
 *
 * @example
 * ```tsx
 * <motion.h2
 *   variants={textVariants}
 *   initial="initial"
 *   animate="animate"
 *   key={slide.id} // Reset animation on slide change
 * >
 *   {slide.headline}
 * </motion.h2>
 * ```
 */
export const textVariants: Variants = {
  initial: (prefersReduced: boolean) => ({
    opacity: 0,
    y: prefersReduced ? 0 : 20, // No motion if prefers-reduced-motion
  }),
  animate: (prefersReduced: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        duration: 0.5, // 500ms fade-in
        ease: 'easeOut',
      },
      y: prefersReduced
        ? { duration: 0 } // Instant if reduced motion
        : {
            duration: 0.5, // 500ms upward motion
            ease: 'easeOut',
          },
    },
  }),
};

/**
 * Subtitle text variant with staggered delay
 *
 * Same as textVariants but with 100ms delay after headline (US3)
 * Creates sequential animation: headline → subtitle
 *
 * @example
 * ```tsx
 * <motion.p
 *   variants={subtitleVariants}
 *   initial="initial"
 *   animate="animate"
 *   key={slide.id}
 * >
 *   {slide.subtitle}
 * </motion.p>
 * ```
 */
export const subtitleVariants: Variants = {
  initial: (prefersReduced: boolean) => ({
    opacity: 0,
    y: prefersReduced ? 0 : 20,
  }),
  animate: (prefersReduced: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        duration: 0.5,
        ease: 'easeOut',
        delay: 0.1, // 100ms delay after headline
      },
      y: prefersReduced
        ? { duration: 0, delay: 0.1 }
        : {
            duration: 0.5,
            ease: 'easeOut',
            delay: 0.1, // 100ms delay after headline
          },
    },
  }),
};

/**
 * Reduced motion variants (static, no motion)
 *
 * Used when prefers-reduced-motion is enabled (FR-021)
 * Maintains opacity transitions but removes all translateY motion
 *
 * @example
 * ```tsx
 * const variants = prefersReducedMotion() ? reducedMotionVariants : textVariants;
 * <motion.div variants={variants}>...</motion.div>
 * ```
 */
export const reducedMotionTextVariants: Variants = {
  initial: {
    opacity: 0,
    y: 0, // No motion
  },
  animate: {
    opacity: 1,
    y: 0, // No motion
    transition: {
      opacity: {
        duration: 0.3, // Faster fade (reduced visual complexity)
        ease: 'easeOut',
      },
    },
  },
};

/**
 * Get appropriate text variants based on reduced motion preference
 *
 * Utility function to automatically select correct variants
 * Returns reduced motion variants if user preference is set
 *
 * @param isSubtitle - Whether to use subtitle variant (with delay)
 * @returns Appropriate Framer Motion variants
 *
 * @example
 * ```tsx
 * const headlineVariants = getTextVariants(false);
 * const subtitleVariants = getTextVariants(true);
 * ```
 */
export const getTextVariants = (isSubtitle = false): Variants => {
  const reduced = prefersReducedMotion();

  if (reduced) {
    if (isSubtitle) {
      return {
        initial: {
          opacity: 0,
          y: 0,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            opacity: {
              duration: 0.3,
              ease: 'easeOut',
              delay: 0.1, // Keep delay for subtitle
            },
          },
        },
      };
    }
    return reducedMotionTextVariants;
  }

  return isSubtitle ? subtitleVariants : textVariants;
};

/**
 * Animation configuration constants
 *
 * Centralized timing values matching spec requirements
 */
export const ANIMATION_CONFIG = {
  /** Slide cross-fade duration (FR-004) */
  SLIDE_TRANSITION_DURATION: 800, // ms

  /** Text fade-in duration (FR-013: 300-600ms) */
  TEXT_ANIMATION_DURATION: 500, // ms

  /** Subtitle delay after headline */
  SUBTITLE_DELAY: 100, // ms

  /** Vertical motion distance for text */
  TEXT_MOTION_DISTANCE: 20, // px

  /** Auto-play interval (FR-015) */
  AUTO_PLAY_INTERVAL: 5000, // ms (5 seconds)
} as const;
