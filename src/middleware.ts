import { NextResponse, type NextRequest } from 'next/server'

import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get('locale')?.value
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) return cookie
  const header = req.headers.get('accept-language') || ''
  for (const part of header.split(',')) {
    const code = part.split(';')[0].trim().slice(0, 2).toLowerCase()
    if ((LOCALES as readonly string[]).includes(code)) return code
  }
  return DEFAULT_LOCALE
}

/**
 * Locale routing: every public page lives under /fr, /en or /ar. Paths without a
 * locale prefix are redirected to the visitor's preferred language (cookie →
 * Accept-Language → French). Admin, APIs, _next and static files are excluded via
 * the matcher below.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const first = pathname.split('/')[1]
  if ((LOCALES as readonly string[]).includes(first)) return NextResponse.next()

  const locale = detectLocale(req)
  const url = req.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Run on everything except Payload admin, APIs, Next internals and static files.
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
}
