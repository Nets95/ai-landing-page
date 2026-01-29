# Hero Carousel - Developer Quickstart Guide

**Feature**: Hero Image Carousel
**Branch**: 005-hero-carousel
**Last Updated**: 2026-01-29

---

## Overview

The hero carousel is a cinematic, full-width image carousel that displays rotating hero images with animated text overlays. It features:

- **Auto-play**: 5-second intervals between slides
- **Smooth transitions**: Cross-fade animations (800ms duration)
- **Animated text**: Text fades in from bottom on each slide change
- **Hover-to-pause**: Desktop users can pause by hovering (auto-resumes on mouse leave)
- **Accessibility**: WCAG AA contrast ratios, prefers-reduced-motion support
- **Performance**: 60fps animations, zero layout shift (CLS = 0)

---

## Quick Start

### Adding a New Slide

**Step 1**: Add your image to the carousel folder

```bash
# Place your image in public/images/carousel/
cp your-image.png public/images/carousel/
```

**Image Requirements**:
- **Minimum width**: 1920px (for desktop displays)
- **Recommended dimensions**: 1920×1080 (16:9 aspect ratio)
- **Format**: WebP preferred, PNG/JPG acceptable
- **File size**: < 500KB per image (optimize with [Squoosh](https://squoosh.app/))
- **Content**: High contrast areas on left side for text readability

**Step 2**: Edit the carousel configuration file

Open `src/data/carousel.json` and add your slide to the `slides` array:

```json
{
  "config": {
    "autoPlayInterval": 5000,
    "transitionDuration": 800,
    "textAnimationDuration": 500,
    "pauseOnHover": true,
    "respectReducedMotion": true
  },
  "slides": [
    // ... existing slides ...
    {
      "id": "slide-4",
      "image": "/images/carousel/your-image.png",
      "imageAlt": "Descriptive alt text for accessibility (describe what's visible)",
      "headline": "Your Headline Here",
      "subtitle": "Optional subtitle with additional context",
      "order": 3
    }
  ]
}
```

**Field Guide**:
- `id`: Unique identifier (e.g., "slide-4", "hero-innovation")
- `image`: Path starting with `/images/carousel/` (relative to `/public`)
- `imageAlt`: Screen reader description (10-150 chars, be descriptive)
- `headline`: Bold, large text (5-50 chars, keep concise)
- `subtitle`: Optional smaller text (0-100 chars)
- `order`: Display sequence (0-indexed, sequential)

**Step 3**: Test locally

```bash
npm run dev
# Navigate to http://localhost:3000
# Carousel should auto-advance through all slides
```

---

## Configuration

### Adjusting Auto-Play Speed

Edit `src/data/carousel.json`:

```json
{
  "config": {
    "autoPlayInterval": 7000,  // 7 seconds (range: 3000-10000ms)
    "transitionDuration": 800,
    "textAnimationDuration": 500,
    "pauseOnHover": true,
    "respectReducedMotion": true
  }
}
```

**Timing Guidelines**:
- **Fast pace** (3-4s): High-energy, promotional
- **Balanced** (5-6s): Default, allows comfortable reading
- **Slow pace** (7-10s): Detailed content, longer text

### Adjusting Animation Duration

```json
{
  "config": {
    "autoPlayInterval": 5000,
    "transitionDuration": 1000,   // Slower fade (300-1500ms)
    "textAnimationDuration": 600, // Slower text (300-600ms)
    "pauseOnHover": true,
    "respectReducedMotion": true
  }
}
```

**Animation Guidelines**:
- **transitionDuration**: Image cross-fade speed
  - Faster (300-500ms): Snappy, energetic
  - Balanced (600-900ms): Smooth, cinematic
  - Slower (1000-1500ms): Elegant, deliberate
- **textAnimationDuration**: Text fade-in speed
  - Must be 300-600ms (spec requirement FR-013)
  - Faster values feel more responsive
  - Slower values add drama

### Disabling Hover-to-Pause

```json
{
  "config": {
    "pauseOnHover": false  // Carousel won't pause on hover
  }
}
```

**Use cases**:
- Kiosk displays (no mouse interaction)
- Mobile-only sites (hover not applicable)
- Forced continuous playback

### Disabling Reduced Motion Support

```json
{
  "config": {
    "respectReducedMotion": false  // Animations always enabled
  }
}
```

**Note**: Not recommended. Respecting `prefers-reduced-motion` is an accessibility best practice (WCAG AA compliance).

---

## Component Architecture

```
Hero.tsx (Modified)
└── HeroCarousel.tsx (New)
    ├── useCarousel hook
    │   ├── Auto-play timer (setInterval)
    │   ├── Pause/resume logic
    │   └── Current slide state
    ├── Framer Motion AnimatePresence
    │   └── Cross-fade transitions
    └── CarouselSlide.tsx (per slide)
        ├── Next.js Image component
        ├── CSS gradient overlay
        └── Animated text content
            ├── Headline (h2)
            └── Subtitle (p)
```

**Key Files**:
- `src/components/sections/Hero.tsx` - Integrates carousel
- `src/components/sections/HeroCarousel.tsx` - Main carousel container
- `src/components/ui/CarouselSlide.tsx` - Individual slide component
- `src/hooks/useCarousel.ts` - State management hook
- `src/lib/carousel-animations.ts` - Framer Motion variants
- `src/types/carousel.ts` - TypeScript interfaces
- `src/data/carousel.json` - Configuration and slide data

---

## Image Optimization

### Optimizing Existing Images

**Using Squoosh** (web-based):
1. Visit [squoosh.app](https://squoosh.app/)
2. Drag your image onto the page
3. Select "WebP" format (right panel)
4. Adjust quality slider (target: 85-90%)
5. Verify file size < 500KB
6. Download optimized image

**Using ImageOptim** (Mac):
1. Install ImageOptim from [imageoptim.com](https://imageoptim.com/)
2. Drag images onto ImageOptim
3. Wait for automatic optimization
4. Replace original files

**Using CLI tools**:
```bash
# Install sharp-cli
npm install -g sharp-cli

# Convert to WebP
sharp -i input.png -o output.webp --webp-quality 85

# Resize to 1920px width
sharp -i input.png -o output.png --resize 1920
```

### Image Checklist

- [ ] Minimum 1920px width
- [ ] 16:9 aspect ratio (1920×1080 recommended)
- [ ] File size < 500KB
- [ ] WebP format (or PNG/JPG)
- [ ] High contrast on left side (for text readability)
- [ ] Descriptive alt text provided

---

## Troubleshooting

### Carousel Not Auto-Playing

**Possible causes**:
1. **Fewer than 3 slides** - Auto-play disabled for < 3 slides (graceful degradation)
   - **Fix**: Add more slides to `carousel.json`
2. **autoPlayInterval < 3000ms** - Below minimum threshold
   - **Fix**: Increase `autoPlayInterval` to >= 3000ms
3. **JavaScript error** - Check browser console for errors
   - **Fix**: Verify JSON syntax, check image paths

### Images Not Loading

**Possible causes**:
1. **Incorrect path** - Path doesn't start with `/images/carousel/`
   - **Fix**: Ensure path is `/images/carousel/filename.png` (not `./images/...`)
2. **File doesn't exist** - Image file missing from `public/images/carousel/`
   - **Fix**: Verify file exists, check spelling and case sensitivity
3. **File permissions** - Server can't read the file
   - **Fix**: Check file permissions (`chmod 644` on Unix systems)

### Layout Shift During Transitions

**Possible causes**:
1. **Missing container height** - Carousel container doesn't have explicit height
   - **Fix**: Verify `calc(100dvh - 70px)` is applied to carousel container
2. **Image dimensions unknown** - Images loading without dimensions specified
   - **Fix**: Next.js Image component should use `fill` prop
3. **Text positioning** - Text not using absolute positioning
   - **Fix**: Verify text overlay uses `absolute` positioning within slide

### Text Not Readable

**Possible causes**:
1. **Insufficient contrast** - Text doesn't meet WCAG AA (4.5:1 ratio)
   - **Fix**: Adjust gradient opacity (increase left-side darkness)
   - **Tool**: Use Chrome DevTools "Inspect > Accessibility > Contrast Ratio"
2. **Wrong image side** - Text positioned over bright area of image
   - **Fix**: Choose images with darker left side, or adjust gradient
3. **Text too long** - Headline/subtitle exceeds recommended length
   - **Fix**: Shorten text to 5-10 words (headline), 10-20 words (subtitle)

### Hover-to-Pause Not Working

**Possible causes**:
1. **Mobile device** - Hover-to-pause only works on desktop (pointer events)
   - **Expected**: Mobile users don't have hover capability (feature not applicable)
2. **pauseOnHover: false** - Feature disabled in config
   - **Fix**: Set `pauseOnHover: true` in `carousel.json`
3. **Z-index issue** - Another element overlaying carousel
   - **Fix**: Check z-index stacking order (carousel should be below buttons but interactive)

---

## Performance Optimization

### Image Optimization Checklist

- [ ] Convert images to WebP format (30% smaller than PNG)
- [ ] Resize images to maximum display size (1920px wide)
- [ ] Compress images to < 500KB each
- [ ] Total carousel assets < 1.5MB
- [ ] First slide marked with `priority` flag (Next.js Image)

### Performance Targets

| Metric | Target | How to Measure |
|--------|--------|----------------|
| First Contentful Paint | < 1.5s | Lighthouse audit (Performance tab) |
| Cumulative Layout Shift | 0 (zero) | Chrome DevTools Performance recording |
| Animation frame rate | 60fps | Chrome DevTools Performance > FPS meter |
| Bundle size (carousel code) | < 10KB | `npm run build` output |

### Running Performance Audits

**Lighthouse** (Chrome DevTools):
```bash
# 1. Build production version
npm run build
npm start

# 2. Open Chrome DevTools (F12)
# 3. Navigate to "Lighthouse" tab
# 4. Select "Performance" category
# 5. Click "Analyze page load"
# 6. Review report (target: 90+ score)
```

**Bundle Analysis**:
```bash
# Analyze bundle size impact
npm run build
# Check .next/static/chunks output
# Carousel components should add < 10KB gzipped
```

---

## Accessibility

### WCAG AA Compliance Checklist

- [ ] Text contrast ratio >= 4.5:1 (use DevTools Color Picker)
- [ ] Descriptive alt text for all images (10-150 characters)
- [ ] prefers-reduced-motion support enabled (`respectReducedMotion: true`)
- [ ] Semantic HTML (proper heading hierarchy: h1 → h2)
- [ ] Keyboard navigation (future: arrow keys for manual control)
- [ ] Screen reader announcements (ARIA live regions for slide changes)

### Testing with Screen Readers

**VoiceOver** (Mac):
```bash
# Enable: System Preferences > Accessibility > VoiceOver > Enable
# Navigate: Cmd+F5, then use arrow keys
# Expected: Announces headline, subtitle, and image alt text
```

**NVDA** (Windows):
```bash
# Download: https://www.nvaccess.org/download/
# Navigate: Insert+Down arrow to read content
# Expected: Reads text content and image descriptions
```

### Reduced Motion Testing

**Enable prefers-reduced-motion**:
- **Mac**: System Preferences > Accessibility > Display > Reduce motion
- **Windows**: Settings > Ease of Access > Display > Show animations
- **Chrome DevTools**: Cmd+Shift+P > "Emulate CSS prefers-reduced-motion"

**Expected behavior**:
- Carousel still advances slides (functionality preserved)
- Cross-fade animation disabled or minimized
- Text animation disabled or minimized
- Slide changes are instantaneous (no smooth transitions)

---

## Common Customizations

### Changing Text Colors

Edit `src/components/ui/CarouselSlide.tsx`:

```tsx
<h2 className="text-5xl md:text-7xl font-bold text-gray-100"> {/* Change text-gray-100 */}
  {slide.headline}
</h2>
<p className="text-xl md:text-2xl text-gray-300"> {/* Change text-gray-300 */}
  {slide.subtitle}
</p>
```

**Soft white colors** (recommended):
- `text-gray-100`: #F3F4F6 (current)
- `text-gray-50`: #F9FAFB (lighter)
- `text-white`: #FFFFFF (pure white, not recommended per FR-010)

### Adjusting Gradient Overlay

Edit `src/components/ui/CarouselSlide.tsx`:

```tsx
<div
  className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
  aria-hidden="true"
/>
```

**Gradient adjustments**:
- **Darker left side**: Change `from-black/65` to `from-black/80`
- **Wider dark area**: Change `via-black/25` to `via-black/40`
- **Sharper transition**: Add more color stops (e.g., `from-black/70 via-black/50 via-black/20 to-transparent`)

### Changing Carousel Height

Edit `src/components/sections/HeroCarousel.tsx`:

```tsx
<div
  className="relative w-full"
  style={{ height: 'calc(100dvh - 80px)' }} // Change 80px (nav menu space)
>
```

**Height options**:
- **Full viewport**: `100dvh` (no nav space)
- **With navigation**: `calc(100dvh - 70px)` (current, 70px nav)
- **Fixed height**: `600px` or `80vh` (not recommended)

---

## Advanced Topics

### Adding Manual Navigation Controls (Future)

**Dot indicators**:
```tsx
{/* Add to HeroCarousel.tsx */}
<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
  {slides.map((_, index) => (
    <button
      key={index}
      onClick={() => goToSlide(index)}
      className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>
```

**Previous/Next buttons**:
```tsx
<button onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2">
  <ChevronLeft className="w-8 h-8 text-white" />
</button>
<button onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2">
  <ChevronRight className="w-8 h-8 text-white" />
</button>
```

### Adding Keyboard Navigation (Future)

```typescript
// Add to useCarousel.ts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [goToPrevious, goToNext]);
```

---

---

## Neon Cyberpunk Styling Guide

**Added**: 2026-01-29

The carousel's neon cyberpunk text styling has been extended site-wide. This section provides quick reference for applying consistent styling to new components.

### Quick Copy-Paste Patterns

#### Large Heading (h1, h2)
```tsx
<h2
  className="text-5xl md:text-6xl lg:text-7xl font-bold text-cyan-400 tracking-wide uppercase"
  style={{
    textShadow: `
      0 0 10px rgba(34, 211, 238, 0.8),
      0 0 20px rgba(34, 211, 238, 0.6),
      0 0 30px rgba(34, 211, 238, 0.4),
      0 0 40px rgba(6, 182, 212, 0.3)
    `,
  }}
>
  Your Heading Here
</h2>
```

#### Subtitle/Description
```tsx
<p
  className="text-lg md:text-xl text-cyan-300/90 tracking-wide"
  style={{
    textShadow: `
      0 0 5px rgba(103, 232, 249, 0.5),
      0 0 10px rgba(103, 232, 249, 0.3)
    `,
  }}
>
  Your description text here
</p>
```

#### Button (Primary)
```tsx
<button
  className="px-6 py-3 bg-cyan-500/20 border border-cyan-500 text-cyan-400 
             rounded-lg uppercase tracking-wide font-semibold transition-all"
  style={{
    textShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
    boxShadow: `
      0 0 15px rgba(6, 182, 212, 0.4),
      0 0 30px rgba(6, 182, 212, 0.2),
      inset 0 0 15px rgba(6, 182, 212, 0.1)
    `,
  }}
>
  Button Text
</button>
```

#### Card Border with Glow
```tsx
<div
  className="p-6 rounded-xl bg-bg-surface/60 backdrop-blur-sm"
  style={{
    border: '1px solid rgba(6, 182, 212, 0.3)',
    boxShadow: `
      0 0 10px rgba(6, 182, 212, 0.2),
      0 0 20px rgba(6, 182, 212, 0.1),
      inset 0 0 10px rgba(6, 182, 212, 0.05)
    `,
  }}
>
  Card content
</div>
```

#### Badge/Tag
```tsx
<span
  className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 
             border border-cyan-500/50 text-sm uppercase tracking-wide"
  style={{
    textShadow: '0 0 5px rgba(103, 232, 249, 0.4)',
  }}
>
  Badge Text
</span>
```

### Global Utility Classes

Use these classes defined in `globals.css`:

```tsx
// Neon text classes
<h1 className="neon-text-cyan">Primary Heading</h1>
<p className="neon-text-cyan-subtle">Subtitle Text</p>
<span className="neon-text-magenta">Accent Text</span>

// Neon glow on boxes
<div className="neon-glow-cyan">Glowing box</div>
```

### Color Reference

| Color | Value | Usage |
|-------|-------|-------|
| `text-cyan-400` | `rgb(34, 211, 238)` | Main headings |
| `text-cyan-300` | `rgb(103, 232, 249)` | Body text |
| `text-cyan-300/90` | 90% opacity cyan-300 | Subtitles |
| `text-cyan-300/70` | 70% opacity cyan-300 | Body paragraphs |
| `text-cyan-300/60` | 60% opacity cyan-300 | Meta text |
| `border-cyan-500` | `rgb(6, 182, 212)` | Borders |
| `bg-cyan-500/20` | 20% opacity cyan-500 | Button backgrounds |

### When to Use Each Glow

- **Primary Glow** (6-layer): Page/section titles, hero text
- **Subtitle Glow** (4-layer): Subheadings, card titles, prominent labels  
- **Subtle Glow** (2-layer): Navigation, badges, small text, body text

### Complete Design System

For comprehensive styling guidelines, color palette, typography hierarchy, and component patterns, see:

**[Design System Documentation](./design-system.md)**

---

## Related Documentation

- [Implementation Plan](./plan.md) - Overall technical approach
- [Data Model](./data-model.md) - Entity definitions and validation rules
- [Research Document](./research.md) - Technology decisions and best practices
- [TypeScript Contracts](./contracts/carousel.types.ts) - Interface definitions
- [Feature Specification](./spec.md) - User stories and requirements
- **[Design System](./design-system.md)** - Neon cyberpunk styling guide (NEW)

---

## Getting Help

### Resources

- **Framer Motion Docs**: [framer.com/motion](https://www.framer.com/motion/)
- **Next.js Image Optimization**: [nextjs.org/docs/basic-features/image-optimization](https://nextjs.org/docs/basic-features/image-optimization)
- **WCAG Guidelines**: [w3.org/WAI/WCAG21/quickref/](https://www.w3.org/WAI/WCAG21/quickref/)
- **Core Web Vitals**: [web.dev/vitals/](https://web.dev/vitals/)
- **CSS text-shadow**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)

### Common Questions

**Q: Can I use videos instead of images?**
A: Not in the current implementation (out of scope per spec.md). Future enhancement possible.

**Q: Can I add links/CTAs to individual slides?**
A: Not in the current implementation. Existing Hero CTAs apply to all slides. Future enhancement possible.

**Q: How many slides can I add?**
A: No hard limit, but performance degrades with > 10 slides (increased memory usage). Recommended: 3-7 slides.

**Q: Can I lazy-load carousel images?**
A: Not recommended for hero carousel (above-the-fold content). First slide uses `priority` flag, others load eagerly.

**Q: Can I change the animation direction (left-to-right instead of cross-fade)?**
A: Yes, modify Framer Motion variants in `src/lib/carousel-animations.ts`. Cross-fade is current design decision (per research.md).

**Q: How do I apply neon styling to new components?**
A: Use the copy-paste patterns in the "Neon Cyberpunk Styling Guide" section above, or reference [design-system.md](./design-system.md) for complete guidelines.

**Q: Can I customize the neon color scheme?**
A: Yes, but maintain consistency. See design-system.md for alternative accent colors (magenta, purple). Primary cyan should remain dominant for brand identity.
