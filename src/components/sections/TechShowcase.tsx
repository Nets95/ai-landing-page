'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechnologyCard } from '@/components/ui/TechnologyCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { staggerChildren } from '@/lib/animations';
import technologiesData from '@/data/technologies.json';
import contentData from '@/data/content.json';
import { TechnologyCategory, TechnologyItem } from '@/types/technology';

export const TechShowcase: React.FC = () => {
  const { techShowcase } = contentData;
  const [activeCategory, setActiveCategory] =
    useState<TechnologyCategory>('All');

  const categories: TechnologyCategory[] = [
    'All',
    'LLM & AI Models',
    'ML Frameworks',
    'Data Engineering',
    'Development Tools',
    'Cloud & Infrastructure',
  ];

  const technologies = technologiesData as TechnologyItem[];
  const filteredTechnologies =
    activeCategory === 'All'
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <section
      id="tech-showcase"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* T024: Subtle ambient gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(107, 130, 112, 0.04) 0%, transparent 60%)'
        }} />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <AnimatedSection className="space-y-12">
          {/* Section Header - T026 */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.h2
              className="section-headline gradient-text-subtle"
              initial={{ opacity: 0.9, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4 }}
            >
              {techShowcase.headline}
            </motion.h2>
            <motion.p
              className="body-text text-text-secondary"
              initial={{ opacity: 0.9, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {techShowcase.subtitle}
            </motion.p>
          </div>

          {/* Category Filter - T025: Minimalist styling */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0.9, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent-sage text-white shadow-glow-subtle border border-accent-sage'
                    : 'bg-transparent border border-border-default text-text-secondary hover:border-border-hover hover:text-text-primary hover:bg-accent-sage/5'
                }`}
                aria-label={`Filter by ${category}`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Technology Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              exit="initial"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredTechnologies.map((tech) => (
                <TechnologyCard
                  key={tech.id}
                  name={tech.name}
                  description={tech.description}
                  icon={tech.icon}
                  proficiency={tech.proficiency}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Tech Count */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0.9 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="text-text-muted text-sm">
              Showing {filteredTechnologies.length}{' '}
              {filteredTechnologies.length === 1
                ? 'technology'
                : 'technologies'}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};
