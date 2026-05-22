import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/shopify'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const itemAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function mapProduct(node) {
  const variant = node.variants?.edges?.[0]?.node
  const image = node.images?.edges?.[0]?.node
  return {
    id: node.id,
    handle: node.handle,
    name: node.title,
    material: node.description?.slice(0, 60) || '',
    price: node.priceRange.minVariantPrice.amount,
    image: image?.url || null,
    caption: image?.altText || node.title,
    variantId: variant?.id || '',
  }
}

export default function Collection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      const { data, error: err } = await getProducts(50)
      if (cancelled) return
      if (err) {
        setError(err)
        setLoading(false)
        return
      }
      const mapped = (data?.products?.edges || []).map((e) => mapProduct(e.node))
      setProducts(mapped)
      setLoading(false)
    }
    fetchData()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="min-h-screen bg-cream-light pt-32 pb-24 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <span className="text-[10px] font-medium tracking-[0.25em] text-navy-500 uppercase">
            All works
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold text-navy-900 sm:text-5xl lg:text-6xl">
            The Collection
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-navy-400 sm:text-base">
            Every piece is made to order in limited batches. Browse the full
            range of ISZA ceramics — from sculptural vases to everyday
            drinkware.
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-300 border-t-navy-900" />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-32">
            <p className="text-sm text-red-500">Failed to load collection. Please try again later.</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="flex items-center justify-center py-32">
            <p className="text-sm text-navy-400">No products available at this time.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product) => (
              <motion.article key={product.id} variants={itemAnim}>
                <Link
                  to={`/product/${product.handle}`}
                  className="group block"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-navy-100">
                    <motion.img
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6 }}
                      src={product.image}
                      alt={product.name}
                      onError={(e) => { e.target.style.display = 'none' }}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-5 flex items-start justify-between">
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-navy-900 transition-colors group-hover:text-red-500">
                        {product.name}
                      </h2>
                      <p className="mt-0.5 text-xs tracking-wide text-navy-400">
                        {product.material}
                      </p>
                    </div>
                    <span className="font-body text-sm font-medium text-red-600">
                      ${parseFloat(product.price).toFixed(0)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-navy-300 line-clamp-2">
                    {product.caption}
                  </p>

                  <div className="mt-4 h-[1px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full" />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
