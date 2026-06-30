# performance.md — Eventizer Landing Page Performance

> Every rule in this file serves one goal: a landing page that loads fast, feels instant, and converts — on mobile networks in Tunisia, not just fiber in Paris.
>
> Targets are not aspirational. They are the minimum bar for launch.

---

## 1. Core Web Vitals targets

| Metric | Good | Needs improvement | Poor | Our target |
|---|---|---|---|---|
| **LCP** — Largest Contentful Paint | ≤ 2.5s | 2.5s – 4.0s | > 4.0s | **< 2.0s** |
| **CLS** — Cumulative Layout Shift | ≤ 0.1 | 0.1 – 0.25 | > 0.25 | **< 0.05** |
| **INP** — Interaction to Next Paint | ≤ 200ms | 200ms – 500ms | > 500ms | **< 150ms** |

> **Why stricter than "good"?** Tunisia's mobile-heavy B2B audience is on variable 4G. The "good" threshold is measured at P75 (75th percentile). Targeting 2.0s LCP means the median user gets ~1.5s — necessary headroom for slower connections.

> **Note:** FID is deprecated. INP replaced it as of March 2024. Never reference FID.

---

## 2. Lighthouse score targets

| Category | Target | Minimum for launch |
|---|---|---|
| Performance | ≥ 95 | 90 |
| Accessibility | ≥ 95 | 90 |
| Best Practices | ≥ 95 | 90 |
| SEO | ≥ 98 | 95 |

Run Lighthouse in **CI mode** (not DevTools — throttling differs). Use `@lhci/cli` in the deploy pipeline.

---

## 3. LCP — what it is and how to own it

**What Google measures:** Time from navigation start to when the largest visible element is fully rendered. On this page, the LCP element will almost certainly be the **hero image or hero headline**.

### 3.1 Hero image — the single most important optimization

```tsx
// ✅ Correct — priority tells Next.js to preload this image
<Image
  src="/images/hero/hero-equipe-eventizer.jpg"
  alt="Équipe Eventizer lors d'un congrès scientifique professionnel à Tunis"
  width={1200}
  height={800}
  priority          // ← generates <link rel="preload"> in <head>
  quality={85}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
/>

// ❌ Wrong — lazy loads the hero, delays LCP by 1–2s
<Image src="..." priority={false} loading="lazy" />
```

**Rule:** `priority` prop on the hero image ONLY. One image per page can use `priority`. Using it on multiple images defeats the purpose.

### 3.2 Hero image file specs

| Property | Requirement |
|---|---|
| Format | WebP (Next.js auto-converts via `next/image`) |
| Source format | JPEG or PNG (upload originals, let Next.js convert) |
| Max dimensions | 1400px wide (original), 800px tall |
| Max file size (original) | ≤ 500KB |
| Expected output (WebP) | ≤ 120KB at `quality={85}` |
| Aspect ratio | 16:9 or 3:2 — consistent |

### 3.3 Preconnect for external resources

Add to `layout.tsx` `<head>` — before any font or image requests:

```html
<!-- Font CDN preconnect (if using CDN) -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

<!-- If loading any external resource in the hero -->
<link rel="preconnect" href="https://cdn.eventizer.tn" crossOrigin="anonymous" />
```

**Rule:** Preconnect only to origins used in the first viewport. More than 3–4 preconnects adds overhead.

### 3.4 No render-blocking resources above the fold

```tsx
// ✅ GA4 — loads after page is interactive, never blocks render
<Script src="https://www.googletagmanager.com/gtag/js" strategy="afterInteractive" />

// ❌ Never load third-party scripts with strategy="beforeInteractive" unless absolutely required
```

---

## 4. CLS — preventing layout shift

CLS occurs when elements move after initial render. Every image, font, and dynamic element is a potential CLS source.

### 4.1 Images — always declare dimensions

```tsx
// ✅ Correct — browser reserves space before image loads
<Image src="..." width={800} height={533} alt="..." />

// ❌ Wrong — no dimensions = browser doesn't know height until image loads = shift
<Image src="..." alt="..." />
```

