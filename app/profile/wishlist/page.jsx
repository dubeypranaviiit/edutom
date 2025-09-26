// // // pages/wishlist.js
// // 'use client'
// // import { useState } from "react";
// // import WishlistTable from "@/components/pop/Wishlist";
// // import { assets } from "@/Assets/assets";

// // const initialItems = [
// //   {
// //     id: 1,
// //     title: "Best Books for SSC CGL, CPO & CHSL Exam",
// //     price: 1715,
// //     originalPrice: 2999,
// //     discount: "42%",
// //     image: '/acer.jpg',
// //     available: true,
// //   },
// //   {
// //     id: 2,
// //     title: "Acer Aspire 5 AMD Ryzen 5",
// //     price: 55990,
// //     originalPrice: 65000,
// //     discount: "13%",
// //     image: "/acer.jpg",
// //     available: false,
// //   },
// //   {
// //     id: 3,
// //     title: "Micromax 32 inch Smart Android TV",
// //     price: null,
// //     originalPrice: null,
// //     discount: null,
// //     image: "/micromax-tv.jpg",
// //     available: false,
// //   },
// // ];

// // export default function Wishlist() {
// //   const [wishlist, setWishlist] = useState(initialItems);
// //   const [removingId, setRemovingId] = useState(null);

// //   const confirmRemove = (id) => {
// //     setWishlist((prev) => prev.filter((item) => item.id !== id));
// //     setRemovingId(null);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-10 px-6 lg:px-20">
// //       <h1 className="text-2xl font-bold mb-6 text-gray-800">
// //         My Wishlist ({wishlist.length})
// //       </h1>
// //       <div className="space-y-4">
// //         {wishlist.map((item) => (
// //           <WishlistTable
// //             key={item.id}
// //             item={item}
// //             isRemoving={removingId === item.id}
// //             onRemove={setRemovingId}
// //             onConfirmRemove={confirmRemove}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import WishlistTable from '@/components/pop/Wishlist';
// import axios from 'axios';
// import { useUser } from '@clerk/nextjs';

// export default function Wishlist() {
//   const { user, isSignedIn } = useUser();
//   const clerkUserId = user?.id;

//   const [wishlist, setWishlist] = useState([]);
//   const [removingId, setRemovingId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const confirmRemove = async (id) => {
//     setWishlist((prev) => prev.filter((item) => item._id !== id && item.id !== id));
//     setRemovingId(null);

//     if (isSignedIn) {
//       try {
//         await axios.delete(`/api/wishlist/${id}`, {
//           data: { clerkUserId },
//         });
//       } catch (err) {
//         console.error("Error removing from DB", err);
//       }
//     } else {
//       const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
//       delete localWishlist[id];
//       localStorage.setItem('wishlist', JSON.stringify(localWishlist));
//     }
//   };

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       setLoading(true);
//       try {
//         if (isSignedIn) {
//           const res = await axios.get(`/api/wishlist/all`, {
//             params: { clerkUserId },
//           });
//           setWishlist(res.data.wishlist || []);
//         } else {
//           const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
//           const items = Object.keys(localWishlist)
//             .filter((key) => localWishlist[key])
//             .map((key) => ({
//               id: key,
//               title: 'Book #' + key,
//               image: '/book-cover.jpg',
//               price: 100,
//               originalPrice: 150,
//               discount: '33%',
//               available: true,
//             }));
//           setWishlist(items);
//         }
//       } catch (err) {
//         console.error("Failed to fetch wishlist", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, [isSignedIn, clerkUserId]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6 lg:px-20">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         My Wishlist ({wishlist.length})
//       </h1>

//       {loading ? (
//         <p>Loading wishlist...</p>
//       ) : wishlist.length === 0 ? (
//         <p className="text-gray-500">Your wishlist is empty.</p>
//       ) : (
//         <div className="space-y-4">
//           {wishlist.map((item) => (
//             <WishlistTable
//               key={item._id || item.id}
//               item={item}
//               isRemoving={removingId === (item._id || item.id)}
//               onRemove={setRemovingId}
//               onConfirmRemove={confirmRemove}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// 'use client';

// import { useEffect, useState } from 'react';
// import WishlistTable from '@/components/pop/Wishlist';
// import axios from 'axios';
// import { useUser } from '@clerk/nextjs';

// const page =()=> {
//   const { user, isSignedIn } = useUser();
//   const clerkUserId = user?.id;

//   const [wishlist, setWishlist] = useState([]);
//   const [removingId, setRemovingId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const confirmRemove = async (id) => {
//     setWishlist((prev) => prev.filter((item) => item._id !== id && item.id !== id));
//     setRemovingId(null);

//     if (isSignedIn) {
//       try {
//         await axios.delete(`/api/wishlist/${id}`, {
//           data: { clerkUserId },
//         });
//       } catch (err) {
//         console.error('Error removing from DB', err);
//       }
//     } else {
//       const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
//       delete localWishlist[id];
//       localStorage.setItem('wishlist', JSON.stringify(localWishlist));
//     }
//   };

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       setLoading(true);
//       try {
//         if (isSignedIn) {
//           const res = await axios.get(`/api/wishlist/all`, {
//             params: { clerkUserId },
//           });
//           setWishlist(res.data.wishlist || []);
//         } else {
//           const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
//           const items = Object.keys(localWishlist)
//             .filter((key) => localWishlist[key])
//             .map((key) => ({
//               id: key,
//               productId: key,
//               type: 'book',
//               title: 'Book #' + key,
//               image: '/book-cover.jpg',
//               price: 100,
//               originalPrice: 150,
//               finalPrice: 100,
//               discount: '33%',
//               available: true,
//             }));
//           setWishlist(items);
//         }
//       } catch (err) {
//         console.error('Failed to fetch wishlist', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, [isSignedIn, clerkUserId]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6 lg:px-20">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         My Wishlist ({wishlist.length})
//       </h1>

//       {loading ? (
//         <p>Loading wishlist...</p>
//       ) : wishlist.length === 0 ? (
//         <p className="text-gray-500">Your wishlist is empty.</p>
//       ) : (
//         <div className="space-y-4">
//           {wishlist.map((item) => (
//             <WishlistTable
//               key={item._id || item.id}
//               item={item}
//               isRemoving={removingId === (item._id || item.id)}
//               onRemove={setRemovingId}
//               onConfirmRemove={confirmRemove}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// export default page;
"use client"
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useWishlistStore } from "@/store/wishlistStore";
import WishlistTable from "@/components/pop/Wishlist";

const WishlistPage = () => {
  const { user, isSignedIn } = useUser();
  const clerkUserId = user?.id;

  const { wishlist, loading, fetchWishlist, toggleWishlist } = useWishlistStore();

  useEffect(() => {
    if (clerkUserId) fetchWishlist(clerkUserId);
  }, [clerkUserId]);

  const handleToggle = (itemId, type) => {
    toggleWishlist(itemId, type, clerkUserId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 lg:px-20">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        My Wishlist ({wishlist.length})
      </h1>

      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <WishlistTable
              key={item._id || item.id}
              item={item}
              onConfirmRemove={() => handleToggle(item._id || item.id, item.book ? "book" : "ebook")}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

