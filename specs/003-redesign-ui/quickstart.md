# Developer Quickstart Guide: Modern Dark UI Redesign

**Feature**: 003-redesign-ui | **Date**: 2026-01-27 | **Version**: 2.0.0

## Overview

This guide provides step-by-step instructions for implementing the modern dark UI redesign. The design system features muted earth-tone accents, reduced animation intensity, soft borders with minimal glassmorphism, and large ambient gradient backgrounds while maintaining WCAG AA compliance.

---

## Table of Contents

1. [Setup & Prerequisites](#setup--prerequisites)
2. [Design Token Usage](#design-token-usage)
3. [Component Updates](#component-updates)
4. [Animation Guidelines](#animation-guidelines)
5. [Testing Requirements](#testing-requirements)
6. [Performance Validation](#performance-validation)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

---

## Setup & Prerequisites

### Required Files

Ensure these Phase 1 artifacts exist:
- ✅ `specs/003-redesign-ui/data-model.md` - Design token definitions
- ✅ `specs/003-redesign-ui/contracts/design-tokens.json` - JSON schema
- ✅ `specs/003-redesign-ui/contracts/component-props.ts` - TypeScript types

### Dependencies

Check your `package.json` includes:
```json
{
  "dependencies": {
    "next": "^15.1.5",
    "react": "^19.0.0",
    "tailwindcss": "^4.1.18",
    "framer-motion": "^12.29.2"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^19.0.0",
    "@types/node": "^20.0.0"
  }
}
```

### Import Type Definitions

Add to your component files:
```typescript
import type {
  ButtonProps,
  CardProps,
  AnimationIntensity,
  GlowIntensity,
  ColorVariant
} from '@/specs/003-redesign-ui/contracts/component-props';
```

---

## Design Token Usage

### 1. Updating Tailwind Config

Replace `tailwind.config.ts` color values with new muted earth-tone palette:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0A0D16',      // Deep charcoal (was #0A0E27)
        'bg-secondary': '#12151F',    // Slightly lighter (was #0F172A)
        'bg-surface': '#1A1E2E',      // Card/surface (was #1E293B)
        'bg-overlay': 'rgba(10, 13, 22, 0.95)',

        // Text colors (enhanced contrast)
        'text-primary': '#F8F9FA',    // High contrast white
        'text-secondary': '#C8CACD',  // Muted light gray
        'text-muted': '#8B8D91',      // Subtle gray
        'text-disabled': '#5A5C60',   // Low emphasis

        // Accent colors - MUTED EARTH TONES (NEW)
        'accent-sage-light': '#8FA88F',
        'accent-sage': '#6B8270',
        'accent-sage-dark': '#4A5D52',

        'accent-earth-light': '#C9B8A8',
        'accent-earth': '#A89383',
        'accent-earth-dark': '#7D6D5E',

        'accent-olive-light': '#9AA184',
        'accent-olive': '#7A8366',
        'accent-olive-dark': '#5A6248',

        // Semantic colors (muted)
        'semantic-success': '#6B9B7C',
        'semantic-error': '#C67C7C',
        'semantic-warning': '#D4A574',
        'semantic-info': '#7B9BAD',

        // Border colors (subtle)
        'border-default': 'rgba(200, 202, 205, 0.08)',
        'border-hover': 'rgba(200, 202, 205, 0.15)',
        'border-focus': 'rgba(143, 168, 143, 0.4)',
        'border-divider': 'rgba(200, 202, 205, 0.05)',
      },

      // Shadows - UPDATED FOR DARK BACKGROUNDS
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.4)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.5)',
        'xl': '0 8px 16px rgba(0, 0, 0, 0.6)',
        '2xl': '0 12px 24px rgba(0, 0, 0, 0.7)',

        // Glow effects - SIGNIFICANTLY REDUCED
        'glow-minimal': '0 0 8px rgba(143, 168, 143, 0.2)',
        'glow-subtle': '0 0 12px rgba(143, 168, 143, 0.25)',
        'glow-pronounced': '0 0 16px rgba(143, 168, 143, 0.3)',
      },

      // Backdrop blur - REDUCED INTENSITY
      backdropBlur: {
        'subtle': '4px',   // Down from 12px
        'medium': '8px',   // Down from 16px
        'strong': '12px',  // Only for modals
      },

      // Animation durations - REDUCED
      transitionDuration: {
        '75': '75ms',
        '150': '150ms',
        '300': '300ms',   // New default (was 600ms)
        '400': '400ms',   // New moderate (was 600ms)
        '600': '600ms',   // Reserved for page transitions
      },

      // Keyframes - REDUCED MOVEMENT
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0.9',              // Start higher (was 0)
            transform: 'translateY(10px)', // Less movement (was 20px)
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },

      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out', // Faster (was 0.6s)
      },
    },
  },
  plugins: [],
};

