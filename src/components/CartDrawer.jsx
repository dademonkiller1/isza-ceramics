import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/cart'
import { createCart } from '../api/shopify'

export default function CartDrawer() {
  const items = useCartStore((s) => s.items)
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const checkoutLoading = useCartStore((s) => s.checkoutLoading)
  const setCheckoutLoading = useCartStore((s) => s.setCheckoutLoading)
  const checkoutError = useCartStore((s) => s.checkoutError)
  const setCheckoutError = useCartStore((s) => s.setCheckoutError)
  const clearCart = useCartStore((s) => s.clearCart)

  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  )

  async function handleCheckout() {
    if (items.length === 0) return

    setCheckoutLoading(true)
    setCheckoutError(null)

    const lines = items.map((item) => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    }))

    const { data, error } = await createCart(lines)

    if (error || data?.cartCreate?.userErrors?.length) {
      const msg =
        data?.cartCreate?.userErrors?.[0]?.message || error || 'Checkout failed'
      setCheckoutError(msg)
      setCheckoutLoading(false)
      return
    }

    const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-black/40"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-navy-100 px-6 py-5">
              <h2 className="font-heading text-lg font-semibold text-navy-900">
                Cart
              </h2>
              <button
                onClick={closeCart}
                className="text-navy-400 transition-colors hover:text-navy-900"
                aria-label="Close cart"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-navy-400">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <ul className="space-y-5">
                    {items.map((item) => (
                      <li
                        key={item.variantId}
                        className="flex gap-4"
                      >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              onError={(e) => { e.target.style.display = 'none' }}
                              className="h-20 w-20 shrink-0 rounded object-cover bg-navy-100"
                            />
                          )}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-navy-900">
                              {item.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-navy-400">
                              ${parseFloat(item.price).toFixed(0)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.variantId, item.quantity - 1)
                                }
                                className="flex h-6 w-6 items-center justify-center rounded border border-navy-200 text-xs text-navy-600 transition-colors hover:border-navy-900 hover:text-navy-900"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-medium text-navy-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.variantId, item.quantity + 1)
                                }
                                className="flex h-6 w-6 items-center justify-center rounded border border-navy-200 text-xs text-navy-600 transition-colors hover:border-navy-900 hover:text-navy-900"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="text-[10px] tracking-[0.15em] text-navy-400 underline uppercase transition-colors hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-navy-100 px-6 py-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-navy-900">Total</span>
                    <span className="font-heading text-xl font-bold text-navy-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {checkoutError && (
                    <p className="mt-2 text-xs text-red-500">{checkoutError}</p>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="mt-4 w-full border border-navy-900 bg-navy-900 px-6 py-3.5 font-body text-[11px] font-medium tracking-[0.2em] text-white uppercase transition-colors hover:bg-white hover:text-navy-900 disabled:opacity-50"
                  >
                    {checkoutLoading ? 'Redirecting...' : 'Proceed to Checkout'}
                  </motion.button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
