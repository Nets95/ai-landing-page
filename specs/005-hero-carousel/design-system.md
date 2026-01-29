# Design System: Neon Cyberpunk Styling

**Feature**: 005-hero-carousel (Extended Site-Wide)
**Created**: 2026-01-29
**Status**: Implemented

## Overview

The neon cyberpunk design aesthetic was initially implemented for the hero carousel text overlays and subsequently expanded to all text elements across the entire website, creating a cohesive, futuristic visual identity.

---

## Color Palette

### Primary Neon Colors

| Color | Hex/RGB | Usage | Tailwind Class |
|-------|---------|-------|----------------|
| **Cyan Primary** | `rgb(34, 211, 238)` | Main headings, primary text emphasis | `text-cyan-400` |
| **Cyan Subtle** | `rgb(103, 232, 249)` | Body text, secondary emphasis | `text-cyan-300` |
| **Cyan Dark** | `rgb(6, 182, 212)` | Borders, box shadows, accents | `border-cyan-500` |
| **Magenta Accent** | `rgb(236, 72, 153)` | Special highlights, call-outs | `text-pink-500` |
| **Purple Accent** | `rgb(168, 85, 247)` | Badge variations, diversity | `text-purple-500` |

### Opacity Variations

| Opacity | Use Case | Example |
|---------|----------|---------|
| `100%` | Main headings, CTAs | `text-cyan-400` |
| `90%` | Subheadings, descriptions | `text-cyan-300/90` |
| `70%` | Body text, secondary info | `text-cyan-300/70` |
| `60%` | Tertiary text, metadata | `text-cyan-300/60` |

---

## Text Shadows (Neon Glow Effects)

### Primary Heading Glow
```css
text-shadow: 
  0 0 10px rgba(34, 211, 238, 0.8),
  0 0 20px rgba(34, 211, 238, 0.6),
  0 0 30px rgba(34, 211, 238, 0.4),
  0 0 40px rgba(6, 182, 212, 0.3),
  0 0 70px rgba(6, 182, 212, 0.2),
  0 0 100px rgba(6, 182, 212, 0.1);
```

**Usage**: Large headings (h1, h2) that need maximum impact

**Effect**: Multi-layered glow creating depth with:
- Tight inner glow (10px, 80% opacity)
- Mid-range glow (20-40px, 60-30% opacity)
- Extended halo (70-100px, 20-10% opacity)

### Subtitle/Body Glow
```css
text-shadow: 
  0 0 8px rgba(103, 232, 249, 0.7),
  0 0 15px rgba(103, 232, 249, 0.5),
  0 0 25px rgba(103, 232, 249, 0.3),
  0 0 35px rgba(34, 211, 238, 0.2);
```

**Usage**: Subtitles, larger body text (h3, prominent paragraphs)

**Effect**: Softer glow with cyan-300 base creating readable elegance

### Subtle Glow
```css
text-shadow: 
  0 0 5px rgba(103, 232, 249, 0.5),
  0 0 10px rgba(103, 232, 249, 0.3);
```

**Usage**: Small text, labels, navigation links, badges

**Effect**: Minimal glow maintaining readability while adding cyberpunk aesthetic

---

## Box Shadows (Card & Border Glows)

### Card Neon Glow (Default)
```css
box-shadow: 
  0 0 10px rgba(6, 182, 212, 0.2),
  0 0 20px rgba(6, 182, 212, 0.1),
  inset 0 0 10px rgba(6, 182, 212, 0.05);
```

**Usage**: All card components at rest state

**Border**: `border: 1px solid rgba(6, 182, 212, 0.3)`

### Card Hover Glow (Enhanced)
```css
box-shadow: 
  0 0 15px rgba(6, 182, 212, 0.4),
  0 0 30px rgba(6, 182, 212, 0.2),
  inset 0 0 15px rgba(6, 182, 212, 0.1);
```

**Usage**: Card hover states

**Border**: `border: 1px solid rgba(6, 182, 212, 0.6)`

### Button Primary Glow
```css
box-shadow: 
  0 0 15px rgba(6, 182, 212, 0.4),
  0 0 30px rgba(6, 182, 212, 0.2),
  inset 0 0 15px rgba(6, 182, 212, 0.1);
```

**Background**: `rgba(6, 182, 212, 0.2)`

**Border**: `1px solid rgb(6, 182, 212)`

**Hover Enhancement**:
```css
box-shadow: 
  0 0 20px rgba(6, 182, 212, 0.5),
  0 0 40px rgba(6, 182, 212, 0.3),
  inset 0 0 20px rgba(6, 182, 212, 0.15);
```

---

## Typography Hierarchy

### Headings

| Level | Size (Desktop) | Color | Glow | Additional Styles |
|-------|---------------|-------|------|-------------------|
| **h1** (Hero) | `text-7xl` (72px) | `text-cyan-400` | Primary Heading Glow | `uppercase tracking-wide` |
| **h2** (Section) | `text-5xl-6xl` (48-60px) | `text-cyan-400` | Primary Heading Glow | `uppercase tracking-wide` |
| **h3** (Subsection) | `text-xl-2xl` (20-24px) | `text-cyan-400` | Subtitle Glow | `uppercase tracking-wide` |
| **h4** (Card Title) | `text-xl` (20px) | `text-cyan-400` | Subtitle Glow | `tracking-wide` |

