import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'

// Stub for the Vercel Blob client-upload handler. Uploads run server-side
// (clientUploads: false), so this handler is disabled — but the plugin still
// references it in the admin, and importing the real module pulls Node-only deps
// into the browser bundle (breaks the build). This no-op satisfies the importMap
// lookup so the admin no longer logs "PayloadComponent not found".
// NOTE: manual entry — re-add it if you ever run `payload generate:importmap`.
const VercelBlobClientUploadHandler_stub = () => null

/** @type import('payload').ImportMap */
export const importMap = {
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_stub
}
