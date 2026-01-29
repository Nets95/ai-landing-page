# Feature Specification: Hero Image Carousel

**Feature Branch**: `005-hero-carousel`
**Created**: 2026-01-29
**Status**: Draft
**Input**: User description: "Hero Image Carousel - Implement a cinematic hero section image carousel with smooth transitions, gradient overlay, animated text, and auto-play functionality"

## Clarifications

### Session 2026-01-29

- Q: What should happen if fewer than 3 images are configured? → A: Display available slides but disable auto-play rotation if fewer than 3 slides (graceful degradation)
- Q: Which direction should the text animation use? → A: From bottom (vertical motion) - text rises upward into position
- Q: What exact interval should be used between slide transitions? → A: 5 seconds (balanced, industry standard)
- Q: Should the carousel occupy the entire viewport height? → A: No, carousel must leave space at the top for a future navigation menu bar (approximately 60-80px)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First Impression Visual Experience (Priority: P1)

When visitors land on the page, they immediately see a cinematic, premium hero section with rotating imagery that establishes the brand's visual identity and captures attention.

**Why this priority**: The hero section is the first element visitors see. A compelling visual experience within the first 3 seconds determines whether visitors stay or leave. This is the core value proposition of the feature.

**Independent Test**: Can be fully tested by loading the landing page and observing that high-quality images rotate smoothly with proper aspect ratio and responsive behavior across devices. Delivers immediate visual impact without requiring any user interaction.

**Acceptance Scenarios**:

1. **Given** a visitor loads the landing page, **When** the hero section renders, **Then** the first carousel image appears immediately with full container coverage, preserved aspect ratio, and no layout shift
2. **Given** the carousel is displaying an image, **When** 5 seconds elapse without user interaction, **Then** the carousel automatically transitions to the next image using a smooth fade/cross-fade effect
3. **Given** the carousel is auto-playing, **When** the visitor hovers over the hero section (desktop only), **Then** the auto-play pauses until the visitor moves their cursor away
4. **Given** multiple images in the carousel, **When** all images have been displayed, **Then** the carousel loops back to the first image seamlessly

---

### User Story 2 - Text Content with Visual Hierarchy (Priority: P2)

Each carousel slide presents unique text content that is highly readable against the image background, positioned strategically within the gradient overlay to ensure optimal contrast and visual hierarchy.

**Why this priority**: Without readable text, the carousel becomes purely decorative. Text content communicates key messages, value propositions, and calls-to-action. This transforms the carousel from decoration into a functional communication tool.

**Independent Test**: Can be tested independently by verifying that each slide displays unique headline and optional subtitle text positioned on the left side within the gradient's dark area, with sufficient contrast (WCAG AA minimum 4.5:1 ratio) and no text overlapping during transitions.

**Acceptance Scenarios**:

1. **Given** a carousel slide is active, **When** the image is displayed, **Then** unique text content (headline and optional subtitle) appears on the left side of the carousel within the darker gradient area
2. **Given** text is overlaid on an image, **When** measured for contrast ratio, **Then** the text maintains at least 4.5:1 contrast ratio with the background (WCAG AA compliance)
3. **Given** text content is displayed, **When** the slide transitions to the next image, **Then** the text does not flicker, jump, or overlap with incoming text during the transition
4. **Given** the carousel on a mobile device, **When** the viewport is narrow, **Then** text content remains readable and properly positioned without overflow or truncation

---

### User Story 3 - Smooth Text Animation on Slide Change (Priority: P3)

When a new slide becomes active, its text content animates into view with a subtle fade and motion effect, creating a polished, cinematic feel that enhances the premium perception of the brand.

**Why this priority**: While functional readability (P2) is essential, animation adds polish and premium feel. This is enhancement rather than core functionality, making it lower priority than basic carousel operation and text readability.

**Independent Test**: Can be tested by observing slide transitions and verifying that text fades in with subtle upward motion within 300-600ms, with proper timing so animation completes before the next slide change, and no visual glitches occur.

**Acceptance Scenarios**:

