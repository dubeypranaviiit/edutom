// // 'use client';
// // import axios from 'axios';
// // import { useState, useEffect } from 'react';
// // import Image from 'next/image';
// // import { FaHeart, FaStar } from 'react-icons/fa';
// // import { useUser } from '@clerk/nextjs'; 
// // import Link from 'next/link';
// // const BookCard = ({ book }) => {
// //   const {
// //     id,
// //     title,
// //     author,
// //     coverImage,
// //     price,
// //     discountPercent,
// //     rating,
// //     reviews,
// //   } = book;

// //   const finalPrice = (price - price * (discountPercent / 100)).toFixed(2);
// //   const formattedPrice = new Intl.NumberFormat("en-IN", {
// //     style: "currency",
// //     currency: "INR",
// //   }).format(price);
// //   const formattedFinalPrice = new Intl.NumberFormat("en-IN", {
// //     style: "currency",
// //     currency: "INR",
// //   }).format(finalPrice);

// //   const [isWishlisted, setIsWishlisted] = useState(false);
// //   const [isAddedToCart, setIsAddedToCart] = useState(false);
// //   const { user } = useUser(); // Clerk user
// //   const clerkUserId = user?.id;

// //  useEffect(() => {
// //   const fetchWishlist = async () => {
// //     if (clerkUserId) {
// //       try {
// //         const res = await axios.get(`/api/wishlist/${id}`, {
// //           params: { clerkUserId }
// //         });
// //         setIsWishlisted(res.data.isWishlisted);
// //       } catch (error) {
// //         console.error("Failed to fetch wishlist status", error);
// //       }
// //     } else {
// //       const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
// //       setIsWishlisted(wishlist[id] || false);
// //     }

// //     const cart = JSON.parse(localStorage.getItem('cart') || '{}');
// //     setIsAddedToCart(cart[id] || false);
// //   };

// //   fetchWishlist();
// // }, [id, clerkUserId]);

// // const handleWishlist = async () => {
// //   if (clerkUserId) {
// //     try {
// //       const res = await axios.post(`/api/wishlist/${id}`, {
// //         clerkUserId,
// //         // Add this if you're also supporting ebooks
// //       });
// //       setIsWishlisted(res.data.status === 'added');
// //     } catch (error) {
// //       console.error("Failed to update wishlist", error);
// //     }
// //   } else {
// //     const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
// //     const updatedStatus = !isWishlisted;
// //     wishlist[id] = updatedStatus;
// //     localStorage.setItem('wishlist', JSON.stringify(wishlist));
// //     setIsWishlisted(updatedStatus);
// //   }
// // };

// //   const handleAddToCart = () => {
// //     const cart = JSON.parse(localStorage.getItem('cart') || '{}');
// //     const updatedStatus = !isAddedToCart;
// //     cart[id] = updatedStatus;
// //     localStorage.setItem('cart', JSON.stringify(cart));
// //     setIsAddedToCart(updatedStatus);
// //   };

// //   return (
// //     <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col h-[400px]">
// //       {/* Book Image */}
// //       <div className="relative w-full h-64">
// //         <Image
// //           src={coverImage}
// //           alt={title}
// //           fill
// //           className="object-cover rounded-t-xl"
// //           sizes="(max-width: 768px) 100vw, 400px"
// //         />
// //         {discountPercent > 0 && (
// //           <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
// //             {discountPercent}% OFF
// //           </div>
// //         )}
// //         <button
// //           onClick={handleWishlist}
// //           className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm"
// //           aria-label="Toggle wishlist"
// //         >
// //           <FaHeart
// //             className={`text-xl transition-colors duration-200 ${
// //               isWishlisted ? 'text-red-500' : 'text-gray-400'
// //             }`}
// //           />
// //         </button>
// //       </div>

// //       {/* Book Details */}
// //       <div className="p-4 flex-1 flex flex-col">
// //         <h3
// //           className="text-base font-semibold text-gray-900 truncate mb-1"
// //           title={title}
// //         >
// //           {title}
// //         </h3>
// //         <p className="text-gray-600 text-sm mb-2 italic">By {author}</p>

// //         {/* Ratings */}
// //         <div className="flex items-center mb-2">
// //           <div className="flex text-yellow-400">
// //             {[...Array(5)].map((_, index) => (
// //               <FaStar
// //                 key={index}
// //                 className={index < rating ? '' : 'text-gray-300'}
// //               />
// //             ))}
// //           </div>
// //           <span className="ml-2 text-gray-600 text-xs">({reviews} reviews)</span>
// //         </div>

