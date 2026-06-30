import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  GlobalAfterChangeHook,
  GlobalConfig,
} from 'payload'

/**
 * Instant publishing — when content is saved in /admin, invalidate the static
 * page(s) that render it so the change goes live on the next request (instead of
 * waiting for the hourly `revalidate`). Safe to call from any context:
 * `revalidatePath` throws when run outside a Next request scope (e.g. during
 * `payload run`/seed), so we swallow that — admin edits always run inside one.
 */
function safeRevalidate(...paths: string[]) {
  try {
    for (const p of paths) revalidatePath(p)
  } catch {
    /* outside a request scope (CLI/seed) — nothing to revalidate */
  }
}

const slugOf = (doc: unknown): string | undefined => {
  const s = (doc as { slug?: unknown } | null)?.slug
  return typeof s === 'string' ? s : undefined
}

// ── Globals + collections that only feed the homepage ──────────────────────────
const homeGlobalHook: GlobalAfterChangeHook = ({ doc }) => {
  safeRevalidate('/')
  return doc
}
const homeChangeHook: CollectionAfterChangeHook = ({ doc }) => {
  safeRevalidate('/')
  return doc
}
const homeDeleteHook: CollectionAfterDeleteHook = ({ doc }) => {
  safeRevalidate('/')
  return doc
}

// ── Posts feed the homepage teaser, the /blog list, and each article page ──────
const postChangeHook: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  const prev = slugOf(previousDoc)
  const curr = slugOf(doc)
  safeRevalidate('/', '/blog', ...(curr ? [`/blog/${curr}`] : []), ...(prev && prev !== curr ? [`/blog/${prev}`] : []))
  return doc
}
const postDeleteHook: CollectionAfterDeleteHook = ({ doc }) => {
  const curr = slugOf(doc)
  safeRevalidate('/', '/blog', ...(curr ? [`/blog/${curr}`] : []))
  return doc
}

/** Wrap a Sections global so saving it republishes the homepage. */
export function withHomeRevalidate(global: GlobalConfig): GlobalConfig {
  return {
    ...global,
    hooks: { ...global.hooks, afterChange: [...(global.hooks?.afterChange ?? []), homeGlobalHook] },
  }
}

/** Wrap a collection so saving/deleting an item republishes the homepage. */
export function withHomeRevalidateCollection(collection: CollectionConfig): CollectionConfig {
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), homeChangeHook],
      afterDelete: [...(collection.hooks?.afterDelete ?? []), homeDeleteHook],
    },
  }
}

/** Wrap the Posts collection so saving/deleting an article republishes home + blog + the article. */
export function withPostRevalidate(collection: CollectionConfig): CollectionConfig {
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), postChangeHook],
      afterDelete: [...(collection.hooks?.afterDelete ?? []), postDeleteHook],
    },
  }
}