### Body Text

| Type | Size | Color | Glow | Additional Styles |
|------|------|-------|------|-------------------|
| **Large Body** | `text-xl` (20px) | `text-cyan-300/90` | Subtitle Glow | `tracking-wide` |
| **Body** | `text-base` (16px) | `text-cyan-300/70` | Subtle Glow | Normal tracking |
| **Small** | `text-sm` (14px) | `text-cyan-300/60` | Subtle Glow | `tracking-wide` |
| **Label** | `text-sm` (14px) | `text-cyan-300` | Subtle Glow | `uppercase tracking-wide` |

---

## Component Styling Patterns

### Buttons

#### Primary Button
```tsx
className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 
           uppercase tracking-wide font-semibold"
style={{
  textShadow: '0 0 8px rgba(34, 211, 238, 0.8), 0 0 15px rgba(34, 211, 238, 0.6)',
  boxShadow: `
    0 0 15px rgba(6, 182, 212, 0.4),
    0 0 30px rgba(6, 182, 212, 0.2),
    inset 0 0 15px rgba(6, 182, 212, 0.1)
  `
}}
```

#### Secondary Button
```tsx
className="bg-transparent border border-cyan-500/50 text-cyan-300 
           uppercase tracking-wide font-semibold"
style={{
  textShadow: '0 0 5px rgba(103, 232, 249, 0.5)'
}}
```

### Cards

```tsx
className="bg-bg-surface/60 backdrop-blur-sm border border-cyan-500/30 
           rounded-xl"
style={{
  boxShadow: `
    0 0 10px rgba(6, 182, 212, 0.2),
    0 0 20px rgba(6, 182, 212, 0.1),
    inset 0 0 10px rgba(6, 182, 212, 0.05)
  `
}}
```

### Technology/Filter Badges

```tsx
className="px-3 py-1.5 rounded-lg bg-cyan-500/10 
           border border-cyan-500/50 text-cyan-300 text-sm
           uppercase tracking-wide"
style={{
  textShadow: '0 0 5px rgba(103, 232, 249, 0.4)'
}}
```

### Input Labels
```tsx
className="text-sm font-medium text-cyan-300 mb-2 
           uppercase tracking-wide"
style={{
  textShadow: '0 0 5px rgba(103, 232, 249, 0.5)'
}}
```

---

## Utility Classes

### Global CSS Utilities (in `globals.css`)

```css
/* Neon Text Classes */
.neon-text-cyan {
  color: rgb(34, 211, 238);
  text-shadow: 
    0 0 10px rgba(34, 211, 238, 0.8),
    0 0 20px rgba(34, 211, 238, 0.6),
    0 0 30px rgba(34, 211, 238, 0.4),
    0 0 40px rgba(6, 182, 212, 0.3),
    0 0 70px rgba(6, 182, 212, 0.2),
    0 0 100px rgba(6, 182, 212, 0.1);
}

.neon-text-cyan-subtle {
  color: rgb(103, 232, 249);
  text-shadow: 
    0 0 8px rgba(103, 232, 249, 0.7),
    0 0 15px rgba(103, 232, 249, 0.5),
    0 0 25px rgba(103, 232, 249, 0.3),
    0 0 35px rgba(34, 211, 238, 0.2);
}

.neon-text-magenta {
  color: rgb(236, 72, 153);
  text-shadow: 
    0 0 10px rgba(236, 72, 153, 0.8),
    0 0 20px rgba(236, 72, 153, 0.6),
    0 0 30px rgba(236, 72, 153, 0.4),
    0 0 40px rgba(219, 39, 119, 0.3);
}

.neon-text-purple {
  color: rgb(168, 85, 247);
  text-shadow: 
    0 0 10px rgba(168, 85, 247, 0.8),
    0 0 20px rgba(168, 85, 247, 0.6),
    0 0 30px rgba(168, 85, 247, 0.4),
    0 0 40px rgba(147, 51, 234, 0.3);
}

/* Neon Glow Effects */
.neon-glow-cyan {
  box-shadow: 
    0 0 10px rgba(6, 182, 212, 0.4),
    0 0 20px rgba(6, 182, 212, 0.3),
    0 0 30px rgba(6, 182, 212, 0.2),
    inset 0 0 10px rgba(6, 182, 212, 0.1);
}

.neon-glow-magenta {
  box-shadow: 
    0 0 10px rgba(236, 72, 153, 0.4),
    0 0 20px rgba(236, 72, 153, 0.3),
    0 0 30px rgba(236, 72, 153, 0.2),
    inset 0 0 10px rgba(236, 72, 153, 0.1);
}
```

---

## Responsive Behavior

