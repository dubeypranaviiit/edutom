// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import dropin from 'braintree-web-drop-in';
// import { useRouter } from 'next/navigation';

// const CheckoutPage = () => {
//   const [clientToken, setClientToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const instanceRef = useRef(null);
//   const router = useRouter();

//   const [cartData, setCartData] = useState({ items: [], totalAmount: 0, addressId: null, userId: null });
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);

//   useEffect(() => {
//     const local = localStorage.getItem('checkoutData');
//     if (local) {
//       const parsed = JSON.parse(local);
//       setCartData(parsed);

//       if (parsed.addressId) setSelectedAddressId(parsed.addressId);

//       const fetchAddresses = async () => {
//         try {
//           const res = await axios.get('/api/address', {
//             params: { clerkUserId: parsed.userId },
//           });
//           const fetchedAddresses = res.data.addresses || [];
//           setAddresses(fetchedAddresses);

//           if (!parsed.addressId) {
//             const defaultAddress = fetchedAddresses.find((addr) => addr.isDefault);
//             if (defaultAddress) {
//               setSelectedAddressId(defaultAddress._id);
//               setCartData((prev) => ({ ...prev, addressId: defaultAddress._id }));
//             }
//           }
//         } catch (err) {
//           console.error('Failed to fetch addresses', err);
//         }
//       };

//       fetchAddresses();
//     } else {
//       setError('Missing cart data. Please go back to cart.');
//       setLoading(false);
//       return;
//     }

//     const fetchClientToken = async () => {
//       try {
//         const res = await axios.get('/api/braintree/token');
//         setClientToken(res.data.clientToken);
//       } catch (err) {
//         setError('Failed to load payment system.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClientToken();
//   }, []);

//   useEffect(() => {
//     if (clientToken && typeof window !== 'undefined') {
//       dropin.create(
//         {
//           authorization: clientToken,
//           container: '#braintree-dropin',
//         },
//         (err, instance) => {
//           if (err) {
//             setError('Error setting up payment form.');
//             return;
//           }
//           instanceRef.current = instance;
//         }
//       );
//     }
//   }, [clientToken]);

//   const handlePayment = async () => {
//     try {
//       const { nonce } = await instanceRef.current.requestPaymentMethod();

//       const res = await axios.post('/api/braintree/checkout', {
//         paymentMethodNonce: nonce,
//         userId: cartData.userId,
//         addressId: selectedAddressId,
//         items: cartData.items,
//         totalAmount: cartData.totalAmount,
//       });

//       if (res.data.success) {
//         localStorage.removeItem('checkoutData');
//         router.push(`/checkout/success?orderId=${res.data.order._id}`);
//       } else {
//         setError('Payment failed.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong during payment.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-10 px-4 bg-white text-black">
//       <h2 className="text-2xl font-bold mb-6">Complete Payment</h2>

