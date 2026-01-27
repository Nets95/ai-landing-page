# Tasks: Fix Broken UI Styling and Rendering

**Input**: Design documents from `/specs/002-fix-ui/`
**Prerequisites**: plan.md (required), spec.md (required), research.md (diagnostic findings)

**Tests**: Visual verification tests only - no automated unit/integration tests required for this configuration fix feature.

**Organization**: Tasks are grouped by user story (P1-P4) to enable independent implementation and testing of each styling phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Project Type**: Next.js 15 App Router (single web application)
- **Configuration files**: Project root (postcss.config.mjs, tailwind.config.ts)
- **Source**: src/ directory (app/, components/, lib/, types/, data/)
- **Build output**: .next/ directory (to be cleared)

---

## Phase 1: Setup (Configuration Files Creation)

**Purpose**: Create and update configuration files to enable Tailwind CSS 4 processing

**⚠️ CRITICAL**: These configuration changes are the root cause fix for broken styling

- [X] T001 [P] Create postcss.config.mjs in project root with Tailwind CSS 4 and Autoprefixer plugins
- [X] T002 [P] Update tailwind.config.ts to flatten nested color structures (bg.primary → 'bg-primary', text.primary → 'text-primary', etc.)
- [X] T003 [P] Update tailwind.config.ts content paths to remove non-existent './src/pages/**/*' reference and keep only './src/app/**/*' and './src/components/**/*'
- [X] T004 Clear .next directory to remove stale build artifacts (rm -rf .next or rmdir /s /q .next on Windows)

**Checkpoint**: Configuration files ready - build pipeline can now process Tailwind directives

---

## Phase 2: Foundational (Build Verification)

**Purpose**: Verify the build system processes CSS correctly with new configuration

**⚠️ CRITICAL**: Build MUST succeed before proceeding to visual verification phases

- [X] T005 Run npm run build to verify production build completes without CSS-related errors
- [X] T006 Start development server (npm run dev) and verify it starts without errors
- [X] T007 Open http://localhost:3000 in browser and verify page loads (even if styling not fully correct yet)

**Checkpoint**: Build pipeline functional - visual verification can now begin

---

## Phase 3: User Story 1 - Core Styling Renders Correctly (Priority: P1) 🎯 MVP

**Goal**: Verify base styles, typography, colors, and layout render correctly according to design system