### Mobile (< 768px)
- Reduce glow intensity by 30% for performance
- Maintain text-shadow for brand consistency
- Reduce blur on glassmorphism effects
- Smaller font sizes with maintained contrast

### Tablet (768px - 1024px)
- Standard glow intensity
- Full glassmorphism effects
- Medium font sizes

### Desktop (> 1024px)
- Full glow effects at maximum intensity
- Enhanced hover states with intensified glows
- Large font sizes for impact

---

## Accessibility Considerations

### Contrast Ratios
All text maintains **WCAG AA compliance (4.5:1 minimum)**:
- Cyan-400 on dark background: ~12:1 ratio ✅
- Cyan-300 on dark background: ~10:1 ratio ✅
- Cyan-300/70 on dark background: ~7:1 ratio ✅

### Reduced Motion Support
When `prefers-reduced-motion: reduce` is detected:
- Glow effects remain (static visual style)
- Animation durations reduced to near-instant
- No translateY or scale animations

### Screen Reader Compatibility
- Neon effects are purely visual (CSS)
- All text remains semantic and accessible
- ARIA labels maintained throughout
- Color is not the only differentiator

---

## Implementation Guidelines

### When to Use Each Glow Level

| Glow Level | Use Case | Components |
|------------|----------|------------|
| **Primary Heading** | Page/section titles requiring maximum attention | Hero headlines, section headings (h1, h2) |
| **Subtitle** | Important supporting text | Subheadings (h3), card titles, prominent labels |
| **Subtle** | General UI text maintaining aesthetic | Body text, navigation, badges, small labels |
| **None** | Rare cases where glow distracts | Error messages (use semantic colors) |

### Do's and Don'ts

✅ **Do:**
- Use cyan as primary brand color throughout
- Apply consistent glow intensity for same hierarchy level
- Combine text-shadow with uppercase + tracking for headings
- Use inset shadows on interactive elements for depth
- Test contrast ratios with DevTools

❌ **Don't:**
- Mix neon colors randomly (maintain hierarchy)
- Overuse magenta/purple (use as accents only)
- Apply heavy glows to small text (< 14px)
- Use neon on pure black backgrounds (reduces glow effect)
- Forget hover state enhancements

---

## Component-Specific Guidelines

### Header/Navigation
- Logo: Primary neon glow, uppercase
- Nav links: Subtle glow, uppercase, tracking-wide
- Hover: Intensify glow, slight scale increase

### Hero Carousel
- Headlines: Primary glow, 72px, uppercase
- Subtitles: Subtitle glow, 24px, tracking-wide
- Scroll indicator: Subtle glow with icon filter

### Section Headers
- Main heading: Primary glow, 48-60px, uppercase
- Description: Subtitle glow, 20px, normal case
- Filter/Category buttons: Subtle glow, border glow on active

### Cards (Technology/Portfolio)
- Card title: Subtitle glow, 20px, tracking-wide
- Description: Subtle glow, 14-16px, 60-70% opacity
- Tags: Subtle glow, uppercase, cyan borders
- Hover: Enhanced border and box-shadow glow

### Forms
- Labels: Subtle glow, uppercase, tracking-wide
- Inputs: Cyan borders, focus glow enhancement
- Buttons: Primary glow with multi-layer shadows

### Footer
- Nav links: Subtle glow, uppercase
- Social icons: Cyan filter with drop-shadow
- Copyright: Very subtle glow, low opacity

---

## Performance Optimization

### Best Practices
1. **Use CSS text-shadow** (GPU-accelerated) instead of SVG filters
2. **Limit shadow layers** to 4-6 maximum for complex glows
3. **Use rgba() colors** for precise opacity control
4. **Leverage CSS custom properties** for consistency
5. **Test on mobile devices** - reduce blur/glow if needed

### Mobile Optimization
```css
@media (max-width: 767px) {
  /* Reduce glow intensity */
  .neon-text-cyan {
    text-shadow: 
      0 0 8px rgba(34, 211, 238, 0.6),
      0 0 15px rgba(34, 211, 238, 0.4),
      0 0 25px rgba(34, 211, 238, 0.2);
  }
  
  /* Reduce backdrop blur */
  .glass,
  .card {
    backdrop-filter: blur(2px) !important;
  }
}
```

---

## Future Enhancements

### Potential Additions
- [ ] Animated neon flicker effect on hover (subtle)
- [ ] Multiple color themes (cyan, magenta, purple variants)
- [ ] Scanline overlay effect for retro-futurism
- [ ] Customizable glow intensity via data attributes
- [ ] Dark mode toggle (currently dark-only)

### Color Palette Expansion
- **Green Neon**: `rgb(16, 185, 129)` - Success states
- **Red Neon**: `rgb(239, 68, 68)` - Error states  
- **Amber Neon**: `rgb(251, 191, 36)` - Warning states

---

## References

### Inspiration
- Cyberpunk 2077 UI design
- Blade Runner aesthetic
- Tron Legacy visual language
- Modern neon signage

### Technical Resources
- [CSS text-shadow MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)
- [CSS box-shadow MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-29  
**Maintained By**: AI Landing Project Team
