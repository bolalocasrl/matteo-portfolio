import { useEffect, useRef, useState } from 'react'

const IMAGES = [
  '/screenshots/finexacrm.webp',
  '/screenshots/woodentreehouse.webp',
  '/screenshots/sciaram33.webp',
  '/screenshots/nicole-belentani.webp',
  '/screenshots/pizzeria-maragall.webp',
  '/screenshots/ristorante-bergamini.webp',
  '/screenshots/point-of-view.webp',
  '/screenshots/love-phone.webp',
  '/screenshots/la-gorda-hdp.webp',
  '/screenshots/jacopo.webp',
]

const ROW1 = [...IMAGES, ...IMAGES, ...IMAGES]
const ROW2 = [...IMAGES.slice(4), ...IMAGES.slice(0, 4), ...IMAGES.slice(4), ...IMAGES.slice(0, 4), ...IMAGES.slice(4), ...IMAGES.slice(0, 4)]

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
      <div
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
          display: 'flex',
          gap: '12px',
          marginBottom: '12px',
        }}
      >
        {ROW1.map((img, i) => (
          <img
            key={i}
            src={img}
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
      <div
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
          display: 'flex',
          gap: '12px',
        }}
      >
        {ROW2.map((img, i) => (
          <img
            key={i}
            src={img}
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
