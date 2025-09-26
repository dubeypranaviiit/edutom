// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import BookCard from './BookCard';
// import CategoryFilter from './CategoryFilter';
// import { books, bookcategories } from '@/Assets/data';

// const BookHome = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("/api/book"); // adjust this path if needed
//         if (res.data.success) {
//           setAllBooks(res.data.books);
//         }
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchBooks();
//   }, []);
//   const filteredBooks =
//     selectedCategory === 'All'
//       ? books.slice(0, 15)
//       : books.filter((book) => book.category === selectedCategory).slice(0, 20);

//   return (
//     <main className="p-6 bg-white text-black flex flex-col">
//     <div className="flex justify-center items-center mb-6">
//   <h1 className="text-3xl font-bold text-center">Explore All Books</h1>
// </div>


// <CategoryFilter
//   selected={selectedCategory}
//   onChange={setSelectedCategory}
//   categories={["All", ...bookcategories]}
// />

//       {filteredBooks.length === 0 ? (
//         <p className="text-gray-600 mt-10 text-center">No books in this category.</p>
//       ) : (
//         <>
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {filteredBooks.map((book) => (
//               <BookCard key={book.id} book={book} />
//             ))}
//           </div>

//           {/* Explore More Button */}
//           {selectedCategory === 'All' && (
//             <div className="mt-10 text-center">
//               <Link
//                 href="/all-books"
//                 className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition"
//               >
//                 Explore More
//               </Link>
//             </div>
//           )}
//         </>
//       )}
//     </main>
//   );
// };

// export default BookHome;
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BookCard from "./BookCard";
import CategoryFilter from "./CategoryFilter";
import { bookCategories } from "@/Assets/data";
import { useBookStore } from "@/store/bookStore";

const BookHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Zustand store
  const fetchBooks = useBookStore((s) => s.fetchBooks);
  const books = useBookStore((s) => s.books);

  useEffect(() => {
    fetchBooks(); // fetch all books once
  }, [fetchBooks]);

  const filteredBooks = [...books]
    .filter((b) => b.isPublished) // only published books
    .filter((b) => selectedCategory === "All" || b.category === selectedCategory)
    .slice(0, selectedCategory === "All" ? 15 : 20); // limit display

  return (
    <main className="p-6 bg-white text-black flex flex-col">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Explore All Books</h1>
      </div>

      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
        categories={["All", ...bookCategories]}
      />

      {filteredBooks.length === 0 ? (
        <p className="text-gray-600 mt-10 text-center">
          No books in this category.
        </p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          {selectedCategory === "All" && (
            <div className="mt-10 text-center">
              <Link
                href="/all-books"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition"
              >
                Explore More
              </Link>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default BookHome;
