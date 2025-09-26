// 'use client';

// import Link from 'next/link';

// export default function WishlistTable({ item, isRemoving, onRemove, onConfirmRemove }) {
//   const handleRemove = () => {
//     onRemove(item._id || item.id);
//     onConfirmRemove(item._id || item.id);
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-md shadow">
//       <div className="flex items-center gap-4">
//         <img
//           src={item.image}
//           alt={item.title}
//           className="w-24 h-32 object-cover rounded-md border"
//         />
//         <div>
//           <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
//           <p className="text-sm text-gray-600">
//             ₹{item.price}{' '}
//             <span className="line-through text-gray-400 ml-2">
//               ₹{item.originalPrice}
//             </span>
//           </p>
//           <p className="text-green-600 text-xs">{item.discount} OFF</p>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
//         <Link href={`/books/${item._id || item.id}`}>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
//             Add to Cart
//           </button>
//         </Link>
//         <button
//           onClick={handleRemove}
//           disabled={isRemoving}
//           className="text-red-500 hover:text-red-600 text-sm"
//         >
//           {isRemoving ? 'Removing...' : 'Remove'}
//         </button>
//       </div>
//     </div>
//   );
// }
'use client';

import Link from 'next/link';

export default function WishlistTable({ item, isRemoving, onRemove, onConfirmRemove }) {
  const handleRemove = () => {
    onRemove(item._id || item.id);
    onConfirmRemove(item._id || item.id);
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(item.finalPrice || item.price);

  const formattedOriginal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(item.originalPrice || item.price);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-md shadow">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-32 object-cover rounded-md border"
        />
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-600">
            {formattedPrice}{' '}
            {item.originalPrice > item.finalPrice && (
              <span className="line-through text-gray-400 ml-2">
                {formattedOriginal}
              </span>
            )}
          </p>
          {item.discount && (
            <p className="text-green-600 text-xs">{item.discount} OFF</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
        {item.productId ? (
          <Link href={`/${item.type === 'ebook' ? 'ebooks' : 'books'}/${item.productId}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
              View Product
            </button>
          </Link>
        ) : (
          <span className="text-sm text-red-500">Book unavailable</span>
        )}
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="text-red-500 hover:text-red-600 text-sm"
        >
          {isRemoving ? 'Removing...' : 'Remove'}
        </button>
      </div>
    </div>
  );
}
