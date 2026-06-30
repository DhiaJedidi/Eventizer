import path from 'path'
import { fileURLToPath } from 'url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const blobToken = process.env.BLOB_READ_WRITE_TOKEN

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Eventizer',
    },
  },
  collections: [Posts, CaseStudies, TeamMembers, Media, Users, Submissions],
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
  ],
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
    // Vercel Blob is enabled only when a token is present (production). In dev,
    // Media falls back to the local ./media directory configured on the collection.
    ...(blobToken
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: true },
            token: blobToken,
          }),
        ]
      : []),
  ],
})
