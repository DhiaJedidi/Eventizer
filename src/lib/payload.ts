import { getPayload, type Payload } from 'payload'

let clientPromise: Promise<Payload> | null = null

/**
 * Cached Payload Local API client for Server Components and the contact route.
 *
 * The Payload config (and its database connection) is imported **lazily** so that
 * a config or DB initialisation failure in production is *contained*: the awaiting
 * caller's try/catch falls back to the static copy in content.ts, instead of a
 * top-level import failure taking down the whole route module (white screen /
 * "server-side exception"). On failure the cache is cleared so the next request
 * can retry a transient issue.
 */
export function getPayloadClient(): Promise<Payload> {
  if (!clientPromise) {
    clientPromise = (async () => {
      const { default: config } = await import('@payload-config')
      return getPayload({ config })
    })()
    clientPromise.catch(() => {
      clientPromise = null
    })
  }
  return clientPromise
}
