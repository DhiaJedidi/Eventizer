'use client'

import { useState } from 'react'

import { BLOG as BLOG_FR } from '@/lib/content'
import { translateCategory } from '@/lib/content-i18n'
import type { Locale } from '@/lib/i18n'
import type { BlogPostView } from '@/types'
import { BlogCard } from '@/components/ui/BlogCard'

const FILTER_ARIA: Record<Locale, string> = {
  fr: 'Filtrer les articles',
  en: 'Filter articles',
  ar: 'تصفية المقالات',
}

/** Category-filterable grid of every article — used on the /blog list page.
 *  Categories are the fixed French keys (matching Payload's post.category); the
 *  visible label is translated per locale. */
export function BlogFilterGrid({ posts, locale }: { posts: BlogPostView[]; locale: Locale }) {
  const categories = BLOG_FR.categories
  const [active, setActive] = useState<string>(categories[0])
  const filtered = active === categories[0] ? posts : posts.filter((p) => p.category === active)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label={FILTER_ARIA[locale]}>
        {categories.map((c) => {
          const isActive = active === c
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 ${
                isActive
                  ? 'border-cobalt bg-cobalt text-white'
                  : 'border-line text-mute hover:border-ink hover:text-ink'
              }`}
            >
              {translateCategory(c, locale)}
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}
