import 'server-only'

import type { Media, Post } from '@/payload-types'
import type {
  BlogBlock,
  BlogPostView,
  BlogSectionView,
  CaseStudyView,
  ContactInfoView,
  HeroView,
  ImageView,
  PlatformView,
  SectionHeaderView,
  StatView,
  TeamBuildingView,
  TeamMemberView,
  TestimonialsView,
  TrustedView,
  WhyView,
} from '@/types'
import { getPayloadClient } from './payload'
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
} from './content'

// Placeholder cover per slug (from content.ts) used until a post has a real upload.
const BLOG_PLACEHOLDER: Record<string, string> = Object.fromEntries(
  BLOG.posts.map((p) => [p.slug, p.image]),
)
const DEFAULT_BLOG_IMAGE = '/images/pillars/management.png'

// Parse light Markdown (headings + paragraphs only) into render blocks. A
// `#`/`##`… line opens a section; the paragraph after it becomes that block's
// text, and further paragraphs are heading-less blocks until the next heading.
function parseMarkdown(md: string): BlogBlock[] {
  const blocks: BlogBlock[] = []
  let pendingHeading: string | undefined
  let para: string[] = []
  const flush = () => {
    const text = para.join(' ').trim()
    para = []
    if (text || pendingHeading) blocks.push(pendingHeading ? { heading: pendingHeading, text } : { text })
    pendingHeading = undefined
  }
  for (const raw of (md ?? '').replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trim()
    const h = line.match(/^#{1,6}\s+(.*)$/)
    if (h) {
      flush()
      pendingHeading = h[1].trim()
    } else if (line === '') {
      flush()
    } else {
      para.push(line)
    }
  }
  flush()
  return blocks.filter((b) => b.text || b.heading)
}

function mapPost(d: Post): BlogPostView {
  return {
    slug: d.slug,
    category: d.category,
    title: d.title,
    excerpt: d.excerpt,
    author: d.author,
    date: d.date,
    readMin: d.readMin,
    image: mediaToImage(d.image)?.url ?? BLOG_PLACEHOLDER[d.slug] ?? DEFAULT_BLOG_IMAGE,
    body: parseMarkdown(d.markdown),
  }
}

function fallbackPost(p: (typeof BLOG.posts)[number]): BlogPostView {
  return {
    slug: p.slug,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    author: p.author,
    date: p.date,
    readMin: p.readMin,
    image: p.image,
    body: p.body.map((b) => ('heading' in b ? { heading: b.heading, text: b.text } : { text: b.text })),
  }
}

// Placeholder photos for team-building cards until real ones are uploaded in /admin.
const TB_PLACEHOLDERS = [
  '/images/cases/sommet.png',
  '/images/cases/radiologie.png',
  '/images/cases/osstem.png',
  '/images/cases/bconnected.png',
]

/**
 * Each getter reads from Payload, and falls back to content.ts (verbatim copy.md)
 * whenever the global/collection is unseeded OR the DB is unavailable (e.g. before
 * the first migration). The page therefore always renders real copy — never empty,
 * never placeholder — and becomes editable in /admin once seeded.
 */

function mediaToImage(media: number | Media | null | undefined): ImageView | null {
  if (!media || typeof media === 'number') return null
  const best = media.sizes?.wide ?? media.sizes?.card
  const url = best?.url ?? media.url
  if (!url) return null
  return {
    url,
    alt: media.alt ?? '',
    width: best?.width ?? media.width ?? 1200,
    height: best?.height ?? media.height ?? 800,
  }
}

export async function getHero(): Promise<HeroView> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'hero', depth: 1 })
    if (g?.h1) {
      return {
        eyebrow: g.eyebrow,
        h1: g.h1,
        subheadline: g.subheadline,
        primaryCta: g.primaryCta,
        secondaryCta: g.secondaryCta,
        trustStrip: g.trustStrip,
        image: mediaToImage(g.image),
      }
    }
  } catch {
    /* fall through to copy.md fallback */
  }
  return {
    eyebrow: HERO.eyebrow,
    h1: HERO.h1,
    subheadline: HERO.subheadline,
    primaryCta: HERO.primaryCta,
    secondaryCta: HERO.secondaryCta,
    trustStrip: HERO.trustStrip,
    image: null,
  }
}