export default config;
```

### 2. Updating Global CSS

Add/update in `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Background colors */
    --bg-primary: #0A0D16;
    --bg-secondary: #12151F;
    --bg-surface: #1A1E2E;
    --bg-overlay: rgba(10, 13, 22, 0.95);

    /* Text colors */
    --text-primary: #F8F9FA;
    --text-secondary: #C8CACD;
    --text-muted: #8B8D91;
    --text-disabled: #5A5C60;

    /* Accent colors */
    --accent-sage-light: #8FA88F;
    --accent-sage: #6B8270;
    --accent-sage-dark: #4A5D52;

    --accent-earth-light: #C9B8A8;
    --accent-earth: #A89383;
    --accent-earth-dark: #7D6D5E;

    --accent-olive-light: #9AA184;
    --accent-olive: #7A8366;
    --accent-olive-dark: #5A6248;

    /* Semantic colors */
    --semantic-success: #6B9B7C;
    --semantic-error: #C67C7C;
    --semantic-warning: #D4A574;
    --semantic-info: #7B9BAD;

    /* Border colors */
    --border-default: rgba(200, 202, 205, 0.08);
    --border-hover: rgba(200, 202, 205, 0.15);
    --border-focus: rgba(143, 168, 143, 0.4);
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-inter), sans-serif;
  }
}

