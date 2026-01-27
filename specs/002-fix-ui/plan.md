# Implementation Plan: Fix Broken UI Styling and Rendering

**Branch**: `002-fix-ui` | **Date**: 2026-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-fix-ui/spec.md`

## Summary

Fix the completely broken UI styling system in the Next.js 15 + Tailwind CSS 4 application. The primary issue is a missing PostCSS configuration that prevents Tailwind from processing CSS directives. Secondary issues include Tailwind v4 configuration incompatibilities, incorrect content paths, and stale build artifacts. The technical approach involves: (1) creating proper PostCSS configuration for Tailwind CSS 4, (2) updating Tailwind config to v4 standards with flattened color naming and correct content paths, (3) clearing stale build artifacts, and (4) verifying all styling renders correctly across components and responsive breakpoints.

## Technical Context

**Language/Version**: TypeScript 5.3+ (strict mode)
**Primary Dependencies**: Next.js 15.1.5, Tailwind CSS 4.1.18, PostCSS 8.5.6, Autoprefixer 10.4.23, Framer Motion 12.29.2
**Storage**: N/A (static site / SSR)
**Testing**: Visual regression testing, browser DevTools inspection, Lighthouse audits
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: FCP < 1.5s, TTI < 3s, Lighthouse > 90, 60fps animations
**Constraints**: CSS bundle < 100KB gzipped, Core Web Vitals compliant (LCP < 2.5s, FID < 100ms, CLS < 0.1)
**Scale/Scope**: Single-page landing application with 4 major sections (Hero, TechShowcase, Portfolio, Contact)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

This feature plan MUST comply with all constitutional principles:

- [x] **Code Quality Excellence**: Plan includes verification steps, linting with existing ESLint config, TypeScript strict mode enforcement, no new code duplication
- [x] **Testing Standards**: Visual regression testing strategy, browser compatibility testing, performance testing via Lighthouse, 100% component styling coverage validation
- [x] **UX Consistency**: Design system already established in globals.css and tailwind.config.ts, WCAG 2.1 AA accessibility maintained, responsive breakpoints verified
- [x] **Performance Requirements**: Performance budgets tracked (CSS bundle size, Core Web Vitals), optimization for font loading and asset delivery
- [x] **UI Excellence**: Visual hierarchy preserved from existing design, glassmorphism effects maintained, animations respect prefers-reduced-motion, mobile-first approach

**Complexity Justification**: No violations. This is a configuration fix that restores existing functionality without adding complexity.

## Project Structure

### Documentation (this feature)

```text
specs/002-fix-ui/
├── plan.md              # This file
├── research.md          # Phase 0 output - Tailwind v4 migration research
├── quickstart.md        # Phase 1 output - Manual testing guide
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

**Note**: No data-model.md or contracts/ needed for this feature (no data entities or API contracts involved).

### Source Code (repository root)

```text
# Next.js 15 App Router structure
src/
├── app/
│   ├── layout.tsx           # Root layout with font loading
│   ├── page.tsx             # Main landing page composition
│   ├── globals.css          # Custom CSS + Tailwind directives
│   ├── error.tsx            # Error boundary
│   └── api/
│       └── contact/
│           └── route.ts     # Contact form endpoint
├── components/
│   ├── sections/
│   │   ├── Hero.tsx         # Hero section component
│   │   ├── TechShowcase.tsx # Technology showcase section
│   │   ├── Portfolio.tsx    # Portfolio section
│   │   └── Contact.tsx      # Contact form section
│   ├── ui/
│   │   ├── Button.tsx       # Button component with variants
│   │   ├── Card.tsx         # Card component with glassmorphism
│   │   ├── GlowEffect.tsx   # Glow animation effect
│   │   ├── AnimatedSection.tsx # Scroll animation wrapper
│   │   ├── TechnologyCard.tsx  # Technology item card
│   │   ├── PortfolioCard.tsx   # Portfolio item card
│   │   ├── PortfolioModal.tsx  # Portfolio detail modal
│   │   └── GradientText.tsx    # Gradient text component
│   ├── forms/
│   │   └── ContactForm.tsx  # Contact form with validation
│   └── WebVitalsReporter.tsx # Performance monitoring
├── lib/
│   ├── animations.ts        # Framer Motion animation configs
│   ├── constants.ts         # Application constants
│   ├── validations.ts       # Form validation schemas
│   └── image-placeholders.ts # Image placeholder utilities
├── types/
│   ├── portfolio.ts         # Portfolio type definitions
│   ├── technology.ts        # Technology type definitions
│   └── contact.ts           # Contact form type definitions
└── data/
    ├── content.json         # Content data
    ├── technologies.json    # Technology showcase data
    └── portfolio.json       # Portfolio items data

# Root configuration files (to be created/updated)
postcss.config.mjs           # TO CREATE - PostCSS config for Tailwind v4
tailwind.config.ts           # TO UPDATE - Fix v4 compatibility issues
next.config.ts               # EXISTS - Next.js configuration (no changes needed)
tsconfig.json                # EXISTS - TypeScript config (no changes needed)
package.json                 # EXISTS - Dependencies already correct

# Build output (to be cleared)
.next/                       # TO DELETE - Stale build artifacts
```

