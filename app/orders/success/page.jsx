'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiCheckCircle } from 'react-icons/fi';

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow text-center">
        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order is being processed.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
