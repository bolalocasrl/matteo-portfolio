import FadeIn from './FadeIn'
import { useLanguage } from '../i18n/LanguageContext'

export default function ServicesSection() {
  const { t } = useLanguage()
  const mainServices = t.services.items.filter(s => !s.tag)
  const onRequestServices = t.services.items.filter(s => s.tag)

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
        {mainServices.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12,12,12,0.15)',
                ...(i === mainServices.length - 1 ? { borderBottom: '1px solid rgba(12,12,12,0.15)' } : {})
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

        {/* On request: compact chips */}
        {onRequestServices.length > 0 && (
          <FadeIn delay={0.1} y={20}>
            <div className="flex flex-col items-center gap-5 pt-12 sm:pt-14">
              <span
                className="font-medium uppercase"
                style={{ color: '#0C0C0C', opacity: 0.4, fontSize: '0.85rem', letterSpacing: '0.15em' }}
              >
                {onRequestServices[0].tag}
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {onRequestServices.map((service) => (
                  <span
                    key={service.number}
                    title={service.description}
                    style={{
                      border: '1px dashed rgba(12,12,12,0.3)',
                      borderRadius: '9999px',
                      padding: '0.6rem 1.3rem',
                      fontFamily: 'Kanit, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.9rem',
                      color: '#0C0C0C',
                    }}
                  >
                    {service.name}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      <FadeIn delay={0.1} y={20} className="flex justify-center mt-14 sm:mt-16">
        <a
          href="#come-lavoro"
          style={{
            display: 'inline-block',
            background: '#0C0C0C',
            color: 'white',
            borderRadius: '9999px',
            padding: '1rem 2.2rem',
            fontFamily: 'Kanit, sans-serif',
            fontWeight: 500,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {t.nav.discoverProcess} →
        </a>
      </FadeIn>
    </section>
  )
}
