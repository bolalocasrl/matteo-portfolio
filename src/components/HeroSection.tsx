import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import { useLanguage } from '../i18n/LanguageContext'

export default function HeroSection() {
  const { t, lang, setLang } = useLanguage()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [menuOpen, setMenuOpen] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Show the floating bar once the hero is scrolled past
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    { label: t.nav.services, href: '#services' },
    { label: t.nav.howIWork, href: '#come-lavoro' },
    { label: t.nav.projects, href: '#projects' },
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

  const hamburger = (
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
            {hamburger}
          </div>

        </nav>
      </FadeIn>

      {/* Floating bar (appears after the hero) */}
      <AnimatePresence>
        {showBar && !menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ position: 'fixed', top: '12px', left: 0, right: 0, zIndex: 90, display: 'flex', justifyContent: 'center', padding: '0 12px', pointerEvents: 'none' }}
          >
            <nav
              className="flex items-center justify-between gap-6 md:gap-10 w-full md:w-auto"
              style={{
                pointerEvents: 'auto',
                background: 'rgba(12,12,12,0.94)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(215,226,234,0.15)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
                borderRadius: '9999px',
                padding: '0.55rem 0.75rem 0.55rem 1.4rem',
              }}
            >
              <a
                href="#"
                onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="font-black uppercase tracking-tight"
                style={{ color: '#D7E2EA', fontSize: '1.1rem', textDecoration: 'none' }}
              >
                Matte
              </a>

              <div className="hidden md:flex items-center gap-7">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{ color: '#D7E2EA' }}
                    className="font-medium uppercase tracking-wider text-sm transition-opacity duration-200 hover:opacity-70"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {langSwitcher}
                <div className="md:hidden">{hamburger}</div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

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
        className="absolute z-10 left-1/2 -translate-x-1/2
          top-[45%] -translate-y-1/2
          w-[clamp(200px,55vw,300px)]
          sm:top-auto sm:translate-y-0 sm:bottom-0
          sm:w-[clamp(260px,40vw,520px)]"
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
