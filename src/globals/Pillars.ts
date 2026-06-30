import type { GlobalConfig } from 'payload'

/** "Services" section header (the four-pillars explorer). Seeded from content.ts. */
export const Pillars: GlobalConfig = {
  slug: 'pillars',
  label: 'Services',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (sur-titre)' },
    { name: 'title', type: 'text', required: true, label: 'Titre' },
    { name: 'subtitle', type: 'textarea', label: 'Sous-titre' },
  ],
}
