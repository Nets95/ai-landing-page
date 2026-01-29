# Carousel Navigation Tabs Implementation

**Feature**: Bottom preview navigation for hero carousel  
**Date Added**: 2026-01-29  
**Status**: ✅ Implemented

---

## Overview

Bottom navigation tabs with preview thumbnails for the hero carousel. Provides visual navigation without modifying existing carousel logic.

---

## Components

### **CarouselNavigation.tsx**
**Location**: `src/components/ui/CarouselNavigation.tsx`

**Purpose**: Displays clickable preview thumbnails below carousel

**Props**:
```typescript
{
  slides: CarouselSlide[];      // Carousel slides for preview
  activeIndex: number;           // Current active slide index (from carousel)
  onNavigate: (index: number);  // Callback to carousel's goToSlide()
  className?: string;            // Optional additional classes
}
```

**Key Features**:
- ✅ Shows preview thumbnail for each slide
- ✅ Active state with neon glow highlighting
- ✅ Click navigation to specific slides
- ✅ Auto-scrolls to keep active tab centered
- ✅ Horizontal overflow with hidden scrollbar
- ✅ Smooth transitions with Framer Motion
- ✅ Keyboard accessibility (Enter/Space)
- ✅ Screen reader support with ARIA labels
- ✅ Respects `prefers-reduced-motion`

---

## Integration Points

### **HeroCarousel Component**
**Location**: `src/components/sections/HeroCarousel.tsx`

**Changes Made**:
1. ✅ Imported `CarouselNavigation` component
2. ✅ Exposed `goToSlide` from `useCarousel` hook
3. ✅ Added `<CarouselNavigation>` below carousel container
4. ✅ Wrapped return in `<>` fragment to include both carousel and navigation

**Integration Code**:
```tsx
return (
  <>
    {/* Main carousel container */}
    <div className="carousel-container">
      {/* Existing carousel slides */}
    </div>

    {/* Bottom navigation tabs - syncs with carousel state */}
    <CarouselNavigation
      slides={slides}
      activeIndex={currentIndex}
      onNavigate={goToSlide}
    />
  </>
);
```

### **State Synchronization**

**Carousel → Navigation** (automatic):
- When carousel changes slide (auto-play, swipe, keyboard):
  - `currentIndex` updates
  - Navigation tabs receive new `activeIndex`
  - Active tab styling updates automatically
  - Container auto-scrolls to center active tab

**Navigation → Carousel** (on click):
- When user clicks navigation tab:
  - `onNavigate(index)` called
  - Carousel's `goToSlide(index)` executed
  - Carousel transitions to selected slide
  - NO carousel logic is duplicated or modified

---

## Styling

### **Location**: `src/app/globals.css`

### **Classes Added**:

| Class | Purpose |
|-------|---------|
| `.carousel-navigation-container` | Wrapper with padding |
| `.carousel-navigation-scroll` | Horizontal scroll container (hidden scrollbar) |
| `.carousel-navigation-tabs` | Flexbox for tab layout |
| `.carousel-navigation-tab` | Individual tab button |
| `.carousel-navigation-tab.active` | Active tab state |
| `.carousel-navigation-preview` | Preview thumbnail container |
| `.carousel-navigation-indicator` | Neon border overlay for active state |
| `.carousel-navigation-title` | Slide title below thumbnail |

### **Neon Cyberpunk Styling**

**Inactive State**:
```css
border: 2px solid rgba(6, 182, 212, 0.3);
box-shadow: 
  0 0 10px rgba(6, 182, 212, 0.2),
  0 0 20px rgba(6, 182, 212, 0.1);
opacity: 0.6;
scale: 1;
```

**Active State**:
```css
border: 2px solid rgba(6, 182, 212, 0.8);
box-shadow: 
  0 0 15px rgba(6, 182, 212, 0.5),
  0 0 30px rgba(6, 182, 212, 0.3),
  inset 0 0 20px rgba(6, 182, 212, 0.1);
opacity: 1;
scale: 1.05;

/* Additional neon border indicator */
border: 3px solid rgb(34, 211, 238);
box-shadow: 
  0 0 20px rgba(34, 211, 238, 0.8),
  inset 0 0 20px rgba(34, 211, 238, 0.3);
```

**Hover State** (inactive tabs):
```css
opacity: 0.8;
scale: 1.02;
transform: scale(1.05) on image;
```

### **Responsive Breakpoints**

| Breakpoint | Preview Size | Gap | Title Size |
|------------|--------------|-----|------------|
| Desktop (>768px) | 120×68px | 1rem | 0.75rem |
| Tablet (≤768px) | 100×56px | 0.75rem | 0.65rem |
| Mobile (≤480px) | 80×45px | 0.5rem | 0.65rem |

---

## Accessibility Features

### **ARIA Attributes**
```tsx
role="tablist"                              // Container
role="tab"                                  // Each button
aria-selected={isActive}                    // Active state
aria-label="Go to slide X: Title"          // Descriptive label
aria-controls="carousel-slide-{id}"         // Links to slide
tabIndex={isActive ? 0 : -1}               // Keyboard focus
```

