import path from 'path'
import { fileURLToPath } from 'url'

import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: `output: 'export'` is intentionally NOT set — Payload's admin panel and API
  // require a server runtime. Deploy as Vercel serverless (default output).
  reactStrictMode: true,
  compress: true,

  // Pin the file-tracing root to this project (avoids selecting a stray lockfile
  // in a parent directory).
  outputFileTracingRoot: dirname,

  images: {
    formats: ['image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [120, 160, 400, 600, 800],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: false,
    // Payload Media served from Vercel Blob in production (local dev serves same-origin).
    remotePatterns: [
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'eventizer.tn' }],
        destination: 'https://www.eventizer.tn/:path*',
        permanent: true,
      },
    ]
  },

  // The Vercel Blob admin client-upload handler imports `@vercel/blob/client`, which
  // drags Node built-ins (node:http → undici) into the browser bundle and breaks the
  // build / blanks the admin. We only do server-side uploads, so that handler is dead
  // code — alias it to a no-op stub with the correct Payload shape. The plugin's
  // server storage logic (the package main entry) is untouched, so uploads still go
  // to Vercel Blob.
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@payloadcms/storage-vercel-blob/client': path.resolve(dirname, 'src/stubs/vercel-blob-client.ts'),
    }
    return config
  },
}

export default withPayload(nextConfig)