'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import carouselData from '@/data/carousel.json';

export const Hero: React.FC = () => {
  const handleScrollToNext = () => {
    const element = document.getElementById('tech-showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
    >
      {/* Hero Carousel - Positioned below header */}
      <div className="relative w-full" style={{ height: '70vh' }}>
        <HeroCarousel
          slides={carouselData.slides}
          config={carouselData.config}
        />
      </div>

      {/* Scroll Indicator - positioned at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          ease: 'easeOut',
        }}
        onClick={handleScrollToNext}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleScrollToNext();
          }
        }}
        aria-label="Scroll down to technology showcase section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-white/80 text-sm font-medium drop-shadow-lg">
            Scroll to explore
          </span>
          <ChevronDown
            className="w-6 h-6 text-white/80 drop-shadow-lg"
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
