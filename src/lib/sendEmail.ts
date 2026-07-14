import 'server-only'

import sgMail from '@sendgrid/mail'

import type { ContactInput } from './schemas'

/**
 * SendGrid wrapper. Notifies the team when a contact form ("Envoyer une demande")
 * is submitted. Throws on failure so the caller can decide how to react — the
 * route treats notification as best-effort (the lead is already persisted).
 *
 * The recipient is passed in (configurable in Payload → Contact →
 * "Email de réception des demandes"); if omitted it falls back to
 * CONTACT_TO_EMAIL. The sender (from) and API key come from the environment.
 */
export async function sendContactEmail(data: ContactInput, to?: string): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const recipient = to?.trim() || process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !recipient) {
    throw new Error(
      'Email is not configured (SENDGRID_API_KEY / CONTACT_FROM_EMAIL / recipient).',
    )
  }

  sgMail.setApiKey(apiKey)

  const subject = `Nouvelle demande de devis — ${data.firstName} ${data.lastName} (${data.eventType})`

  const rows: Array<[string, string]> = [
    ['Prénom', data.firstName],
    ['Nom', data.lastName],
    ['Email', data.email],
    ['Téléphone', data.phone],
    ["Type d'événement", data.eventType],
  ]

  const text = [
    ...rows.map(([k, v]) => `${k} : ${v}`),
    '',
    'Message :',
    data.message,
  ].join('\n')

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;line-height:1.5">
      <h2 style="margin:0 0 16px;font-size:18px">Nouvelle demande de devis</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666;white-space:nowrap">${esc(
                k,
              )}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin:16px 0 4px;color:#666;font-size:14px">Message :</p>
      <p style="margin:0;font-size:14px;white-space:pre-wrap">${esc(data.message)}</p>
    </div>
  `

  // sgMail.send throws on a non-2xx response, so no error object to inspect.
  await sgMail.send({
    to: recipient,
    from,
    replyTo: data.email,
    subject,
    text,
    html,
  })
}
