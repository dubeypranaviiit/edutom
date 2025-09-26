// // 'use client';

// // import { useState, useEffect } from 'react';
// // import Image from 'next/image';
// // import { FaHeart, FaStar } from 'react-icons/fa';

// // const EBookCard = ({ book }) => {
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

// //   const [isWishlisted, setIsWishlisted] = useState(false);
// //   const [isAddedToLibrary, setIsAddedToLibrary] = useState(false);
// // const formattedPrice = new Intl.NumberFormat("en-IN", {
// //   style: "currency",
// //   currency: "INR",
// // }).format(price);

// // const formattedFinalPrice = new Intl.NumberFormat("en-IN", {
// //   style: "currency",
// //   currency: "INR",
// // }).format(finalPrice);
// //   useEffect(() => {
// //     if (typeof window !== 'undefined') {
// //       const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
// //       const library = JSON.parse(localStorage.getItem('library') || '{}');
// //       setIsWishlisted(wishlist[id] || false);
// //       setIsAddedToLibrary(library[id] || false);
// //     }
// //   }, [id]);

// //   const handleWishlist = () => {
// //     const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
// //     const updated = !isWishlisted;
// //     wishlist[id] = updated;
// //     localStorage.setItem('wishlist', JSON.stringify(wishlist));
// //     setIsWishlisted(updated);
// //   };

// //   const handleLibrary = () => {
// //     const library = JSON.parse(localStorage.getItem('library') || '{}');
// //     const updated = !isAddedToLibrary;
// //     library[id] = updated;
// //     localStorage.setItem('library', JSON.stringify(library));
// //     setIsAddedToLibrary(updated);
// //   };

// //   return (
// //     <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col h-[420px]">
// //       {/* e-Book Cover */}
// //       <div className="relative w-full h-64">
// //         <Image
// //           src={coverImage}
// //           alt={`Cover of ${title}`}
// //           fill
// //           className="object-cover rounded-t-xl"
// //           sizes="(max-width: 768px) 100vw, 400px"
// //         />
// //         {discountPercent > 0 && (
// //           <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
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

// //       {/* e-Book Details */}
// //       <div className="p-4 flex-1 flex flex-col">
// //         <h3
// //           className="text-base font-semibold text-gray-900 truncate mb-1"
// //           title={title}
// //         >
// //           {title}
// //         </h3>
// //         <p className="text-gray-500 text-sm mb-2 italic">By {author}</p>

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

// //         {/* Download/Add to Library Button */}
// //         <div className="mt-auto">
// //           <button
// //             onClick={handleLibrary}
// //             className={`w-full py-2.5 rounded-lg font-semibold transition duration-200 ${
// //               isAddedToLibrary ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'
// //             } text-white`}
// //           >
// //             {isAddedToLibrary ? 'Added to Library' : 'Add to Library'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EBookCard;
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { FaHeart, FaStar } from 'react-icons/fa';

// const EBookCard = ({ book }) => {
//   const {
//     _id,
//     title,
//     author,
//     coverImage,
//     price,
//     discountPercent = 0,
//     rating = 0,
//     reviews = 0,
//   } = book;

//   const router = useRouter();

//   const finalPrice = (price - price * (discountPercent / 100)).toFixed(2);

//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isAddedToLibrary, setIsAddedToLibrary] = useState(false);

//   const formattedPrice = new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//   }).format(price);

//   const formattedFinalPrice = new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//   }).format(finalPrice);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
//       const library = JSON.parse(localStorage.getItem('library') || '{}');
//       setIsWishlisted(wishlist[_id] || false);
//       setIsAddedToLibrary(library[_id] || false);
//     }
//   }, [_id]);

//   const handleWishlist = () => {
//     const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
//     const updated = !isWishlisted;
//     wishlist[_id] = updated;
//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//     setIsWishlisted(updated);
//   };

//   const handleLibrary = () => {
//     const library = JSON.parse(localStorage.getItem('library') || '{}');
//     const updated = !isAddedToLibrary;
//     library[_id] = updated;
//     localStorage.setItem('library', JSON.stringify(library));
//     setIsAddedToLibrary(updated);
//   };

//   const handleView = () => {
//     router.push(`/ebook/${_id}`);
//   };

//   return (
//     <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col h-[440px]">
//       {/* Book Cover */}
//       <div className="relative w-full h-64">
//         <Image
//           src={coverImage}
//           alt={`Cover of ${title}`}
//           fill
//           className="object-cover rounded-t-xl"
//           sizes="(max-width: 768px) 100vw, 400px"
//         />
//         {discountPercent > 0 && (
//           <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
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
//         <h3 className="text-base font-semibold text-gray-900 truncate mb-1" title={title}>
//           {title}
//         </h3>
//         <p className="text-gray-500 text-sm mb-2 italic">By {author}</p>

