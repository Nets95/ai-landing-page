# Tasks: Hero Image Carousel

**Feature Branch**: `005-hero-carousel`
**Input**: Design documents from `B:\Projects\ai-landing\specs\005-hero-carousel\`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/carousel.types.ts

**Tests**: Manual testing only per user request - NO automated test tasks included

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create data layer and type definitions needed by all user stories

- [x] T001 [P] Create TypeScript interfaces in src/types/carousel.ts (copy from specs/005-hero-carousel/contracts/carousel.types.ts)
- [x] T002 [P] Create Framer Motion animation variants in src/lib/carousel-animations.ts
- [x] T003 [P] Create carousel data file in src/data/carousel.json with 3 slides using existing images

**Checkpoint**: Type definitions and data layer complete - carousel components can now be built

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core carousel state management and hooks that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create useCarousel custom hook in src/hooks/useCarousel.ts with:
  - Auto-play timer (5 second intervals)
  - Pause/resume functionality
  - Current slide state management
  - Navigation methods (goToNext, goToPrevious, goToSlide)

**Checkpoint**: Foundation ready - user story components can now be implemented in parallel

---

## Phase 3: User Story 1 - First Impression Visual Experience (Priority: P1) 🎯 MVP

**Goal**: Visitors see a cinematic hero carousel with auto-rotating images (5-second intervals), smooth cross-fade transitions, hover-to-pause functionality, and seamless looping

**Independent Test**: Load landing page and verify: (1) first carousel image appears immediately with full coverage and no layout shift, (2) carousel auto-advances every 5 seconds with smooth fade transitions, (3) hover pauses auto-play on desktop, (4) carousel loops back to first image after last slide

### Implementation for User Story 1

- [x] T005 [US1] Create HeroCarousel container component in src/components/sections/HeroCarousel.tsx with:
  - AnimatePresence wrapper for cross-fade transitions
  - useCarousel hook integration
  - Hover event handlers (onPointerEnter/onPointerLeave for pause/resume)
  - Container layout (calc(100dvh - 70px) height for nav menu space)
  - Graceful degradation logic (disable auto-play if < 3 slides)

- [x] T006 [US1] Create CarouselSlide component in src/components/ui/CarouselSlide.tsx with:
  - Image rendering using standard img tag (object-fit: cover)
  - Absolute positioning for zero layout shift
  - Aspect ratio preservation

- [x] T007 [US1] Implement cross-fade transition animation in src/lib/carousel-animations.ts:
  - Exit animation: fade out (opacity 1 → 0, duration 800ms)
  - Enter animation: fade in (opacity 0 → 1, duration 800ms)
  - Use GPU-accelerated transforms only

- [x] T008 [US1] Integrate HeroCarousel into Hero section in src/components/sections/Hero.tsx:
  - Replace static ambient gradient background with HeroCarousel component
  - Preserve existing CTA buttons and scroll indicator (z-index layering)
  - Load carousel data from src/data/carousel.json
  - Maintain min-height calculation with reserved 70px top space

**Checkpoint**: User Story 1 complete - Carousel displays rotating images with auto-play, hover-to-pause, and smooth transitions. Test independently before proceeding.

---

## Phase 4: User Story 2 - Text Content with Visual Hierarchy (Priority: P2)

**Goal**: Each carousel slide displays unique headline and optional subtitle text positioned on the left side within a dark gradient overlay, ensuring WCAG AA contrast (4.5:1 minimum) and no text overlap during transitions

**Independent Test**: Load landing page and verify: (1) each slide shows unique headline/subtitle on left side, (2) text contrast ratio >= 4.5:1 when measured with DevTools, (3) no text flickering or overlap during slide transitions, (4) text remains readable on mobile without truncation

### Implementation for User Story 2

- [x] T009 [US2] Add CSS gradient overlay to CarouselSlide component in src/components/ui/CarouselSlide.tsx:
  - Implement left-to-right gradient (rgba(0,0,0,0.65) → rgba(0,0,0,0.25) → transparent)
  - Use 6 color stops to prevent banding artifacts
  - Position between image and text layers (z-index management)
  - aria-hidden="true" for accessibility
  - Validate gradient rendering across browsers (Chrome, Firefox, Safari) to verify no visible color banding

- [x] T010 [US2] Add text overlay rendering to CarouselSlide component in src/components/ui/CarouselSlide.tsx:
  - Render headline (h2) with Tailwind classes: text-5xl md:text-7xl font-bold text-gray-100
  - Render optional subtitle (p) with Tailwind classes: text-xl md:text-2xl text-gray-300
  - Position absolutely on left side within gradient dark area (padding-left for spacing)
  - Implement text truncation fallback for mobile (text-ellipsis)

- [x] T011 [US2] Add ARIA labels and semantic HTML in src/components/ui/CarouselSlide.tsx:
  - img alt attribute from slide.imageAlt
  - aria-label for carousel container ("Hero carousel with {n} slides")
  - Proper heading hierarchy (h2 for headlines)

**Checkpoint**: User Story 2 complete - Carousel displays readable text overlays with proper contrast. Test contrast ratios with Chrome DevTools. Both US1 and US2 should work together.

---

## Phase 5: User Story 3 - Smooth Text Animation on Slide Change (Priority: P3)

**Goal**: When a slide becomes active, its text content animates into view with a fade + upward motion effect (300-600ms duration), creating a cinematic feel without flickering or timing issues

**Independent Test**: Load landing page and verify: (1) text fades in with subtle upward motion when slide changes, (2) animation completes within 300-600ms, (3) no flickering between outgoing/incoming text, (4) animation timing works correctly across multiple transitions

### Implementation for User Story 3

- [x] T012 [US3] Implement text animation variants in src/lib/carousel-animations.ts:
  - Initial state: opacity 0, translateY(20px)
  - Animate state: opacity 1, translateY(0)
  - Transition: duration 500ms, ease-out
  - Conditional animation (respect prefers-reduced-motion media query)

- [x] T013 [US3] Add text animation to CarouselSlide component in src/components/ui/CarouselSlide.tsx:
  - Wrap headline and subtitle in motion.div components
  - Apply animation variants from carousel-animations.ts
  - Key animation by slide.id to reset on slide change
  - Stagger subtitle animation (delay 100ms after headline)

- [x] T014 [US3] Implement prefers-reduced-motion support in src/lib/carousel-animations.ts:
  - Detect prefers-reduced-motion media query with window.matchMedia
  - Return static variants (no motion) when reduced motion preferred
  - Maintain opacity transitions but remove translateY motion
  - Test with system-level reduced motion setting enabled

**Checkpoint**: User Story 3 complete - All three user stories (rotating carousel + text overlays + text animations) work together seamlessly. Full feature is now functional.

---

## Phase 6: Responsive Design & Mobile Optimization

**Purpose**: Ensure carousel works flawlessly across all devices (mobile 320px+, tablet 768px+, desktop 1920px+)

- [x] T015 [P] Add responsive breakpoints to HeroCarousel component in src/components/sections/HeroCarousel.tsx:
  - Mobile (320px+): Single column layout, reduced text padding
  - Tablet (768px+): Adjust text sizing (headline text-6xl, subtitle text-xl)
  - Desktop (1920px+): Full text sizing (headline text-7xl, subtitle text-2xl)

- [x] T016 [P] Add responsive image handling to CarouselSlide component in src/components/ui/CarouselSlide.tsx:
  - Ensure object-fit: cover works on all browsers
  - Verify aspect ratio preservation on narrow/wide viewports
  - Test image rendering on iOS Safari and Android Chrome

- [x] T017 [P] Test mobile viewport height calculation in src/components/sections/HeroCarousel.tsx:
  - Verify calc(100dvh - 70px) works on mobile (handles address bar hide/show)
  - Add 100vh fallback for older browsers
  - Test on real iOS and Android devices

**Checkpoint**: Carousel is fully responsive across all target devices

---

## Phase 7: Accessibility & Polish

**Purpose**: WCAG 2.1 AA compliance, keyboard navigation, and accessibility enhancements

- [x] T018 [P] Add keyboard event handlers to HeroCarousel component in src/components/sections/HeroCarousel.tsx:
  - Left arrow: go to previous slide (goToPrevious)
  - Right arrow: go to next slide (goToNext)
  - Escape: pause/resume carousel toggle
  - Focus indicators visible for keyboard navigation

- [x] T019 [P] Add screen reader enhancements to HeroCarousel component in src/components/sections/HeroCarousel.tsx:
  - aria-live="polite" region for slide announcements
  - aria-label describing current slide number ("Slide 2 of 3")
  - role="region" with aria-labelledby for carousel container

- [x] T020 [P] Verify WCAG AA contrast ratios using Chrome DevTools:
  - Test headline text (text-gray-100) against gradient background
  - Test subtitle text (text-gray-300) against gradient background
  - Ensure minimum 4.5:1 ratio for normal text
  - Adjust gradient opacity if contrast is insufficient

- [x] T021 [P] Add focus trap management in src/hooks/useCarousel.ts:
  - Pause auto-play when carousel receives keyboard focus
  - Resume auto-play when focus leaves carousel
  - Ensure CTA buttons remain focusable (z-index management)

**Checkpoint**: Carousel is fully accessible and WCAG AA compliant

---

## Phase 8: Performance Optimization & Validation

**Purpose**: Ensure carousel meets performance targets (FCP < 1.5s, 60fps animations, CLS = 0)

- [ ] T022 Optimize carousel images in public/images/carousel/ (MANUAL - User to execute):
  - Convert existing PNGs to WebP format (if not already done)
  - Resize images to 1920px width maximum
  - Compress to < 500KB per image target
  - Verify total carousel assets < 1.5MB
  - NOTE: Current images are ~6MB total PNG - need optimization

- [ ] T023 Run Lighthouse performance audit (MANUAL - User to execute):
  - Build production version (npm run build && npm start)
  - Run Lighthouse in Chrome DevTools
  - Verify Performance score > 90
  - Check Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS = 0

- [ ] T024 Measure animation frame rate (MANUAL - User to execute):
  - Open Chrome DevTools Performance tab
  - Record carousel transitions (30 seconds)
  - Verify FPS stays at 60fps (no frame drops during transitions)
  - Check for main thread blocking (should be minimal)

- [ ] T025 Verify zero layout shift (CLS metric) (MANUAL - User to execute):
  - Record page load with Chrome DevTools Performance
  - Check Layout Shift events in timeline
  - Verify CLS score = 0 (no layout shifts during carousel transitions)
  - Test on mobile devices (layout shift more noticeable)

- [ ] T026 Check bundle size impact (MANUAL - User to execute):
  - Run npm run build
  - Check .next/static/chunks output
  - Verify carousel components add < 10KB gzipped
  - Use webpack-bundle-analyzer if needed

**Checkpoint**: Carousel meets all performance targets and constitutional requirements

---

## Phase 9: Manual Testing & Quality Assurance

**Purpose**: Comprehensive manual testing across browsers, devices, and edge cases

### Desktop Testing

- [ ] T027 Test auto-play functionality on desktop (Chrome, Firefox, Safari, Edge):
  - Verify carousel auto-advances every 5 seconds
  - Verify smooth cross-fade transitions between slides
  - Verify seamless looping (slide 3 → slide 1)
  - Verify no visual glitches or stuttering

- [ ] T028 Test hover-to-pause functionality on desktop:
  - Hover over carousel → auto-play pauses
  - Move cursor away → auto-play resumes
  - Verify hover detection works across entire carousel area
  - Test with trackpad and mouse

- [ ] T029 Test keyboard navigation on desktop:
  - Tab to carousel → focus visible
  - Left/Right arrows → manual slide navigation
  - Escape key → pause/resume toggle
  - Verify focus indicators are visible

### Mobile Testing

- [ ] T030 Test carousel on mobile devices (iOS Safari, Android Chrome):
  - Verify first image loads within 1.5 seconds
  - Verify auto-play works (no hover on mobile)
  - Verify responsive layout (text readable, no horizontal scroll)
  - Verify touch scrolling doesn't interfere with carousel

- [ ] T031 Test mobile viewport height handling:
  - Verify carousel height accounts for 70px nav space reservation
  - Test with address bar visible and hidden (iOS Safari)
  - Verify no layout shift when address bar animates
  - Test in landscape and portrait orientations

### Edge Case Testing

- [ ] T032 Test with fewer than 3 slides:
  - Edit src/data/carousel.json to have only 2 slides
  - Verify auto-play is disabled (static display)
  - Verify no errors in browser console
  - Verify slide still displays correctly

- [ ] T033 Test with prefers-reduced-motion enabled:
  - Enable reduced motion in system settings
  - Verify animations are minimized or disabled
  - Verify carousel still advances slides (functionality preserved)
  - Verify no motion sickness triggers

- [ ] T034 Test with very long text content:
  - Edit src/data/carousel.json to add 100+ character headline
  - Verify text truncates or wraps without breaking layout
  - Verify gradient overlay still provides sufficient contrast
  - Verify no text overflow on mobile

- [ ] T035 Test contrast ratios with different image brightnesses:
  - Test with very dark images (gradient may be too dark)
  - Test with very bright images (gradient may be insufficient)
  - Adjust gradient opacity if needed (edit CarouselSlide.tsx)
  - Verify 4.5:1 ratio maintained in all cases

### Cross-Browser Testing

- [ ] T036 Test on Chrome (latest):
  - Verify all features work (auto-play, hover, animations)
  - Check DevTools for console errors
  - Verify Lighthouse score > 90

- [ ] T037 Test on Firefox (latest):
  - Verify cross-fade transitions work smoothly
  - Verify text animations render correctly
  - Test hover-to-pause functionality

- [ ] T038 Test on Safari (latest):
  - Verify calc(100dvh - 70px) height works
  - Verify WebP images load (with PNG fallback)
  - Test on macOS Safari desktop and iOS Safari mobile

- [ ] T039 Test on Edge (latest):
  - Verify Chromium-based Edge has no issues
  - Test hover and keyboard navigation
  - Verify gradient rendering (no banding)

**Checkpoint**: All manual testing complete - carousel is production-ready

---

## Phase 10: Documentation & Handoff

**Purpose**: Update documentation for maintenance and future enhancements

- [x] T040 [P] Update CLAUDE.md with carousel implementation details:
  - Add carousel components to project structure
  - Document data file location (src/data/carousel.json)
  - Add usage examples for adding new slides

- [x] T041 [P] Create carousel usage guide (if not already in quickstart.md):
  - Document how to add new slides
  - Document configuration options (auto-play interval, animation timing)
  - Document troubleshooting common issues
  - Add performance optimization tips

- [x] T042 [P] Add inline code comments to complex logic:
  - useCarousel hook (auto-play timer, cleanup)
  - Animation variants (prefers-reduced-motion handling)
  - Gradient overlay implementation (z-index layering)

**Checkpoint**: Documentation complete - feature ready for handoff

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion - BLOCKS all user stories
- **Phase 3 (User Story 1)**: Depends on Phase 2 completion - Can proceed independently
- **Phase 4 (User Story 2)**: Depends on Phase 2 and Phase 3 completion - Extends carousel with text
- **Phase 5 (User Story 3)**: Depends on Phase 2 and Phase 4 completion - Adds text animations
- **Phase 6 (Responsive Design)**: Depends on Phase 5 completion - Cross-cutting enhancement
- **Phase 7 (Accessibility)**: Can run in parallel with Phase 6 - Independent enhancements
- **Phase 8 (Performance)**: Depends on Phase 5 completion - Validation phase
- **Phase 9 (Manual Testing)**: Depends on all previous phases - Final validation
- **Phase 10 (Documentation)**: Can run in parallel with Phase 9 - Independent documentation work

### User Story Dependencies

- **User Story 1 (P1)**: Rotating carousel with auto-play - NO dependencies on other stories (MVP)
- **User Story 2 (P2)**: Text overlays - DEPENDS on User Story 1 (carousel must exist to add text)
- **User Story 3 (P3)**: Text animations - DEPENDS on User Story 2 (text must exist to animate)

### Within Each User Story

- **User Story 1**:
  1. T005 (HeroCarousel container) → T006 (CarouselSlide component) → T007 (animations) → T008 (integration)
  2. T005 and T006 can potentially run in parallel (different files)
  3. T007 depends on understanding animation requirements from T005/T006
  4. T008 depends on all previous tasks (final integration)

- **User Story 2**:
  1. T009 (gradient overlay) → T010 (text rendering) → T011 (ARIA labels)
  2. T009 and T010 can potentially run in parallel (different concerns)
  3. T011 depends on T010 (need text to add labels)

- **User Story 3**:
  1. T012 (animation variants) → T013 (apply animations) → T014 (reduced motion)
  2. T012 must complete before T013 (variants needed for application)
  3. T014 can extend T012 in parallel or sequentially

### Parallel Opportunities

- **Phase 1 (Setup)**: All 3 tasks (T001, T002, T003) can run in parallel [P]
- **Phase 6 (Responsive)**: All 3 tasks (T015, T016, T017) can run in parallel [P]
- **Phase 7 (Accessibility)**: All 4 tasks (T018, T019, T020, T021) can run in parallel [P]
- **Phase 10 (Documentation)**: All 3 tasks (T040, T041, T042) can run in parallel [P]

**Within User Stories**:
- User Story 1: T005 and T006 can run in parallel (different files)
- User Story 2: T009 and T010 can run in parallel (different concerns in same file)
- User Story 3: T012 and T014 can be combined or run sequentially (same file, related logic)

---

## Parallel Example: Phase 1 Setup

```bash
# Launch all setup tasks together (different files, no dependencies):
Task: "Create TypeScript interfaces in src/types/carousel.ts"
Task: "Create Framer Motion animation variants in src/lib/carousel-animations.ts"
Task: "Create carousel data file in src/data/carousel.json"
```

---

## Parallel Example: Phase 7 Accessibility

```bash
# Launch all accessibility tasks together (independent enhancements):
Task: "Add keyboard event handlers to HeroCarousel component"
Task: "Add screen reader enhancements to HeroCarousel component"
Task: "Verify WCAG AA contrast ratios using Chrome DevTools"
Task: "Add focus trap management in useCarousel hook"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004)
3. Complete Phase 3: User Story 1 (T005-T008)
4. **STOP and VALIDATE**: Test carousel rotating images with auto-play
5. If working: Proceed to User Story 2 or deploy MVP

