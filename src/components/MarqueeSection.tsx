import { useEffect, useRef, useState } from 'react'

const GIFS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const ROW1 = [...GIFS.slice(0, 11), ...GIFS.slice(0, 11), ...GIFS.slice(0, 11)]
const ROW2 = [...GIFS.slice(11), ...GIFS.slice(11), ...GIFS.slice(11)]

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
