import { z } from 'zod'

import { CONTACT } from './content'

const e = CONTACT.errors

/**
 * Contact form schema — shared by the client form (React Hook Form resolver) and
 * the API route (server-side re-validation). One source of validation truth.
 * Error messages are taken verbatim from copy.md.
 */
export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, e.firstNameRequired)
    .min(2, e.firstNameShort),

  lastName: z.string().min(1, e.lastNameRequired),

  email: z
    .string()
    .min(1, e.emailRequired)
    .email(e.emailInvalid),

  phone: z
    .string()
    .min(1, e.phoneRequired)
    // Accepts international format with optional +, spaces and digits (min 8 digits).
    .refine((v) => /^\+?[0-9\s]{8,20}$/.test(v.trim()), e.phoneInvalid),

  eventType: z
    .string()
    .min(1, e.eventTypeRequired)
    .refine(
      (v) => (CONTACT.eventTypeOptions as readonly string[]).includes(v),
      e.eventTypeRequired,
    ),

  message: z
    .string()
    .min(1, e.messageRequired)
    .min(20, e.messageShort),
})

export type ContactInput = z.infer<typeof contactSchema>
