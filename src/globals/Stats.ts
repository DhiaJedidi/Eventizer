import type { GlobalConfig } from 'payload'

/** Chiffres clés — the 4 trust metrics. Seeded from copy.md (src/seed.ts). */
export const Stats: GlobalConfig = {
  slug: 'stats',
  label: 'Chiffres clés',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    {
      name: 'metrics', localized: true,
      type: 'array',
      label: 'Métriques',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Métrique', plural: 'Métriques' },
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Valeur' },
        { name: 'label', type: 'text', required: true, label: 'Libellé' },
      ],
    },
  ],
}
