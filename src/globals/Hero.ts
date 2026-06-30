import type { GlobalConfig } from 'payload'

/** Hero section content. Defaults seeded from copy.md (src/seed.ts). */
export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', required: true, label: 'Eyebrow' },
    { name: 'h1', type: 'text', required: true, label: 'Titre H1' },
    { name: 'subheadline', type: 'textarea', required: true, label: 'Sous-titre' },
    { name: 'primaryCta', type: 'text', required: true, label: 'CTA principal' },
    { name: 'secondaryCta', type: 'text', required: true, label: 'CTA secondaire' },
    { name: 'trustStrip', type: 'text', required: true, label: 'Bandeau de confiance' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Visuel du hero',
      admin: {
        description:
          'Optionnel. Si vide, le visuel statique /images/hero est utilisé (image LCP prioritaire).',
      },
    },
  ],
}
