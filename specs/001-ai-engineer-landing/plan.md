# Implementation Plan: AI Engineer Portfolio Landing Page

**Branch**: `001-ai-engineer-landing` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-ai-engineer-landing/spec.md`

**Design Reference**: DeFi-style landing page with dark theme, glowing effects, gradient accents, smooth animations, and modern glassmorphism aesthetic

## Summary

Build an exceptional AI engineer portfolio landing page with world-class UI/UX inspired by modern DeFi/Web3 design aesthetics. The page showcases AI expertise, IDE-free development methodology, and cutting-edge technologies through four key sections: hero with instant value proposition, technology showcase with interactive cards, portfolio evidence with case studies, and frictionless contact mechanisms. Design features dark theme with vibrant gradient accents, glowing effects, smooth scroll animations, and glassmorphism cards to create an "insane" visual impression while maintaining 90+ Lighthouse score and WCAG 2.1 AA accessibility.

## Technical Context

**Language/Version**: TypeScript 5.3+ (strict mode for type safety per constitution)
**Primary Dependencies**:
- React 18.2+ (UI framework with concurrent features)
- Next.js 14+ (SSG for performance, built-in optimization)
- Tailwind CSS 3.4+ (utility-first styling, custom design system)
- Framer Motion 11+ (60fps animations, scroll triggers)
- React Hook Form 7.5+ (performant form validation)

**Storage**: Static content (JSON/MDX files for portfolio projects, no database required)
**Testing**:
- Vitest (unit tests, 80%+ coverage)
- React Testing Library (component tests)
- Playwright (E2E accessibility and user flow tests)
- Lighthouse CI (performance regression testing)

**Target Platform**: Modern browsers (Chrome 100+, Firefox 100+, Safari 15+, Edge 100+), responsive across mobile/tablet/desktop
**Project Type**: Single-page web application (SSG with Next.js)

**Performance Goals**:
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse score > 90
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Initial bundle < 200KB gzipped

**Constraints**:
- WCAG 2.1 Level AA accessibility (keyboard nav, screen readers, ARIA)
- 60fps animations respecting prefers-reduced-motion
- Progressive enhancement for JS-disabled scenarios
- Mobile-first responsive design (breakpoints: 640px, 768px, 1024px, 1280px)

**Scale/Scope**:
- Single landing page with 4 main sections
- 3-6 portfolio projects
- 6-10 technology items in showcase
- Contact form with email service integration
- Expected traffic: 100-1000 visitors/month initially

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

This feature plan MUST comply with all constitutional principles:

- [x] **Code Quality Excellence**: TypeScript strict mode enforced, ESLint + Prettier configured, component-based architecture with single responsibility, code review workflow established
- [x] **Testing Standards**: Vitest + React Testing Library + Playwright configured for 80%+ coverage, TDD approach planned for critical paths (form validation, animations), test pyramid structure (70% unit, 20% integration, 10% E2E)
- [x] **UX Consistency**: Design system documented with Tailwind config (colors, typography, spacing), WCAG 2.1 AA compliance with semantic HTML and ARIA labels, mobile-first responsive breakpoints, loading states and error handling patterns
- [x] **Performance Requirements**: Next.js SSG for sub-1.5s FCP, code splitting and dynamic imports, WebP/AVIF image optimization with next/image, bundle analysis with size budgets, Lighthouse CI in deployment pipeline
- [x] **UI Excellence**: Dark theme with gradient accents and glassmorphism effects, generous white space (16px between components), clear typography hierarchy (48px+ headings, 16px body), 60fps Framer Motion animations, 44x44px touch targets, zero layout shift with fixed dimensions

**Complexity Justification**: No constitutional violations. All principles satisfied through modern tooling and best practices.

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-engineer-landing/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 research (technology decisions, best practices)
├── data-model.md        # Phase 1 data structures (portfolio, tech items, contact)
├── quickstart.md        # Phase 1 getting started guide
├── contracts/           # Phase 1 API contracts (contact form submission)
│   └── contact-api.yaml
├── checklists/
│   └── requirements.md  # Spec validation checklist
└── design-system.md     # Visual design specifications (colors, typography, components)
```

### Source Code (repository root)

