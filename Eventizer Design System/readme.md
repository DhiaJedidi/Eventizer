# Eventizer Design System

**Brand:** Eventizer — *Innovate · Connect · Digitize*
**Domain:** eventizer.io
**Version:** 1.0.0
**Generated:** June 2026

---

## About Eventizer

Eventizer is a professional event management platform that enables organizers to create, manage, and digitize events at scale. The platform connects three main audiences:

- **Organizers** — create and manage events, registrations, sessions, exhibitors
- **Exhibitors** — booth management, lead capture, networking tools
- **Attendees** — event discovery, ticketing, schedules, networking

The tagline *Innovate · Connect · Digitize* reflects the brand's core positioning: bringing professional event management into the digital era.

## Sources

The following materials were provided to build this design system:

| File | Description |
|---|---|
| `uploads/tokens.css` | Official design tokens (CSS custom properties), labeled "Charte Graphique Finale" |
| `uploads/tokens.json` | Style Dictionary-compatible JSON token definitions |

> **No codebase or Figma file was provided.** This design system is built entirely from the official token definitions above. Attaching the product codebase or Figma workspace would enable significantly richer UI kit screens and component variant coverage.

---

## Content Fundamentals

### Tone & Voice

Eventizer speaks with **professional confidence** — direct, action-oriented, and empowering. The brand does not use jargon, filler, or passive voice.

**Key traits:**
- **Action-first:** Lead with verbs. "Create your event." "Register attendees." "Export your data."
- **Empowering:** Give agency to the organizer. "Your events. Digitized."
- **Concise:** Short, clear sentences. No padding.
- **Professional:** Formal enough for B2B, approachable enough for first-time organizers.

### Voice Examples
- "Create your next event in minutes."
- "Connect exhibitors, speakers, and attendees — all in one place."
- "Registration is now open."
- "1,248 attendees registered."
- "View all events"
- "Export attendee data"
- "Session starts in 10 minutes."

### Casing & Formatting
| Context | Rule | Example |
|---|---|---|
| Product name | Always capitalized, no space | "Eventizer" |
| Tagline | Title case, spaced · separators | "Innovate · Connect · Digitize" |
| Navigation items | Title Case | "My Events", "Attendees" |
| Buttons / CTAs | Title Case | "Create Event", "Register Now" |
| Body copy | Sentence case | "Your event has been published." |
| Status labels | ALL CAPS + wide letter-spacing | "PUBLISHED", "DRAFT" |
| Numbers | Formatted with commas | "1,248 attendees", "€23,450" |

### Language Rules
- Address the user as **"you/your"** (organizer perspective)
- No emoji in product UI or formal communications
- Avoid passive voice: "Published" not "Has been published"
- Currency: use local symbol (€, $) before the number, no space

---

## Visual Foundations

### Color

The palette is a clean two-tone brand system on a neutral base.

**Brand:**
| Token | Value | Usage |
|---|---|---|
| `--color-brand-primary` | `#4563AC` | Primary actions, active states, links, brand identity |
| `--color-brand-secondary` | `#E1AA2B` | Highlights, secondary CTAs, gold accents, tagline |

**Neutrals:** 7-step scale from `#F5F5F5` (subtle bg) to `#0D0D0D` (near-black text). No warm or cool bias — the neutrals are purely grey, letting the brand colors pop.

**Dark mode:** Full dark mode support via `[data-theme="dark"]`. Surfaces flip to the dark neutral scale; brand colors (blue + gold) remain identical across modes.

**Color vibe of imagery:** Cool-to-neutral. Conference halls, professional event photography, group shots in well-lit venues. Avoid warm Instagram-style filters or oversaturated imagery — they clash with the blue-dominant palette.

### Typography

**Headings — Montserrat** (Bold 700):
Geometric, strong, trustworthy. Used for all display headings (H1–H5). Tight letter-spacing (`-0.02em`) at large sizes for a refined, premium feel. High visual weight that anchors page hierarchy.

**Body — Poppins** (Regular 400, Semibold 600 for labels):
Rounded and friendly geometric sans. Comfortable line height (1.5) for reading. Semibold (600) for labels, wide letter-spacing (`0.08em`) for scannability.

**Scale:** 12px → 48px across 9 steps (xs through 5xl). Used strictly — no fractional or off-scale sizes.

**Note:** Both fonts are served via Google Fonts CDN. If network independence is required, download and self-host the font files and update `tokens/fonts.css` accordingly.

### Spacing

4-point base grid: `4 / 8 / 16 / 24 / 32 / 48 / 64px`. Applied via semantic layout and component tokens — never use raw pixel values in component code. Generous whitespace; the brand feels spacious and uncluttered.

### Border Radius

| Token | Value | Used on |
|---|---|---|
| `--radius-component-button` | `8px` | Buttons, interactive chips |
| `--radius-component-card` | `16px` | Cards, panels, containers |
| `--radius-component-badge` | `9999px` | Badges, status pills, tags |
| `--radius-component-input` | `4px` | Inputs, selects, textareas |

### Cards

Cards use `16px` border-radius, `1px` border in `--color-border-default`, and a subtle shadow `0 2px 8px rgba(0,0,0,0.06)`. Clickable cards elevate on hover: `0 8px 24px rgba(0,0,0,0.12)` + `translateY(-2px)`. Background always `--color-bg-surface`.

