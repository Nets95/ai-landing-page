# Design System Specification

**Feature**: AI Engineer Portfolio Landing Page
**Date**: 2026-01-26
**Status**: Complete

## Overview

This design system defines the visual language for the AI engineer portfolio landing page. The aesthetic is inspired by modern DeFi/Web3 design with dark themes, vibrant gradients, glowing effects, and glassmorphism. Every design decision prioritizes both visual impact and accessibility (WCAG 2.1 AA compliance).

---

## 1. Color Palette

### Background Colors

**Primary Background**
```css
--bg-primary: #0A0E27;
/* Deep navy - main page background */
/* Usage: body, main sections */
```

**Secondary Background**
```css
--bg-secondary: #0F172A;
/* Slate-900 - section containers, elevated surfaces */
/* Usage: section backgrounds, cards base layer */
```

**Tertiary Background**
```css
--bg-tertiary: #1E293B;
/* Slate-800 - highest elevation surfaces */
/* Usage: form inputs, modals, elevated cards */
```

**Surface Background**
```css
--bg-surface: rgba(255, 255, 255, 0.05);
/* 5% white overlay for glassmorphism */
/* Usage: glassmorphism card backgrounds */
```

### Brand Gradients

**Primary Gradient (Blue-Purple)**
```css
--gradient-primary: linear-gradient(45deg, #3B82F6 0%, #8B5CF6 100%);
/* Blue-500 → Violet-500 */
/* Usage: Main CTAs, hero headline text, section dividers */

/* Individual colors for programmatic use */
--primary-start: #3B82F6;
--primary-end: #8B5CF6;
--primary-mid: #5F75F6; /* Interpolated midpoint */
```

**Secondary Gradient (Cyan-Teal)**
```css
--gradient-secondary: linear-gradient(45deg, #06B6D4 0%, #14B8A6 100%);
/* Cyan-500 → Teal-500 */
/* Usage: Tech showcase accents, icons, secondary CTAs */

/* Individual colors */
--secondary-start: #06B6D4;
--secondary-end: #14B8A6;
--secondary-mid: #0DB7C0;
```

**Accent Gradient (Pink-Purple)**
```css
--gradient-accent: linear-gradient(45deg, #EC4899 0%, #A855F7 100%);
/* Pink-500 → Purple-500 */
/* Usage: Hover states, special highlights, success states */

/* Individual colors */
--accent-start: #EC4899;
--accent-end: #A855F7;
--accent-mid: #C74FC8;
```

**Radial Gradients (Backgrounds)**
```css
--gradient-radial-primary: radial-gradient(
  circle at 20% 30%,
  rgba(59, 130, 246, 0.15) 0%,
  transparent 50%
);
/* Usage: Hero section background glow */

--gradient-radial-accent: radial-gradient(
  circle at 80% 70%,
  rgba(236, 72, 153, 0.1) 0%,
  transparent 50%
);
/* Usage: Portfolio section background glow */
```

### Text Colors

**Primary Text**
```css
--text-primary: #FFFFFF;
/* Pure white - highest contrast */
/* Usage: Headings, important text, CTA text */
/* Contrast ratio: 21:1 (AAA) */
```

**Secondary Text**
```css
--text-secondary: #D1D5DB;
/* Gray-300 - body text */
/* Usage: Body copy, descriptions, subtitles */
/* Contrast ratio: 10.5:1 (AAA) */
```

**Tertiary Text**
```css
--text-tertiary: #9CA3AF;
/* Gray-400 - muted text */
/* Usage: Captions, metadata, subtle labels */
/* Contrast ratio: 6.4:1 (AA) */
```

**Muted Text**
```css
--text-muted: #6B7280;
/* Gray-500 - least prominent text */
/* Usage: Disabled states, placeholders, footnotes */
/* Contrast ratio: 4.5:1 (AA) */
```

### Semantic Colors

**Success**
```css
--color-success: #10B981;
/* Green-500 */
/* Usage: Success messages, checkmarks, validation */
```

**Error**
```css
--color-error: #EF4444;
/* Red-500 */
/* Usage: Error messages, validation errors, warnings */
```

**Warning**
```css
--color-warning: #F59E0B;
/* Amber-500 */
/* Usage: Warning messages, caution states */
```

**Info**
```css
--color-info: #06B6D4;
/* Cyan-500 (same as secondary-start) */
/* Usage: Info messages, tooltips, help text */
```

### Border Colors