//         {/* Ratings */}
//         <div className="flex items-center mb-2">
//           <div className="flex text-yellow-400">
//             {[...Array(5)].map((_, index) => (
//               <FaStar key={index} className={index < rating ? '' : 'text-gray-300'} />
//             ))}
//           </div>
//           <span className="ml-2 text-gray-600 text-xs">({reviews} reviews)</span>
//         </div>

//         {/* Pricing */}
//         <div className="flex items-baseline gap-2 mb-4">
//           <span className="text-gray-400 line-through text-sm">{formattedPrice}</span>
//           <span className="text-lg font-bold text-green-600">{formattedFinalPrice}</span>
//         </div>

//         {/* Buttons */}
//         <div className="mt-auto flex flex-col gap-2 sm:flex-row">
//           <button
//             onClick={handleView}
//             className="w-full sm:w-1/2 py-2.5 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 transition duration-200"
//           >
//             View e-Book
//           </button>
//           <button
//             onClick={handleLibrary}
//             className={`w-full sm:w-1/2 py-2.5 rounded-lg font-semibold transition duration-200 ${
//               isAddedToLibrary ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'
//             } text-white`}
//           >
//             {isAddedToLibrary ? 'Added to Library' : 'Add to Library'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EBookCard;
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

const EBookCard = ({ book }) => {
  const {
    _id,
    title,
    author,
    coverImage,
    price,
    discountPercent = 0,
    rating = 0,
    reviews = 0,
  } = book;

  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const clerkUserId = user?.id;

  const finalPrice = (price - price * (discountPercent / 100)).toFixed(2);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToLibrary, setIsAddedToLibrary] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);

  const formattedFinalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(finalPrice);

  useEffect(() => {
    if (!clerkUserId) return;

    const checkWishlist = async () => {
      try {
        const res = await axios.get(
          `/api/wishlist/${_id}?clerkUserId=${clerkUserId}&type=ebook`
        );
        setIsWishlisted(res.data?.isWishlisted || false);
      } catch (error) {
        console.error('Failed to check wishlist:', error);
      }
    };

    checkWishlist();
  }, [clerkUserId, _id]);

  useEffect(() => {
    if (!clerkUserId) return;

    const checkLibrary = async () => {
      try {
        const res = await axios.get(`/api/ecart?clerkUserId=${clerkUserId}`);
        const { eCartItems } = res.data;
        const found = eCartItems?.some(item => item?.ebook?._id === _id);
        setIsAddedToLibrary(found);
      } catch (err) {
        console.error('Failed to check library:', err);
      }
    };

    checkLibrary();
  }, [clerkUserId, _id]);

  const handleWishlist = async () => {
    if (!clerkUserId) return alert('Please login to use wishlist');
    setLoadingWishlist(true);
    try {
      const res = await axios.post(`/api/wishlist/${_id}`, {
        clerkUserId,
        type: 'ebook',
      });
      setIsWishlisted(res.data.status === 'added');
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const handleLibrary = async () => {
    if (!clerkUserId) return alert('Please login to add to library');
    setLoadingLibrary(true);
    try {
      await axios.post('/api/ecart', {
        clerkUserId,
        ebook: _id,
      });
      setIsAddedToLibrary(true);
    } catch (err) {
      console.error('Failed to add to library:', err);
    } finally {
      setLoadingLibrary(false);
    }
  };

  const handleView = () => {
    router.push(`/ebook/${_id}`);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col h-[460px]">
      {/* Book Cover */}
      <div className="relative w-full h-64">
        <Image
          src={coverImage || '/default.jpg'}
          alt={`Cover of ${title}`}
          fill
          className="object-cover rounded-t-xl"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            {discountPercent}% OFF
          </div>
        )}
        <button
          onClick={handleWishlist}
          disabled={loadingWishlist}
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
        <h3 className="text-base font-semibold text-gray-900 truncate mb-1" title={title}>
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-2 italic">By {author}</p>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className={index < rating ? '' : 'text-gray-300'} />
            ))}
          </div>
          <span className="ml-2 text-gray-600 text-xs">({reviews} reviews)</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-gray-400 line-through text-sm">{formattedPrice}</span>
          <span className="text-lg font-bold text-green-600">{formattedFinalPrice}</span>
        </div>

        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <button
            onClick={handleView}
            className="w-full sm:w-1/2 py-2.5 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 transition duration-200"
          >
            View e-Book
          </button>
          <button
            onClick={handleLibrary}
            disabled={loadingLibrary || isAddedToLibrary}
            className={`w-full sm:w-1/2 py-2.5 rounded-lg font-semibold transition duration-200 ${
              isAddedToLibrary ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {isAddedToLibrary ? 'Added to Library' : 'Add to Library'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EBookCard;

