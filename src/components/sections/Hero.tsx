'use client';

import React from 'react';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import carouselData from '@/data/carousel.json';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative"
      style={{ 
        height: 'calc(100vh - 80px)', // Account for 80px header spacer
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Hero Carousel with Navigation - Full height */}
      <div className="relative w-full h-full">
        <HeroCarousel
          slides={carouselData.slides}
          config={carouselData.config}
        />
      </div>
    </section>
  );
};
