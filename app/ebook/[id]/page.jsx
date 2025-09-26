'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import EBookDetails from '@/components/product/EBookDetails';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/loader/Loader';

const Page = () => {
  const { id } = useParams();
  const [ebook, setEbook] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useUser();
  const clerkUserId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const bookRes = await axios.get(`/api/ebook/${id}`);
        const bookData = bookRes.data.ebook;
        console.log(bookData);
        setEbook(bookData);

        // Fetch wishlist status
        if (isSignedIn) {
          const res = await axios.get(`/api/wishlist/${bookData._id}/status`, {
            params: { userId: clerkUserId },
          });
          setWishlist(res.data?.isWishlisted || false);
        } else {
          const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');
          setWishlist(!!localWishlist[bookData._id]);
        }
      } catch (error) {
        console.error('Error loading ebook or wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, clerkUserId, isSignedIn]);

  if (loading)
    return (
      <div className="p-10 mt-13 flex justify-center items-center text-center bg-white text-red-800">
        <Loader />
      </div>
    );

  if (!ebook)
    return (
      <div className="p-10 mt-13 bg-white text-center text-red-500">
        Ebook not found.
      </div>
    );

  return <EBookDetails book={ebook} initialWishlisted={wishlist} />;
};

export default Page;
