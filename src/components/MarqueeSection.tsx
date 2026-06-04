import { useEffect, useRef, useState } from 'react'

const IMAGES = [
  '/screenshots/finexacrm.jpeg',
  '/screenshots/woodentreehouse.jpeg',
  '/screenshots/sciaram33.jpeg',
  '/screenshots/nicole-belentani.jpeg',
  '/screenshots/pizzeria-maragall.jpeg',
  '/screenshots/ristorante-bergamini.jpeg',
  '/screenshots/point-of-view.jpeg',
  '/screenshots/love-phone.jpeg',
  '/screenshots/la-gorda-hdp.jpeg',
]

const ROW1 = [...IMAGES, ...IMAGES, ...IMAGES]
const ROW2 = [...IMAGES.slice(4), ...IMAGES.slice(0, 4), ...IMAGES.slice(4), ...IMAGES.slice(0, 4), ...IMAGES.slice(4), ...IMAGES.slice(0, 4)]

const imgStyle = {
  width: '420px',
  height: '270px',
  borderRadius: '16px',
  objectFit: 'cover' as const,
  flexShrink: 0,
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(200)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const newOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(newOffset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTouch])

  if (isTouch) {
    return (
      <section
        ref={sectionRef}
        style={{ backgroundColor: '#0C0C0C' }}
        className="pt-24 pb-10"
      >
        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingInline: '20px',
            scrollbarWidth: 'none',
          }}
        >
          {IMAGES.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              loading="lazy"
              style={{
                ...imgStyle,
                width: '80vw',
                height: '52vw',
                scrollSnapAlign: 'start',
              }}
            />
          ))}
        </div>
      </section>
    )
  }

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
          <img key={i} src={img} alt="" loading="lazy" style={imgStyle} />
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
          <img key={i} src={img} alt="" loading="lazy" style={imgStyle} />
        ))}
      </div>
    </section>
  )
}
