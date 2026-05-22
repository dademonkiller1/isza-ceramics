import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/shopify'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function imgFallback(e) {
  e.target.style.display = 'none'
}

export default function Showcase() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      const { data } = await getProducts(6)
      if (cancelled || !data?.products?.edges) return
      const mapped = data.products.edges.map((e) => {
        const node = e.node
        const img = node.images?.edges?.[0]?.node
        return {
          id: node.id,
          handle: node.handle,
          name: node.title,
          material: node.description?.slice(0, 60) || '',
          price: node.priceRange.minVariantPrice.amount,
          image: img?.url || null,
        }
      })
      setProducts(mapped)
    }
    fetchData()
    return () => { cancelled = true }
  }, [])

  if (products.length === 0) return null

  return (
    <section id="showroom" className="bg-cream-light py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="text-[10px] font-medium tracking-[0.25em] text-navy-500 uppercase">
            Curated selection
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-navy-900 sm:text-4xl lg:text-5xl">
            The Showroom
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <motion.article key={product.id} variants={itemAnim}>
              <Link
                to={`/product/${product.handle}`}
                className="group block"
              >
                <div className="aspect-[3/4] overflow-hidden bg-navy-100">
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6 }}
                    src={product.image}
                    alt={product.name}
                    onError={imgFallback}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-navy-900 transition-colors group-hover:text-red-500">
                      {product.name}
                    </h3>
                    <p className="mt-0.5 text-xs tracking-wide text-navy-400">
                      {product.material}
                    </p>
                  </div>
                  <span className="font-body text-sm font-medium text-red-600">
                    ${parseFloat(product.price).toFixed(0)}
                  </span>
                </div>

                <div className="mt-3 h-[1px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
