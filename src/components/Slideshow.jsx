import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import products from '../data/products'

const slides = products.slice(0, 4)

const textVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.15 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function Slideshow() {
  const [[page, direction], setPage] = useState([0, 0])
  const index = ((page % slides.length) + slides.length) % slides.length

  const paginate = useCallback(
    (dir) => setPage(([p]) => [p + dir, dir]),
    [],
  )

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [paginate])

  const imageVariants = {
    enter: (dir) => ({
      scale: 0.92,
      opacity: 0,
      x: dir > 0 ? 80 : -80,
    }),
    center: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
    exit: (dir) => ({
      scale: 1.05,
      opacity: 0,
      x: dir > 0 ? -80 : 80,
      transition: { duration: 0.5, ease: 'easeIn' },
    }),
  }

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="text-[10px] font-medium tracking-[0.25em] text-navy-500 uppercase">
            Featured
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-navy-900 sm:text-4xl lg:text-5xl">
            The Collection
          </h2>
        </motion.div>

        <div className="relative">
          <div className="relative mx-auto aspect-[4/3] max-h-[70vh] overflow-hidden rounded-sm sm:aspect-[16/9]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={slides[index].id}
                src={slides[index].image}
                alt={slides[index].name}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slides[index].id + '-text'}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <span className="text-[10px] font-medium tracking-[0.25em] text-white/50 uppercase">
                    {slides[index].material}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                    {slides[index].name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-white/70">
                    {slides[index].caption}
                  </p>
                  <Link
                    to={`/product/${slides[index].handle}`}
                    className="mt-4 inline-block text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase underline underline-offset-4 transition-colors hover:text-white"
                  >
                    View details
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between sm:mt-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => paginate(-1)}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 transition-colors hover:border-navy-900"
                aria-label="Previous slide"
              >
                <svg className="h-4 w-4 text-navy-600 group-hover:text-navy-900 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => paginate(1)}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 transition-colors hover:border-navy-900"
                aria-label="Next slide"
              >
                <svg className="h-4 w-4 text-navy-600 group-hover:text-navy-900 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <span className="font-body text-xs tracking-wider text-navy-400">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 sm:mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > index ? 1 : -1])}
                className={`h-[2px] transition-all duration-500 ${
                  i === index ? 'w-8 bg-navy-900' : 'w-4 bg-navy-200'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
