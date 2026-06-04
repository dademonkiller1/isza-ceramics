import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const storyImg =
  'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1200&q=85&auto=format&fit=crop'

const premiumEase = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: premiumEase },
  },
}

export default function BrandStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgParallax = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ['0%', '30%'])

  return (
    <section ref={ref} className="relative bg-cream-light">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-stretch px-8 py-24 sm:py-32 lg:flex-row lg:py-44">
        {/* Left — vertical label / negative space */}
        <div className="hidden justify-center lg:flex lg:w-1/4">
          <motion.span
            style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
            className="origin-bottom-left rotate-180 whitespace-nowrap text-[10px] font-medium tracking-[0.4em] text-navy-300 uppercase [writing-mode:vertical-rl]"
          >
            Established in Kyoto
          </motion.span>
        </div>

        {/* Right — content */}
        <div className="flex flex-col justify-center lg:w-3/4 lg:pl-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <span className="text-[10px] font-medium tracking-[0.3em] text-red-500 uppercase">
              Atelier
            </span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="mt-6 font-heading text-4xl font-bold leading-[1.15] text-navy-900 sm:text-5xl lg:text-6xl"
          >
            Where clay
            <br />
            becomes <span className="italic text-red-500">art</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="mt-10 grid gap-8 sm:grid-cols-2"
          >
            <p className="text-sm leading-[1.8] text-navy-500 sm:text-base">
              Every ISZA piece begins as raw clay, sourced from two centuries-old
              deposits in the mountains of central Japan. In our Kyoto atelier,
              master artisans shape each form by hand on the wheel.
            </p>
            <p className="text-sm leading-[1.8] text-navy-500 sm:text-base">
              Fired at 1280°C for over 36 hours, the ceramics emerge
              transformed — hardened by flame, marked by the subtle
              imperfections that make each piece unmistakably human.
            </p>
          </motion.div>

          <motion.div
            style={{ width: lineWidth }}
            className="mt-12 h-px bg-red-500/60"
          />

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="mt-8 font-heading text-xl italic leading-relaxed text-navy-300 sm:text-2xl"
          >
            &ldquo;We don&apos;t make objects. We make companions for a lifetime.&rdquo;
          </motion.p>
        </div>
      </div>

      {/* Image panel — full width below text */}
      <motion.div
        initial={{ clipPath: 'inset(0 50% 0 50%)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0%)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: premiumEase }}
        className="mx-auto max-w-7xl overflow-hidden px-8 pb-24 sm:pb-32 lg:pb-44"
      >
        <div className="aspect-[2.4/1] overflow-hidden bg-navy-100">
          <motion.div style={{ y: imgParallax }} className="h-full w-full">
            <img
              src={storyImg}
              alt="Artisan hands shaping clay"
              onError={(e) => { e.target.style.display = 'none' }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
