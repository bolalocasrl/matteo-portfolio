import { useState } from 'react'
import FadeIn from './FadeIn'
import { useLanguage } from '../i18n/LanguageContext'

export default function ContactSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const handleSubmit = async () => {
    if (!email || !consent) return

    setSubmitted(true)

    try {
      await fetch('https://formspree.io/f/xwvjvalk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          message: message,
          _subject: `New project inquiry from ${email}`,
        })
      })
    } catch (error) {
      console.error('Form error:', error)
    }
  }

  return (
    <section
      id="contact"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 relative z-20 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-12">

        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase leading-none tracking-tight text-center"
            style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 120px)' }}
          >
            {t.contact.title}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={30}>
          <p
            className="text-center font-light leading-relaxed"
            style={{ color: '#0C0C0C', opacity: 0.6, fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
          >
            {t.contact.subtitle}
          </p>
        </FadeIn>

        {!submitted ? (
          <FadeIn delay={0.2} y={30} className="w-full">
            <div className="flex flex-col gap-4 w-full">
              <input
                type="email"
                placeholder={t.contact.emailPlaceholder}
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '9999px',
                  border: '2px solid rgba(12,12,12,0.2)',
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '1rem',
                  outline: 'none',
                  color: '#0C0C0C',
                  background: 'white',
                }}
              />
              <textarea
                placeholder={t.contact.messagePlaceholder}
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '24px',
                  border: '2px solid rgba(12,12,12,0.2)',
                  fontFamily: 'Kanit, sans-serif',
                  fontSize: '1rem',
                  outline: 'none',
                  color: '#0C0C0C',
                  background: 'white',
                  resize: 'none',
                }}
              />
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  style={{ marginTop: '3px', accentColor: '#B600A8', width: '16px', height: '16px', flexShrink: 0 }}
                />
                <span style={{ color: '#0C0C0C', opacity: 0.6, fontSize: '0.8rem', fontFamily: 'Kanit, sans-serif' }}>
                  {t.contact.consent}{' '}
                  <span onClick={() => setShowPrivacy(true)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{t.contact.privacyLink}</span>
                </span>
              </label>

              <button
                onClick={handleSubmit}
                disabled={!email || !consent}
                style={{
                  background: email && consent
                    ? 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)'
                    : 'rgba(12,12,12,0.1)',
                  boxShadow: email && consent ? '0px 4px 4px rgba(181, 1, 167, 0.25)' : 'none',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: email && consent ? 'pointer' : 'not-allowed',
                  color: email && consent ? 'white' : 'rgba(12,12,12,0.3)',
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  padding: '1rem 2.5rem',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  alignSelf: 'center',
                }}
              >
                {t.contact.submitBtn}
              </button>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0} y={20}>
            <p
              className="text-center font-medium"
              style={{ color: '#B600A8', fontSize: '1.2rem' }}
            >
              ✓ {t.contact.successMsg}
            </p>
          </FadeIn>
        )}

        {showPrivacy && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowPrivacy(false)}>
            <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '2rem', maxWidth: '540px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
              <h2 style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem', color: '#0C0C0C' }}>{t.contact.privacy.title}</h2>
              <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '0.9rem', color: '#0C0C0C', lineHeight: 1.7, opacity: 0.8 }}>
                {t.contact.privacy.body}
              </p>
              <button onClick={() => setShowPrivacy(false)} style={{ marginTop: '1.5rem', background: '#0C0C0C', color: 'white', border: 'none', borderRadius: '9999px', padding: '0.7rem 2rem', fontFamily: 'Kanit, sans-serif', cursor: 'pointer' }}>{t.contact.privacy.close}</button>
            </div>
          </div>
        )}

        {/* Footer */}
        <FadeIn delay={0.3} y={20} className="w-full">
          <div
            className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
            style={{ borderTop: '1px solid rgba(12,12,12,0.15)' }}
          >
            <span style={{ color: '#0C0C0C', opacity: 0.4, fontSize: '0.8rem', fontFamily: 'Kanit, sans-serif' }}>
              © 2025 Matteo D&apos;Angelo
            </span>
            <div className="flex gap-6">
              <a
                href="https://wa.me/34632854055"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0C0C0C', opacity: 0.6, fontSize: '0.85rem', fontFamily: 'Kanit, sans-serif', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
              >
                WhatsApp
              </a>
              <a
                href="mailto:hello@matteodangelo.eu"
                style={{ color: '#0C0C0C', opacity: 0.6, fontSize: '0.85rem', fontFamily: 'Kanit, sans-serif', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
              >
                Email
              </a>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
