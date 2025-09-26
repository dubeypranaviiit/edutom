// // // import { create } from "zustand";
// // // import axios from "axios";

// // // export const useCartStore = create((set, get) => ({
// // //   cart: [],
// // //   fetchCart: async (userId) => {
// // //     try {
// // //       const res = await axios.get("/api/cart", { params: { clerkUserId: userId } });
// // //       set({ cart: res.data.cartItems || [] });
// // //     } catch (error) {
// // //       console.error("Failed to fetch cart:", error);
// // //     }
// // //   },
// // //   updateQuantity: async (itemId, userId, quantity) => {
// // //     try {
// // //       const res = await axios.put(`/api/cart/${itemId}`, { userId, quantity });
// // //       set({
// // //         cart: get().cart.map((i) => (i._id === itemId ? { ...i, quantity: res.data.quantity } : i)),
// // //       });
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   },
// // //   removeItem: async (itemId, userId) => {
// // //     try {
// // //       await axios.delete(`/api/cart/${itemId}`, { params: { userId } });
// // //       set({ cart: get().cart.filter((i) => i._id !== itemId) });
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   },
// // //   saveForLater: async (itemId, userId) => {
// // //     try {
// // //       const res = await axios.patch(`/api/cart/${itemId}/save`, {
// // //         userId,
// // //         savedForLater: true,
// // //       });
// // //       set({
// // //         cart: get().cart.filter((i) => i._id !== itemId),
// // //       });
// // //       return res.data; // returns the saved item
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //   },
// // // }));
// // import { create } from "zustand";
// // import axios from "axios";

// // export const useCartStore = create((set, get) => ({
// //   cart: [],

// //   // fetchCart: async (userId) => {
// //   //   try {
// //   //     const { data } = await axios.get(`/api/cart?userId=${userId}`);
// //   //     set({ cart: data });
// //   //   } catch (err) {
// //   //     console.error(err);
// //   //   }
// //   // },
// //   fetchCart: async (userId) => {
// //   try {
// //     const { data } = await axios.get(`/api/cart?userId=${userId}`);
// //     set({ cart: data.cartItems || [] }); // use data.cartItems
// //   } catch (err) {
// //     console.error(err);
// //   }
// // },

// //   updateQuantity: async (itemId, userId, quantity) => {
// //     try {
// //       const { data } = await axios.put(`/api/cart/${itemId}`, { userId, quantity });
// //       set((state) => ({
// //         cart: state.cart.map((item) => (item._id === data._id ? data : item)),
// //       }));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   },

// //   removeItem: async (itemId, userId) => {
// //     try {
// //       await axios.delete(`/api/cart/${itemId}?userId=${userId}`);
// //       set((state) => ({ cart: state.cart.filter((item) => item._id !== itemId) }));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   },

// //   saveForLater: async (itemId, userId, isEbook) => {
// //     try {
// //       const { data } = await axios.patch(`/api/cart/${itemId}/save`, {
// //         userId,
// //         savedForLater: true,
// //         isEbook,
// //       });

// //       set((state) => ({
// //         cart: state.cart.map((item) => (item._id === data._id ? data : item)),
// //       }));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   },
// // }));
// import { create } from "zustand";
// import axios from "axios";

// export const useCartStore = create((set, get) => ({
//   cart: [],

//   fetchCart: async (userId) => {
//     try {
//       const { data } = await axios.get(`/api/cart?userId=${userId}`);
//       // Always set a new array reference to trigger re-render
//       set({ cart: [...data] });
//     } catch (err) {
//       console.error(err);
//     }
//   },

//   updateQuantity: async (itemId, userId, quantity) => {
//     try {
//       const { data } = await axios.put(`/api/cart/${itemId}`, { userId, quantity });
//       set((state) => ({
//         cart: state.cart.map((item) => (item._id === data._id ? { ...data } : item)),
//       }));
//     } catch (err) {
//       console.error(err);
//     }
//   },

//   removeItem: async (itemId, userId) => {
//     try {
//       await axios.delete(`/api/cart/${itemId}?userId=${userId}`);
//       set((state) => ({
//         cart: state.cart.filter((item) => item._id !== itemId),
//       }));
//     } catch (err) {
//       console.error(err);
//     }
//   },

//   saveForLater: async (itemId, userId, isEbook) => {
//     try {
//       const { data } = await axios.patch(`/api/cart/${itemId}/save`, {
//         userId,
//         savedForLater: true,
//         isEbook,
//       });
//       set((state) => ({
//         cart: state.cart.map((item) => (item._id === data._id ? { ...data } : item)),
//       }));
//     } catch (err) {
//       console.error(err);
//     }
//   },
// }));
import { create } from 'zustand';
import axios from 'axios';

export const useCartStore = create((set, get) => ({
  cart: [],

  fetchCart: async (userId) => {
    try {
      const { data } = await axios.get(`/api/cart?userId=${userId}`);
      set({ cart: [...data] }); // trigger re-render
    } catch (err) {
      console.error(err);
    }
  },

updateQuantity: async (itemId, userId, quantity) => {
  try {
    const { data } = await axios.put(`/api/cart/${itemId}`, { userId, quantity });
    set((state) => ({
      cart: state.cart.map((item) =>
        item._id === itemId ? { ...item, quantity: data.quantity } : item
      ),
    }));
  } catch (err) {
    console.error(err);
  }
},

  removeItem: async (itemId, userId) => {
    try {
      await axios.delete(`/api/cart/${itemId}?userId=${userId}`);
      set((state) => ({
        cart: state.cart.filter((item) => item._id !== itemId),
      }));
    } catch (err) {
      console.error(err);
    }
  },

  saveForLater: async (itemId, userId, isEbook) => {
    try {
      const { data } = await axios.patch(`/api/cart/${itemId}/save`, {
        userId,
        savedForLater: true,
        isEbook,
      });
      set((state) => ({
        cart: state.cart.map((item) => (item._id === data._id ? { ...data } : item)),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));
