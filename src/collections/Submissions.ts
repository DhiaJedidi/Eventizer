import type { CollectionConfig } from 'payload'

/**
 * Contact-form leads. Created server-side by POST /api/contact via the Local API
 * (overrideAccess) — never by a public REST call. Read/update restricted to
 * authenticated admins; never publicly readable.
 */
export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: {
    singular: 'Demande',
    plural: 'Demandes',
  },
  access: {
    // Public create is closed; the API route uses the Local API with overrideAccess.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'eventType', 'status', 'createdAt'],
    group: 'Demande',
  },
  fields: [
    { name: 'firstName', type: 'text', required: true, label: 'Prénom' },
    { name: 'lastName', type: 'text', required: true, label: 'Nom' },
    { name: 'email', type: 'email', required: true, label: 'Email professionnel' },
    { name: 'phone', type: 'text', required: true, label: 'Téléphone' },
    { name: 'eventType', type: 'text', required: true, label: 'Type d’événement' },
    { name: 'message', type: 'textarea', required: true, label: 'Message' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Statut',
      options: [
        { label: 'Nouvelle', value: 'new' },
        { label: 'Contactée', value: 'contacted' },
        { label: 'Archivée', value: 'archived' },
      ],
    },
  ],
}