```text
src/
├── app/                        # Next.js 14 app directory
│   ├── layout.tsx             # Root layout with fonts, metadata
│   ├── page.tsx               # Main landing page
│   ├── globals.css            # Tailwind imports + custom styles
│   └── api/
│       └── contact/
│           └── route.ts       # Contact form API endpoint
├── components/                 # React components
│   ├── sections/              # Page sections
│   │   ├── Hero.tsx           # Hero section (P1)
│   │   ├── TechShowcase.tsx   # Technology showcase (P2)
│   │   ├── Portfolio.tsx      # Portfolio evidence (P3)
│   │   └── Contact.tsx        # Contact form (P4)
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx         # Styled button variants
│   │   ├── Card.tsx           # Glassmorphism card
│   │   ├── GradientText.tsx   # Gradient text effect
│   │   ├── GlowEffect.tsx     # Glow/blur effects
│   │   └── AnimatedSection.tsx # Scroll-triggered animations
│   └── forms/
│       └── ContactForm.tsx    # Contact form with validation
├── lib/                       # Utilities and helpers
│   ├── constants.ts           # App constants (breakpoints, colors)
│   ├── animations.ts          # Framer Motion animation variants
│   └── validations.ts         # Form validation schemas
├── data/                      # Static content
│   ├── portfolio.json         # Portfolio projects data
│   ├── technologies.json      # Technology items data
│   └── content.json           # Page content (headings, copy)
└── types/                     # TypeScript types
    ├── portfolio.ts           # Portfolio project types
    ├── technology.ts          # Technology item types
    └── contact.ts             # Contact form types

public/
├── images/                    # Optimized images
│   ├── hero/                  # Hero section visuals
│   ├── portfolio/             # Portfolio project screenshots
│   └── tech-logos/            # Technology logos/icons
└── fonts/                     # Custom fonts (if not using Google Fonts)

tests/
├── unit/                      # Unit tests
│   ├── components/            # Component tests
│   ├── lib/                   # Utility tests
│   └── validations.test.ts   # Validation logic tests
├── integration/               # Integration tests
│   ├── contact-form.test.ts  # Form submission flow
│   └── animations.test.ts    # Animation behavior tests
└── e2e/                       # End-to-end tests
    ├── user-journeys.spec.ts # P1-P4 user story tests
    ├── accessibility.spec.ts  # A11y compliance tests
    └── performance.spec.ts    # Performance budget tests

config/
├── tailwind.config.ts         # Tailwind customization (colors, fonts, spacing)
├── vitest.config.ts           # Vitest test configuration
├── playwright.config.ts       # Playwright E2E configuration
└── lighthouse-ci.config.js    # Lighthouse CI budgets
```

**Structure Decision**: Single-page Next.js application using app directory structure. This provides optimal performance through SSG, built-in image optimization, and automatic code splitting while maintaining simplicity. No complex backend needed beyond a single API route for contact form submission.

## Complexity Tracking

> **No violations requiring justification**

All constitutional principles are satisfied through industry-standard modern tooling and best practices:
- TypeScript + strict mode → Code Quality Excellence
- Vitest + RTL + Playwright → Testing Standards
- Tailwind design system + WCAG compliance → UX Consistency
- Next.js SSG + image optimization → Performance Requirements
- Framer Motion + design system → UI Excellence

## Phase 0: Research & Technology Decisions

### Research Tasks

1. **Animation Library Selection**
   - **Decision**: Framer Motion 11+
   - **Rationale**: Industry standard for React animations, declarative API, automatic 60fps optimization, built-in scroll triggers, respects prefers-reduced-motion, 45KB gzipped (within budget)
   - **Alternatives Considered**:
     - GSAP: More powerful but larger bundle (88KB), imperative API less React-friendly
     - React Spring: Physics-based animations overkill for landing page use case
     - CSS animations only: Insufficient for complex scroll-triggered and state-based animations

2. **Styling Approach**
   - **Decision**: Tailwind CSS 3.4+ with custom design system
   - **Rationale**: Utility-first approach accelerates development, built-in responsive design, purges unused CSS for tiny production bundle, easy custom theme configuration for DeFi aesthetic (dark mode, gradients, glassmorphism)
   - **Alternatives Considered**:
     - Styled Components: Runtime overhead hurts performance, larger bundle
     - CSS Modules: More verbose, harder to maintain design consistency
     - Vanilla CSS: No design system benefits, harder to maintain

3. **Form Handling**
   - **Decision**: React Hook Form 7.5+ with Zod validation
   - **Rationale**: Best performance (uncontrolled components), tiny bundle (9KB), built-in validation, TypeScript-first with Zod schemas
   - **Alternatives Considered**:
     - Formik: Larger bundle (15KB), slower re-renders
     - Native HTML forms: Insufficient UX for modern validation and error handling