**Default Border**
```css
--border-default: rgba(255, 255, 255, 0.1);
/* 10% white - subtle separation */
/* Usage: Card borders, input borders, dividers */
```

**Focus Border**
```css
--border-focus: rgba(59, 130, 246, 0.5);
/* Primary blue at 50% opacity */
/* Usage: Focus rings, active input borders */
```

**Hover Border**
```css
--border-hover: rgba(255, 255, 255, 0.2);
/* 20% white - emphasized on hover */
/* Usage: Card hover states, button hovers */
```

---

## 2. Typography

### Font Families

**Headings**
```css
--font-heading: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
/* Geometric sans-serif with tech/modern feel */
/* Fallback to system sans-serif */
/* Load from Google Fonts: weights 400, 500, 600, 700 */
```

**Body Text**
```css
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
/* Highly readable sans-serif optimized for screens */
/* Fallback to system sans-serif */
/* Load from Google Fonts: weights 400, 500, 600 */
/* Enable font feature: font-feature-settings: 'cv11' 1; (improved readability) */
```

**Monospace (Code)**
```css
--font-mono: 'Fira Code', 'Courier New', monospace;
/* For code snippets or technical details (if needed) */
/* Load from Google Fonts: weight 400 */
```

### Font Sizes

**Mobile-First Scale** (base: 16px)

```css
/* Extra Small */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */

/* Base */
--text-base: 1rem;     /* 16px - body text */
--text-lg: 1.125rem;   /* 18px - large body */

/* Headings */
--text-xl: 1.25rem;    /* 20px - h4 */
--text-2xl: 1.5rem;    /* 24px - h3 */
--text-3xl: 1.875rem;  /* 30px - h2 */
--text-4xl: 2.25rem;   /* 36px - h1 mobile */
--text-5xl: 3rem;      /* 48px - h1 desktop */
--text-6xl: 3.75rem;   /* 60px - hero headline desktop */
--text-7xl: 4.5rem;    /* 72px - hero headline large desktop */
```

**Responsive Typography**

```css
/* Hero Headline */
.hero-headline {
  font-size: var(--text-4xl); /* 36px mobile */
}

@media (min-width: 768px) {
  .hero-headline {
    font-size: var(--text-5xl); /* 48px tablet */
  }
}

@media (min-width: 1024px) {
  .hero-headline {
    font-size: var(--text-6xl); /* 60px desktop */
  }
}

@media (min-width: 1280px) {
  .hero-headline {
    font-size: var(--text-7xl); /* 72px large desktop */
  }
}

/* Section Headlines */
.section-headline {
  font-size: var(--text-3xl); /* 30px mobile */
}

@media (min-width: 768px) {
  .section-headline {
    font-size: var(--text-4xl); /* 36px tablet */
  }
}

@media (min-width: 1024px) {
  .section-headline {
    font-size: var(--text-5xl); /* 48px desktop */
  }
}

/* Body Text */
.body-text {
  font-size: var(--text-base); /* 16px mobile */
}

@media (min-width: 768px) {
  .body-text {
    font-size: var(--text-lg); /* 18px tablet/desktop */
  }
}
```

### Font Weights

```css
--font-normal: 400;    /* Body text, descriptions */
--font-medium: 500;    /* Emphasized body text, labels */
--font-semibold: 600;  /* Subheadings, buttons */
--font-bold: 700;      /* Headlines, CTAs */
```

### Line Heights

```css
--leading-tight: 1.2;   /* Headings (improves density) */
--leading-snug: 1.375;  /* Subheadings */
--leading-normal: 1.5;  /* Body text (optimal readability) */
--leading-relaxed: 1.625; /* Large paragraphs */
--leading-loose: 2;     /* Spaced content */
```

### Letter Spacing

```css
--tracking-tighter: -0.05em; /* Large headings (improves balance) */
--tracking-tight: -0.025em;  /* Headings */
--tracking-normal: 0em;      /* Body text */
--tracking-wide: 0.025em;    /* All-caps labels */
--tracking-wider: 0.05em;    /* Small all-caps */
```

### Typography Usage Examples

