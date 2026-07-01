'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { getContent } from '@/lib/content-i18n'
import type { Locale } from '@/lib/i18n'
import { track } from '@/lib/analytics'
import { Magnetic } from '@/components/ui/Magnetic'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

// Fluid, weighty easing used across the nav (taste: no linear/ease-in-out).
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'

export function Navbar({ locale }: { locale: Locale }) {
  const { NAV } = getContent(locale)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  // On the home page (/{locale}), section links are in-page anchors; on sub-pages
  // (e.g. /{locale}/blog) they must navigate home first.
  const isHome = usePathname() === `/${locale}`
  const hrefFor = (hash: string) => (isHome ? hash : `/${locale}${hash}`)

  // Scroll-spy for the active section + a subtle "condensed" state after scroll.
  useEffect(() => {
    const ids = NAV.links.map((l) => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
        raf = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    drawerRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4 pt-3 sm:pt-4">
      <div
        className={`liquid-glass flex w-full max-w-6xl items-center justify-between gap-3 rounded-full py-1.5 pe-1.5 ps-4 transition-[padding,box-shadow,background-color,transform] sm:ps-5 ${
          scrolled
            ? 'shadow-[0_16px_50px_-16px_rgb(0_0_0/0.6)]'
            : 'shadow-[0_10px_30px_-18px_rgb(0_0_0/0.5)]'
        }`}
        style={{ transitionDuration: '600ms', transitionTimingFunction: EASE }}
      >
        {/* Logo */}
        <a href={hrefFor('#hero')} aria-label={NAV.logoAria} className="inline-flex shrink-0">
          <Image src="/logo-w.png" alt="" width={141} height={40} sizes="150px" className="h-7 w-auto" />
        </a>

        {/* Center links — pill highlight on the active section */}
        <nav aria-label={NAV.logoAria} className="hidden items-center gap-0.5 lg:gap-1 md:flex">
          {NAV.links.map((l) => {
            const id = l.href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={l.href}
                href={hrefFor(l.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-full px-3 py-1.5 text-[13px] transition-colors duration-300 lg:px-3.5 ${
                  isActive ? 'text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-inset ring-white/10"
                  />
                ) : null}
                <span className="relative">{l.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Switcher + CTA + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} className="hidden md:flex" />
          <span aria-hidden="true" className="hidden h-5 w-px bg-white/15 md:block" />

          <Magnetic className="hidden md:inline-block">
            <a
              href={hrefFor('#contact')}
              onClick={() => track('cta_click', { location: 'navbar' })}
              className="group inline-flex items-center gap-2 rounded-full bg-gold py-1.5 pe-1.5 ps-4 text-[13px] font-semibold text-ink transition-[filter,transform] duration-500 hover:brightness-[1.06] active:scale-[0.98]"
              style={{ transitionTimingFunction: EASE }}
            >
              {NAV.cta}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/10 transition-transform duration-500 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" style={{ transitionTimingFunction: EASE }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="rtl:rotate-180">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Magnetic>

          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? NAV.menuCloseAria : NAV.menuOpenAria}
            onClick={() => setOpen((v) => !v)}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer — glass panel, staggered link reveal */}
      {open ? (
        <div
          id="mobile-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label={NAV.logoAria}
          className="liquid-glass absolute inset-x-3 top-[calc(100%+0.5rem)] rounded-3xl p-3 sm:inset-x-4 md:hidden"
        >
          <nav className="flex flex-col">
            {NAV.links.map((l, i) => (
              <a
                key={l.href}
                href={hrefFor(l.href)}
                onClick={close}
                className="nav-drawer-item flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                style={{ animationDelay: `${60 + i * 45}ms` }}
              >
                {l.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-white/30 rtl:rotate-180">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
            <a
              href={hrefFor('#contact')}
              onClick={() => {
                track('cta_click', { location: 'navbar_mobile' })
                close()
              }}
              className="nav-drawer-item mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gold py-3.5 text-[15px] font-semibold text-ink"
              style={{ animationDelay: `${60 + NAV.links.length * 45}ms` }}
            >
              {NAV.cta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="rtl:rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="mt-3 flex justify-center border-t border-white/10 pt-3">
              <LanguageSwitcher locale={locale} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

/** Hamburger that morphs into an X (two lines rotate/translate). */
function HamburgerIcon({ open }: { open: boolean }) {
  const base =
    'absolute left-1/2 h-[1.6px] w-[18px] -translate-x-1/2 rounded-full bg-current transition-all duration-500'
  return (
    <span aria-hidden="true" className="relative block h-4 w-[18px]" style={{ transitionTimingFunction: EASE }}>
      <span
        className={base}
        style={{ transitionTimingFunction: EASE, top: open ? '50%' : '4px', transform: `translateX(-50%) ${open ? 'translateY(-50%) rotate(45deg)' : ''}` }}
      />
      <span
        className={base}
        style={{ transitionTimingFunction: EASE, bottom: open ? '50%' : '4px', transform: `translateX(-50%) ${open ? 'translateY(50%) rotate(-45deg)' : ''}` }}
      />
    </span>
  )
}
