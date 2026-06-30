import type { GlobalConfig } from 'payload'

/** Notre plateforme. Seeded from copy.md (src/seed.ts). */
export const Platform: GlobalConfig = {
  slug: 'platform',
  label: 'Plateforme',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', required: true, label: 'Eyebrow' },
    { name: 'h2', type: 'text', required: true, label: 'Titre H2' },
    { name: 'body', type: 'textarea', required: true, label: 'Paragraphe' },
    {
      name: 'features',
      type: 'array',
      label: 'Modules',
      minRows: 1,
      labels: { singular: 'Module', plural: 'Modules' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'proofPoint', type: 'textarea', required: true, label: 'Preuve' },
    { name: 'cta', type: 'text', required: true, label: 'CTA' },
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: 'media',
      label: 'Capture de la plateforme',
    },
  ],
}
