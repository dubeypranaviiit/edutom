// import { create } from "zustand";
// import axios from "axios";

// export const useBookStore = create((set, get) => ({
//   books: [],
//   ebooks: [],
//   loading: false,
//   error: null,

//   fetchBooks: async () => {
//     if (get().books.length > 0) return; 
//     set({ loading: true, error: null });
//     try {
//       const res = await axios.get("/api/book");
//       if (res.data.success) {
//         set({ books: res.data.books });
//       }
//     } catch (err) {
//       set({ error: "Failed to fetch books" });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   fetchEbooks: async () => {
//     if (get().ebooks.length > 0) return;
//     set({ loading: true, error: null });
//     try {
//       const res = await axios.get("/api/ebook");
//       set({ ebooks: res.data });
//     } catch (err) {
//       set({ error: "Failed to fetch ebooks" });
//     } finally {
//       set({ loading: false });
//     }
//   },


//   getTopBook: () => {
//     const books = get().books;
//     if (books.length === 0) return null;

//     const maxRating = Math.max(...books.map((b) => b.rating || 0));
//     return books.filter((b) => b.rating === maxRating);
//   },

//   getNewBooks: () => {
//     const books = get().books;
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//     return books.filter((b) => new Date(b.createdAt) >= oneMonthAgo);
//   },
// }));
"use client";
import { create } from "zustand";
import axios from "axios";

export const useBookStore = create((set, get) => ({
  books: [],

  // fetch all books once
  fetchBooks: async () => {
    try {
      const res = await axios.get("/api/book");
      if (res.data.success) {
        set({ books: res.data.books });
      }
    } catch (err) {
      console.error("Failed to fetch books", err);
    }
  },

  // get top-rated books, optionally by category
  getTopRated: (limit = 8, category = "All") => {
    const { books } = get();
    return books
      .filter((b) => (category === "All" ? true : b.category === category))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  },

  // get new arrival books, optionally by category
  getNewArrivals: (limit = 8, category = "All") => {
    const { books } = get();
    return books
      .filter((b) => (category === "All" ? true : b.category === category))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  },
}));
