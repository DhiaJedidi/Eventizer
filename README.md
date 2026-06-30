# Eventizer — Landing Page

> Single-page B2B conversion landing page for **Eventizer**, a Tunisian event agency
> and proprietary SaaS platform. Built from the specifications in this repository.

**Tagline:** Innovate · Connect · Digitize
**Market:** Tunisia (primary) · Francophone Africa + international (secondary)
**Language:** French — "vous" register only

---

## Running the app

Built with **Next.js 15 (App Router) + Payload CMS 3**. Requires Node 18.20.2+.

```bash
npm install
cp .env.example .env          # fill PAYLOAD_SECRET, DATABASE_URI, RESEND_*, NEXT_PUBLIC_*
npm run dev                   # first run creates the SQLite schema; visit /admin to create the first user
npm run seed                  # populate sections/case studies/team from copy.md (content.ts)
npm run generate:types        # regenerate src/payload-types.ts from the config
```

- Public site: `http://localhost:3000/` · Admin: `http://localhost:3000/admin`
- The page renders real `copy.md` content even before seeding (content.ts fallback); seeding makes it editable in `/admin`.

**Before launch** (assets I can't generate are documented, not invented):
- Add font WOFF2 files → [public/fonts/README.md](public/fonts/README.md)
- Add real photography + favicons + OG image → [public/images/README.md](public/images/README.md)
- Replace placeholder phone/WhatsApp in `/admin` (Coordonnées) — currently `+216 XX XXX XXX`
- Set production `DATABASE_URI` to a Turso libSQL URL + `BLOB_READ_WRITE_TOKEN` for media

---

## What this repository is

This is the **specification repository** for the Eventizer landing page plus its
implementation. It contains the complete source of truth — scope, copy, architecture, SEO,
and performance rules — from which the site is built.

The `.md` files lead; code and design follow them, never the reverse. Any change to scope,
stack, copy, or structure is made in the relevant file **before** it is implemented.

**Design system & brand identity** (colors, typography, spacing, components, tokens) are
defined in [`tokens.json`](tokens.json) (machine source of truth) and applied in
[design.md](design.md) (human-readable, includes the vibe direction). Visual changes start in
`tokens.json`, then `design.md`.

---

## Start here — reading order

Every agent reads these in order before starting any task:

1. **[ai-usage.md](ai-usage.md)** — the rulebook. Reading order, task routing, hard rules. **Read first, always.**
2. **[context.md](context.md)** — who Eventizer is, the 4 pillars, audience, tone, page structure, constraints. **No exceptions.**
3. **Task file(s)** — pick from the routing table below.

---

## Files

| File | Contains |
|---|---|
| [ai-usage.md](ai-usage.md) | Agent rules & orchestration — reading order, task routing, hard rules, source-of-truth hierarchy |
| [context.md](context.md) | Company identity, the 4 pillars, key numbers, audience, tone, page structure, constraints |
| [architecture.md](architecture.md) | Stack (Next.js 14 + TS + Tailwind), file structure, per-section specs, responsive breakpoints, a11y |
| [copy.md](copy.md) | Every word on the page — headlines, body, CTAs, labels, validation errors, success states, ARIA strings |
| [seo.md](seo.md) | Meta tags, Open Graph, JSON-LD schemas, heading hierarchy, image SEO, GEO / `llms.txt`, local SEO, analytics |
| [performance.md](performance.md) | Core Web Vitals targets, LCP/CLS/INP rules, bundle budgets, image & font strategy, caching, CI gates, pre-launch checklist |
| [design.md](design.md) | Design system — color, typography, spacing, radius, component patterns, Tailwind mapping, and the event-agency vibe direction (from `tokens.json`) |

---

## Task routing

After `context.md`, read the file(s) for your task:

| Task | Read after `context.md` |
|---|---|
| Build or edit a component | `architecture.md` → `copy.md` → `performance.md` |
| Write or edit on-page text | `copy.md` |
| Edit `<head>`, meta, schema, sitemap | `seo.md` |
| Add images or `alt` text | `seo.md` → `copy.md` → `performance.md` §7 |
| Contact form + validation | `architecture.md` → `copy.md` |
| Animations / count-up | `performance.md` §5 + §6 |
| `next.config.js`, fonts, caching, CI | `performance.md` §11 / §8 / §9 / §13 |
| Pre-launch audit | `performance.md` §15 |
| Full page audit | all five files |

---

## Page at a glance

Single URL, anchor navigation, fixed section order:

| # | Section | Conversion role |
|---|---|---|
| 1 | Navbar | Navigation + persistent CTA |
| 2 | Hero (`#hero`) | Hook — value proposition |
| 3 | Chiffres clés (`#chiffres`) | Trust — prove scale |
| 4 | Les 4 piliers (`#services`) | Clarity — full service scope |
| 5 | Notre plateforme (`#plateforme`) | Differentiation — the tech edge |
| 6 | Références (`#references`) | Social proof — real events |
| 7 | Notre équipe (`#equipe`) | Human trust |
| 8 | Pourquoi Eventizer (`#pourquoi`) | Objection handling |
| 9 | Contact (`#contact`) | Conversion — lead capture |
| 10 | Footer | Close + legal |

**Primary conversion:** a qualified lead via the contact form (`#contact`).

---

## Stack

Next.js 14+ (App Router) · **Payload CMS 3** (in-app admin + content) · TypeScript ·
SQLite/Turso · Tailwind CSS · React Hook Form + Zod · Resend (transactional email) ·
Google Analytics 4 · Vercel.

See [architecture.md](architecture.md) for the full file structure and section specs.

---

## Non-negotiables

- **French only**, "vous" register — no multilingual in v1.
- **No pricing**, no blog, no testimonials section — pure conversion focus.
- **Real content only** — copy comes verbatim from `copy.md`; no lorem ipsum, no invented numbers.
- **Real photography only** — no AI-generated images, no generic stock.
- **One H1** (the hero headline); strict H1 → H2 → H3 hierarchy.
- **CWV are hard targets** — LCP < 2.0s · CLS < 0.05 · INP < 150ms.
- **WCAG AA** across every component.

When sources conflict, **escalate — do not resolve silently.** When something is unclear,
**ask — do not guess.** See [ai-usage.md](ai-usage.md) §11–§12.

---

*v1 scope — June 2026. The `.md` files are the source of truth; code and design follow them.*