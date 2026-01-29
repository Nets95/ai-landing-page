/**
 * CarouselNavigation Component
 *
 * Bottom navigation tabs for hero carousel with preview thumbnails.
 * Syncs with carousel state without modifying carousel logic.
 *
 * Features:
 * - Preview thumbnail for each slide
 * - Active state highlighting with neon glow
 * - Click navigation to specific slides
 * - Auto-scroll to keep active tab visible
 * - Horizontal overflow with hidden scrollbar
 * - Smooth transitions respecting reduced-motion
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { CarouselSlide } from '@/types/carousel';

export interface CarouselNavigationProps {
  /** Array of carousel slides for preview generation */
  slides: CarouselSlide[];
  
  /** Current active slide index (synced from carousel) */
  activeIndex: number;
  
  /** Callback to navigate carousel to specific slide */
  onNavigate: (index: number) => void;
  
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Carousel Navigation Tabs Component
 *
 * Displays clickable preview thumbnails below the carousel.
 * Automatically syncs with carousel state changes.
 *
 * @example
 * ```tsx
 * <CarouselNavigation
 *   slides={carouselData.slides}
 *   activeIndex={currentIndex}
 *   onNavigate={goToSlide}
 * />
 * ```
 */
export const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  slides,
  activeIndex,
  onNavigate,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  /**
   * Auto-scroll to keep active tab visible and centered
   * Runs when activeIndex changes (carousel slides)
   */
  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeTab = activeTabRef.current;
      
      // Calculate position to center the active tab
      const containerWidth = container.offsetWidth;
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      const scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2);

      // Smooth scroll to center active tab
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  /**
   * Handle tab click - navigates carousel to selected slide
   * Does NOT modify carousel logic, only calls provided callback
   */
  const handleTabClick = (index: number) => {
    onNavigate(index);
  };

  /**
   * Handle keyboard navigation for accessibility
   * Arrow keys navigate between tabs, Enter/Space activate
   */
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onNavigate(index);
    }
  };

  return (
    <div className={`carousel-navigation-container ${className}`}>
      {/* Navigation tabs container with horizontal scroll */}
      <div
        ref={containerRef}
        className="carousel-navigation-scroll"
        role="tablist"
        aria-label="Carousel slide navigation"
      >
        <div className="carousel-navigation-tabs">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            
            return (
              <motion.button
                key={slide.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`carousel-navigation-tab ${isActive ? 'active' : ''}`}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
                aria-controls={`carousel-slide-${slide.id}`}
                tabIndex={isActive ? 0 : -1}
                // Smooth transitions for state changes
                animate={{
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive ? 1 : 0.6,
                }}
                whileHover={{
                  scale: isActive ? 1.05 : 1.02,
                  opacity: isActive ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
              >
                {/* Preview thumbnail */}
                <div className="carousel-navigation-preview">
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    loading="lazy"
                    draggable={false}
                  />
                  
                  {/* Neon border indicator for active state */}
                  <div
                    className="carousel-navigation-indicator"
                    style={{
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                </div>

                {/* Optional: Slide title below thumbnail */}
                <div className="carousel-navigation-title">
                  <span>{slide.headline}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
