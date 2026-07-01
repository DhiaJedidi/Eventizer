/**
 * Seed script — populates Payload globals and collections in all three locales
 * (fr / en / ar) from content.ts, content.en.ts and content.ar.ts.
 * Run with: `npm run seed` (after the schema exists / a migration).
 *
 * Idempotent: globals are updated in place per locale; case studies / team members /
 * posts are matched by natural key (slug / name) and created if missing, then each
 * locale's localized fields are written. Photos are NOT seeded — upload in /admin.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

import * as frC from './lib/content'
import * as enC from './lib/content.en'
import * as arC from './lib/content.ar'

type Content = typeof frC
const CONTENT: Record<'fr' | 'en' | 'ar', Content> = {
  fr: frC,
  en: enC as unknown as Content,
  ar: arC as unknown as Content,
}
const LOCALES = ['fr', 'en', 'ar'] as const

// content.ts stores article bodies as heading/paragraph blocks; serialise them to
// the Markdown stored in the Posts.markdown field (## heading, blank line between).
function blocksToMarkdown(body: Content['BLOG']['posts'][number]['body']): string {
  return body.map((b) => ('heading' in b ? `## ${b.heading}\n\n${b.text}` : b.text)).join('\n\n')
}

const seed = async () => {
  const payload = await getPayload({ config })

  // ── Globals — written once per locale ──────────────────────────────────────
  for (const locale of LOCALES) {
    const C = CONTENT[locale]
    payload.logger.info(`Seeding globals [${locale}]…`)

    await payload.updateGlobal({
      slug: 'hero',
      locale,
      data: {
        eyebrow: C.HERO.eyebrow,
        h1: C.HERO.h1,
        subheadline: C.HERO.subheadline,
        primaryCta: C.HERO.primaryCta,
        secondaryCta: C.HERO.secondaryCta,
        trustStrip: C.HERO.trustStrip,
      },
    })

    await payload.updateGlobal({
      slug: 'stats',
      locale,
      data: { metrics: C.STATS.metrics.map((m) => ({ value: m.value, label: m.label })) },
    })

    await payload.updateGlobal({
      slug: 'platform',
      locale,
      data: {
        eyebrow: C.PLATFORM.eyebrow,
        h2: C.PLATFORM.h2,
        body: C.PLATFORM.body,
        features: C.PLATFORM.features.map((label) => ({ label })),
        proofPoint: C.PLATFORM.proofPoint,
        cta: C.PLATFORM.cta,
      },
    })

    await payload.updateGlobal({
      slug: 'why-eventizer',
      locale,
      data: {
        eyebrow: C.WHY.eyebrow,
        h2: C.WHY.h2,
        differentiators: C.WHY.differentiators.map((d) => ({ title: d.title, body: d.body })),
      },
    })

    await payload.updateGlobal({
      slug: 'contact-info',
      locale,
      data: { eyebrow: C.CONTACT.eyebrow, title: C.CONTACT.h2, subtitle: C.CONTACT.subheadline, ...C.CONTACT_INFO },
    })

    await payload.updateGlobal({
      slug: 'pillars',
      locale,
      data: { eyebrow: C.PILLARS.eyebrow, title: C.PILLARS.h2, subtitle: C.PILLARS.subheadline },
    })

    await payload.updateGlobal({
      slug: 'references-section',
      locale,
      data: { eyebrow: C.CASE_STUDIES.eyebrow, title: C.CASE_STUDIES.h2 },
    })

    await payload.updateGlobal({
      slug: 'team-section',
      locale,
      data: { eyebrow: C.TEAM.eyebrow, title: C.TEAM.h2 },
    })

    await payload.updateGlobal({
      slug: 'blog-section',
      locale,
      data: {
        eyebrow: C.BLOG.eyebrow,
        title: C.BLOG.homeHeading,
        subtitle: C.BLOG.tagline,
        viewAllLabel: C.BLOG.viewAll,
      },
    })

    await payload.updateGlobal({
      slug: 'trusted',
      locale,
      data: {
        eyebrow: C.TRUSTED.eyebrow,
        references: C.TRUSTED.references.map((name) => ({ name })),
      },
    })

    await payload.updateGlobal({
      slug: 'testimonials',
      locale,
      data: {
        eyebrow: C.TESTIMONIALS.eyebrow,
        h2: C.TESTIMONIALS.h2,
        ticker: C.TESTIMONIALS.ticker.map((label) => ({ label })),
        items: C.TESTIMONIALS.items.map((i) => ({
          quote: i.quote,
          author: i.author,
          role: i.role,
          company: i.company,
        })),
      },
    })

    await payload.updateGlobal({
      slug: 'team-building',
      locale,
      data: {
        eyebrow: locale === 'en' ? 'Team cohesion' : locale === 'ar' ? 'تماسك الفريق' : 'Cohésion d’équipe',
        h2: C.TEAM_BUILDING.h2,
        intro: C.TEAM_BUILDING.intro,
        items: C.TEAM_BUILDING.items.map((it) => ({ title: it.title, subtitle: it.subtitle })),
      },
    })
  }

  // ── Case studies ───────────────────────────────────────────────────────────
  payload.logger.info('Seeding case studies…')
  for (let i = 0; i < frC.CASE_STUDIES.items.length; i++) {
    const fr = frC.CASE_STUDIES.items[i]
    const existing = await payload.find({ collection: 'case-studies', where: { slug: { equals: fr.slug } }, limit: 1 })
    let id = existing.docs[0]?.id
    if (!id) {
      const created = await payload.create({
        collection: 'case-studies',
        locale: 'fr',
        data: {
          order: i,
          slug: fr.slug,
          title: fr.title,
          badges: fr.badges.map((label) => ({ label })),
          keyStat: fr.keyStat,
          statLabel: fr.statLabel,
          description: fr.description,
        },
      })
      id = created.id
    }
    for (const locale of LOCALES) {
      const c = CONTENT[locale].CASE_STUDIES.items[i]
      await payload.update({
        collection: 'case-studies',
        id,
        locale,
        data: { title: c.title, badges: c.badges.map((label) => ({ label })), statLabel: c.statLabel, description: c.description },
      })
    }
  }

  // ── Team members ───────────────────────────────────────────────────────────
  payload.logger.info('Seeding team members…')
  for (let i = 0; i < frC.TEAM.members.length; i++) {
    const fr = frC.TEAM.members[i]
    const existing = await payload.find({ collection: 'team-members', where: { name: { equals: fr.name } }, limit: 1 })
    let id = existing.docs[0]?.id
    if (!id) {
      const created = await payload.create({
        collection: 'team-members',
        locale: 'fr',
        data: { order: i, name: fr.name, role: fr.role, oneLiner: fr.oneLiner },
      })
      id = created.id
    }
    for (const locale of LOCALES) {
      const m = CONTENT[locale].TEAM.members[i]
      await payload.update({ collection: 'team-members', id, locale, data: { role: m.role, oneLiner: m.oneLiner } })
    }
  }

  // ── Blog posts ─────────────────────────────────────────────────────────────
  payload.logger.info('Seeding blog posts…')
  for (let i = 0; i < frC.BLOG.posts.length; i++) {
    const fr = frC.BLOG.posts[i]
    const existing = await payload.find({ collection: 'posts', where: { slug: { equals: fr.slug } }, limit: 1 })
    let id = existing.docs[0]?.id
    if (!id) {
      const created = await payload.create({
        collection: 'posts',
        locale: 'fr',
        data: {
          order: i,
          slug: fr.slug,
          category: fr.category, // fixed French key (translated for display on the frontend)
          readMin: fr.readMin,
          title: fr.title,
          excerpt: fr.excerpt,
          author: fr.author,
          date: fr.date,
          markdown: blocksToMarkdown(fr.body),
        },
      })
      id = created.id
    }
    for (const locale of LOCALES) {
      const p = CONTENT[locale].BLOG.posts[i]
      await payload.update({
        collection: 'posts',
        id,
        locale,
        data: { title: p.title, excerpt: p.excerpt, author: p.author, date: p.date, markdown: blocksToMarkdown(p.body) },
      })
    }
  }

  payload.logger.info('✓ Seed complete (fr / en / ar).')
}

// Top-level await so `payload run` waits for the async seed to finish.
try {
  await seed()
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
}
