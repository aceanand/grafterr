# Grafterr Landing Page

**Stack: React (Option B)**

---

## Setup Instructions

### Prerequisites
- Node.js 18+ or Bun

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Chosen Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 19 + TypeScript | Functional components, hooks, strong typing |
| Build tool | Vite | Fast HMR, native ESM |
| Routing | TanStack Router | File-based routing with type safety |
| Styling | CSS Modules | Scoped styles, no framework, matches requirement |
| Fonts | Inter (Google Fonts) | Matches Figma specification |
| Animations | CSS keyframes + IntersectionObserver | No extra dependencies |

**Prohibited items confirmed absent:**
- ✅ No Tailwind / Bootstrap / Bulma
- ✅ No class components
- ✅ No jQuery
- ✅ No hardcoded text in JSX (all content from `content.json`)

---

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── GradientText.tsx        # Gradient text span
│   │   ├── GradientButton.tsx      # CTA button with gradient bg
│   │   ├── ProductCard.tsx         # Title above + image card
│   │   ├── AppCarousel.tsx         # Carousel with arrows + touch
│   │   ├── FloatingShape.tsx       # Decorative teal/coral shapes
│   │   └── AppSkeleton.tsx         # Shimmer skeleton block
│   └── sections/
│       ├── HeroSection.tsx         # Hero with headline + CTA
│       ├── FeaturesSection.tsx     # Features header + carousel
│       ├── LandingSkeleton.tsx     # Full-page loading skeleton
│       └── ErrorState.tsx          # Error message + retry button
├── hooks/
│   ├── useContent.ts               # Data fetching hook (loading/success/error)
│   └── useCarousel.ts              # Carousel index + touch swipe logic
├── services/
│   └── api.ts                      # fetchHeroContent(), fetchFeaturesContent()
├── data/
│   └── content.json                # All page content (no hardcoded text in JSX)
└── styles/
    ├── variables.css               # Design tokens (colors, fonts, spacing)
    ├── animations.css              # Keyframe animations
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

**`useContent`** — manages the full async lifecycle:
```
loading → success (fade in content)
loading → error  (show retry button)
```
Uses `useState`, `useEffect`, `useCallback` with clean dependency arrays.

**`useCarousel`** — encapsulates all carousel logic:
- Index state with boundary clamping
- `next()` / `prev()` / `goTo()` via `useCallback`
- Touch swipe detection (40px threshold) via `useRef`

### Component Composition
Small, single-responsibility components composed together:
- `GradientText` wraps any text in the brand gradient
- `GradientButton` renders as `<button>` or `<a>` via the `as` prop
- `FloatingShape` renders teal/coral decorative shapes from CSS only
- `ProductCard` = title label + image card (title sits above the card per Figma)
- `Carousel` consumes `useCarousel` + renders `ProductCard` list + arrow controls

### Loading States
While the simulated API resolves (1–1.5s):
- Skeleton placeholders shown for hero text lines and 3 card blocks
- Shimmer animation via CSS `background-position` keyframe
- Content fades in via CSS `animation: fade-in` on mount

### Error State
- Displays the error message
- "Try again" button re-triggers `useContent`'s `load` callback

### Carousel Behaviour

| Breakpoint | Items visible | Behaviour |
|---|---|---|
| Mobile `< 768px` | 1 | Touch swipe enabled |
| Tablet `768–1023px` | 2 | Arrow navigation |
| Desktop `≥ 1024px` | 3 | Arrow navigation |

- 300ms smooth CSS transition (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`)
- Arrows disabled at boundaries (first/last slide)
- Pixel-accurate translation via `offsetWidth` measurement (`useRef`)

### Responsive Design
- Mobile-first CSS with `min-width` breakpoints at 768px and 1024px
- `clamp()` for fluid typography
- Floating shapes hidden on mobile (`max-width: 640px`)

---

## Visual Comparison

### Hero Section

| Figma | Implementation |
|---|---|
| "Looking for a new" plain text, "technology provider?" full gradient | ✅ Matched |
| Gradient: `linear-gradient(90deg, #3B82F6, #F97316)` | ✅ Matched |
| Teal circle shape left, coral rectangle shape right | ✅ Matched |
| Pill CTA button with gradient background | ✅ Matched |
| "success stories" bolded in subheadline | ✅ Matched |

### Features Section

| Figma | Implementation |
|---|---|
| "Grafterr" in gradient, rest of headline in dark | ✅ Matched |
| Subtitle with purple/blue border box | ✅ Matched |
| Divider: wide light line + short dark center segment | ✅ Matched |
| Teal teardrop shape top-left, red triangle top-right | ✅ Matched |
| Product title ABOVE the card (not inside) | ✅ Matched |
| Image fills full card with `object-fit: cover` | ✅ Matched |
| Circular arrow buttons centered below carousel | ✅ Matched |

---

## Assumptions

1. No Figma file was directly accessible — design values extracted from the provided screenshots.
2. Font is **Inter** (confirmed from visual inspection; Figma likely specifies Inter).
3. Gradient: `linear-gradient(90deg, #3B82F6 0%, #F97316 100%)` — matches the blue-to-orange seen in screenshots.
4. The subtitle purple border color is approximately `#7c3aed` (violet-700) based on the screenshot.
5. The 5-product dataset in `content.json` exceeds the 3 required products — the carousel handles any number gracefully, showing only 3 at a time on desktop.
6. Navigation bar is defined in `content.json` (as required by the spec) but not rendered as a visible nav — the spec only required the data structure, not a rendered nav component.

---

## Live URL

> _Add your deployed URL here after deployment (e.g. Cloudflare Pages, Vercel, Netlify)._

```
https://your-deployment-url.pages.dev
```

### Deploy to Cloudflare Pages

```bash
npm run build
# Then connect your GitHub repo to Cloudflare Pages
# Build command: npm run build
# Output directory: dist
```

---

## Priority Order (as specified)

1. ✅ Desktop pixel perfection
2. ✅ Dynamic data implementation (all content from JSON via simulated API)
3. ✅ Responsive behaviour (mobile 1 / tablet 2 / desktop 3 cards)
4. ✅ Polish and animations (fade-in, skeleton shimmer, hover states)
