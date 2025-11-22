import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        set((state) => {
          const existing = state.cart.find((i) => i.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { cart: [...state.cart, { ...product, qty: 1 }] };
        });
      },

      remove: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        })),

      updateQty: (id, qty) =>
        set((state) => ({
          cart: state.cart.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),

      clear: () => set({ cart: [] }),

      totalItems: () => get().cart.reduce((s, i) => s + i.qty, 0),
      totalPrice: () =>
        get()
          .cart.reduce((s, i) => s + i.price * i.qty, 0)
          .toFixed(2),
    }),
    {
      name: "cart-storage",
    }
  )
);