**Structure Decision**: Standard Next.js 15 App Router structure with existing component architecture. No structural changes needed - only configuration fixes required.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - No constitutional violations. This is a straightforward configuration fix.

## Implementation Strategy

### Phase 0: Research & Diagnosis ✓ (COMPLETED)

**Status**: Research completed via diagnostic exploration agent.

**Key Findings**:
1. Missing postcss.config.mjs is the root cause - Tailwind CSS 4 cannot process directives without it
2. Tailwind config uses v3-style nested color names - v4 prefers flat naming
3. Content paths reference non-existent `pages/` directory - should only scan `app/` and `components/`
4. Stale .next build directory may serve outdated CSS
5. Font loading in layout.tsx is correct - no issues
6. All component class names are properly defined in globals.css
7. Dependencies are correct (Tailwind 4.1.18, PostCSS 8.5.6, Autoprefixer 10.4.23)

**Research Document**: See [research.md](./research.md) for detailed analysis.

### Phase 1: Configuration & Setup (User Story 1 - P1)

**Goal**: Establish working Tailwind CSS 4 build pipeline to render base styles correctly.

**Implements**: User Story 1 - Core Styling Renders Correctly

**Tasks**:
1. Create `postcss.config.mjs` with Tailwind CSS 4 preset
2. Update `tailwind.config.ts` to flatten color naming and fix content paths
3. Clear `.next/` directory to remove stale build artifacts
4. Update `globals.css` if needed for v4 compatibility (minimal changes expected)
5. Test build process: `npm run build` succeeds without errors
6. Test dev server: `npm run dev` serves page with all base styles visible
7. Verify CSS variables load correctly in browser DevTools
8. Verify custom fonts (Space Grotesk, Inter) render properly

