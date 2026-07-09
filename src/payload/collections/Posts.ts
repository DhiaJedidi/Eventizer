import type { CollectionConfig } from 'payload'

/** Le Blog — one entry per article. Seeded from content.ts (src/seed.ts). */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'order'],
    group: 'Système',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Ordre d’affichage',
    },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, label: 'Slug (URL)' },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Catégorie',
      options: ['Événementiel', 'Technologie', 'Tendances'],
    },
    { name: 'title', localized: true, type: 'text', required: true, label: 'Titre' },
    { name: 'excerpt', localized: true, type: 'textarea', required: true, label: 'Accroche (résumé)' },
    {
      name: 'author', localized: true,
      type: 'text',
      required: true,
      defaultValue: 'L’équipe Eventizer',
      label: 'Auteur',
    },
    { name: 'date', localized: true, type: 'text', required: true, label: 'Date', admin: { description: 'Ex : 12 mars 2026' } },
    { name: 'readMin', type: 'number', required: true, defaultValue: 5, label: 'Temps de lecture (min)' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de couverture',
      admin: { description: 'Optionnel — une image par défaut est utilisée à défaut.' },
    },
    {
      name: 'markdown', localized: true,
      type: 'textarea',
      required: true,
      label: 'Contenu (Markdown)',
      admin: {
        description:
          'Collez votre texte en Markdown. « ## Sous-titre » pour un titre de section, une ligne vide entre chaque paragraphe.',
        rows: 18,
      },
    },
  ],
}
