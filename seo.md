# seo.md — Eventizer Landing Page SEO Strategy

> Built on E-E-A-T principles, Core Web Vitals (LCP/CLS/INP), GEO (AI search readiness), and local SEO signals for Tunisia. Covers on-page, technical, structured data, and generative engine optimization.

---

## 1. Business type & SEO profile

| Signal | Value |
|---|---|
| Business type | Agency (B2B local service + SaaS) |
| Primary market | Tunisia — French-speaking |
| Secondary market | Francophone Africa, international |
| Page type | Single-page conversion landing page |
| Industry | Event management + digital technology |
| E-E-A-T tier | Local authority — proven at-scale case studies required |

**Industry detection signals present:**
- Phone number + address → local service SEO applies
- Case studies + portfolio → agency SEO applies
- SaaS platform feature set → product SEO signals apply

---

## 2. Keyword strategy

### Primary keywords (high intent, French)

| Keyword | Type | Monthly intent |
|---|---|---|
| agence événementielle Tunisie | Commercial | Core |
| organisation événement Tunis | Commercial | Core |
| agence événementielle Tunis | Commercial | Geo-modified |
| organisation congrès scientifique Tunisie | Commercial | Niche high-value |
| gestion salon professionnel Tunisie | Commercial | Niche high-value |
| plateforme gestion événement | Commercial | SaaS angle |
| production audiovisuelle événement Tunisie | Commercial | Niche |
| communication digitale événementielle Tunisie | Commercial | Niche |
| organisation team building Tunisie | Commercial | Long-tail |
| agence organisation séminaire Tunis | Commercial | Long-tail |
| Eventizer | Branded | Navigational |

### Semantic cluster (support terms for E-E-A-T signals)
- badging événementiel, inscription QR code événement, tableau de bord événementiel
- gestion hôtelière congrès, transfert participants événement
- couverture audiovisuelle événement, photobooth IA événement
- Sommet de la Francophonie Djerba 2022, journées de radiologie Tunisie

### What to avoid
- Do not keyword-stuff H1 or H2
- Do not repeat the same exact-match phrase more than 3× per section
- Do not use keyword variants that change meaning in French

---

## 3. Meta tags

### `<title>`
```
Eventizer — Agence Événementielle & Plateforme Digitale en Tunisie
```
- Length: 63 characters (within 50–60 char sweet spot, acceptable)
- Contains: primary keyword + brand
- No clickbait, no all-caps

### `<meta name="description">`
```
Eventizer organise vos événements de A à Z en Tunisie : management événementiel, 
plateforme digitale, communication et production audiovisuelle. 250+ événements réussis.
```
- Length: 155 characters
- Contains: primary keyword, value proposition, social proof number
- Action-oriented tone, no passive voice
- Unique — not duplicated from H1 or hero subheadline

### `<meta name="robots">`
```
index, follow
```

### `<link rel="canonical">`
```
https://www.eventizer.tn/
```
Always include trailing slash. Prevents duplicate content between `eventizer.tn` and `www.eventizer.tn`.

### `<html lang="fr">`
Required. Signals French content to crawlers and screen readers.

### `<meta name="theme-color">`
```
#3B4BA8
```

---

## 4. Open Graph

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.eventizer.tn/" />
<meta property="og:title" content="Eventizer — Agence Événementielle & Plateforme Digitale en Tunisie" />
<meta property="og:description" content="250+ événements organisés avec succès. Management événementiel, technologie propriétaire, communication et production audiovisuelle — tout sous un même toit." />
<meta property="og:image" content="https://www.eventizer.tn/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Eventizer — agence événementielle et plateforme digitale en Tunisie" />
<meta property="og:locale" content="fr_TN" />
<meta property="og:site_name" content="Eventizer" />
```

**OG image specs:**
- Dimensions: 1200×630px exactly
- File: `public/og-image.jpg`
- Content: logo on brand background, tagline, 1–2 key proof numbers
- Max size: 300KB
- No small text (renders tiny in social previews)

---

## 5. Twitter / X card

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Eventizer — Agence Événementielle & Plateforme Digitale en Tunisie" />
<meta name="twitter:description" content="250+ événements organisés avec succès en Tunisie. Un seul interlocuteur, quatre expertises." />
<meta name="twitter:image" content="https://www.eventizer.tn/og-image.jpg" />
<meta name="twitter:image:alt" content="Eventizer — agence événementielle Tunisie" />
```

---

## 6. Structured data (JSON-LD)

