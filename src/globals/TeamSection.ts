import type { GlobalConfig } from 'payload'

/**
 * "Équipe" section header. The member cards live in the Système → Équipe collection.
 * Seeded from content.ts.
 */
export const TeamSection: GlobalConfig = {
  slug: 'team-section',
  label: 'Équipe',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', localized: true, type: 'text', label: 'Eyebrow (sur-titre)' },
    { name: 'title', localized: true, type: 'text', required: true, label: 'Titre' },
    { name: 'subtitle', localized: true, type: 'textarea', label: 'Sous-titre' },
  ],
}
