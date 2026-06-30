import os from 'os'
import path from 'path'

import type { CollectionConfig } from 'payload'

/**
 * Uploaded images for editable collections (case studies, team).
 * `alt` is required — enforces the seo.md §8 alt-text rule: no image can be saved
 * without descriptive alt text. Payload generates resized variants; the frontend
 * renders them through next/image for WebP + srcset.
 *
 * Storage:
 *  - `BLOB_READ_WRITE_TOKEN` set → Vercel Blob (persistent; see payload.config.ts);
 *    this `staticDir` is then unused.
 *  - Local dev → ./media (persists on disk).
 *  - On Vercel without a Blob token → the working dir is read-only, so fall back to
 *    the writable temp dir. This stops /admin from crashing (`mkdir 'media'`); note
 *    uploads there are ephemeral until real Blob/S3 storage is configured.
 */
const MEDIA_DIR =
  process.env.MEDIA_DIR || (process.env.VERCEL ? path.join(os.tmpdir(), 'media') : 'media')

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Système',
  },
  upload: {
    staticDir: MEDIA_DIR,
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 800, height: 500, position: 'centre' },
      { name: 'wide', width: 1200, height: 800, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texte alternatif (alt)',
      admin: {
        description:
          'Décrit l’image pour le SEO et les lecteurs d’écran. Obligatoire (seo.md §8).',
      },
    },
  ],
}
