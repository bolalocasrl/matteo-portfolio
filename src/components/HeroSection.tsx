import FadeIn from './FadeIn'
import ContactButton from './ContactButton'

export default function HeroSection() {
  return (
    <section
      style={{ backgroundColor: '#0C0C0C', overflowX: 'clip' }}
      className="h-screen flex flex-col relative"
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {['About', 'Projects', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ color: '#D7E2EA' }}
              className="font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw] px-4"
          >
            Hi, i&apos;m Matt
          </h1>
        </FadeIn>
      </div>

      {/* Portrait */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[260px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-[50%] -translate-y-[40%] sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Matteo D'Angelo"
            className="w-full h-auto"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div
        className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto"
      >
        <FadeIn delay={0.35} y={20}>
          <p
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)'
            }}
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          >
            a web designer crafting modern and unforgettable websites
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
