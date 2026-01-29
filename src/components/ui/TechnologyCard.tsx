import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import { fadeInUp } from '@/lib/animations';

export interface TechnologyCardProps {
  name: string;
  description: string;
  icon: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export const TechnologyCard: React.FC<TechnologyCardProps> = ({
  name,
  description,
  icon,
  proficiency,
}) => {
  // Neon proficiency badge colors
  const proficiencyColors = {
    beginner:
      'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50',
    intermediate:
      'bg-purple-500/20 text-purple-300 border border-purple-500/50',
    advanced:
      'bg-magenta-500/20 text-magenta-300 border border-magenta-500/50',
    expert:
      'bg-cyan-400/30 text-cyan-200 border border-cyan-400',
  };
  
  const proficiencyShadows = {
    beginner: { textShadow: '0 0 5px rgba(103, 232, 249, 0.5)' },
    intermediate: { textShadow: '0 0 5px rgba(168, 85, 247, 0.5)' },
    advanced: { textShadow: '0 0 5px rgba(236, 72, 153, 0.5)' },
    expert: { textShadow: '0 0 8px rgba(34, 211, 238, 0.7)' },
  };

  return (
    <motion.div variants={fadeInUp} className="h-full">
      <Card
        hover
        glassVariant="light"
        className="p-6 h-full flex flex-col space-y-4 group transition-all duration-300"
      >
        {/* Icon - T021 */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-lg bg-bg-surface flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-2xl">{icon}</span>
          </div>
          {proficiency && (
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wide ${
                proficiencyColors[proficiency]
              }`}
              style={proficiencyShadows[proficiency]}
            >
              {proficiency}
            </span>
          )}
        </div>

        {/* Content - Neon Cyberpunk Style */}
        <div className="flex-1 space-y-2">
          <h3
            className="text-xl font-semibold text-cyan-400 font-heading group-hover:text-cyan-300 transition-all duration-300 tracking-wide"
            style={{
              textShadow: '0 0 8px rgba(34, 211, 238, 0.6), 0 0 15px rgba(34, 211, 238, 0.4)',
            }}
          >
            {name}
          </h3>
          <p
            className="text-sm text-cyan-300/60 leading-relaxed"
            style={{
              textShadow: '0 0 5px rgba(103, 232, 249, 0.3)',
            }}
          >
            {description}
          </p>
        </div>

        {/* Neon glow effect on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.4), 0 0 30px rgba(6, 182, 212, 0.2)',
            }}
          />
        </div>
      </Card>
    </motion.div>
  );
};
