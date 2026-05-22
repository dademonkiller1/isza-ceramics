import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const atelierImg =
  'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1200&q=85&auto=format&fit=crop'
const clayImg =
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=85&auto=format&fit=crop'
const kilnImg =
  'https://images.unsplash.com/photo-1610701596007-11502861dc1c?w=1200&q=85&auto=format&fit=crop'

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36">
      {/* hero */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="text-[10px] font-medium tracking-[0.25em] text-navy-500 uppercase">
            About
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-navy-900 sm:text-5xl lg:text-6xl">
            The art of
            <br />
            <span className="italic text-red-500">slow ceramics</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-24"
        >
          <div className="aspect-[4/5] overflow-hidden bg-navy-100">
            <img
              src={atelierImg}
              alt="ISZA atelier workspace"
              onError={(e) => { e.target.style.display = 'none' }}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-heading text-2xl font-semibold text-navy-900 sm:text-3xl">
              Rooted in tradition
            </h2>
            <div className="mt-4 h-[2px] w-10 bg-red-500" />
            <p className="mt-6 text-sm leading-relaxed text-navy-600 sm:text-base">
              ISZA was born in a small Kyoto atelier, where master ceramicist
              Hiro Tanaka spent two decades refining his craft before opening
              his own studio. The name — inspired by the Japanese concept of
              <em> isho</em> (intention) and <em>za</em> (place) — reflects our
              belief that every object carries the energy of the space and
              attention in which it was made.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-600 sm:text-base">
              We work exclusively with natural clays sourced from three ancient
              deposits across Japan, each chosen for its unique mineral
              composition. Our glazes are formulated in-house using local
              volcanic ash, iron oxides, and feldspar — materials that have
              been used by Japanese potters for over a thousand years.
            </p>
          </div>
        </motion.div>
      </div>

      {/* process */}
      <div className="mx-auto mt-28 max-w-7xl px-6 sm:mt-36 sm:px-8 lg:mt-48 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-[10px] font-medium tracking-[0.25em] text-navy-500 uppercase">
            Process
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
            From clay to form
          </h2>
        </motion.div>

        <div className="grid gap-12 sm:gap-16 lg:grid-cols-3">
          {[
            {
              img: clayImg,
              title: 'Clay & Composition',
              text: 'We blend three Japanese clays — Kibushi, Gairome, and Kibushi-gairome — to achieve the ideal plasticity and strength. Each batch is aged for six months before touching the wheel.',
            },
            {
              img: kilnImg,
              title: 'Hand & Wheel',
              text: 'Every piece is thrown or hand-coiled by a single artisan from start to finish. No molds, no casting — just hands, water, and decades of muscle memory.',
            },
            {
              img: atelierImg,
              title: 'Fire & Finish',
              text: 'Bisque-fired at 900°C, glazed by hand, then fired again at 1280°C in a gas reduction kiln. The firing alone takes 36 hours, followed by a slow 24-hour cool.',
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-navy-100">
                <img
                  src={step.img}
                  alt={step.title}
                  onError={(e) => { e.target.style.display = 'none' }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* philosophy */}
      <div className="mx-auto mt-28 max-w-7xl px-6 sm:mt-36 sm:px-8 lg:mt-48 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="border-t border-navy-100 pt-16 text-center sm:pt-20"
        >
          <h2 className="font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
            Made to last
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-navy-500 sm:text-base">
            We believe in objects that outlive their owners. Every ISZA piece is
            built to be used, cherished, and passed down — growing more
            beautiful with each scratch, stain, and story.
          </p>

          <Link to="/collection">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-block border border-navy-300 px-8 py-3.5 font-body text-[11px] font-medium tracking-[0.2em] text-navy-700 uppercase transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white"
            >
              View the collection
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