//       {loading ? (
//         <p>Loading payment gateway...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <>
//           {addresses.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2">Select Delivery Address</h3>
//               <div className="space-y-2">
//                 {addresses.map((addr) => (
//                   <label
//                     key={addr._id}
//                     className={`block border rounded p-3 cursor-pointer ${
//                       selectedAddressId === addr._id
//                         ? 'border-indigo-600 bg-indigo-50'
//                         : 'border-gray-300'
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="address"
//                       value={addr._id}
//                       checked={selectedAddressId === addr._id}
//                       onChange={() => setSelectedAddressId(addr._id)}
//                       className="mr-2"
//                     />
//                     <span className="text-sm text-gray-800">
//                       {addr.name}, {addr.address}, {addr.city}, {addr.state}, {addr.postalCode}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div id="braintree-dropin" className="mb-4" />
//           <button
//             onClick={handlePayment}
//             className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
//           >
//             Pay ₹{cartData.totalAmount}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;
'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const [clientToken, setClientToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartData, setCartData] = useState({ items: [], totalAmount: 0, addressId: null, userId: null });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentType, setPaymentType] = useState('cod'); // default COD
  const instanceRef = useRef(null);
  const router = useRouter();

  // Load checkoutData and addresses
  useEffect(() => {
    const local = localStorage.getItem('checkoutData');
    if (!local) {
      setError('Missing cart data. Please go back to cart.');
      setLoading(false);
      return;
    }

    const parsed = JSON.parse(local);
    setCartData(parsed);
    setSelectedAddressId(parsed.addressId);

    const fetchAddresses = async () => {
      try {
        const res = await axios.get('/api/address', { params: { clerkUserId: parsed.userId } });
        const fetchedAddresses = res.data.addresses || [];
        setAddresses(fetchedAddresses);

        if (!parsed.addressId) {
          const defaultAddress = fetchedAddresses.find((a) => a.isDefault);
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress._id);
            setCartData((prev) => ({ ...prev, addressId: defaultAddress._id }));
          }
        }
      } catch (err) {
        console.error('Failed to fetch addresses', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  // Load Braintree only if online payment is selected
  useEffect(() => {
    if (paymentType === 'online' && typeof window !== 'undefined') {
      const fetchClientToken = async () => {
        try {
          const res = await axios.get('/api/braintree/token');
          setClientToken(res.data.clientToken);
        } catch (err) {
          setError('Failed to load payment system.');
        }
      };

      fetchClientToken();
    }
  }, [paymentType]);

  useEffect(() => {
    if (clientToken && paymentType === 'online') {
      dropin.create(
        { authorization: clientToken, container: '#braintree-dropin' },
        (err, instance) => {
          if (err) {
            setError('Error setting up payment form.');
            return;
          }
          instanceRef.current = instance;
        }
      );
    }
  }, [clientToken, paymentType]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert('Please select a delivery address.');
      return;
    }

    if (paymentType === 'cod') {
      // COD order
      try {
        const res = await axios.post('/api/order/create', {
          userId: cartData.userId,
          addressId: selectedAddressId,
          items: cartData.items,
          totalAmount: cartData.totalAmount,
          paymentType: 'COD',
        });

        if (res.data.success) {
          localStorage.removeItem('checkoutData');
          alert('Order placed successfully with COD!');
          router.push(`/checkout/success?orderId=${res.data.order._id}`);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to place COD order.');
      }
    } else if (paymentType === 'online') {
      // Online payment
      try {
        const { nonce } = await instanceRef.current.requestPaymentMethod();
        const res = await axios.post('/api/braintree/checkout', {
          paymentMethodNonce: nonce,
          userId: cartData.userId,
          addressId: selectedAddressId,
          items: cartData.items,
          totalAmount: cartData.totalAmount,
        });

        if (res.data.success) {
          localStorage.removeItem('checkoutData');
          router.push(`/checkout/success?orderId=${res.data.order._id}`);
        } else {
          setError('Payment failed.');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong during online payment.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Complete Your Order</h2>

      {loading ? (
        <p>Loading checkout data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Address selection */}
          {addresses.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Delivery Address</h3>
              <div className="space-y-2">
                {addresses.map((addr) => (
                  <label
                    key={addr._id}
                    className={`block border rounded p-3 cursor-pointer ${
                      selectedAddressId === addr._id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr._id}
                      checked={selectedAddressId === addr._id}
                      onChange={() => setSelectedAddressId(addr._id)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-800">
                      {addr.name}, {addr.address}, {addr.city}, {addr.state}, {addr.postalCode}
                    </span>
                  </label>
                ))}
              </div>
            </div>
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
                  value="online"
                  checked={paymentType === 'online'}
                  onChange={() => setPaymentType('online')}
                />
                Online Payment
              </label>
            </div>
          </div>

          {/* Braintree drop-in for online payment */}
          {paymentType === 'online' && <div id="braintree-dropin" className="mb-4" />}

          <button
            onClick={handlePlaceOrder}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Place Order ₹{cartData.totalAmount}
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
