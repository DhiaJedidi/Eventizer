import path from 'path'
import { fileURLToPath } from 'url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Submissions } from './collections/Submissions'
import { CaseStudies } from './collections/CaseStudies'
import { TeamMembers } from './collections/TeamMembers'
import { Posts } from './collections/Posts'
import { Hero } from './globals/Hero'
import { Trusted } from './globals/Trusted'
import { Pillars } from './globals/Pillars'
import { TeamBuilding } from './globals/TeamBuilding'
import { Platform } from './globals/Platform'
import { Stats } from './globals/Stats'
import { ReferencesSection } from './globals/ReferencesSection'
import { Testimonials } from './globals/Testimonials'
import { TeamSection } from './globals/TeamSection'
import { WhyEventizer } from './globals/WhyEventizer'
import { BlogSection } from './globals/BlogSection'
import { ContactInfo } from './globals/ContactInfo'
import {
  withHomeRevalidate,
  withHomeRevalidateCollection,
  withPostRevalidate,
} from './hooks/revalidate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Media is stored in Cloudflare R2 (S3-compatible) in production. Active only when
// the R2 credentials are present; in dev (no creds) Media falls back to local disk.
const r2Enabled = Boolean(
  process.env.R2_BUCKET && process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY_ID,
)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Eventizer',
    },
  },
  collections: [
    withPostRevalidate(Posts),
    withHomeRevalidateCollection(CaseStudies),
    withHomeRevalidateCollection(TeamMembers),
    Media,
    Users,
    Submissions,
  ],
  // Every Sections global republishes the homepage on save (instant publishing).
  globals: [
    Hero,
    Trusted,
    Pillars,
    TeamBuilding,
    Platform,
    Stats,
    ReferencesSection,
    Testimonials,
    TeamSection,
    WhyEventizer,
    BlogSection,
    ContactInfo,
  ].map(withHomeRevalidate),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    // Auto-sync the schema in dev / when seeding (creates tables on the target DB,
    // including a fresh Turso DB). Disabled in production so serverless cold starts
    // never try to mutate the schema — the Turso schema is created once at seed time.
    push: process.env.NODE_ENV !== 'production',
    client: {
      url: process.env.DATABASE_URI || 'file:./eventizer.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  sharp,
  plugins: [
    // Always register S3 storage so the admin importMap (and client bundle) always
    // includes its upload component — otherwise enabling it in prod references a
    // component that's missing from the map and crashes the admin to a blank screen.
    // Only *active* when R2 credentials are present (production); uploads then go to
    // Cloudflare R2 and are served back through Payload's /api/media/file route.
    s3Storage({
      enabled: r2Enabled,
      collections: { media: true },
      bucket: process.env.R2_BUCKET || '',
      config: {
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT || '',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
