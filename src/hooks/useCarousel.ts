/**
 * useCarousel Custom Hook
 *
 * Feature: 005-hero-carousel
 * Last Updated: 2026-01-29
 *
 * Manages carousel state, auto-play timer, and navigation controls.
 * Implements pause/resume functionality for hover interactions.
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  CarouselSlide,
  CarouselConfig,
  UseCarouselReturn,
} from '@/types/carousel';
import { DEFAULT_CAROUSEL_CONFIG, CAROUSEL_CONSTRAINTS } from '@/types/carousel';

interface UseCarouselProps {
  slides: CarouselSlide[];
  config?: Partial<CarouselConfig>;
}

/**
 * Custom hook for managing carousel state and auto-play functionality
 *
 * Features:
 * - Auto-play with configurable interval (FR-015: 5 seconds)
 * - Pause/resume controls (FR-016, FR-017: hover interactions)
 * - Navigation methods (next, previous, go to specific slide)
 * - Graceful degradation for < 3 slides (FR-023: disable auto-play)
 * - Automatic cleanup to prevent memory leaks
 *
 * @param slides - Array of carousel slides
 * @param config - Optional configuration overrides
 * @returns Carousel state and control methods
 *
 * @example
 * ```tsx
 * const {
 *   currentSlide,
 *   currentIndex,
 *   isPlaying,
 *   pause,
 *   resume,
 *   goToNext,
 * } = useCarousel({ slides: carouselData.slides, config: carouselData.config });
 * ```
 */
export function useCarousel({
  slides,
  config: configOverride,
}: UseCarouselProps): UseCarouselReturn {
  // Merge provided config with defaults
  const config: CarouselConfig = {
    ...DEFAULT_CAROUSEL_CONFIG,
    ...configOverride,
  };

  // Sort slides by order to ensure correct sequence
  const sortedSlides = [...slides].sort((a, b) => a.order - b.order);

  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Refs for timer management
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  // Determine if auto-play should be enabled (FR-023: requires 3+ slides)
  const shouldAutoPlay =
    sortedSlides.length >= CAROUSEL_CONSTRAINTS.MIN_SLIDES_FOR_AUTO_PLAY;

  /**
   * Navigate to next slide (with looping)
   * FR-018: Seamlessly loop back to first slide after last
   */
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedSlides.length);
  }, [sortedSlides.length]);

  /**
   * Navigate to previous slide (with looping)
   * Loops to last slide when going back from first slide
   */
  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + sortedSlides.length) % sortedSlides.length
    );
  }, [sortedSlides.length]);

  /**
   * Navigate to specific slide by index
   * Clamps index to valid range [0, slides.length - 1]
   */
  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(
        0,
        Math.min(index, sortedSlides.length - 1)
      );
      setCurrentIndex(clampedIndex);
    },
    [sortedSlides.length]
  );

  /**
   * Pause auto-play (user-triggered)
   * Sets isPlaying to false and clears timer
   */
  const pause = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * Resume auto-play after manual pause
   * Only resumes if auto-play is enabled (3+ slides)
   */
  const resume = useCallback(() => {
    if (shouldAutoPlay) {
      setIsPlaying(true);
      setIsPaused(false);
    }
  }, [shouldAutoPlay]);

  /**
   * Auto-play effect
   *
   * Creates interval timer for automatic slide advancement (FR-015)
   * - Interval: 5 seconds (config.autoPlayInterval)
   * - Respects pause state (hover or manual pause)
   * - Cleanup on unmount to prevent memory leaks
   * - Recreates timer when dependencies change
   */
  useEffect(() => {
    // Only auto-play if:
    // 1. Auto-play is enabled (3+ slides)
    // 2. isPlaying is true
    // 3. Not hovered (if pauseOnHover is enabled)
    if (shouldAutoPlay && isPlaying && !isHoveredRef.current) {
      timerRef.current = setInterval(() => {
        goToNext();
      }, config.autoPlayInterval);

      // Cleanup function to clear interval
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }

    // If not playing, clear any existing timer
    if (timerRef.current && (!isPlaying || isHoveredRef.current)) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [shouldAutoPlay, isPlaying, config.autoPlayInterval, goToNext]);

  /**
   * Initialize auto-play on mount (if enabled)
   *
   * FR-015: Auto-play enabled by default
   * FR-023: Disabled if < 3 slides
   */
  useEffect(() => {
    if (shouldAutoPlay) {
      setIsPlaying(true);
    }
  }, [shouldAutoPlay]);

  /**
   * Cleanup on unmount
   *
   * Critical: Prevents memory leaks by clearing timer
   * Runs when component unmounts or hook is cleaned up
   */
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // Get current slide (with fallback to first slide)
  const currentSlide = sortedSlides[currentIndex] || sortedSlides[0];

  return {
    currentSlide,
    currentIndex,
    totalSlides: sortedSlides.length,
    isPlaying,
    isPaused,
    goToSlide,
    goToNext,
    goToPrevious,
    pause,
    resume,
  };
}

/**
 * Export hover event handlers for use in components
 *
 * These should be attached to the carousel container element
 * to enable hover-to-pause functionality (FR-016, FR-017)
 *
 * @example
 * ```tsx
 * const carousel = useCarousel({ slides, config });
 *
 * <div
 *   onPointerEnter={() => carousel.pause()}
 *   onPointerLeave={() => carousel.resume()}
 * >
 *   {/* Carousel content *\/}
 * </div>
 * ```
 */
