'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { staggerChildren } from '@/lib/animations';
import portfolioData from '@/data/portfolio.json';
import contentData from '@/data/content.json';
import { PortfolioProject } from '@/types/portfolio';

// Dynamic import for PortfolioModal (only loaded when needed)
const PortfolioModal = dynamic(
  () =>
    import('@/components/ui/PortfolioModal').then((mod) => ({
      default: mod.PortfolioModal,
    })),
  {
    loading: () => null, // Don't show loader since modal is triggered by user action
  }
);

type PortfolioCategory =
  | 'All'
  | 'LLM Application'
  | 'Machine Learning'
  | 'Data Engineering'
  | 'AI Automation';

export const Portfolio: React.FC = () => {
  const { portfolio } = contentData;
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory>('All');
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: PortfolioCategory[] = [
    'All',
    'LLM Application',
    'Machine Learning',
    'Data Engineering',
    'AI Automation',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? portfolioData
      : portfolioData.filter((project) => project.category === activeCategory);

  const handleProjectClick = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="portfolio"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* T036: Subtle ambient gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168, 147, 131, 0.03) 0%, transparent 60%)'
        }} />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <AnimatedSection className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.h2
              className="section-headline gradient-text-subtle"
              initial={{ opacity: 0.9, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4 }}
            >
              {portfolio.headline}
            </motion.h2>
            <motion.p
              className="body-text text-text-secondary"
              initial={{ opacity: 0.9, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {portfolio.subtitle}
            </motion.p>
          </div>

          {/* T037: Category Filter - Consistent with TechShowcase */}
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

          {/* Portfolio Grid */}
          <motion.div
            key={activeCategory}
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <PortfolioCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                outcomes={project.outcomes}
                featured={project.featured}
                onClick={() => handleProjectClick(project as PortfolioProject)}
              />
            ))}
          </motion.div>

          {/* Project Count */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0.9 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="text-text-muted text-sm">
              Showing {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
            </p>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
