// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import BookCard from '../BookCard';
// import CategoryFilter from '../CategoryFilter';
// import { Ebooks, bookcategories } from '@/Assets/data';

// const EBookHome = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   // Remove duplicates if 'All' is already included in bookCategories
//   const uniqueCategories = bookcategories.includes('All')
//     ? bookCategories
//     : ['All', ...bookcategories];

//   const filteredBooks =
//     selectedCategory === 'All'
//       ? Ebooks.slice(0, 15)
//       : Ebooks.filter((book) => book.category === selectedCategory).slice(0, 20);

//   return (
//     <main className="p-6 bg-white text-black flex flex-col">
//       {/* Title */}
//       <div className="flex justify-center items-center mb-6">
//         <h1 className="text-3xl font-bold text-center">Explore All e-Books</h1>
//       </div>

//       {/* Filter by Category */}
//       <CategoryFilter
//         selected={selectedCategory}
//         onChange={setSelectedCategory}
//         categories={uniqueCategories}
//       />

//       {/* Book Grid */}
//       {filteredBooks.length === 0 ? (
//         <p className="text-gray-600 mt-10 text-center">No e-Books found in this category.</p>
//       ) : (
//         <>
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {filteredBooks.map((book) => (
//               <BookCard key={book.id} book={book} />
//             ))}
//           </div>

//           {/* Explore More */}
//           {selectedCategory === 'All' && (
//             <div className="mt-10 text-center">
//               <Link
//                 href="/all-books"
//                 className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-semibold transition"
//               >
//                 Explore More e-Books
//               </Link>
//             </div>
//           )}
//         </>
//       )}
//     </main>
//   );
// };

// export default EBookHome;
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import axios from 'axios';
// import EBookCard from './EBookCard';
// import CategoryFilter from '../CategoryFilter';
// import { bookcategories } from '@/Assets/data';
// import Loader from '@/components/loader/Loader';

// const EBookHome = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [ebooks, setEbooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Unique Categories
//   const uniqueCategories = bookcategories.includes('All')
//     ? bookcategories
//     : ['All', ...bookcategories];


//   useEffect(() => {
//     const fetchEbooks = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('/api/ebook'); // adjust if using App Router
//         setEbooks(response.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load eBooks. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEbooks();
//   }, []);

//   // Filtered List
//   // const filteredBooks =
//   //   selectedCategory === 'All'
//   //     ? ebooks.slice(0, 15)
//   //     : ebooks.filter((book) => book.category === selectedCategory).slice(0, 20);
// const filteredBooks =
//   Array.isArray(ebooks) && selectedCategory === 'All'
//     ? ebooks.slice(0, 15)
//     : Array.isArray(ebooks)
//     ? ebooks.filter((book) => book.category === selectedCategory).slice(0, 20)
//     : [];
//   return (
//     <main className="p-6 bg-white text-black flex flex-col">
//       {/* Title */}
//       <div className="flex justify-center items-center mb-6">
//         <h1 className="text-3xl font-bold text-center">Explore All e-Books</h1>
//       </div>

//       {/* Filter by Category */}
//       <CategoryFilter
//         selected={selectedCategory}
//         onChange={setSelectedCategory}
//         categories={uniqueCategories}
//       />

//       {/* Content */}
//       {loading ? (
       
//           <div className="text-center text-gray-500 mt-10">
//     <Loader />
//   </div>
//       ) : error ? (
//         <p className="text-red-500 text-center mt-10">{error}</p>
//       ) : filteredBooks.length === 0 ? (
//         <p className="text-gray-600 mt-10 text-center">
//           No e-Books found in this category.
//         </p>
//       ) : (
//         <>
//           {/* Book Grid */}
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {filteredBooks.map((book) => (
//               <EBookCard key={book._id} book={book} />
//             ))}
//           </div>

//           {/* Explore More */}
//           {selectedCategory === 'All' && (
//             <div className="mt-10 text-center">
//               <Link
//                 href="/e-book"
//                 className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-semibold transition"
//               >
//                 Explore More e-Books
//               </Link>
//             </div>
//           )}
//         </>
//       )}
//     </main>
//   );
// };

// export default EBookHome;
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EBookCard from "./EBookCard";
import CategoryFilter from "../CategoryFilter";
import { bookCategories } from "@/Assets/data";
import Loader from "@/components/loader/Loader";
import { useEbookStore } from "@/store/ebookStore";

const EBookHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchEbooks = useEbookStore((s) => s.fetchEbooks);
  const ebooks = useEbookStore((s) => s.ebooks);

  useEffect(() => {
    fetchEbooks(); // fetch once
  }, [fetchEbooks]);

  const filteredBooks = [...ebooks]
    .filter((b) => b.isPublished !== false) // optional if you have isPublished
    .filter((b) => selectedCategory === "All" || b.category === selectedCategory)
    .slice(0, selectedCategory === "All" ? 15 : 20);

  const uniqueCategories = bookCategories.includes("All")
    ? bookCategories
    : ["All", ...bookCategories];

  if (!ebooks) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <Loader />
      </div>
    );
  }

  return (
    <main className="p-6 bg-white text-black flex flex-col">
      {/* Title */}
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Explore All e-Books</h1>
      </div>

      {/* Filter by Category */}
      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
        categories={uniqueCategories}
      />

      {/* Content */}
      {ebooks.length === 0 ? (
        <p className="text-gray-600 mt-10 text-center">
          No e-Books found in this category.
        </p>
      ) : (
        <>
          {/* Book Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <EBookCard key={book._id} book={book} />
            ))}
          </div>

          {/* Explore More */}
          {selectedCategory === "All" && (
            <div className="mt-10 text-center">
              <Link
                href="/e-book"
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-semibold transition"
              >
                Explore More e-Books
              </Link>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default EBookHome;
