import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors - deeper charcoal with olive undertones
        'bg-primary': '#0A0D16',
        'bg-secondary': '#12151F',
        'bg-surface': '#1A1E2E',
        'bg-overlay': 'rgba(10, 13, 22, 0.95)',

        // Legacy aliases (for backward compatibility)
        'bg-tertiary': '#1A1E2E',
        'dark-bg': '#0A0D16',
        'dark-surface': '#12151F',
        'dark-tertiary': '#1A1E2E',

        // Text colors - enhanced contrast
        'text-primary': '#F8F9FA',
        'text-secondary': '#C8CACD',
        'text-muted': '#8B8D91',
        'text-disabled': '#5A5C60',
        'text-tertiary': '#8B8D91', // Legacy alias

        // Accent colors - MUTED EARTH TONES
        'accent-sage-light': '#8FA88F',
        'accent-sage': '#6B8270',
        'accent-sage-dark': '#4A5D52',
        'accent-earth-light': '#C9B8A8',
        'accent-earth': '#A89383',
        'accent-earth-dark': '#7D6D5E',
        'accent-olive-light': '#9AA184',
        'accent-olive': '#7A8366',
        'accent-olive-dark': '#5A6248',

        // Legacy gradient colors (replaced with muted tones)
        'gradient-primary-start': '#8FA88F',
        'gradient-primary-mid': '#7A8366',
        'gradient-primary-end': '#6B8270',
        'gradient-secondary-start': '#C9B8A8',
        'gradient-secondary-mid': '#A89383',
        'gradient-secondary-end': '#7D6D5E',
        'gradient-accent-start': '#9AA184',
        'gradient-accent-mid': '#8FA88F',
        'gradient-accent-end': '#6B8270',
        'primary-start': '#8FA88F',
        'primary-mid': '#7A8366',
        'primary-end': '#6B8270',
        'primary': '#6B8270',
        'secondary-start': '#C9B8A8',
        'secondary-mid': '#A89383',
        'secondary-end': '#7D6D5E',

        // Semantic colors - muted for professional aesthetic
        'semantic-success': '#6B9B7C',
        'semantic-error': '#C67C7C',
        'semantic-warning': '#D4A574',
        'semantic-info': '#7B9BAD',

        // Border colors - softer and more subtle
        'border-default': 'rgba(200, 202, 205, 0.08)',
        'border-hover': 'rgba(200, 202, 205, 0.15)',
        'border-focus': 'rgba(143, 168, 143, 0.4)',
        'border-divider': 'rgba(200, 202, 205, 0.05)',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
      boxShadow: {
        // Soft shadows for dark backgrounds
        sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
        md: '0 2px 4px rgba(0, 0, 0, 0.4)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.5)',
        xl: '0 8px 16px rgba(0, 0, 0, 0.6)',
        '2xl': '0 12px 24px rgba(0, 0, 0, 0.7)',

        // Glow effects - SIGNIFICANTLY REDUCED (sage green accent)
        'glow-minimal': '0 0 8px rgba(143, 168, 143, 0.2)',
        'glow-subtle': '0 0 12px rgba(143, 168, 143, 0.25)',
        'glow-pronounced': '0 0 16px rgba(143, 168, 143, 0.3)',

        // Legacy glow names (mapped to new muted glows)
        'glow-primary': '0 0 12px rgba(143, 168, 143, 0.25)',
        'glow-primary-lg': '0 0 16px rgba(143, 168, 143, 0.3)',
        'glow-secondary': '0 0 12px rgba(168, 147, 131, 0.25)',
        'glow-accent': '0 0 12px rgba(143, 168, 143, 0.25)',
        'glow-accent-lg': '0 0 16px rgba(143, 168, 143, 0.3)',
      },
      backdropBlur: {
        none: '0',
        subtle: '4px',  // Minimal blur (default for cards)
        medium: '8px',  // Standard blur
        strong: '12px', // For modals only
        // Legacy names
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '12px', // Reduced from 16px
        '2xl': '12px', // Reduced from 24px
        '3xl': '12px', // Reduced from 40px
      },
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '600': '600ms',
        '1000': '1000ms',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0.9', // Start higher for subtlety
            transform: 'translateY(10px)', // Reduced from 20px
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-left': {
          '0%': {
            opacity: '0.9', // Start higher for subtlety
            transform: 'translateX(-10px)', // Reduced from -20px
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'fade-in-right': {
          '0%': {
            opacity: '0.9',
            transform: 'translateX(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out', // Reduced from 0.6s
        'fade-in-left': 'fade-in-left 0.4s ease-out', // Reduced from 0.6s
        'fade-in-right': 'fade-in-right 0.4s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
