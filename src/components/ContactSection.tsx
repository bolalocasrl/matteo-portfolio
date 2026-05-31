import { useState } from 'react'
import FadeIn from './FadeIn'

export default function ContactSection() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!email || !consent) return
    const mailtoLink = `mailto:matteo.dangelo1099@gmail.com?subject=New project inquiry from ${email}&body=${encodeURIComponent(message)}`
    window.location.href = mailtoLink
    setSubmitted(true)
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
            Let&apos;s talk
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={30}>
          <p
            className="text-center font-light leading-relaxed"
            style={{ color: '#0C0C0C', opacity: 0.6, fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
          >
            Got a project in mind? Leave your email and I&apos;ll get back to you within 24h to hear all about it.
          </p>
        </FadeIn>

        {!submitted ? (
          <FadeIn delay={0.2} y={30} className="w-full">
            <div className="flex flex-col gap-4 w-full">
              <input
                type="email"
                placeholder="your@email.com"
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
                placeholder="Tell me about your project (optional)"
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
                  I agree to be contacted by Matteo D&apos;Angelo regarding my project inquiry.{' '}
                  <a href="#privacy" style={{ textDecoration: 'underline' }}>Privacy policy</a>
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
                Send Message
              </button>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0} y={20}>
            <p
              className="text-center font-medium"
              style={{ color: '#B600A8', fontSize: '1.2rem' }}
            >
              ✓ Got it! I&apos;ll be in touch within 24h.
            </p>
          </FadeIn>
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
                href="mailto:matteo.dangelo1099@gmail.com"
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
