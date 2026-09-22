import HowIWorkSection from './HowIWorkSection'
import { useLanguage } from '../i18n/LanguageContext'

interface HowIWorkPageProps {
  onBack: () => void
}

export default function HowIWorkPage({ onBack }: HowIWorkPageProps) {
  const { t } = useLanguage()

  const backButton = (
    <button
      onClick={onBack}
      style={{
        background: 'transparent',
        border: '2px solid #D7E2EA',
        color: '#D7E2EA',
        borderRadius: '9999px',
        padding: '0.55rem 1.4rem',
        fontFamily: 'Kanit, sans-serif',
        fontWeight: 500,
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        cursor: 'pointer',
      }}
    >
      ← {t.nav.back}
    </button>
  )

  return (
    <div style={{ backgroundColor: '#0C0C0C', minHeight: '100vh' }}>
      {/* Top bar */}
      <div className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 pb-20">
        {backButton}
        <span className="font-black uppercase tracking-tight" style={{ color: '#D7E2EA', fontSize: '1.1rem' }}>
          Matte
        </span>
      </div>

      <HowIWorkSection />

      {/* Bottom back link */}
      <div className="flex justify-center py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <button
          onClick={onBack}
          style={{
            background: '#0C0C0C',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            padding: '1rem 2.2rem',
            fontFamily: 'Kanit, sans-serif',
            fontWeight: 500,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            cursor: 'pointer',
          }}
        >
          ← {t.nav.back}
        </button>
      </div>
    </div>
  )
}
