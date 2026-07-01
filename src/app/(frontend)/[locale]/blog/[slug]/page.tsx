import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { getContent } from '@/lib/content-i18n'
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n'
import { getPosts, getPostBySlug } from '@/lib/queries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'

export const revalidate = 3600

type Params = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of LOCALES) {
    const posts = await getPosts(locale)
    for (const p of posts) params.push({ locale, slug: p.slug })
  }
  return params
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const post = await getPostBySlug(slug, locale)
  if (!post) return {}
  return {
    title: `${post.title} — Eventizer`,
    description: post.excerpt,
    alternates: { canonical: `/${locale}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/${locale}/blog/${post.slug}`,
      images: [{ url: post.image }],
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const { BLOG } = getContent(locale)
  const post = await getPostBySlug(slug, locale)
  if (!post) notFound()

  return (
    <>
      <Navbar locale={locale} />
      <main id="main-content" className="bg-paper">
        <article className="pt-32 sm:pt-40">
          {/* Header */}
          <Container className="max-w-prose">
            <Link
              href={`/${locale}/blog`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-mute transition-colors hover:text-cobalt"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:rotate-180">
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {BLOG.backToList}
            </Link>

            <span className="mt-8 inline-block rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cobalt">
              {post.category}
            </span>
            <h1 className="mt-5 font-heading text-display-lg font-bold leading-[1.05] text-ink">{post.title}</h1>
            <p className="mt-5 text-sm uppercase tracking-wideish text-mute">
              {BLOG.byline} {post.author} · {post.date} · {post.readMin} {BLOG.readLabel}
            </p>
          </Container>

          {/* Hero image */}
          <Container className="mt-10">
            <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl bg-cream">
              <Image
                src={post.image}
                alt=""
                aria-hidden="true"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </Container>

          {/* Body */}
          <Container className="max-w-prose py-14 sm:py-16">
            <div className="flex flex-col gap-6">
              {post.body.map((block, i) => (
                <div key={i}>
                  {block.heading ? (
                    <h2 className="mb-2 font-heading text-2xl font-semibold text-ink">{block.heading}</h2>
                  ) : null}
                  {block.text ? (
                    <p className="text-[17px] leading-relaxed text-body">{block.text}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </Container>

          {/* End CTA */}
          <Container className="pb-24 sm:pb-28">
            <div className="mx-auto max-w-prose rounded-2xl border border-line bg-white p-8 text-center sm:p-10">
              <h2 className="font-heading text-2xl font-bold text-ink">{BLOG.ctaTitle}</h2>
              <p className="mx-auto mt-3 max-w-md text-mute">{BLOG.ctaSubtitle}</p>
              <Link
                href={`/${locale}#contact`}
                className="mt-6 inline-flex rounded-full bg-cobalt px-8 py-3.5 font-semibold text-white transition-[filter] duration-300 hover:brightness-110"
              >
                {BLOG.ctaLabel}
              </Link>
            </div>
          </Container>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  )
}
