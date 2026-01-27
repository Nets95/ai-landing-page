'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { Button } from './Button';
import { PortfolioProject } from '@/types/portfolio';
import { getImagePlaceholder } from '@/lib/image-placeholders';

export interface PortfolioModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* T034: Refined backdrop with subtle blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg-primary/90 backdrop-blur-md z-50"
            aria-hidden="true"
          />

          {/* Modal - T035: Reduced entrance animation - z-[60] to be above backdrop */}
          <div className="fixed inset-0 z-[60] overflow-y-auto pointer-events-none">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0.9, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0.9, scale: 0.98, y: 10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative w-full max-w-4xl glass-heavy rounded-2xl shadow-2xl pointer-events-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full glass-medium hover:glass-heavy transition-all duration-300 text-text-secondary hover:text-text-primary"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="overflow-hidden rounded-2xl">
                  {/* Image Header */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority
                      placeholder="blur"
                      blurDataURL={getImagePlaceholder('purple')}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent z-10" />

                    {project.featured && (
                      <div className="absolute top-4 left-4 px-4 py-2 bg-accent-sage/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white border border-accent-sage-light/30 z-20">
                        Featured Project
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-8 space-y-6">
                    {/* Title */}
                    <h2
                      id="modal-title"
                      className="text-3xl md:text-4xl font-bold text-text-primary font-heading"
                    >
                      {project.title}
                    </h2>

                    {/* Category */}
                    <div className="inline-block px-4 py-2 bg-transparent rounded-lg text-sm font-medium text-text-secondary border border-border-default">
                      {project.category}
                    </div>

                    {/* Long Description */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-text-primary font-heading">
                        About This Project
                      </h3>
                      <p className="text-base text-text-secondary leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>

                    {/* Technologies - Muted colors */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-text-primary font-heading">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-accent-sage/10 text-accent-sage-light border border-accent-sage/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Outcomes - Muted colors */}
                    {project.outcomes.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-text-primary font-heading">
                          Key Outcomes
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {project.outcomes.map((outcome, index) => (
                            <div
                              key={index}
                              className="glass-light p-4 rounded-lg space-y-2 border border-border-default"
                            >
                              <p className="text-sm text-text-muted">
                                {outcome.metric}
                              </p>
                              <p className="text-2xl font-bold text-accent-sage-light">
                                {outcome.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    {(project.liveUrl || project.githubUrl) && (
                      <div className="flex flex-wrap gap-4 pt-4">
                        {project.liveUrl && (
                          <Button
                            variant="primary"
                            onClick={() =>
                              window.open(project.liveUrl, '_blank')
                            }
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="w-5 h-5" />
                            View Live Demo
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            variant="secondary"
                            onClick={() =>
                              window.open(project.githubUrl, '_blank')
                            }
                            className="flex items-center gap-2"
                          >
                            <Github className="w-5 h-5" />
                            View on GitHub
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
