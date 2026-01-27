# Tasks: Modern Dark UI Redesign

**Input**: Design documents from `/specs/003-redesign-ui/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in feature specification. Focus is on visual redesign and accessibility validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/app/`, `src/components/`, `src/lib/` at repository root
- All paths are absolute from project root: `B:\Projects\ai-landing\`

---

## Phase 1: Setup & Design System Foundation

**Purpose**: Establish new design token system and update global styling infrastructure

- [X] T001 Update Tailwind config with muted earth-tone color palette in tailwind.config.ts
- [X] T002 [P] Update CSS custom properties in src/app/globals.css with new color tokens
- [X] T003 [P] Add new gradient definitions for ambient backgrounds in src/app/globals.css
- [X] T004 [P] Update shadow system with reduced glow effects in tailwind.config.ts
- [X] T005 [P] Update border system with soft border styles in src/app/globals.css
- [X] T006 Update animation parameters for reduced intensity in src/lib/animations.ts

---

## Phase 2: Foundational Components (Blocking Prerequisites)

**Purpose**: Core UI components that MUST be updated before ANY section can be redesigned

**⚠️ CRITICAL**: No user story work can begin until these base components are updated

- [X] T007 [P] Update Button component with muted glow effects in src/components/ui/Button.tsx
- [X] T008 [P] Update Card component with soft borders and minimal glassmorphism in src/components/ui/Card.tsx
- [X] T009 [P] Update GradientText component with earth-tone gradients in src/components/ui/GradientText.tsx
- [X] T010 [P] Update AnimatedSection component with reduced animation intensity in src/components/ui/AnimatedSection.tsx
- [X] T011 [P] Update GlowEffect component with subtle glow parameters in src/components/ui/GlowEffect.tsx

**Checkpoint**: ✅ Base components updated with new design system - section redesign can now begin in parallel

---

## Phase 3: User Story 1 - First Impression & Hero Experience (Priority: P1) 🎯 MVP

**Goal**: Deliver a modern, professional hero section with large ambient gradients, muted earth-tone accents, refined animations, and clear CTAs that immediately establish trust and showcase technical expertise.

**Independent Test**: Load the homepage and verify the hero section displays with proper dark theme (deep charcoal #0A0D16), large ambient sage green gradient from top-left, muted earth-tone headline gradient, two distinct CTA buttons with subtle glows, reduced animation intensity (0.4s duration, 10px transforms), and all elements properly scaled across mobile (320px), tablet (768px), and desktop (1024px+) viewports.

### Implementation for User Story 1

- [X] T012 [US1] Update Hero section background with large ambient gradient in src/components/sections/Hero.tsx
- [X] T013 [US1] Update Hero headline styling with muted gradient text in src/components/sections/Hero.tsx
- [X] T014 [US1] Update Hero subtitle with refined typography and secondary text color in src/components/sections/Hero.tsx
- [X] T015 [US1] Update Hero CTA buttons with reduced glow intensity in src/components/sections/Hero.tsx
- [X] T016 [US1] Update scroll indicator animation with subtle parameters in src/components/sections/Hero.tsx
- [X] T017 [US1] Verify responsive scaling on mobile (320-767px) viewports in src/components/sections/Hero.tsx
- [X] T018 [US1] Verify responsive scaling on tablet (768-1023px) viewports in src/components/sections/Hero.tsx
- [X] T019 [US1] Test WCAG AA contrast ratios for all text elements in Hero section
- [X] T020 [US1] Verify reduced-motion support for animations in Hero section

**Checkpoint**: ✅ Hero section complete with new design aesthetic - independently testable by loading homepage

---

## Phase 4: User Story 2 - Technology & Expertise Showcase (Priority: P2)

**Goal**: Present technical capabilities through modern technology cards with muted styling, soft borders, reduced hover effects, and clear categorization that maintains professional aesthetic.

**Independent Test**: Scroll to technology section and verify technology cards display with soft 1px borders (rgba 0.08 opacity), muted sage/earth accent colors, reduced hover lift (2px vs 4px), smooth 0.4s transitions, proficiency badges with desaturated colors, and category filters with minimalist styling.

### Implementation for User Story 2

- [X] T021 [P] [US2] Update TechnologyCard component with soft borders and muted colors in src/components/ui/TechnologyCard.tsx
- [X] T022 [US2] Update TechnologyCard hover effects with reduced lift and subtle glow in src/components/ui/TechnologyCard.tsx
- [X] T023 [US2] Update proficiency badge styling with muted semantic colors in src/components/ui/TechnologyCard.tsx
- [X] T024 [US2] Update TechShowcase section layout and spacing in src/components/sections/TechShowcase.tsx
- [X] T025 [US2] Update category filter buttons with minimalist styling in src/components/sections/TechShowcase.tsx
- [X] T026 [US2] Update section headline with muted gradient in src/components/sections/TechShowcase.tsx
- [X] T027 [US2] Verify card grid responsiveness across all breakpoints
- [X] T028 [US2] Test smooth hover transitions at 60fps
- [X] T029 [US2] Verify accessibility of category filters (keyboard navigation, ARIA labels)

**Checkpoint**: ✅ Technology showcase complete with refined card design - independently testable by scrolling to section

---

## Phase 5: User Story 3 - Portfolio Presentation (Priority: P2)

**Goal**: Showcase portfolio projects through enhanced visual layout with refined card design, proper image treatment for dark backgrounds, consistent styling, and smooth modal transitions.

**Independent Test**: Navigate to portfolio section and verify project cards display with soft borders, refined image overlays with reduced opacity (0.3 vs 0.5), muted featured badges, consistent dark theme styling with proper text contrast, and modal opens with smooth 0.4s transition maintaining design system consistency.

### Implementation for User Story 3

- [X] T030 [P] [US3] Update PortfolioCard component with soft borders and refined styling in src/components/ui/PortfolioCard.tsx
- [X] T031 [US3] Update portfolio image overlay with reduced opacity in src/components/ui/PortfolioCard.tsx
- [X] T032 [US3] Update featured badge styling with muted accent colors in src/components/ui/PortfolioCard.tsx
- [X] T033 [US3] Update technology tag styling with soft borders in src/components/ui/PortfolioCard.tsx
- [X] T034 [US3] Update PortfolioModal backdrop and container styling in src/components/ui/PortfolioModal.tsx
- [X] T035 [US3] Update PortfolioModal entrance animation with reduced intensity in src/components/ui/PortfolioModal.tsx
- [X] T036 [US3] Update Portfolio section layout and spacing in src/components/sections/Portfolio.tsx
- [X] T037 [US3] Update category filter buttons consistency with TechShowcase in src/components/sections/Portfolio.tsx
- [X] T038 [US3] Verify portfolio grid responsiveness and image aspect ratios
- [X] T039 [US3] Test modal accessibility (focus trap, ESC key, ARIA attributes)
- [X] T040 [US3] Optimize portfolio images for dark backgrounds in public/ directory

**Checkpoint**: ✅ Portfolio section complete with refined visual presentation - independently testable by navigating to section

---

## Phase 6: User Story 4 - Contact & Call-to-Action (Priority: P3)

**Goal**: Provide functional, inviting contact section with redesigned form elements, soft-bordered inputs, muted button styling, and consistent visual feedback that matches the refined design system.

**Independent Test**: Navigate to contact section and verify input fields have soft borders (1px rgba 0.08), focus states with sage green accent (rgba 0.4), buttons match hero CTA styling with subtle glows, validation states use muted semantic colors, and success/error feedback maintains design consistency.

### Implementation for User Story 4

- [X] T041 [P] [US4] Update input field styling with soft borders in src/app/globals.css (.input class)
- [X] T042 [P] [US4] Update textarea styling consistency with inputs in src/app/globals.css
- [X] T043 [US4] Update focus states with sage green accent in src/app/globals.css
- [X] T044 [US4] Update validation error styling with muted red in src/app/globals.css
- [X] T045 [US4] Update Contact section layout and form styling in src/components/sections/Contact.tsx
- [X] T046 [US4] Update submit button styling consistency with hero CTAs in src/components/sections/Contact.tsx
- [X] T047 [US4] Update loading state styling with subtle animation in src/components/sections/Contact.tsx
- [X] T048 [US4] Update success state with muted confetti and messaging in src/components/sections/Contact.tsx
- [X] T049 [US4] Verify form accessibility (label associations, error announcements, keyboard flow)
- [X] T050 [US4] Test focus visibility on dark backgrounds for all form elements

**Checkpoint**: ✅ Contact section complete with consistent form styling - independently testable by navigating to section

---

## Phase 7: User Story 5 - Responsive Experience (Priority: P1) 🎯 MVP

**Goal**: Ensure all redesigned sections adapt gracefully across mobile (320px+), tablet (768px+), and desktop (1024px+) viewports with appropriate spacing, typography scaling, simplified effects on small screens, and touch-friendly interactions.

**Independent Test**: View site on mobile (320px, 375px, 414px), tablet (768px, 1024px), and desktop (1280px, 1920px, 2560px) viewports and verify all sections reflow properly, typography scales appropriately, glassmorphism/blur effects are reduced on mobile, touch targets meet 44x44px minimum, and no horizontal scrolling occurs at any viewport.

### Implementation for User Story 5

- [ ] T051 [US5] Audit and update mobile breakpoint styles (320-767px) in tailwind.config.ts
- [ ] T052 [US5] Audit and update tablet breakpoint styles (768-1023px) in tailwind.config.ts
- [ ] T053 [US5] Audit and update desktop breakpoint styles (1024px+) in tailwind.config.ts
- [ ] T054 [US5] Verify Hero section responsive behavior and gradient scaling in src/components/sections/Hero.tsx
- [ ] T055 [US5] Verify TechShowcase grid layout at all breakpoints (1/2/3 columns) in src/components/sections/TechShowcase.tsx
- [ ] T056 [US5] Verify Portfolio grid layout at all breakpoints in src/components/sections/Portfolio.tsx
- [ ] T057 [US5] Verify Contact form layout on mobile devices in src/components/sections/Contact.tsx
- [ ] T058 [US5] Test touch target sizes for all interactive elements (minimum 44x44px)
- [ ] T059 [US5] Verify reduced glassmorphism on mobile for performance (4px blur max)
- [ ] T060 [US5] Test device rotation behavior (portrait/landscape transitions)
- [ ] T061 [US5] Test ultra-wide monitor layout (1920px, 2560px, 3840px)
- [ ] T062 [US5] Verify no horizontal scrolling at any viewport width

**Checkpoint**: All sections responsive and accessible across all device types - full redesign testable on any device

---

## Phase 8: Polish & Constitutional Compliance

**Purpose**: Quality gates, accessibility validation, performance optimization, and cross-cutting improvements per Constitution

### Quality Gates (Mandatory per Constitution)

- [ ] T063 [P] Code Quality: Run ESLint and Prettier, fix all warnings, verify TypeScript strict mode compliance
- [ ] T064 [P] Testing Gate: Run existing test suite (npm test), confirm all tests pass
- [ ] T065 [P] Accessibility Audit: Run axe-core automated testing, verify WCAG 2.1 Level AA compliance
- [ ] T066 [P] Manual Accessibility: Test keyboard navigation, screen reader compatibility, focus indicators
- [ ] T067 [P] Contrast Validation: Verify all text color combinations meet 4.5:1 minimum (normal text) and 3:1 (large text)
- [ ] T068 [P] Performance Gate: Run Lighthouse audit, verify score > 90 for performance
- [ ] T069 [P] Core Web Vitals: Verify LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] T070 [P] Bundle Size: Check production build size, verify < 200KB gzipped for initial bundle

### Cross-Cutting Improvements

- [ ] T071 [P] Animation Performance: Verify all animations run at 60fps on mid-range devices
- [ ] T072 [P] Reduced Motion: Test prefers-reduced-motion support across all animations
- [ ] T073 [P] Browser Compatibility: Test on Chrome, Firefox, Safari, Edge (last 2 versions)
- [ ] T074 [P] Browser Fallbacks: Verify backdrop-filter fallback styling for unsupported browsers
- [ ] T075 [P] Image Optimization: Verify all images use modern formats (WebP/AVIF) with appropriate sizes
- [ ] T076 [P] Color-blind Testing: Simulate deuteranopia/protanopia, verify color system distinguishability
- [ ] T077 Add code comments for complex gradient/animation implementations
- [ ] T078 [P] Update documentation in README.md with new design system details
- [ ] T079 [P] Create design system reference in docs/ directory with color swatches and component examples
- [ ] T080 Final visual regression: Compare before/after screenshots for all sections

### Edge Case Handling

- [ ] T081 Test graceful degradation when CSS gradients unsupported
- [ ] T082 Test graceful degradation when backdrop-filter unsupported
- [ ] T083 Test graceful degradation when JavaScript disabled (form still submittable)
- [ ] T084 Test overflow handling for very long text content in cards
- [ ] T085 Test bright sunlight readability on mobile (contrast sufficient)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all user stories
- **User Stories (Phases 3-7)**: All depend on Foundational phase completion
  - US1 (Hero): Can start after Phase 2 ✓
  - US2 (Tech Showcase): Can start after Phase 2 ✓ Independent of US1
  - US3 (Portfolio): Can start after Phase 2 ✓ Independent of US1, US2
  - US4 (Contact): Can start after Phase 2 ✓ Independent of US1, US2, US3
  - US5 (Responsive): Should start after other stories complete to validate responsiveness
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Hero)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2 - Tech Showcase)**: Can start after Foundational - Independent of US1
- **User Story 3 (P2 - Portfolio)**: Can start after Foundational - Independent of US1, US2
- **User Story 4 (P3 - Contact)**: Can start after Foundational - Independent of US1, US2, US3
- **User Story 5 (P1 - Responsive)**: Should validate after US1-US4 complete, but can be worked on in parallel

### Within Each User Story

- Base component updates (Phase 2) before section implementation
- Section structure before styling details
- Desktop styling before responsive refinements
- Visual implementation before accessibility validation
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 1 (Setup) - All 6 tasks can run in parallel:**
- T002, T003, T004, T005 can all run in parallel (different concerns in different files/sections)

**Phase 2 (Foundational) - All 5 tasks can run in parallel:**
- T007, T008, T009, T010, T011 are all independent component files

**After Phase 2 completes, all user stories can start in parallel:**
- Developer A: User Story 1 (Hero) - T012-T020
- Developer B: User Story 2 (Tech Showcase) - T021-T029
- Developer C: User Story 3 (Portfolio) - T030-T040
- Developer D: User Story 4 (Contact) - T041-T050
- Developer E: User Story 5 (Responsive) - T051-T062 (best after others complete)

**Phase 8 (Polish) - Most quality gate tasks can run in parallel:**
- T063-T070 can run in parallel (different validation tools)
- T071-T080 can run in parallel (different testing concerns)
- T081-T085 can run in parallel (different edge cases)

---

## Parallel Example: User Story 2 (Tech Showcase)

```bash
# Launch all component updates for Tech Showcase in parallel:
Task: "Update TechnologyCard component with soft borders in src/components/ui/TechnologyCard.tsx"  # T021
Task: "Update proficiency badge styling in src/components/ui/TechnologyCard.tsx"  # T023 (same file, but different concern - can work sequentially or carefully in parallel)

