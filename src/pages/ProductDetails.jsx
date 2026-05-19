import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import products from '../data/products'

export default function ProductDetails() {
  const { handle } = useParams()
  const product = products.find((p) => p.handle === handle)

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream-light">
        <p className="text-sm text-navy-400">Product not found</p>
        <Link
          to="/collection"
          className="mt-4 text-xs tracking-[0.2em] text-navy-600 underline uppercase"
        >
          Back to collection
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 sm:pt-28 lg:pt-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/collection"
            className="group inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.2em] text-navy-400 uppercase transition-colors hover:text-navy-900"
          >
            <svg className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
            Back to collection
          </Link>
        </motion.div>

        {/* main layout */}
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="aspect-[4/5] overflow-hidden bg-navy-100"
          >
            <img
              src={product.images?.[0] || product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-[10px] font-medium tracking-[0.25em] text-navy-500 uppercase">
              {product.category}
            </span>
            <h1 className="mt-3 font-heading text-3xl font-bold text-navy-900 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-navy-400">{product.material}</p>

            <div className="mt-6 h-[1px] w-12 bg-red-500" />

            <p className="mt-6 text-sm leading-relaxed text-navy-600 sm:text-base">
              {product.description}
            </p>

            <div className="mt-8">
              <span className="font-heading text-3xl font-bold text-red-600">
                ${product.price}
              </span>
              <p className="mt-1 text-[10px] tracking-[0.2em] text-navy-400 uppercase">
                Free shipping worldwide
              </p>
            </div>

            {/* details */}
            <div className="mt-10 space-y-3">
              {product.details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-3 text-xs text-navy-500"
                >
                  <span className="h-[1px] w-3 bg-navy-300" />
                  {detail}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <span className="inline-block border border-navy-300 px-8 py-3.5 font-body text-[11px] font-medium tracking-[0.2em] text-navy-700 uppercase transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white">
                Inquire about this piece
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
