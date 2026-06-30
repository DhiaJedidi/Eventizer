import type { CollectionConfig } from 'payload'

/** Équipe — one entry per member. Seeded from copy.md (src/seed.ts). */
export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: {
    singular: 'Membre de l’équipe',
    plural: 'Équipe',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
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
    { name: 'name', type: 'text', required: true, label: 'Nom complet' },
    { name: 'role', type: 'text', required: true, label: 'Rôle' },
    { name: 'oneLiner', type: 'textarea', required: true, label: 'Phrase de présentation' },
    {
      name: 'headshot',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
      admin: {
        description: 'Portrait réel du membre. Le texte alt est porté par le média.',
      },
    },
  ],
}