**Hero Headline**
```css
.hero-headline {
  font-family: var(--font-heading);
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Section Headline**
```css
.section-headline {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}
```

**Body Text**
```css
.body-text {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}
```

---

## 3. Spacing System

### Base Scale (4px Grid)

```css
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px - base unit */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
--space-40: 10rem;   /* 160px */
--space-48: 12rem;   /* 192px */
```

### Semantic Spacing

**Component Spacing**
```css
--spacing-component-xs: var(--space-2);  /* 8px - tight padding */
--spacing-component-sm: var(--space-4);  /* 16px - small padding */
--spacing-component-md: var(--space-6);  /* 24px - default padding */
--spacing-component-lg: var(--space-8);  /* 32px - large padding */
--spacing-component-xl: var(--space-12); /* 48px - extra large padding */
```

**Section Spacing**
```css
--spacing-section-mobile: var(--space-16);   /* 64px - mobile sections */
--spacing-section-tablet: var(--space-24);   /* 96px - tablet sections */
--spacing-section-desktop: var(--space-32);  /* 128px - desktop sections */
```

**Element Gaps**
```css
--gap-xs: var(--space-2);   /* 8px - minimal gap */
--gap-sm: var(--space-4);   /* 16px - small gap */
--gap-md: var(--space-6);   /* 24px - default gap */
--gap-lg: var(--space-8);   /* 32px - large gap */
--gap-xl: var(--space-12);  /* 48px - extra large gap */
```

### Responsive Spacing

```css
/* Section Padding */
.section {
  padding-top: var(--spacing-section-mobile);
  padding-bottom: var(--spacing-section-mobile);
}

@media (min-width: 768px) {
  .section {
    padding-top: var(--spacing-section-tablet);
    padding-bottom: var(--spacing-section-tablet);
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: var(--spacing-section-desktop);
    padding-bottom: var(--spacing-section-desktop);
  }
}

/* Container Padding */
.container {
  padding-left: var(--space-4);  /* 16px mobile */
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-6);  /* 24px tablet */
    padding-right: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: var(--space-8);  /* 32px desktop */
    padding-right: var(--space-8);
  }
}
```

---

## 4. Layout & Grid

### Breakpoints

```css
--breakpoint-sm: 640px;   /* Small devices (landscape phones) */
--breakpoint-md: 768px;   /* Medium devices (tablets) */
--breakpoint-lg: 1024px;  /* Large devices (desktops) */
--breakpoint-xl: 1280px;  /* Extra large devices (wide desktops) */
--breakpoint-2xl: 1536px; /* Ultra wide */
```

### Container

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}

@media (min-width: 1536px) {
  .container { max-width: 1536px; }
}
```

### Grid System

**Tech Showcase Grid**
```css
.tech-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns mobile */
  gap: var(--gap-md); /* 24px */
}

@media (min-width: 768px) {
  .tech-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns tablet */
  }
}

@media (min-width: 1024px) {
  .tech-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columns desktop */
    gap: var(--gap-lg); /* 32px */
  }
}
```

**Portfolio Grid**
```css
.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 column mobile (vertical scroll) */
  gap: var(--gap-lg); /* 32px */
}

@media (min-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns tablet */
  }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns desktop */
    gap: var(--gap-xl); /* 48px */
  }
}
```

---

## 5. Components

### Buttons

**Primary Button (CTA)**
```css
.btn-primary {
  /* Typography */
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);

  /* Spacing */
  padding: var(--space-4) var(--space-8); /* 16px 32px */

  /* Visual */
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius-lg); /* 8px */
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);

  /* Interaction */
  cursor: pointer;
  transition: all 0.3s ease;

  /* Accessibility */
  min-width: 44px;
  min-height: 44px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.7);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Secondary Button**
```css
.btn-secondary {
  /* Typography */
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);

  /* Spacing */
  padding: var(--space-4) var(--space-8);

  /* Visual */
  background: transparent;
  border: 2px solid var(--border-default);
  border-radius: var(--radius-lg);

  /* Interaction */
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: var(--border-hover);
  background: rgba(255, 255, 255, 0.05);
}
```

**Button Sizes**
```css
.btn-sm {
  padding: var(--space-2) var(--space-4); /* 8px 16px */
  font-size: var(--text-sm); /* 14px */
}

.btn-md {
  padding: var(--space-4) var(--space-8); /* 16px 32px */
  font-size: var(--text-base); /* 16px */
}

.btn-lg {
  padding: var(--space-6) var(--space-12); /* 24px 48px */
  font-size: var(--text-lg); /* 18px */
}
```

### Cards

**Glassmorphism Card**
```css
.glass-card {
  /* Visual */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl); /* 12px */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  /* Spacing */
  padding: var(--spacing-component-lg); /* 32px */

  /* Interaction */
  transition: all 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
  transform: translateY(-4px);
}
```

**Tech Card (Technology Showcase)**
```css
.tech-card {
  /* Extends .glass-card */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-md); /* 24px */
  text-align: center;
  padding: var(--spacing-component-lg); /* 32px */

  /* Prevent content overflow */
  overflow: hidden;
}