export async function getStats(): Promise<StatView[]> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'stats' })
    if (g?.metrics && g.metrics.length > 0) {
      return g.metrics.map((m) => ({ value: m.value, label: m.label }))
    }
  } catch {
    /* fall through */
  }
  return STATS.metrics.map((m) => ({ value: m.value, label: m.label }))
}

export async function getPlatform(): Promise<PlatformView> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'platform', depth: 1 })
    if (g?.h2) {
      return {
        eyebrow: g.eyebrow,
        h2: g.h2,
        body: g.body,
        features: (g.features ?? []).map((f) => f.label),
        proofPoint: g.proofPoint,
        cta: g.cta,
        screenshot: mediaToImage(g.screenshot),
      }
    }
  } catch {
    /* fall through */
  }
  return {
    eyebrow: PLATFORM.eyebrow,
    h2: PLATFORM.h2,
    body: PLATFORM.body,
    features: [...PLATFORM.features],
    proofPoint: PLATFORM.proofPoint,
    cta: PLATFORM.cta,
    screenshot: null,
  }
}

export async function getWhy(): Promise<WhyView> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'why-eventizer' })
    if (g?.differentiators && g.differentiators.length > 0) {
      return {
        eyebrow: g.eyebrow,
        h2: g.h2,
        differentiators: g.differentiators.map((d) => ({ title: d.title, body: d.body })),
      }
    }
  } catch {
    /* fall through */
  }
  return {
    eyebrow: WHY.eyebrow,
    h2: WHY.h2,
    differentiators: WHY.differentiators.map((d) => ({ title: d.title, body: d.body })),
  }
}

export async function getCaseStudies(): Promise<CaseStudyView[]> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'case-studies',
      sort: 'order',
      depth: 1,
      limit: 50,
    })
    if (res.docs.length > 0) {
      return res.docs.map((d) => ({
        slug: d.slug,
        title: d.title,
        badges: (d.badges ?? []).map((b) => b.label),
        keyStat: d.keyStat,
        statLabel: d.statLabel,
        description: d.description,
        image: mediaToImage(d.photo),
      }))
    }
  } catch {
    /* fall through */
  }
  return CASE_STUDIES.items.map((c) => ({
    slug: c.slug,
    title: c.title,
    badges: [...c.badges],
    keyStat: c.keyStat,
    statLabel: c.statLabel,
    description: c.description,
    image: null,
  }))
}

export async function getTeam(): Promise<TeamMemberView[]> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'team-members',
      sort: 'order',
      depth: 1,
      limit: 50,
    })
    if (res.docs.length > 0) {
      return res.docs.map((m) => ({
        name: m.name,
        role: m.role,
        oneLiner: m.oneLiner,
        image: mediaToImage(m.headshot),
      }))
    }
  } catch {
    /* fall through */
  }
  return TEAM.members.map((m) => ({
    name: m.name,
    role: m.role,
    oneLiner: m.oneLiner,
    image: null,
  }))
}

export async function getTrusted(): Promise<TrustedView> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'trusted' })
    if (g?.references && g.references.length > 0) {
      return { eyebrow: g.eyebrow, references: g.references.map((r) => r.name) }
    }
  } catch {
    /* fall through */
  }
  return { eyebrow: TRUSTED.eyebrow, references: [...TRUSTED.references] }
}

export async function getTestimonials(): Promise<TestimonialsView> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'testimonials' })
    if (g?.items && g.items.length > 0) {
      return {
        eyebrow: g.eyebrow,
        h2: g.h2,
        ticker: (g.ticker ?? []).map((t) => t.label),
        items: g.items.map((i) => ({
          quote: i.quote,
          author: i.author,
          role: i.role,
          company: i.company,
        })),
      }
    }
  } catch {
    /* fall through */
  }
  return {
    eyebrow: TESTIMONIALS.eyebrow,
    h2: TESTIMONIALS.h2,
    ticker: [...TESTIMONIALS.ticker],
    items: TESTIMONIALS.items.map((i) => ({
      quote: i.quote,
      author: i.author,
      role: i.role,
      company: i.company,
    })),
  }
}

