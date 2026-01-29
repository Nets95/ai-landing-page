# Hero Section Viewport Height System

**Feature**: Full viewport height calculation for hero section  
**Date**: 2026-01-29  
**Status**: ✅ Implemented

---

## Overview

The hero section now precisely occupies **100vh** (full viewport height) across all devices by calculating the exact heights of all components and dynamically adjusting the carousel height.

---

## Height Breakdown

### **Desktop (>768px)**

```
┌─────────────────────────────────┐
│ Fixed Header (overlays)         │ 80px (fixed, absolute)
├─────────────────────────────────┤
│ Hero Section = 100vh             │
│  ┌───────────────────────────┐  │
│  │ Carousel Slides           │  │ calc(100vh - 180px - 70px)
│  │ (dynamic height)          │  │ = calc(100vh - 250px)
│  │                           │  │
│  │ [Images + Text]           │  │
│  │                           │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ Navigation Tabs           │  │ 180px (fixed)
│  │ [▢] [▢] [▢]              │  │ - 100px preview
│  │ Title  Title  Title       │  │ - 32px title
│  └───────────────────────────┘  │ - 48px padding
│  ┌───────────────────────────┐  │
│  │ ↓ Scroll Indicator        │  │ 70px (fixed)
│  └───────────────────────────┘  │
└─────────────────────────────────┘
TOTAL = 100vh ✓
```

### **Tablet (≤768px)**

```
┌─────────────────────────────────┐
│ Fixed Header                     │ 80px
├─────────────────────────────────┤
│ Hero Section = 100vh             │
│  ┌───────────────────────────┐  │
│  │ Carousel Slides           │  │ calc(100vh - 160px - 60px)
│  │                           │  │ = calc(100vh - 220px)
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ Navigation Tabs           │  │ 160px (adjusted)
│  │ [▢] [▢] [▢]              │  │ - 84px preview
│  └───────────────────────────┘  │ - 40px title + padding
│  ┌───────────────────────────┐  │
│  │ ↓ Scroll                  │  │ 60px (adjusted)
│  └───────────────────────────┘  │
└─────────────────────────────────┘
TOTAL = 100vh ✓
```

### **Mobile (≤480px)**

```
┌─────────────────────────────────┐
│ Fixed Header                     │ 80px
├─────────────────────────────────┤
│ Hero Section = 100vh             │
│  ┌───────────────────────────┐  │
│  │ Carousel Slides           │  │ calc(100vh - 140px - 50px)
│  │                           │  │ = calc(100vh - 190px)
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ Nav Tabs                  │  │ 140px (compact)
│  │ [▢] [▢] [▢]              │  │ - 68px preview
│  └───────────────────────────┘  │ - 36px title + padding
│  ┌───────────────────────────┐  │
│  │ ↓ Scroll                  │  │ 50px (compact)
│  └───────────────────────────┘  │
└─────────────────────────────────┘
TOTAL = 100vh ✓
```

---

## Component Heights

| Component | Desktop | Tablet | Mobile | Notes |
|-----------|---------|--------|--------|-------|
| **Header** | 80px | 80px | 80px | Fixed, overlays content |
| **Hero Section** | 100vh | 100vh | 100vh | Full viewport |
| **Carousel Slides** | calc(100vh - 250px) | calc(100vh - 220px) | calc(100vh - 190px) | Dynamic |
| **Navigation Tabs** | 180px | 160px | 140px | Fixed per breakpoint |
| **Scroll Indicator** | 70px | 60px | 50px | Fixed per breakpoint |

---

## Implementation Details

### **1. Hero Section Container**

**File**: `src/components/sections/Hero.tsx`

```tsx
<section
  id="hero"
  style={{ 
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }}
>
  <div className="relative w-full flex-1" style={{ minHeight: 0 }}>
    <HeroCarousel />
  </div>
  <div className="hero-scroll-indicator">
    {/* Scroll indicator */}
  </div>
</section>
```

**Key Points**:
- `height: 100vh` - Full viewport height
- `display: flex` + `flexDirection: column` - Vertical stacking
- `flex-1` on carousel container - Takes remaining space
- `minHeight: 0` - Prevents flex item from overflowing

---

### **2. Carousel Component**

**File**: `src/components/sections/HeroCarousel.tsx`

```tsx
<div className="w-full h-full flex flex-col">
  <div className="hero-carousel-container">
    {/* Slides */}
  </div>
  <CarouselNavigation />
</div>
```

**Key Points**:
- Wrapper uses `h-full` to fill parent
- `.hero-carousel-container` - Dynamic height via CSS
- Navigation uses fixed height (CSS controlled)

---

### **3. CSS Height System**

**File**: `src/app/globals.css`

#### Navigation Container Heights

```css
.carousel-navigation-container {
  height: 180px; /* Desktop */
}

@media (max-width: 768px) {
  .carousel-navigation-container {
    height: 160px; /* Tablet */
  }
}

@media (max-width: 480px) {
  .carousel-navigation-container {
    height: 140px; /* Mobile */
  }
}
```

#### Carousel Slide Heights

