import type { CollectionConfig } from 'payload'

/** Admin/editor authentication. Editors log in at /admin with these accounts. */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Système',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
    },
  ],
}
