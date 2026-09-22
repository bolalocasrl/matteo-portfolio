import { CalendarDays } from 'lucide-react'

const CALENDLY_URL = 'https://calendly.com/matteo-dangelo/30min?primary_color=b600a8'

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void }
  }
}

// Load Calendly's script and stylesheet only the first time someone clicks
let calendlyLoader: Promise<void> | null = null
function loadCalendly() {
  if (!calendlyLoader) {
    calendlyLoader = new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)

      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => { calendlyLoader = null; reject() }
      document.body.appendChild(script)
    })
  }
  return calendlyLoader
}

interface CalendlyButtonProps {
  label: string
  size?: 'md' | 'sm'
}

export default function CalendlyButton({ label, size = 'md' }: CalendlyButtonProps) {
  const handleClick = async () => {
    try {
      await loadCalendly()
      window.Calendly?.initPopupWidget({ url: CALENDLY_URL })
    } catch {
      window.open(CALENDLY_URL, '_blank')
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        background: '#0C0C0C',
        color: 'white',
        border: 'none',
        borderRadius: '9999px',
        cursor: 'pointer',
        fontFamily: 'Kanit, sans-serif',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        padding: size === 'md' ? '1rem 2.2rem' : '0.65rem 1.4rem',
        fontSize: size === 'md' ? '0.9rem' : '0.75rem',
        transition: 'opacity 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      <CalendarDays size={size === 'md' ? 18 : 15} strokeWidth={2} />
      {label}
    </button>
  )
}
