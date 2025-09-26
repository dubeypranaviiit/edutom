'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useUser } from '@clerk/nextjs';
import { useCartStore } from '@/store/cartStore';
import StarRating from './StarRating';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { user, isSignedIn } = useUser();
  const clerkUserId = user?.id;

  const [book, setBook] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { fetchCart, updateQuantity, addItem } = useCartStore();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/book/${id}`);
        const data = res.data._doc || res.data;
        setBook(data);

        // Wishlist
        if (isSignedIn) {
          const wlRes = await axios.get(`/api/wishlist/status`, {
            params: { bookId: data._id, clerkUserId },
          });
          setWishlist(wlRes.data?.isWishlisted || false);
        } else {
          const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
          setWishlist(!!localWishlist[data._id]);
        }

        // Cart
        if (isSignedIn) await fetchCart(clerkUserId);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id, clerkUserId, isSignedIn, fetchCart]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!book) return <div className="p-10 text-center text-red-500">Book not found</div>;

  const finalPrice = (book.price - (book.price * (book.discountPercent / 100))).toFixed(2);

  // ----------------- Wishlist toggle -----------------
  const handleWishlistToggle = async () => {
    setWishlist(prev => !prev);
    if (isSignedIn) {
      try {
        const res = await axios.post(`/api/wishlist/${book._id}`, { clerkUserId });
        setWishlist(res.data.status === 'added');
      } catch (err) {
        console.error(err);
      }
    } else {
      const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
      localWishlist[book._id] = !wishlist;
      localStorage.setItem('wishlist', JSON.stringify(localWishlist));
      setWishlist(!wishlist);
    }
  };

  // ----------------- Quantity change -----------------
  const handleQuantityChange = async (type) => {
    let newQty = quantity;
    if (type === 'increment' && quantity < book.stock) newQty = quantity + 1;
    if (type === 'decrement' && quantity > 1) newQty = quantity - 1;

    setQuantity(newQty);

    if (isSignedIn) {
      await updateQuantity(book._id, clerkUserId, newQty);
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '{}');
      localCart[book._id] = {
        quantity: newQty,
        bookInfo: { title: book.title, price: finalPrice, image: book.coverImage },
      };
      localStorage.setItem('cart', JSON.stringify(localCart));
    }
  };

 
  const handleAddToCart = async () => {
    if (book.stock <= 0) return alert('Out of stock');

    if (isSignedIn) {
      await addItem(book._id, clerkUserId, quantity);
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '{}');
      if (localCart[book._id]) {
        localCart[book._id].quantity += quantity;
      } else {
        localCart[book._id] = {
          quantity,
          bookInfo: { title: book.title, price: finalPrice, image: book.coverImage },
        };
      }
      localStorage.setItem('cart', JSON.stringify(localCart));
    }

    alert('Added to cart!');
  };

  return (
    <div className="container mx-auto mt-15 mr-20 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="w-full flex justify-center">
          <Image
            src={book.coverImage}
            alt={book.title}
            width={400}
            height={500}
            className="object-contain rounded-xl shadow-md"
          />
        </div>
        <div className="flex flex-col gap-5">
          {/* Title + Wishlist */}
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <button onClick={handleWishlistToggle}>
              {wishlist ? (
                <AiFillHeart className="text-red-500 text-2xl" />
              ) : (
                <AiOutlineHeart className="text-gray-400 text-2xl" />
              )}
            </button>
          </div>

          <p className="text-gray-600 text-lg">by {book.author}</p>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-blue-600">₹{finalPrice}</span>
            {book.discountPercent > 0 && (
              <>
                <span className="line-through text-gray-400">₹{book.price}</span>
                <span className="text-red-500">{book.discountPercent}% off</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700">{book.description}</p>

          {/* Rating */}
          <StarRating bookId={book._id} />

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleQuantityChange('decrement')}
              disabled={quantity <= 1}
              className="p-2 border rounded-full"
            >
              <FiMinus />
            </button>
            <span className="text-xl font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange('increment')}
              disabled={quantity >= book.stock}
              className="p-2 border rounded-full"
            >
              <FiPlus />
            </button>
            <span className="text-gray-500">({book.stock} available)</span>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={book.stock === 0}
            className={`mt-4 w-full py-3 rounded-lg text-white font-semibold ${
              book.stock > 0
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

