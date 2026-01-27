/**
 * Component Props Type Definitions
 * Modern Dark UI Redesign - Component API Contracts
 *
 * Defines TypeScript interfaces for all UI components using the new design system.
 * Based on muted earth-tone palette, reduced animation intensity, and soft borders.
 *
 * @version 2.0.0
 * @date 2026-01-27
 */

// ============================================================================
// Base Types
// ============================================================================

/**
 * Design system color variant types
 */
export type ColorVariant =
  | 'sage'
  | 'earth'
  | 'olive'
  | 'neutral';

/**
 * Semantic color types for validation and status
 */
export type SemanticColor =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

/**
 * Component size variants
 */
export type ComponentSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

/**
 * Animation intensity levels (reduced from previous design)
 */
export type AnimationIntensity =
  | 'subtle'      // 6px transforms, 0.9 opacity start, 300ms
  | 'standard'    // 10px transforms, 0 opacity start, 400ms
  | 'pronounced'; // 16px transforms, 0 opacity start, 600ms

/**
 * Glow effect intensity (significantly reduced)
 */
export type GlowIntensity =
  | 'minimal'     // 8px spread, 0.2 opacity
  | 'subtle'      // 12px spread, 0.25 opacity
  | 'pronounced'; // 16px spread, 0.3 opacity

/**
 * Elevation levels for shadows
 */
export type ElevationLevel =
  | 'flat'
  | 'raised'
  | 'floating'
  | 'modal'
  | 'tooltip';

/**
 * Border style variants
 */
export type BorderStyle =
  | 'none'
  | 'subtle'    // 1px, default opacity
  | 'default'   // 1px, hover opacity
  | 'focus';    // 2px, focus color

// ============================================================================
// Button Component
// ============================================================================

export interface ButtonProps {
  /**
   * Button variant determines color scheme
   * @default 'sage'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';

  /**
   * Button size affects padding and font size
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Glow intensity on hover (reduced from previous design)
   * @default 'subtle'
   */
  glowIntensity?: GlowIntensity;

  /**
   * Color theme for button
   * @default 'sage'
   */
  colorVariant?: ColorVariant;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Loading state shows spinner
   * @default false
   */
  loading?: boolean;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Icon to display before text
   */
  iconBefore?: React.ReactNode;

  /**
   * Icon to display after text
   */
  iconAfter?: React.ReactNode;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements (button text)
   */
  children: React.ReactNode;

  /**
   * HTML button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}

/**
 * Button styling configuration based on variant and state
 */
export interface ButtonStyleConfig {
  base: string;        // Base classes for all variants
  variants: {
    primary: string;   // Sage accent background with glow
    secondary: string; // Earth accent background
    ghost: string;     // Transparent with text color
    outline: string;   // Border with transparent background
  };
  sizes: {
    sm: string;        // py-2 px-4, text-sm
    md: string;        // py-3 px-6, text-base
    lg: string;        // py-4 px-8, text-lg
    xl: string;        // py-5 px-10, text-xl
  };
  disabled: string;    // Opacity 0.5, cursor not-allowed
  loading: string;     // Opacity 0.7, cursor wait
}

// ============================================================================
// Card Component
// ============================================================================

export interface CardProps {
  /**
   * Elevation level determines shadow intensity
   * @default 'raised'
   */
  elevation?: ElevationLevel;

  /**
   * Border style (soft borders preferred)
   * @default 'subtle'
   */
  borderStyle?: BorderStyle;

  /**
   * Backdrop blur intensity (reduced from previous design)
   * 'minimal' = 4px, 'standard' = 8px
   * @default 'minimal'
   */
  blurIntensity?: 'none' | 'minimal' | 'standard';

  /**
   * Interactive card shows hover effects
   * @default false
   */
  interactive?: boolean;

  /**
   * Padding size
   * @default 'comfortable'
   */
  padding?: 'compact' | 'comfortable' | 'spacious';

  /**
   * Show gradient overlay
   * @default true
   */
  showOverlay?: boolean;

