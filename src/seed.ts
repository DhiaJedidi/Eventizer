/**
 * Seed script — populates Payload globals and collections with the verbatim copy.md
 * content from content.ts. Run with: `npm run seed` (after `npm run dev` has created
 * the DB schema, or after the first build/migration).
 *
 * Idempotent: globals are updated in place; case studies / team members are matched
 * by a natural key (slug / name) and created only if missing. Photos are NOT seeded —
 * upload real portfolio images in /admin (Media alt text is enforced there).
 */
import { getPayload } from 'payload'
import config from '@payload-config'

import {
  BLOG,
  CASE_STUDIES,
  CONTACT,
  CONTACT_INFO,
  HERO,
  PILLARS,
  PLATFORM,
  STATS,
  TEAM,
  TEAM_BUILDING,
  TESTIMONIALS,
  TRUSTED,
  WHY,
} from './lib/content'

// content.ts stores article bodies as heading/paragraph blocks; serialise them to
// the Markdown stored in the Posts.markdown field (## heading, blank line between).
function blocksToMarkdown(body: (typeof BLOG.posts)[number]['body']): string {
  return body.map((b) => ('heading' in b ? `## ${b.heading}\n\n${b.text}` : b.text)).join('\n\n')
}

const seed = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding globals…')

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      eyebrow: HERO.eyebrow,
      h1: HERO.h1,
      subheadline: HERO.subheadline,
      primaryCta: HERO.primaryCta,
      secondaryCta: HERO.secondaryCta,
      trustStrip: HERO.trustStrip,
    },
  })

  await payload.updateGlobal({
    slug: 'stats',
    data: {
      metrics: STATS.metrics.map((m) => ({ value: m.value, label: m.label })),
    },
  })

  await payload.updateGlobal({
    slug: 'platform',
    data: {
      eyebrow: PLATFORM.eyebrow,
      h2: PLATFORM.h2,
      body: PLATFORM.body,
      features: PLATFORM.features.map((label) => ({ label })),
      proofPoint: PLATFORM.proofPoint,
      cta: PLATFORM.cta,
    },
  })

  await payload.updateGlobal({
    slug: 'why-eventizer',
    data: {
      eyebrow: WHY.eyebrow,
      h2: WHY.h2,
      differentiators: WHY.differentiators.map((d) => ({ title: d.title, body: d.body })),
    },
  })

  await payload.updateGlobal({
    slug: 'contact-info',
    data: { eyebrow: CONTACT.eyebrow, title: CONTACT.h2, subtitle: CONTACT.subheadline, ...CONTACT_INFO },
  })

  await payload.updateGlobal({
    slug: 'pillars',
    data: { eyebrow: PILLARS.eyebrow, title: PILLARS.h2, subtitle: PILLARS.subheadline },
  })

  await payload.updateGlobal({
    slug: 'references-section',
    data: { eyebrow: CASE_STUDIES.eyebrow, title: CASE_STUDIES.h2 },
  })

  await payload.updateGlobal({
    slug: 'team-section',
    data: { eyebrow: TEAM.eyebrow, title: TEAM.h2 },
  })

  await payload.updateGlobal({
    slug: 'blog-section',
    data: {
      eyebrow: BLOG.eyebrow,
      title: BLOG.homeHeading,
      subtitle: BLOG.tagline,
      viewAllLabel: BLOG.viewAll,
    },
  })

  await payload.updateGlobal({
    slug: 'trusted',
    data: {
      eyebrow: TRUSTED.eyebrow,
      references: TRUSTED.references.map((name) => ({ name })),
    },
  })

  await payload.updateGlobal({
    slug: 'testimonials',
    data: {
      eyebrow: TESTIMONIALS.eyebrow,
      h2: TESTIMONIALS.h2,
      ticker: TESTIMONIALS.ticker.map((label) => ({ label })),
      items: TESTIMONIALS.items.map((i) => ({
        quote: i.quote,
        author: i.author,
        role: i.role,
        company: i.company,
      })),
    },
  })

  await payload.updateGlobal({
    slug: 'team-building',
    data: {
      eyebrow: 'Cohésion d’équipe',
      h2: TEAM_BUILDING.h2,
      intro: TEAM_BUILDING.intro,
      items: TEAM_BUILDING.items.map((it) => ({ title: it.title, subtitle: it.subtitle })),
    },
  })

  payload.logger.info('Seeding case studies…')
  for (let i = 0; i < CASE_STUDIES.items.length; i++) {
    const c = CASE_STUDIES.items[i]
    const existing = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: c.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'case-studies',
        data: {
          order: i,
          slug: c.slug,
          title: c.title,
          badges: c.badges.map((label) => ({ label })),
          keyStat: c.keyStat,
          statLabel: c.statLabel,
          description: c.description,
        },
      })
    }
  }

  payload.logger.info('Seeding team members…')
  for (let i = 0; i < TEAM.members.length; i++) {
    const m = TEAM.members[i]
    const existing = await payload.find({
      collection: 'team-members',
      where: { name: { equals: m.name } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'team-members',
        data: {
          order: i,
          name: m.name,
          role: m.role,
          oneLiner: m.oneLiner,
        },
      })
    }
  }

  payload.logger.info('Seeding blog posts…')
  for (let i = 0; i < BLOG.posts.length; i++) {
    const p = BLOG.posts[i]
    const markdown = blocksToMarkdown(p.body)
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'posts',
        data: {
          order: i,
          slug: p.slug,
          category: p.category,
          title: p.title,
          excerpt: p.excerpt,
          author: p.author,
          date: p.date,
          readMin: p.readMin,
          markdown,
        },
      })
    } else {
      // Migrate existing posts (body blocks → markdown field).
      await payload.update({ collection: 'posts', id: existing.docs[0].id, data: { markdown } })
    }
  }

  payload.logger.info('✓ Seed complete.')
}

// Top-level await so `payload run` waits for the async seed to finish before
// exiting (a floating promise lets the process exit before writes persist).
try {
  await seed()
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
}
