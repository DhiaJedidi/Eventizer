# Images — real photography only (ai-usage.md §9)

No AI-generated images, no generic stock. Use Eventizer's own event photos.
All sizes/specs from performance.md §7. `next/image` outputs WebP automatically.

## Static assets used directly by components

| Path | Section | Dimensions | Max size | Notes |
|---|---|---|---|---|
| `hero/hero-equipe-eventizer.jpg` | Hero | 1200×800 (3:2) | ≤ 120KB WebP | LCP image — the only `priority` image |
| `platform/dashboard-plateforme-eventizer.jpg` | Platform | 1100×700 | ≤ 120KB | Command Hub screenshot |
| `cases/sommet-francophonie-djerba-2022.jpg` | Références | 800×500 (16:10) | ≤ 80KB | |
| `cases/journees-radiologie.jpg` | Références | 800×500 | ≤ 80KB | |
| `cases/osstem-meeting-tunisia.jpg` | Références | 800×500 | ≤ 80KB | |
| `cases/b-connected.jpg` | Références | 800×500 | ≤ 80KB | |

Team headshots are managed in Payload (`/admin` → Media). Until uploaded, the Team
section renders an initials avatar (no broken images). Case-study photos can also be
uploaded in Payload (collection `Références`), which overrides the static paths above.

## Other required public assets (referenced in layout / SEO)

Place at `public/` root:

| File | Used by |
|---|---|
| `og-image.jpg` (1200×630, ≤ 300KB) | Open Graph / Twitter card (seo.md §4–5) |
| `logo.svg` (≤ 10KB) | Organization JSON-LD logo |
| `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png` | icons (seo.md §10) |

> File names are kebab-case with French descriptors (seo.md §8). The alt text for
> each image already lives in `src/lib/content.ts` (verbatim from copy.md).
