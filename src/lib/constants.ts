export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const COLORS = {
  bg: {
    primary: '#0A0E27',
    secondary: '#0F172A',
    tertiary: '#1E293B',
    surface: 'rgba(255, 255, 255, 0.05)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    muted: '#6B7280',
  },
  gradient: {
    primaryStart: '#3B82F6',
    primaryMid: '#5F75F6',
    primaryEnd: '#8B5CF6',
    secondaryStart: '#06B6D4',
    secondaryMid: '#0DB7C0',
    secondaryEnd: '#14B8A6',
    accentStart: '#EC4899',
    accentMid: '#C74FC8',
    accentEnd: '#A855F7',
  },
  semantic: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#06B6D4',
  },
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 600,
  verySlow: 1000,
} as const;

export const TRANSITION_EASINGS = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const SPACING = {
  section: {
    mobile: 64,
    tablet: 96,
    desktop: 128,
  },
  component: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
  gap: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
} as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  email: 'contact@example.com',
} as const;

export const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'project', label: 'Project Collaboration' },
  { value: 'consultation', label: 'Consultation Request' },
  { value: 'hiring', label: 'Hiring / Job Opportunity' },
] as const;