// //         {/* Pricing */}
// //         <div className="flex items-baseline gap-2 mb-4">
// //           <span className="text-gray-400 line-through text-sm">{formattedPrice}</span>
// //           <span className="text-lg font-bold text-green-600">{formattedFinalPrice}</span>
// //         </div>

// //         {/* Cart Button */}
// //  <div className="mt-auto">
// //   <Link
// //     href={`/books/${book._id}`}
// //     className={`block text-center w-full py-2.5 rounded-lg font-semibold transition duration-200 ${
// //       isAddedToCart ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
// //     } text-white`}
// //   >
// //     {isAddedToCart ? 'Browse Cart & Checkout' : 'Buy This Book Now'}
// //   </Link>
// // </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookCard;

// 'use client';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { FaHeart, FaStar } from 'react-icons/fa';
// import { useUser } from '@clerk/nextjs'; 
// import Link from 'next/link';

// const BookCard = ({ book }) => {
//   const {
//     _id,
//     title,
//     author,
//     coverImage,
//     price,
//     discountPercent,
//     rating,
//     reviews,
//   } = book;
  
// const id = _id;
//   console.log(book);
//  console.log(`id of book:`,id);
//   const finalPrice = (price - price * (discountPercent / 100)).toFixed(2);
//   const formattedPrice = new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//   }).format(price);
//   const formattedFinalPrice = new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//   }).format(finalPrice);

