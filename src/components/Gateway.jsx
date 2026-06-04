import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const premiumEase = [0.16, 1, 0.3, 1]

const gateways = [
  {
    title: 'The Collection',
    subtitle: 'Browse all works',
    description: 'Sculptural vases, serving pieces, and everyday objects — each made to order in limited batches.',
    link: '/collection',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dc1c?w=1200&q=85&auto=format&fit=crop',
  },
  {
    title: 'Our Heritage',
    subtitle: 'The atelier story',
    description: 'Rooted in Kyoto tradition. Hand-thrown porcelain, fired at 1280°C, finished with intention.',
    link: '/about',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=85&auto=format&fit=crop',
  },
]

function GatewayBlock({ item, index }) {
  const blockRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ['start end', 'end start'],
  })
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])
  const contentReveal = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])

  return (
    <motion.div
      ref={blockRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay: index * 0.2, ease: premiumEase }}
      className="group relative overflow-hidden"
    >
      <Link to={item.link} className="block">
        <div className="aspect-[16/9] overflow-hidden bg-navy-100 sm:aspect-[2/1] lg:aspect-[3/1]">
          <motion.div style={{ scale: imgScale }} className="h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-navy-950/30 to-transparent z-10" />
            <img
              src={item.image}
              alt={item.title}
              onError={(e) => { e.target.style.display = 'none' }}
              className="h-full w-full object-cover transition-transform duration-1500 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: contentReveal }}
          className="absolute inset-0 z-20 flex flex-col justify-center px-8 sm:px-16 lg:px-24"
        >
          <span className="text-[10px] font-medium tracking-[0.3em] text-red-400 uppercase">
            {item.subtitle}
          </span>
          <h3 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {item.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            {item.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] text-white/70 uppercase transition-colors group-hover:text-white">
            <span>Discover</span>
            <span className="inline-block h-px w-6 bg-white/40 transition-all duration-700 group-hover:w-10" />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function Gateway() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headingOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, 1])

  return (
    <section ref={sectionRef} className="bg-cream-light py-24 sm:py-32 lg:py-44">
      <motion.div
        style={{ opacity: headingOpacity }}
        className="mx-auto mb-16 max-w-7xl px-8 sm:mb-20 lg:mb-24"
      >
        <span className="text-[10px] font-medium tracking-[0.3em] text-navy-400 uppercase">
          Explore
        </span>
        <h2 className="mt-4 font-heading text-4xl font-bold text-navy-900 sm:text-5xl lg:text-6xl">
          Pathways
        </h2>
      </motion.div>

      <div className="mx-auto max-w-7xl px-8">
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {gateways.map((item, i) => (
            <GatewayBlock key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
