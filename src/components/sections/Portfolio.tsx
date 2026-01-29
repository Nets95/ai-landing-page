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
      style={{ background: 'var(--bg-primary)', scrollMarginTop: '100px' }}
    >
      {/* T036: Subtle ambient gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168, 147, 131, 0.03) 0%, transparent 60%)',
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
              {portfolio.headline}
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
            <p
              className="text-cyan-300/60 text-sm tracking-wide"
              style={{
                textShadow: '0 0 5px rgba(103, 232, 249, 0.3)',
              }}
            >
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
