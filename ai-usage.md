# ai-usage.md — AI Agent Rules & Orchestration

> Read this file first. Always. Before touching any code, design, or copy.

---

## 1. What each file contains

| File | Contains | Agent(s) |
|---|---|---|
| `context.md` | Company identity, services, audience, goals, tone, page structure, constraints | All |
| `architecture.md` | Tech stack, file structure, section specs, responsive rules, a11y | Claude Code |
| `seo.md` | Meta tags, structured data, heading rules, image SEO, Core Web Vitals, GEO, local SEO, analytics | Claude Code |
| `copy.md` | Every word on the page — headlines, body, CTAs, labels, errors, success states, ARIA strings | Claude Code + Claude Design |
| `performance.md` | CWV targets, LCP/CLS/INP rules, bundle budgets, image strategy, font loading, caching, CI gates, pre-launch checklist | Claude Code |

**Design system and brand identity** (colors, typography, spacing, components, tokens) live exclusively in **Claude Design**. No `.md` file overrides it. Always defer to Claude Design for all visual decisions.

---

## 2. Mandatory reading order

```
Step 1 → ai-usage.md       (you are here)
Step 2 → context.md        (always — no exceptions)
Step 3 → task file(s)      (see routing table below)
```

Never skip Step 2. Never read task files before context.

---

## 3. Task routing

| Task | Files to read after context.md |
|---|---|
| Build or edit any component | `architecture.md` → `copy.md` → `performance.md` |
| Write or edit on-page text | `copy.md` |
| Add or edit `<head>`, meta, schema, sitemap | `seo.md` |
| Add images or `alt` text | `seo.md` → `copy.md` → `performance.md` Section 7 |
| Implement form with validation | `architecture.md` → `copy.md` |
| Implement animations or count-up | `performance.md` Sections 5 + 6 |
| Configure `next.config.js` | `performance.md` Section 11 |
| Set up fonts | `performance.md` Section 8 |
| Set up caching headers | `performance.md` Section 9 |
| Set up CI/CD pipeline | `performance.md` Section 13 |
| Pre-launch audit | `performance.md` Section 15 checklist |
| Design a section in Claude Design | `copy.md` |
| Full page audit | all five files |

---

## 4. Hard rules — Content

- **No lorem ipsum.** Every word comes from `copy.md`. No exceptions, including during development.
- **No invented numbers.** Only use statistics documented in `context.md` Section 4.
- **No new services or features.** Only what is listed in `context.md` Section 3.
- **Copy is final.** Use exact text from `copy.md`. Do not rewrite or "improve" unless explicitly asked.
- **Error messages are specified.** Every validation state has copy in `copy.md`. Use it exactly.
- **ARIA strings are specified.** Every `aria-label` and `aria-description` is in `copy.md`. Copy verbatim.

---

## 5. Hard rules — Code

- **Stack is fixed.** Next.js + TypeScript + Tailwind. No alternatives.
- **File structure is fixed.** Follow `architecture.md`. No new files outside the defined structure without asking.
- **Mobile-first.** Build at 375px first. Scale up. Never the reverse.
- **No hardcoded colors or spacing.** Use Tailwind classes mapped to design system tokens, or CSS custom properties. Never raw hex values in JSX/TSX.
- **GSAP is the only animation library.** Import exclusively from `@/lib/gsap`. All ScrollTrigger instances wrapped in `gsap.context()` with `ctx.revert()` cleanup. No Framer Motion, Anime.js, AOS, or any other animation library.
- **No other animation library.** GSAP covers scroll reveals, count-up, stagger, parallax, and timeline entrances. CSS covers hover and micro-interactions only.
- **No blocking JavaScript.** GA4 loads `afterInteractive`. GSAP is client-side only (`'use client'`).
- **Images use `next/image` always.** Never `<img>` tags. `priority` prop only on hero image.
- **One H1 per page.** The hero headline. No other element is H1 under any circumstance.

---

## 6. Hard rules — SEO

- **Heading hierarchy is strict.** H1 → H2 → H3 only. Never skip a level. Never use a heading for visual styling.
- **Every image has `alt`.** Decorative images use `alt=""`. All other alt text is in `copy.md` and `seo.md`.
- **Canonical is always present.** `<link rel="canonical" href="https://www.eventizer.tn/" />`
- **`lang="fr"` on `<html>`.** Always. Without exception.
- **Structured data is required.** Organization + LocalBusiness + WebSite schemas in `<head>`. Exact JSON from `seo.md`.
- **`robots.txt` allows all AI crawlers.** No blocking of GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
- **`llms.txt` must be created.** At `public/llms.txt`. Content in `seo.md` Section 12.

---

## 7. Hard rules — Accessibility

- **WCAG AA minimum.** Non-negotiable. Applies to every component.
- **Keyboard navigation.** Every interactive element reachable and usable by keyboard.
- **Focus ring visible.** Never `outline: none` without a replacement focus style.
- **`prefers-reduced-motion`.** All animations check this. Count-up shows final number immediately. Hover lifts are disabled.
- **Form errors announced.** Error container uses `aria-live="polite"`. Field errors linked via `aria-describedby`.
- **Skip link first.** `<a href="#main-content">Passer au contenu principal</a>` is the first focusable element in the DOM.

---

## 8. Hard rules — Performance