```css
.hero-carousel-container {
  height: calc(100% - 180px); /* Desktop */
}

@media (max-width: 768px) {
  .hero-carousel-container {
    height: calc(100% - 160px); /* Tablet */
  }
}

@media (max-width: 480px) {
  .hero-carousel-container {
    height: calc(100% - 140px); /* Mobile */
  }
}
```

#### Scroll Indicator Heights

```css
.hero-scroll-indicator {
  height: 70px; /* Desktop */
}

@media (max-width: 768px) {
  .hero-scroll-indicator {
    height: 60px; /* Tablet */
  }
}

@media (max-width: 480px) {
  .hero-scroll-indicator {
    height: 50px; /* Mobile */
  }
}
```

---

## Calculation Examples

### **Desktop Calculation**

```
Available height: 100vh
- Navigation:     180px
- Scroll:          70px
─────────────────────────
Carousel height:  calc(100vh - 250px)

Example @ 1080px viewport:
- Carousel:       830px (1080 - 250)
- Navigation:     180px
- Scroll:          70px
─────────────────────────
Total:            1080px ✓
```

### **Tablet Calculation**

```
Available height: 100vh
- Navigation:     160px
- Scroll:          60px
─────────────────────────
Carousel height:  calc(100vh - 220px)

Example @ 1024px viewport:
- Carousel:       804px (1024 - 220)
- Navigation:     160px
- Scroll:          60px
─────────────────────────
Total:            1024px ✓
```

### **Mobile Calculation**

```
Available height: 100vh
- Navigation:     140px
- Scroll:          50px
─────────────────────────
Carousel height:  calc(100vh - 190px)

Example @ 812px viewport (iPhone 13 Pro):
- Carousel:       622px (812 - 190)
- Navigation:     140px
- Scroll:          50px
─────────────────────────
Total:            812px ✓
```

---

## Browser Compatibility

### **CSS calc() Support**
✅ All modern browsers (Chrome, Firefox, Safari, Edge)

### **Flexbox Support**
✅ All modern browsers

### **vh Units**
✅ All modern browsers
⚠️ Mobile browsers may have issues with address bar (handled by `100vh`)

### **Mobile Safari Address Bar**
The address bar in mobile Safari can cause viewport issues:
- **Initial load**: 100vh includes address bar
- **Scrolling**: Address bar hides, viewport expands
- **Solution**: CSS `100vh` adapts automatically

---

## Testing Checklist

- [x] ✅ Desktop (1920×1080): Hero section = 100vh
- [x] ✅ Laptop (1440×900): Hero section = 100vh
- [x] ✅ Tablet Portrait (768×1024): Hero section = 100vh
- [x] ✅ Tablet Landscape (1024×768): Hero section = 100vh
- [x] ✅ Mobile Portrait (375×812): Hero section = 100vh
- [x] ✅ Mobile Landscape (812×375): Hero section adapts
- [x] ✅ No content overflow
- [x] ✅ No scrollbar on hero section
- [x] ✅ Navigation tabs fully visible
- [x] ✅ Scroll indicator visible
- [x] ✅ Carousel images maintain aspect ratio

---

## Advantages of This System

### **1. Predictable Layout**
- Always uses exactly 100vh
- No surprises across devices
- Consistent user experience

### **2. Responsive**
- Adapts to all screen sizes
- Optimized heights per breakpoint
- No wasted space

### **3. Maintainable**
- Centralized height definitions in CSS
- Easy to adjust per breakpoint
- Clear calculation logic

### **4. Performance**
- Pure CSS calculations
- No JavaScript required
- GPU-accelerated

### **5. Accessibility**
- Maintains content visibility
- No overflow issues
- Touch-friendly on mobile

---

## Adjusting Heights

### **To Change Navigation Height**

1. Update preview sizes in CSS:
```css
.carousel-navigation-preview {
  width: 180px;   /* Current */
  height: 100px;  /* Current */
}
```

2. Update container height:
```css
.carousel-navigation-container {
  height: 180px;  /* Adjust to match new content */
}
```

3. Update carousel calculation:
```css
.hero-carousel-container {
  height: calc(100% - 180px);  /* Use new container height */
}
```

### **To Change Scroll Indicator Height**

```css
.hero-scroll-indicator {
  height: 70px;  /* Adjust as needed */
}
```

Note: Carousel auto-adjusts via flexbox, no recalculation needed!

---

## Edge Cases Handled

### **Very Short Viewports** (e.g., 600px height)
- Carousel may be compressed
- Navigation and scroll maintain minimum sizes
- Content remains accessible

### **Very Tall Viewports** (e.g., 2160px height)
- Carousel expands to fill space
- Image scaling maintains quality
- Navigation remains proportional

### **Browser Zoom**
- All calculations scale proportionally
- Layout remains intact
- No overflow issues

### **Mobile Keyboard Visible**
- Viewport height adjusts
- Hero section resizes accordingly
- No content cut-off

---

## Related Files

- `src/components/sections/Hero.tsx` - Main hero section container
- `src/components/sections/HeroCarousel.tsx` - Carousel wrapper
- `src/components/ui/CarouselNavigation.tsx` - Navigation tabs
- `src/app/globals.css` - Height calculations and responsive styles

---

**Last Updated**: 2026-01-29  
**Maintained By**: AI Landing Project Team
