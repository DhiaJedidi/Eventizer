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
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (sur-titre)' },
    { name: 'title', type: 'text', required: true, label: 'Titre' },
    { name: 'subtitle', type: 'textarea', label: 'Sous-titre' },
  ],
}
