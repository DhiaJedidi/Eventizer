import type { GlobalConfig } from 'payload'

/**
 * Contact coordinates — drives the Contact section and Footer.
 * Seeded from copy.md / content.ts (src/seed.ts). Replace the placeholder phone /
 * WhatsApp values with the real numbers before launch.
 */
export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'Contact',
  access: { read: () => true },
  admin: { group: 'Sections' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (sur-titre)' },
    { name: 'title', type: 'text', required: true, label: 'Titre' },
    { name: 'subtitle', type: 'textarea', label: 'Sous-titre' },
    { name: 'phoneDisplay', type: 'text', required: true, label: 'Téléphone (affiché)' },
    {
      name: 'phoneHref',
      type: 'text',
      required: true,
      label: 'Téléphone (lien tel:)',
      admin: { description: 'Chiffres uniquement, indicatif compris. Ex : +216XXXXXXXX' },
    },
    { name: 'email', type: 'email', required: true, label: 'Email' },
    {
      name: 'whatsappNumber',
      type: 'text',
      required: true,
      label: 'WhatsApp (numéro wa.me)',
      admin: { description: 'Chiffres uniquement, sans +. Ex : 216XXXXXXXX' },
    },
  ],
}
