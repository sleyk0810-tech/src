# 🎬 SRC Sports Academy - Premium Animation System

A comprehensive guide to all the advanced animations integrated into your website using GSAP 3.12.2 and Vanilla Tilt.

---

## 📦 Animation Features Implemented

### 1. **Scroll Progress Indicator** 
- **What it does**: A glowing progress bar at the top of the page showing how far down the user has scrolled
- **Effect**: Gradient color from orange to soft orange with pulsing glow animation
- **Where it appears**: Fixed at the top of every page
- **Trigger**: Automatic on every page load

### 2. **Floating Elements Movement** ✨
- **What it does**: Cards and elements gently float up and down while also rotating slightly
- **Applied to**: `.sport-card`, `.stat-card`, `.highlight-card`, `.testimonial-card`, `.faq-card`
- **Animation**: Staggered entrance with continuous floating motion
- **Duration**: Repeat infinitely with yoyo effect
- **Trigger**: When element comes into view (80% from top)

### 3. **Section Zoom-In Transitions** 📈
- **What it does**: Sections smoothly scale up from 95% to 100% while fading in
- **Applied to**: All `<section>` elements on the page
- **Duration**: 1 second with power3.out easing
- **Effect**: Creates a sense of content flowing into view as you scroll
- **Trigger**: When section reaches 70% from top

### 4. **Cards Slide In Staggered** 🎯
- **Sport Cards**: Slide in from the LEFT with staggered timing
- **Highlight Cards**: Slide in from the RIGHT with staggered timing
- **Delay**: Each card has a 0.15s delay from the previous one
- **Duration**: 0.8 seconds per card
- **Easing**: power3.out for smooth deceleration

### 5. **Text Typing Animation** ⌨️
- **What it does**: Headlines and hero text appear as if being typed character by character
- **Applied to**: `<h1>`, `<h2>`, `.hero-copy p`
- **Speed**: Adjusted based on text length
- **Trigger**: When text element enters viewport
- **Effect**: Creates engaging entrance for key messaging

### 6. **3D Tilt on Hover** 🎮
- **Library**: Vanilla Tilt 1.8.0
- **Applied to**: `.sport-card`, `.stat-card`, `.highlight-card`
- **Settings**:
  - Max tilt: 15 degrees
  - Speed: 400ms
  - Scale on hover: 1.05 (5% larger)
  - Smooth transitions enabled
- **Effect**: Realistic 3D perspective tilt that follows mouse position

### 7. **Parallax Scroll Effect** 🌌
- **What it does**: Elements with `data-parallax` attribute move at different speeds than scroll
- **Usage**: Add `data-parallax` attribute to any element
- **Speed**: Moves 100px while scrolling much further
- **Effect**: Creates depth and layered visual effect

### 8. **Animated Counters** 🔢
- **What it does**: Numbers count up from 0 to target value when scrolling into view
- **Usage**: Add `data-counter="[NUMBER]"` to any element
- **Duration**: 2 seconds per counter
- **Example**: `<span data-counter="50">50+</span>`
- **Easing**: power3.out for smooth counting

### 9. **Button Hover Animations** 🔘
- **Applied to**: `.cta`, `.track-btn`, `.highlight-btn`, `button[type="submit"]`
- **Hover Effects**:
  - Scale up to 108% (1.08x)
  - Enhanced shadow glow effect
  - Smooth 0.3s transition
- **Trigger**: On mouseenter/mouseleave events

