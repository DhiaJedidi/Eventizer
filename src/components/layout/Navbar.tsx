'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { NAV } from '@/lib/content'
import { track } from '@/lib/analytics'
import { Magnetic } from '@/components/ui/Magnetic'

const SECTION_IDS = NAV.links.map((l) => l.href.replace('#', ''))

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const drawerRef = useRef<HTMLDivElement>(null)

  // On the home page, section links are in-page anchors; on sub-pages (e.g. /blog)
  // they must navigate home first.
  const isHome = usePathname() === '/'
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
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
    <header className="fixed inset-x-0 top-0 z-50 px-6 pt-6 md:px-12 lg:px-16">
      <div className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
        {/* Logo */}
        <a href={hrefFor('#hero')} aria-label={NAV.logoAria} className="inline-flex">
          <Image src="/logo-w.png" alt="" width={141} height={40} sizes="150px" className="h-7 w-auto" />
        </a>

        {/* Center links */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-5 lg:gap-7 md:flex">
          {NAV.links.map((l) => {
            const id = l.href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={l.href}
                href={hrefFor(l.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`link-underline text-sm transition-colors duration-300 ${isActive ? 'text-gold' : 'text-white/70 hover:text-white'
                  }`}
              >
                {l.label}
              </a>
            )
          })}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-2">
          <Magnetic className="hidden md:inline-block">
            <a
              href={hrefFor('#contact')}
              onClick={() => track('cta_click', { location: 'navbar' })}
              className="inline-flex rounded-lg bg-white px-6 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white/90"
            >
              {NAV.cta}
            </a>
          </Magnetic>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? NAV.menuCloseAria : NAV.menuOpenAria}
            onClick={() => setOpen((v) => !v)}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div
          id="mobile-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="mt-3 rounded-xl bg-noir p-2 md:hidden"
        >
          <nav className="flex flex-col">
            {NAV.links.map((l) => (
              <a
                key={l.href}
                href={hrefFor(l.href)}
                onClick={close}
                className="border-b border-white/8 px-3 py-4 text-lg text-white/85 last:border-0 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={hrefFor('#contact')}
              onClick={() => {
                track('cta_click', { location: 'navbar_mobile' })
                close()
              }}
              className="mt-2 rounded-lg bg-white py-3 text-center text-sm font-medium text-ink"
            >
              {NAV.cta}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
    </svg>
  )
}
