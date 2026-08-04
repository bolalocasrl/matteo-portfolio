import { useState } from 'react'
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
  { number: '12', category: 'Client', name: 'LifeOS', url: 'https://lifeos-matte.vercel.app/', tag: 'Web App' },
  { number: '13', category: 'Client', name: 'Safety House', url: 'https://safety-house-website-xi.vercel.app/it', tag: 'Web App' },
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
}

// English tags in the same order as the filters arrays in translations
const EN_FILTER_TAGS = ['All', 'Restaurants', 'Professionals', 'Creative', 'Web App']

function getScreenshot(url: string) {
  const key = Object.keys(screenshotMap).find(k => url.includes(k))
  return key ? `/screenshots/${screenshotMap[key]}.webp` : '/screenshots/woodentreehouse.webp'
}

function ProjectCard({ project, viewLabel }: { project: typeof projects[0]; viewLabel: string }) {
  const [hovered, setHovered] = useState(false)
  const [iframeOpen, setIframeOpen] = useState(false)
  const screenshot = getScreenshot(project.url)

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
              {project.tag}
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
            <button
              onClick={() => setIframeOpen(false)}
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
  const filteredProjects = activeFilterIndex === 0
    ? projects
    : projects.filter(p => p.tag === EN_FILTER_TAGS[activeFilterIndex])

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
          {filteredProjects.map((project) => (
            <motion.div
              key={project.number}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} viewLabel={t.projects.viewProject} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