# Launch section updates (after component done):
Task: "Update TechShowcase section layout in src/components/sections/TechShowcase.tsx"  # T024
Task: "Update category filter buttons in src/components/sections/TechShowcase.tsx"  # T025 (same file as T024, sequential)
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 5 Only)

1. Complete Phase 1: Setup & Design System Foundation (T001-T006)
2. Complete Phase 2: Foundational Components (T007-T011) - CRITICAL
3. Complete Phase 3: User Story 1 - Hero Experience (T012-T020)
4. Complete Phase 7: User Story 5 - Responsive (T051-T062) - Validate US1 responsiveness
5. **STOP and VALIDATE**: Test hero section independently on all devices
6. Run basic quality gates (T063-T070)
7. Deploy/demo if ready

**Rationale**: Hero section is first impression (P1) and highest impact. Responsive validation (P1) ensures it works on all devices. This delivers immediate visible value.

### Incremental Delivery (Recommended)

1. **Phase 1 + 2**: Setup + Foundational → Base design system ready
2. **Phase 3**: User Story 1 (Hero) → Test → Deploy (MVP! 🎯)
3. **Phase 4**: User Story 2 (Tech Showcase) → Test → Deploy
4. **Phase 5**: User Story 3 (Portfolio) → Test → Deploy
5. **Phase 6**: User Story 4 (Contact) → Test → Deploy
6. **Phase 7**: User Story 5 (Responsive) → Validate all sections → Deploy
7. **Phase 8**: Polish & Quality Gates → Final production-ready release

