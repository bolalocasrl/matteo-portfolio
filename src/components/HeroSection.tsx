import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import { useLanguage } from '../i18n/LanguageContext'

export default function HeroSection() {
  const { t, lang, setLang } = useLanguage()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => { setIsMobile(window.innerWidth < 768) }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || window.innerWidth < 768) return
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

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const langSwitcher = (
    <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
      {(['en', 'it', 'es'] as const).map((l) => (
        <button
          key={l}
          onClick={() => { setLang(l); setMenuOpen(false) }}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Kanit, sans-serif',
            fontWeight: 500,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#D7E2EA',
            opacity: lang === l ? 1 : 0.4,
            padding: '0.2rem 0.4rem',
            transition: 'opacity 0.2s ease',
          }}
        >
          {l}
        </button>
      ))}
    </div>
  )

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

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{ color: '#D7E2EA' }}
                className="font-medium uppercase tracking-wider text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop language switcher */}
          <div className="hidden md:flex">
            {langSwitcher}
          </div>

          {/* Mobile: lang switcher left + hamburger right */}
          <div className="flex md:hidden items-center justify-between w-full">
            {langSwitcher}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
              aria-label="Menu"
            >
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#D7E2EA',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#D7E2EA',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#D7E2EA',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }} />
            </button>
          </div>

        </nav>
      </FadeIn>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#0C0C0C',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#D7E2EA',
                fontSize: '1.5rem',
              }}
            >
              ✕
            </button>

            {navLinks.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{ color: '#D7E2EA', textDecoration: 'none' }}
                className="font-black uppercase tracking-wider"
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <span style={{ fontSize: 'clamp(2.5rem, 12vw, 4rem)', lineHeight: 1 }}>
                  {item.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Heading */}
      <div className="mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none w-full text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16vw] px-4"
          >
            Hi, I&apos;m Matte
          </h1>
        </FadeIn>
      </div>

      {/* Portrait */}
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          left: '50%',
          top: isMobile ? '45%' : 'auto',
          bottom: isMobile ? 'auto' : 0,
          transform: isMobile ? 'translate(-50%, -50%)' : 'translateX(-50%)',
          width: isMobile ? 'clamp(200px, 60vw, 300px)' : 'clamp(260px, 40vw, 520px)',
        }}
      >
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
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto">
        <FadeIn delay={0.35} y={20}>
          <p
            style={{ color: '#D7E2EA', fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          >
            {t.hero.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton label={t.hero.cta} />
        </FadeIn>
      </div>
    </section>
  )
}