**MVP Deliverable**: Rotating hero carousel with 3 images, auto-play (5s intervals), hover-to-pause, smooth transitions

### Incremental Delivery

1. **Setup + Foundational** (T001-T004) → Foundation ready
2. **Add User Story 1** (T005-T008) → Test independently → Deploy MVP! ✅
3. **Add User Story 2** (T009-T011) → Test text overlays → Deploy enhanced version ✅
4. **Add User Story 3** (T012-T014) → Test animations → Deploy polished version ✅
5. **Responsive Design** (T015-T017) → Test mobile → Deploy mobile-optimized version ✅
6. **Accessibility** (T018-T021) → Test WCAG → Deploy accessible version ✅
7. **Performance & Testing** (T022-T039) → Validate quality → Deploy production-ready version ✅

### Sequential Development (Recommended)

**Week 1**: Setup + User Story 1 (MVP)
- Day 1: T001-T004 (Setup + Foundational)
- Day 2-3: T005-T008 (User Story 1 - Rotating carousel)
- Day 4: Manual testing, refinement
- Day 5: Deploy MVP

**Week 2**: User Story 2 + User Story 3
- Day 1-2: T009-T011 (User Story 2 - Text overlays)
- Day 3-4: T012-T014 (User Story 3 - Text animations)
- Day 5: Testing and refinement

