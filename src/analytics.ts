// Google Analytics is loaded only after the visitor accepts cookies
const MEASUREMENT_ID = 'G-0CNHVE0C87'
export const CONSENT_KEY = 'cookie-consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let loaded = false

export function loadAnalytics() {
  if (loaded || document.getElementById('ga-script')) return
  loaded = true

  const script = document.createElement('script')
  script.id = 'ga-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) { window.dataLayer!.push(args) }
  window.gtag('js', new Date())
  window.gtag('config', MEASUREMENT_ID)
}

export function readConsent(): 'granted' | 'denied' | null {
  try {
    const saved = localStorage.getItem(CONSENT_KEY)
    return saved === 'granted' || saved === 'denied' ? saved : null
  } catch {
    return null
  }
}

export function saveConsent(value: 'granted' | 'denied') {
  try { localStorage.setItem(CONSENT_KEY, value) } catch { /* storage blocked */ }
}
