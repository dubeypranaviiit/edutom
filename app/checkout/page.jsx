'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useAddressStore } from '@/store/addressStore';
import axios from 'axios';

const CheckoutPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { addresses, fetchAddresses } = useAddressStore();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [paymentType, setPaymentType] = useState('cod'); // default COD
  const [loading, setLoading] = useState(true);

  // Load checkout data from localStorage
  useEffect(() => {
    const data = localStorage.getItem('checkoutData');
    if (!data) {
      alert('Missing checkout data. Redirecting to cart.');
      router.push('/profile/cart');
      return;
    }
    setCheckoutData(JSON.parse(data));
  }, [router]);

  // Fetch addresses from Zustand store
  useEffect(() => {
    if (user) fetchAddresses(user.id);
  }, [user, fetchAddresses]);

  // Set default selected address
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr?._id);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [addresses]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !checkoutData) {
      alert('Please select a delivery address.');
      return;
    }

    try {
      if (paymentType === 'cod') {
        const res = await axios.post('/api/orders/place', {
          ...checkoutData,
          addressId: selectedAddress,
        });

        if (res.data.success) {
          localStorage.removeItem('checkoutData');
          router.push('/orders');
        }
      } else if (paymentType === 'stripe') {
  const res = await axios.post('/api/orders/stripeCheckout', {
    ...checkoutData,
    addressId: selectedAddress,
  });

  if (res.data.url) {
    window.location.href = res.data.url; // redirect to Stripe checkout page
  }
}
    } catch (err) {
      console.error('Order placement failed', err);
      alert('Something went wrong while placing your order.');
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Complete Your Order</h2>

      {/* Address selection */}
      {addresses.length > 0 ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Delivery Address</h3>
          <div className="space-y-2">
            {addresses.map(addr => (
              <label
                key={addr._id}
                className={`block border rounded p-3 cursor-pointer ${
                  selectedAddress === addr._id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  value={addr._id}
                  checked={selectedAddress === addr._id}
                  onChange={() => setSelectedAddress(addr._id)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-800">
                  {addr.name}, {addr.address}, {addr.city}, {addr.state}, {addr.postalCode}
                </span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <p>No addresses found. Please add one in your profile.</p>
      )}

      {/* Payment selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentType === 'cod'}
              onChange={() => setPaymentType('cod')}
            />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={paymentType === 'stripe'}
              onChange={() => setPaymentType('stripe')}
            />
            Pay Online (Stripe)
          </label>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
      >
        Place Order ₹{checkoutData?.totalAmount}
      </button>
    </div>
  );
};

export default CheckoutPage;
