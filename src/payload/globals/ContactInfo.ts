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
    { name: 'eyebrow', localized: true, type: 'text', label: 'Eyebrow (sur-titre)' },
    { name: 'title', localized: true, type: 'text', required: true, label: 'Titre' },
    { name: 'subtitle', localized: true, type: 'textarea', label: 'Sous-titre' },
    { name: 'phoneDisplay', type: 'text', required: true, label: 'Téléphone (affiché)' },
    {
      name: 'phoneHref',
      type: 'text',
      required: true,
      label: 'Téléphone (lien tel:)',
      admin: { description: 'Chiffres uniquement, indicatif compris. Ex : +216XXXXXXXX' },
    },
    { name: 'email', type: 'email', required: true, label: 'Email (affiché)' },
    {
      name: 'whatsappNumber',
      type: 'text',
      required: true,
      label: 'WhatsApp (numéro wa.me)',
      admin: { description: 'Chiffres uniquement, sans +. Ex : 216XXXXXXXX' },
    },
    {
      name: 'notificationEmail',
      type: 'email',
      label: 'Email de réception des demandes',
      // Internal routing address — kept out of the public API (only admins can
      // read it); the server reads it via the Local API (overrideAccess).
      access: { read: ({ req }) => Boolean(req.user) },
      admin: {
        description:
          "Adresse qui reçoit les demandes du formulaire « Envoyer une demande » (ex. commercial ou responsable événementiel). Si vide, l'adresse par défaut du serveur (CONTACT_TO_EMAIL) est utilisée.",
      },
    },
  ],
}