4. **Contact Form Backend**
   - **Decision**: Next.js API route + EmailJS or SendGrid
   - **Rationale**: No dedicated backend needed, serverless function handles form submission, EmailJS free tier or SendGrid API for email delivery
   - **Alternatives Considered**:
     - Dedicated Express backend: Overkill for single endpoint
     - Netlify Forms: Vendor lock-in, less control over validation
     - Google Forms embed: Poor UX, breaks design consistency

5. **Image Optimization Strategy**
   - **Decision**: Next.js Image component with WebP/AVIF generation
   - **Rationale**: Automatic responsive images, lazy loading, WebP/AVIF format conversion, blur placeholder for zero CLS, built-in optimization
   - **Alternatives Considered**:
     - Manual optimization: Time-consuming, error-prone
     - Cloudinary: External dependency, cost for free tier limits

6. **Icon System**
   - **Decision**: Lucide React (feather-style icons)
   - **Rationale**: Tree-shakeable (only import used icons), consistent style, TypeScript types, 1-2KB per icon
   - **Alternatives Considered**:
     - Font Awesome: Font loading hurts FCP, larger payload
     - Heroicons: Similar but less comprehensive icon set

7. **Testing Strategy**
   - **Decision**: Vitest (unit) + React Testing Library (component) + Playwright (E2E)
   - **Rationale**:
     - Vitest: Fast (Vite-powered), Jest-compatible API, native ESM support
     - RTL: Best practices for testing user behavior, not implementation
     - Playwright: Cross-browser E2E, built-in accessibility testing, reliable selectors
   - **Alternatives Considered**:
     - Jest: Slower than Vitest, ESM issues
     - Cypress: Heavier, Playwright has better dev experience

8. **Accessibility Testing**
   - **Decision**: axe-core + Playwright accessibility assertions + manual testing
   - **Rationale**: Automated testing catches 30-40% of issues, Playwright integrates axe-core, manual keyboard/screen reader testing for remaining 60-70%
   - **Alternatives Considered**:
     - pa11y: Less integrated with E2E workflow
     - Manual only: Time-consuming, misses automated catches

9. **Performance Monitoring**
   - **Decision**: Lighthouse CI + Web Vitals library
   - **Rationale**: Automated performance regression testing in CI, real-user monitoring with Web Vitals, free and open-source
   - **Alternatives Considered**:
     - SpeedCurve/Calibre: Cost prohibitive for single landing page
     - Manual testing: Inconsistent, no regression detection

