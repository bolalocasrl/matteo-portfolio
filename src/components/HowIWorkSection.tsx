import FadeIn from './FadeIn'
import { useLanguage } from '../i18n/LanguageContext'

export default function HowIWorkSection() {
  const { t } = useLanguage()
  const { steps, included, onRequest, includedTitle, onRequestTitle } = t.howIWork

  return (
    <section
      id="how-i-work"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase text-center"
            style={{
              color: '#0C0C0C',
              fontSize: 'clamp(3rem, 12vw, 160px)',
              lineHeight: 1,
              marginBottom: '1.5rem',
            }}
          >
            {t.howIWork.title}
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.1} y={20}>
          <p
            className="font-light text-center mx-auto"
            style={{
              color: '#0C0C0C',
              opacity: 0.6,
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              maxWidth: '42rem',
              marginBottom: '4rem',
            }}
          >
            {t.howIWork.subtitle}
          </p>
        </FadeIn>

        {/* Timeline */}
        <div style={{ marginBottom: '5rem' }}>
          {steps.map((step, i) => (
            <div key={step.number}>
              <FadeIn delay={0.1 + i * 0.12} y={30}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <span
                    className="font-black shrink-0"
                    style={{
                      color: '#0C0C0C',
                      opacity: 0.15,
                      fontSize: 'clamp(4rem, 8vw, 8rem)',
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </span>
                  <div style={{ paddingTop: '0.75rem' }}>
                    <p
                      className="font-medium uppercase"
                      style={{
                        color: '#0C0C0C',
                        fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {step.title}
                    </p>
                    <p
                      className="font-light"
                      style={{
                        color: '#0C0C0C',
                        opacity: 0.6,
                        fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)',
                        maxWidth: '28rem',
                        lineHeight: 1.7,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Dashed connector */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    borderLeft: '2px dashed rgba(12,12,12,0.15)',
                    height: '3rem',
                    marginLeft: '2rem',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* What's always included */}
        <FadeIn delay={0.1} y={20}>
          <p
            className="font-medium uppercase text-center"
            style={{
              color: '#0C0C0C',
              opacity: 0.4,
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              marginBottom: '2rem',
            }}
          >
            {includedTitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} y={20}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: '0.75rem',
              marginBottom: '3rem',
            }}
          >
            {included.map((item) => (
              <div
                key={item}
                style={{
                  border: '1px solid rgba(12,12,12,0.15)',
                  borderRadius: '9999px',
                  padding: '0.6rem 1.4rem',
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.9rem',
                  color: '#0C0C0C',
                  textAlign: 'center',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Also available */}
        <div style={{ borderTop: '1px solid rgba(12,12,12,0.1)', margin: '3rem 0' }} />

        <FadeIn delay={0.1} y={20}>
          <p
            className="font-medium uppercase text-center"
            style={{
              color: '#0C0C0C',
              opacity: 0.4,
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              marginBottom: '2rem',
            }}
          >
            {onRequestTitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} y={20}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: '0.75rem',
            }}
          >
            {onRequest.map((item) => (
              <div
                key={item}
                style={{
                  border: '1px dashed rgba(12,12,12,0.2)',
                  borderRadius: '9999px',
                  padding: '0.6rem 1.4rem',
                  fontFamily: 'Kanit, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.9rem',
                  color: '#0C0C0C',
                  opacity: 0.6,
                  textAlign: 'center',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
