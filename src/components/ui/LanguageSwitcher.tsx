'use client'

import { usePathname, useRouter } from 'next/navigation'

import { LOCALES, LOCALE_SHORT, LOCALE_LABELS, type Locale } from '@/lib/i18n'

/** Compact FR / EN / ع switcher. Rewrites the /{locale} prefix on the current path
 *  and remembers the choice in a cookie (read by the middleware for bare paths). */
export function LanguageSwitcher({ locale, className = '' }: { locale: Locale; className?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchTo = (next: Locale) => {
    if (next === locale) return
    document.cookie = `locale=${next};path=/;max-age=31536000;samesite=lax`
    const rest = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '')
    router.push(`/${next}${rest || ''}`)
  }

  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="group" aria-label="Language">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 ? <span aria-hidden="true" className="mx-1 text-white/25">/</span> : null}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-current={l === locale ? 'true' : undefined}
            aria-label={LOCALE_LABELS[l]}
            className={`rounded px-1 text-xs font-semibold uppercase transition-colors duration-200 ${
              l === locale ? 'text-gold' : 'text-white/55 hover:text-white'
            }`}
          >
            {LOCALE_SHORT[l]}
          </button>
        </span>
      ))}
    </div>
  )
}
