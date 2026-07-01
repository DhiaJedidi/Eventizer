import type { Metadata } from 'next'

import { getContent } from '@/lib/content-i18n'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'
import { getPosts } from '@/lib/queries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { BlogFilterGrid } from '@/components/sections/BlogFilterGrid'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const { BLOG } = getContent(locale)
  return {
    title: `${BLOG.listHeading} — Eventizer`,
    description: BLOG.listSubtitle,
    alternates: { canonical: `/${locale}/blog` },
    openGraph: { title: `${BLOG.listHeading} — Eventizer`, description: BLOG.listSubtitle, url: `/${locale}/blog` },
  }
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const { BLOG } = getContent(locale)
  const posts = await getPosts(locale)
  return (
    <>
      <Navbar locale={locale} />
      <main id="main-content" className="bg-paper">
        <section className="border-b border-line bg-white pb-16 pt-32 sm:pt-40">
          <Container className="text-center">
            <p className="eyebrow text-cobalt">{BLOG.eyebrow}</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-heading text-display-xl font-bold leading-[1.04] text-ink">
              {BLOG.listHeading}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mute">{BLOG.listSubtitle}</p>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <BlogFilterGrid posts={posts} locale={locale} />
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
