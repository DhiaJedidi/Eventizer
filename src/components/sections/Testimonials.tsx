import type { CSSProperties } from 'react'

import type { TestimonialsView, TestimonialItemView } from '@/types'
import { Container } from '@/components/ui/Container'

const SUBTEXT =
  'Des organisations qui nous ont confié leurs événements les plus exigeants — et qui en parlent mieux que nous.'

// Each column shows every testimonial, rotated, so all three columns stay full
// and varied even with a handful of items.
function buildColumns(items: TestimonialItemView[]): TestimonialItemView[][] {
  if (items.length === 0) return [[], [], []]
  if (items.length >= 6) {
    return [0, 1, 2].map((c) => items.filter((_, i) => i % 3 === c))
  }
  return [0, 1, 2].map((c) => items.map((_, i) => items[(i + c) % items.length]))
}

function monogram(company: string): string {
  return company
    .split(' ')
    .filter((w) => /[A-Za-zÀ-ÿ]/.test(w[0] ?? ''))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

/**
 * Témoignages — a wall of auto-scrolling testimonial columns. Recreated from a
 * framer-motion design to the project's stack: pure CSS vertical marquee (no JS),
 * single light theme (no dark toggle), monogram avatars (no stock photos), brand
 * cobalt/gold. Content is Payload-managed (Sections → Témoignages). Reduced-motion
 * freezes the columns to a static, readable top.
 */
export function Testimonials({ data }: { data: TestimonialsView }) {
  const columns = buildColumns(data.items)
  const durations = [22, 28, 25]
  const colVisibility = ['', 'hidden md:block', 'hidden lg:block']

  return (
    <section
      id="temoignages"
      aria-labelledby="temoignages-title"
      className="relative overflow-hidden border-y border-line bg-paper py-24 sm:py-28 lg:py-32"
    >
      <div aria-hidden="true" className="aurora-soft pointer-events-none absolute inset-0" />

      <Container className="relative z-10">
        <div className="mx-auto mb-14 flex max-w-xl flex-col items-center text-center">
          <p className="eyebrow text-cobalt">{data.eyebrow}</p>
          <h2 id="temoignages-title" className="mt-5 font-heading text-display-lg font-bold text-ink">
            {data.h2}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mute">{SUBTEXT}</p>
        </div>

        <div
          role="region"
          aria-label="Témoignages clients"
          className="flex max-h-[680px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        >
          {columns.map((col, c) => (
            <div key={c} className={colVisibility[c]}>
              <ul
                className="m-0 flex list-none flex-col gap-6 p-0 will-change-transform animate-marquee-y [animation-play-state:running] hover:[animation-play-state:paused]"
                style={{ '--marquee-duration': `${durations[c]}s` } as CSSProperties}
              >
                {[...col, ...col].map((t, i) => (
                  <TestimonialCard key={i} t={t} duplicate={i >= col.length} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function TestimonialCard({ t, duplicate }: { t: TestimonialItemView; duplicate: boolean }) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="group w-[19rem] max-w-xs rounded-3xl border border-line bg-white p-8 shadow-[0_18px_40px_-24px_rgb(13_13_13/0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgb(69_99_172/0.4)]"
    >
      <blockquote className="m-0 p-0">
        <p className="m-0 leading-relaxed text-body">{t.quote}</p>
        <footer className="mt-6 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cobalt to-gold text-xs font-bold text-white"
          >
            {monogram(t.company)}
          </span>
          <span className="flex flex-col">
            <cite className="font-heading text-[15px] font-semibold not-italic leading-5 text-ink">{t.company}</cite>
            <span className="mt-0.5 text-sm leading-5 text-mute">{t.author}</span>
          </span>
        </footer>
      </blockquote>
    </li>
  )
}
