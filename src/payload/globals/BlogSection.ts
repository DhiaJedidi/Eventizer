import type { GlobalConfig } from 'payload'

/**
 * "Blog" section header (home teaser). The articles live in the Système → Blog
 * collection; pick which ones to feature here via `featuredPosts` (empty = the 3
 * most recent). Seeded from content.ts.
 */
export const BlogSection: GlobalConfig = {
  slug: 'blog-section',
  label: 'Blog',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', localized: true, type: 'text', label: 'Eyebrow (sur-titre)' },
    { name: 'title', localized: true, type: 'text', required: true, label: 'Titre' },
    { name: 'subtitle', localized: true, type: 'textarea', label: 'Sous-titre' },
    { name: 'viewAllLabel', localized: true, type: 'text', required: true, label: 'Libellé du bouton « Voir tout »' },
    {
      name: 'featuredPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Articles mis en avant',
      admin: {
        description:
          'Sélectionnez les articles à afficher sur l’accueil (dans l’ordre). Laisser vide = les 3 plus récents.',
      },
    },
  ],
}