Each phase adds value incrementally without breaking previous work.

### Parallel Team Strategy (Maximum Speed)

With multiple developers:

1. **Week 1**: Team completes Phase 1 + 2 together (foundation)
2. **Week 2**: Once Foundational is done, split team:
   - Developer A: User Story 1 (Hero) → T012-T020
   - Developer B: User Story 2 (Tech Showcase) → T021-T029
   - Developer C: User Story 3 (Portfolio) → T030-T040
   - Developer D: User Story 4 (Contact) → T041-T050
3. **Week 3**:
   - Developer E: User Story 5 (Responsive) → T051-T062 (validates all previous work)
   - Other developers: Begin Phase 8 quality gates in parallel
4. **Week 4**: Final polish, documentation, deployment

---

## Task Summary

**Total Tasks**: 85 tasks
- **Phase 1 (Setup)**: 6 tasks (5 parallelizable)
- **Phase 2 (Foundational)**: 5 tasks (all parallelizable)
- **Phase 3 (US1 - Hero)**: 9 tasks
- **Phase 4 (US2 - Tech Showcase)**: 9 tasks (2 parallelizable)
- **Phase 5 (US3 - Portfolio)**: 11 tasks (3 parallelizable)
- **Phase 6 (US4 - Contact)**: 10 tasks (4 parallelizable)
- **Phase 7 (US5 - Responsive)**: 12 tasks
- **Phase 8 (Polish)**: 23 tasks (17 parallelizable)