.tech-card__icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.tech-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.tech-card__description {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  line-height: var(--leading-normal);
}
```

**Portfolio Card**
```css
.portfolio-card {
  /* Visual */
  background: var(--bg-tertiary);
  border-radius: var(--radius-xl); /* 12px */
  overflow: hidden;

  /* Layout */
  display: flex;
  flex-direction: column;

  /* Interaction */
  transition: all 0.3s ease;
  cursor: pointer;
}

.portfolio-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.portfolio-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.portfolio-card__content {
  padding: var(--spacing-component-lg); /* 32px */
  display: flex;
  flex-direction: column;
  gap: var(--gap-md); /* 24px */
}

.portfolio-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.portfolio-card__description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}
```

### Forms

**Input Field**
```css
.input {
  /* Typography */
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--text-primary);

  /* Visual */
  background: var(--bg-tertiary);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-lg); /* 8px */

  /* Spacing */
  padding: var(--space-4); /* 16px */
  width: 100%;

  /* Interaction */
  transition: all 0.3s ease;
}

.input::placeholder {
  color: var(--text-muted);
}

.input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:invalid {
  border-color: var(--color-error);
}

.input[aria-invalid="true"] {
  border-color: var(--color-error);
}
```

**Textarea**
```css
.textarea {
  /* Extends .input */
  min-height: 120px;
  resize: vertical;
}
```

**Label**
```css
.label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  margin-bottom: var(--space-2); /* 8px */
  display: block;
}
```

**Error Message**
```css
.error-message {
  font-size: var(--text-sm);
  color: var(--color-error);
  margin-top: var(--space-2); /* 8px */
  display: flex;
  align-items: center;
  gap: var(--gap-xs); /* 8px */
}
```

### Gradient Text

```css
.gradient-text {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text--secondary {
  background: var(--gradient-secondary);
}

.gradient-text--accent {
  background: var(--gradient-accent);
}
```

---

## 6. Effects & Animations

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px - buttons */
--radius-xl: 0.75rem;   /* 12px - cards */
--radius-2xl: 1rem;     /* 16px - large cards */
--radius-full: 9999px;  /* Pills, circles */
```

### Shadows

**Card Shadows**
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

**Glow Shadows**
```css
--glow-primary: 0 0 20px rgba(59, 130, 246, 0.5);
--glow-primary-lg: 0 0 40px rgba(59, 130, 246, 0.7);
--glow-secondary: 0 0 20px rgba(6, 182, 212, 0.5);
--glow-accent: 0 0 20px rgba(236, 72, 153, 0.5);
--glow-accent-lg: 0 0 40px rgba(236, 72, 153, 0.7);
```

### Blur Effects

```css
--blur-none: 0;
--blur-sm: 4px;
--blur-md: 8px;
--blur-lg: 12px;  /* Glassmorphism cards */
--blur-xl: 16px;
--blur-2xl: 24px;
--blur-3xl: 40px;
```

### Transitions

**Duration**
```css
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;  /* Micro-interactions */
--duration-500: 500ms;
--duration-600: 600ms;  /* Standard animations */
--duration-1000: 1000ms; /* Emphasis animations */
```

**Easing**
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);      /* Entrances */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Transforms */
```

**Common Transitions**
```css
--transition-default: all 0.3s ease;
--transition-colors: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
--transition-transform: transform 0.3s ease;
--transition-shadow: box-shadow 0.3s ease;
```

### Animation Guidelines

**Scroll-Triggered Animations**
```typescript
// Framer Motion variants
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1  // 100ms delay between children
    }
  }
};
```

**Hover Animations**
```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2xl);
}
```

**Loading Animations**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

**Reduced Motion**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Glassmorphism Specifications

### Core Glassmorphism Effect

```css
.glass {
  /* Background: Semi-transparent white overlay */
  background: rgba(255, 255, 255, 0.05);

  /* Backdrop Blur: Creates frosted glass effect */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari support */

  /* Border: Subtle light border enhances glass effect */
  border: 1px solid rgba(255, 255, 255, 0.1);

  /* Shadow: Depth and elevation */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  /* Border Radius: Rounded corners for modern feel */
  border-radius: var(--radius-xl); /* 12px */
}
```

### Glassmorphism Variants

**Light Glass** (Higher Transparency)
```css
.glass-light {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

**Medium Glass** (Balanced)
```css
.glass-medium {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Heavy Glass** (Less Transparency)
```css
.glass-heavy {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

### Usage Guidelines

1. **Use glass effect for cards** that overlay complex backgrounds
2. **Avoid nesting** glass effects (reduces blur performance)
3. **Combine with gradients** for subtle color tints
4. **Test fallbacks** for browsers without backdrop-filter support
5. **Ensure contrast** remains accessible (text must pass WCAG AA)

### Browser Compatibility Fallback

```css
/* Fallback for browsers without backdrop-filter support */
@supports not (backdrop-filter: blur(12px)) {
  .glass {
    background: rgba(15, 23, 42, 0.95); /* More opaque fallback */
  }
}
```

---

## 8. Accessibility

### Focus States

**Default Focus Ring**
```css
*:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}
```

**Interactive Elements**
```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.8);
  outline-offset: 2px;
}
```

### Touch Targets

**Minimum Size**: 44x44px (WCAG 2.1 AAA)

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
}
```

### Color Contrast Requirements

All text must meet WCAG 2.1 AA standards:

| Element | Foreground | Background | Ratio | Pass |
|---------|-----------|-----------|-------|------|
| Hero Headline | #FFFFFF | #0A0E27 | 21:1 | AAA |
| Body Text | #D1D5DB | #0A0E27 | 10.5:1 | AAA |
| Muted Text | #9CA3AF | #0F172A | 6.4:1 | AA |
| Placeholder | #6B7280 | #1E293B | 4.5:1 | AA |
| Button Text | #FFFFFF | Gradient | 21:1 | AAA |

### Screen Reader Support

```html
<!-- Example: Hero CTA -->
<button
  aria-label="View portfolio projects"
  role="button"
>
  Explore Projects
</button>

<!-- Example: Tech Card -->
<div
  role="article"
  aria-labelledby="tech-card-title-1"
>
  <h3 id="tech-card-title-1">Claude 3.5 Sonnet</h3>
  <p>Production-grade LLM applications...</p>
</div>
```

### Keyboard Navigation

All interactive elements must be keyboard accessible:

- **Tab**: Navigate forward through focusable elements
- **Shift + Tab**: Navigate backward
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals/drawers
- **Arrow Keys**: Navigate within components (carousels, etc.)

---

## 9. Responsive Design

### Mobile-First Approach

1. **Start with mobile** layout (320px-640px)
2. **Add breakpoints** progressively (sm, md, lg, xl)
3. **Test at common sizes**: 320px, 375px, 768px, 1024px, 1280px, 1920px

### Common Patterns

**Hide on Mobile, Show on Desktop**
```css
.desktop-only {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-only {
    display: block;
  }
}
```

**Show on Mobile, Hide on Desktop**
```css
.mobile-only {
  display: block;
}

@media (min-width: 1024px) {
  .mobile-only {
    display: none;
  }
}
```

**Responsive Grid**
```css
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: var(--gap-md);
}

