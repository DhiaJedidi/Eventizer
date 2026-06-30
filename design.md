# design.md — Eventizer Landing Page Design System

> The visual source of truth for the Eventizer landing page. Generated from
> [`tokens.json`](tokens.json) — every value here resolves to a token. When a value exists
> in `tokens.json`, **`tokens.json` wins**; this file documents and applies it, it does not
> invent new values.
>
> Pairs with the *vibe direction* (Section 1) — the feeling the page must evoke: a premium
> event agency that also runs serious technology.

---

## 0b. v4 — "Editorial" direction (June 2026, current — supersedes v2/v3 below)

Owner-approved pivot to a **light, warm, editorial** aesthetic (mnbaq.org: imagery leads,
generous whitespace, restraint, subtle motion). This is the **current** visual source of truth.

- **Palette — BRAND identity preserved (tokens.json):** primary `cobalt #4563AC` (backbone —
  Stats band, eyebrows, CTAs, links, active states, form accents) + spotlight `gold #E1AA2B`
  (stat numbers, key stats, proof callout, accent rules — one highlight per view). Neutrals:
  `paper` near-white · `cream #F5F5F5` (alt) · `line #E8E8E8` · `ink #0D0D0D` · body `#222222` ·
  `mute #616161` · `noir #0D0D0D` (hero + footer). The dark Command Hub mockup uses cobalt (not
  violet) for brand purity.
- **Type — BRAND identity preserved:** **Montserrat** (display/headings, 700/800) + **Poppins**
  (body), loaded via `next/font` (self-hosted at build — no runtime CDN). Do NOT change the
  Eventizer fonts or brand colours.
- **Layout:** generous whitespace, image-led, restrained color, hairline dividers, `max-w` reading
  measures. Pills for CTAs (`rounded-full`).
- **Motion (GSAP only):** smooth `expo.out` reveals, heading **mask** + image **clip** reveals,
  parallax, count-up, refined micro-interactions (animated link underline, button press,
  image grayscale→colour + scale on hover). All reduced-motion safe (`@/lib/gsap`, `Reveal`,
  `useGsapReveal`).

Implemented as channel-triplet CSS vars in `globals.css` + Tailwind tokens (`bg-paper`, `text-ink`,
`text-gold`, `border-line`, …). The v2 "Event OS" dark palette below is retained for history only.

---

## 0. v2 — "Event OS" direction (June 2026, supersedes the palette below)

The owner approved a full visual overhaul to a **premium SaaS "Event OS"** aesthetic
(Notion/Linear/Vercel calm precision + event-world energy via gold). This section is the
**current** visual source of truth for v2; Sections 1–10 below are retained for history but
the v2 palette/shape/motion rules win on conflict.

**Surfaces (dark-first):**

| Token | Hex | Use |
|---|---|---|
| `navy` | `#080B10` | darkest — hero, Why, Platform |
| `ink` | `#0D1117` | primary dark — Stats, Cases, Contact |
| `surface` | `#111827` | raised dark panels / browser body |
| `panel` | `#1F2937` | window chrome bars |
| `footer` | `#040608` | footer only |
| white | `#FFFFFF` | the two light sections (Pillars, Team) |

**Accents:** `gold #E8A020` (single highlight per view — von Restorff) · `violet #6366F1`
(interactive/data-viz only). **Light-mode text:** `graphite #111827`, `slate #4B5563`,
`steel #6B7280`, `silver #9CA3AF`. **Borders on dark:** `white/8`. **Glass:**
`bg white/4 + border white/8 + blur(12px)`.

