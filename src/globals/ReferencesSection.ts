import type { GlobalConfig } from 'payload'

/**
 * "Références" section header (the pinned case-study carousel). The case-study
 * cards themselves live in the Système → Références collection. Seeded from content.ts.
 */
export const ReferencesSection: GlobalConfig = {
  slug: 'references-section',
  label: 'Références',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (sur-titre)' },
    { name: 'title', type: 'text', required: true, label: 'Titre' },
    { name: 'subtitle', type: 'textarea', label: 'Sous-titre' },
  ],
}