  /**
   * Glow effect on hover (for interactive cards)
   * @default 'subtle'
   */
  hoverGlow?: GlowIntensity;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Click handler (for interactive cards)
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * ARIA role
   */
  role?: string;

  /**
   * ARIA label
   */
  ariaLabel?: string;
}

/**
 * Card styling configuration
 */
export interface CardStyleConfig {
  base: string;           // Base card styles
  elevation: {
    flat: string;         // No shadow
    raised: string;       // shadows.sm
    floating: string;     // shadows.md
    modal: string;        // shadows.xl
    tooltip: string;      // shadows.lg
  };
  borders: {
    none: string;         // No border
    subtle: string;       // 1px, rgba(200, 202, 205, 0.08)
    default: string;      // 1px, rgba(200, 202, 205, 0.15)
    focus: string;        // 2px, rgba(143, 168, 143, 0.4)
  };
  blur: {
    none: string;         // No blur
    minimal: string;      // backdrop-blur-[4px]
    standard: string;     // backdrop-blur-[8px]
  };
  interactive: {
    hover: string;        // Transform, glow, border changes
    active: string;       // Reduced transform, opacity change
  };
  padding: {
    compact: string;      // p-3
    comfortable: string;  // p-4
    spacious: string;     // p-6
  };
}

// ============================================================================
// TechnologyCard Component
// ============================================================================

export interface TechnologyCardProps {
  /**
   * Technology name
   */
  name: string;

  /**
   * Technology category (Frontend, Backend, AI/ML, etc.)
   */
  category: string;

  /**
   * Technology icon/logo
   */
  icon?: React.ReactNode;

  /**
   * Icon URL (alternative to icon node)
   */
  iconUrl?: string;

  /**
   * Proficiency level (1-5 or percentage)
   */
  proficiency?: number;

  /**
   * Show proficiency indicator
   * @default true
   */
  showProficiency?: boolean;

  /**
   * Card size
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Color variant
   * @default 'sage'
   */
  colorVariant?: ColorVariant;

  /**
   * Interactive card
   * @default true
   */
  interactive?: boolean;

  /**
   * Click handler
   */
  onClick?: (technology: string) => void;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Description text
   */
  description?: string;
}

/**
 * Technology proficiency indicator styling
 */
export interface ProficiencyIndicatorProps {
  /**
   * Proficiency level (0-100 or 1-5)
   */
  level: number;

  /**
   * Display type
   * @default 'dots'
   */
  type?: 'dots' | 'bar' | 'percentage';

  /**
   * Color variant
   * @default 'sage'
   */
  colorVariant?: ColorVariant;

  /**
   * Size variant
   * @default 'sm'
   */
  size?: 'sm' | 'md';

  /**
   * Show label
   * @default false
   */
  showLabel?: boolean;
}

// ============================================================================
// PortfolioCard Component
// ============================================================================

export interface PortfolioCardProps {
  /**
   * Project title
   */
  title: string;

  /**
   * Project description
   */
  description: string;

  /**
   * Project image URL
   */
  imageUrl: string;

  /**
   * Image alt text for accessibility
   */
  imageAlt: string;

  /**
   * Technologies used
   */
  technologies: string[];

  /**
   * Project tags/categories
   */
  tags?: string[];

  /**
   * Featured project indicator
   * @default false
   */
  featured?: boolean;

  /**
   * Project URL
   */
  projectUrl?: string;

  /**
   * GitHub repository URL
   */
  githubUrl?: string;

  /**
   * Click handler (opens modal/detail view)
   */
  onClick?: (projectId: string) => void;

  /**
   * Project unique identifier
   */
  id: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Animation variant
   * @default 'subtle'
   */
  animationIntensity?: AnimationIntensity;
}

/**
 * Portfolio card image overlay styling
 */
export interface ImageOverlayConfig {
  /**
   * Default overlay (visible state)
   */
  default: string;     // Darkening gradient

  /**
   * Hover overlay
   */
  hover: string;       // Reduced opacity for better image visibility

