import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ctaImg =
  'https://images.unsplash.com/photo-1602419231015-0fa36e4be4bc?w=1600&q=85&auto=format&fit=crop'

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-navy-900 sm:min-h-[600px]">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-navy-900/60" />
        <img src={ctaImg} alt="" onError={(e) => { e.target.style.display = 'none' }} className="h-full w-full object-cover" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[10px] font-medium tracking-[0.3em] text-red-400 uppercase"
        >
          The complete collection
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-5 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          Find your piece
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-white/50"
        >
          Each creation is made to order in limited batches. Browse the full
          collection and bring ISZA into your home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link to="/collection">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block border border-white/30 px-8 py-3.5 font-body text-[11px] font-medium tracking-[0.2em] text-white uppercase transition-colors hover:border-white hover:bg-white/10"
            >
              View all products
            </motion.span>
          </Link>
          <Link to="/about">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block bg-white px-8 py-3.5 font-body text-[11px] font-medium tracking-[0.2em] text-navy-900 uppercase transition-colors hover:bg-white/90"
            >
              Visit the atelier
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* footer bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-0 inset-x-0 border-t border-white/10 px-6 py-6 sm:px-8 lg:px-12"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/">
            <span className="font-heading text-sm font-semibold tracking-[0.15em] text-white/40 uppercase transition-colors hover:text-white/70">
              ISZA
            </span>
          </Link>
          <span className="text-[10px] tracking-wider text-white/30">
            &copy; {new Date().getFullYear()} ISZA
          </span>
        </div>
      </motion.div>
    </section>
  )
}
