import 'server-only'

import { Resend } from 'resend'

import type { ContactInput } from './schemas'

/**
 * Resend wrapper. Sends the team a notification when a contact form is submitted.
 * Throws on failure so the API route can return the system-error state to the client.
 */
export async function sendContactEmail(data: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !to) {
    throw new Error('Email is not configured (RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL).')
  }

  const resend = new Resend(apiKey)

  const subject = `Nouvelle demande de devis — ${data.firstName} ${data.lastName} (${data.eventType})`

  const text = [
    `Prénom : ${data.firstName}`,
    `Nom : ${data.lastName}`,
    `Email : ${data.email}`,
    `Téléphone : ${data.phone}`,
    `Type d'événement : ${data.eventType}`,
    '',
    'Message :',
    data.message,
  ].join('\n')

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    text,
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }
}