**Independent Test**: Open landing page in browser and verify dark background (#0A0E27), Space Grotesk headings, Inter body text, Tailwind utility classes applied, and no CSS console errors

### Visual Verification for User Story 1

- [ ] T008 [P] [US1] Verify background color renders as dark theme (#0A0E27) in browser by inspecting body element
- [ ] T009 [P] [US1] Verify typography - inspect heading elements (h1, h2, h3) to confirm Space Grotesk font-family in browser DevTools Elements tab
- [ ] T010 [P] [US1] Verify typography - inspect paragraph/body text elements to confirm Inter font-family in browser DevTools Elements tab
- [ ] T011 [P] [US1] Verify typography sizing - confirm proper hierarchy with headings larger than body text and readable sizes (minimum 16px body)
- [ ] T012 [P] [US1] Verify color system - inspect elements with text-primary, text-secondary classes to confirm white (#FFFFFF) and light gray (#D1D5DB) colors applied
- [ ] T013 [P] [US1] Verify custom color variables - open browser console and check computed style for --bg-primary, --text-primary, --gradient-primary CSS variables have values
- [ ] T014 [P] [US1] Verify gradient backgrounds - inspect sections to confirm gradient effects visible (not plain colors)
- [ ] T015 [P] [US1] Verify glassmorphism effects - inspect Card components to confirm backdrop-filter: blur() applied or fallback solid background on unsupported browsers
- [ ] T016 [P] [US1] Verify Tailwind utility classes - inspect random elements (buttons, sections) to confirm px-4, py-8, text-center, etc. classes have computed CSS values
- [ ] T017 [P] [US1] Check browser console (F12 → Console tab) to verify zero CSS-related errors (no "failed to load stylesheet" or "unknown class" warnings)
- [ ] T018 [P] [US1] Check browser DevTools Network tab to verify CSS files load with status 200 (not 404)
- [ ] T019 [P] [US1] Check browser DevTools Network tab to verify font files (woff2 for Space Grotesk and Inter) load with status 200

**Checkpoint**: At this point, base styling should be fully visible and functional (MVP COMPLETE)

---

## Phase 4: User Story 2 - Component Visual Integrity (Priority: P2)

**Goal**: Verify interactive components display properly with hover/focus states and animations

**Independent Test**: Interact with buttons, cards, and forms to verify hover states, focus states, transitions, and gradient text render correctly

### Visual Verification for User Story 2

- [ ] T020 [P] [US2] Verify button default state - inspect any button (e.g., "Contact Me") to confirm gradient background (blue-to-purple) and glow shadow effect
- [ ] T021 [P] [US2] Test button hover state - hover over button and verify elevation animation (translates upward) and intensified glow effect
- [ ] T022 [P] [US2] Test button active state - click and hold button to verify it presses down (no lift elevation)
- [ ] T023 [P] [US2] Verify button touch target size - inspect button dimensions to confirm at least 44x44 pixels (mobile-friendly)
- [ ] T024 [P] [US2] Verify card glassmorphism - inspect any card component (Technology or Portfolio cards) to confirm frosted glass effect with backdrop-filter blur
- [ ] T025 [P] [US2] Verify card styling - inspect cards to confirm borders (1px subtle), rounded corners (border-radius), and shadow effects
- [ ] T026 [P] [US2] Test card hover state - hover over card and verify lift animation (translates upward) and intensified shadow
- [ ] T027 [P] [US2] Verify form input default state - inspect contact form inputs to confirm dark background and visible border
- [ ] T028 [P] [US2] Test form input focus state - click into input field and verify blue border color (rgba(59, 130, 246, 0.5)) and focus ring/glow appears
- [ ] T029 [P] [US2] Verify form input placeholder text - confirm placeholder is visible but muted color (not same as input text)
- [ ] T030 [P] [US2] Verify gradient text rendering - inspect main headline to confirm gradient color fill (blue-to-purple transition) using -webkit-background-clip
- [ ] T031 [P] [US2] Test scroll animations - slowly scroll down page and verify fade-in-up animations trigger as sections enter viewport
- [ ] T032 [P] [US2] Verify animation smoothness - observe animations and confirm they run at 60fps without stuttering (open Performance tab if jank suspected)
- [ ] T033 [US2] Test prefers-reduced-motion - enable reduced motion in OS accessibility settings, reload page, and verify animations are minimal/instant

**Checkpoint**: All component interactions and states should display correctly

---

## Phase 5: User Story 3 - Responsive Layout Functions (Priority: P3)

**Goal**: Verify layouts adapt correctly across mobile, tablet, and desktop viewport sizes

**Independent Test**: Resize browser to 320px, 768px, 1024px, 1920px and verify layout adaptations, font scaling, and no horizontal scroll

### Visual Verification for User Story 3

- [ ] T034 [P] [US3] Test mobile layout (375px) - use Chrome DevTools Device Toolbar (iPhone SE) to verify single-column layout with no side-by-side content
- [ ] T035 [P] [US3] Verify mobile padding - at 375px width, confirm content has breathing room (px-4 padding, not touching edges)
- [ ] T036 [P] [US3] Verify mobile font sizes - at 375px width, confirm text scales down but remains readable (minimum 16px body text)
- [ ] T037 [P] [US3] Verify mobile touch targets - at 375px width, inspect buttons to confirm at least 44x44px (easy to tap with thumb)
- [ ] T038 [P] [US3] Verify mobile no horizontal scroll - at 375px width, scroll page and confirm no horizontal scrollbar appears
- [ ] T039 [P] [US3] Test tablet layout (768px) - resize to iPad size and verify 2-column grid for cards/items where applicable
- [ ] T040 [P] [US3] Verify tablet padding - at 768px width, confirm medium padding (more than mobile, less than desktop)
- [ ] T041 [P] [US3] Verify tablet font sizes - at 768px width, confirm text is medium-sized (between mobile and desktop scales)
- [ ] T042 [P] [US3] Test desktop layout (1920px) - resize to full screen and verify content has max-width constraint (centered, not stretched edge-to-edge)
- [ ] T043 [P] [US3] Verify desktop grid - at 1920px width, confirm cards/items display in 3-4 column grid where applicable
- [ ] T044 [P] [US3] Verify desktop padding - at 1920px width, confirm generous spacing around content sections
- [ ] T045 [P] [US3] Verify desktop font sizes - at 1920px width, confirm text is largest size (optimized for reading distance)
- [ ] T046 [US3] Test resize transitions - slowly drag browser width from 320px to 1920px and verify layout reflows gracefully at breakpoints (640px, 768px, 1024px, 1280px) without jumps or breaks

**Checkpoint**: Responsive layouts should work correctly at all viewport sizes

---

## Phase 6: User Story 4 - Asset Loading and Optimization (Priority: P4)

**Goal**: Verify performance metrics meet targets (FCP < 1.5s, Lighthouse > 90, bundle < 100KB)

**Independent Test**: Run Lighthouse audit and network throttling tests to measure performance metrics and verify targets met

### Performance Verification for User Story 4

- [ ] T047 [US4] Verify CSS bundle size - run npm run build, then check .next/static/css/ directory and confirm total CSS < 100KB gzipped (use gzip -c *.css | wc -c on Linux/Mac or check file properties on Windows)
- [ ] T048 [US4] Run Lighthouse Performance audit - open Chrome DevTools Lighthouse tab, select "Performance" category, run audit, and verify score > 90 (green)
- [ ] T049 [US4] Verify First Contentful Paint (FCP) - in Lighthouse results, confirm FCP metric < 1.5 seconds (green)
- [ ] T050 [US4] Verify Time to Interactive (TTI) - in Lighthouse results, confirm TTI metric < 3 seconds
- [ ] T051 [US4] Verify Largest Contentful Paint (LCP) - in Lighthouse results, confirm LCP < 2.5 seconds (green)
- [ ] T052 [US4] Verify Cumulative Layout Shift (CLS) - in Lighthouse results, confirm CLS < 0.1 (green, no layout shift)
- [ ] T053 [US4] Verify First Input Delay (FID) - in Lighthouse results, confirm FID/TBT is minimal (< 100ms)
- [ ] T054 [US4] Test font loading strategy - watch page load closely and verify minimal Flash of Unstyled Text (FOUT) with font-display: swap working
- [ ] T055 [US4] Verify font fallback - if custom fonts fail to load, confirm system font stack displays text readably without breaking layout
- [ ] T056 [US4] Test network throttling (Fast 3G) - open Chrome DevTools Network tab, set throttling to "Fast 3G", reload page, and verify FCP still occurs within 1.5 seconds
- [ ] T057 [US4] Verify progressive loading on slow connection - with Fast 3G throttling, confirm page remains usable during load (content visible and readable)
- [ ] T058 [US4] Verify image lazy loading - open DevTools Network tab, scroll down page, and confirm below-the-fold images don't load until scrolled into view
- [ ] T059 [US4] Verify image loading attribute - inspect image elements to confirm loading="lazy" attribute present on below-fold images

**Checkpoint**: Performance metrics should meet or exceed all constitutional targets

---

## Phase 7: Polish & Cross-Browser Verification

**Purpose**: Ensure consistent rendering across browsers and validate constitutional compliance

### Cross-Browser Testing

- [ ] T060 [P] Test in Chrome (latest) - verify all Phase 3-6 checks pass in Chrome and glassmorphism effects render correctly
- [ ] T061 [P] Test in Firefox (latest) - verify all Phase 3-6 checks pass in Firefox, glassmorphism renders, and font rendering is smooth (not pixelated)
- [ ] T062 [P] Test in Safari (latest) - verify all Phase 3-6 checks pass in Safari, backdrop-filter works or fallback is acceptable, and gradient text renders correctly
- [ ] T063 [P] Test in Edge (latest) - verify all Phase 3-6 checks pass in Edge (Chromium) and rendering matches Chrome
- [ ] T064 [US5] Compare browser screenshots - take screenshots at same viewport size in all 4 browsers and verify visual variance < 5% (nearly identical appearance)
- [ ] T065 [P] [US5] Verify glassmorphism fallback - test in browser without backdrop-filter support (or use DevTools to disable) and confirm cards show acceptable solid background
- [ ] T066 [P] [US5] Test with JavaScript disabled - disable JavaScript in Chrome DevTools settings, reload page, and verify CSS still loads and styling renders (not JS-dependent)
- [ ] T067 [P] [US5] Test progressive enhancement - with JavaScript disabled, confirm core content (text, images, layout) remains visible and usable

### Accessibility Testing

- [ ] T068 [P] Run Lighthouse Accessibility audit - open Lighthouse, select "Accessibility" category, run audit, and verify score 95+ (green)
- [ ] T069 [P] Verify color contrast - in Lighthouse results or manual check, confirm all text meets WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text)
- [ ] T070 [P] Test keyboard navigation - use Tab key to navigate page and verify can reach all interactive elements (buttons, links, form inputs)
- [ ] T071 [P] Verify focus indicators - while keyboard navigating, confirm visible focus outline appears on all interactive elements (not hidden)
- [ ] T072 [P] Verify ARIA labels - inspect interactive elements in DevTools to confirm proper aria-label or aria-labelledby attributes where needed
- [ ] T073 [P] Verify screen reader accessibility - inspect elements to confirm semantic HTML (button, nav, main, section tags) and sr-only class hides content visually but keeps accessible

### Quality Gates (Constitutional Compliance)

- [ ] T074 [P] Code Quality Gate - run npm run lint to verify ESLint passes with zero warnings
- [ ] T075 [P] Testing Gate - verify all visual verification tasks (T008-T073) completed and passed
- [ ] T076 [P] UX/UI Gate - confirm accessibility audit passed (T068-T073) and responsive design verified (T034-T046)
- [ ] T077 [P] Performance Gate - confirm Lighthouse score > 90 (T048), Core Web Vitals met (T051-T053), and CSS bundle < 100KB (T047)

### Documentation & Validation

- [ ] T078 [P] Run quickstart.md validation - follow manual testing checklist in specs/002-fix-ui/quickstart.md and confirm all checkboxes can be marked complete
- [ ] T079 [P] Document any browser-specific issues - if any fallbacks or browser-specific behaviors were needed, add notes to quickstart.md troubleshooting section
- [ ] T080 Update CLAUDE.md - add "Fixed UI styling system (Tailwind CSS 4 configuration)" to Recent Changes section with feature number 002-fix-ui

**Checkpoint**: All quality gates passed, feature complete and ready for deployment

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup - Configuration Files)
  └─→ Phase 2 (Foundational - Build Verification)
        └─→ Phase 3 (US1 - Core Styling) 🎯 MVP CHECKPOINT
              └─→ Phase 4 (US2 - Component Styling)
                    └─→ Phase 5 (US3 - Responsive Layout)
                          └─→ Phase 6 (US4 - Performance Optimization)
                                └─→ Phase 7 (Cross-Browser & Polish)
```

**Critical Path**:
1. Must create config files (Phase 1) before build can work
2. Must verify build works (Phase 2) before visual testing
3. Must have base styles (Phase 3) before testing components (Phase 4)
4. Must have components working (Phase 4) before testing responsive (Phase 5)
5. Must have layouts working (Phase 5) before optimizing performance (Phase 6)
6. Must have performance working (Phase 6) before cross-browser testing (Phase 7)

### User Story Dependencies

- **US1 (Core Styling - P1)**: No dependencies after Phase 2 - BLOCKS all other user stories
- **US2 (Component Styling - P2)**: Depends on US1 completion - BLOCKS US3 and US4
- **US3 (Responsive Layout - P3)**: Depends on US2 completion - BLOCKS US4
- **US4 (Performance - P4)**: Depends on US3 completion - No other stories depend on this
- **Cross-Browser Polish**: Depends on all user stories being complete

**Rationale**: Each phase verifies the previous phase works before adding complexity. Cannot test component interactions without base styles rendering. Cannot test responsive layouts without components displaying. Cannot optimize performance without layouts working.

### Within Each Phase

**Phase 1 (Setup)**:
- T001, T002, T003 can run in parallel [P] (different files)
- T004 can run in parallel with T001-T003 (just deleting directory)

**Phase 2 (Foundational)**:
- T005, T006, T007 must run sequentially (build → dev server → browser check)

**Phase 3 (User Story 1)**:
- T008-T019 can all run in parallel [P] (independent visual checks in browser)

**Phase 4 (User Story 2)**:
- T020-T032 can all run in parallel [P] (independent component checks)
- T033 must run after (requires OS setting change)

**Phase 5 (User Story 3)**:
- T034-T045 can all run in parallel [P] (independent viewport checks)
- T046 must run after (requires full resize sequence)

**Phase 6 (User Story 4)**:
- T047-T059 mostly sequential (performance measurements)

**Phase 7 (Polish)**:
- T060-T067 can run in parallel [P] (independent browser tests)
- T068-T073 can run in parallel [P] (independent accessibility checks)
- T074-T077 can run in parallel [P] (independent quality gates)
- T078-T080 can run in parallel [P] (independent documentation tasks)

### Parallel Opportunities

**Phase 1**: All 4 tasks can run in parallel (create/update different files)
**Phase 3**: All 12 verification tasks can run in parallel (visual checks)
**Phase 4**: 13 out of 14 tasks can run in parallel (only T033 needs to wait)
**Phase 5**: 12 out of 13 tasks can run in parallel (only T046 needs to wait)
**Phase 7**: 18 out of 21 tasks can run in parallel (most verification is independent)

---

## Parallel Example: User Story 1 (Core Styling)

```bash
# All Phase 3 visual verification tasks can be checked simultaneously by opening browser:
# Open http://localhost:3000 in Chrome
# Then perform all these checks in any order:

Task T008: Inspect body element → verify background color #0A0E27
Task T009: Inspect h1/h2 elements → verify font-family: Space Grotesk
Task T010: Inspect p elements → verify font-family: Inter
Task T011: Inspect heading sizes → verify hierarchy
Task T012: Inspect text elements → verify text-primary (#FFF), text-secondary (#D1D5DB)
Task T013: Open Console → check getComputedStyle → verify CSS variables have values
Task T014: Inspect sections → verify gradient backgrounds visible
Task T015: Inspect card components → verify backdrop-filter or fallback
Task T016: Inspect random elements → verify Tailwind classes have computed styles
Task T017: Check Console tab → verify zero CSS errors
Task T018: Check Network tab → verify CSS files status 200
Task T019: Check Network tab → verify font files (woff2) status 200

# All 12 checks can be completed in a single browser session without waiting
```

---

## Parallel Example: Cross-Browser Testing (Phase 7)

```bash
# Launch all browsers in parallel and run same checks:
Browser Window 1: Chrome - Run T060 checks (all Phase 3-6 verification)
Browser Window 2: Firefox - Run T061 checks (all Phase 3-6 verification)
Browser Window 3: Safari - Run T062 checks (all Phase 3-6 verification)
Browser Window 4: Edge - Run T063 checks (all Phase 3-6 verification)

# Then compare results in T064 (screenshot comparison)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only) - RECOMMENDED

**Delivers**: Visually presentable landing page with base styling working

1. Complete Phase 1: Setup (T001-T004) - ~15 minutes
2. Complete Phase 2: Foundational (T005-T007) - ~5 minutes
3. Complete Phase 3: User Story 1 (T008-T019) - ~30 minutes
4. **🎯 MVP COMPLETE**: Page is now visually presentable and usable
5. STOP and VALIDATE: Show stakeholders the working styled page
6. Decision point: Ship MVP or continue to full feature?

**MVP Deliverable**:
- PostCSS configuration enables Tailwind processing
- Tailwind v4 config fixed for compatibility
- Build pipeline functional
- Base styles render (colors, typography, layout)
- Fonts load correctly
- Page is visually presentable

**Total MVP Time**: ~50 minutes

### Full Feature Delivery (All User Stories)

**Delivers**: Fully polished, responsive, performant, cross-browser tested landing page

1. Complete MVP (Phases 1-3) - ~50 minutes
2. Add Phase 4: User Story 2 (T020-T033) - ~45 minutes
3. Add Phase 5: User Story 3 (T034-T046) - ~30 minutes
4. Add Phase 6: User Story 4 (T047-T059) - ~45 minutes
5. Add Phase 7: Cross-Browser & Polish (T060-T080) - ~60 minutes

**Total Full Feature Time**: ~3.5 hours

### Incremental Delivery Approach

1. **Iteration 1 (MVP)**: Phases 1-3 → Styled page working
2. **Iteration 2**: Add Phase 4 → Interactive components polished
3. **Iteration 3**: Add Phase 5 → Mobile/responsive support
4. **Iteration 4**: Add Phase 6 → Performance optimized
5. **Iteration 5**: Add Phase 7 → Cross-browser validated

Each iteration delivers incremental value and can be demoed/shipped independently.

---

## Notes

- **[P] = Parallel**: Tasks marked [P] can run simultaneously (different checks, no dependencies)
- **[Story] Label**: Maps task to user story (US1, US2, US3, US4) for traceability
- **No Automated Tests**: This feature uses visual verification only (manual testing via browser)
- **Configuration Fix**: Focus is on fixing build configuration, not adding new features
- **Minimal Code Changes**: Only 2 config files created/modified (postcss.config.mjs, tailwind.config.ts)
- **Visual Verification**: Most tasks are browser-based checks (inspect element, hover, resize)
- **Independent Stories**: Each user story can be verified independently without the others
- **Checkpoints**: Stop at any checkpoint to validate story before proceeding
- **Browser DevTools**: Primary testing tool (Elements, Console, Network, Lighthouse tabs)
- **Quickstart.md**: Detailed step-by-step instructions for each verification task
- **Constitutional Compliance**: Quality gates (T074-T077) ensure all principles met

---

## Success Criteria Validation

### From spec.md Success Criteria

- ✅ **SC-001**: 100% CSS classes apply → Validated in T016 (Phase 3)
- ✅ **SC-002**: Zero visual regression → Validated in T020-T046 (Phases 4-5)
- ✅ **SC-003**: Interactive feedback < 16ms → Validated in T021, T028 (Phase 4)
- ✅ **SC-004**: No CSS errors → Validated in T017 (Phase 3)
- ✅ **SC-005**: <5% cross-browser variance → Validated in T064 (Phase 7)
- ✅ **SC-006**: Zero unused CSS → Validated in T048 Lighthouse audit (Phase 6)
- ✅ **SC-007**: 95%+ UI task completion → Validated across all phases

### From Constitution Performance Criteria

- ✅ **FCP < 1.5s** → T049 (Phase 6)
- ✅ **TTI < 3s** → T050 (Phase 6)
- ✅ **LCP < 2.5s** → T051 (Phase 6)
- ✅ **FID < 100ms** → T053 (Phase 6)
- ✅ **CLS < 0.1** → T052 (Phase 6)
- ✅ **Bundle < 100KB** → T047 (Phase 6)
- ✅ **Lighthouse > 90** → T048 (Phase 6)
- ✅ **WCAG 2.1 AA** → T068-T073 (Phase 7)

---

## Task Count Summary

- **Phase 1 (Setup)**: 4 tasks
- **Phase 2 (Foundational)**: 3 tasks
- **Phase 3 (US1 - Core Styling)**: 12 tasks
- **Phase 4 (US2 - Component Styling)**: 14 tasks
- **Phase 5 (US3 - Responsive Layout)**: 13 tasks
- **Phase 6 (US4 - Performance)**: 13 tasks
- **Phase 7 (Cross-Browser & Polish)**: 21 tasks

**Total Tasks**: 80 tasks

**MVP Tasks**: 19 tasks (Phases 1-3 only)

**Parallelizable Tasks**: 66 tasks marked [P] (82% of total)

**Sequential Tasks**: 14 tasks (require previous steps complete)

---

**Generated**: 2026-01-27
**Feature Branch**: 002-fix-ui
**Status**: Ready for implementation
