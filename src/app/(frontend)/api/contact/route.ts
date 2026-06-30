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

  // 1. Store the lead (Local API, overrideAccess — public create is closed).
  //    This is the critical step: if it fails, the request fails.
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'submissions',
      data: { ...data, status: 'new' },
      overrideAccess: true,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact] submission failed:', err)
    return NextResponse.json(
      { ok: false, error: 'server' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  // 2. Notify the team — best-effort. The lead is already saved (visible in
  //    /admin → Demande), so a missing/broken email config must never surface an
  //    error to the visitor or lose the lead.
  try {
    await sendContactEmail(data)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact] email notification failed (lead saved):', err)
  }

  return NextResponse.json(
    { ok: true },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  )
}
