import type { Metadata } from 'next'

import { BLOG } from '@/lib/content'
import { getPosts } from '@/lib/queries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { BlogFilterGrid } from '@/components/sections/BlogFilterGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Le Blog — Eventizer',
  description: BLOG.listSubtitle,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Le Blog — Eventizer',
    description: BLOG.listSubtitle,
    url: '/blog',
  },
}

export default async function BlogIndexPage() {
  const posts = await getPosts()
  return (
    <>
      <Navbar />
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
            <BlogFilterGrid posts={posts} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