### Shadows

Shadows are not formally tokenized. Recommended scale:
- **Default:** `0 2px 8px rgba(0,0,0,0.06)` — subtle card lift
- **Elevated:** `0 8px 24px rgba(0,0,0,0.12)` — hover/active elevation
- **Modal:** `0 16px 48px rgba(0,0,0,0.18)` — overlay elevation

### Backgrounds

Clean white (`#FFFFFF`) for primary surfaces. Subtle grey (`#F5F5F5`) for page backgrounds and secondary panels. No gradients, textures, or decorative patterns in UI — visual interest comes from photography and layout.

### Animations

Not formally tokenized. Recommended conventions:
- **Micro-interactions (hover, focus):** `0.15s ease`
- **Spatial transitions (modal, drawer, toast):** `0.2–0.3s ease-in-out`
- No decorative idle animations; all motion serves a functional purpose
- No bouncy or elastic easing — the brand is professional, not playful

### Hover & Press States

| Element | Hover | Press / Active |
|---|---|---|
| Primary button | 10% darker fill | 15% darker fill |
| Outline button | Tinted blue bg (`rgba(69,99,172,0.08)`) | Darker tint |
| Ghost button | Tinted blue bg | Darker tint |
| Card (clickable) | Elevation + `translateY(-2px)` | Slight flatten |
| Link | Underline appears | — |

### Borders

- `--color-border-default` (`#E8E8E8`): Card outlines, dividers, input default
- `--color-border-strong` (`#9E9E9E`): Focus rings, emphasized separators
- Width: 1px standard; 2px for button outlines and focus rings

### Transparency & Blur

- Hover tints use `rgba(69,99,172,0.08)` (primary blue, 8% opacity)
- Backdrop blur for modal overlays is optional, unspecified in tokens
- No aggressive frosted-glass effects in core UI

---

## Iconography

No official icon font or icon set was included in the provided materials.

**Recommended library: Lucide Icons**
A modern, consistent 2px-stroke icon set that matches the Montserrat/Poppins aesthetic — clean, geometric, professional.

- **CDN (HTML):** `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>`
- **Usage:** `<i data-lucide="calendar"></i>` then call `lucide.createIcons()`
- **React:** `lucide-react` package

**Icon sizing conventions:**
| Context | Size |
|---|---|
| Navigation | 20px |
| Button with icon | 16px |
| Inline / body | 16px |
| Hero / empty state | 32–48px |

Icons use `currentColor` so they inherit the text color of their container.

> ⚠ **Caveat:** The icon library recommendation is a best-fit inference. Please provide the official icon library or Lucide confirmation.

---

## Index

```
styles.css                       Global CSS entry point (@imports only)

tokens/
  fonts.css                      Google Fonts import (Montserrat + Poppins)
  colors.css                     Color tokens — primitives + semantic + status + dark mode
  typography.css                 Typography tokens — families, weights, sizes, scale
  spacing.css                    Spacing and border radius tokens

assets/
  logo.svg                       Eventizer wordmark (blue, placeholder — see caveat)
  logo-white.svg                 White wordmark for dark backgrounds
  logo-tagline.svg               Wordmark with tagline beneath

guidelines/
  colors-brand.card.html         Brand primary + secondary color swatches
  colors-neutral.card.html       Neutral color scale
  colors-semantic.card.html      Semantic color token reference
  type-display.card.html         Display heading type specimens (H1–H3)
  type-body.card.html            Body text specimens (large / default / small)
  type-labels.card.html          Label, caption, tagline specimens
  spacing-scale.card.html        Spacing token scale visualization
  radius.card.html               Border radius variants
  dark-mode.card.html            Dark mode semantic color tokens

components/core/
  Button.jsx + .d.ts             Button — primary / secondary / outline / ghost, 3 sizes
  Badge.jsx  + .d.ts             Badge — status variants
  Input.jsx  + .d.ts             Text input with label, error, helper text
  Card.jsx   + .d.ts             Container card with elevation
  Avatar.jsx + .d.ts             User avatar with initials fallback
  Tag.jsx    + .d.ts             Dismissible tag / chip
  core.card.html                 Component preview card (Design System tab)

ui_kits/eventizer/
  index.html                     Interactive event management platform prototype
  App.jsx                        Root app component with navigation state
  Sidebar.jsx                    App sidebar with navigation
  Dashboard.jsx                  Dashboard view — stats + recent events
  EventsList.jsx                 Events grid / list view

readme.md                        This file
SKILL.md                         Agent skill descriptor
```

---

## Caveats

1. **Logo:** The SVG logo files are text-based wordmarks created as placeholders. Please provide official path-based logo files for production use.
2. **Fonts:** Montserrat and Poppins are loaded from Google Fonts CDN. Self-host the font files if network independence is required.
3. **Iconography:** Lucide Icons is recommended but not confirmed as the official Eventizer icon library.
4. **No codebase/Figma:** UI kit screens are based on design token inference, not real component code. Significant enrichment is possible with source access.
5. **Shadow tokens:** Shadows are not in the official token set; values above are inferred best-practice recommendations.