**Independent Test**: Open landing page in browser and verify:
- Dark background (#0A0E27) renders
- Space Grotesk font displays in headings
- Inter font displays in body text
- Tailwind utility classes apply (check element styles in DevTools)
- No CSS-related console errors

**Acceptance Criteria** (from spec.md):
- All CSS stylesheets load without errors ✓
- Typography uses correct font families ✓
- Dark theme with gradient backgrounds applies ✓
- Custom color variables render correctly ✓
- Glassmorphism effects render (or fallback on unsupported browsers) ✓

### Phase 2: Component Styling Verification (User Story 2 - P2)

**Goal**: Verify all interactive component styles render correctly with proper hover/focus states.

**Implements**: User Story 2 - Component Visual Integrity

**Tasks**:
1. Verify button components (btn-primary, btn-secondary classes) render with proper styling
2. Test button hover states (elevation transform, glow effects) work correctly
3. Verify card components (glass, glass-medium classes) display glassmorphism effects
4. Test card hover states (hover-lift effect) work correctly
5. Verify form input focus states (border-focus, focus ring) display properly
6. Test gradient text components render correctly with -webkit-background-clip
7. Verify scroll-triggered animations (fade-in-up, fade-in-left) execute smoothly
8. Test animation performance respects prefers-reduced-motion setting

**Independent Test**: Interact with each component type and verify:
- Buttons display hover/active states
- Cards display glassmorphism and hover lift
- Form inputs show focus indicators
- Gradient text renders correctly
- Animations run at 60fps without jank

**Acceptance Criteria** (from spec.md):
- Buttons display elevation animation and glow on hover ✓
- Cards display glassmorphism with proper borders/shadows ✓
- Form inputs display proper focus states ✓
- Scroll animations execute smoothly at 60fps ✓
- Gradient text renders correctly ✓

### Phase 3: Responsive Layout Testing (User Story 3 - P3)

**Goal**: Verify responsive breakpoints and mobile layouts function correctly.

**Implements**: User Story 3 - Responsive Layout Functions

**Tasks**:
1. Test mobile viewport (320px - 767px) - verify single column layout
2. Test tablet viewport (768px - 1023px) - verify 2-column grid layouts
3. Test desktop viewport (1024px+) - verify constrained max-width layouts
4. Verify font sizing scales appropriately at each breakpoint
5. Verify touch targets meet 44x44px minimum on mobile
6. Test viewport resize transitions - ensure no horizontal scroll or broken layouts
7. Verify responsive images and lazy loading work correctly

**Independent Test**: View page at viewport sizes: 320px, 375px, 768px, 1024px, 1920px and verify:
- Layout adapts appropriately at each breakpoint
- No horizontal scroll or overflow
- Touch targets are accessible on mobile
- Font sizes scale readably
- Spacing adjusts properly

**Acceptance Criteria** (from spec.md):
- Mobile layout switches to single column with proper padding ✓
- Tablet layout displays 2-column grids ✓
- Desktop layout constrains max-width appropriately ✓
- Touch targets meet 44x44px minimum ✓
- Layout reflows smoothly without breaks ✓

### Phase 4: Performance Optimization (User Story 4 - P4)

**Goal**: Optimize asset loading for acceptable performance on all connection speeds.

**Implements**: User Story 4 - Asset Loading and Optimization

**Tasks**:
1. Verify CSS bundle size is under 100KB gzipped
2. Run Lighthouse audit - verify Performance score > 90
3. Verify Core Web Vitals metrics meet targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
4. Test font loading strategy (font-display: swap) minimizes FOUT
5. Verify image lazy loading works for below-the-fold content
6. Test performance on throttled connection (Fast 3G, Slow 3G)
7. Verify First Contentful Paint < 1.5s on 4G connection

**Independent Test**: Use browser DevTools with network throttling (Fast 3G):
- FCP occurs within 1.5 seconds
- Page remains usable during load
- No layout shifts (CLS < 0.1)
- Fonts load with minimal flash
- Below-fold images lazy load

**Acceptance Criteria** (from spec.md):
- FCP within 1.5 seconds ✓
- Image placeholders prevent layout shift ✓
- Font loading minimizes FOUT ✓
- Below-fold images lazy load ✓
- CSS bundle under 100KB ✓

### Phase 5: Cross-Browser Testing & Polish

**Goal**: Ensure consistent rendering across all target browsers and polish edge cases.

**Tasks**:
1. Test in Chrome (latest) - verify all styles render correctly
2. Test in Firefox (latest) - verify all styles render correctly
3. Test in Safari (latest) - verify all styles render correctly, especially backdrop-filter
4. Test in Edge (latest) - verify all styles render correctly
5. Verify glassmorphism fallbacks work on browsers without backdrop-filter support
6. Test with JavaScript disabled - verify core content remains accessible
7. Test with prefers-reduced-motion enabled - verify animations respect setting
8. Run accessibility audit (Lighthouse, axe DevTools) - verify WCAG 2.1 AA compliance
9. Document any browser-specific issues and fallback behaviors

**Independent Test**: Open page in each browser and verify:
- Visual appearance is consistent (<5% variance)
- No browser-specific rendering bugs
- Fallbacks work on unsupported features
- Accessibility features work properly

**Acceptance Criteria**:
- Chrome, Firefox, Safari, Edge show consistent appearance ✓
- Glassmorphism fallbacks work ✓
- JavaScript-disabled fallback works ✓
- Prefers-reduced-motion respected ✓
- WCAG 2.1 AA compliance achieved ✓

## Dependencies & Parallelization

### User Story Dependencies

```text
Phase 1 (US1: Core Styling)
  └─→ BLOCKS → Phase 2 (US2: Component Styling)
                 └─→ BLOCKS → Phase 3 (US3: Responsive Layout)
                                └─→ BLOCKS → Phase 4 (US4: Performance)
                                               └─→ Phase 5 (Cross-Browser Polish)
```

**Rationale**: Each phase builds on the previous:
- Cannot test components without base styles working (Phase 1 → 2)
- Cannot test responsive layouts without component styles working (Phase 2 → 3)
- Cannot optimize performance without layouts working (Phase 3 → 4)
- Cannot polish cross-browser without performance verified (Phase 4 → 5)

### Parallelization Opportunities

**Within Phase 1 (Setup)**:
- Task 1 (create PostCSS config) → can run in parallel with Task 2 (update Tailwind config)
- Task 3 (clear .next) → can run in parallel with Tasks 1-2
- Tasks 4-8 (verification) → must run sequentially after build completes

**Within Phase 2 (Components)**:
- Tasks 1-7 (component verification) → can all run in parallel (independent component testing)
- Task 8 (animation performance) → can run in parallel with other tasks

**Within Phase 3 (Responsive)**:
- Tasks 1-4 (viewport testing) → can run in parallel (independent viewport sizes)
- Tasks 5-7 → can run in parallel after layout verified

**Within Phase 4 (Performance)**:
- Tasks 1-7 → mostly sequential (performance metrics depend on optimizations)

**Within Phase 5 (Cross-Browser)**:
- Tasks 1-4 (browser testing) → can run in parallel (independent browser checks)
- Tasks 5-9 → can run in parallel after browser baseline verified

## Success Criteria Validation

**From spec.md Success Criteria**:

1. **SC-001**: 100% of CSS classes apply correctly → Validated in Phase 1, Task 8
2. **SC-002**: Zero pixel differences in visual regression → Validated in Phase 2, all tasks
3. **SC-003**: Interactive feedback within 16ms → Validated in Phase 2, Tasks 2-6
4. **SC-004**: No CSS console errors → Validated in Phase 1, Task 8
5. **SC-005**: <5% cross-browser variance → Validated in Phase 5, Tasks 1-4
6. **SC-006**: Zero unused CSS in critical path → Validated in Phase 4, Task 2
7. **SC-007**: 95%+ UI task completion → Validated across all phases

**Performance Criteria** (from constitution):
- FCP < 1.5s → Validated in Phase 4, Task 7
- TTI < 3s → Validated in Phase 4, Task 2
- LCP < 2.5s → Validated in Phase 4, Task 3
- FID < 100ms → Validated in Phase 4, Task 3
- CLS < 0.1 → Validated in Phase 4, Task 3
- Bundle < 100KB → Validated in Phase 4, Task 1
- Lighthouse > 90 → Validated in Phase 4, Task 2

## MVP Scope

**Minimum Viable Product**: Phase 1 only (User Story 1 - Core Styling)

**Rationale**: With Phase 1 complete, the page becomes visually presentable and styling functions at a basic level. This delivers immediate value by making the application usable, even if component interactions and responsive behavior aren't fully polished.

**MVP Deliverable**:
- PostCSS configuration created
- Tailwind config updated to v4 standards
- Build pipeline functional
- Base styles render correctly
- Fonts load properly
- Color system works
- Page is visually presentable (though not fully interactive/responsive)

**Post-MVP Increments**:
- Increment 1: Phase 2 (Component Styling) - adds interactive polish
- Increment 2: Phase 3 (Responsive Layout) - adds mobile support
- Increment 3: Phase 4 (Performance) - adds optimization
- Increment 4: Phase 5 (Cross-Browser) - adds robustness

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Tailwind v4 breaking changes not documented | Medium | High | Reference official migration guide, test incrementally |
| Browser-specific glassmorphism issues | Low | Medium | Use @supports rules for fallbacks (already in globals.css) |
| Performance regression from CSS changes | Low | Medium | Monitor bundle size, run Lighthouse before/after |
| Font loading causes FOUT | Low | Low | Use font-display: swap (already configured) |
| Stale cache prevents seeing changes | Medium | Low | Clear .next and browser cache during testing |

## Testing Strategy

**Visual Regression Testing**:
- Manually verify each component renders correctly
- Take screenshots at each viewport size for comparison
- Document any visual differences from expected design

**Browser Compatibility Testing**:
- Test in Chrome, Firefox, Safari, Edge
- Document browser-specific issues
- Verify fallbacks work correctly

**Performance Testing**:
- Run Lighthouse audits before and after fixes
- Monitor Core Web Vitals metrics
- Test on throttled connections (Fast 3G, Slow 3G)
- Verify bundle size stays under limits

**Accessibility Testing**:
- Run automated tools (Lighthouse, axe DevTools)
- Test keyboard navigation
- Test with screen reader (basic verification)
- Verify color contrast ratios

**Manual Testing Checklist** (see quickstart.md):
- [ ] Dev server starts without errors
- [ ] Build completes without errors
- [ ] Page loads with all styles visible
- [ ] Fonts render correctly
- [ ] Colors match design system
- [ ] Glassmorphism effects work
- [ ] Buttons show hover states
- [ ] Cards display properly
- [ ] Forms show focus states
- [ ] Animations run smoothly
- [ ] Responsive layouts adapt correctly
- [ ] Performance metrics meet targets
- [ ] Cross-browser rendering consistent

## Tools & Commands

**Development**:
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Testing**:
```bash
# Clear build artifacts
rm -rf .next

# Check bundle size
npm run build && du -sh .next/static/css/*

# Run Lighthouse (via Chrome DevTools or CLI)
lighthouse http://localhost:3000 --view

# Test on throttled network (Chrome DevTools > Network tab)
```

**Browser DevTools**:
- Elements tab: Inspect applied CSS classes
- Console: Check for CSS errors
- Network tab: Monitor CSS file loading
- Performance tab: Measure rendering performance
- Lighthouse tab: Run comprehensive audits

## Notes

- This is a configuration fix, not a feature addition - no new functionality being built
- Existing component code is correct - only configuration files need updates
- All design system values already defined - no design decisions needed
- Focus is on making existing code work, not refactoring or improving it
- Changes should be minimal and focused on fixing the root cause
