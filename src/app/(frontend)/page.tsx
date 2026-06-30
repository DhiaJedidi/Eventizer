import dynamic from 'next/dynamic'

import {
  getBlogSection,
  getCaseStudies,
  getContactInfo,
  getHero,
  getPillars,
  getPlatform,
  getReferencesSection,
  getStats,
  getTeam,
  getTeamBuilding,
  getTeamSection,
  getTestimonials,
  getTrusted,
  getWhy,
} from '@/lib/queries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollRefresh } from '@/components/ui/ScrollRefresh'
// Above the fold — static imports (immediate render).
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'

// Below the fold — dynamic imports (kept server-rendered for SEO; default ssr: true).
const Trusted = dynamic(() => import('@/components/sections/Trusted').then((m) => m.Trusted))
const Pillars = dynamic(() => import('@/components/sections/Pillars').then((m) => m.Pillars))
const TeamBuilding = dynamic(() =>
  import('@/components/sections/TeamBuilding').then((m) => m.TeamBuilding),
)
const Platform = dynamic(() => import('@/components/sections/Platform').then((m) => m.Platform))
const CaseStudies = dynamic(() =>
  import('@/components/sections/CaseStudies').then((m) => m.CaseStudies),
)
const Testimonials = dynamic(() =>
  import('@/components/sections/Testimonials').then((m) => m.Testimonials),
)
const Team = dynamic(() => import('@/components/sections/Team').then((m) => m.Team))
const WhyEventizer = dynamic(() =>
  import('@/components/sections/WhyEventizer').then((m) => m.WhyEventizer),
)
const Blog = dynamic(() => import('@/components/sections/Blog').then((m) => m.Blog))
const Contact = dynamic(() => import('@/components/sections/Contact').then((m) => m.Contact))

// Statically generated, periodically revalidated (fresh for SEO, CDN-cached for speed).
export const revalidate = 3600

export default async function HomePage() {
  const [
    hero,
    stats,
    platform,
    why,
    cases,
    team,
    contactInfo,
    trusted,
    testimonials,
    teamBuilding,
    pillars,
    referencesSection,
    teamSection,
    blogSection,
  ] = await Promise.all([
    getHero(),
    getStats(),
    getPlatform(),
    getWhy(),
    getCaseStudies(),
    getTeam(),
    getContactInfo(),
    getTrusted(),
    getTestimonials(),
    getTeamBuilding(),
    getPillars(),
    getReferencesSection(),
    getTeamSection(),
    getBlogSection(),
  ])

  return (
    <>
      <Navbar />
      <ScrollRefresh />
      <main id="main-content">
        <Hero data={hero} />
        <Trusted data={trusted} />
        <Pillars header={pillars} />
        <TeamBuilding data={teamBuilding} />
        <Platform data={platform} />
        <Stats data={stats} />
        <CaseStudies data={cases} header={referencesSection} />
        <Testimonials data={testimonials} />
        <Team data={team} header={teamSection} />
        <WhyEventizer data={why} />
        <Blog data={blogSection} />
        <Contact contactInfo={contactInfo} />
      </main>
      <Footer />
    </>
  )
}