  /**
   * Featured project overlay
   */
  featured: string;    // Special accent overlay
}

// ============================================================================
// GradientText Component
// ============================================================================

export interface GradientTextProps {
  /**
   * Gradient variant (muted earth tones)
   * @default 'sage-earth'
   */
  variant?: 'sage-earth' | 'earth-olive' | 'subtle' | 'custom';

  /**
   * Custom gradient CSS (for variant='custom')
   */
  customGradient?: string;

  /**
   * Text size
   * @default 'inherit'
   */
  size?: 'inherit' | ComponentSize | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

  /**
   * Font weight
   * @default 'normal'
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Animate gradient on hover
   * @default false
   */
  animateOnHover?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Text content
   */
  children: React.ReactNode;

  /**
   * HTML tag to render
   * @default 'span'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

// ============================================================================
// AnimatedSection Component
// ============================================================================

export interface AnimatedSectionProps {
  /**
   * Animation variant (reduced intensity from previous design)
   * @default 'subtle'
   */
  animationIntensity?: AnimationIntensity;

  /**
   * Animation direction
   * @default 'up'
   */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';

  /**
   * Animation delay in ms
   * @default 0
   */
  delay?: number;

  /**
   * Animation duration in ms
   * @default 400
   */
  duration?: number;

  /**
   * Trigger animation on scroll into view
   * @default true
   */
  triggerOnScroll?: boolean;

  /**
   * Intersection threshold (0-1)
   * @default 0.2
   */
  threshold?: number;

  /**
   * Respect prefers-reduced-motion
   * @default true
   */
  respectReducedMotion?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Section content
   */
  children: React.ReactNode;

  /**
   * HTML tag to render
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'aside';
}

/**
 * Animation variant configurations
 */
export interface AnimationVariantConfig {
  subtle: {
    duration: number;      // 300ms
    transform: string;     // translateY(6px)
    opacity: {
      from: number;        // 0.9
      to: number;          // 1
    };
  };
  standard: {
    duration: number;      // 400ms
    transform: string;     // translateY(10px)
    opacity: {
      from: number;        // 0
      to: number;          // 1
    };
  };
  pronounced: {
    duration: number;      // 600ms
    transform: string;     // translateY(16px)
    opacity: {
      from: number;        // 0
      to: number;          // 1
    };
  };
}

// ============================================================================
// GlowEffect Component
// ============================================================================

export interface GlowEffectProps {
  /**
   * Glow intensity (significantly reduced from previous design)
   * @default 'subtle'
   */
  intensity?: GlowIntensity;

  /**
   * Glow color variant
   * @default 'sage'
   */
  colorVariant?: ColorVariant;

  /**
   * Show only on hover
   * @default false
   */
  showOnHover?: boolean;

  /**
   * Glow position
   * @default 'center'
   */
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';

  /**
   * Animate glow (pulse effect)
   * @default false
   */
  animate?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements to wrap with glow
   */
  children: React.ReactNode;
}

/**
 * Glow styling configuration
 */
export interface GlowStyleConfig {
  intensity: {
    minimal: string;      // 0 0 8px rgba(143, 168, 143, 0.2)
    subtle: string;       // 0 0 12px rgba(143, 168, 143, 0.25)
    pronounced: string;   // 0 0 16px rgba(143, 168, 143, 0.3)
  };
  colors: {
    sage: string;         // rgba(143, 168, 143, ...)
    earth: string;        // rgba(168, 147, 131, ...)
    olive: string;        // rgba(122, 131, 102, ...)
    neutral: string;      // rgba(200, 202, 205, ...)
  };
}

// ============================================================================
// Input Components
// ============================================================================

export interface InputProps {
  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';

  /**
   * Input label
   */
  label?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Input value
   */
  value?: string;

  /**
   * Change handler
   */
  onChange?: (value: string) => void;

  /**
   * Blur handler
   */
  onBlur?: () => void;

  /**
   * Focus handler
   */
  onFocus?: () => void;

  /**
   * Validation state
   * @default 'neutral'
   */
  validationState?: 'neutral' | 'valid' | 'invalid';

