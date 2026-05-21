import { create } from 'zustand'

const useCartStore = create((set) => ({
  items: [],
  isOpen: false,
  checkoutLoading: false,
  checkoutError: null,

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.variantId === product.variantId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === product.variantId
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        }
      }
      return { items: [...state.items, { ...product, quantity: 1 }] }
    }),

  removeItem: (variantId) =>
    set((state) => ({
      items: state.items.filter((i) => i.variantId !== variantId),
    })),

  updateQuantity: (variantId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.variantId !== variantId)
          : state.items.map((i) =>
              i.variantId === variantId ? { ...i, quantity } : i,
            ),
    })),

  clearCart: () => set({ items: [], checkoutError: null }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  openCart: () => set({ isOpen: true }),

  closeCart: () => set({ isOpen: false }),

  setCheckoutLoading: (loading) => set({ checkoutLoading: loading }),

  setCheckoutError: (error) => set({ checkoutError: error }),
}))

export default useCartStore
