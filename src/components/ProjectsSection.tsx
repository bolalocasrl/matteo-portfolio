import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const projects = [
  { number: '01', category: 'Client', name: 'Wooden Tree House', url: 'https://www.woodentreehousesgp.com/', tag: 'Creative' },
  { number: '02', category: 'Client', name: 'Finexa CRM', url: 'https://finexacrm.vercel.app/', tag: 'Professionals' },
  { number: '03', category: 'Client', name: 'Nutrizionista Nicole Belentani', url: 'https://nicolebelentani.vercel.app/', tag: 'Professionals' },
  { number: '04', category: 'Client', name: 'Sciaram33', url: 'https://sciaram33.vercel.app/', tag: 'Creative' },
  { number: '05', category: 'Client', name: 'Pizzeria Maragall', url: 'https://pizzeria-maragall.vercel.app/', tag: 'Restaurants' },
  { number: '06', category: 'Client', name: 'Ristorante Bergamini', url: 'https://ristorante-bergamini.vercel.app/', tag: 'Restaurants' },
  { number: '07', category: 'Client', name: 'Point of View', url: 'https://point-of-view-nine.vercel.app/', tag: 'Creative' },
  { number: '08', category: 'Client', name: 'Love Phone', url: 'https://love-phone-blond.vercel.app/', tag: 'Creative' },
  { number: '09', category: 'Client', name: 'La Gorda HDP', url: 'https://la-gorda-hdp.vercel.app/', tag: 'Restaurants' },
  { number: '10', category: 'Client', name: 'Dott. Jacopo Di Bernardini', url: 'https://jacopo-dibernardini.vercel.app/', tag: 'Professionals' },
  { number: '11', category: 'Client', name: 'Il Ponte Mercabarna', url: 'https://ilponte.vercel.app/', tag: 'Restaurants' },
  { number: '12', category: 'Client', name: 'LifeOS', url: 'https://lifeos-matte.vercel.app/info.html', tag: 'Web App' },
  { number: '13', category: 'Client', name: 'Safety House', url: 'https://safety-house-website-xi.vercel.app/it', tag: 'Web App' },
  { number: '14', category: 'Client', name: 'H2O Attiva', url: 'https://h2o-attiva.vercel.app/', tag: 'Creative' },
  { number: '15', category: 'Client', name: 'Macelleria Da Semmi', url: 'https://macelleria-da-semmi.vercel.app/', tag: 'Restaurants' },
]

const screenshotMap: Record<string, string> = {
  'woodentreehousesgp.com': 'woodentreehouse',
  'finexacrm': 'finexacrm',
  'sciaram33': 'sciaram33',
  'nicolebelentani': 'nicole-belentani',
  'pizzeria-maragall': 'pizzeria-maragall',
  'ristorante-bergamini': 'ristorante-bergamini',
  'point-of-view': 'point-of-view',
  'love-phone': 'love-phone',
  'la-gorda-hdp': 'la-gorda-hdp',
  'jacopo-dibernardini': 'jacopo',
  'ilponte': 'ilponte',
  'lifeos-matte': 'lifeos',
  'safety-house-website': 'safetyhouse',
  'h2o-attiva': 'h2o-attiva',
  'macelleria-da-semmi': 'macelleria-da-semmi',
}

// How many projects are shown before "See all"
const INITIAL_VISIBLE = 6

// English tags in the same order as the filters arrays in translations
const EN_FILTER_TAGS = ['All', 'Restaurants', 'Professionals', 'Creative', 'Web App']

function getScreenshot(url: string) {
  const key = Object.keys(screenshotMap).find(k => url.includes(k))
  return key ? `/screenshots/${screenshotMap[key]}.webp` : '/screenshots/woodentreehouse.webp'
}

const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