10. **Design System Colors (DeFi-Inspired Dark Theme)**
    - **Primary**: Vibrant blue-purple gradient (#3B82F6 → #8B5CF6)
    - **Secondary**: Cyan-teal gradient (#06B6D4 → #14B8A6)
    - **Accent**: Pink-purple glow (#EC4899 → #A855F7)
    - **Background**: Dark navy (#0A0E27, #0F172A)
    - **Surface**: Glassmorphism cards (rgba(255,255,255,0.05) with backdrop-blur)
    - **Text**: White (#FFFFFF) for headings, gray-300 (#D1D5DB) for body

**Output**: See `research.md` for detailed analysis

## Phase 1: Design & Implementation Artifacts

### Data Model

See `data-model.md` for complete entity definitions. Key structures:

**Portfolio Project**
```typescript
interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  outcomes: string[];
  featured: boolean;
}
```

**Technology Item**
```typescript
interface TechnologyItem {
  id: string;
  name: string;
  category: 'LLM' | 'ML Framework' | 'AI Tool' | 'Development';
  description: string;
  iconUrl: string;
}
```

**Contact Submission**
```typescript
interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  inquiryType?: 'consultation' | 'project' | 'general';
  timestamp: Date;
}
```

### API Contracts

See `contracts/contact-api.yaml` for OpenAPI specification.

**Endpoint**: `POST /api/contact`
- Request: `{ name, email, message, inquiryType? }`
- Response 200: `{ success: true, message: "Message sent successfully" }`
- Response 400: `{ success: false, errors: ValidationError[] }`
- Response 500: `{ success: false, message: "Server error" }`

### Component Architecture

**Hero Section (P1)**
- Full-viewport height with centered content
- Gradient text headline with animated gradient effect
- Subtitle with typing animation
- Glassmorphism CTA button with glow on hover
- Floating particles/shapes background (canvas or CSS)
- Smooth scroll indicator with arrow animation

**Tech Showcase Section (P2)**
- Grid layout (2 cols mobile, 3-4 cols desktop)
- Glassmorphism cards with hover effects
- Category filtering with smooth transitions
- Scroll-triggered fade-in animations (stagger effect)
- Icon + title + description per technology

**Portfolio Section (P3)**
- Horizontal scroll carousel on mobile, grid on desktop
- Large preview images with hover overlay
- Modal/drawer for detailed view
- Technology tags with pill design
- Outcome metrics with animated counters on scroll

**Contact Section (P4)**
- Side-by-side layout (form + info on desktop, stacked on mobile)
- Inline validation with error messages
- Success state with confetti animation
- Loading state during submission
- Social links with icon buttons

### Design System Specifications

See `design-system.md` for complete specifications. Summary:

**Typography**
- Font Family: Inter (body), Space Grotesk (headings)
- Heading Hierarchy: h1(48px-72px), h2(36px-48px), h3(24px-32px)
- Body: 16px (mobile), 18px (desktop)
- Line Height: 1.5 (body), 1.2 (headings)

**Spacing Scale**
- 4px base unit (Tailwind default)
- Common: 8px, 16px, 24px, 32px, 48px, 64px, 96px

**Colors**
- See research section above for gradient definitions
- All gradients at 45deg angle
- Glow effects: blur-xl (20px) with color-500 at 50% opacity

**Animations**
- Duration: 0.3s (micro), 0.6s (standard), 1s (emphasis)
- Easing: ease-out (entries), ease-in-out (transforms)
- Scroll trigger: threshold 0.2 (20% visible)

**Components**
- Border Radius: rounded-xl (12px) for cards, rounded-lg (8px) for buttons
- Shadows: Custom shadow-glow utility classes
- Glassmorphism: bg-white/5 backdrop-blur-md border border-white/10

### Quickstart Guide

See `quickstart.md` for complete setup instructions. Key steps:

1. Clone repo and checkout `001-ai-engineer-landing` branch
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and configure email service
4. Run development server: `npm run dev`
5. Run tests: `npm test` (unit), `npm run test:e2e` (Playwright)
6. Run Lighthouse: `npm run lighthouse`
7. Build production: `npm run build` → `npm start`

## Phase 2: Constitution Re-Check

*Re-evaluate after design phase complete*

- [x] **Code Quality Excellence**: TypeScript strict mode configured, ESLint + Prettier rules defined, component structure follows single responsibility, clear naming conventions documented
- [x] **Testing Standards**: Test scaffolding complete (Vitest config, Playwright setup), coverage thresholds configured at 80% with 95% for critical paths (form validation, animations), TDD workflow documented in quickstart
- [x] **UX Consistency**: Design system fully specified in design-system.md (colors, typography, spacing, components), WCAG 2.1 AA requirements mapped to implementation (semantic HTML guide, ARIA patterns, keyboard nav flows), responsive breakpoints defined
- [x] **Performance Requirements**: Performance budgets configured in Lighthouse CI (FCP < 1.5s, TTI < 3s, bundle < 200KB gzipped), image optimization strategy with Next.js Image, code splitting plan with dynamic imports, Web Vitals monitoring integrated
- [x] **UI Excellence**: Visual design system complete with DeFi aesthetic (dark theme, gradients, glassmorphism), animation library selected (Framer Motion with 60fps target), spacing and typography hierarchy defined, touch target sizes specified (44x44px minimum)

**Result**: All constitutional principles satisfied. Ready for Phase 3 task generation.

## Next Steps

This plan is now complete through Phase 1. Next actions:

1. **Generate Task List**: Run `/speckit.tasks` to create `tasks.md` with dependency-ordered implementation tasks organized by user story (P1 → P2 → P3 → P4)

2. **Implementation**: Run `/speckit.implement` to execute tasks with automated agent assistance

3. **Validation**: After implementation, verify all success criteria:
   - Run Lighthouse CI → confirm 90+ score
   - Run Playwright accessibility tests → confirm WCAG 2.1 AA
   - Run Vitest → confirm 80%+ coverage
   - Manual UX testing → confirm user story acceptance scenarios
   - Mark completed tasks as done, use ✅ checkboxes

## Artifacts Generated

- [x] `plan.md` (this file)
- [x] `research.md` - Technology decisions and rationale
- [x] `data-model.md` - Entity definitions and TypeScript interfaces
- [x] `contracts/contact-api.yaml` - API contract for contact form
- [x] `design-system.md` - Visual design specifications
- [x] `quickstart.md` - Getting started guide for developers

**Branch**: `001-ai-engineer-landing`
**Ready for**: Task generation (`/speckit.tasks`)
