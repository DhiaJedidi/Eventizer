'use client'

import { createClientUploadHandler } from '@payloadcms/plugin-cloud-storage/client'

// Stub for `@payloadcms/storage-vercel-blob/client`.
//
// The real handler imports `upload` from `@vercel/blob/client`, which pulls Node
// built-ins (node:http → undici) into the browser bundle — that fails the build and,
// if missing from the importMap, crashes the admin to a blank screen.
//
// We use server-side uploads (clientUploads: false), so this handler is never
// invoked. It only needs the correct Payload shape (a real createClientUploadHandler)
// so the admin importMap resolves it. next.config aliases the real module to this.
export const VercelBlobClientUploadHandler = createClientUploadHandler({
  handler: async () => ({}),
})
