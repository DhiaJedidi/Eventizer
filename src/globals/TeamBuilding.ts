import type { GlobalConfig } from 'payload'

/** Team Building en mode action. Seeded from content.ts (src/seed.ts). */
export const TeamBuilding: GlobalConfig = {
  slug: 'team-building',
  label: 'Team Building',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (sur-titre)' },
    { name: 'h2', type: 'text', required: true, label: 'Titre H2' },
    { name: 'intro', type: 'textarea', required: true, label: 'Introduction' },
    {
      name: 'items',
      type: 'array',
      label: 'Expériences',
      minRows: 1,
      labels: { singular: 'Expérience', plural: 'Expériences' },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Titre' },
        { name: 'subtitle', type: 'text', required: true, label: 'Sous-titre' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo (optionnel — sinon image par défaut)',
        },
      ],
    },
  ],
}
