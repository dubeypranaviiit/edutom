// // "use client";

// // import { useSearchParams, usePathname, useRouter } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import BookSidebarCat from "@/components/book/all-book/BookSidebarCat";
// // import BookCard from "@/components/book/BookCard"; // or EBookCard
// // import { books as allBooks } from "@/Assets/data";

// // const Page = ({ params }) => {
// //   const { slug } = params;

// //   const searchParams = useSearchParams();
// //   const pathname = usePathname();
// //   const router = useRouter();

// //   const [filteredBooks, setFilteredBooks] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   const filters = {
// //     category: [slug], // category from URL
// //     price: searchParams.get("price") || "",
// //     author: searchParams.getAll("author"),
// //     rating: searchParams.get("rating") || "",
// //     condition: searchParams.get("condition") || "",
// //     delivery: searchParams.getAll("delivery"),
// //   };

// //   useEffect(() => {
// //     let filtered = allBooks || [];

// //     // Filter by category from slug
// //     if (filters.category.length) {
// //       filtered = filtered.filter((b) =>
// //         filters.category.includes(b.category.toLowerCase())
// //       );
// //     }

// //     // Author
// //     if (filters.author.length) {
// //       filtered = filtered.filter((b) => filters.author.includes(b.author));
// //     }

// //     // Condition
// //     if (filters.condition) {
// //       filtered = filtered.filter((b) => b.condition === filters.condition);
// //     }

// //     // Rating
// //     if (filters.rating) {
// //       filtered = filtered.filter((b) => b.rating >= parseInt(filters.rating));
// //     }

// //     // Price
// //     if (filters.price) {
// //       const price = (b) => b.price;
// //       if (filters.price === "Under ₹200") filtered = filtered.filter((b) => price(b) < 200);
// //       if (filters.price === "₹200 - ₹500") filtered = filtered.filter((b) => price(b) >= 200 && price(b) <= 500);
// //       if (filters.price === "₹500 - ₹1000") filtered = filtered.filter((b) => price(b) > 500 && price(b) <= 1000);
// //       if (filters.price === "Over ₹1000") filtered = filtered.filter((b) => price(b) > 1000);
// //     }

// //     // ✅ Search by title or author
// //     if (searchTerm.trim() !== "") {
// //       const lowerSearch = searchTerm.toLowerCase();
// //       filtered = filtered.filter(
// //         (b) =>
// //           b.title.toLowerCase().includes(lowerSearch) ||
// //           b.author.toLowerCase().includes(lowerSearch)
// //       );
// //     }

// //     setFilteredBooks(filtered);
// //   }, [searchParams, slug, searchTerm]);

// //   return (
// //     <div className="bg-white text-black min-h-screen py-8 mt-5">
// //       <div className="max-w-[1400px] flex flex-col lg:flex-row gap-2">
// //         {/* Sidebar */}
// //         <div className="w-full lg:w-1/4 bg-white p-2 rounded-md shadow-md">
// //           <BookSidebarCat />
// //         </div>

// //         {/* Content */}
// //         <div className="w-full lg:w-3/4">
// //           {/* Category Heading */}
// //           <h1 className="text-2xl font-bold capitalize mb-4">
// //             Category: {slug.replace("-", " ")}
// //           </h1>

// //           {/* Search Bar */}
// //           <div className="mb-6">
// //             <input
// //               type="text"
// //               placeholder="Search by book title or author..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           {/* Book Grid */}
// //           {filteredBooks.length > 0 ? (
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //               {filteredBooks.map((book, i) => (
// //                 <BookCard key={i} book={book} />
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center text-gray-500 py-12 text-lg">
// //               No books found for this category or search term.
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Page;
// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import BookSidebarCat from "@/components/book/all-book/BookSidebarCat";
// import BookCard from "@/components/book/BookCard";
// import axios from "axios";

// const Page = ({ params }) => {
//   const { slug } = params;

//   const searchParams = useSearchParams();
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [allBooks, setAllBooks] = useState([]);

//   const filters = {
//     category: [slug], // from dynamic route
//     price: searchParams.get("price") || "",
//     author: searchParams.getAll("author"),
//     rating: searchParams.get("rating") || "",
//     condition: searchParams.get("condition") || "",
//     delivery: searchParams.getAll("delivery"),
//   };

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("/api/book/");
//         if (res.data.success) {
//           setAllBooks(res.data.books);
//         }
//       } catch (err) {
//         console.error("Error fetching books:", err);
//       }
//     };

//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     let filtered = allBooks;

