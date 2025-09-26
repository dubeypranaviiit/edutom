import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      // Clerk user ID
      clerkId: null,
      setClerkId: (id) => set({ clerkId: id }),
      clearClerkId: () => set({ clerkId: null }),

      // Cart
      cart: [],
      addToCart: (item) =>
        set((state) => ({ cart: [...state.cart, item] })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i._id !== id),
        })),
      clearCart: () => set({ cart: [] }),

      // Wishlist
      wishlist: [],
      addToWishlist: (item) =>
        set((state) => ({ wishlist: [...state.wishlist, item] })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((i) => i._id !== id),
        })),
    }),
    { name: "app-storage" } 
  )
);
