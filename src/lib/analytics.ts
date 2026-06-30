/** GA4 event helper (seo.md §15). No-op until the GA script has loaded. */
type GtagEvent =
  | 'contact_form_submit'
  | 'cta_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'pillar_expand'
  | 'team_building_select'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: GtagEvent, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params ?? {})
  }
}
