import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Montserrat, Poppins } from 'next/font/google'

import { SKIP_LINK } from '@/lib/content'
import { Cursor } from '@/components/ui/Cursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import './globals.css'

// Eventizer brand typefaces (design.md / tokens.json) — self-hosted at build by
// next/font (no runtime CDN). Montserrat: display/headings. Poppins: body.
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eventizer.tn'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Eventizer — Agence Événementielle & Plateforme Digitale en Tunisie',
  description:
    'Eventizer organise vos événements de A à Z en Tunisie : management événementiel, plateforme digitale, communication et production audiovisuelle. 250+ événements réussis.',
  applicationName: 'Eventizer',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
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
    url: SITE_URL + '/',
    siteName: 'Eventizer',
    locale: 'fr_TN',
    title: 'Eventizer — Agence Événementielle & Plateforme Digitale en Tunisie',
    description:
      '250+ événements organisés avec succès. Management événementiel, technologie propriétaire, communication et production audiovisuelle — tout sous un même toit.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Eventizer — agence événementielle et plateforme digitale en Tunisie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventizer — Agence Événementielle & Plateforme Digitale en Tunisie',
    description:
      '250+ événements organisés avec succès en Tunisie. Un seul interlocuteur, quatre expertises.',
    images: [{ url: '/og-image.jpg', alt: 'Eventizer — agence événementielle Tunisie' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#4563AC',
}

/** Structured data (seo.md §6). Replace placeholder phone before launch. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Eventizer',
      alternateName: 'Eventizer TN',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: SITE_URL + '/logo.svg',
        width: 200,
        height: 60,
      },
      description:
        'Agence événementielle et plateforme digitale en Tunisie. Management événementiel, IT & Tech, communication digitale et production audiovisuelle.',
      foundingDate: '2020',
      founder: { '@type': 'Person', name: 'Ahmed Jamoussi', jobTitle: 'CEO' },
      numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 6 },
      address: { '@type': 'PostalAddress', addressCountry: 'TN', addressLocality: 'Tunis' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['French', 'Arabic'],
      },
      areaServed: [
        { '@type': 'Country', name: 'Tunisia' },
        { '@type': 'Country', name: 'France' },
      ],
      knowsAbout: [
        'Gestion événementielle',
        'Plateforme digitale événementielle',
        'Production audiovisuelle',
        'Communication digitale',
      ],
      award: 'Startup Innovante',
      sameAs: [
        'https://www.linkedin.com/company/eventizer',
        'https://www.instagram.com/eventizer.tn',
        'https://www.facebook.com/eventizer.tn',
      ],
    },
    {
      '@type': 'LocalBusiness',
      name: 'Eventizer',
      image: SITE_URL + '/og-image.jpg',
      url: SITE_URL,
      telephone: '+216-XX-XXX-XXX',
      email: 'contact@eventizer.tn',
      priceRange: 'Sur devis',
      address: { '@type': 'PostalAddress', addressLocality: 'Tunis', addressCountry: 'TN' },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      currenciesAccepted: 'TND',
      paymentAccepted: 'Virement bancaire, Chèque, Espèces, Paiement en ligne',
    },
    {
      '@type': 'WebSite',
      name: 'Eventizer',
      url: SITE_URL,
      inLanguage: 'fr',
    },
    {
      '@type': 'Person',
      name: 'Ahmed Jamoussi',
      jobTitle: 'CEO',
      worksFor: { '@type': 'Organization', name: 'Eventizer' },
      url: SITE_URL,
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <a href="#main-content" className="skip-link">
          {SKIP_LINK}
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
