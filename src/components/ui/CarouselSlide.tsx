/**
 * CarouselSlide Component
 *
 * Feature: 005-hero-carousel
 * Last Updated: 2026-01-29
 *
 * Individual carousel slide with image, gradient overlay, and animated text content.
 * Implements smooth cross-fade transitions and text animations.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  slideVariants,
  getTextVariants,
  prefersReducedMotion,
} from '@/lib/carousel-animations';
import type { CarouselSlideProps } from '@/types/carousel';

/**
 * Carousel Slide Component
 *
 * Renders a single carousel slide with:
 * - Full-cover image with preserved aspect ratio (FR-002)
 * - Absolute positioning for zero layout shift (FR-020)
 * - Smooth cross-fade transitions (FR-004)
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
export const CarouselSlide: React.FC<CarouselSlideProps> = ({ slide }) => {
  // Get appropriate animation variants based on reduced motion preference
  const headlineVariants = getTextVariants(false);
  const subtitleVariants = getTextVariants(true);
  const reducedMotion = prefersReducedMotion();

  return (
    <motion.div
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 w-full h-full"
    >
      {/*
        Background Image
        FR-002: Fill container width while preserving aspect ratio
        FR-003: Responsive across all viewport sizes
        Using object-cover with top positioning to show full width
        and prioritize top of image (crops bottom if needed)
      */}
      <img
        src={slide.image}
        alt={slide.imageAlt}
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading={slide.order === 0 ? 'eager' : 'lazy'}
        decoding="async"
      />

      {/*
        Gradient Overlay (FR-005, FR-006, FR-007)
        Multi-layer gradient system for optimal readability:
        1. All edges darkened (strong vignette effect)
        2. Left side extra dark for text readability
        3. Top and bottom enhanced for cinematic letterbox effect
        CSS layer implementation (not baked into images)
        Multiple color stops to prevent banding artifacts
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.50) 20%, rgba(0,0,0,0) 40%),
            linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.50) 20%, rgba(0,0,0,0) 40%),
            linear-gradient(to right, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.40) 15%, rgba(0,0,0,0) 30%),
            linear-gradient(to left, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.40) 15%, rgba(0,0,0,0) 30%),
            linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 15%, rgba(0,0,0,0.50) 30%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)
          `,
        }}
      />

      {/*
        Text Overlay (FR-008, FR-009, FR-010, FR-011, FR-012, FR-013, FR-014)
        Positioned on left side within darker gradient area
        Softened white colors for optimal readability (FR-010)
        Modern, clean typography with strong hierarchy (FR-011)
        Animated with fade + upward motion (FR-012, FR-013)
      */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            {/* Headline with animation (FR-012, FR-013) - Cyberpunk Neon Style */}
            <motion.h2
              key={`${slide.id}-headline`}
              variants={headlineVariants}
              initial="initial"
              animate="animate"
              custom={reducedMotion}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-cyan-400 leading-tight tracking-wide uppercase"
              style={{
                textShadow: `
                  0 0 10px rgba(34, 211, 238, 0.8),
                  0 0 20px rgba(34, 211, 238, 0.6),
                  0 0 30px rgba(34, 211, 238, 0.4),
                  0 0 40px rgba(6, 182, 212, 0.3),
                  0 0 70px rgba(6, 182, 212, 0.2),
                  0 0 100px rgba(6, 182, 212, 0.1)
                `,
              }}
            >
              {slide.headline}
            </motion.h2>

            {/* Subtitle with staggered animation (FR-012, FR-013) - Cyberpunk Neon Style */}
            {slide.subtitle && (
              <motion.p
                key={`${slide.id}-subtitle`}
                variants={subtitleVariants}
                initial="initial"
                animate="animate"
                custom={reducedMotion}
                className="mt-4 text-xl md:text-2xl text-cyan-300 leading-relaxed tracking-wider"
                style={{
                  textShadow: `
                    0 0 8px rgba(103, 232, 249, 0.7),
                    0 0 15px rgba(103, 232, 249, 0.5),
                    0 0 25px rgba(103, 232, 249, 0.3),
                    0 0 35px rgba(34, 211, 238, 0.2)
                  `,
                }}
              >
                {slide.subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
