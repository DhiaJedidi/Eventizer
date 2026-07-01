import type { CollectionConfig } from 'payload'

/** Références — one entry per case study. Seeded from copy.md (src/seed.ts). */
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Référence',
    plural: 'Références',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'keyStat', 'order'],
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
    { name: 'slug', type: 'text', required: true, unique: true, index: true, label: 'Slug' },
    { name: 'title', localized: true, type: 'text', required: true, label: 'Nom de l’événement' },
    {
      name: 'badges', localized: true,
      type: 'array',
      label: 'Badges',
      maxRows: 2,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'keyStat', type: 'text', required: true, label: 'Chiffre clé' },
    { name: 'statLabel', localized: true, type: 'text', required: true, label: 'Légende du chiffre' },
    { name: 'description', localized: true, type: 'textarea', required: true, label: 'Description' },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
      admin: {
        description: 'Photo réelle du portfolio Eventizer. Le texte alt est porté par le média.',
      },
    },
  ],
}
