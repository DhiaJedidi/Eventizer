import type { GlobalConfig } from 'payload'

/** "Ils nous ont fait confiance" — references strip. Seeded from content.ts. */
export const Trusted: GlobalConfig = {
  slug: 'trusted',
  label: 'Bandeau partenaires',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', required: true, label: 'Eyebrow' },
    {
      name: 'references',
      type: 'array',
      label: 'Références',
      minRows: 1,
      labels: { singular: 'Référence', plural: 'Références' },
      fields: [{ name: 'name', type: 'text', required: true, label: 'Nom' }],
    },
  ],
}
