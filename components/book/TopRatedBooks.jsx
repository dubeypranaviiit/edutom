// // 'use client';

// // import { useState } from 'react';
// // import Link from 'next/link';
// // import BookCard from './BookCard';
// // import CategoryFilter from './CategoryFilter';
// // import { books, bookcategories } from '@/Assets/data';

// // const TopRatedBooks = () => {
// //   const [selectedCategory, setSelectedCategory] = useState('All');

// //   // Filter by rating and category
// //   const filteredBooks = books
// //     .filter((book) => book.rating >= 4.5)
// //     .filter((book) =>
// //       selectedCategory === 'All' ? true : book.category === selectedCategory
// //     )
// //     .slice(0, 8); // Show first 8 books

// //   return (
// //     <section className="p-6 bg-white text-black flex flex-col mt-12">
// //       <div className="flex justify-center items-center mb-6">
// //         <h2 className="text-3xl font-bold text-center text-black">Top Rated Books</h2>
// //       </div>

// //       {/* Category Filter */}
// //       <CategoryFilter
// //         selected={selectedCategory}
// //         onChange={setSelectedCategory}
// //         categories={['All', ...bookcategories.filter((cat) => cat !== 'All')]}
// //       />

// //       {filteredBooks.length === 0 ? (
// //         <p className="text-gray-600 text-center mt-6">No top rated books in this category.</p>
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
// //                 href="/top-rated"
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

// // export default TopRatedBooks;\
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import axios from 'axios';
// import BookCard from './BookCard';
// import CategoryFilter from './CategoryFilter';
// import { bookcategories } from '@/Assets/data';

// const TopRatedBooks = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [topRatedBooks, setTopRatedBooks] = useState([]);

//   useEffect(() => {
//     const fetchTopBooks = async () => {
//       try {
//         const res = await axios.get('/api/book/topbooks');
//         if (res.data.success) {
//           setTopRatedBooks(res.data.books);
//         }
//       } catch (error) {
//         console.error('Failed to fetch top-rated books:', error);
//       }
//     };

//     fetchTopBooks();
//   }, []);

//   // Filter by category
//   const filteredBooks = topRatedBooks
//     .filter((book) =>
//       selectedCategory === 'All' ? true : book.category === selectedCategory
//     )
//     .slice(0, 8); // Show first 8 books

//   return (
//     <section className="p-6 bg-white text-black flex flex-col mt-12">
//       <div className="flex justify-center items-center mb-6">
//         <h2 className="text-3xl font-bold text-center text-black">Top Rated Books</h2>
//       </div>

//       {/* Category Filter */}
//       <CategoryFilter
//         selected={selectedCategory}
//         onChange={setSelectedCategory}
//         categories={['All', ...bookcategories.filter((cat) => cat !== 'All')]}
//       />

//       {filteredBooks.length === 0 ? (
//         <p className="text-gray-600 text-center mt-6">No top rated books in this category.</p>
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
//                 href="/top-rated"
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

// export default TopRatedBooks;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "./BookCard";
import CategoryFilter from "./CategoryFilter";
import { bookCategories } from "@/Assets/data";
import { useBookStore } from "@/store/bookStore";

const TopRatedBooks = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const fetchBooks = useBookStore((s) => s.fetchBooks);
  const books = useBookStore((s) => s.books);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredBooks = [...books]
    .filter((b) => selectedCategory === "All" || b.category === selectedCategory)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <section className="p-6 bg-white text-black flex flex-col mt-12">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-3xl font-bold text-center text-black">Top Rated Books</h2>
      </div>

      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
        categories={["All", ...bookCategories.filter((cat) => cat !== "All")]}
      />

      {filteredBooks.length === 0 ? (
        <p className="text-gray-600 text-center mt-6">No top rated books in this category.</p>
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
                href="/top-rated"
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

export default TopRatedBooks;