1. **Given** a new slide becomes active, **When** the image transition begins, **Then** the slide's text content animates in with a fade effect combined with subtle upward motion (from bottom)
2. **Given** text animation is in progress, **When** measured, **Then** the animation completes within 300-600ms
3. **Given** multiple rapid slide changes, **When** a slide transition occurs, **Then** the previous slide's text animation fully resets before the new slide's text animates in
4. **Given** the carousel is running, **When** observing text animations across multiple transitions, **Then** no flicker, jump, or timing issues occur between text fade-out and fade-in

---

### Edge Cases

- **Fewer than 3 images**: If only 1-2 images are configured, the system displays available slides as static images without auto-play rotation (graceful degradation to prevent broken behavior)
- **Navigation menu space**: Carousel must account for reserved top space (60-80px) for future navigation menu, ensuring proper height calculation on various viewport sizes
- How does the carousel handle images with extreme aspect ratios (very wide panoramas or tall portraits)?
- What happens when the gradient overlay is applied to very dark images where additional darkening reduces visibility?
- How does the carousel behave when network latency causes slow image loading?
- What happens if text content is extremely long and exceeds the available space within the gradient area?
- How does the system handle accessibility requirements for users with motion sensitivities (prefers-reduced-motion)?
- What happens on touch devices where "hover to pause" is not available - should tap/touch pause the carousel?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display an image carousel in the hero section containing a minimum of three (3) images
- **FR-002**: System MUST ensure carousel images fully cover the hero container while preserving aspect ratio (using object-fit cover or equivalent)
- **FR-003**: System MUST render carousel images responsively across all viewport sizes (mobile, tablet, desktop) without layout shift or visual breaks
- **FR-004**: System MUST transition between slides using smooth fade or cross-fade effects with no hard cuts or jarring visual changes
- **FR-005**: System MUST apply a CSS-based gradient overlay on top of carousel images with left-to-right direction (darkest on left, gradually fading to transparent on right)
- **FR-006**: Gradient overlay MUST be implemented as a CSS layer and NOT baked into the images themselves
- **FR-007**: Gradient overlay MUST NOT reduce perceived image quality or introduce visible banding artifacts
- **FR-008**: System MUST display unique text content (headline and optional subtitle) for each carousel slide
- **FR-009**: Text content MUST be positioned on the left side of the carousel within the darker area of the gradient overlay
- **FR-010**: Text content MUST use softened white color (e.g., #f5f5f5, not pure #ffffff) for optimal readability
- **FR-011**: Text typography MUST use modern, clean fonts with strong hierarchy (prominent headline, smaller subtitle)
- **FR-012**: System MUST animate slide text when a new slide becomes active using fade-in combined with subtle upward motion (from bottom)
- **FR-013**: Text animation MUST complete within 300-600ms
- **FR-014**: Text animation MUST reset completely when slides change to prevent flicker, jump, or overlap
- **FR-015**: System MUST auto-play the carousel by default with a slide delay of 5 seconds between transitions
- **FR-016**: System MUST pause carousel auto-play when the user hovers over the hero section (desktop only)
- **FR-017**: System MUST resume carousel auto-play when the user's cursor leaves the hero section
- **FR-018**: System MUST loop the carousel seamlessly when all slides have been displayed, returning to the first slide
- **FR-019**: System MUST maintain accessible contrast ratios (minimum 4.5:1 for normal text per WCAG AA) between text and background
- **FR-020**: System MUST prevent layout shift during carousel transitions to maintain visual stability
- **FR-021**: System MUST respect user motion preferences (prefers-reduced-motion) by disabling or reducing animations for users with motion sensitivities
- **FR-022**: Carousel slides MUST be easy to add, remove, or reorder through simple data structure changes (no complex refactoring required)
- **FR-023**: System MUST gracefully degrade when fewer than 3 images are configured by displaying available slides as static images without auto-play rotation (no error state or broken UI)
- **FR-024**: Carousel MUST NOT occupy the full viewport height; it MUST leave space at the top of the page for a navigation menu (minimum 60px, recommended 60-80px reserved space)

### Key Entities

- **Carousel Slide**: Represents a single slide in the hero carousel, containing an image source, headline text, and optional subtitle text. Each slide is independently configured and can be added/removed from the carousel collection.
- **Gradient Overlay**: A visual layer applied consistently across all slides, defined by color stops and direction (left-to-right), positioned between the image and text layers.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors see the first hero image render within 1.5 seconds of page load (First Contentful Paint)
- **SC-002**: Carousel transitions complete smoothly with no visual jitter or frame drops (maintaining 60fps during transitions)
- **SC-003**: Text content on all slides maintains minimum 4.5:1 contrast ratio when measured against the gradient overlay
- **SC-004**: Zero layout shift (Cumulative Layout Shift score of 0) during carousel transitions and text animations
- **SC-005**: Carousel auto-plays reliably with 5 second intervals between slides without manual intervention
- **SC-006**: Hover-to-pause functionality works consistently on desktop devices (100% success rate in testing)
- **SC-007**: Carousel works seamlessly across all target devices (desktop 1920px+, tablet 768-1919px, mobile 320-767px) without horizontal scrolling or aspect ratio distortion
- **SC-008**: Text animations complete within the specified 300-600ms window with no overlap between outgoing and incoming text
- **SC-009**: New slides can be added to the carousel by updating a data file/configuration with no code changes required
- **SC-010**: Feature works correctly for users with reduced motion preferences (animations disabled or minimized)
- **SC-011**: Carousel height leaves minimum 60px of vertical space at the top of the viewport for future navigation menu integration across all device sizes

### Quality & Performance Criteria (per Constitution)

- **Test Coverage**: Minimum 80% code coverage; 95%+ for critical paths
- **Accessibility**: WCAG 2.1 Level AA compliance achieved (contrast ratios, reduced motion support, semantic HTML)
- **Performance**: First Contentful Paint < 1.5s, Time to Interactive < 3s, Lighthouse score > 90
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1 (zero layout shift during transitions)
- **Bundle Size**: Carousel implementation adds < 10KB to the JavaScript bundle (gzipped)
- **Animation Performance**: Carousel transitions maintain 60fps (16.67ms per frame) on target devices

## Assumptions

1. **Image Assets**: Assume high-quality images (minimum 1920px width) are provided by the content team in optimized formats (WebP with fallback)
2. **Image Count**: Assume exactly 3-5 slides will be used initially, though the system should support adding more without breaking
3. **Auto-play Default**: Assume auto-play is always enabled by default since the feature description specifies it, with no toggle to disable it initially
4. **Text Length**: Assume headlines are 5-10 words maximum and subtitles are 10-20 words maximum to fit within the gradient area
5. **Gradient Values**: Assume the suggested gradient values (rgba(0,0,0,0.65) to rgba(0,0,0,0)) provide sufficient contrast, but these can be adjusted during implementation based on actual images
6. **Animation Library**: Assume the existing Framer Motion library (already in project per CLAUDE.md) will be used for animations rather than introducing new dependencies
7. **Touch Devices**: Assume touch/tap interaction for pause functionality is a future enhancement (not in initial scope), so mobile users experience continuous auto-play only
8. **Error Handling**: Assume images are always available and properly formatted; loading states and error handling for missing images are deferred to future iterations
9. **Browser Support**: Assume modern browser support only (last 2 versions of Chrome, Firefox, Safari, Edge) with no IE11 compatibility required
10. **Accessibility Controls**: Assume prefers-reduced-motion is the primary accessibility mechanism; dedicated pause/play buttons are out of scope for initial version
11. **Navigation Menu Space**: Assume 60-80px vertical space at the top of the viewport will be reserved for a future navigation menu, though the menu itself is not part of this implementation; carousel height should be calculated as `100vh - [menu-height]` or use a max-height approach

## Constraints

- Must integrate seamlessly with existing hero section layout and design system
- Must use existing project dependencies (Framer Motion, Tailwind CSS) without adding new animation libraries
- Must maintain existing performance benchmarks (90+ Lighthouse score, < 200KB total bundle size per constitution)
- Must not interfere with other hero section elements (navigation, CTA buttons, scroll indicators)
- Must reserve space at the top of the viewport for a future navigation menu bar (60-80px), ensuring the carousel does not occupy full viewport height

## Dependencies

- High-quality carousel images must be provided by the design/content team before implementation
- Text content (headlines and subtitles) for each slide must be finalized
- Existing hero section component must be accessible for modification or replacement

## Out of Scope

- Manual navigation controls (previous/next buttons, dot indicators) - can be added in future iteration
- Swipe gestures for mobile navigation - deferred to future enhancement
- Lazy loading of off-screen images - assume all images load immediately
- Dynamic image loading from CMS or API - assume static configuration file
- Video backgrounds or animated content within slides - images only
- Parallax scrolling effects - simple static carousel only
- A/B testing or analytics integration for carousel engagement metrics

---

## Post-Implementation: Site-Wide Design Extension

**Date Extended**: 2026-01-29

### Background

The neon cyberpunk text styling initially implemented for the hero carousel text overlays (cyan-400 headlines with multi-layered text-shadow glows) proved highly effective and visually cohesive. Based on user feedback and design review, the decision was made to extend this aesthetic across the entire website to create a unified brand identity.

### Scope of Extension

The neon cyberpunk styling was systematically applied to all text elements and interactive components across the website, transforming it from a feature-specific implementation to a comprehensive design system.

#### Components Updated

1. **Header/Navigation**
   - Logo: Neon cyan with primary glow, uppercase styling
   - Navigation links: Cyan-300 with subtle glow, uppercase tracking
   - CTA buttons: Primary neon button styling with multi-layer shadows

2. **Hero Section**
   - Carousel text: Original implementation maintained (reference point)
   - Scroll indicator: Cyan-300 with icon drop-shadow glow

3. **Tech Showcase Section**
   - Section headings: Primary cyan glow, uppercase, 48-60px
   - Subtitles: Cyan-300/90 with subtitle glow
   - Filter buttons: Cyan borders with neon glow on active state
   - Technology cards:
     - Card titles: Cyan-400 with subtitle glow
     - Descriptions: Cyan-300/60 with subtle glow
     - Proficiency badges: Color-coded (cyan/purple/magenta) with glows
     - Card borders: Cyan with multi-layer box-shadow glow

4. **Portfolio Section**
   - Section headings: Primary cyan glow matching Tech Showcase
   - Filter buttons: Consistent neon styling with Tech Showcase
   - Portfolio cards:
     - Titles: Cyan-400 with subtitle glow, uppercase tracking
     - Descriptions: Cyan-300/60 with subtle glow
     - Technology tags: Cyan borders and backgrounds with glows
     - Outcome metrics: Cyan-400 values with glows
     - "View Details" indicator: Uppercase with strong glow
   - Portfolio modal:
     - All headings: Cyan-400 with appropriate glow levels
     - Category badges: Cyan neon styling
     - Technology tags: Consistent with card styling
     - Outcome cards: Cyan text with glowing values

5. **Contact Section**
   - Main headline: Cyan-400 + Magenta-400 combination for visual interest
   - Subtitle: Cyan-300/90 with glow
   - Form labels: Cyan-300, uppercase, subtle glow
   - Contact info headings: Cyan-400, uppercase
   - Social link cards: Cyan borders with hover glow enhancement
   - Success message: Cyan-400 with celebration styling

6. **Footer**
   - Navigation links: Cyan-300, uppercase, subtle glow
   - Social icons: Cyan with drop-shadow filters
   - Copyright text: Cyan-300/60 with minimal glow

7. **Global Components**
   - **Buttons**:
     - Primary: Cyan background with multi-layer glow and border
     - Secondary: Cyan border with subtle glow
     - All buttons: Uppercase styling with letter spacing
   - **Cards**: 
     - All card variants: Cyan borders (rgba(6, 182, 212, 0.3))
     - Box-shadow: Multi-layer outer + inner glow
     - Hover states: Enhanced glow intensity
   - **Glass Effects**: All glassmorphism variants updated with cyan borders and glows

### Technical Implementation

#### Color Palette
- **Primary Cyan**: `rgb(34, 211, 238)` - Main headings
- **Subtle Cyan**: `rgb(103, 232, 249)` - Body text
- **Accent Magenta**: `rgb(236, 72, 153)` - Special highlights
- **Accent Purple**: `rgb(168, 85, 247)` - Badge variations

#### Glow Effects (Text Shadows)

**Primary Heading Glow**:
```css
text-shadow: 
  0 0 10px rgba(34, 211, 238, 0.8),
  0 0 20px rgba(34, 211, 238, 0.6),
  0 0 30px rgba(34, 211, 238, 0.4),
  0 0 40px rgba(6, 182, 212, 0.3),
  0 0 70px rgba(6, 182, 212, 0.2),
  0 0 100px rgba(6, 182, 212, 0.1);
```

**Subtitle/Body Glow**:
```css
text-shadow: 
  0 0 8px rgba(103, 232, 249, 0.7),
  0 0 15px rgba(103, 232, 249, 0.5),
  0 0 25px rgba(103, 232, 249, 0.3),
  0 0 35px rgba(34, 211, 238, 0.2);
```

**Subtle Glow**:
```css
text-shadow: 
  0 0 5px rgba(103, 232, 249, 0.5),
  0 0 10px rgba(103, 232, 249, 0.3);
```

#### Card/Border Glows (Box Shadows)

**Default Card**:
```css
border: 1px solid rgba(6, 182, 212, 0.3);
box-shadow: 
  0 0 10px rgba(6, 182, 212, 0.2),
  0 0 20px rgba(6, 182, 212, 0.1),
  inset 0 0 10px rgba(6, 182, 212, 0.05);
```

**Card Hover**:
```css
border: 1px solid rgba(6, 182, 212, 0.6);
box-shadow: 
  0 0 15px rgba(6, 182, 212, 0.4),
  0 0 30px rgba(6, 182, 212, 0.2),
  inset 0 0 15px rgba(6, 182, 212, 0.1);
```

### Files Modified

#### Global Styles
- `src/app/globals.css`: Added neon utility classes, updated button/card styles

#### Layout Components
- `src/components/layout/Header.tsx`: Logo and navigation with neon styling

#### Section Components
- `src/components/sections/Hero.tsx`: Scroll indicator styling
- `src/components/sections/TechShowcase.tsx`: Headings, filters, card integration
- `src/components/sections/Portfolio.tsx`: Headings, filters, card integration
- `src/components/sections/Contact.tsx`: All headings, form labels, social links
- `src/components/sections/Footer.tsx`: Navigation, social icons, copyright

#### UI Components
- `src/components/ui/TechnologyCard.tsx`: Titles, descriptions, badges, hover glow
- `src/components/ui/PortfolioCard.tsx`: All text elements, tags, outcomes
- `src/components/ui/PortfolioModal.tsx`: All modal content with neon styling
- `src/components/forms/ContactForm.tsx`: Labels, success message

### Design System Documentation

Complete design system documentation including color palette, typography hierarchy, glow effects, component patterns, utility classes, and implementation guidelines has been created in:

**`specs/005-hero-carousel/design-system.md`**

This document serves as the authoritative reference for maintaining and extending the neon cyberpunk aesthetic across the application.

### Accessibility Maintained

All extended styling maintains WCAG AA compliance:
- Text contrast ratios remain above 4.5:1 minimum
- Neon effects are purely decorative (CSS-only)
- Screen reader compatibility unaffected
- `prefers-reduced-motion` support preserved
- Color is not the sole differentiator for information

### Performance Considerations

- Text-shadow is GPU-accelerated (no performance impact)
- Box-shadow effects optimized with minimal layer count
- Mobile devices receive reduced glow intensity for performance
- No additional HTTP requests or bundle size increase

### Success Metrics

- **Brand Cohesion**: Unified visual identity across all pages
- **User Feedback**: Positive response to futuristic aesthetic
- **Accessibility**: All WCAG AA requirements maintained
- **Performance**: No degradation in Lighthouse scores
- **Maintainability**: Centralized design system documentation

### Maintenance

The neon cyberpunk aesthetic should be applied to any new components or sections added to the website. Refer to `design-system.md` for specific implementation patterns and guidelines.