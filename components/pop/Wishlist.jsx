// components/WishlistItem.js
export default function WishlistTable({ item, onRemove, onConfirmRemove, isRemoving }) {
  return (
    <div className="flex gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition-all relative bg-white text-black">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded-lg bg-gray-100"
      />
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-lg">{item.title}</h3>
          {item.price ? (
            <div className="text-sm mt-1 text-gray-700">
              <span className="font-semibold text-black text-base">₹{item.price.toLocaleString()}</span>
              <span className="line-through text-gray-500 ml-2">₹{item.originalPrice}</span>
              <span className="text-green-600 ml-2">{item.discount} off</span>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Price: Not Available</p>
          )}
          {!item.available && (
            <p className="text-pink-600 text-sm font-medium mt-1">Currently unavailable</p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-600 transition text-xl"
          title="Remove"
        >
          🗑️
        </button>
        {isRemoving && (
          <div className="absolute right-12 top-4 w-64 p-4 bg-white border rounded-lg shadow-lg z-50">
            <p className="text-sm mb-2">Are you sure you want to remove this product?</p>
            <div className="flex justify-end gap-4 text-sm font-medium">
              <button onClick={() => onRemove(null)} className="text-gray-500">Cancel</button>
              <button onClick={() => onConfirmRemove(item.id)} className="text-red-600">Yes, Remove</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