@layer utilities {
  /* Large ambient gradient background */
  .ambient-gradient {
    background:
      radial-gradient(
        ellipse 80% 60% at 20% 30%,
        rgba(107, 130, 112, 0.06) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse 70% 50% at 80% 70%,
        rgba(168, 147, 131, 0.04) 0%,
        transparent 50%
      ),
      var(--bg-primary);
  }

  /* Muted gradient text */
  .text-gradient-sage-earth {
    background: linear-gradient(135deg, #8FA88F 0%, #A89383 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text-gradient-subtle {
    background: linear-gradient(135deg, #F8F9FA 0%, #C8CACD 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Card with soft border and minimal blur */
  .card-minimal {
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    border-radius: 0.75rem;
    backdrop-filter: blur(4px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    transition: all 300ms ease-out;
  }

  .card-minimal:hover {
    border-color: var(--border-hover);
    box-shadow: 0 0 12px rgba(143, 168, 143, 0.25);
    transform: translateY(-2px); /* Reduced from -4px */
  }

  /* Subtle glow effect */
  .glow-sage {
    box-shadow: 0 0 12px rgba(143, 168, 143, 0.25);
  }

  .glow-earth {
    box-shadow: 0 0 12px rgba(168, 147, 131, 0.25);
  }

  /* Focus visible styles for accessibility */
  .focus-visible-sage:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
    box-shadow: 0 0 8px rgba(143, 168, 143, 0.2);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

---

## Component Updates

### 1. Button Component

**Location**: `src/components/ui/Button.tsx`

**Changes**:
- Replace vibrant gradients with muted sage/earth accents
- Reduce glow intensity from 0.5-0.7 to 0.2-0.25
- Reduce hover lift from 4px to 2px
- Update transition duration from 600ms to 300ms

**Implementation**:

```tsx
import React from 'react';
import { ButtonProps } from '@/specs/003-redesign-ui/contracts/component-props';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glowIntensity = 'subtle',
  colorVariant = 'sage',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconBefore,
  iconAfter,
  onClick,
  className = '',
  children,
  type = 'button',
  ariaLabel,
}) => {
  // Base styles - all variants
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg
    transition-all duration-300 ease-out
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-accent-sage focus-visible:ring-offset-2
    focus-visible:ring-offset-bg-primary
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  // Size variants
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
    xl: 'py-5 px-10 text-xl',
  };

  // Variant styles with muted colors
  const variantStyles = {
    primary: `
      bg-accent-sage text-white border border-transparent
      hover:bg-accent-sage-light hover:shadow-glow-subtle
      hover:-translate-y-0.5
      active:translate-y-0 active:opacity-95
    `,
    secondary: `
      bg-accent-earth text-white border border-transparent
      hover:bg-accent-earth-light hover:shadow-glow-subtle
      hover:-translate-y-0.5
      active:translate-y-0 active:opacity-95
    `,
    ghost: `
      bg-transparent text-accent-sage border border-transparent
      hover:bg-accent-sage/10 hover:text-accent-sage-light
      active:opacity-90
    `,
    outline: `
      bg-transparent text-accent-sage border border-accent-sage
      hover:bg-accent-sage/10 hover:border-accent-sage-light
      hover:shadow-glow-minimal
      active:opacity-90
    `,
  };

  const combinedStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedStyles}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading && (
        <span className="animate-spin">⏳</span>
      )}
      {!loading && iconBefore && <span>{iconBefore}</span>}
      {children}
      {!loading && iconAfter && <span>{iconAfter}</span>}
    </button>
  );
};
```

### 2. Card Component

**Location**: `src/components/ui/Card.tsx`

**Changes**:
- Replace heavy glassmorphism (12-16px blur) with minimal blur (4-8px)
- Change border from rgba(255,255,255,0.05) to soft border with 0.08 opacity
- Reduce hover lift from 4px to 2px
- Update glow from 20px @ 0.5 opacity to 12px @ 0.25 opacity

**Implementation**:

```tsx
import React from 'react';
import { CardProps } from '@/specs/003-redesign-ui/contracts/component-props';

export const Card: React.FC<CardProps> = ({
  elevation = 'raised',
  borderStyle = 'subtle',
  blurIntensity = 'minimal',
  interactive = false,
  padding = 'comfortable',
  showOverlay = true,
  hoverGlow = 'subtle',
  className = '',
  onClick,
  children,
  role,
  ariaLabel,
}) => {
  // Base card styles
  const baseStyles = 'relative overflow-hidden transition-all duration-300 ease-out';

  // Elevation (shadow) styles
  const elevationStyles = {
    flat: '',
    raised: 'shadow-sm',
    floating: 'shadow-md',
    modal: 'shadow-xl',
    tooltip: 'shadow-lg',
  };

  // Border styles
  const borderStyles = {
    none: '',
    subtle: 'border border-border-default',
    default: 'border border-border-hover',
    focus: 'border-2 border-border-focus',
  };

  // Blur styles - REDUCED INTENSITY
  const blurStyles = {
    none: '',
    minimal: 'backdrop-blur-[4px]', // Down from 12px
    standard: 'backdrop-blur-[8px]', // Down from 16px
  };

  // Padding styles
  const paddingStyles = {
    compact: 'p-3',
    comfortable: 'p-4',
    spacious: 'p-6',
  };

  // Interactive styles
  const interactiveStyles = interactive
    ? `cursor-pointer
       hover:border-border-hover
       hover:-translate-y-0.5
       hover:shadow-glow-${hoverGlow}
       active:translate-y-0 active:opacity-95`
    : '';

  const combinedStyles = `
    ${baseStyles}
    ${elevationStyles[elevation]}
    ${borderStyles[borderStyle]}
    ${blurStyles[blurIntensity]}
    ${paddingStyles[padding]}
    ${interactiveStyles}
    bg-bg-surface rounded-xl
    ${className}
  `;

  return (
    <div
      className={combinedStyles}
      onClick={interactive ? onClick : undefined}
      role={role}
      aria-label={ariaLabel}
      tabIndex={interactive ? 0 : undefined}
    >
      {/* Subtle gradient overlay */}
      {showOverlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
```

### 3. TechnologyCard Component

**Location**: `src/components/ui/TechnologyCard.tsx`

**Changes**:
- Update to use new Card component with soft borders
- Change proficiency badge colors to muted accents
- Reduce animation intensity

**Implementation**:

```tsx
import React from 'react';
import { Card } from './Card';
import { TechnologyCardProps } from '@/specs/003-redesign-ui/contracts/component-props';

export const TechnologyCard: React.FC<TechnologyCardProps> = ({
  name,
  category,
  icon,
  iconUrl,
  proficiency,
  showProficiency = true,
  size = 'md',
  colorVariant = 'sage',
  interactive = true,
  onClick,
  className = '',
  description,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(name);
    }
  };

  const sizeStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  return (
    <Card
      interactive={interactive}
      onClick={handleClick}
      padding="comfortable"
      borderStyle="subtle"
      blurIntensity="minimal"
      className={`${sizeStyles[size]} ${className}`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center mb-4">
        {iconUrl ? (
          <img src={iconUrl} alt={name} className="w-12 h-12 object-contain" />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>

      {/* Category badge */}
      <div className="mb-2">
        <span className="text-xs px-2 py-1 rounded bg-accent-sage/10 text-accent-sage border border-accent-sage/20">
          {category}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {name}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-text-secondary mb-3">
          {description}
        </p>
      )}

      {/* Proficiency indicator */}
      {showProficiency && proficiency !== undefined && (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-full rounded-full transition-colors duration-300 ${
                index < proficiency
                  ? 'bg-accent-sage'
                  : 'bg-border-default'
              }`}
            />
          ))}
        </div>
      )}
    </Card>
  );
};
```

---

## Animation Guidelines

### 1. Animation Parameters

**BEFORE (Old Design)**:
- Duration: 600ms
- Transform: translateY(20px)
- Opacity: 0 → 1
- Hover lift: 4px

**AFTER (New Design)**:
- Duration: 300-400ms
- Transform: translateY(6-10px)
- Opacity: 0.9 → 1 (subtle variant)
- Hover lift: 2px

### 2. Framer Motion Variants

Update `src/lib/animations.ts`:

```typescript
import { MotionVariants } from '@/specs/003-redesign-ui/contracts/component-props';

