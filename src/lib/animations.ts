import { Variants } from 'framer-motion';

/**
 * Reduced-intensity animation variants for modern dark UI
 * - Durations reduced from 0.6s to 0.3-0.4s
 * - Transform distances reduced from 20px to 6-10px
 * - Opacity starts higher (0.9 instead of 0) for subtle fade-ins
 */

export const fadeInUp: Variants = {
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
    },
  },
};

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0.9,
    x: -10, // Reduced from -20px
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const fadeInRight: Variants = {
  initial: {
    opacity: 0.9,
    x: 10, // Reduced from 20px
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3, // Reduced from 0.6s
      ease: 'easeOut',
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0.9,
    scale: 0.95, // More subtle scale
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4, // Reduced from 0.5s
      ease: 'easeOut',
    },
  },
};

/**
 * Subtle variant - minimal movement (6px translation)
 */
export const subtle: Variants = {
  initial: {
    opacity: 0.9,
    y: 6,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Standard variant - moderate movement (10px translation)
 */
export const standard: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Pronounced variant - for emphasis (16px translation)
 */
export const pronounced: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.08, // Reduced from 0.1
      delayChildren: 0.1,
    },
  },
};

export const staggerChildrenFast: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.04, // Reduced from 0.05
    },
  },
};

export const staggerChildrenSlow: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.15, // Reduced from 0.2
    },
  },
};
