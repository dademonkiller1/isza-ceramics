import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const storyImg =
  'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1200&q=85&auto=format&fit=crop'

export default function BrandStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const reveal = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0, 1, 1])

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-900">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* image side */}
        <div className="relative h-80 overflow-hidden sm:h-96 lg:h-auto lg:min-h-[600px]">
          <motion.div
            style={{ y: imgParallax }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/20" />
            <img
              src={storyImg}
              alt="Artisan hands shaping clay"
              onError={(e) => { e.target.style.display = 'none' }}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* text side */}
        <div className="flex items-center px-6 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[10px] font-medium tracking-[0.25em] text-red-400 uppercase">
                Atelier
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Where clay
                <br />
                becomes <span className="italic text-red-400">art</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 space-y-4 text-sm leading-relaxed text-white/60 sm:text-base"
            >
              <p>
                Every ISZA piece begins as raw clay, sourced from two centuries-old
                deposits in the mountains of central Japan. In our Kyoto atelier,
                master artisans shape each form by hand on the wheel.
              </p>
              <p>
                Fired at 1280°C for over 36 hours, the ceramics emerge
                transformed — hardened by flame, marked by the subtle
                imperfections that make each piece unmistakably human.
              </p>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="mt-8 h-[2px] bg-red-500"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 font-heading text-lg italic leading-relaxed text-white/40 sm:text-xl"
            >
              "We don't make objects. We make companions for a lifetime."
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
