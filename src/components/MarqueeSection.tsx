import { useEffect, useRef, useState } from 'react'

const GIFS = [
  'https://www.woodentreehousesgp.com/og-image.png',
  'https://finexacrm.vercel.app/og-image.png',
  'https://sciaram33.vercel.app/og-image.png',
  'https://nicolebelentani.vercel.app/og-image.png',
  'https://pizzeria-maragall.vercel.app/og-image.png',
  'https://ristorante-bergamini.vercel.app/og-image.png',
  'https://point-of-view-nine.vercel.app/og-image.png',
  'https://love-phone-blond.vercel.app/og-image.png',
  'https://la-gorda-hdp.vercel.app/og-image.png',
]

const ROW1 = [...GIFS.slice(0, 5), ...GIFS.slice(0, 5), ...GIFS.slice(0, 5)]
const ROW2 = [...GIFS.slice(5), ...GIFS.slice(5), ...GIFS.slice(5)]

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(200)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const newOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(newOffset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#0C0C0C' }}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      {/* Row 1 — moves right */}
      <div
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
          display: 'flex',
          gap: '12px',
          marginBottom: '12px',
        }}
      >
        {ROW1.map((gif, i) => (
          <img
            key={i}
            src={gif}
            alt=""
            loading="lazy"
            style={{
              width: '420px',
              height: '270px',
              borderRadius: '16px',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Row 2 — moves left */}
      <div
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
          display: 'flex',
          gap: '12px',
        }}
      >
        {ROW2.map((gif, i) => (
          <img
            key={i}
            src={gif}
            alt=""
            loading="lazy"
            style={{
              width: '420px',
              height: '270px',
              borderRadius: '16px',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}