### 10. **Smooth Scroll to Anchor Links** 🔗
- **What it does**: When clicking anchor links (#), page smoothly scrolls to target
- **Duration**: 1 second
- **Easing**: power3.inOut
- **Behavior**: Works with all `<a href="#...">` links
- **Applied to**: Internal page links automatically

### 11. **Page Load Entrance Animation** 🎪
- **What it does**: Coordinated animations when page first loads
- **Sequence**:
  1. Header slides down from top (0.6s)
  2. Hero section fades in and scales up (0.8s, starts at 0.2s)
  3. Hero content fades in from bottom (0.8s, starts at 0.3s)
- **Total Animation Time**: ~1.1 seconds

### 12. **Text Block Reveal** 📝
- **Applied to**: `<p>`, `.description`, `.content-text`
- **Effect**: Paragraphs fade in while sliding up slightly
- **Duration**: 0.7 seconds
- **Trigger**: When element reaches 90% from top
- **Easing**: power3.out

### 13. **Scroll Trigger Refresh** 🔄
- **What it does**: Automatically refreshes all animations when window is resized
- **Purpose**: Ensures animations work correctly on responsive breakpoints
- **Trigger**: Window resize event

---

## 🛠️ How to Use

### Basic Usage - No Code Required
Most animations work automatically on elements with these classes:
```
.sport-card
.stat-card
.highlight-card
.testimonial-card
.faq-card
section
h1, h2
p
```

### Add Counter Animation
```html
<span data-counter="100">100+</span>
```

### Add Parallax Effect
```html
<div data-parallax>
  <!-- This element will have parallax effect -->
</div>
```

### Add 3D Tilt to Custom Element
Add this class: `class="sport-card"`
or
Add to any card-like element and it will get the tilt effect

### Smooth Scroll Link
```html
<a href="#section-id">Jump to Section</a>

<section id="section-id">
  <!-- Content -->
</section>
```

---

## 🎨 Customization

### Edit Animation Speed
Open `app.js` and find the animation you want to change. Look for `duration` property:

```javascript
// Example: Change section zoom speed from 1 second to 2 seconds
duration: 2,  // Change this number (in seconds)
```

### Edit Animation Easing
Change `ease` property to one of these options:
- `power1.out`, `power2.out`, `power3.out`, `power4.out` - Recommended for most animations
- `back.out` - Bouncy effect
- `elastic.out` - Spring-like effect
- `sine.inOut` - Smooth and subtle
- [See all options](https://gsap.com/docs/v3/Eases)

### Adjust Floating Speed
```javascript
// Find the floating animation section (line ~150 in app.js)
duration: 4 + Math.random() * 2,  // Change the numbers
```

### Edit Scroll Progress Bar Color
```css
/* In index.css, find #scroll-progress-bar */
background: linear-gradient(90deg, #ff6b35, #ff9f6b, #ff6b35);
/* Change these hex colors */
```

---

## 📱 Browser Compatibility

✅ **Supported on**:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🚀 Performance Notes

- All animations use GPU acceleration (`will-change`, `transform-style: preserve-3d`)
- Animations are optimized and don't block page interaction
- Scroll animations only trigger when elements are visible
- Total animation library size: ~50KB (GSAP + plugins + Vanilla Tilt)

---

## 🔌 Dependencies

1. **jQuery** 3.6.0 - For utility functions
2. **GSAP 3.12.2** - Main animation engine
   - ScrollTrigger plugin - Scroll-based animations
   - ScrollToPlugin - Smooth scrolling
   - TextPlugin - Text animations
3. **Vanilla Tilt 1.8.0** - 3D tilt effects

All loaded from CDN for reliability and performance.

---

## 🎓 Learning Resources

- [GSAP Docs](https://gsap.com/docs/v3/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Vanilla Tilt Docs](https://micku7zu.github.io/vanilla-tilt.js/)

---

## 📊 Animation Library Statistics

| Feature | Type | Library | Duration |
|---------|------|---------|----------|
| Scroll Progress | Visual Indicator | GSAP | Real-time |
| Floating Elements | Movement | GSAP | Infinite |
| Section Zoom | Entrance | GSAP | 1s |
| Card Slide | Entrance | GSAP | 0.8s (staggered) |
| Text Typing | Entrance | GSAP TextPlugin | Variable |
| 3D Tilt | Interactive | Vanilla Tilt | 400ms |
| Parallax | Scroll-based | GSAP | Variable |
| Counter | Number Animation | GSAP | 2s |
| Button Hover | Interactive | GSAP | 0.3s |
| Smooth Scroll | Navigation | GSAP ScrollToPlugin | 1s |
| Page Load | Sequence | GSAP Timeline | 1.1s |
| Text Reveal | Entrance | GSAP | 0.7s |

---

## ⚡ Troubleshooting

**Animations not working?**
1. Check browser console for errors (F12)
2. Verify GSAP library is loaded (should see it in Network tab)
3. Clear browser cache and reload
4. Check that elements have correct class names

**Performance issues?**
1. Disable parallax effect if on slow device
2. Reduce number of animated elements
3. Use `transform` and `opacity` only (fastest properties)

**3D Tilt not working?**
1. Verify Vanilla Tilt library is loaded
2. Check element has correct class (`.sport-card`, etc.)
3. Try adding `data-tilt` attribute manually

---

## 📝 Version Info

- Animation System Version: 1.0
- Last Updated: April 2026
- GSAP Version: 3.12.2
- Vanilla Tilt Version: 1.8.0

---

**Enjoy your smooth, professional animations! 🎉**
