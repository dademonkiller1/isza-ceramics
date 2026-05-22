import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../api/shopify'
import useCartStore from '../store/cart'

function mapProduct(node) {
  const variant = node.variants?.edges?.[0]?.node
  const images = (node.images?.edges || []).map((e) => e.node.url)
  return {
    id: node.id,
    handle: node.handle,
    name: node.title,
    description: node.description || '',
    price: node.priceRange.minVariantPrice.amount,
    images,
    variantId: variant?.id || '',
    availableForSale: node.availableForSale,
  }
}

export default function ProductDetails() {
  const { handle } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    async function fetchData() {
      const { data, error: err } = await getProduct(handle)
      if (cancelled) return
      if (err || !data?.productByHandle) {
        setError(err || 'Product not found')
        setLoading(false)
        return
      }
      setProduct(mapProduct(data.productByHandle))
      setLoading(false)
    }
    fetchData()
    return () => { cancelled = true }
  }, [handle])

  function handleAddToCart() {
    if (!product || !product.variantId) return
    addItem({
      variantId: product.variantId,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || null,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-light">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-300 border-t-navy-900" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream-light">
        <p className="text-sm text-navy-400">{error || 'Product not found'}</p>
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

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="aspect-[4/5] overflow-hidden bg-navy-100"
          >
            <img
              src={product.images?.[0] || null}
              alt={product.name}
              onError={(e) => { e.target.style.display = 'none' }}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="font-heading text-3xl font-bold text-navy-900 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 h-[1px] w-12 bg-red-500" />

            <p className="mt-6 text-sm leading-relaxed text-navy-600 sm:text-base">
              {product.description}
            </p>

            <div className="mt-8">
              <span className="font-heading text-3xl font-bold text-red-600">
                ${parseFloat(product.price).toFixed(0)}
              </span>
              <p className="mt-1 text-[10px] tracking-[0.2em] text-navy-400 uppercase">
                Free shipping worldwide
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              {product.availableForSale === false ? (
                <span className="inline-block border border-navy-300 px-8 py-3.5 font-body text-[11px] font-medium tracking-[0.2em] text-navy-400 uppercase">
                  Sold Out
                </span>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`inline-block border px-8 py-3.5 font-body text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                    added
                      ? 'border-green-700 bg-green-700 text-white'
                      : 'border-navy-900 bg-navy-900 text-white hover:bg-white hover:text-navy-900'
                  }`}
                >
                  {added ? 'Added to Cart' : 'Add to Cart'}
                </motion.button>
              )}
              <button
                onClick={openCart}
                className="ml-3 text-[10px] tracking-[0.2em] text-navy-400 underline uppercase transition-colors hover:text-navy-900"
              >
                View Cart
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