### **Keyboard Support**
- **Tab**: Focus navigation tabs
- **Enter/Space**: Activate focused tab
- **Arrow Keys**: Navigate carousel (handled by main carousel)

### **Screen Reader**
- Announces slide number and title
- Indicates selected state
- Provides clear action labels

### **Reduced Motion**
```css
@media (prefers-reduced-motion: reduce) {
  scroll-behavior: auto;
  transition: none;
}
```

---

## Technical Implementation

### **Auto-Scroll Logic**

When `activeIndex` changes, the navigation auto-scrolls to center the active tab:

```tsx
useEffect(() => {
  if (activeTabRef.current && containerRef.current) {
    const container = containerRef.current;
    const activeTab = activeTabRef.current;
    
    // Calculate centered position
    const containerWidth = container.offsetWidth;
    const tabLeft = activeTab.offsetLeft;
    const tabWidth = activeTab.offsetWidth;
    const scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2);

    // Smooth scroll to center
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }
}, [activeIndex]);
```

### **Overflow Handling**

**Hidden Scrollbar** (all browsers):
```css
scrollbar-width: none; /* Firefox */
-ms-overflow-style: none; /* IE/Edge */

::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}
```

**Touch Scrolling**:
```css
-webkit-overflow-scrolling: touch;
scroll-behavior: smooth;
```

---

## Performance Considerations

### **Optimizations**
- ✅ `loading="lazy"` on preview images
- ✅ `draggable={false}` to prevent drag interference
- ✅ CSS transforms (GPU-accelerated)
- ✅ Minimal DOM updates (only active state changes)
- ✅ No carousel re-rendering on tab clicks

### **Bundle Size**
- **Component**: ~1.5KB (gzipped)
- **Styles**: ~2KB (gzipped)
- **Total Impact**: ~3.5KB

---

## User Experience

### **Visual Feedback**
1. **Click**: Tab scales up, neon glow intensifies
2. **Hover**: Slight opacity increase, subtle scale
3. **Active**: Full opacity, scale 1.05, bright neon border
4. **Transition**: Smooth 300ms ease-out

### **Navigation Flow**
```
User clicks tab 2
  ↓
onNavigate(2) called
  ↓
Carousel's goToSlide(2) executes
  ↓
Carousel transitions to slide 2
  ↓
currentIndex updates to 2
  ↓
Navigation receives activeIndex=2
  ↓
Tab 2 highlights, auto-scrolls to center
```

---

## Browser Compatibility

| Feature | Support |
|---------|---------|
| Framer Motion animations | Modern browsers (Chrome 91+, Firefox 90+, Safari 14+) |
| CSS Grid/Flexbox | All modern browsers |
| Hidden scrollbar | All browsers (with prefixes) |
| Smooth scroll | All modern browsers |
| CSS transforms | All browsers |

---

## Maintenance

### **Adding New Slides**
1. Add slide to `carousel.json`
2. Navigation automatically renders new tab
3. No code changes required

### **Styling Customization**
Edit classes in `globals.css`:
- Preview size: `.carousel-navigation-preview`
- Active colors: `.carousel-navigation-tab.active`
- Glow intensity: Box-shadow values
- Spacing: `.carousel-navigation-tabs` gap

### **Disabling Navigation**
Remove `<CarouselNavigation>` from `HeroCarousel.tsx`:
```tsx
// Comment out or remove this line:
<CarouselNavigation slides={slides} activeIndex={currentIndex} onNavigate={goToSlide} />
```

---

## Testing Checklist

- [x] ✅ Tabs display for all slides
- [x] ✅ Active tab highlights correctly
- [x] ✅ Clicking tab navigates carousel
- [x] ✅ Auto-play updates active tab
- [x] ✅ Manual navigation updates active tab
- [x] ✅ Keyboard navigation works
- [x] ✅ Auto-scroll keeps active tab visible
- [x] ✅ Hover effects work
- [x] ✅ Responsive on mobile
- [x] ✅ Scrollbar hidden
- [x] ✅ Reduced motion respected
- [x] ✅ Screen reader accessible

---

## Future Enhancements

### **Potential Additions**
- [ ] Touch swipe navigation on tabs
- [ ] Configurable preview size
- [ ] Alternative layouts (vertical, grid)
- [ ] Progress indicator on active tab
- [ ] Lazy load preview images
- [ ] Custom preview thumbnails (different from main image)
- [ ] Animated transitions between tab states

### **Configuration Options** (if needed)
```typescript
interface NavigationConfig {
  showTitles?: boolean;        // Toggle slide titles
  previewSize?: 'sm' | 'md' | 'lg';
  position?: 'bottom' | 'top' | 'side';
  autoScroll?: boolean;        // Toggle auto-centering
  showIndicator?: boolean;     // Toggle neon border
}
```

---

## Related Documentation

- [Carousel Specification](./spec.md)
- [Design System](./design-system.md)
- [Quickstart Guide](./quickstart.md)
- [Implementation Tasks](./tasks.md)

---

**Last Updated**: 2026-01-29  
**Maintained By**: AI Landing Project Team
