import type { GlobalConfig } from 'payload'

/** Témoignages clients. Seeded from content.ts (src/seed.ts). */
export const Testimonials: GlobalConfig = {
  slug: 'testimonials',
  label: 'Témoignages',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', localized: true, type: 'text', required: true, label: 'Eyebrow' },
    { name: 'h2', localized: true, type: 'text', required: true, label: 'Titre H2 (lecteurs d’écran)' },
    {
      name: 'ticker', localized: true,
      type: 'array',
      label: 'Bandeau défilant (noms)',
      labels: { singular: 'Nom', plural: 'Noms' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'items', localized: true,
      type: 'array',
      label: 'Témoignages',
      minRows: 1,
      labels: { singular: 'Témoignage', plural: 'Témoignages' },
      fields: [
        { name: 'quote', type: 'textarea', required: true, label: 'Citation' },
        { name: 'author', type: 'text', required: true, label: 'Attribution' },
        { name: 'role', type: 'text', required: true, label: 'Fonction / contexte' },
        { name: 'company', type: 'text', required: true, label: 'Organisation' },
      ],
    },
  ],
}
