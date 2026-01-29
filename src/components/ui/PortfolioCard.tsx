'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card } from './Card';
import { fadeInUp } from '@/lib/animations';
import { getImagePlaceholder } from '@/lib/image-placeholders';

export interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  outcomes: {
    metric: string;
    value: string;
  }[];
  featured?: boolean;
  onClick: () => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  image,
  technologies,
  outcomes,
  featured = false,
  onClick,
}) => {
  return (
    <motion.div variants={fadeInUp} className="h-full">
      <Card
        hover
        className="h-full overflow-hidden cursor-pointer group"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={`View details for ${title}`}
      >
        {/* Image with Overlay - T031: Reduced opacity */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={getImagePlaceholder('blue')}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient Overlay - Reduced from 0.6 to 0.3 */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-300 z-10" />

          {/* T032: Muted featured badge */}
          {featured && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-accent-sage/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-accent-sage-light/30 z-20">
              Featured
            </div>
          )}

          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-accent-sage/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        </div>

        {/* Content - T030: Refined styling */}
        <div className="p-6 space-y-4">
          {/* Title - Neon Cyberpunk Style */}
          <h3
            className="text-xl font-bold text-cyan-400 font-heading group-hover:text-cyan-300 transition-all duration-300 tracking-wide"
            style={{
              textShadow: '0 0 8px rgba(34, 211, 238, 0.6), 0 0 15px rgba(34, 211, 238, 0.4)',
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-sm text-cyan-300/60 leading-relaxed line-clamp-2"
            style={{
              textShadow: '0 0 5px rgba(103, 232, 249, 0.3)',
            }}
          >
            {description}
          </p>

          {/* Technology tags - Neon Style */}
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-900/50 hover:border-cyan-500/50 hover:bg-cyan-500/20 transition-all duration-300"
                style={{
                  textShadow: '0 0 5px rgba(103, 232, 249, 0.4)',
                }}
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span
                className="px-3 py-1 text-xs font-medium rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-900/50"
                style={{
                  textShadow: '0 0 5px rgba(103, 232, 249, 0.4)',
                }}
              >
                +{technologies.length - 4}
              </span>
            )}
          </div>

          {/* Outcomes - Neon Style */}
          {outcomes.length > 0 && (
            <div className="pt-4 border-t border-cyan-900/30 space-y-2">
              {outcomes.slice(0, 2).map((outcome, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span
                    className="text-xs text-cyan-300/60"
                    style={{
                      textShadow: '0 0 5px rgba(103, 232, 249, 0.3)',
                    }}
                  >
                    {outcome.metric}
                  </span>
                  <span
                    className="text-sm font-semibold text-cyan-400"
                    style={{
                      textShadow: '0 0 8px rgba(34, 211, 238, 0.5)',
                    }}
                  >
                    {outcome.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Details Indicator - Neon Style */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="flex items-center gap-2 text-xs text-cyan-400 font-semibold uppercase tracking-wider"
            style={{
              textShadow: '0 0 8px rgba(34, 211, 238, 0.7), 0 0 15px rgba(34, 211, 238, 0.5)',
            }}
          >
            <span>View Details</span>
            <ExternalLink
              className="w-4 h-4"
              style={{
                filter: 'drop-shadow(0 0 3px rgba(34, 211, 238, 0.7))',
              }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
