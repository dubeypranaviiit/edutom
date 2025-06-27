// pages/wishlist.js
'use client'
import { useState } from "react";
import WishlistTable from "@/components/pop/Wishlist";
import { assets } from "@/Assets/assets";

const initialItems = [
  {
    id: 1,
    title: "Best Books for SSC CGL, CPO & CHSL Exam",
    price: 1715,
    originalPrice: 2999,
    discount: "42%",
    image: '/acer.jpg',
    available: true,
  },
  {
    id: 2,
    title: "Acer Aspire 5 AMD Ryzen 5",
    price: 55990,
    originalPrice: 65000,
    discount: "13%",
    image: "/acer.jpg",
    available: false,
  },
  {
    id: 3,
    title: "Micromax 32 inch Smart Android TV",
    price: null,
    originalPrice: null,
    discount: null,
    image: "/micromax-tv.jpg",
    available: false,
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialItems);
  const [removingId, setRemovingId] = useState(null);

  const confirmRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    setRemovingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 lg:px-20">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        My Wishlist ({wishlist.length})
      </h1>
      <div className="space-y-4">
        {wishlist.map((item) => (
          <WishlistTable
            key={item.id}
            item={item}
            isRemoving={removingId === item.id}
            onRemove={setRemovingId}
            onConfirmRemove={confirmRemove}
          />
        ))}
      </div>
    </div>
  );
}
