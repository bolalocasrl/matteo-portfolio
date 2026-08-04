import FadeIn from './FadeIn'
import { useLanguage } from '../i18n/LanguageContext'

export default function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section
      id="services"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase text-center"
          style={{
            color: '#0C0C0C',
            fontSize: 'clamp(3rem, 12vw, 160px)',
            marginBottom: 'clamp(3rem, 6vw, 7rem)',
            lineHeight: 1,
          }}
        >
          {t.services.title}
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {t.services.items.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12,12,12,0.15)',
                ...(i === t.services.items.length - 1 ? { borderBottom: '1px solid rgba(12,12,12,0.15)' } : {})
              }}
            >
              <span
                className="font-black leading-none shrink-0"
                style={{
                  color: '#0C0C0C',
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                  lineHeight: 0.85,
                }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2 pt-2">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span
                    className="font-medium uppercase"
                    style={{
                      color: '#0C0C0C',
                      fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                    }}
                  >
                    {service.name}
                  </span>
                  {service.tag && (
                    <span style={{
                      border: '1px solid rgba(12,12,12,0.2)',
                      borderRadius: '9999px',
                      padding: '0.2rem 0.8rem',
                      fontSize: '0.7rem',
                      opacity: 0.6,
                      fontFamily: 'Kanit, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#0C0C0C',
                    }}>
                      {service.tag}
                    </span>
                  )}
                </div>
                <span
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: '#0C0C0C',
                    opacity: 0.6,
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  }}
                >
                  {service.description}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
