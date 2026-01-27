# Manual Testing Guide: AI Engineer Portfolio Landing Page

**Feature**: 001-ai-engineer-landing
**Created**: 2026-01-27
**Purpose**: Step-by-step guide for manual testing tasks T130, T131, T132

---

## Table of Contents

1. [T130: Keyboard Navigation Testing](#t130-keyboard-navigation-testing)
2. [T131: Screen Reader Testing](#t131-screen-reader-testing)
3. [T132: Responsive Design Testing](#t132-responsive-design-testing)
4. [Test Report Template](#test-report-template)

---

## T130: Keyboard Navigation Testing

**Goal**: Verify all interactive elements are accessible via keyboard only, with logical tab order and visible focus indicators.

### Setup

1. **Disable Mouse**: Physically unplug mouse or commit to not using it
2. **Open Site**: Navigate to http://localhost:3000 (or production URL)
3. **Refresh Page**: Ensure clean starting state

### Test Procedure

#### 1. Tab Order Verification

**Expected Flow**: Hero → Tech Showcase → Portfolio → Contact

**Steps**:
1. Press `Tab` key repeatedly
2. Observe focus indicator moving through elements
3. Record tab order in checklist below

**Checklist**:
- [ ] **Hero Section**:
  - [ ] CTA button receives focus
  - [ ] Focus indicator clearly visible (blue ring)
  - [ ] Scroll indicator arrow receives focus (if clickable)

- [ ] **Tech Showcase Section**:
  - [ ] Category filter buttons receive focus in order
  - [ ] Technology cards receive focus (if interactive)
  - [ ] Tab order left-to-right, top-to-bottom

- [ ] **Portfolio Section**:
  - [ ] Category filter buttons receive focus (if present)
  - [ ] Portfolio cards receive focus
  - [ ] Tab order follows visual layout

- [ ] **Contact Section**:
  - [ ] Name input receives focus
  - [ ] Email input receives focus
  - [ ] Inquiry type dropdown receives focus
  - [ ] Message textarea receives focus
  - [ ] Submit button receives focus

**Issues Found**:
```
(Document any unexpected tab order or missing focus indicators)
```

#### 2. Enter/Space Activation

**Goal**: Verify all buttons and links activate with Enter or Space key

**Steps**:
1. Tab to Hero CTA button
2. Press `Enter` key
3. Verify page scrolls to contact section

**Checklist**:
- [ ] Hero CTA activates with `Enter`
- [ ] Hero CTA activates with `Space`
- [ ] Tech category filters activate with `Enter`/`Space`
- [ ] Portfolio cards open modal with `Enter`/`Space`
- [ ] Contact form submit button activates with `Enter`

**Issues Found**:
```
(Document any buttons that don't respond to keyboard)
```

#### 3. Escape Key Functionality

**Goal**: Verify Escape closes modals and cancels actions

**Steps**:
1. Open portfolio modal (click portfolio card)
2. Press `Escape` key
3. Verify modal closes

**Checklist**:
- [ ] Portfolio modal closes with `Escape`
- [ ] Focus returns to element that opened modal
- [ ] No other elements affected by Escape

**Issues Found**:
```
(Document any modal close issues)
```

#### 4. Focus Indicator Visibility

**Goal**: Ensure focus indicators are always visible and meet contrast requirements

**Checklist**:
- [ ] Focus indicators visible on all interactive elements
- [ ] Focus ring color contrasts with background (4.5:1 minimum)
- [ ] Focus indicator not hidden by other elements
- [ ] Custom focus styles maintained (not browser defaults only)

**Visual Check**:
- [ ] Hero section focus indicators visible on dark background
- [ ] Tech showcase focus indicators visible
- [ ] Portfolio section focus indicators visible
- [ ] Contact form focus indicators visible on dark inputs

**Issues Found**:
```
(Document any elements with poor focus indicator visibility)
```

#### 5. Skip Navigation Link

**Goal**: Verify skip-to-content link for keyboard users

**Steps**:
1. Refresh page
2. Press `Tab` once
3. Check if skip link appears

**Checklist**:
- [ ] Skip link appears on first Tab press (or document if not implemented)
- [ ] Skip link is visible and readable
- [ ] Activating skip link jumps to main content
- [ ] Focus moves to skipped location

**Issues Found**:
```
(Note: If skip link not implemented, this is an enhancement opportunity)
```

### Test Report for T130

**Test Date**: ___________
**Tester**: ___________
**Environment**: [ ] Local Dev  [ ] Staging  [ ] Production

**Summary**:
- Total interactive elements tested: _____
- Issues found: _____
- Critical issues: _____

**Overall Result**: [ ] PASS  [ ] FAIL  [ ] PARTIAL

**Recommendations**:
```
(List any improvements or issues that need fixing)
```

---

## T131: Screen Reader Testing

**Goal**: Verify all content is accessible and properly announced by screen readers.

### Setup

#### Windows (NVDA)

1. **Download NVDA**: [nvaccess.org/download](https://www.nvaccess.org/download/)
2. **Install NVDA**: Run installer (free and open source)
3. **Launch NVDA**: Start → NV Access → NVDA
4. **Enable Speech Viewer** (helpful for testing):
   - NVDA Menu → Tools → Speech Viewer
   - Text window shows what NVDA announces

#### macOS (VoiceOver)

1. **Enable VoiceOver**: `Cmd + F5` or System Preferences → Accessibility → VoiceOver → Enable
2. **VoiceOver Training**: Press `VO + Cmd + F8` for tutorial (recommended first time)
3. **Quick Commands**:
   - `VO` = `Control + Option` (called VoiceOver modifier)
   - `VO + A`: Read all
   - `VO + Right Arrow`: Next item
   - `VO + Space`: Activate

### NVDA Keyboard Commands

- `Down Arrow`: Next line
- `Up Arrow`: Previous line
- `Ctrl`: Stop reading
- `Insert + Down Arrow`: Read all from cursor
- `Tab`: Next interactive element
- `Insert + F7`: Elements list (headings, links, landmarks)

### Test Procedure

#### 1. Image Alt Text

**Goal**: Verify all images have descriptive alt text

**Steps**:
1. Navigate to each section
2. Let screen reader announce images
3. Verify alt text is descriptive

**Checklist**:
- [ ] **Hero Section**:
  - [ ] Hero background image has alt text (or marked as decorative)
  - [ ] Alt text describes purpose or context

- [ ] **Tech Showcase**:
  - [ ] Technology logo images have descriptive alt text
  - [ ] Alt text includes technology name (e.g., "React logo", "Python logo")

- [ ] **Portfolio Section**:
  - [ ] Portfolio screenshots have descriptive alt text
  - [ ] Alt text describes project (e.g., "AI chatbot interface screenshot")

**Issues Found**:
```
(Document any missing or poor alt text)
```

#### 2. Form Labels

**Goal**: Ensure form fields have proper labels that announce correctly

**Steps**:
1. Navigate to contact form
2. Tab through each form field
3. Listen to screen reader announcements

**Checklist**:
- [ ] Name input announces "Name" label
- [ ] Name input announces "*" or "required" status
- [ ] Email input announces "Email" label
- [ ] Email input announces "required" status
- [ ] Inquiry type announces "Inquiry Type" label
- [ ] Inquiry type announces dropdown role
- [ ] Message textarea announces "Message" label
- [ ] Submit button announces button role and text

**Issues Found**:
```
(Document any labels that don't announce properly)
```

#### 3. Error Messages

**Goal**: Verify validation errors are announced to screen readers

**Steps**:
1. Fill out form with invalid data:
   - Name: "A" (too short)
   - Email: "invalid" (not an email)
   - Message: "Short" (too short)
2. Click Submit or Tab out of fields (blur validation)
3. Listen for error announcements

**Checklist**:
- [ ] Error messages announce immediately when displayed
- [ ] Error text is clear and actionable
- [ ] Screen reader reads "Error:" or similar alert
- [ ] Field announced as "invalid" (aria-invalid)
- [ ] Error associated with field (aria-describedby)

**NVDA**: Should hear "Alert: [error message]" or similar
**VoiceOver**: Should hear "[field name], invalid data, [error message]"

**Issues Found**:
```
(Document any errors that don't announce)
```

#### 4. Success Messages

**Goal**: Verify success message announces after form submission

**Steps**:
1. Fill out form with valid data
2. Submit form
3. Listen for success announcement

**Checklist**:
- [ ] Success message announces immediately
- [ ] Confetti animation doesn't interfere with announcement
- [ ] Success heading announces clearly
- [ ] Confirmation text announces
- [ ] "Send Another Message" button announced as clickable

**Expected Announcement**: "Message Sent Successfully! Thank you for reaching out..."

**Issues Found**:
```
(Document any success state issues)
```

#### 5. ARIA Landmarks

**Goal**: Verify semantic landmarks are present and announced

**Steps**:
1. Use landmarks navigation:
   - **NVDA**: `Insert + F7` → Landmarks tab
   - **VoiceOver**: `VO + U` → Landmarks rotor
2. Check available landmarks

**Checklist**:
- [ ] `<header>` or `role="banner"` for site header
- [ ] `<nav>` or `role="navigation"` for navigation (if present)
- [ ] `<main>` or `role="main"` for main content
- [ ] `<section>` or `role="region"` for major sections
- [ ] `<footer>` or `role="contentinfo"` for site footer

**Expected Landmarks**:
- Banner
- Main
- Complementary or Region (for sections)
- Contentinfo (footer)

**Issues Found**:
```
(Document any missing landmarks)
```

#### 6. Heading Structure

**Goal**: Verify logical heading hierarchy

**Steps**:
1. Navigate by headings:
   - **NVDA**: `H` key
   - **VoiceOver**: `VO + Cmd + H`
2. Verify heading levels

**Checklist**:
- [ ] Page has one `<h1>` (site title or main heading)
- [ ] Headings follow logical order (h1 → h2 → h3, no skips)
- [ ] Each section has descriptive heading
- [ ] Heading text is clear and descriptive

**Expected Hierarchy**:
```
H1: AI Engineer & Innovation Specialist (Hero)
  H2: Technology Showcase
  H2: Portfolio
  H2: Contact
```

**Issues Found**:
```
(Document any heading hierarchy issues)
```

### Test Report for T131

**Test Date**: ___________
**Tester**: ___________
**Screen Reader**: [ ] NVDA (Windows)  [ ] VoiceOver (macOS)
**Environment**: [ ] Local Dev  [ ] Staging  [ ] Production

**Summary**:
- Total elements tested: _____
- Issues found: _____
- Critical issues: _____

**Overall Result**: [ ] PASS  [ ] FAIL  [ ] PARTIAL

**Critical Issues** (prevent usage):
```
(List any issues that make the site unusable with screen reader)
```

**Minor Issues** (improve experience):
```
(List any improvements that would enhance accessibility)
```

---

## T132: Responsive Design Testing

**Goal**: Verify layout adapts correctly across all breakpoints and devices.

### Testing Breakpoints

| Breakpoint | Width | Device | Layout Expected |
|------------|-------|--------|-----------------|
| XS Mobile | 320px | iPhone SE | 1 column, stacked |
| Mobile | 640px | iPhone 12 | 1 column, stacked |
| Tablet | 768px | iPad | 2 columns for grids |
| Desktop | 1024px | Laptop | 3-4 columns for grids |
| Large Desktop | 1280px+ | Desktop | Max width container |

### Setup Methods

#### Method 1: Browser DevTools (Recommended)

**Chrome/Edge**:
1. Open DevTools (`F12` or `Ctrl+Shift+I`)
2. Click "Toggle device toolbar" icon (or `Ctrl+Shift+M`)
3. Select device preset or enter custom dimensions
4. Test in responsive mode

**Firefox**:
1. Open DevTools (`F12`)
2. Click "Responsive Design Mode" icon (or `Ctrl+Shift+M`)
3. Select device or enter custom dimensions

#### Method 2: Real Devices (Best Practice)

**Recommended Testing Devices**:
- iPhone (iOS Safari)
- Android phone (Chrome)
- iPad (iOS Safari)
- Android tablet (Chrome)
- Desktop/laptop (Chrome, Firefox, Safari, Edge)

### Test Procedure

#### 1. XS Mobile (320px)

**Device**: iPhone SE, older Android phones

**Steps**:
1. Set viewport to 320px × 568px
2. Navigate through all sections
3. Check for issues

**Checklist**:
- [ ] **No horizontal scroll**: Scroll horizontally, should be none
- [ ] **Readable text**: All text at least 16px, no tiny text
- [ ] **Touch targets**: All buttons at least 44x44px
- [ ] **Images scale**: No overflowing images
- [ ] **Layout stacks**: All content in single column

**Section-Specific**:
- [ ] Hero:
  - [ ] Headline readable (wraps correctly)
  - [ ] CTA button full width or centered
  - [ ] Background image crops appropriately

- [ ] Tech Showcase:
  - [ ] Cards stack vertically (1 column)
  - [ ] Category filters wrap or scroll

- [ ] Portfolio:
  - [ ] Project cards stack vertically (1 column)
  - [ ] Images don't overflow

- [ ] Contact:
  - [ ] Form fields full width
  - [ ] Submit button full width

**Issues Found**:
```
(Document any 320px layout issues)
```

#### 2. Mobile (640px)

**Device**: iPhone 12, most modern smartphones

**Steps**:
1. Set viewport to 375px × 667px (iPhone standard)
2. Navigate through all sections

**Checklist**:
- [ ] Layout still stacked (1 column)
- [ ] Spacing increased from 320px (more breathing room)
- [ ] All content visible without zooming
- [ ] Touch targets comfortable (44x44px+)

**Issues Found**:
```
(Document any 640px issues)
```

#### 3. Tablet (768px)

**Device**: iPad, Android tablets

**Steps**:
1. Set viewport to 768px × 1024px
2. Navigate through all sections

**Checklist**:
- [ ] **Tech Showcase**: 2 columns grid
- [ ] **Portfolio**: 2 columns grid
- [ ] **Contact**: Form side-by-side with info (or still stacked)
- [ ] Spacing optimal for tablet
- [ ] No awkward gaps or stretched content

**Issues Found**:
```
(Document any 768px issues)
```

#### 4. Desktop (1024px)

**Device**: Laptops, smaller desktop monitors

**Steps**:
1. Set viewport to 1024px × 768px
2. Navigate through all sections

**Checklist**:
- [ ] **Tech Showcase**: 3-4 columns grid
- [ ] **Portfolio**: 3 columns grid
- [ ] **Contact**: Side-by-side layout (form + info)
- [ ] Content doesn't stretch to full width (max-width container)
- [ ] Optimal spacing and padding

**Issues Found**:
```
(Document any 1024px issues)
```

#### 5. Large Desktop (1280px+)

**Device**: Desktop monitors, large displays

**Steps**:
1. Set viewport to 1920px × 1080px
2. Navigate through all sections

**Checklist**:
- [ ] Content constrained to max-width (not stretched edge-to-edge)
- [ ] Images don't pixelate (high-res assets)
- [ ] Grid layouts maintain optimal column count (3-4 max)
- [ ] No excessive white space

**Issues Found**:
```
(Document any 1280px+ issues)
```

#### 6. Real Device Testing

**iPhone Testing**:
- [ ] Site loads on Safari iOS
- [ ] Touch interactions work (tap, swipe, scroll)
- [ ] Form inputs work (keyboard appears)
- [ ] Animations smooth (60fps)
- [ ] Horizontal orientation tested

**Android Testing**:
- [ ] Site loads on Chrome Android
- [ ] Touch interactions work
- [ ] Form inputs work
- [ ] Performance acceptable

**iPad Testing**:
- [ ] Site loads on Safari iPad
- [ ] Landscape and portrait orientations tested
- [ ] Touch targets comfortable for tablet

**Issues Found**:
```
(Document any device-specific issues)
```

#### 7. Cross-Browser Responsive

**Test on Each Browser**:
- [ ] Chrome (responsive mode works correctly)
- [ ] Firefox (responsive mode works correctly)
- [ ] Safari (if on Mac, test responsive)
- [ ] Edge (responsive mode works correctly)

**Issues Found**:
```
(Document any browser-specific responsive issues)
```

### Test Report for T132

**Test Date**: ___________
**Tester**: ___________
**Devices Tested**: ___________
**Environment**: [ ] Local Dev  [ ] Staging  [ ] Production

**Breakpoints Tested**:
- [ ] 320px (XS Mobile)
- [ ] 640px (Mobile)
- [ ] 768px (Tablet)
- [ ] 1024px (Desktop)
- [ ] 1280px+ (Large Desktop)

**Real Devices Tested**:
- [ ] iPhone (model: _______)
- [ ] Android phone (model: _______)
- [ ] iPad (model: _______)
- [ ] Android tablet (model: _______)

**Summary**:
- Total breakpoints tested: _____
- Issues found: _____
- Critical issues: _____

**Overall Result**: [ ] PASS  [ ] FAIL  [ ] PARTIAL

**Issues by Priority**:

**High Priority** (breaks layout):
```
(List critical responsive issues)
```

**Medium Priority** (suboptimal experience):
```
(List moderate issues)
```

**Low Priority** (minor improvements):
```
(List minor polish opportunities)
```

---

## Test Report Template

Copy this template for each test:

```markdown
# Manual Test Report: [Test Name]

**Task ID**: T[###]
**Test Date**: YYYY-MM-DD
**Tester Name**: [Your Name]
**Environment**: [ ] Local  [ ] Staging  [ ] Production
**URL Tested**: https://___________

## Test Summary

**Total Checks**: [X]
**Passed**: [X]
**Failed**: [X]
**Overall Result**: [ ] PASS  [ ] FAIL  [ ] PARTIAL

## Issues Found

### Critical Issues (P1)
[Issues that prevent usage or break core functionality]

1. **Issue**: [Description]
   - **Impact**: [How it affects users]
   - **Steps to Reproduce**:
     1. [Step 1]
     2. [Step 2]
   - **Expected**: [What should happen]
   - **Actual**: [What actually happens]
   - **Screenshot**: [If applicable]

### High Priority Issues (P2)
[Issues that significantly impact experience]

### Medium Priority Issues (P3)
[Issues that are noticeable but not blocking]

### Low Priority Issues (P4)
[Minor polish or improvement opportunities]

## Recommendations

[Suggested fixes or improvements]

## Sign-off

**Tester Signature**: ___________
**Date**: ___________
**Approved for Production**: [ ] YES  [ ] NO (see issues above)
```

---

## Conclusion

These manual testing procedures ensure the AI Engineer Portfolio Landing Page meets WCAG 2.1 AA accessibility standards and provides an excellent user experience across all devices.

**Key Testing Principles**:
- Test with real assistive technologies (keyboard, screen readers)
- Test on real devices when possible (not just emulators)
- Document all issues with clear reproduction steps
- Prioritize issues by impact on user experience
- Retest after fixes to confirm resolution

**Next Steps After Testing**:
1. Complete test reports for T130, T131, T132
2. Create GitHub issues for any bugs found
3. Fix critical and high priority issues
4. Retest to verify fixes
5. Mark tasks as complete once all issues resolved

**Questions or Issues?**
- Refer to WCAG 2.1 guidelines: [w3.org/WAI/WCAG21/quickref/](https://www.w3.org/WAI/WCAG21/quickref/)
- Test with WebAIM resources: [webaim.org/resources/](https://webaim.org/resources/)
- Review specs/001-ai-engineer-landing/ for requirements

---

**Document Version**: 1.0.0
**Last Updated**: 2026-01-27
**Maintained By**: QA Team
