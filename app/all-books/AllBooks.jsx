// "use client";

// import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import BookCard from "@/components/book/BookCard";
// import BookFilterSidebar from "@/components/book/all-book/BookSidebarFilter";
// import { books as allBooks } from "@/Assets/data";

// const AllBooks = () => {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   const [filteredBooks, setFilteredBooks] = useState([]);

//   const filters = {
//     category: searchParams.getAll("category"),
//     price: searchParams.get("price") || "",
//     author: searchParams.getAll("author"),
//     rating: searchParams.get("rating") || "",
//     condition: searchParams.get("condition") || "",
//     delivery: searchParams.getAll("delivery"),
//   };

//   useEffect(() => {
//     let filtered = allBooks;

//     if (filters.category.length) {
//       filtered = filtered.filter((b) => filters.category.includes(b.category));
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

//     setFilteredBooks(filtered);
//   }, [searchParams]);

//   return (
//     <div className="bg-white min-h-screen py-8 mt-5">
//       <div className="max-w-[1400px]  flex flex-col lg:flex-row gap-5">
//         {/* Sidebar */}
//         <div className="w-full lg:w-1/4 bg-white p-2 rounded-md shadow-md">
//           <BookFilterSidebar />
//         </div>

//         {/* Results */}
//         <div className="w-full lg:w-3/4">
//           {filteredBooks.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {filteredBooks.map((book, i) => (
//                 <BookCard key={i} book={book} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-500 py-12 text-lg">
//               No books match your filters.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllBooks;
// "use client";

// import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import BookCard from "@/components/book/BookCard";
// import BookFilterSidebar from "@/components/book/all-book/BookSidebarFilter";
// import axios from "axios";

// const AllBooks = () => {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const router = useRouter();

//   const [allBooks, setAllBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);

//   const filters = {
//     category: searchParams.getAll("category"),
//     price: searchParams.get("price") || "",
//     author: searchParams.getAll("author"),
//     rating: searchParams.get("rating") || "",
//     condition: searchParams.get("condition") || "",
//     delivery: searchParams.getAll("delivery"),
//   };

//   // Fetch all books from API on mount
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

//   // Apply filters whenever books or URL search params change
//   useEffect(() => {
//     let filtered = [...allBooks];

//     if (filters.category.length) {
//       filtered = filtered.filter((b) => filters.category.includes(b.category));
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

//     setFilteredBooks(filtered);
//   }, [allBooks, searchParams]);

//   return (
//     <div className="bg-white min-h-screen py-8 mt-5">
//       <div className="max-w-[1400px]  flex flex-col lg:flex-row gap-5 mx-auto">
//         {/* Sidebar */}
//         <div className="w-full lg:w-1/4 bg-white p-2 rounded-md shadow-md">
//           <BookFilterSidebar />
//         </div>

//         {/* Results */}
//         <div className="w-full lg:w-3/4">
//           {filteredBooks.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {filteredBooks.map((book, i) => (
//                 <BookCard key={i} book={book} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-500 py-12 text-lg">
//               No books match your filters.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllBooks;
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/book/BookCard";
import BookFilterSidebar from "@/components/book/all-book/BookSidebarFilter";
import { useBookStore } from "@/store/bookStore";

const AllBooks = () => {
  const searchParams = useSearchParams();
  const books = useBookStore((s) => s.books);
  const fetchBooks = useBookStore((s) => s.fetchBooks);

  const [filteredBooks, setFilteredBooks] = useState([]);

  const filters = {
    category: searchParams.getAll("category"),
    price: searchParams.get("price") || "",
    author: searchParams.getAll("author"),
    rating: searchParams.get("rating") || "",
    condition: searchParams.get("condition") || "",
    delivery: searchParams.getAll("delivery"),
  };

  // Fetch books only if not already in store
  useEffect(() => {
    if (!books || books.length === 0) fetchBooks();
  }, [books, fetchBooks]);

  // Apply filters whenever books or URL search params change
  useEffect(() => {
    if (!books) return;

    let filtered = [...books];

    if (filters.category.length) {
      filtered = filtered.filter((b) => filters.category.includes(b.category));
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
      if (filters.price === "Under ₹200")
        filtered = filtered.filter((b) => price(b) < 200);
      if (filters.price === "₹200 - ₹500")
        filtered = filtered.filter(
          (b) => price(b) >= 200 && price(b) <= 500
        );
      if (filters.price === "₹500 - ₹1000")
        filtered = filtered.filter(
          (b) => price(b) > 500 && price(b) <= 1000
        );
      if (filters.price === "Over ₹1000")
        filtered = filtered.filter((b) => price(b) > 1000);
    }

    setFilteredBooks(filtered);
  }, [books, searchParams]);

  return (
    <div className="bg-white min-h-screen py-8 mt-5">
      <div className="max-w-[1400px] flex flex-col lg:flex-row gap-5 mx-auto">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white p-2 rounded-md shadow-md">
          <BookFilterSidebar />
        </div>

        {/* Results */}
        <div className="w-full lg:w-3/4">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12 text-lg">
              No books match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