**Rule:** Every `<Image>` component must have explicit `width` and `height` props matching the intrinsic image dimensions (not the rendered size — `sizes` prop handles responsive rendering).

### 4.2 Fonts — prevent FOUT/FOIT causing layout shift

```css
/* globals.css — TT Norms Pro */
@font-face {
  font-family: 'TT Norms Pro';
  src: url('/fonts/TTNormsPro-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;    /* ← shows fallback immediately, swaps when loaded */
}

@font-face {
  font-family: 'TT Norms Pro';
  src: url('/fonts/TTNormsPro-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Mistrully';
  src: url('/fonts/Mistrully.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

**Font fallback stack** (reduces visual shift on swap):
```css
body {
  font-family: 'TT Norms Pro', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, sans-serif;
}
```

Choose a system fallback with similar metrics to TT Norms Pro to minimize reflow on font swap. Use `@font-face size-adjust`, `ascent-override`, `descent-override` if CLS from font swap exceeds 0.02.

### 4.3 Stats counter — reserve height before JS loads

The count-up animation must not cause layout shift. Reserve explicit height for the stats strip:

```tsx
// Stats section — fixed height prevents CLS during hydration
<section className="h-[120px] sm:h-[100px] flex items-center ...">
  {/* Count-up animation runs inside, never changes container height */}
</section>
```

### 4.4 Dynamic content — skeleton states

If any content loads asynchronously (e.g., contact form confirmation), use skeleton loaders with identical dimensions to the content that will replace them.

---

## 5. INP — keeping interactions fast

INP measures the time from user interaction (click, tap, keyboard) to the next visual update. Every event handler on the main thread is a risk.

### 5.1 Event handler rules

```tsx
// ✅ Lightweight handler — no heavy computation on click
const handleSubmit = async (data: FormData) => {
  setIsSubmitting(true);           // immediate UI feedback
  await sendEmail(data);           // async — doesn't block
  setIsSubmitting(false);
  setSubmitSuccess(true);
};

// ❌ Heavy synchronous work on click — blocks main thread
const handleSubmit = (data) => {
  const result = expensiveValidation(data);  // blocks for 300ms
  // ...
};
```

**Rule:** Any computation > 50ms goes in a `useEffect`, `setTimeout(0)`, or a Web Worker. Never block the main thread on a user interaction.

### 5.2 Count-up animation — use GSAP, not `requestAnimationFrame`

```ts
// ✅ GSAP number tween — precise, cancellable, ScrollTrigger-integrated
gsap.to(obj, {
  val: target,
  duration: 1.8,
  ease: 'power2.out',
  snap: { val: 1 },
  onUpdate() { el.textContent = obj.val.toLocaleString('fr-FR') + '+'; },
  scrollTrigger: { trigger: '.stats-section', start: 'top 80%', once: true },
});

// ❌ setInterval — unpredictable timing, can pile up, blocks INP
setInterval(() => { count += 1; }, 16);

// ❌ requestAnimationFrame manual loop — reinventing what GSAP already does better
const step = (now) => { /* ... */ requestAnimationFrame(step); };
```

### 5.3 CSS animations vs GSAP — what goes where

**Use GSAP for:** all scroll-triggered reveals, count-up, stagger sequences, tab transitions, parallax, timeline-based entrance animations.

**Use CSS for:** micro-interactions that don't depend on scroll — hover states, focus rings, button presses, the navbar background transition, the scroll-line indicator in the hero.

```css
/* ✅ CSS — hover lift on cards (no scroll dependency) */
.card:hover {
  transform: translateY(-4px);
  transition: transform 200ms ease-out;
}

/* ✅ CSS — navbar bg transition */
.navbar { transition: background-color 300ms ease; }

