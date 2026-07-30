import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || window.innerWidth < 640) return
    const rect = heroRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = (e.clientX - rect.left - centerX) / 18
    const y = (e.clientY - rect.top - centerY) / 18
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
      <div className="mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none w-full text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw] px-4"
          >
            Hi, i&apos;m Matte
          </h1>
        </FadeIn>
      </div>

      {/* Portrait */}
      {/* Wrapper di posizionamento — non animato */}
      <div
        className="absolute z-10"
        style={{
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: 'clamp(260px, 40vw, 520px)',
        }}
      >
        {/* Wrapper animato — solo per il movimento */}
        <motion.div
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.6 }}
          style={{ width: '100%' }}
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Matteo D'Angelo"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            loading="lazy"
          />
        </motion.div>
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