  /**
   * Error message
   */
  errorMessage?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Required field indicator
   * @default false
   */
  required?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Input size
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Icon to display before input
   */
  iconBefore?: React.ReactNode;

  /**
   * Icon to display after input
   */
  iconAfter?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Input ID for label association
   */
  id?: string;

  /**
   * Input name attribute
   */
  name?: string;

  /**
   * ARIA label
   */
  ariaLabel?: string;
}

export interface TextareaProps extends Omit<InputProps, 'type' | 'iconBefore' | 'iconAfter'> {
  /**
   * Number of visible rows
   * @default 4
   */
  rows?: number;

  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';

  /**
   * Maximum character count
   */
  maxLength?: number;

  /**
   * Show character counter
   * @default false
   */
  showCharacterCount?: boolean;
}

// ============================================================================
// Modal Component
// ============================================================================

export interface ModalProps {
  /**
   * Modal visibility
   */
  isOpen: boolean;

  /**
   * Close handler
   */
  onClose: () => void;

  /**
   * Modal title
   */
  title?: string;

  /**
   * Modal size
   * @default 'md'
   */
  size?: ComponentSize | '2xl' | '3xl' | 'full';

  /**
   * Show close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Close on overlay click
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Close on escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Backdrop blur intensity
   * @default 'standard'
   */
  backdropBlur?: 'minimal' | 'standard' | 'strong';

  /**
   * Animation intensity
   * @default 'standard'
   */
  animationIntensity?: AnimationIntensity;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Footer content (action buttons)
   */
  footer?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA label
   */
  ariaLabel?: string;
}

// ============================================================================
// Navigation Component
// ============================================================================

export interface NavigationProps {
  /**
   * Navigation items
   */
  items: NavigationItem[];

  /**
   * Active item ID
   */
  activeItemId?: string;

  /**
   * Sticky navigation
   * @default true
   */
  sticky?: boolean;

  /**
   * Show background blur on scroll
   * @default true
   */
  blurOnScroll?: boolean;

  /**
   * Logo element
   */
  logo?: React.ReactNode;

  /**
   * CTA button element
   */
  ctaButton?: React.ReactNode;

  /**
   * Mobile menu open state
   */
  mobileMenuOpen?: boolean;

  /**
   * Toggle mobile menu
   */
  onToggleMobileMenu?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface NavigationItem {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Link href
   */
  href: string;

  /**
   * Icon
   */
  icon?: React.ReactNode;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Click handler (for custom navigation logic)
   */
  onClick?: () => void;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Responsive prop type - allows different values per breakpoint
 */
export type ResponsiveProp<T> = T | {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  ultrawide?: T;
};

/**
 * Theme context type
 */
export interface ThemeContextType {
  colors: typeof import('./design-tokens.json').tokens.colors;
  gradients: typeof import('./design-tokens.json').tokens.gradients;
  shadows: typeof import('./design-tokens.json').tokens.shadows;
  animation: typeof import('./design-tokens.json').tokens.animation;
  spacing: typeof import('./design-tokens.json').tokens.spacing;
  typography: typeof import('./design-tokens.json').tokens.typography;
  breakpoints: typeof import('./design-tokens.json').breakpoints;
}

/**
 * Framer Motion animation variants for consistent animations
 */
export interface MotionVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration: number;
      ease: string;
      delay?: number;
    };
  };
  exit?: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
}

// ============================================================================
// Export All Types
// ============================================================================

export type {
  ButtonProps,
  ButtonStyleConfig,
  CardProps,
  CardStyleConfig,
  TechnologyCardProps,
  ProficiencyIndicatorProps,
  PortfolioCardProps,
  ImageOverlayConfig,
  GradientTextProps,
  AnimatedSectionProps,
  AnimationVariantConfig,
  GlowEffectProps,
  GlowStyleConfig,
  InputProps,
  TextareaProps,
  ModalProps,
  NavigationProps,
  NavigationItem,
  ResponsiveProp,
  ThemeContextType,
  MotionVariants,
};
