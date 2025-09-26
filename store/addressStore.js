"use client";
import { create } from "zustand";
import axios from "axios";

export const useAddressStore = create((set) => ({
  addresses: [],
  loading: false,
  error: null,

  fetchAddresses: async (userId) => {
    if (!userId) return;
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`/api/addresses?userId=${userId}`);
      set({ addresses: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to load addresses", loading: false });
    }
  },

  addAddress: async (payload, userId) => {
    const { fetchAddresses } = useAddressStore.getState();
    await axios.post("/api/addresses", { ...payload, userId });
    await fetchAddresses(userId);
  },

 updateAddress: async (payload, userId) => {
  const { fetchAddresses } = useAddressStore.getState();
  await axios.put("/api/addresses", { ...payload, userId }); // include userId
  await fetchAddresses(userId);
},

  deleteAddress: async (id, userId) => {
    const { fetchAddresses } = useAddressStore.getState();
    await axios.delete(`/api/addresses?id=${id}&userId=${userId}`);
    await fetchAddresses(userId);
  },
}));