/* ❌ CSS — scroll reveal (use GSAP ScrollTrigger instead) */
.card { animation: fadeUp 0.5s ease forwards; }
```

**Rule for GSAP CSS animations:** Only animate `transform` and `opacity`. GSAP obeys this too — never tween `width`, `height`, `top`, `left`, `margin`, or `padding`.

### 5.4 `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable ALL transitions and animations */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// In count-up hook — skip animation, show final number immediately
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  el.textContent = target.toLocaleString('fr-FR') + '+';
  return;
}
```

---

## 6. JavaScript bundle

### 6.1 Bundle size targets

| Bundle | Max size (gzipped) |
|---|---|
| First Load JS (shared) | ≤ 105KB |
| Page chunk (`page.tsx`) | ≤ 30KB |
| Total First Load JS | ≤ 135KB |

> GSAP core + ScrollTrigger adds ≈ 24KB gzipped. The total budget is adjusted accordingly. Check after every build: `next build` reports per-route JS sizes.

### 6.2 What ships in the bundle

**Allowed:**
- React + React DOM (Next.js bundles these, can't avoid)
- React Hook Form (≈ 9KB gzipped) — only import what's used
- Zod (≈ 8KB gzipped) — schema validation
- **GSAP core + ScrollTrigger (≈ 24KB gzipped combined)** — import only used plugins via `lib/gsap.ts`
- Next.js router (shared, already included)

**Not allowed (causes bundle bloat):**
- Any other animation library (Framer Motion, Anime.js, AOS, etc.)
- Any icon library loaded in full — import only specific icons
- `lodash` in full — use native JS instead
- `moment.js` — not needed on this page
- Any UI component library — components come from Claude Design only

### 6.3 Tree-shaking — import only what you use

```tsx
// ✅ Named import — tree-shakeable
import { useForm } from 'react-hook-form';

// ❌ Default import of entire lib — ships everything
import RHF from 'react-hook-form';
```

### 6.4 Dynamic imports for below-fold components

Sections below the fold do not need to be in the initial JS bundle:

```tsx
// app/page.tsx
import dynamic from 'next/dynamic';

// Above fold — static import (immediate render)
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';

