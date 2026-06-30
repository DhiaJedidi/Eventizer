/** View models consumed by section components. queries.ts maps Payload (or the
 *  copy.md fallback) into these, so components never touch Payload types directly. */

export interface ImageView {
  url: string
  alt: string
  width: number
  height: number
}

/** Editable header (eyebrow / title / subtitle) shared by several sections. */
export interface SectionHeaderView {
  eyebrow?: string
  title: string
  subtitle?: string
}

export interface HeroView {
  eyebrow: string
  h1: string
  subheadline: string
  primaryCta: string
  secondaryCta: string
  trustStrip: string
  image: ImageView | null
}

export interface StatView {
  value: string
  label: string
}

export interface PlatformView {
  eyebrow: string
  h2: string
  body: string
  features: string[]
  proofPoint: string
  cta: string
  screenshot: ImageView | null
}

export interface WhyDifferentiator {
  title: string
  body: string
}

export interface WhyView {
  eyebrow: string
  h2: string
  differentiators: WhyDifferentiator[]
}

export interface CaseStudyView {
  slug: string
  title: string
  badges: string[]
  keyStat: string
  statLabel: string
  description: string
  image: ImageView | null
}

export interface TeamMemberView {
  name: string
  role: string
  oneLiner: string
  image: ImageView | null
}

export interface ContactInfoView {
  eyebrow?: string
  title: string
  subtitle?: string
  phoneDisplay: string
  phoneHref: string
  email: string
  whatsappNumber: string
}

export interface TrustedView {
  eyebrow: string
  references: string[]
}

export interface TestimonialItemView {
  quote: string
  author: string
  role: string
  company: string
}

export interface TestimonialsView {
  eyebrow: string
  h2: string
  ticker: string[]
  items: TestimonialItemView[]
}

export interface TeamBuildingItemView {
  title: string
  subtitle: string
  image: string
}

export interface TeamBuildingView {
  eyebrow?: string
  h2: string
  intro: string
  items: TeamBuildingItemView[]
}

export interface BlogBlock {
  heading?: string
  text: string
}

export interface BlogPostView {
  slug: string
  category: string
  title: string
  excerpt: string
  author: string
  date: string
  readMin: number
  image: string
  body: BlogBlock[]
}

export interface BlogSectionView {
  eyebrow?: string
  title: string
  subtitle?: string
  viewAll: string
  posts: BlogPostView[]
}
