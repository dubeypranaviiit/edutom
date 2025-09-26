import { create } from "zustand";
import axios from "axios";

export const useWishlistStore = create((set) => ({
  wishlist: [],
  loading: false,
  error: null,

  fetchWishlist: async (clerkUserId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/wishlist/all", { params: { clerkUserId } });
      set({ wishlist: res.data.wishlist || [], loading: false });
    } catch (err) {
      console.error(err);
      set({ error: err, loading: false });
    }
  },

  toggleWishlist: async (productId, type, clerkUserId) => {
    try {
      const res = await axios.post(`/api/wishlist/${productId}`, { clerkUserId, type });

      set((state) => {
        const { status, item, itemId } = res.data;

        if (status === "added") {
          return { wishlist: [...state.wishlist, item] };
        } else if (status === "removed") {
          return {
            wishlist: state.wishlist.filter(
              (w) => (w._id || w.id) !== itemId
            ),
          };
        }
        return {};
      });

      return res.data;
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  },

  removeFromWishlist: async (itemId, clerkUserId) => {
    try {
      await axios.delete(`/api/wishlist/${itemId}`, { data: { clerkUserId } });
      set((state) => ({
        wishlist: state.wishlist.filter((w) => (w._id || w.id) !== itemId),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));