// Below fold — dynamic import (loaded on demand)
const Pillars = dynamic(() => import('@/components/sections/Pillars'));
const Platform = dynamic(() => import('@/components/sections/Platform'));
const CaseStudies = dynamic(() => import('@/components/sections/CaseStudies'));
const Team = dynamic(() => import('@/components/sections/Team'));
const WhyEventizer = dynamic(() => import('@/components/sections/WhyEventizer'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
```

---

## 7. Images — full strategy

### 7.1 Format and compression

| Image type | Original format | Output format | Max output size |
|---|---|---|---|
| Hero | JPEG | WebP (auto via next/image) | ≤ 120KB |
| Case study photos | JPEG | WebP | ≤ 80KB per card |
| Team headshots | JPEG or PNG | WebP | ≤ 40KB |
| OG image | JPEG | JPEG (social crawlers need it) | ≤ 300KB |
| Logo | SVG | SVG (inline or img tag) | ≤ 10KB |

### 7.2 `sizes` prop — responsive images

The `sizes` prop tells the browser which image size to download based on viewport. Without it, the browser downloads the largest size.

```tsx
// Hero — full-width on mobile, half-width on desktop
<Image
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
  ...
/>

// Case study card — full-width mobile, half-width on tablet, quarter on desktop
<Image
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  ...
/>

// Team headshot — small, fixed rendered size
<Image
  sizes="(max-width: 640px) 120px, 160px"
  ...
/>
```

### 7.3 Image dimensions reference

| Image | Width (px) | Height (px) | Aspect ratio |
|---|---|---|---|
| Hero | 1200 | 800 | 3:2 |
| Platform screenshot | 1100 | 700 | ~16:10 |
| Case study card | 800 | 500 | 16:10 |
| Team headshot | 400 | 400 | 1:1 |
| OG image | 1200 | 630 | ~19:10 |

### 7.4 `next/image` configuration

```js
// next.config.js
const nextConfig = {
  images: {
    formats: ['image/webp'],       // Force WebP output
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [120, 160, 400, 600, 800],
    minimumCacheTTL: 31536000,     // 1 year cache
  },
};
```

---

## 8. Fonts

### 8.1 File formats and hosting

Host fonts locally in `/public/fonts/` — no external font CDN requests. External font requests add 50–200ms of DNS + connection latency.

```
/public/fonts/
├── TTNormsPro-Regular.woff2
├── TTNormsPro-Bold.woff2
├── TTNormsPro-ExtraBold.woff2
└── Mistrully.woff2
```

### 8.2 Only load weights you use

| Font | Weights used | File |
|---|---|---|
| TT Norms Pro | 400 (Regular) | TTNormsPro-Regular.woff2 |
| TT Norms Pro | 700 (Bold) | TTNormsPro-Bold.woff2 |
| TT Norms Pro | 800 (ExtraBold) | TTNormsPro-ExtraBold.woff2 |
| Mistrully | 400 (Regular) — script display only | Mistrully.woff2 |

### 8.3 Subsetting

Strip unused characters to reduce font file size. Keep `latin` and `latin-ext` only (covers French characters: à, â, é, è, ê, ë, î, ï, ô, ù, û, ü, ç, œ, æ).

Use `fonttools` or `glyphhanger` to subset:
```bash
pyftsubset TTNormsPro-Regular.ttf \
  --output-file=TTNormsPro-Regular.woff2 \
  --flavor=woff2 \
  --unicodes="U+0000-024F,U+1E00-1EFF"
```

Expected output size after subsetting: ≤ 25KB per weight.

### 8.4 Preload critical fonts

Preload only the font used in the first viewport — Regular weight of TT Norms Pro:

```html
<!-- layout.tsx <head> -->
<link
  rel="preload"
  href="/fonts/TTNormsPro-Regular.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

Do not preload Mistrully or ExtraBold — they appear below the fold or in secondary text.

---

## 9. Caching strategy

### 9.1 Static assets — long cache

```js
// next.config.js headers
async headers() {
  return [
    {
      source: '/fonts/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/images/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/_next/static/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ];
},
```

### 9.2 HTML page — short cache + revalidation

```js
// For the landing page HTML — fresh for SEO but CDN-cached for speed
{
  source: '/',
  headers: [
    { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800' }
  ],
}
```

### 9.3 API route — no cache

```ts
// app/api/contact/route.ts
export async function POST(req: Request) {
  // ...
}

// Add to response headers
headers.set('Cache-Control', 'no-store');
```

---

## 10. Network — what ships over the wire

### 10.1 Total page weight budget

| Resource type | Budget |
|---|---|
| HTML | ≤ 30KB |
| CSS (initial) | ≤ 25KB |
| JS (First Load, gzipped) | ≤ 110KB |
| Hero image (WebP) | ≤ 120KB |
| Fonts (preloaded) | ≤ 25KB |
| **Total above-fold** | **≤ 310KB** |

Everything below the fold loads lazily — it does not count toward the above-fold budget.

### 10.2 Third-party scripts — what's allowed

| Script | Strategy | Reason |
|---|---|---|
| Google Analytics 4 | `afterInteractive` | Never blocks render |
| Any chat widget (future) | `lazyOnload` | Not in v1 |
| WhatsApp widget (if used) | `lazyOnload` or static link | Prefer static `<a href="https://wa.me/...">` — no JS needed |

**Rule:** No script uses `strategy="beforeInteractive"` unless it is literally required before any HTML renders. In practice, nothing on this landing page qualifies.

---

## 11. `next.config.js` — complete performance configuration

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output static HTML for maximum performance
  output: 'export',  // Use only if no server-side features needed
                     // Remove if API route (contact form) is needed — use 'standalone' instead

  // Image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [120, 160, 400, 600, 800],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
  },

  // Compression
  compress: true,

  // Strict mode for catching issues early
  reactStrictMode: true,

  // Security + cache headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Redirects — enforce www or non-www
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'eventizer.tn' }],
        destination: 'https://www.eventizer.tn/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