//     if (filters.category.length) {
//       filtered = filtered.filter((b) =>
//         filters.category.includes(b.category.toLowerCase())
//       );
//     }

//     if (filters.author.length) {
//       filtered = filtered.filter((b) => filters.author.includes(b.author));
//     }

//     if (filters.condition) {
//       filtered = filtered.filter((b) => b.condition === filters.condition);
//     }

//     if (filters.rating) {
//       filtered = filtered.filter((b) => b.rating >= parseInt(filters.rating));
//     }

//     if (filters.price) {
//       const price = (b) => b.price;
//       if (filters.price === "Under ₹200") filtered = filtered.filter((b) => price(b) < 200);
//       if (filters.price === "₹200 - ₹500") filtered = filtered.filter((b) => price(b) >= 200 && price(b) <= 500);
//       if (filters.price === "₹500 - ₹1000") filtered = filtered.filter((b) => price(b) > 500 && price(b) <= 1000);
//       if (filters.price === "Over ₹1000") filtered = filtered.filter((b) => price(b) > 1000);
//     }

//     if (searchTerm.trim() !== "") {
//       const lowerSearch = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (b) =>
//           b.title.toLowerCase().includes(lowerSearch) ||
//           b.author.toLowerCase().includes(lowerSearch)
//       );
//     }

//     setFilteredBooks(filtered);
//   }, [allBooks, searchParams, slug, searchTerm]);

//   return (
//     <div className="bg-white text-black min-h-screen py-8 mt-5">
//       <div className="max-w-[1400px] flex flex-col lg:flex-row gap-2">
//         <div className="w-full lg:w-1/4 bg-white p-2 rounded-md shadow-md">
//           <BookSidebarCat />
//         </div>

//         <div className="w-full lg:w-3/4">
//           <h1 className="text-2xl font-bold capitalize mb-4">
//             Category: {slug.replace("-", " ")}
//           </h1>

//           <div className="mb-6">
//             <input
//               type="text"
//               placeholder="Search by book title or author..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {filteredBooks.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {filteredBooks.map((book, i) => (
//                 <BookCard key={i} book={book} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-500 py-12 text-lg">
//               No books found for this category or search term.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookSidebarCat from "@/components/book/all-book/BookSidebarCat";
import BookCard from "@/components/book/BookCard";
import { useBookStore } from "@/store/bookStore"; // Zustand store

const Page = ({ params }) => {
  const { slug } = params;
  const searchParams = useSearchParams();

  const books = useBookStore((s) => s.books);
  const fetchBooks = useBookStore((s) => s.fetchBooks);

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filters = {
    category: [slug],
    price: searchParams.get("price") || "",
    author: searchParams.getAll("author"),
    rating: searchParams.get("rating") || "",
    condition: searchParams.get("condition") || "",
    delivery: searchParams.getAll("delivery"),
  };

  // Fetch books only if not already in Zustand store
  useEffect(() => {
    if (!books || books.length === 0) fetchBooks();
  }, [books, fetchBooks]);

  // Filter books
  useEffect(() => {
    if (!books) return;

    let filtered = [...books];

    if (filters.category.length) {
      filtered = filtered.filter((b) =>
        filters.category.includes(b.category.toLowerCase())
      );
    }

    if (filters.author.length) {
      filtered = filtered.filter((b) => filters.author.includes(b.author));
    }

    if (filters.condition) {
      filtered = filtered.filter((b) => b.condition === filters.condition);
    }

    if (filters.rating) {
      filtered = filtered.filter((b) => b.rating >= parseInt(filters.rating));
    }

    if (filters.price) {
      const price = (b) => b.price;
      if (filters.price === "Under ₹200") filtered = filtered.filter((b) => price(b) < 200);
      if (filters.price === "₹200 - ₹500") filtered = filtered.filter((b) => price(b) >= 200 && price(b) <= 500);
      if (filters.price === "₹500 - ₹1000") filtered = filtered.filter((b) => price(b) > 500 && price(b) <= 1000);
      if (filters.price === "Over ₹1000") filtered = filtered.filter((b) => price(b) > 1000);
    }

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(lowerSearch) ||
          b.author.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchParams, slug, searchTerm]);

  return (
    <div className="bg-white text-black min-h-screen py-8 mt-5">
      <div className="max-w-[1400px] flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-1/4 bg-white p-2 rounded-md shadow-md">
          <BookSidebarCat />
        </div>

        <div className="w-full lg:w-3/4">
          <h1 className="text-2xl font-bold capitalize mb-4">
            Category: {slug.replace("-", " ")}
          </h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by book title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12 text-lg">
              No books found for this category or search term.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
