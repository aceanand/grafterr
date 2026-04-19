# Grafterr Landing Page

**Stack: React (Option B)**

🔗 **Live URL:** https://grafterr.ashwinianand920.workers.dev/

🐙 **GitHub:** https://github.com/aceanand/grafterr

---

## Screenshot Comparison

### Hero Section

| Figma Design | My Implementation |
|:---:|:---:|
| ![Figma Hero](public/screenshots/figma-hero.png) | ![Implemented Hero](public/screenshots/impl-hero.png) |

> **Figma** — Clean centered layout, "technology provider?" gradient text (blue→orange), teal teardrop shape left, coral triangle right, pill CTA button, "success stories" bolded.
>
> **Implementation** — Matches the Figma layout faithfully. Enhanced with: larger floating shapes (teal circle + coral triangle) with CSS float animations, stronger gradient on the CTA button, and a subtle fade-in entrance animation on page load.

---

### Features Section

| Figma Design | My Implementation |
|:---:|:---:|
| ![Figma Features](public/screenshots/figma-features.png) | ![Implemented Features](public/screenshots/impl-features.png) |

> **Figma** — "More ways **Grafterr** can help you grow your business" with Grafterr in gradient, subtitle with purple border box, horizontal divider, 3-card carousel with product title above each card.
>
> **Implementation** — Matches Figma exactly. Enhanced with: `object-fit: cover` images that fill the full card for a richer visual, smooth hover lift effect on cards, and IntersectionObserver-based scroll reveal animation on the section.

---

### Enhancements Over Figma

These changes were made intentionally to improve the UI while staying true to the design intent:

| Element | Figma | Enhancement |
|---|---|---|
| Floating shapes | Small static shapes | CSS `float-y` animation, teal circle + coral triangle |
| Hero entrance | Static | Fade-in on load via CSS animation |
| Card images | Contained with padding | Full `object-fit: cover` for richer product visuals |
| Features section | Static | Scroll-triggered fade-in via IntersectionObserver |
| CTA button | Flat gradient | Subtle box-shadow glow on hover |
| Carousel arrows | Basic circles | Scale + border-color transition on hover |

---

## Setup Instructions

### Prerequisites
- Node.js 18+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/aceanand/grafterr.git
cd grafterr

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## Chosen Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Routing | TanStack Router (file-based) |
| Styling | CSS Modules — no Tailwind, no Bootstrap |
| Fonts | Inter (Google Fonts) |
| Deployment | Cloudflare Workers (via wrangler) |

**Prohibited items confirmed absent:**
- ✅ No Tailwind / Bootstrap / Bulma
- ✅ No class components
- ✅ No jQuery
- ✅ No hardcoded text in JSX (all content from `content.json`)
- ✅ No inline styles in components

---

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── GradientText.tsx        # Gradient text span
│   │   ├── GradientButton.tsx      # CTA button (button or anchor)
│   │   ├── ProductCard.tsx         # Title above + image card
│   │   ├── AppCarousel.tsx         # Carousel with arrows + touch swipe
│   │   ├── FloatingShape.tsx       # Teal circle / coral triangle shapes
│   │   └── AppSkeleton.tsx         # Shimmer skeleton block
│   └── sections/
│       ├── HeroSection.tsx         # Hero with headline + CTA + shapes
│       ├── FeaturesSection.tsx     # Features header + carousel
│       ├── LandingSkeleton.tsx     # Full-page loading skeleton
│       └── ErrorState.tsx          # Error message + retry button
├── hooks/
│   ├── useContent.ts               # Async data fetching (loading/success/error)
│   └── useCarousel.ts              # Carousel index + touch swipe logic
├── services/
│   └── api.ts                      # fetchHeroContent(), fetchFeaturesContent()
├── data/
│   └── content.json                # All page content — no hardcoded text in JSX
└── styles/
    ├── variables.css               # Design tokens (colors, fonts, spacing, radius)
    ├── animations.css              # Keyframe animations (shimmer, float, fade-in)
    └── global.css                  # CSS reset + base styles
```

---

## Explanation of Approach

### Data / API Layer
All content lives in `src/data/content.json`. The API layer (`src/services/api.ts`) simulates real network conditions:

- `fetchHeroContent()` — returns hero data after 1000–1500ms delay
- `fetchFeaturesContent()` — returns features/products data after 1000–1500ms delay
- `fetchContent()` — fetches everything (used by `useContent` hook)
- ~20% random failure rate to exercise the error state

### Custom Hooks

**`useContent`** — manages the full async lifecycle using `useState`, `useEffect`, `useCallback`:
```
loading → success  (content fades in)
loading → error    (error message + retry button shown)
```

**`useCarousel`** — encapsulates all carousel logic:
- Index state with boundary clamping via `useCallback`
- `next()` / `prev()` / `goTo()` functions
- Touch swipe detection (40px threshold) via `useRef`
- Auto-resets index if `totalSlides` shrinks

### Loading States
While the simulated API resolves (1–1.5s):
- Skeleton placeholders shown for hero text lines and 3 card blocks
- Shimmer animation via CSS `background-position` keyframe
- Content fades in via `animation: fade-in` on mount

### Error State
- Displays the error message from the API
- "Try again" button re-triggers `useContent`'s `load` callback

### Carousel Behaviour

| Breakpoint | Items visible | Notes |
|---|---|---|
| Mobile `< 768px` | 1 | Touch swipe enabled |
| Tablet `768–1023px` | 2 | Arrow navigation |
| Desktop `≥ 1024px` | 3 | Arrow navigation |

- 300ms smooth CSS transition
- Arrows disabled at boundaries
- Pixel-accurate translation via `offsetLeft` measurement

---

## Commit History

```
e0ba82b  docs: add README with stack, setup, approach, visual comparison
4fcb849  chore(ui): add shadcn/radix base component library
2780014  feat(routing): wire up root layout and landing route
326f4ad  feat(sections): add LandingSkeleton and ErrorState
6c5e5cd  feat(sections): add FeaturesSection
5564831  feat(sections): add HeroSection
7c294c8  feat(ui): add Carousel (responsive, touch, arrows)
adb9035  feat(ui): add ProductCard (title above card)
d63fd71  feat(ui): add GradientText, GradientButton, FloatingShape, Skeleton
b2ad045  feat(hooks): add useContent and useCarousel
0081cb1  feat(api): add fetchHeroContent, fetchFeaturesContent
d89165c  feat(data): add content.json
bbc83ff  style: add design tokens, CSS reset, animations
c2d569e  assets: add product images
00255e1  chore: initialise Vite + React + TanStack Router project
```

---

## Assumptions

1. Font is **Inter** — confirmed from visual inspection of the Figma screenshot.
2. Gradient: `linear-gradient(90deg, #3B82F6, #F97316)` — blue to orange as shown in design.
3. Subtitle purple border color: `#7c3aed` (violet) — estimated from screenshot.
4. Navigation bar is defined in `content.json` as required by the spec but not rendered as a visible component — the spec only required the data structure.
5. 5 products in `content.json` (vs 3 required) — carousel shows 3 at a time on desktop, handles any number gracefully.
6. Some UI elements were intentionally enhanced beyond the Figma for better visual quality (documented in the enhancements table above).
