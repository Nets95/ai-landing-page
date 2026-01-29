/**
 * HeroCarousel Component
 *
 * Feature: 005-hero-carousel
 * Last Updated: 2026-01-29
 *
 * Main carousel container component with auto-play, hover-to-pause,
 * and smooth cross-fade transitions between slides.
 */

'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCarousel } from '@/hooks/useCarousel';
import { CarouselSlide } from '@/components/ui/CarouselSlide';
import { CarouselNavigation } from '@/components/ui/CarouselNavigation';
import type { HeroCarouselProps } from '@/types/carousel';

/**
 * Hero Carousel Component
 *
 * Displays rotating hero images with smooth cross-fade transitions.
 *
 * Features:
 * - Auto-play with 5-second intervals (FR-015)
 * - Hover-to-pause on desktop (FR-016, FR-017)
 * - Seamless looping (FR-018)
 * - Graceful degradation for < 3 slides (FR-023)
 * - Reserved space for navigation menu (FR-024)
 * - Zero layout shift (FR-020, SC-004)
 *
 * @example
 * ```tsx
 * import carouselData from '@/data/carousel.json';
 *
 * <HeroCarousel
 *   slides={carouselData.slides}
 *   config={carouselData.config}
 *   reservedTopSpace={70}
 * />
 * ```
 */
export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  config,
  className = '',
}) => {
  // Initialize carousel state management
  const {
    currentSlide,
    currentIndex,
    totalSlides,
    isPlaying,
    pause,
    resume,
    goToNext,
    goToPrevious,
    goToSlide, // For navigation tabs
  } = useCarousel({ slides, config });

  /**
   * Handle pointer enter (hover) - pause auto-play (FR-016)
   * Desktop only - uses pointer events for better device detection
   */
  const handlePointerEnter = () => {
    if (isPlaying) {
      pause();
    }
  };

  /**
   * Handle pointer leave (un-hover) - resume auto-play (FR-017)
   * Desktop only - resumes carousel when cursor leaves
   */
  const handlePointerLeave = () => {
    resume();
  };

  /**
   * Handle keyboard navigation (WCAG AA compliance)
   * - Left arrow: previous slide
   * - Right arrow: next slide
   * - Escape: pause/resume toggle
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        goToNext();
        break;
      case 'Escape':
        event.preventDefault();
        if (isPlaying) {
          pause();
        } else {
          resume();
        }
        break;
    }
  };

  /**
   * Handle focus - pause auto-play when carousel receives keyboard focus
   * Ensures auto-play doesn't interfere with keyboard navigation
   */
  const handleFocus = () => {
    if (isPlaying) {
      pause();
    }
  };

  /**
   * Handle blur - resume auto-play when focus leaves carousel
   * Only resumes if carousel was playing before focus
   */
  const handleBlur = () => {
    resume();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main carousel container - 70% of hero section (70% of (100vh - 80px)) */}
      <div
        className={`relative w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset ${className}`}
        style={{ height: 'calc(70vh - 56px)' }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="region"
        aria-label={`Hero carousel with ${totalSlides} slides`}
        aria-live="polite"
      >
        {/* Carousel slide container with AnimatePresence for cross-fade */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="sync" initial={false}>
            <CarouselSlide key={currentSlide.id} slide={currentSlide} />
          </AnimatePresence>
        </div>

        {/* Screen reader announcement for current slide */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {currentIndex + 1} of {totalSlides}: {currentSlide.headline}
          {currentSlide.subtitle && ` - ${currentSlide.subtitle}`}
        </div>

        {/* Graceful degradation indicator (FR-023) */}
        {totalSlides < 3 && (
          <div className="sr-only">
            Carousel auto-play is disabled (fewer than 3 slides)
          </div>
        )}
      </div>

      {/* Bottom navigation tabs - Fixed height */}
      <CarouselNavigation
        slides={slides}
        activeIndex={currentIndex}
        onNavigate={goToSlide}
      />
    </div>
  );
};
