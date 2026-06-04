import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ctaImg =
  'https://images.unsplash.com/photo-1602419231015-0fa36e4be4bc?w=1600&q=85&auto=format&fit=crop'

const premiumEase = [0.16, 1, 0.3, 1]

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.2, ease: premiumEase },
  }),
}

export default function FinalCTA() {
  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-navy-950 sm:min-h-[640px]">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: premiumEase }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-950/80" />
        <img src={ctaImg} alt="" onError={(e) => { e.target.style.display = 'none' }} className="h-full w-full object-cover" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-2xl px-8 text-center">
        {[
          { as: 'span', text: 'The complete collection', className: 'text-[10px] font-medium tracking-[0.35em] text-red-400 uppercase' },
          { as: 'h2', text: 'Find your piece', className: 'mt-6 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl' },
          { as: 'p', text: 'Each creation is made to order in limited batches. Browse the full collection and bring ISZA into your home.', className: 'mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-white/50' },
        ].map((el, i) => {
          const Tag = el.as
          return (
            <motion.div
              key={i}
              custom={i}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Tag className={el.className}>{el.text}</Tag>
            </motion.div>
          )
        })}

        <motion.div
          custom={3}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
        >
          <Link to="/collection">
            <span className="inline-block border border-white/25 px-10 py-4 font-body text-[11px] font-medium tracking-[0.25em] text-white uppercase transition-all duration-700 hover:border-white/60 hover:bg-white/5">
              View all products
            </span>
          </Link>
          <Link to="/about">
            <span className="inline-block bg-white/10 px-10 py-4 font-body text-[11px] font-medium tracking-[0.25em] text-white uppercase backdrop-blur-sm transition-all duration-700 hover:bg-white/20">
              Visit the atelier
            </span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-0 inset-x-0 border-t border-white/5 px-8 py-6 sm:px-12"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/">
            <span className="font-heading text-sm font-semibold tracking-[0.15em] text-white/30 uppercase transition-colors hover:text-white/60">
              ISZA
            </span>
          </Link>
          <span className="text-[10px] tracking-wider text-white/20">
            &copy; {new Date().getFullYear()} ISZA
          </span>
        </div>
      </motion.div>
    </section>
  )
}
