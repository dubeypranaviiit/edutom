'use client';

import { useEffect, useState } from 'react';
import { FaBolt, FaClock } from 'react-icons/fa';
import BookCard from './BookCard';
import { books } from '@/Assets/data';

const DealOfTheDay = () => {
  const bestDeal = books.reduce((max, book) =>
    book.discountPercent > max.discountPercent ? book : max
  , books[0]);

  const [timeLeft, setTimeLeft] = useState('');

  // Deal ends in 24 hours (static demo)
  const dealEndTime = new Date();
  dealEndTime.setHours(dealEndTime.getHours() + 24);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = dealEndTime.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const finalPrice = (
    bestDeal.price -
    bestDeal.price * (bestDeal.discountPercent / 100)
  ).toFixed(2);

  return (
    <section className="relative py-12 px-4 sm:px-8 bg-gradient-to-r from-yellow-50 via-orange-100 to-yellow-50 rounded-xl shadow-xl mt-16 overflow-hidden">
      {/* Glowing background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-25 animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-25 animate-pulse" />

      {/* Header */}
      <div className="relative z-10 text-center mb-6">
        <div className="inline-flex items-center gap-3 justify-center text-orange-600 font-bold text-3xl sm:text-4xl">
          <FaBolt className="text-yellow-500 animate-ping" />
          Deal of the Day
          <FaBolt className="text-yellow-500 animate-ping" />
        </div>
        <p className="text-sm text-gray-600 mt-1">Grab this top deal before the clock runs out!</p>
      </div>

      {/* Countdown Timer */}
      <div className="relative z-10 flex justify-center items-center gap-2 mb-6">
        <FaClock className="text-red-500" />
        <p className="text-lg font-semibold text-red-600">
          Offer Ends In: <span className="font-mono">{timeLeft}</span>
        </p>
      </div>

      {/* Book & Pricing */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-8">
        <div className="w-full max-w-sm">
          <BookCard book={bestDeal} />
        </div>
      </div>
    </section>
  );
};

export default DealOfTheDay;
