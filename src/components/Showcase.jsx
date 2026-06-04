import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/shopify'

const premiumEase = [0.16, 1, 0.3, 1]

function imgFallback(e) {
  e.target.style.display = 'none'
}

export default function Showcase() {
  const [products, setProducts] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      const { data } = await getProducts(4)
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 0, 1])

  if (products.length === 0) return null

  return (
    <section ref={sectionRef} className="overflow-hidden bg-cream-light py-24 sm:py-32 lg:py-44">
      <motion.div
        style={{ opacity: titleOpacity }}
        className="mx-auto mb-16 max-w-7xl px-8 sm:mb-20 lg:mb-24"
      >
        <span className="text-[10px] font-medium tracking-[0.3em] text-navy-400 uppercase">
          Curated selection
        </span>
        <h2 className="mt-4 font-heading text-4xl font-bold text-navy-900 sm:text-5xl lg:text-6xl">
          The Showroom
        </h2>
      </motion.div>

      <div className="overflow-x-auto px-8 pb-8 scrollbar-none">
        <div
          className="flex gap-16 sm:gap-20 lg:gap-28"
          style={{ minWidth: 'max-content' }}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: i * 0.15, ease: premiumEase }}
              className="group w-[280px] shrink-0 sm:w-[340px] lg:w-[420px]"
            >
              <Link to={`/product/${product.handle}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-navy-100">
                  <motion.img
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 1.2, ease: premiumEase }}
                    src={product.image}
                    alt={product.name}
                    onError={imgFallback}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
                </div>

                <div className="mt-6 flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-navy-900 transition-colors duration-700 group-hover:text-red-500">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 text-xs tracking-wide text-navy-400">
                      {product.material}
                    </p>
                  </div>
                  <span className="font-body text-base font-medium text-navy-700">
                    ${parseFloat(product.price).toFixed(0)}
                  </span>
                </div>

                <div className="mt-5 h-px w-0 bg-red-500/60 transition-all duration-1000 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}
