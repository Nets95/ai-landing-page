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
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(107, 130, 112, 0.04) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <AnimatedSection className="space-y-12">
          {/* Section Header - Cyberpunk Neon Style */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-400 tracking-wide uppercase"
              initial={{ opacity: 0.9, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4 }}
              style={{
                textShadow: `
                  0 0 10px rgba(34, 211, 238, 0.8),
                  0 0 20px rgba(34, 211, 238, 0.6),
                  0 0 30px rgba(34, 211, 238, 0.4),
                  0 0 40px rgba(6, 182, 212, 0.3)
                `,
              }}
            >
              {techShowcase.headline}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-cyan-300/90 tracking-wide"
              initial={{ opacity: 0.9, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                textShadow: `
                  0 0 5px rgba(103, 232, 249, 0.5),
                  0 0 10px rgba(103, 232, 249, 0.3)
                `,
              }}
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
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500'
                    : 'bg-transparent border border-cyan-900/50 text-cyan-300/60 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
                style={
                  activeCategory === category
                    ? {
                        boxShadow: `
                          0 0 10px rgba(6, 182, 212, 0.4),
                          0 0 20px rgba(6, 182, 212, 0.2),
                          inset 0 0 10px rgba(6, 182, 212, 0.1)
                        `,
                      }
                    : {}
                }
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
