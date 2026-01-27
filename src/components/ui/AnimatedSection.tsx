'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  variants?: Variants;
  stagger?: boolean;
  className?: string;
  once?: boolean;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  variants,
  stagger = false,
  className = '',
  once = true,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const defaultVariants: Variants = {
    initial: {
      opacity: 0.9, // Subtle start
      y: 10, // Reduced from 20px
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Reduced from 0.6s
        ease: 'easeOut',
        ...(stagger && { staggerChildren: 0.08 }), // Reduced from 0.1
      },
    },
  };

  const usedVariants = variants || defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={usedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
