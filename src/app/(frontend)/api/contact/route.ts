import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/lib/payload'
import { contactSchema } from '@/lib/schemas'
import { sendContactEmail } from '@/lib/sendEmail'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  // Re-validate server-side with the same schema — never trust the client.
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 422, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const data = parsed.data

  try {
    // 1. Store the lead (Local API, overrideAccess — public create is closed).
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'submissions',
      data: { ...data, status: 'new' },
      overrideAccess: true,
    })

    // 2. Notify the team.
    await sendContactEmail(data)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact] submission failed:', err)
    return NextResponse.json(
      { ok: false, error: 'server' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  return NextResponse.json(
    { ok: true },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  )
}
