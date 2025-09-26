// // 'use client';

// // import { useState } from 'react';
// // import Link from 'next/link';
// // import BookCard from './BookCard';
// // import CategoryFilter from './CategoryFilter';
// // import { books, bookcategories } from '@/Assets/data';

// // const NewArrivalBooks = () => {
// //   const [selectedCategory, setSelectedCategory] = useState('All');

// //   // Sort by dateAdded (most recent first)
// //   const sortedBooks = [...books].sort((a, b) => {
// //     const dateA = new Date(a.dateAdded);
// //     const dateB = new Date(b.dateAdded);
// //     return dateB - dateA;
// //   });

// //   // Filter by category
// //   const filteredBooks =
// //     selectedCategory === 'All'
// //       ? sortedBooks.slice(0, 8)
// //       : sortedBooks
// //           .filter((book) => book.category === selectedCategory)
// //           .slice(0, 8);

// //   return (
// //     <section className="p-6 bg-white text-black flex flex-col mt-12">
// //       <div className="flex justify-center items-center mb-6">
// //         <h2 className="text-3xl font-bold text-center text-blue-700">New Arrivals</h2>
// //       </div>

// //       {/* Category Filter */}
// //       <CategoryFilter
// //         selected={selectedCategory}
// //         onChange={setSelectedCategory}
// //         categories={['All', ...bookcategories.filter((cat) => cat !== 'All')]}
// //       />

// //       {filteredBooks.length === 0 ? (
// //         <p className="text-gray-600 text-center mt-6">No new books in this category.</p>
// //       ) : (
// //         <>
// //           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
// //             {filteredBooks.map((book) => (
// //               <BookCard key={book.id} book={book} />
// //             ))}
// //           </div>

// //           {/* Explore More Button */}
// //           {selectedCategory === 'All' && (
// //             <div className="mt-10 text-center">
// //               <Link
// //                 href="/new-arrivals"
// //                 className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition"
// //               >
// //                 Explore More
// //               </Link>
// //             </div>
// //           )}
// //         </>
// //       )}
// //     </section>
// //   );
// // };

// // export default NewArrivalBooks;
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import axios from 'axios';
// import BookCard from './BookCard';
// import CategoryFilter from './CategoryFilter';
// import { bookcategories } from '@/Assets/data';

// const NewArrivalBooks = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [newBooks, setNewBooks] = useState([]);

//   useEffect(() => {
//     const fetchNewBooks = async () => {
//       try {
//         const res = await axios.get('/api/book/new-arrivals');
//         if (res.data.success) {
//           setNewBooks(res.data.books);
//         }
//       } catch (error) {
//         console.error('Failed to fetch new arrivals:', error);
//       }
//     };

//     fetchNewBooks();
//   }, []);

//   // Filter by category
//   const filteredBooks =
//     selectedCategory === 'All'
//       ? newBooks.slice(0, 8)
//       : newBooks.filter((book) => book.category === selectedCategory).slice(0, 8);

//   return (
//     <section className="p-6 bg-white text-black flex flex-col mt-12">
//       <div className="flex justify-center items-center mb-6">
//         <h2 className="text-3xl font-bold text-center text-blue-700">New Arrivals</h2>
//       </div>

//       {/* Category Filter */}
//       <CategoryFilter
//         selected={selectedCategory}
//         onChange={setSelectedCategory}
//         categories={['All', ...bookcategories.filter((cat) => cat !== 'All')]}
//       />

//       {filteredBooks.length === 0 ? (
//         <p className="text-gray-600 text-center mt-6">No new books in this category.</p>
//       ) : (
//         <>
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {filteredBooks.map((book) => (
//               <BookCard key={book._id} book={book} />
//             ))}
//           </div>

//           {/* Explore More Button */}
//           {selectedCategory === 'All' && (
//             <div className="mt-10 text-center">
//               <Link
//                 href="/new-arrivals"
//                 className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition"
//               >
//                 Explore More
//               </Link>
//             </div>
//           )}
//         </>
//       )}
//     </section>
//   );
// };

// export default NewArrivalBooks;
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "./BookCard";
import CategoryFilter from "./CategoryFilter";
import { bookCategories } from "@/Assets/data";
import { useBookStore } from "@/store/bookStore";

const NewArrivalBooks = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const fetchBooks = useBookStore((s) => s.fetchBooks);
  const books = useBookStore((s) => s.books);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredBooks = [...books]
    .filter((b) => selectedCategory === "All" || b.category === selectedCategory)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <section className="p-6 bg-white text-black flex flex-col mt-12">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">New Arrivals</h2>
      </div>

      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
        categories={["All", ...bookCategories.filter((cat) => cat !== "All")]}
      />

      {filteredBooks.length === 0 ? (
        <p className="text-gray-600 text-center mt-6">No new books in this category.</p>
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
                href="/new-arrivals"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition"
              >
                Explore More
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NewArrivalBooks;
