import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const heroImg =
  'https://images.unsplash.com/photo-1602419231015-0fa36e4be4bc?w=1600&q=85&auto=format&fit=crop'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  return (
    <section
      ref={ref}
      className="relative flex h-dvh min-h-[600px] items-center justify-center overflow-hidden bg-navy-900"
    >
      {/* background layer */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-black/30"
        />
        <img
          src={heroImg}
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block text-[10px] font-medium tracking-[0.3em] text-white/50 uppercase"
        >
          Artisanal ceramics
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Crafted from
          <br />
          <span className="italic text-red-500">earth &amp; fire</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-white/60 sm:text-lg"
        >
          Each piece shaped by hand, fired with intention — ceramics that bring
          quiet beauty to the everyday.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <Link to="/collection">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block border border-white/30 px-8 py-3.5 font-body text-[11px] font-medium tracking-[0.2em] text-white uppercase transition-colors hover:border-white hover:bg-white/10"
            >
              Explore the collection
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-[1px] bg-white/30"
        />
      </motion.div>
    </section>
  )
}