function ProjectCard({ project, tagLabel, viewLabel, openLabel }: { project: typeof projects[0]; tagLabel: string; viewLabel: string; openLabel: string }) {
  const [isHovered, setHovered] = useState(false)
  const [iframeOpen, setIframeOpen] = useState(false)
  const screenshot = getScreenshot(project.url)
  // On touch devices there is no hover: always show the "hovered" look
  const hovered = isHovered || isTouch

  // While the preview is open: close with Esc and stop the page behind from scrolling
  useEffect(() => {
    if (!iframeOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIframeOpen(false) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [iframeOpen])

  return (
    <>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setIframeOpen(true)}
        style={{
          position: 'relative',
          backgroundColor: '#0C0C0C',
          border: '2px solid rgba(215,226,234,0.2)',
          borderRadius: '24px',
          padding: '1.5rem',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease',
        }}
        whileHover={{ borderColor: 'rgba(215,226,234,0.8)' }}
      >
        {/* Screenshot preview on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                overflow: 'hidden',
                borderRadius: '22px',
              }}
            >
              <img
                src={screenshot}
                alt={project.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.35)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <span style={{
              fontFamily: 'Kanit, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: hovered ? '#D7E2EA' : 'rgba(215,226,234,0.15)',
              lineHeight: 1,
              transition: 'color 0.3s ease',
            }}>
              {project.number}
            </span>
            <span style={{
              fontFamily: 'Kanit, sans-serif',
              fontWeight: 400,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: hovered ? 'rgba(215,226,234,0.9)' : 'rgba(215,226,234,0.4)',
              border: '1px solid',
              borderColor: hovered ? 'rgba(215,226,234,0.6)' : 'rgba(215,226,234,0.2)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
              transition: 'all 0.3s ease',
            }}>
              {tagLabel}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'Kanit, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#D7E2EA',
            }}>
              {project.name}
            </span>
            <motion.span
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'Kanit, sans-serif',
                fontSize: '0.8rem',
                color: '#D7E2EA',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {viewLabel} ↗
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {iframeOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setIframeOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1100px',
              height: '85vh',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid #D7E2EA',
            }}
            onClick={e => e.stopPropagation()}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '4.25rem',
                zIndex: 10,
                background: '#0C0C0C',
                border: '2px solid #D7E2EA',
                color: '#D7E2EA',
                borderRadius: '9999px',
                height: '2.5rem',
                padding: '0 1.1rem',
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'Kanit, sans-serif',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {openLabel} ↗
            </a>
            <button
              onClick={() => setIframeOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
                background: '#0C0C0C',
                border: '2px solid #D7E2EA',
                color: '#D7E2EA',
                borderRadius: '9999px',
                width: '2.5rem',
                height: '2.5rem',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Kanit, sans-serif',
              }}
            >
              ✕
            </button>
            <iframe
              src={project.url}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title={project.name}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default function ProjectsSection() {
  const { t } = useLanguage()
  // Store index so filter survives language switches (tag strings stay in English internally)
  const [activeFilterIndex, setActiveFilterIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const filteredProjects = activeFilterIndex === 0
    ? projects
    : projects.filter(p => p.tag === EN_FILTER_TAGS[activeFilterIndex])
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE)
  const hiddenCount = filteredProjects.length - visibleProjects.length

  return (
    <section
      id="projects"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.projects.title}
      </h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {t.projects.filters.map((filter, i) => (
          <button
            key={i}
            onClick={() => setActiveFilterIndex(i)}
            style={{
              border: '2px solid #D7E2EA',
              color: activeFilterIndex === i ? '#0C0C0C' : '#D7E2EA',
              backgroundColor: activeFilterIndex === i ? '#D7E2EA' : 'transparent',
              borderRadius: '9999px',
              padding: '0.5rem 1.5rem',
              fontFamily: 'Kanit, sans-serif',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: '1rem',
        }}
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.div
              key={project.number}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                tagLabel={t.projects.filters[EN_FILTER_TAGS.indexOf(project.tag)] ?? project.tag}
                viewLabel={t.projects.viewProject}
                openLabel={t.projects.openSite}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {hiddenCount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <button
            onClick={() => setShowAll(true)}
            style={{
              border: '2px solid #D7E2EA',
              color: '#D7E2EA',
              backgroundColor: 'transparent',
              borderRadius: '9999px',
              padding: '1rem 2.2rem',
              fontFamily: 'Kanit, sans-serif',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D7E2EA'; e.currentTarget.style.color = '#0C0C0C' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#D7E2EA' }}
          >
            {t.projects.seeAll} (+{hiddenCount})
          </button>
        </div>
      )}
    </section>
  )
}
