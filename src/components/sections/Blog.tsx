'use client'

import Link from 'next/link'

import type { BlogSectionView } from '@/types'
import type { Locale } from '@/lib/i18n'
import { Container } from '@/components/ui/Container'
import { BlogCard } from '@/components/ui/BlogCard'
import { Magnetic } from '@/components/ui/Magnetic'
import { useGsapReveal } from '@/hooks/useGsapReveal'

/**
 * Le Blog (home teaser) — a centered editorial grid of featured articles with a
 * link to the full /blog list. Header + the featured selection come from Payload
 * (Sections → Blog). Brand cobalt/gold, GSAP scroll reveal (reduced-motion safe).
 */
export function Blog({ data, locale }: { data: BlogSectionView; locale: Locale }) {
  const posts = data.posts.slice(0, 3)
  const ref = useGsapReveal<HTMLElement>({ childSelector: '.blog-reveal', y: 28, stagger: 0.1, start: 'top 82%' })

  return (
    <section id="blog" ref={ref} className="relative overflow-hidden bg-paper py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="aurora-soft pointer-events-none absolute inset-0" />
      <Container className="relative z-10">
        <header className="blog-reveal mx-auto mb-14 max-w-2xl text-center">
          {data.eyebrow ? <p className="eyebrow text-cobalt">{data.eyebrow}</p> : null}
          <h2 className="mt-5 font-heading text-display-lg font-bold text-ink">{data.title}</h2>
          {data.subtitle ? <p className="mt-5 text-lg leading-relaxed text-mute">{data.subtitle}</p> : null}
        </header>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.slug} className="blog-reveal h-full">
              <BlogCard post={post} locale={locale} />
            </div>
          ))}
        </div>

        <div className="blog-reveal mt-12 flex justify-center">
          <Magnetic>
            <Link
              href={`/${locale}/blog`}
              className="group inline-flex items-center gap-2 rounded-full bg-cobalt px-8 py-3.5 font-semibold text-white transition-[filter] duration-300 hover:brightness-110"
            >
              {data.viewAll}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Magnetic>
        </div>
      </Container>
    </section>
  )
}
