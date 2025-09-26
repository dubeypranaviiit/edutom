import React from "react";
import { FiMinus, FiPlus, FiTrash2, FiHeart } from "react-icons/fi";
import Link from "next/link";
const CartEBookItem = ({
  book,
  quantity,
  onQuantityChange,
  onRemove,
  onSaveForLater
}) => {
  const {
    _id,
    title,
    author,
    coverImage,
    price,
    discountPercent,
    finalPrice,
    stock,
    publisher
  } = book;
 console.log(`book title`,title);
  return (
    <div className="flex gap-4 p-4 border-b items-start bg-white rounded-md">
      {/* Image */}
       <Link
            href={`/books/${_id}`}
            
          >
         
         
      <img
        src={coverImage}
        alt={title}
        className="w-20 h-28 object-cover border rounded-md"
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/150x220?text=No+Image")
        }
      />
 </Link>
      {/* Details */}
      <div className="flex flex-col flex-1">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">by {author}</p>
        {publisher && <p className="text-sm text-gray-500 mt-1">Publisher: {publisher}</p>}

        <div className="mt-2 flex gap-2 items-center">
          <span className="text-lg font-bold text-gray-900">₹{finalPrice.toFixed(2)}</span>
          {discountPercent > 0 && (
            <>
              <span className="text-sm line-through text-gray-500">₹{price.toFixed(2)}</span>
              <span className="text-sm text-green-600 font-medium">{discountPercent}% Off</span>
            </>
          )}
        </div>

        {/* Quantity Counter */}
        <div className="mt-4 flex items-center gap-3">
          <button
            className="p-1 border rounded hover:bg-gray-100"
            onClick={() => onQuantityChange(book._id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <FiMinus />
          </button>
          <input
            type="number"
            value={quantity}
            min="1"
            className="w-12 text-center border rounded"
            onChange={(e) =>
              onQuantityChange(book._id, parseInt(e.target.value) || 1)
            }
          />
          <button
            className="p-1 border rounded hover:bg-gray-100"
            onClick={() => onQuantityChange(book._id, quantity + 1)}
            disabled={quantity >= book.stock}
          >
            <FiPlus />
          </button>
          <span className="text-xs text-gray-500 ml-2">
            {book.stock - book.sold} available
          </span>
        </div>

        {/* Actions */}
        <div className="mt-3 flex gap-6 text-sm font-medium text-blue-600">
          <button onClick={() => onSaveForLater(book._id)}>SAVE FOR LATER</button>
          <button onClick={() => onRemove(book._id)} className="text-red-500">REMOVE</button>
        </div>
      </div>
    </div>
  );
};

export default CartEBookItem;