- **CWV targets are non-negotiable.** LCP < 2.0s, CLS < 0.05, INP < 150ms. See `performance.md` Section 1.
- **`priority` on hero image only.** One `<Image priority />` per page. Never on below-fold images.
- **All images declare `width` and `height`.** No exceptions. Missing dimensions cause CLS.
- **Fonts are self-hosted.** No external font CDN. Files live in `/public/fonts/`. See `performance.md` Section 8.
- **`font-display: swap` always.** On every `@font-face` declaration.
- **GSAP + CSS animate `transform` + `opacity` only.** Never animate `width`, `height`, `top`, `left`, `margin`. See `performance.md` Section 5.3.
- **GSAP handles all scroll animations and count-up.** Never `setInterval`. See `performance.md` Section 5.2.
- **Below-fold sections use `dynamic()`.** Hero and Stats are static imports. Everything else is dynamic. See `performance.md` Section 6.4.
- **Bundle budget is a hard cap.** First Load JS ≤ 135KB gzipped (includes GSAP). See `performance.md` Section 6.1.
- **Pre-launch checklist is mandatory.** Every item in `performance.md` Section 15 must be checked before deploy.

---

## 9. Hard rules — Design

- **No visual decisions without Claude Design.** Colors, type, spacing, corner radius, shadows — all from the design system.
- **Real photography only.** No AI-generated images. No stock photos of people in offices. Eventizer's own event photos only.
- **Decorative elements use `aria-hidden="true"`.** Blobs, shapes, circles — always hidden from screen readers.

---

## 10. What agents must never do

- Add a pricing section, pricing table, or any pricing information
- Add a blog, news feed, or testimonials section not in `context.md`
- Use `lang` other than `fr` on any user-facing element
- Create sub-pages or routes other than `/` in v1
- Add any animation library other than GSAP + ScrollTrigger
- Import GSAP directly in components — always use `@/lib/gsap`
- Leave GSAP ScrollTrigger instances without `ctx.revert()` cleanup on unmount
- Add any other dependency not in `architecture.md` without asking first
- Generate or use AI-created images
- Invent team members, case studies, client names, or statistics
- Change the section order defined in `context.md` Section 8
- Write inline CSS `style=""` attributes for colors or spacing (use Tailwind)
- Use `!important` except inside `@media (prefers-reduced-motion: reduce)` blocks
- Remove or reorder form fields without explicit instruction
- Use `setInterval` for any animation — GSAP handles all timed animation
- Load fonts from an external CDN
- Add `priority` prop to any image except the hero

---

## 11. When something is unclear

1. Check `context.md` first — scope, audience, goals
2. Check the relevant task file — architecture, seo, copy, performance
3. If still unclear — **ask, do not guess**
4. Never fill ambiguity with generic content

---

## 12. Source of truth hierarchy

```
Claude Design   ──→  Visual decisions (colors, type, tokens, components)
copy.md         ──→  All text, labels, errors, ARIA strings
seo.md          ──→  Meta, schema, image alt, technical SEO
performance.md  ──→  Bundle budgets, CWV, fonts, caching, CI gates
architecture.md ──→  Stack, file structure, component specs
context.md      ──→  Everything else — scope, audience, goals, constraints
```

When sources appear to conflict — escalate, don't resolve silently.

---

## 13. Versioning

These files define **v1 scope** — June 2026. Any change to scope, stack, copy, or structure must be made in the relevant file before being implemented. The `.md` files are the source of truth. Code and design follow them, not the other way around.

---

## 14. v3 direction — editorial & graphics-forward (June 2026, owner-approved)

The owner approved a more premium, **image- and video-forward editorial** direction
(inspiration: mnbaq.org — generous whitespace, imagery leads, restraint, subtle motion;
scroll feel: nacreous). This **supersedes** the conflicting rules below; everything else holds.

**Now allowed (was forbidden):**
- **AI-generated graphics & video** for **decorative / atmospheric / background** use, produced
  with the **higgsfield CLI** (e.g. cinematic event-vibes hero video, premium background
  textures, generic event-atmosphere card imagery). Supersedes §9/§10 "no AI images" **for
  decoration only**. Store under `public/images/**` and `public/videos/**`.
- **Fewer SVG/line icons.** Prefer real imagery, photography, typography and numerals over
  decorative line-art icons (which read as "AI slop"). Keep only essential, restrained
  functional glyphs (hamburger, social, input affordances).

**Still hard rules (the authenticity line — NOT overridden):**
- **Never AI-generate a real person, event, or product.** Team headshots = real people;
  case-study imagery must NOT depict the *specific* real events as fabrications — use **generic
  premium event-atmosphere** backdrops, with the real event name + verified stat as text. The
  platform screenshot represents the real Command Hub. Protects E-E-A-T (`seo.md` §11) + honesty.
- **Performance still rules.** Hero video: muted/autoplay/loop/playsinline, poster image is the
  LCP element, lazy/`preload="none"`, **desktop + motion-OK only** (poster-only on mobile &
  reduced-motion). Decorative imagery uses `next/image`, `alt=""`, never `priority` except the
  one hero LCP poster.
- **Motion: GSAP only**, `transform`/`opacity`, reduced-motion safe (`@/lib/gsap`).

UI refinement follows the `designer-skills-main` (visual hierarchy, whitespace, restraint) and
`web-animation-design` skills.