/**
 * Reduced-intensity animation variants
 */
export const animationVariants = {
  // Subtle variant - minimal movement
  subtle: {
    hidden: { opacity: 0.9, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  } as MotionVariants,

  // Standard variant - moderate movement
  standard: {
    hidden: { opacity: 0, y: 10 },
    visible: {
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
    },
  } as MotionVariants,

  // Pronounced variant - for emphasis
  pronounced: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  } as MotionVariants,

  // Fade only (respects reduced motion)
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  } as MotionVariants,
};

/**
 * Stagger configuration for child animations
 */
export const staggerConfig = {
  visible: {
    transition: {
      staggerChildren: 0.08, // Reduced from 0.1
      delayChildren: 0.1,
    },
  },
};
```

### 3. Using Animations in Components

```tsx
import { motion } from 'framer-motion';
import { animationVariants } from '@/lib/animations';

export const AnimatedSection: React.FC = ({ children }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={animationVariants.subtle}
    >
      {children}
    </motion.section>
  );
};
```

### 4. Reduced Motion Support

Always include reduced motion support:

```tsx
import { useReducedMotion } from 'framer-motion';

export const Component: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion
    ? animationVariants.fade
    : animationVariants.standard;

  return (
    <motion.div variants={variants}>
      {/* content */}
    </motion.div>
  );
};
```

---

## Testing Requirements

### 1. Visual Regression Testing

**Setup**:
```bash
npm install --save-dev @playwright/test
npx playwright install
```

**Test file** (`tests/visual-regression.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Modern Dark UI', () => {
  test('Hero section displays with muted gradient', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    await expect(page).toHaveScreenshot('hero-section.png');
  });

  test('Technology cards have soft borders', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const techCard = page.locator('[data-testid="tech-card"]').first();
    await expect(techCard).toBeVisible();

    // Verify border styling
    const borderColor = await techCard.evaluate((el) =>
      window.getComputedStyle(el).borderColor
    );
    expect(borderColor).toContain('rgba');
  });

  test('Button hover shows subtle glow', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const button = page.locator('[data-testid="cta-button"]').first();

    // Hover and capture
    await button.hover();
    await page.waitForTimeout(300); // Wait for transition
    await expect(page).toHaveScreenshot('button-hover.png');
  });
});
```

### 2. Accessibility Testing

**Setup**:
```bash
npm install --save-dev @axe-core/playwright
```

**Test file** (`tests/accessibility.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility - WCAG AA Compliance', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('color contrast meets WCAG AA', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toHaveLength(0);
  });

  test('focus indicators are visible on dark background', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const button = page.locator('button').first();
    await button.focus();

    // Check for visible outline
    const outline = await button.evaluate((el) =>
      window.getComputedStyle(el).outline
    );

    expect(outline).not.toBe('none');
  });
});
```

### 3. Animation Performance Testing

**Test file** (`tests/performance.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';

