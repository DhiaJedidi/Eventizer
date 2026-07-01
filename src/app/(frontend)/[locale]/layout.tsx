import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { Montserrat, Poppins, Cairo } from 'next/font/google'

import { getContent } from '@/lib/content-i18n'
import { LOCALES, DEFAULT_LOCALE, dirFor, isLocale, type Locale } from '@/lib/i18n'
import { Cursor } from '@/components/ui/Cursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import '../globals.css'

// Eventizer brand typefaces — self-hosted at build by next/font. Montserrat: display,
// Poppins: body (Latin). Cairo covers Arabic (applied via html[lang=ar] in globals.css).
const display = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})
const body = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})
const arabic = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-arabic',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eventizer.tn'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const META: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Eventizer — Agence Événementielle & Plateforme Digitale en Tunisie',
    description:
      'Eventizer organise vos événements de A à Z en Tunisie : management événementiel, plateforme digitale, communication et production audiovisuelle. 250+ événements réussis.',
  },
  en: {
    title: 'Eventizer — Event Agency & Digital Platform in Tunisia',
    description:
      'Eventizer runs your events end to end in Tunisia: event management, a proprietary digital platform, communication and audiovisual production. 250+ successful events.',
  },
  ar: {
    title: 'Eventizer — وكالة تنظيم فعاليات ومنصّة رقمية في تونس',
    description:
      'تنظّم Eventizer فعالياتكم من الألف إلى الياء في تونس: إدارة الفعاليات، منصّة رقمية خاصة، تواصل وإنتاج سمعي بصري. أكثر من 250 فعالية ناجحة.',
  },
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  const m = META[locale]
  const ogLocale = locale === 'fr' ? 'fr_TN' : locale === 'ar' ? 'ar_TN' : 'en_US'
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    applicationName: 'Eventizer',
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: '/fr', en: '/en', ar: '/ar', 'x-default': '/fr' },
    },
    robots: { index: true, follow: true },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      siteName: 'Eventizer',
      locale: ogLocale,
      title: m.title,
      description: m.description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: m.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [{ url: '/og-image.jpg', alt: m.title }],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#4563AC',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Eventizer',
      alternateName: 'Eventizer TN',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: SITE_URL + '/logo.svg', width: 200, height: 60 },
      description:
        'Agence événementielle et plateforme digitale en Tunisie. Management événementiel, IT & Tech, communication digitale et production audiovisuelle.',
      foundingDate: '2020',
      founder: { '@type': 'Person', name: 'Ahmed Jamoussi', jobTitle: 'CEO' },
      numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 6 },
      address: { '@type': 'PostalAddress', addressCountry: 'TN', addressLocality: 'Tunis' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['French', 'Arabic', 'English'],
      },
      areaServed: [
        { '@type': 'Country', name: 'Tunisia' },
        { '@type': 'Country', name: 'France' },
      ],
      sameAs: [
        'https://www.linkedin.com/company/eventizer',
        'https://www.instagram.com/eventizer.tn',
        'https://www.facebook.com/eventizer.tn',
      ],
    },
    { '@type': 'WebSite', name: 'Eventizer', url: SITE_URL },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <a href="#main-content" className="skip-link">
          {getContent(locale).SKIP_LINK}
        </a>
        <ScrollProgress />
        {children}
        <Cursor />

        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
