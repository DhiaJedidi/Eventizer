import Image from 'next/image'
import Link from 'next/link'

import { getContent, translateCategory } from '@/lib/content-i18n'
import type { Locale } from '@/lib/i18n'
import type { BlogPostView } from '@/types'

const READ_MORE: Record<Locale, string> = {
  fr: 'Lire l’article',
  en: 'Read article',
  ar: 'اقرأ المقال',
}

/**
 * Blog card — adapted from a shadcn ProjectCard to the project's stack: the whole
 * card is a next/link to the article (no dead inner link), next/image, inline SVG
 * arrow (no lucide), brand tokens (no bg-card/text-primary), plain class strings
 * (no cn/@/lib/utils). Hover lift + image zoom + title shift; focus-visible ring.
 */
export function BlogCard({ post, locale }: { post: BlogPostView; locale: Locale }) {
  const { BLOG } = getContent(locale)
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-[0_14px_36px_-26px_rgb(13_13_13/0.3)] transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgb(69_99_172/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.image}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink backdrop-blur">
          {translateCategory(post.category, locale)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[12px] uppercase tracking-wideish text-mute">
          {post.date} · {post.readMin} {BLOG.readLabel}
        </p>
        <h3 className="mt-2 line-clamp-2 font-heading text-xl font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-cobalt">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-mute">{post.excerpt}</p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cobalt">
          {READ_MORE[locale]}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"
          >
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
