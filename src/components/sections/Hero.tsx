'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import contentData from '@/data/content.json';

export const Hero: React.FC = () => {
  const { hero } = contentData;

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden ambient-gradient"
    >
      {/* Large Ambient Gradient Background - T012 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary ambient gradient (sage green from top-left) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(107, 130, 112, 0.06) 0%, transparent 50%)',
          }}
        />
        {/* Secondary ambient gradient (earth beige from bottom-right) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 80% 70%, rgba(168, 147, 131, 0.04) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto container-padding">
        <div className="flex flex-col items-center justify-center text-center space-y-8 py-20">
          {/* Headline with muted gradient text - T013 */}
          <motion.h1
            className="hero-headline max-w-5xl"
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <GradientText variant="sage-earth">{hero.headline}</GradientText>
          </motion.h1>

          {/* Subtitle with refined typography - T014 */}
          <motion.p
            className="body-text max-w-3xl text-text-secondary"
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
          >
            {hero.tagline}
          </motion.p>

          {/* CTA Buttons with reduced glow intensity - T015 */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0.9, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleScrollToSection('portfolio')}
              aria-label="View portfolio projects"
            >
              {hero.cta.primary}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleScrollToSection('contact')}
              aria-label="Get in touch"
            >
              {hero.cta.secondary}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator with subtle animation - T016 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0.9, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.35,
          ease: 'easeOut',
        }}
        onClick={() => handleScrollToSection('tech-showcase')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleScrollToSection('tech-showcase');
          }
        }}
        aria-label="Scroll down to technology showcase section"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-text-muted text-sm font-medium">
            Scroll to explore
          </span>
          <ChevronDown className="w-6 h-6 text-text-muted" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
};
