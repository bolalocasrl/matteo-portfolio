import { useEffect, useRef, useState } from 'react'
import './index.css'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import HowIWorkPage from './components/HowIWorkPage'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'

const HOW_I_WORK_HASH = '#come-lavoro'

function App() {
  const [showHowIWork, setShowHowIWork] = useState(() => window.location.hash === HOW_I_WORK_HASH)
  const returnScroll = useRef<number | null>(null)
  const openedFromSite = useRef(false)

  // "Come lavoro" is a separate page reached via #come-lavoro, so the phone's back button works
  useEffect(() => {
    const onHashChange = () => {
      const isHow = window.location.hash === HOW_I_WORK_HASH
      setShowHowIWork(prev => {
        if (isHow && !prev) {
          returnScroll.current = window.scrollY
          openedFromSite.current = true
        }
        return isHow
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // After switching page: top of "Come lavoro", or back where the visitor was (or the clicked section)
  useEffect(() => {
    requestAnimationFrame(() => {
      if (showHowIWork) {
        window.scrollTo(0, 0)
        return
      }
      if (returnScroll.current !== null) {
        window.scrollTo(0, returnScroll.current)
        returnScroll.current = null
        return
      }
      const target = window.location.hash ? document.querySelector(window.location.hash) : null
      target?.scrollIntoView()
    })
  }, [showHowIWork])

  const goBack = () => {
    if (openedFromSite.current) window.history.back()
    else window.location.hash = ''
  }

  if (showHowIWork) {
    return <HowIWorkPage onBack={goBack} />
  }

  return (
    <div style={{ backgroundColor: '#0C0C0C', overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}

export default App