//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isAddedToCart, setIsAddedToCart] = useState(false);
//   const { user } = useUser(); // Clerk user
//   const clerkUserId = user?.id;

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (clerkUserId) {
//         try {
//           const res = await axios.get(`/api/wishlist/${id}`, {
//             params: { clerkUserId }
//           });
//           setIsWishlisted(res.data.isWishlisted);
//         } catch (error) {
//           console.error("Failed to fetch wishlist status", error);
//         }
//       } else {
//         const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
//         setIsWishlisted(wishlist[id] || false);
//       }

//       const cart = JSON.parse(localStorage.getItem('cart') || '{}');
//       setIsAddedToCart(cart[id] || false);
//     };

//     fetchWishlist();
//   }, [id, clerkUserId]);

//   const handleWishlist = async () => {
//     if (clerkUserId) {
//       try {
//         const res = await axios.post(`/api/wishlist/${id}`, {
//           clerkUserId,
//         });
//         setIsWishlisted(res.data.status === 'added');
//       } catch (error) {
//         console.error("Failed to update wishlist", error);
//       }
//     } else {
//       const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
//       const updatedStatus = !isWishlisted;
//       wishlist[id] = updatedStatus;
//       localStorage.setItem('wishlist', JSON.stringify(wishlist));
//       setIsWishlisted(updatedStatus);
//     }
//   };

//   const handleAddToCart = () => {
//     const cart = JSON.parse(localStorage.getItem('cart') || '{}');
//     const updatedStatus = !isAddedToCart;
//     cart[id] = updatedStatus;
//     localStorage.setItem('cart', JSON.stringify(cart));
//     setIsAddedToCart(updatedStatus);
//   };

//   return (
//     <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col h-[400px]">
//       {/* Book Image */}
//       <div className="relative w-full h-64">
//         <Image
//           src={coverImage}
//           alt={title}
//           fill
//           className="object-cover rounded-t-xl"
//           sizes="(max-width: 768px) 100vw, 400px"
//         />
//         {discountPercent > 0 && (
//           <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
//             {discountPercent}% OFF
//           </div>
//         )}
//         <button
//           onClick={handleWishlist}
//           className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm"
//           aria-label="Toggle wishlist"
//         >
//           <FaHeart
//             className={`text-xl transition-colors duration-200 ${
//               isWishlisted ? 'text-red-500' : 'text-gray-400'
//             }`}
//           />
//         </button>
//       </div>

//       {/* Book Details */}
//       <div className="p-4 flex-1 flex flex-col">
//         <h3
//           className="text-base font-semibold text-gray-900 truncate mb-1"
//           title={title}
//         >
//           {title}
//         </h3>
//         <p className="text-gray-600 text-sm mb-2 italic">By {author}</p>

//         {/* Ratings */}
//         <div className="flex items-center mb-2">
//           <div className="flex text-yellow-400">
//             {[...Array(5)].map((_, index) => (
//               <FaStar
//                 key={index}
//                 className={index < rating ? '' : 'text-gray-300'}
//               />
//             ))}
//           </div>
//           <span className="ml-2 text-gray-600 text-xs">({reviews} reviews)</span>
//         </div>

//         {/* Pricing */}
//         <div className="flex items-baseline gap-2 mb-4">
//           <span className="text-gray-400 line-through text-sm">{formattedPrice}</span>
//           <span className="text-lg font-bold text-green-600">{formattedFinalPrice}</span>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-auto flex gap-2">
//           <button
//             onClick={handleAddToCart}
//             className={`w-1/2 py-2.5 rounded-lg font-semibold text-white transition duration-200 ${
//               isAddedToCart ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
//           </button>

//           <Link
//             href={`/books/${id}`}
//             className="w-1/2 py-2.5 text-center rounded-lg font-semibold bg-gray-700 hover:bg-gray-800 text-white transition duration-200"
//           >
//             View Book
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;
'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const BookCard = ({ book }) => {
  const {
    _id,
    title,
    author,
    coverImage,
    price,
    discountPercent,
    rating,
    reviews,
  } = book;

  const id = _id;
  const finalPrice = (price - price * (discountPercent / 100)).toFixed(2);
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
  const formattedFinalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(finalPrice);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { user } = useUser(); // Clerk user
  const clerkUserId = user?.id;

  useEffect(() => {
    const fetchInitialState = async () => {
      if (clerkUserId) {
        try {
          const res = await axios.get(`/api/wishlist/${_id}?clerkUserId=${clerkUserId}&type=book`, {
            params: { clerkUserId },
          
          });
          setIsWishlisted(res.data.isWishlisted);
        } catch (error) {
          console.error('Wishlist check failed:', error);
        }

        // try {
        //   const res = await axios.get('/api/cart', {
        //     params: { clerkUserId },
        //   });
        //   const cartItems = res.data;
        //   const isInCart = cartItems.some(
        //     (item) => item.book?._id === id && !item.savedForLater
        //   );
        //   setIsAddedToCart(isInCart);
        // } catch (error) {
        //   console.error('Cart check failed:', error);
        // }
        try {
  const res = await axios.get('/api/cart', {
    params: { clerkUserId },
  });

  const cartItems = res.data.cartItems || []; 
  const isInCart = cartItems.some(
    (item) => item.book?._id === id && !item.savedForLater
  );
  setIsAddedToCart(isInCart);
} catch (error) {
  console.error('Cart check failed:', error);
}
      } else {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
        setIsWishlisted(wishlist[id] || false);

        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        setIsAddedToCart(cart[id] || false);
      }
    };

    fetchInitialState();
  }, [id, clerkUserId]);

  const handleWishlist = async () => {
    if (clerkUserId) {
      try {
        const res = await axios.post(`/api/wishlist/${id}`, {
          clerkUserId,        type: 'book',
        });
        setIsWishlisted(res.data.status === 'added');
      } catch (error) {
        console.error('Failed to update wishlist:', error);
      }
    } else {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
      const updatedStatus = !isWishlisted;
      wishlist[id] = updatedStatus;
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(updatedStatus);
    }
  };

  const handleAddToCart = async () => {
    if (clerkUserId) {
      try {
        const res = await axios.post('/api/cart', {
          clerkUserId,
          book: id,
          format: 'physical', 
          quantity: 1,
        });
        console.log('Added to cart:', res.data);
        setIsAddedToCart(true);
      } catch (err) {
        console.error('Add to cart failed:', err);
      }
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') || '{}');
      const updatedStatus = !isAddedToCart;
      cart[id] = updatedStatus;
      localStorage.setItem('cart', JSON.stringify(cart));
      setIsAddedToCart(updatedStatus);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col h-[400px]">
      {/* Book Image */}
      <div className="relative w-full h-64">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover rounded-t-xl"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
            {discountPercent}% OFF
          </div>
        )}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm"
          aria-label="Toggle wishlist"
        >
          <FaHeart
            className={`text-xl transition-colors duration-200 ${
              isWishlisted ? 'text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* Book Details */}
      <div className="p-4 flex-1 flex flex-col">
        <h3
          className="text-base font-semibold text-gray-900 truncate mb-1"
          title={title}
        >
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 italic">By {author}</p>

        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={index < rating ? '' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600 text-xs">({reviews} reviews)</span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-gray-400 line-through text-sm">{formattedPrice}</span>
          <span className="text-lg font-bold text-green-600">{formattedFinalPrice}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={handleAddToCart}
            className={`w-1/2 py-2.5 rounded-lg font-semibold text-white transition duration-200 ${
              isAddedToCart
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isAddedToCart ? 'In Cart' : 'Add to Cart'}
          </button>

          <Link
            href={`/books/${id}`}
            className="w-1/2 py-2.5 text-center rounded-lg font-semibold bg-gray-700 hover:bg-gray-800 text-white transition duration-200"
          >
            View Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
