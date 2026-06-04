import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const projects = [
  { number: '01', category: 'Client', name: 'Wooden Tree House', url: 'https://www.woodentreehousesgp.com/' },
  { number: '02', category: 'Client', name: 'Finexa CRM', url: 'https://finexacrm.vercel.app/' },
  { number: '03', category: 'Client', name: 'Nicole Belentani', url: 'https://nicolebelentani.vercel.app/' },
  { number: '04', category: 'Client', name: 'Sciaram33', url: 'https://sciaram33.vercel.app/' },
  { number: '05', category: 'Client', name: 'Pizzeria Maragall', url: 'https://pizzeria-maragall.vercel.app/' },
  { number: '06', category: 'Client', name: 'Ristorante Bergamini', url: 'https://ristorante-bergamini.vercel.app/' },
  { number: '07', category: 'Client', name: 'Point of View', url: 'https://point-of-view-nine.vercel.app/' },
  { number: '08', category: 'Client', name: 'Love Phone', url: 'https://love-phone-blond.vercel.app/' },
  { number: '09', category: 'Client', name: 'La Gorda HDP', url: 'https://la-gorda-hdp.vercel.app/' },
]

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  total: number
  progress: any
}

function ProjectCard({ project, index, total, progress }: ProjectCardProps) {
  const [iframeOpen, setIframeOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

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
  }
  const screenshotKey = Object.keys(screenshotMap).find(key => project.url.includes(key))
  const screenshotSrc = screenshotKey ? `/screenshots/${screenshotMap[screenshotKey]}.jpeg` : '/screenshots/woodentreehouse.jpeg'

  return (
    <div
      style={{
        height: isMobile ? 'auto' : '85vh',
        paddingBottom: isMobile ? '1.5rem' : '0',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'sticky',
        top: '6rem',
      }}
    >
      <motion.div
        style={{
          scale,
          top: isMobile ? 0 : `${index * 28}px`,
          position: 'relative',
          width: '100%',
          backgroundColor: '#0C0C0C',
          border: '2px solid #D7E2EA',
          borderRadius: '40px',
          padding: '1.5rem',
          transformOrigin: 'top center',
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span
              className="font-black leading-none"
              style={{ color: '#D7E2EA', fontSize: 'clamp(2rem, 6vw, 5rem)', lineHeight: 1 }}
            >
              {project.number}
            </span>
            <span
              className="font-light uppercase tracking-widest"
              style={{ color: '#D7E2EA', opacity: 0.5, fontSize: 'clamp(0.7rem, 1.2vw, 1rem)' }}
            >
              {project.category}
            </span>
            <span
              className="font-medium uppercase"
              style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 2vw, 1.8rem)' }}
            >
              {project.name}
            </span>
          </div>
          <button
            onClick={() => setIframeOpen(true)}
            style={{
              border: '2px solid #D7E2EA',
              color: '#D7E2EA',
              borderRadius: '9999px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'Kanit, sans-serif',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
              padding: '0.6rem 1.5rem',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(215,226,234,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            View Project
          </button>
        </div>

        {/* Preview */}
        <div
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '16/9',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'rgba(215,226,234,0.05)',
          }}
        >
          {isMobile ? (
            <img
              src={screenshotSrc}
              alt={project.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '24px',
                backgroundColor: '#111',
              }}
            />
          ) : (
            <iframe
              src={project.url}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '24px',
                pointerEvents: 'none',
              }}
              title={project.name}
              loading="lazy"
            />
          )}
        </div>
      </motion.div>

      {/* Modal iframe overlay */}
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
    </div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      ref={containerRef}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      <div style={{ position: 'relative' }}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
