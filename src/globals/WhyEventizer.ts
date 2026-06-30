import type { GlobalConfig } from 'payload'

/** Pourquoi Eventizer — 3 differentiators. Seeded from copy.md (src/seed.ts). */
export const WhyEventizer: GlobalConfig = {
  slug: 'why-eventizer',
  label: 'Pourquoi Eventizer',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', required: true, label: 'Eyebrow' },
    { name: 'h2', type: 'text', required: true, label: 'Titre H2' },
    {
      name: 'differentiators',
      type: 'array',
      label: 'Différenciateurs',
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Différenciateur', plural: 'Différenciateurs' },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Titre' },
        { name: 'body', type: 'textarea', required: true, label: 'Texte' },
      ],
    },
  ],
}
