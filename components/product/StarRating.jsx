'use client';

import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

const StarRating = ({ bookId }) => {
  const { user, isSignedIn } = useUser();
  const clerkUserId = user?.id;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        // fetch avg + count
        const res = await axios.get(`/api/book/${bookId}/ratings`);
        setAverageRating(res.data.averageRating || 0);
        setReviewsCount(res.data.reviewsCount || 0);

        // fetch user’s rating + review
        if (isSignedIn && clerkUserId) {
          const userRes = await axios.get(`/api/book/${bookId}/ratings`, {
            params: { clerkUserId },
          });
          setRating(userRes.data.rating || 0);
          setReview(userRes.data.review || "");
        }
      } catch (err) {
        console.error("Error fetching ratings:", err);
      }
    };

    fetchRatings();
  }, [bookId, clerkUserId, isSignedIn]);

  const handleSubmit = async () => {
    if (!isSignedIn) return alert('Login to rate this book');

    try {
      await axios.post(`/api/book/${bookId}/ratings`, {
        clerkUserId,
        rating,
        review,
      });

      const res = await axios.get(`/api/book/${bookId}/ratings`);
      setAverageRating(res.data.averageRating || 0);
      setReviewsCount(res.data.reviewsCount || 0);
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      {/* Stars */}
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer transition-colors ${
              (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      {/* Review Input */}
      {isSignedIn && (
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="border p-2 rounded w-full text-sm"
        />
      )}

      {/* Submit Button */}
      {isSignedIn && (
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit"
        >
          Submit
        </button>
      )}

   
      <span className="text-gray-600 text-sm">
        {reviewsCount > 0
          ? `${averageRating.toFixed(1)} ⭐ (${reviewsCount} reviews)`
          : 'No reviews yet'}
      </span>
    </div>
  );
};

export default StarRating;