test.describe('Animation Performance', () => {
  test('animations run at 60fps', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Start performance recording
    await page.evaluate(() => {
      (window as any).performanceData = [];
      let lastTime = performance.now();

      function measureFPS() {
        const currentTime = performance.now();
        const fps = 1000 / (currentTime - lastTime);
        (window as any).performanceData.push(fps);
        lastTime = currentTime;

        if ((window as any).performanceData.length < 60) {
          requestAnimationFrame(measureFPS);
        }
      }

      requestAnimationFrame(measureFPS);
    });

    // Trigger animation by scrolling
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1000);

    // Get FPS data
    const performanceData = await page.evaluate(() =>
      (window as any).performanceData
    );

    const avgFPS = performanceData.reduce((a: number, b: number) => a + b, 0) / performanceData.length;

    // Should maintain at least 60fps
    expect(avgFPS).toBeGreaterThanOrEqual(55); // Allow 5fps margin
  });
});
```

---

## Performance Validation

### 1. Lighthouse CI

**Setup** (`.github/workflows/lighthouse.yml`):
```yaml
name: Lighthouse CI

on:
  pull_request:
    branches: [main, 003-redesign-ui]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

**Config file** (`.lighthouserc.json`):
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./out",
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "first-contentful-paint": ["error", { "maxNumericValue": 1500 }],
        "interactive": ["error", { "maxNumericValue": 3000 }],
        "performance": ["error", { "minScore": 0.9 }],
        "accessibility": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

### 2. Bundle Size Monitoring

**Setup**:
```bash
npm install --save-dev @next/bundle-analyzer
```

**Config** (`next.config.ts`):
```typescript
import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // ... other config
};

export default withBundleAnalyzer(nextConfig);
```

**Run analysis**:
```bash
ANALYZE=true npm run build
```

**Validate**:
- Total bundle size < 200KB gzipped
- First Load JS < 150KB
- Shared by all < 80KB

### 3. Core Web Vitals

Monitor in production with analytics:

```typescript
// src/app/layout.tsx
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    console.log(metric);

    // Send to analytics
    // Example: analytics.track('web-vital', metric);

    // Validate against targets
    const targets = {
      LCP: 2500,  // Largest Contentful Paint < 2.5s
      FID: 100,   // First Input Delay < 100ms
      CLS: 0.1,   // Cumulative Layout Shift < 0.1
    };

    if (metric.name in targets) {
      const target = targets[metric.name as keyof typeof targets];
      if (metric.value > target) {
        console.warn(`${metric.name} exceeds target: ${metric.value} > ${target}`);
      }
    }
  }
}
```