**Parallel Opportunities**: 32 tasks marked [P] can run in parallel when staffing allows

**Independent Test Criteria**:
- US1: Load homepage, verify hero section with new design
- US2: Scroll to tech section, verify refined cards
- US3: Navigate to portfolio, verify refined cards and modal
- US4: Navigate to contact, verify form styling
- US5: View on multiple devices, verify responsive behavior

**Suggested MVP Scope**:
- Phase 1: Setup (6 tasks)
- Phase 2: Foundational (5 tasks)
- Phase 3: User Story 1 - Hero (9 tasks)
- Phase 7: User Story 5 - Responsive validation for Hero (subset of T051-T062)
- Phase 8: Basic quality gates (T063-T070)

**Total MVP Tasks**: ~30 tasks for initial hero redesign with responsive validation

---

## Notes

- All tasks follow strict checklist format: `- [ ] [ID] [P?] [Story] Description with file path`
- [P] tasks = different files or independent concerns, can run in parallel
- [Story] label maps task to specific user story for traceability (US1-US5)
- Each user story is independently completable and testable
- Design system (Phase 1) is prerequisite for everything
- Base components (Phase 2) block all section work but are parallelizable within phase
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Tests are not included since feature spec focuses on visual redesign and manual validation
- Accessibility and performance validation built into quality gates (Phase 8)