**Week 3**: Polish & Production Readiness
- Day 1: T015-T017 (Responsive design)
- Day 2: T018-T021 (Accessibility)
- Day 3: T022-T026 (Performance optimization)
- Day 4-5: T027-T039 (Comprehensive manual testing)

**Week 4**: Documentation & Deployment
- Day 1: T040-T042 (Documentation)
- Day 2-3: Final testing, bug fixes
- Day 4: Production deployment
- Day 5: Monitoring and handoff

---

## Notes

- **[P] tasks** = different files or independent work, can run in parallel
- **[Story] label** = maps task to specific user story (US1, US2, US3) for traceability
- **NO automated tests** per user request - manual testing only (Phase 9)
- **Manual testing is comprehensive** (T027-T039) covering desktop, mobile, browsers, edge cases
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Performance targets: FCP < 1.5s, 60fps, CLS = 0, bundle < 10KB
- Accessibility targets: WCAG AA (4.5:1 contrast), prefers-reduced-motion, keyboard navigation
- Reserve 70px at top for future navigation menu (carousel height: calc(100dvh - 70px))

---

## Success Criteria

### After User Story 1 (MVP):
- ✅ Carousel displays 3 rotating images
- ✅ Auto-advances every 5 seconds
- ✅ Smooth cross-fade transitions (800ms)
- ✅ Hover-to-pause works on desktop
- ✅ Seamless looping (no visual glitches)
- ✅ Zero layout shift (CLS = 0)

### After User Story 2:
- ✅ All US1 criteria maintained
- ✅ Each slide shows unique headline + subtitle
- ✅ Text contrast >= 4.5:1 (WCAG AA)
- ✅ Text positioned on left within gradient
- ✅ No text flickering during transitions
- ✅ Text readable on mobile (no truncation)

### After User Story 3:
- ✅ All US1 + US2 criteria maintained
- ✅ Text animates in with fade + upward motion
- ✅ Animation completes in 300-600ms
- ✅ No timing issues across transitions
- ✅ Reduced motion support works

### Production Ready (After All Phases):
- ✅ All user story criteria met
- ✅ Responsive across all devices (320px+)
- ✅ WCAG AA compliant (contrast, keyboard, screen reader)
- ✅ Performance targets met (Lighthouse > 90, 60fps, CLS = 0)
- ✅ Manual testing complete (desktop + mobile + browsers)
- ✅ Documentation updated
- ✅ Ready for deployment
