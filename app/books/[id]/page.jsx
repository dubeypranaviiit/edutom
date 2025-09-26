'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ProductDetails from '@/components/product/ProductDetails';
import { useUser } from '@clerk/nextjs';
const page = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useUser();
  const clerkUserId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(`/api/book/${id}`);
        const bookData = bookRes.data._doc;
        setBook(bookData);

        // 2. Get Wishlist status
        if (isSignedIn) {
          const res = await axios.get(`/api/wishlist/status`, {
            params: {
              bookId: bookData._id,
              clerkUserId,
            },
            
          });
        setWishlist(res.data?.isWishlisted || false);

        } else {
          const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
          setWishlist(!!localWishlist[bookData._id]);
        }
      } catch (error) {
        console.error('Error loading book or wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, clerkUserId, isSignedIn]);
 console.log(wishlist);
  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!book) return <div className="p-10 text-center text-red-500">Book not found.</div>;

  return <ProductDetails book={book} initialWishlisted={wishlist} />;
};

export default page;
