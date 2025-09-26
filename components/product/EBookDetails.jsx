'use client';

import { useState } from 'react';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

const EBookDetails = ({ book, initialWishlisted }) => {
  const [wishlist, setWishlist] = useState(initialWishlisted || false);
  const [isInLibrary, setIsInLibrary] = useState(false);
  const { user, isSignedIn } = useUser();
  const clerkUserId = user?.id;

  // Price formatting
  const price = book?.price || 0;
  const discountPercent = book?.discountPercent || 0;
  const finalPrice = (price - price * (discountPercent / 100)).toFixed(2);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);

  const formattedFinalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(finalPrice);

  const handleAddToLibrary = async () => {
    if (!isSignedIn) {
      alert('Please sign in to add this ebook to your library.');
      return;
    }

    try {
      const res = await axios.post('/api/library/add', {
        ebookId: book._id,
        clerkUserId,
      });

      if (res.data.success) {
        alert('Ebook added to your library!');
        setIsInLibrary(true);
      } else {
        alert(res.data.message || 'Could not add to library.');
      }
    } catch (error) {
      console.error('Error adding ebook to library:', error);
      alert('Something went wrong.');
    }
  };

  const toggleWishlist = async () => {
    setWishlist((prev) => !prev);

    if (isSignedIn) {
      try {
        const res = await axios.post(`/api/wishlist/${book._id}`, {
          clerkUserId,
        });
        setWishlist(res.data.status === 'added');
      } catch (err) {
        console.error('Wishlist toggle error:', err);
      }
    } else {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
      const newStatus = !wishlist[book._id];
      wishlist[book._id] = newStatus;
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setWishlist(newStatus);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-7 py-10 bg-white text-black">
      <div className="grid md:grid-cols-2 gap-10">
        {/* eBook Cover */}
        <div>
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-[500px] object-cover rounded-xl shadow"
          />
        </div>

        {/* eBook Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <button onClick={toggleWishlist}>
              {wishlist ? (
                <AiFillHeart className="text-red-500 text-2xl" />
              ) : (
                <AiOutlineHeart className="text-gray-500 text-2xl" />
              )}
            </button>
          </div>

          <p className="text-gray-600 text-lg">by {book.author}</p>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold text-blue-600">{formattedFinalPrice}</span>
            {discountPercent > 0 && (
              <>
                <span className="line-through text-gray-400">{formattedPrice}</span>
                <span className="text-red-500 font-medium">{discountPercent}% off</span>
              </>
            )}
          </div>

          <p className="text-gray-700">{book.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
            <p><span className="font-semibold">Language:</span> {book.language}</p>
            <p><span className="font-semibold">Publisher:</span> {book.publisher || 'N/A'}</p>
            <p><span className="font-semibold">Published on:</span> {book.publicationDate ? new Date(book.publicationDate).toLocaleDateString() : 'N/A'}</p>
            <p><span className="font-semibold">Formats:</span> {book.formats?.join(', ') || 'N/A'}</p>
            <p><span className="font-semibold">Tags:</span> {book.tags?.join(', ') || 'N/A'}</p>
            <p><span className="font-semibold">DRM:</span> {book.drmProtected ? 'Yes' : 'No'}</p>
          </div>

          {/* Add to Library Button */}
          <button
            onClick={handleAddToLibrary}
            disabled={isInLibrary}
            className={`w-full py-3 mt-6 rounded-lg text-white font-semibold transition ${
              isInLibrary ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isInLibrary ? 'Already in Library' : 'Add to Library'}
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <AiFillStar
              key={i}
              className={`text-2xl ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-gray-600">({book.ratingsCount} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default EBookDetails;
