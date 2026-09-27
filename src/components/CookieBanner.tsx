import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loadAnalytics, readConsent, saveConsent } from '../analytics'
import { useLanguage } from '../i18n/LanguageContext'

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(() => readConsent() === null)

  useEffect(() => {
    if (readConsent() === 'granted') loadAnalytics()
  }, [])

  const decide = (value: 'granted' | 'denied') => {
    saveConsent(value)
    if (value === 'granted') loadAnalytics()
    setVisible(false)
  }

  const buttonBase = {
    borderRadius: '9999px',
    padding: '0.7rem 1.6rem',
    fontFamily: 'Kanit, sans-serif',
    fontWeight: 500,
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ position: 'fixed', bottom: '12px', left: 0, right: 0, zIndex: 95, display: 'flex', justifyContent: 'center', padding: '0 12px' }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-4 w-full"
            style={{
              maxWidth: '760px',
              background: 'rgba(12,12,12,0.96)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(215,226,234,0.15)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              borderRadius: '24px',
              padding: '1.1rem 1.4rem',
            }}
          >
            <p style={{ color: '#D7E2EA', opacity: 0.85, fontSize: '0.85rem', lineHeight: 1.5, flex: 1 }}>
              {t.cookies.text}
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => decide('denied')}
                style={{ ...buttonBase, background: 'transparent', border: '1px solid rgba(215,226,234,0.4)', color: '#D7E2EA' }}
              >
                {t.cookies.decline}
              </button>
              <button
                onClick={() => decide('granted')}
                style={{ ...buttonBase, background: '#D7E2EA', border: 'none', color: '#0C0C0C' }}
              >
                {t.cookies.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