export async function getTeamBuilding(): Promise<TeamBuildingView> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'team-building', depth: 1 })
    if (g?.items && g.items.length > 0) {
      return {
        eyebrow: g.eyebrow ?? undefined,
        h2: g.h2,
        intro: g.intro,
        items: g.items.map((it, idx) => ({
          title: it.title,
          subtitle: it.subtitle,
          image: mediaToImage(it.image)?.url ?? TB_PLACEHOLDERS[idx % TB_PLACEHOLDERS.length],
        })),
      }
    }
  } catch {
    /* fall through */
  }
  return {
    h2: TEAM_BUILDING.h2,
    intro: TEAM_BUILDING.intro,
    items: TEAM_BUILDING.items.map((it) => ({
      title: it.title,
      subtitle: it.subtitle,
      image: it.image,
    })),
  }
}

export async function getPosts(): Promise<BlogPostView[]> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'posts', sort: 'order', depth: 1, limit: 100 })
    if (res.docs.length > 0) return res.docs.map(mapPost)
  } catch {
    /* fall through */
  }
  return BLOG.posts.map(fallbackPost)
}

export async function getPostBySlug(slug: string): Promise<BlogPostView | null> {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    })
    if (res.docs.length > 0) return mapPost(res.docs[0])
  } catch {
    /* fall through */
  }
  const p = BLOG.posts.find((x) => x.slug === slug)
  return p ? fallbackPost(p) : null
}

export async function getContactInfo(): Promise<ContactInfoView> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'contact-info' })
    if (g?.email) {
      return {
        eyebrow: g.eyebrow ?? CONTACT.eyebrow,
        title: g.title ?? CONTACT.h2,
        subtitle: g.subtitle ?? CONTACT.subheadline,
        phoneDisplay: g.phoneDisplay,
        phoneHref: g.phoneHref,
        email: g.email,
        whatsappNumber: g.whatsappNumber,
      }
    }
  } catch {
    /* fall through */
  }
  return { eyebrow: CONTACT.eyebrow, title: CONTACT.h2, subtitle: CONTACT.subheadline, ...CONTACT_INFO }
}

/** Generic section-header getter (eyebrow / title / subtitle) for a global slug. */
async function getSectionHeader(
  slug: 'pillars' | 'references-section' | 'team-section',
  fallback: SectionHeaderView,
): Promise<SectionHeaderView> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug })
    if (g?.title) return { eyebrow: g.eyebrow ?? undefined, title: g.title, subtitle: g.subtitle ?? undefined }
  } catch {
    /* fall through */
  }
  return fallback
}

export function getPillars(): Promise<SectionHeaderView> {
  return getSectionHeader('pillars', {
    eyebrow: PILLARS.eyebrow,
    title: PILLARS.h2,
    subtitle: PILLARS.subheadline,
  })
}

export function getReferencesSection(): Promise<SectionHeaderView> {
  return getSectionHeader('references-section', { eyebrow: CASE_STUDIES.eyebrow, title: CASE_STUDIES.h2 })
}

export function getTeamSection(): Promise<SectionHeaderView> {
  return getSectionHeader('team-section', { eyebrow: TEAM.eyebrow, title: TEAM.h2 })
}

export async function getBlogSection(): Promise<BlogSectionView> {
  try {
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'blog-section', depth: 1 })
    if (g?.title) {
      let posts = (g.featuredPosts ?? [])
        .filter((p): p is Post => typeof p === 'object' && p !== null)
        .map(mapPost)
      if (posts.length === 0) posts = (await getPosts()).slice(0, 3)
      return {
        eyebrow: g.eyebrow ?? undefined,
        title: g.title,
        subtitle: g.subtitle ?? undefined,
        viewAll: g.viewAllLabel,
        posts,
      }
    }
  } catch {
    /* fall through */
  }
  return {
    eyebrow: BLOG.eyebrow,
    title: BLOG.homeHeading,
    subtitle: BLOG.tagline,
    viewAll: BLOG.viewAll,
    posts: (await getPosts()).slice(0, 3),
  }
}