> **Note on `output: 'export'`:** If using the API route for the contact form (recommended), remove `output: 'export'` and use Vercel's serverless functions. The contact form `POST /api/contact` cannot run in static export mode.

---

## 12. Scroll and IntersectionObserver

Use IntersectionObserver for:
1. Count-up animation trigger (Stats section)
2. Active nav link highlighting
3. Lazy reveal animations on below-fold sections

```tsx
// hooks/useInView.ts
import { useEffect, useRef, useState } from 'react';

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // Only trigger once — don't re-animate on scroll back
      }
    }, { threshold: 0.3, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
```

**Rule:** Always `observer.disconnect()` after triggering — do not leave observers running for elements that have already animated.

---

## 13. CI/CD performance gates

Add Lighthouse CI to the Vercel deploy pipeline. Fail the deploy if scores drop below minimums.

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npx lhci autorun
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/"],
      "startServerCommand": "npm run start",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.90 }],
        "categories:accessibility": ["error", { "minScore": 0.90 }],
        "categories:best-practices": ["error", { "minScore": 0.90 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## 14. Real User Monitoring (RUM)

Lighthouse measures lab data — controlled conditions. RUM measures what real users experience.

### GA4 CWV reporting (free, built-in)

GA4 automatically collects LCP, CLS, and INP via the `web-vitals` library when you have GA4 installed. Check **GA4 → Reports → Tech → Web vitals** after launch.

### Optional: `web-vitals` custom reporting

```tsx
// lib/vitals.ts
import { onCLS, onINP, onLCP } from 'web-vitals';

function sendToAnalytics({ name, value, rating }: Metric) {
  // Send to GA4 as custom event
  window.gtag?.('event', name, {
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_rating: rating,       // 'good' | 'needs-improvement' | 'poor'
    non_interaction: true,
  });
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
}
```

```tsx
// app/layout.tsx
import { reportWebVitals } from '@/lib/vitals';

// Call in a client component after hydration
useEffect(() => { reportWebVitals(); }, []);
```

---

## 15. Pre-launch performance checklist

Run all checks before every production deploy.

### Build output
- [ ] `next build` completes with zero errors and zero warnings
- [ ] First Load JS (shared) ≤ 80KB (gzipped) — visible in build output
- [ ] Page JS chunk ≤ 30KB — visible in build output
- [ ] No unexpected large chunks (> 50KB) from a single import

### Images
- [ ] Hero image uses `priority` prop
- [ ] All images have explicit `width` and `height`
- [ ] All images have descriptive `alt` text (or `alt=""` for decorative)
- [ ] Hero WebP output ≤ 120KB (check in Network tab → Img filter)
- [ ] All images use `next/image`, zero `<img>` tags

### Fonts
- [ ] `font-display: swap` on all `@font-face` declarations
- [ ] TT Norms Pro Regular is preloaded in `<head>`
- [ ] Font files are in `/public/fonts/` (no external font CDN)
- [ ] Font files are WOFF2 format only

### JavaScript
- [ ] GA4 uses `strategy="afterInteractive"`
- [ ] No `strategy="beforeInteractive"` anywhere
- [ ] Count-up uses `requestAnimationFrame`, not `setInterval`
- [ ] All below-fold sections use `dynamic()` import

### Animations
- [ ] All hover effects use `transform` + `opacity` only
- [ ] `prefers-reduced-motion` media query disables all animations
- [ ] Count-up shows final number immediately when reduced motion is preferred

### Lighthouse (run 3× in incognito, take median)
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 95
- [ ] LCP ≤ 2.5s
- [ ] CLS ≤ 0.1
- [ ] TBT ≤ 300ms (proxy for INP in lab)

### Network (Chrome DevTools → Network, Fast 4G throttle)
- [ ] Total above-fold transfer ≤ 350KB
- [ ] No render-blocking resources in the waterfall
- [ ] No duplicate font downloads
- [ ] Static assets return `Cache-Control: public, max-age=31536000`