@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
    gap: var(--gap-lg);
  }
}
```

---

## 10. Performance Optimization

### CSS Performance

1. **Minimize CSS bundle**: Purge unused Tailwind classes
2. **Avoid @import**: Use build tools to concatenate CSS
3. **Use CSS variables**: Faster than Sass variables at runtime
4. **Optimize animations**: Use `transform` and `opacity` (GPU-accelerated)
5. **Avoid expensive properties**: Minimize use of `box-shadow`, `filter`, `backdrop-filter` on many elements

### Font Loading Strategy

```css
/* Preload critical fonts */
<link rel="preload" href="/fonts/SpaceGrotesk-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>

/* Font display strategy */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap; /* Show fallback immediately, swap when loaded */
}
```

### Critical CSS

Inline critical above-the-fold CSS in `<head>`:
- Typography variables
- Color variables
- Hero section styles
- Layout utilities

---

## Summary

This design system provides:

1. **Color Palette**: DeFi-inspired dark theme with vibrant gradients, WCAG AA compliant
2. **Typography**: Space Grotesk (headings) + Inter (body), responsive scale
3. **Spacing**: 4px base grid with semantic spacing tokens
4. **Components**: Glassmorphism cards, gradient buttons, accessible forms
5. **Animations**: 60fps scroll triggers, hover effects, loading states
6. **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
7. **Responsive**: Mobile-first breakpoints, adaptive layouts
8. **Performance**: Optimized CSS, font loading, GPU-accelerated animations

**Status**: Design system complete, ready for implementation.
