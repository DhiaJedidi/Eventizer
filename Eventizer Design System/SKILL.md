---
name: eventizer-design
description: Use this skill to generate well-branded interfaces and assets for Eventizer, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the Eventizer event management platform.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick Reference

**Brand:** Eventizer — *Innovate · Connect · Digitize*
**Domain:** eventizer.io

**Colors:**
- Primary Blue: `#4563AC`
- Secondary Gold: `#E1AA2B`
- Background: `#FFFFFF` / `#F5F5F5`
- Text: `#0D0D0D` / `#616161`

**Fonts:**
- Headings: Montserrat 700 (Google Fonts)
- Body: Poppins 400/600 (Google Fonts)

**Border Radius:** Buttons 8px · Cards 16px · Badges 9999px · Inputs 4px

**Dark mode:** `[data-theme="dark"]` on any ancestor element

**CSS:** Link `styles.css` from the design system root for all tokens.

**Components:** Load `_ds_bundle.js` and access via `window.Eventizer.Button`, `window.Eventizer.Badge`, etc.

**Icons:** Lucide Icons (CDN) — `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`
