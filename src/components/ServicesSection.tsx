import FadeIn from './FadeIn'

const services = [
  {
    number: '01',
    name: 'Landing Page',
    description: 'A fast, modern, conversion-focused single page designed to present your business, product or personal brand in the best possible way.'
  },
  {
    number: '02',
    name: 'Multi-page Website',
    description: 'Complete websites with multiple pages, custom navigation, and a coherent design system tailored to your brand identity.'
  },
  {
    number: '03',
    name: 'Newsletter Setup',
    description: 'Full newsletter integration with Brevo — signup forms, automated welcome emails, and campaign setup ready to grow your audience.'
  },
  {
    number: '04',
    name: 'Graphic & 3D Assets',
    description: 'Custom visual assets, illustrations and 3D graphics to elevate your brand presence across web and social media. Price on request.'
  },
  {
    number: '05',
    name: 'Annual Maintenance',
    description: 'Ongoing support, updates, content changes and performance monitoring to keep your website running perfectly all year long.'
  },
]

export default function ServicesSection() {
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
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12,12,12,0.15)',
                ...(i === services.length - 1 ? { borderBottom: '1px solid rgba(12,12,12,0.15)' } : {})
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
                <span
                  className="font-medium uppercase"
                  style={{
                    color: '#0C0C0C',
                    fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                  }}
                >
                  {service.name}
                </span>
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
