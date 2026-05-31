import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'

const text = "With more than three years of experience in web design, i focus on creating modern websites and digital experiences. I truly enjoy working with businesses and individuals that aim to stand out and present their best image online. Let's build something incredible together!"

interface AnimatedCharProps {
  char: string
  scrollYProgress: MotionValue<number>
  start: number
  end: number
}

function AnimatedChar({ char, scrollYProgress, start, end }: AnimatedCharProps) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])
  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span style={{ opacity: 0.2 }}>{char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>
        {char}
      </motion.span>
    </span>
  )
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  })

  return (
    <section
      id="about"
      ref={containerRef}
      style={{ backgroundColor: '#0C0C0C' }}
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Top-left moon */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" />
      </FadeIn>

      {/* Bottom-left object */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" />
      </FadeIn>

      {/* Top-right lego */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" />
      </FadeIn>

      {/* Bottom-right group */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" />
      </FadeIn>

      {/* Content */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <p
            className="font-medium text-center leading-relaxed max-w-[560px]"
            style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          >
            {text.split('').map((char, i) => (
              <AnimatedChar
                key={i}
                char={char}
                scrollYProgress={scrollYProgress}
                start={i / text.length}
                end={(i + 1) / text.length}
              />
            ))}
          </p>

          <ContactButton />
        </div>
      </div>
    </section>
  )
}