---

## Common Patterns

### 1. Large Ambient Gradient Background

```tsx
// src/components/sections/Hero.tsx
export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen ambient-gradient">
      {/* Content */}
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </section>
  );
};
```

### 2. Muted Gradient Text

```tsx
<h1 className="text-5xl font-bold">
  <span className="text-gradient-sage-earth">
    AI Engineer Portfolio
  </span>
</h1>
```

### 3. Card with Soft Border and Minimal Blur

```tsx
<Card
  borderStyle="subtle"
  blurIntensity="minimal"
  interactive
  hoverGlow="subtle"
>
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-text-secondary">Card content...</p>
</Card>
```

### 4. Reduced Animation Scroll Effect

```tsx
import { motion } from 'framer-motion';
import { animationVariants } from '@/lib/animations';

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
  variants={animationVariants.subtle}
>
  <p>This will fade in with minimal movement</p>
</motion.div>
```

---

## Troubleshooting

### Issue 1: Color Contrast Failing WCAG AA

**Problem**: Text is not readable on dark background.

**Solution**:
- Use `text-text-primary` (#F8F9FA) for body text (15.8:1 contrast)
- Use `text-text-secondary` (#C8CACD) for secondary text (9.2:1 contrast)
- Avoid using accent colors directly for text; use them for highlights only
- Test with WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

### Issue 2: Animations Too Slow

**Problem**: Animations feel sluggish.

**Solution**:
- Verify `duration-300` (300ms) is being used, not `duration-600` (600ms)
- Check that `ease-out` easing is applied
- Ensure transform distances are 6-10px, not 20px+
- Verify Framer Motion variants use `duration: 0.3` or `0.4`, not `0.6`

### Issue 3: Glow Effects Too Intense

**Problem**: Glow effects are overpowering.

**Solution**:
- Use `shadow-glow-minimal` (8px @ 0.2 opacity) or `shadow-glow-subtle` (12px @ 0.25 opacity)
- Avoid `shadow-glow-pronounced` except for primary CTAs
- Check opacity values: should be 0.2-0.3, not 0.5-0.7
- Ensure glow spread is 8-16px, not 20-40px

### Issue 4: Glassmorphism Too Heavy

**Problem**: Cards have too much blur, creating performance issues.

**Solution**:
- Use `backdrop-blur-[4px]` (subtle) as default
- Use `backdrop-blur-[8px]` (medium) sparingly
- Reserve `backdrop-blur-[12px]` (strong) for modals only
- Remove any `backdrop-blur-lg` or `backdrop-blur-xl` (12px+)

### Issue 5: Focus Indicators Not Visible

**Problem**: Can't see focus outlines on dark background.

**Solution**:
- Use `border-focus` color: rgba(143, 168, 143, 0.4)
- Add `outline: 2px solid` with `outline-offset: 2px`
- Include subtle glow: `shadow-glow-minimal`
- Test with keyboard navigation

### Issue 6: Performance Issues on Mobile

**Problem**: Animations stuttering on mobile devices.

**Solution**:
- Reduce effect intensity on mobile breakpoints
- Disable backdrop blur below 768px: `md:backdrop-blur-[4px]`
- Simplify gradients for mobile
- Use `will-change: transform` sparingly and only during animations
- Test on real devices, not just DevTools

---

## Next Steps

After implementing the design system:

1. **Update all components** following patterns in this guide
2. **Run visual regression tests** to catch unintended changes
3. **Perform accessibility audit** with axe-core
4. **Monitor performance** with Lighthouse CI
5. **Test on real devices** across different screen sizes
6. **Document any customizations** in component-specific READMEs

---

## Additional Resources

- [data-model.md](./data-model.md) - Full design token definitions
- [contracts/design-tokens.json](./contracts/design-tokens.json) - JSON schema
- [contracts/component-props.ts](./contracts/component-props.ts) - TypeScript types
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Questions or Issues?**

If you encounter problems not covered in this guide, check the troubleshooting section or refer to the Phase 0 research findings for additional context on design decisions.
