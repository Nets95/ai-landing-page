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
  // T023: Muted proficiency badge colors
  const proficiencyColors = {
    beginner: 'bg-semantic-info/20 text-semantic-info border border-semantic-info/30',
    intermediate: 'bg-semantic-warning/20 text-semantic-warning border border-semantic-warning/30',
    advanced: 'bg-accent-earth/20 text-accent-earth-light border border-accent-earth/30',
    expert: 'bg-accent-sage/20 text-accent-sage-light border border-accent-sage/30',
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
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                proficiencyColors[proficiency]
              }`}
            >
              {proficiency}
            </span>
          )}
        </div>

        {/* Content - T021 */}
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-semibold text-text-primary font-heading group-hover:text-accent-sage-light transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {description}
          </p>
        </div>

        {/* T022: Subtle hover glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-xl shadow-glow-minimal" />
        </div>
      </Card>
    </motion.div>
  );
};