Inject all schemas in `<head>` via `next/script strategy="beforeInteractive"` or inline in `layout.tsx`.

### 6.1 Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Eventizer",
  "alternateName": "Eventizer TN",
  "url": "https://www.eventizer.tn",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.eventizer.tn/logo.svg",
    "width": 200,
    "height": 60
  },
  "description": "Agence événementielle et plateforme digitale en Tunisie. Management événementiel, IT & Tech, communication digitale et production audiovisuelle.",
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "name": "Ahmed Jamoussi",
    "jobTitle": "CEO"
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 6
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TN",
    "addressLocality": "Tunis"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["French", "Arabic"],
    "contactOption": "TollFree"
  },
  "areaServed": [
    { "@type": "Country", "name": "Tunisia" },
    { "@type": "Country", "name": "France" }
  ],
  "knowsAbout": [
    "Gestion événementielle",
    "Plateforme digitale événementielle",
    "Production audiovisuelle",
    "Communication digitale"
  ],
  "award": "Startup Innovante",
  "sameAs": [
    "https://www.linkedin.com/company/eventizer",
    "https://www.instagram.com/eventizer.tn",
    "https://www.facebook.com/eventizer.tn"
  ]
}
```

### 6.2 LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Eventizer",
  "image": "https://www.eventizer.tn/og-image.jpg",
  "url": "https://www.eventizer.tn",
  "telephone": "+216-XX-XXX-XXX",
  "email": "contact@eventizer.tn",
  "priceRange": "Sur devis",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tunis",
    "addressCountry": "TN"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "currenciesAccepted": "TND",
  "paymentAccepted": "Virement bancaire, Chèque, Espèces, Paiement en ligne"
}
```

### 6.3 WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Eventizer",
  "url": "https://www.eventizer.tn",
  "inLanguage": "fr"
}
```

### 6.4 Person schema — CEO (E-E-A-T signal)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ahmed Jamoussi",
  "jobTitle": "CEO",
  "worksFor": {
    "@type": "Organization",
    "name": "Eventizer"
  },
  "url": "https://www.eventizer.tn"
}
```

---

## 7. Heading hierarchy

One H1 per page. Never skip levels. Never use headings for visual styling only.

```
h1  → Hero headline (one, unique, contains primary keyword naturally)
  h2  → Section titles: "Nos services", "Notre plateforme", "Références clients", etc.
    h3  → Sub-items: pillar names, case study titles, team member names, differentiator titles
      h4  → Used only if content genuinely has a third nesting level (avoid in v1)
```

**H1 must:**
- Contain the page's primary keyword naturally (not forced)
- Describe what the page/company does in plain French
- Be unique — not repeated anywhere else on the page

---

## 8. Image SEO

Every `<Image>` requires a descriptive `alt`. Rules:

| Image type | Alt text rule | Example |
|---|---|---|
| Hero | Describes scene + brand context | `"Équipe Eventizer lors d'un congrès scientifique à Tunis"` |
| Platform screenshot | Describes what is shown in the UI | `"Dashboard temps réel de la plateforme Eventizer — suivi inscriptions et paiements"` |
| Case study photo | Event name + organizer | `"18e Sommet de la Francophonie Djerba 2022 — plateforme journalistes Eventizer"` |
| Team headshot | Full name + role | `"Ahmed Jamoussi, CEO d'Eventizer"` |
| Decorative blobs/shapes | Empty string | `alt=""` |
| Logo | Brand + context | `"Eventizer — agence événementielle Tunisie"` |

**File naming** (kebab-case, French descriptors):
```
hero-equipe-eventizer-congres-tunis.jpg
dashboard-plateforme-eventizer.jpg
sommet-francophonie-djerba-2022.jpg
ahmed-jamoussi-ceo-eventizer.jpg
```

**Technical requirements:**
- Format: WebP (Next.js auto-converts via `next/image`)
- Max hero: 1200px wide, ≤ 200KB
- Max team photos: 400×400px, ≤ 60KB
- All images: explicit `width` and `height` props to prevent CLS

---

## 9. Core Web Vitals targets

| Metric | Target | Technique |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | `<Image priority />` on hero, preconnect fonts |
| CLS (Cumulative Layout Shift) | < 0.1 | Explicit image dimensions, `font-display: swap` |
| INP (Interaction to Next Paint) | < 200ms | No blocking JS, lightweight event handlers |

