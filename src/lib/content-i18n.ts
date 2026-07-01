import type { Locale } from './i18n'
import * as fr from './content'
import * as en from './content.en'
import * as ar from './content.ar'

/** All UI strings (nav, footer, contact form, blog labels, pillar cards, …) per
 *  locale. CMS-managed section content comes from Payload (queries.ts); this covers
 *  the strings that live in code. */
type Content = typeof fr
const modules: Record<Locale, Content> = { fr, en: en as unknown as Content, ar: ar as unknown as Content }

export function getContent(locale: Locale): Content {
  return modules[locale] ?? fr
}

/** Blog categories are stored as fixed French keys in Payload; translate for display.
 *  The per-locale `BLOG.categories` arrays are parallel to the French one. */
export function translateCategory(key: string, locale: Locale): string {
  const idx = (fr.BLOG.categories as readonly string[]).indexOf(key)
  if (idx === -1) return key
  return getContent(locale).BLOG.categories[idx] ?? key
}