**Shape:** structured geometry — radius `4–16px`, **no blobs, no circles**, 8pt grid.
**Type:** Montserrat **800** display (the prompt's "TT Norms Pro ExtraBold" maps to
Montserrat 800 — those files aren't available), Poppins 400/500 body; fluid `display-xl/lg/md`
clamps. **Motion:** GSAP + ScrollTrigger only, `transform`/`opacity`, reduced-motion safe.

Tokens are implemented as channel-triplet CSS vars in `globals.css` and Tailwind colors
(`bg-ink`, `text-gold`, `border-white/8`, …) — JSX stays hex-free.

---

## 1. The vibe — event agency energy

Eventizer is not a generic SaaS site and not a sleepy corporate brochure. It is a **premium
event agency with a tech backbone**. The design must feel like walking into a well-produced
gala that is also wired with real-time dashboards.

### Mood words
**Confident · Premium · Energetic · Orchestrated · Trustworthy.**

Three references held in tension:
- **The gala** — spotlight, gold accents, dark dramatic moments, a sense of occasion.
- **The control room** — cobalt blue, crisp data, clean grids, real-time precision.
- **The host** — warm, human, never cold or sterile. People run these events.

### How the vibe shows up in pixels

| Lever | Direction |
|---|---|
| **Color story** | Deep cobalt blue carries trust and tech. **Gold is the spotlight** — used sparingly on the single most important thing in view (a key stat, an active CTA accent, a badge). Never gold everywhere; gold is the highlight that draws the eye. |
| **Light & dark rhythm** | Alternate bright cream/white sections (open, airy, optimistic) with one or two **dark cobalt/near-black "stage" sections** (Platform, Contact) for drama. The page should breathe in and out, not run flat. |
| **Typography energy** | **Montserrat Bold** headlines, tight tracking, large sizes — geometric, modern, confident. Poppins body keeps it friendly and readable. Headlines do the shouting; body stays calm. |
| **Imagery** | Real event photography, full-bleed where possible, with dark gradient overlays so white text sits on top. Crowds, stages, lights, badges, screens. Energy and scale — never empty stock offices. |
| **Motion** | Purposeful, not decorative. Count-up stats (the numbers *climb* like a live ticker). Subtle card lift on hover. Reveal-on-scroll. Everything respects `prefers-reduced-motion`. See [performance.md](performance.md) §5. |
| **Shape language** | Rounded but not soft-toy — `md`/`lg` radii. Optional organic blob shapes (cobalt + gold, `aria-hidden`) behind the hero for a touch of movement and brand personality. |
| **Whitespace** | Generous. Premium reads as *uncrowded*. Let sections and cards have room. |

> **One-line brief for any agent:** *Cobalt control room meets gold-lit gala — confident,
> spacious, with gold as the spotlight on exactly one thing per view.*

---

## 2. How tokens are structured

`tokens.json` has two layers — keep them straight:

- **`primitives`** — raw values (`blue.600 = #4563AC`, `spacing.md = 16`). Never reference a
  primitive directly in a component. They exist only to feed semantic tokens.
- **`semantic`** — intent-named tokens that point at primitives
  (`color.brand.primary → blue.600`, `color.text.primary → neutral.black`). **Components
  consume semantic tokens.**

> **Rule:** Build components against semantic tokens. If you ever need a primitive directly,
> a semantic token is probably missing — add it to `tokens.json` first, then use it.

---

## 3. Color

### 3.1 Primitives

| Token | Value | Swatch role |
|---|---|---|
| `blue.600` | `#4563AC` | Brand blue — the cobalt backbone |
| `gold.500` | `#E1AA2B` | Brand gold — the spotlight accent |
| `neutral.white` | `#FFFFFF` | Pure white |
| `neutral.100` | `#F5F5F5` | Subtle background (off-white / cream-ish) |
| `neutral.200` | `#E8E8E8` | Muted background / default border |
| `neutral.400` | `#9E9E9E` | Disabled text / strong border |
| `neutral.600` | `#616161` | Secondary text |
| `neutral.800` | `#222222` | Near-black surfaces |
| `neutral.black` | `#0D0D0D` | Primary text / darkest stage sections |

### 3.2 Semantic colors

| Semantic token | Resolves to | Use for |
|---|---|---|
| `color.brand.primary` | `blue.600` `#4563AC` | Primary buttons, links, brand surfaces, navbar-on-scroll, stats strip |
| `color.brand.secondary` | `gold.500` `#E1AA2B` | Spotlight accent — key stat numbers, badges, active underline, decorative |
| `color.bg.surface` | `white` | Default page background |
| `color.bg.subtle` | `neutral.100` | Alternating section background, cards on white |
| `color.bg.muted` | `neutral.200` | Inset panels, disabled fields |
| `color.text.primary` | `neutral.black` | Body copy, headlines on light bg |
| `color.text.secondary` | `neutral.600` | Sub-labels, captions, muted copy |
| `color.text.disabled` | `neutral.400` | Disabled state text, placeholders |
| `color.text.inverse` | `white` | Text on dark/brand backgrounds |
| `color.text.on-brand` | `white` | Text/icon on the cobalt brand surface |
| `color.border.default` | `neutral.200` | Card borders, dividers, input borders |
| `color.border.strong` | `neutral.400` | Focus-adjacent borders, emphasis dividers |

### 3.3 Accessibility — contrast rules (WCAG AA)

The project mandates WCAG AA ([ai-usage.md](ai-usage.md) §7). Verified pairings:

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `text.primary` (`#0D0D0D`) | `bg.surface` (white) | ~19:1 | ✅ Pass |
| `text.secondary` (`#616161`) | `bg.surface` (white) | ~5.7:1 | ✅ Pass (normal text) |
| White | `brand.primary` (`#4563AC`) | ~5.8:1 | ✅ Pass (normal text) |
| White | `neutral.black` / `neutral.800` | ≥ 15:1 | ✅ Pass |
| **`brand.secondary` gold (`#E1AA2B`) as TEXT** | white | **~2.1:1** | ❌ **Fail** — never use gold for body text on light |
| `brand.secondary` gold | `neutral.black` (`#0D0D0D`) | ~9:1 | ✅ Pass — gold text only on dark |

> **Gold rule:** Gold is an **accent and a highlight on dark**, not a text color on light
> surfaces. Big gold stat numbers must sit on a dark/cobalt background. On white, gold is for
> shapes, underlines, borders, and icon fills — never for reading text. `text.disabled`
> (`#9E9E9E`) is for disabled UI only — it does **not** meet AA for active body text.

---

## 4. Typography

> ⚠️ **Font source of truth = `tokens.json`: Montserrat (headings) + Poppins (body).** This
> supersedes the TT Norms Pro / Mistrully references in `performance.md` §8 and
> `architecture.md`. See Section 9 (Discrepancies). Self-host both per
> [performance.md](performance.md) §8 — no external font CDN.

### 4.1 Families & weights

| Token | Value |
|---|---|
| `font.family.heading` | **Montserrat** |
| `font.family.body` | **Poppins** |
| `font.weight.regular` | 400 |
| `font.weight.medium` | 500 |
| `font.weight.semibold` | 600 |
| `font.weight.bold` | 700 |

**Fallback stacks** (metrics-similar, reduces font-swap CLS):
```css
--font-heading: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
--font-body:    'Poppins',   system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

### 4.2 Type scale (primitives)

| Token | px | rem | Typical use |
|---|---|---|---|
| `size.xs` | 12 | 0.75 | Caption, legal, eyebrow micro |
| `size.sm` | 14 | 0.875 | Small body, labels, tagline |
| `size.md` | 16 | 1.0 | Default body |
| `size.lg` | 18 | 1.125 | Large body, hero subheadline |
| `size.xl` | 20 | 1.25 | H5 |
| `size.2xl` | 24 | 1.5 | H4 |
| `size.3xl` | 28 | 1.75 | H3 |
| `size.4xl` | 36 | 2.25 | H2 |
| `size.5xl` | 48 | 3.0 | H1 (standard) |
| `size.6xl` | 60 | 3.75 | Immersive hero H1 (v2) |
| `size.7xl` | 76 | 4.75 | Immersive hero H1, desktop (v2) |

Line heights: `tight 1.2` · `normal 1.5` · `relaxed 1.75`.
Letter spacing: `tight -0.02em` · `normal 0em` · `wide 0.08em`.

### 4.3 Semantic text styles (use these, not raw sizes)

| Style token | Family | Weight | Size | Line | Tracking | Applies to |
|---|---|---|---|---|---|---|
| `typography.display.h1` | Montserrat | 700 | 48 | 1.2 | -0.02em | Hero H1 (the only H1) |
| `typography.display.h2` | Montserrat | 700 | 36 | 1.2 | -0.02em | Section titles |
| `typography.display.h3` | Montserrat | 700 | 28 | 1.2 | 0 | Pillar / case / member / differentiator titles |
| `typography.heading.h4` | Montserrat | 700 | 24 | 1.2 | — | Card sub-headings |
| `typography.heading.h5` | Montserrat | 700 | 20 | 1.2 | — | Minor headings |
| `typography.body.large` | Poppins | 400 | 18 | 1.5 | — | Hero subheadline, lead paragraphs |
| `typography.body.default` | Poppins | 400 | 16 | 1.5 | — | Standard body copy |
| `typography.body.small` | Poppins | 400 | 14 | 1.5 | — | Secondary / dense copy |
| `typography.label.default` | Poppins | 600 | 14 | 1.5 | 0.08em | Form labels, button text, nav |
| `typography.caption` | Poppins | 400 | 12 | 1.75 | — | Captions, helper text, footnotes |
| `typography.tagline` | Montserrat | 700 | 14 | 1.5 | 0.08em | "Innovate · Connect · Digitize", eyebrows |

> **Responsive headings:** H1 may scale down on mobile (e.g. `text-4xl` at 375px → `text-5xl`
> at `lg:`). Keep the token *intent* (display.h1) — only the rendered size flexes via
> breakpoints. Mobile-first per [ai-usage.md](ai-usage.md) §5.

> **Eyebrow / tagline pattern:** Montserrat or Poppins, small (`sm`/`xs`), **wide tracking
> (0.08em), often uppercase**, frequently in gold or cobalt. This is the signature
> "event-programme" detail — use it for section eyebrows ("Nos expertises", "Notre
> technologie").

---

## 5. Spacing

Base unit: **4px**. All spacing resolves to the scale below — never use arbitrary px.

| Token | px | Tailwind equiv |
|---|---|---|
| `spacing.xs` | 4 | `1` |
| `spacing.sm` | 8 | `2` |
| `spacing.md` | 16 | `4` |
| `spacing.lg` | 24 | `6` |
| `spacing.xl` | 32 | `8` |
| `spacing.2xl` | 48 | `12` |
| `spacing.3xl` | 64 | `16` |

**Semantic spacing**
- `spacing.layout.*` — gaps **between sections and major blocks**. Section vertical padding:
  `2xl` (48) on mobile → `3xl` (64)+ on desktop. Premium = generous; lean toward the larger
  end of the scale for section rhythm.
- `spacing.component.padding-*` — **inside** components (card padding `lg` = 24; button
  padding `sm`/`md`).
- `spacing.component.gap-*` — gaps **within** a component (icon-to-text `sm`; list items `md`;
  card grid `lg`).

---

## 6. Radius

| Token | px | Applied to (semantic) |
|---|---|---|
| `radius.none` | 0 | Full-bleed strips (stats bar edges) |
| `radius.sm` | 4 | `radius.component.input` — form fields |
| `radius.md` | 8 | `radius.component.button` — buttons |
| `radius.lg` | 16 | `radius.component.card` — cards, image frames |
| `radius.full` | 9999 | `radius.component.badge` — badges, pills, circular avatars |

> Rounded-but-confident. Inputs are the crispest (`sm`), cards the softest (`lg`), badges and
> team avatars fully round (`full`). Don't mix arbitrary radii — stick to these four roles.

---

## 7. Component patterns

Token-driven recipes. Visual specifics (exact shadows, hover timing) follow
[performance.md](performance.md) §5.3 — **animate `transform` + `opacity` only**.

### 7.1 Buttons

| Variant | Background | Text | Border | Radius | Use |
|---|---|---|---|---|---|
| **Primary** | `brand.primary` (cobalt) | `text.on-brand` (white) | none | `button` (8) | "Demandez un devis" — the main CTA |
| **Secondary** | transparent | `brand.primary` | 1px `brand.primary` | `button` (8) | "Découvrir nos services" |
| **Gold accent** (sparing) | `brand.secondary` (gold) | `neutral.black` | none | `button` (8) | One spotlight CTA max per view; gold text rule applies |
| **On-dark** | white | `brand.primary` | none | `button` (8) | CTA inside dark Platform/Contact sections |

- Padding: `padding-md` (16) horizontal-ish, `padding-sm`/`md` vertical; comfortable tap
  target ≥ 44px tall.
- Text: `typography.label.default` (Poppins 600, wide tracking).
- Hover: `translateY(-2px)` + subtle shadow, 200ms. Disabled: `text.disabled` on
  `bg.muted`.
- **Focus ring always visible** — never `outline:none` without replacement
  ([ai-usage.md](ai-usage.md) §7). Suggested: 2px gold or cobalt offset ring.

### 7.2 Cards (pillars, case studies, team)

- Background `bg.surface` on subtle sections, or `bg.subtle` on white sections (keep contrast
  with the page).
- Border `1px border.default`; radius `card` (16); padding `padding-lg` (24).
- Hover (where interactive): lift `translateY(-4px)` + shadow, 200ms; disabled under
  `prefers-reduced-motion`.
- **Case study cards** = photo background + dark gradient overlay
  (`transparent → rgba(13,13,13,0.7)`) so white text and the **gold key-stat** read clearly.

### 7.3 Badges / pills

- Radius `badge` (full); `typography.label` or `caption`; tracking wide.
- Case-study type badges (e.g. "Institutionnel", "Médical"): cobalt or gold on light, or
  white on a translucent dark chip over photos.

### 7.4 Inputs (contact form)

- Radius `input` (4); border `1px border.default`; padding `padding-md` (16).
- Label `typography.label.default` above field; placeholder in `text.disabled`.
- Focus: border → `brand.primary` + visible focus ring.
- Error: border red-equivalent + message in `typography.caption`, linked via
  `aria-describedby`, container `aria-live="polite"` (copy from [copy.md](copy.md)).

### 7.5 Stats strip ("Chiffres clés")

- Full-bleed (`radius.none` edges) on `brand.primary` cobalt.
- Numbers: `typography.display.h1`/`h2` size, **bold, in `brand.secondary` gold** (gold on
  cobalt passes contrast and delivers the gala-spotlight feel).
- Labels: `typography.label` / `caption` in `text.inverse`, uppercase, wide tracking.
- Count-up animation via `requestAnimationFrame` ([performance.md](performance.md) §5.2).

### 7.6 Decorative blobs

- Cobalt + gold organic shapes behind the hero. Inline SVG/CSS (no image request),
  `aria-hidden="true"`, `pointer-events:none`. Low opacity so text stays legible. This is the
  brand's "movement" — keep it subtle.

---

## 8. Tailwind mapping

Map semantic tokens into `tailwind.config.js` so JSX uses class names, never raw hex
([ai-usage.md](ai-usage.md) §5: "No hardcoded colors or spacing").

```js
// tailwind.config.js — theme.extend
module.exports = {
  theme: {
    extend: {
      colors: {
        // CSS-var channel triplets + <alpha-value> so opacity modifiers work.
        brand:  { primary: 'rgb(var(--brand-primary) / <alpha-value>)',  secondary: 'rgb(var(--brand-secondary) / <alpha-value>)' },
        bg:     { surface: 'rgb(var(--bg-surface) / <alpha-value>)', subtle: 'rgb(var(--bg-subtle) / <alpha-value>)', muted: 'rgb(var(--bg-muted) / <alpha-value>)' },
        text:   {
          primary: 'rgb(var(--text-primary) / <alpha-value>)', secondary: 'rgb(var(--text-secondary) / <alpha-value>)', disabled: 'rgb(var(--text-disabled) / <alpha-value>)',
          inverse: 'rgb(var(--text-inverse) / <alpha-value>)', 'on-brand': 'rgb(var(--text-on-brand) / <alpha-value>)',
        },
        border: { DEFAULT: 'rgb(var(--border-default) / <alpha-value>)', strong: 'rgb(var(--border-strong) / <alpha-value>)' },
        neutral: { 800: 'rgb(var(--neutral-800) / <alpha-value>)', black: 'rgb(var(--neutral-black) / <alpha-value>)' },
      },
      fontFamily: {
        heading: ['Montserrat', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        body:    ['Poppins',    'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // [size, lineHeight]
        xs:  ['12px', '1.75'], sm:  ['14px', '1.5'], md:  ['16px', '1.5'],
        lg:  ['18px', '1.5'],  xl:  ['20px', '1.2'], '2xl': ['24px', '1.2'],
        '3xl': ['28px', '1.2'], '4xl': ['36px', '1.2'], '5xl': ['48px', '1.2'],
      },
      letterSpacing: { tightish: '-0.02em', wideish: '0.08em' },
      spacing: {
        // token: 4px base — Tailwind's default 4px scale already matches.
        // xs=1 sm=2 md=4 lg=6 xl=8 2xl=12 3xl=16
      },
      borderRadius: {
        sm: '4px',   // input
        md: '8px',   // button
        lg: '16px',  // card
        full: '9999px', // badge / avatar
      },
    },
  },
};
```

> The spacing scale is intentionally left to Tailwind's defaults — they already align to the
> 4px base (`p-4` = 16 = `spacing.md`, `gap-6` = 24 = `spacing.lg`, etc.). Use Tailwind's
> numeric scale and treat the token names in this doc as the intent map.

### CSS custom properties (for `globals.css`)
Colors are stored as **RGB channel triplets** (`"R G B"`, not hex) so Tailwind's opacity
modifiers (`bg-brand-primary/10`, `from-neutral-black/85`) resolve correctly — the Tailwind
colors above are therefore declared as `rgb(var(--token) / <alpha-value>)`. When using a var
directly in CSS, wrap it: `background-color: rgb(var(--brand-primary))`.
```css
:root {
  --brand-primary: 69 99 172;   /* #4563AC */  --brand-secondary: 225 170 43; /* #E1AA2B */
  --bg-surface: 255 255 255;    --bg-subtle: 245 245 245;  --bg-muted: 232 232 232;
  --text-primary: 13 13 13;     --text-secondary: 97 97 97; --text-inverse: 255 255 255;
  --border-default: 232 232 232; --border-strong: 158 158 158;
  --neutral-800: 34 34 34;      --neutral-black: 13 13 13;
}
```

---

## 9. Discrepancies to resolve

Per [ai-usage.md](ai-usage.md) §12 ("when sources conflict — escalate, don't resolve
silently"), these conflicts between `tokens.json` and the earlier spec files need a decision:

| # | Conflict | `tokens.json` | Other docs | Recommended resolution |
|---|---|---|---|---|
| 1 | **Heading/body fonts** | Montserrat + Poppins | TT Norms Pro + Mistrully (`performance.md` §8, `architecture.md`) | Adopt `tokens.json` (Montserrat/Poppins); update `performance.md` font filenames + preload, and `architecture.md`. |
| 2 | **Brand blue hex** | `#4563AC` | `#3B4BA8` (navbar/stats in `architecture.md`; `theme-color`/schema in `seo.md`) | Adopt `tokens.json` `#4563AC`; update `seo.md` `theme-color` + OG and `architecture.md` references. |
| 3 | **Mistrully script font** | not present | used for script/display accents | Decide whether a script accent font survives v1. If yes, add it to `tokens.json`; if no, remove from `performance.md`. |

> Do not change `copy.md`, `seo.md`, `performance.md`, or `architecture.md` to match this file
> without sign-off — flag the conflict and let the owner pick. This doc reflects `tokens.json`
> as requested; the resolution is a project decision.

---

## 10. Quick reference — do / don't

**Do**
- Build against **semantic** tokens; map them once into Tailwind.
- Treat **gold as the spotlight** — one highlight per view, on dark or as accent.
- Alternate light sections with one or two dark "stage" sections for drama.
- Use wide-tracked eyebrows for the event-programme feel.
- Keep generous whitespace — premium reads as uncrowded.

**Don't**
- Hardcode hex or px in JSX (`ai-usage.md` §5).
- Use **gold as body text on light** (fails contrast).
- Scatter gold everywhere — it stops being a spotlight.
- Introduce radii, sizes, or colors not in `tokens.json` — add them to the token file first.
- Animate anything but `transform`/`opacity` (`performance.md` §5.3).

---

*Generated from `tokens.json`. The token file is the machine source of truth; this file is the
human-readable application of it, plus the vibe direction. Visual changes start in
`tokens.json`, then here.*