**Implementation checklist:**
- [ ] `priority` prop on hero `<Image>` only
- [ ] `width` + `height` on every `<Image>` (prevents CLS)
- [ ] `<link rel="preconnect">` for font origins in `<head>`
- [ ] GA4 loaded with `strategy="afterInteractive"`
- [ ] Count-up animation uses `requestAnimationFrame`, not `setInterval`
- [ ] CSS animations use `transform` + `opacity` only (GPU composited)

---

## 10. Technical SEO

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://www.eventizer.tn/sitemap.xml
```

### sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.eventizer.tn/</loc>
    <lastmod>2026-06-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Favicon & PWA icons
```html
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

### Canonical
- Always include `<link rel="canonical" href="https://www.eventizer.tn/" />`
- Enforce www redirect at server/DNS level (or non-www — pick one, be consistent)
- No `?utm_*` in canonical

### Security headers (via `next.config.js`)
```js
headers: [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]
```

---

## 11. E-E-A-T signals

**Experience**
- Case studies with real event names, dates, and verified participant numbers
- Real photography from Eventizer's own events
- Platform screenshot showing the actual Command Hub UI

**Expertise**
- Named team members with roles (not anonymous "our team")
- Specific technical claims (Sony FX3 + A7IV specs, CI/CD, VPN, encryption)
- Specific platform modules listed by name

**Authoritativeness**
- Proof of landmark deployment (Sommet de la Francophonie 2022 — verifiable public event)
- Startup Innovante label — verifiable credential
- Client categories: institutional, medical, governmental — high-trust sectors

**Trust**
- Contact info visible (phone, email, WhatsApp)
- Physical location: Tunis, Tunisia
- Legal mentions link in footer
- No unverifiable claims — every stat has a source (the case study)

---

## 12. GEO — Generative Engine Optimization

The page must be indexable and citable by AI systems (ChatGPT, Perplexity, Google AI Overviews, Claude).

**Citability requirements:**
- Every key claim is a standalone, self-contained sentence (not dependent on surrounding context)
- Company name "Eventizer" appears in full in the first paragraph of at least 3 sections
- Key facts stated as direct factual assertions: "Eventizer a organisé 250+ événements en Tunisie depuis 2020."
- Avoid vague language: replace "de nombreux" with the actual number

**AI crawler access:**
- `robots.txt`: no blocking of GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- Create `llms.txt` at site root (see below)

**`public/llms.txt`**
```
# Eventizer

Eventizer est une agence événementielle et une plateforme digitale basée en Tunisie, fondée en 2020.

## Services
- Management événementiel (logistique, hôtellerie, badging, AV)
- IT & Tech (plateforme propriétaire : inscriptions, QR, tableaux de bord)
- Communication digitale (social media, RP, branding)
- Production audiovisuelle (captation 4K, montage, photobooth IA)

## Références clés
- 18e Sommet de la Francophonie, Djerba 2022 — plateforme officielle journalistes (1 000+)
- 23es Journées Franco-Tunisiennes de Radiologie — 700+ participants
- 250+ événements organisés avec succès

## Contact
https://www.eventizer.tn/#contact
```

**Structured snippet optimization:**
- Stats section copy written as standalone factual sentences (AI systems lift these as citations)
- Case study descriptions follow pattern: `[Event name] — [what was delivered] — [result/scale]`

---

## 13. Local SEO signals

| Signal | Implementation |
|---|---|
| NAP consistency | Name, address, phone identical across page, schema, and Google Business Profile |
| Phone number format | `+216-XX-XXX-XXX` — always `tel:` linked |
| Address | Tunis, Tunisia — in footer and LocalBusiness schema |
| Language | `<html lang="fr">` — French content in a French-speaking local market |
| GBP | Create/claim Google Business Profile — category: "Event Management Company" |

---

## 14. Hreflang (future)

Not needed in v1 (French only). Add when Arabic (`ar`) or English (`en`) versions go live:

```html
<link rel="alternate" hreflang="fr" href="https://www.eventizer.tn/" />
<link rel="alternate" hreflang="ar" href="https://www.eventizer.tn/ar/" />
<link rel="alternate" hreflang="x-default" href="https://www.eventizer.tn/" />
```

---

## 15. Analytics & conversion tracking

**GA4 events to configure:**

| Event name | Trigger |
|---|---|
| `contact_form_submit` | Form submit — success state |
| `cta_click` | Any "Demandez un devis" click |
| `whatsapp_click` | WhatsApp button click |
| `phone_click` | `tel:` link click |
| `section_view` | Each section enters viewport (IntersectionObserver) |
| `pillar_expand` | "En savoir plus" accordion open |

**Conversion goal:** `contact_form_submit` is the primary conversion event in GA4.
