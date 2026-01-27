# Quickstart Guide: UI Styling Verification

**Feature**: Fix Broken UI Styling and Rendering
**Date**: 2026-01-27
**Purpose**: Manual testing checklist for verifying UI styling fixes

## Prerequisites

- Node.js 18+ installed
- Browser with DevTools (Chrome, Firefox, or Edge recommended)
- Project dependencies installed (`npm install`)
- Configuration fixes applied (PostCSS config created, Tailwind config updated)

## Quick Start

```bash
# 1. Clear build cache
rm -rf .next

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to: http://localhost:3000

# 4. Verify styling renders (see checklist below)
```

## Phase 1: Core Styling Verification (P1)

**Goal**: Verify base styles, typography, colors, and layout render correctly

### Visual Inspection Checklist

Open http://localhost:3000 and verify:

- [ ] **Background Color**: Page background is dark (#0A0E27 - deep blue-black)
- [ ] **Typography - Headings**: "AI Engineer" and section headings use Space Grotesk font (geometric, modern sans-serif)
- [ ] **Typography - Body**: Descriptive text and paragraphs use Inter font (clean, readable sans-serif)
- [ ] **Typography - Sizing**: Text is readable, proper hierarchy (headings larger than body)
- [ ] **Color - Text Primary**: Main headings are white (#FFFFFF)
- [ ] **Color - Text Secondary**: Body text is light gray (#D1D5DB)
- [ ] **Color - Gradients**: Gradient text (if present) shows blue-to-purple color transitions
- [ ] **Glassmorphism Effects**: Cards/overlays show frosted glass effect (blur + transparency)
- [ ] **Layout - Sections**: Four main sections visible: Hero, Tech Showcase, Portfolio, Contact
- [ ] **Layout - Spacing**: Generous spacing between sections (not cramped)

### Browser DevTools Checks

Press F12 to open DevTools:

**Console Tab**:
- [ ] No CSS-related errors (red messages)
- [ ] No "Failed to load stylesheet" errors
- [ ] No "Failed to find Tailwind class" warnings

**Elements Tab** (inspect any element):
- [ ] Computed styles show Tailwind classes applied
- [ ] CSS custom properties (--bg-primary, --text-primary, etc.) have values
- [ ] Font families show "Space Grotesk" for headings, "Inter" for body

**Network Tab** (reload page):
- [ ] CSS files load successfully (status 200)
- [ ] No 404 errors for stylesheets
- [ ] Font files (woff2) load successfully

### Independent Test Criteria (from spec.md)

- [ ] Dark background (#0A0E27) renders visibly
- [ ] Space Grotesk font displays in headings (distinctive geometric letterforms)
- [ ] Inter font displays in body text (clean, neutral letterforms)
- [ ] Tailwind utility classes apply (check px-4, py-8, text-center, etc. in DevTools)
- [ ] No CSS-related console errors

**Pass Criteria**: ALL checklist items must pass. If any fail, base styling is not working correctly.

---

## Phase 2: Component Styling Verification (P2)

**Goal**: Verify interactive components display properly with hover/focus states

### Button Components

Locate any button (e.g., "Contact Me" in Hero section):

- [ ] **Default State**: Button has gradient background (blue to purple)
- [ ] **Default State**: Button has subtle glow/shadow effect
- [ ] **Hover State**: Button lifts slightly (translates upward)
- [ ] **Hover State**: Glow effect intensifies
- [ ] **Active State**: Button presses down (no lift)
- [ ] **Touch Target**: Button is at least 44x44 pixels (mobile-friendly size)

### Card Components

Locate technology cards or portfolio cards:

- [ ] **Glassmorphism**: Cards show frosted glass effect (backdrop-filter blur)
- [ ] **Border**: Cards have subtle border (1px, slightly visible)
- [ ] **Shadow**: Cards have shadow (creates depth separation from background)
- [ ] **Border Radius**: Cards have rounded corners (not sharp edges)
- [ ] **Hover State**: Card lifts up slightly when hovered
- [ ] **Hover State**: Shadow intensifies on hover

### Form Inputs

Locate contact form (scroll to Contact section):

- [ ] **Default State**: Inputs have dark background, visible border
- [ ] **Placeholder Text**: Placeholder is visible but muted color
- [ ] **Focus State**: Clicking input shows blue border color (border-focus)
- [ ] **Focus State**: Focus ring appears around input (blue glow)
- [ ] **Focus State**: Border color changes from gray to blue
- [ ] **Invalid State** (if applicable): Red border for validation errors

### Gradient Text

Locate any gradient text (usually main headline):

- [ ] **Gradient Fill**: Text shows color gradient (blue to purple transition)
- [ ] **Smooth Transition**: Gradient transitions smoothly (no banding)
- [ ] **Readability**: Text remains readable despite gradient

### Scroll Animations

Scroll down the page slowly:

- [ ] **Fade-In Effect**: Sections fade in as they enter viewport
- [ ] **Slide-Up Effect**: Content slides up as it fades in
- [ ] **Smooth Animation**: Animations run smoothly (no stuttering)
- [ ] **60 FPS Performance**: Animations feel fluid, not janky (check Performance tab if needed)

### Animation Performance Test

**Enable Reduced Motion** (test accessibility):
1. Windows: Settings > Accessibility > Visual effects > Animation effects (turn OFF)
2. Mac: System Settings > Accessibility > Display > Reduce motion (turn ON)
3. Reload page
- [ ] Animations are minimal or instant (respects user preference)

**Re-enable motion** after test.

### Independent Test Criteria (from spec.md)

- [ ] Buttons display hover/active states correctly
- [ ] Cards display glassmorphism and hover lift effects
- [ ] Form inputs show focus indicators clearly
- [ ] Gradient text renders correctly
- [ ] Animations run at 60fps without jank

**Pass Criteria**: ALL component types must display proper styling and states.

---

## Phase 3: Responsive Layout Verification (P3)

**Goal**: Verify layouts adapt correctly across different viewport sizes

### Mobile Testing (320px - 767px)

**Resize browser to 375px width** (Chrome DevTools > Toggle Device Toolbar > iPhone SE):

- [ ] **Single Column**: Content stacks vertically (no side-by-side layout)
- [ ] **Padding**: Content has breathing room (not touching edges)
- [ ] **Font Size**: Text scales down but remains readable (minimum 16px body)
- [ ] **Touch Targets**: Buttons are at least 44x44px (easy to tap)
- [ ] **No Horizontal Scroll**: No content overflows horizontally
- [ ] **Images**: Images scale to fit viewport width
- [ ] **Navigation** (if present): Navigation is mobile-friendly (hamburger or stacked)

### Tablet Testing (768px - 1023px)

**Resize browser to 768px width** (iPad):

- [ ] **2-Column Grid**: Cards/items display in 2-column grid (where applicable)
- [ ] **Medium Padding**: More padding than mobile, less than desktop
- [ ] **Font Size**: Text is medium-sized (between mobile and desktop)
- [ ] **Touch Targets**: Still at least 44x44px
- [ ] **No Horizontal Scroll**: Content fits viewport width

### Desktop Testing (1024px+)

**Resize browser to 1920px width** (full screen):

- [ ] **Max Width Constraint**: Content doesn't stretch to full width (centered)
- [ ] **3+ Column Grid**: Cards/items display in 3-4 columns (where applicable)
- [ ] **Large Padding**: Generous spacing around content
- [ ] **Font Size**: Text is largest (optimized for reading distance)
- [ ] **Hover States**: All hover effects work (not touch-focused)

### Resize Transition Test

**Slowly resize browser from 320px to 1920px**:

- [ ] **No Layout Breaks**: No sudden jumps or broken layouts
- [ ] **Smooth Transitions**: Layout reflows gracefully at breakpoints (640px, 768px, 1024px, 1280px)
- [ ] **No Horizontal Scroll**: Never shows horizontal scrollbar at any size
- [ ] **Content Visibility**: All content remains visible (nothing cut off)

### Independent Test Criteria (from spec.md)

- [ ] Mobile layout (< 768px): single column with proper padding
- [ ] Tablet layout (768-1023px): 2-column grids
- [ ] Desktop layout (> 1024px): constrained max-width
- [ ] Touch targets: 44x44px minimum on mobile
- [ ] Layout reflows smoothly without breaks

**Pass Criteria**: Page must function correctly at ALL viewport sizes tested.

---

## Phase 4: Performance Verification (P4)

**Goal**: Verify performance metrics meet targets

### CSS Bundle Size Check

```bash
# Build production bundle
npm run build

# Check CSS bundle size (should be < 100KB gzipped)
# Windows:
dir .next\static\css

# Linux/Mac:
ls -lh .next/static/css/*.css
gzip -c .next/static/css/*.css | wc -c
```

- [ ] **CSS Bundle Size**: Total CSS < 100KB gzipped

### Lighthouse Audit

**Run Lighthouse** (Chrome DevTools > Lighthouse tab):
1. Select "Performance" category
2. Select "Desktop" or "Mobile"
3. Click "Analyze page load"

- [ ] **Performance Score**: > 90 (green)
- [ ] **First Contentful Paint (FCP)**: < 1.5 seconds
- [ ] **Time to Interactive (TTI)**: < 3 seconds
- [ ] **Largest Contentful Paint (LCP)**: < 2.5 seconds (green)
- [ ] **Cumulative Layout Shift (CLS)**: < 0.1 (green)
- [ ] **Total Blocking Time**: Minimal

### Network Throttling Test

**Simulate Slow Connection** (Chrome DevTools > Network tab):
1. Set throttling to "Fast 3G"
2. Reload page (Ctrl+Shift+R / Cmd+Shift+R)

- [ ] **FCP**: Still occurs within 1.5 seconds (may be close to limit)
- [ ] **Page Usable**: Content visible and readable during load
- [ ] **Font Loading**: Minimal flash of unstyled text (FOUT)
- [ ] **Progressive Loading**: Above-the-fold content loads first

### Font Loading Test

Watch the page load closely:

- [ ] **System Font Flash**: Minimal or no flash of system font before custom fonts load
- [ ] **Layout Stability**: Text doesn't shift when fonts load (similar metrics)
- [ ] **Fallback Quality**: If fonts fail to load, system fonts are readable

### Image Lazy Loading Test

**Open DevTools Network tab**, scroll down page:

- [ ] **Below-Fold Images**: Images outside viewport don't load until scrolled into view
- [ ] **Loading Strategy**: Images marked with `loading="lazy"` attribute
- [ ] **Placeholder**: Placeholder or blur appears before image loads

### Independent Test Criteria (from spec.md)

- [ ] FCP within 1.5 seconds (even on Fast 3G)
- [ ] Image placeholders prevent layout shift
- [ ] Font loading minimizes FOUT
- [ ] Below-fold images lazy load
- [ ] CSS bundle under 100KB

**Pass Criteria**: All performance metrics must meet or exceed targets.

---

## Phase 5: Cross-Browser Verification (P5)

**Goal**: Ensure consistent rendering across all target browsers

### Chrome Testing (Latest)

- [ ] All Phase 1-4 checks pass in Chrome
- [ ] No Chrome-specific errors in console
- [ ] Glassmorphism effects render correctly

### Firefox Testing (Latest)

- [ ] All Phase 1-4 checks pass in Firefox
- [ ] No Firefox-specific errors in console
- [ ] Glassmorphism effects render correctly
- [ ] Font rendering is smooth (not pixelated)

### Safari Testing (Latest)

- [ ] All Phase 1-4 checks pass in Safari
- [ ] No Safari-specific errors in console
- [ ] **Backdrop-filter support**: Glassmorphism works (or fallback is acceptable)
- [ ] Gradient text renders correctly (WebKit-specific property)

### Edge Testing (Latest)

- [ ] All Phase 1-4 checks pass in Edge (Chromium)
- [ ] No Edge-specific errors in console
- [ ] Rendering matches Chrome (both use Chromium engine)

### Visual Consistency Check

Compare screenshots or side-by-side views:

- [ ] **<5% Visual Variance**: Browsers look nearly identical
- [ ] **No Major Differences**: No missing effects or broken layouts
- [ ] **Acceptable Fallbacks**: If feature unsupported, fallback is acceptable

### Glassmorphism Fallback Test

**Disable backdrop-filter support** (or test in older browser):

- [ ] **Fallback Background**: Cards show solid background (not transparent)
- [ ] **Still Usable**: Page remains functional without glassmorphism
- [ ] **Acceptable Appearance**: Fallback looks intentional, not broken

### JavaScript Disabled Test

**Disable JavaScript** (Chrome DevTools > Settings > Debugger > Disable JavaScript):

- [ ] **CSS Still Loads**: Styling still renders (CSS is not JS-dependent)
- [ ] **Core Content Visible**: Text, images, layout all visible
- [ ] **Progressive Enhancement**: Page is usable without JS (interactive features may not work)

**Re-enable JavaScript** after test.

### Accessibility Test

**Run Lighthouse Accessibility Audit**:

- [ ] **Accessibility Score**: 95+ (green)
- [ ] **Color Contrast**: All text meets WCAG 2.1 AA (4.5:1 normal, 3:1 large)
- [ ] **ARIA Labels**: Interactive elements have proper labels
- [ ] **Keyboard Navigation**: Can tab through all interactive elements
- [ ] **Focus Indicators**: Visible focus outline on all interactive elements

### Independent Test Criteria (from spec.md)

- [ ] Chrome, Firefox, Safari, Edge show consistent appearance
- [ ] Glassmorphism fallbacks work on unsupported browsers
- [ ] JavaScript-disabled fallback provides usable experience
- [ ] Prefers-reduced-motion respected (tested in Phase 2)
- [ ] WCAG 2.1 AA compliance achieved

**Pass Criteria**: Page must work consistently across ALL target browsers with acceptable fallbacks.

---

## Troubleshooting

### Styling Not Rendering

**Symptoms**: Page loads but has no styling, looks like plain HTML

**Checks**:
1. Verify `postcss.config.mjs` exists in project root
2. Check console for CSS loading errors
3. Verify `.next/` directory was deleted before build
4. Run `npm run build` and check for errors

**Solution**: Re-apply configuration fixes, clear cache, rebuild

### Fonts Not Loading

**Symptoms**: System fonts display instead of Space Grotesk/Inter

**Checks**:
1. Check Network tab for font file 404 errors
2. Verify `layout.tsx` imports fonts correctly
3. Check console for font loading errors

**Solution**: Usually resolves after clearing cache and rebuilding

### Glassmorphism Not Working

**Symptoms**: Cards are transparent but not blurred

**Checks**:
1. Check if browser supports `backdrop-filter` (caniuse.com)
2. Verify fallback styles are applied (inspect element in DevTools)

**Solution**: This may be expected behavior on older browsers - fallback should look acceptable

### Performance Issues

**Symptoms**: Lighthouse score < 90, slow loading

**Checks**:
1. Check CSS bundle size (should be < 100KB)
2. Verify images are optimized (WebP/AVIF)
3. Check for console errors slowing rendering

**Solution**: Run build optimization, verify lazy loading works

### Responsive Layout Broken

**Symptoms**: Layout breaks at certain viewport sizes

**Checks**:
1. Verify Tailwind breakpoints match config (640px, 768px, 1024px, 1280px)
2. Check for horizontal scroll (overflow issues)
3. Inspect element to see which styles apply at breakpoint

**Solution**: May indicate Tailwind classes not compiling correctly - verify content paths in config

---

## Success Criteria Summary

### Must Pass (from spec.md)

- ✅ **SC-001**: 100% of CSS classes apply correctly (checked in Phase 1)
- ✅ **SC-002**: Zero visual regression (checked in Phase 2-5)
- ✅ **SC-003**: Interactive feedback within 16ms (checked in Phase 2)
- ✅ **SC-004**: No CSS console errors (checked in Phase 1)
- ✅ **SC-005**: <5% cross-browser variance (checked in Phase 5)
- ✅ **SC-006**: Zero unused CSS (checked in Phase 4 Lighthouse audit)
- ✅ **SC-007**: 95%+ UI task completion (all phases)

### Performance Targets (from constitution)

- ✅ FCP < 1.5s
- ✅ TTI < 3s
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1
- ✅ Bundle < 100KB
- ✅ Lighthouse > 90

---

## Completion Checklist

Before marking feature complete:

- [ ] All Phase 1 checks pass (Core Styling)
- [ ] All Phase 2 checks pass (Component Styling)
- [ ] All Phase 3 checks pass (Responsive Layout)
- [ ] All Phase 4 checks pass (Performance)
- [ ] All Phase 5 checks pass (Cross-Browser)
- [ ] No console errors in any browser
- [ ] Lighthouse scores meet targets
- [ ] Visual appearance matches design intent
- [ ] All acceptance criteria from spec.md verified

**When all boxes are checked, the UI styling fix is complete! ✅**
