// // stores/userStore.js
// import { create } from "zustand";
// import axios from "axios";

// export const useUserStore = create((set) => ({
//   user: null,
//   addresses: [],
//   loadingUser: false,
//   loadingAddresses: false,
//   error: null,
//   fetchUser: async (clerkUserId) => {
//     try {
//       set({ loadingUser: true, error: null });
//       const res = await axios.get(`/api/users?clerkUserId=${clerkUserId}`);
//       set({ user: res.data, loadingUser: false });
//     } catch (err) {
//       set({
//         error: err.response?.data?.error || "Failed to fetch user",
//         loadingUser: false,
//       });
//     }
//   },
//   updateUser: async (data) => {
//     try {
//       set({ loadingUser: true, error: null });
//       const res = await axios.put("/api/users", data);
//       set({ user: res.data.user, loadingUser: false });
//     } catch (err) {
//       set({
//         error: err.response?.data?.error || "Failed to update user",
//         loadingUser: false,
//       });
//     }
//   },
//   fetchAddresses: async (userId) => {
//     try {
//       set({ loadingAddresses: true });
//       const { data } = await axios.get(`/api/addresses?userId=${userId}`);
//       set({ addresses: data, loadingAddresses: false });
//     } catch (err) {
//       set({ error: "Failed to fetch addresses", loadingAddresses: false });
//     }
//   },
//   saveAddress: async (address, editingId = null) => {
//     try {
//       if (editingId) {
//         await axios.put("/api/addresses", { ...address, _id: editingId });
//       } else {
//         await axios.post("/api/addresses", address);
//       }
     
//       if (address.userId) {
//         const { data } = await axios.get(`/api/addresses?userId=${address.userId}`);
//         set({ addresses: data });
//       }
//     } catch (err) {
//       set({ error: err.response?.data?.message || "Failed to save address" });
//     }
//   },

//   deleteAddress: async (id, userId) => {
//     try {
//       await axios.delete(`/api/addresses?id=${id}&userId=${userId}`);
//       const { data } = await axios.get(`/api/addresses?userId=${userId}`);
//       set({ addresses: data });
//     } catch (err) {
//       set({ error: "Failed to delete address" });
//     }
//   },

//   clearUserData: () => set({ user: null, addresses: [], error: null }),
// }));
"use client";

import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // fetch user from backend
  fetchUser: async (clerkUserId) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/api/users?clerkUserId=${clerkUserId}`);
      set({ user: res.data.user, loading: false });
    } catch (err) {
      console.error("Error fetching user:", err);
      set({ error: err, loading: false });
    }
  },

  // update user in backend
  updateUser: async (clerkUserId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put("/api/users", {
        clerkUserId,
        ...updatedData,
      });
      set({ user: res.data.user, loading: false });
      return res.data.user;
    } catch (err) {
      console.error("Error updating user:", err);
      set({ error: err, loading: false });
    }
  },
}));
