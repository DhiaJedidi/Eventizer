import type { ReactNode } from 'react'

/** Browser window chrome wrapper (coded, no image). Decorative frame; children
 *  carry the content. */
export function BrowserMockup({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-surface shadow-2xl">
      {/* Chrome bar */}
      <div className="flex h-10 items-center gap-3 border-b border-white/6 bg-panel px-4" aria-hidden="true">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-tl-red" />
          <span className="h-3 w-3 rounded-full bg-tl-amber" />
          <span className="h-3 w-3 rounded-full bg-tl-green" />
        </div>
        <div className="mx-auto flex w-1/2 items-center justify-center rounded-full bg-white/6 px-3 py-1">
          <span className="truncate text-xs text-white/40">{url}</span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-1 w-4 rounded-full bg-white/15" />
          <span className="h-1 w-4 rounded-full bg-white/15" />
          <span className="h-1 w-4 rounded-full bg-white/15" />
        </div>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  )
}
