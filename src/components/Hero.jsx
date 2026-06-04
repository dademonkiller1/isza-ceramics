import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const heroImg =
  'https://images.unsplash.com/photo-1602419231015-0fa36e4be4bc?w=1600&q=85&auto=format&fit=crop'

const premiumEase = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.5 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: premiumEase },
  },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex h-dvh min-h-[640px] items-center justify-center overflow-hidden bg-navy-950"
    >
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/20 to-navy-950/60" />
        <img
          src={heroImg}
          alt=""
          onError={(e) => { e.target.style.display = 'none' }}
          className="h-full w-full object-cover bg-navy-900"
        />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-8 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block text-[11px] font-medium tracking-[0.35em] text-white/40 uppercase"
        >
          Artisanal ceramics
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-8 font-heading text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          Crafted from
          <br />
          <span className="italic text-red-500">earth &amp; fire</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-white/50 sm:text-lg"
        >
          Each piece shaped by hand, fired with intention — ceramics that bring
          quiet beauty to the everyday.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12">
          <Link
            to="/collection"
            className="group relative inline-block"
          >
            <span className="inline-block border border-white/25 px-10 py-4 font-body text-[11px] font-medium tracking-[0.25em] text-white uppercase transition-all duration-700 group-hover:border-white/60 group-hover:bg-white/5">
              Explore the Collection
            </span>
            <span className="absolute -bottom-px left-1/2 h-px w-0 -translate-x-1/2 bg-white/60 transition-all duration-700 group-hover:w-3/4" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-10 w-px bg-white/20"
        />
      </motion.div>
    </section>
  )
}
