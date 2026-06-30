'use client'

import { useState } from 'react'

import { BLOG } from '@/lib/content'
import type { BlogPostView } from '@/types'
import { BlogCard } from '@/components/ui/BlogCard'

/** Category-filterable grid of every article — used on the /blog list page. */
export function BlogFilterGrid({ posts }: { posts: BlogPostView[] }) {
  const [active, setActive] = useState<string>(BLOG.categories[0])
  const filtered = active === BLOG.categories[0] ? posts : posts.filter((p) => p.category === active)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filtrer les articles">
        {BLOG.categories.map((c) => {
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
              {c}
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
