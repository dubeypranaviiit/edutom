"use client";
import { create } from "zustand";
import axios from "axios";

export const useEbookStore = create((set, get) => ({
  ebooks: [],

  // Fetch all eBooks once
  fetchEbooks: async () => {
    try {
      const res = await axios.get("/api/ebook");
      if (res.data.success) {
        set({ ebooks: res.data.books || res.data }); // depending on API response
      }
    } catch (err) {
      console.error("Failed to fetch eBooks", err);
    }
  },

  // Optional helper to get all eBooks by category
  getEbooksByCategory: (category = "All", limit = 15) => {
    const { ebooks } = get();
    let filtered = ebooks;
    if (category !== "All") {
      filtered = ebooks.filter((b) => b.category === category);
    }
    return filtered.slice(0, limit);
  },
}));
