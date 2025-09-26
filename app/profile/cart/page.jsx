// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import { FiShoppingCart } from 'react-icons/fi';
// // import CartBookItem from '@/components/cart/CartItem';
// // import { useUser } from '@clerk/nextjs';
// // import axios from 'axios';
// // import { useRouter } from 'next/navigation';

// // const page = () => {
// //   const { user } = useUser();
// //   const clerkUserId = user?.id;
// //   const router = useRouter();

// //   const [cartItems, setCartItems] = useState([]);
// //   const [savedItems, setSavedItems] = useState([]);
// //   const [promoCode, setPromoCode] = useState('');
// //   const [discount, setDiscount] = useState(0);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     if (!clerkUserId) return;

// //     const fetchCartData = async () => {
// //       try {
// //         const res = await axios.get('/api/cart', {
// //           params: { clerkUserId },
// //         });
// //         console.log(res.data.cartItems);
// //         setCartItems(res.data.cartItems || []);
// //         setSavedItems(res.data.savedItems || []);
// //       } catch (error) {
// //         console.error('Failed to fetch cart:', error);
// //       }
// //     };

// //     fetchCartData();
// //   }, [clerkUserId]);

// //   const updateQuantity = async (bookId, newQty) => {
// //     const item = cartItems.find((item) => item.book._id === bookId);
// //     if (!item || newQty < 1) return;

// //     try {
// //       const res = await axios.put(`/api/cart/${item._id}`, {
// //         userId: item.user,
// //         quantity: newQty,
// //       });
// //       setCartItems((prev) =>
// //         prev.map((i) => (i._id === item._id ? { ...i, quantity: res.data.quantity } : i))
// //       );
// //     } catch (error) {
// //       console.error('Error updating quantity:', error);
// //     }
// //   };

// //   const removeItem = async (bookId) => {
// //     const item = cartItems.find((item) => item.book._id === bookId);
// //     if (!item) return;

// //     try {
// //       await axios.delete(`/api/cart/${item._id}`, {
// //         params: { userId: item.user },
// //       });
// //       setCartItems((prev) => prev.filter((i) => i._id !== item._id));
// //     } catch (error) {
// //       console.error('Error removing item:', error);
// //     }
// //   };

// //   const calculateSubtotal = () =>
// //     cartItems.reduce(
// //       (sum, item) =>
// //         sum + (item.book?.finalPrice || item.book?.price || 0) * item.quantity,
// //       0
// //     );

// //   const subtotal = calculateSubtotal();
// //   const shipping = subtotal > 500 ? 0 : 29.99;
// //   const total = subtotal + shipping - discount;

// //   const handleProceedToCheckout = async () => {
// //     try {
// //       if (cartItems.length === 0) {
// //         alert('Your cart is empty.');
// //         return;
// //       }

// //       // Fetch user's addresses
// //       const addressRes = await axios.get('/api/address', {
// //         params: { clerkUserId },
// //       });
// //       console.log(addressRes);
// //       const addresses = addressRes.data.addresses || [];

// //       if (!addresses.length) {
// //         alert('Please add a delivery address before checkout.');
// //         return;
// //       }

// //       const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

// //       const checkoutData = {
// //         userId: clerkUserId,
// //         addressId: defaultAddress._id,
// //         items: cartItems.map((item) => ({
// //           book: item.book._id,
// //           quantity: item.quantity,
// //           priceAtPurchase: item.book.finalPrice || item.book.price || 0,
// //           discountPercentAtPurchase: item.book.discountPercent || 0,
// //         })),
// //         totalAmount: total.toFixed(2),
// //       };

// //       localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
// //       router.push('/checkout');
// //     } catch (err) {
// //       console.error('Checkout error:', err);
// //       alert('Something went wrong while proceeding to checkout.');
// //     }
// //   };

// //   const applyPromoCode = () => {
// //     if (promoCode === 'SAVE20') {
// //       setDiscount(calculateSubtotal() * 0.2);
// //       setError('');
// //     } else {
// //       setDiscount(0);
// //       setError('Invalid promo code');
// //     }
// //   };
// //   // const item = cartItems.find((item) => item.book._id === bookId);
// // const handleSaveForLater = async (bookId) => {
// //   const item = cartItems.find(
// //     (item) => (item.book?._id || item.ebook?._id) === bookId
// //   );
// //   if (!item) return;

// //   try {
// //     await axios.patch(`/api/cart/${item._id}`, {
// //       userId: item.user,
// //       savedForLater: true, 
// //     });

// //     setCartItems((prev) => prev.filter((i) => i._id !== item._id));
// //     setSavedItems((prev) => [...prev, { ...item, savedForLater: true }]);
// //   } catch (error) {
// //     console.error('Error saving for later:', error);
// //   }
// // };



// //   return (
// //     <div className="min-h-screen bg-gray-100 py-10">
// //       <div className="max-w-7xl mx-auto px-4">
// //         <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

// //         {cartItems.length === 0 ? (
// //           <div className="text-center py-20">
// //             <FiShoppingCart className="text-4xl mx-auto text-gray-400" />
// //             <p className="text-gray-500 mt-4">Your cart is empty.</p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             <div className="lg:col-span-2 space-y-4">
// //               {/* {cartItems.map((item) => (
// //                 <CartBookItem
// //                   key={item._id}
// //                   book={item.book}
// //                   quantity={item.quantity}
// //                   onQuantityChange={updateQuantity}
// //                   onRemove={removeItem}
// //                 />
// //               ))} */}
// //               {cartItems.filter((item) => item.book).map((item) => {
// //   const bookData = item.book || item.ebook;
// //   if (!bookData) return null; // Skip items without any valid book/ebook

// //   return (
// //     <CartBookItem
// //       key={item._id}
// //       book={bookData}
// //       quantity={item.quantity}
// //       onQuantityChange={updateQuantity}
// //       onRemove={removeItem}
// //         onSaveForLater={handleSaveForLater}
// //     />
// //   );
// // })}
// //             </div>

// //             <div className="bg-white p-6 rounded shadow sticky top-8 h-fit">
// //               <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
// //               <div className="space-y-3 text-sm text-gray-700">
// //                 <div className="flex justify-between">
// //                   <span>Subtotal</span>
// //                   <span>₹{subtotal.toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span>Shipping</span>
// //                   <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
// //                 </div>
// //                 {discount > 0 && (
// //                   <div className="flex justify-between text-green-600 font-medium">
// //                     <span>Discount</span>
// //                     <span>-₹{discount.toFixed(2)}</span>
// //                   </div>
// //                 )}
// //                 <hr className="my-2" />
// //                 <div className="flex justify-between font-semibold text-gray-900 text-base">
// //                   <span>Total</span>
// //                   <span>₹{total.toFixed(2)}</span>
// //                 </div>
// //               </div>

// //               <div className="mt-4 flex gap-2">
// //                 <input
// //                   type="text"
// //                   value={promoCode}
// //                   onChange={(e) => setPromoCode(e.target.value)}
// //                   placeholder="Enter coupon"
// //                   className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
// //                 />
// //                 <button
// //                   onClick={applyPromoCode}
// //                   className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
// //                 >
// //                   Apply
// //                 </button>
// //               </div>
// //               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

// //               <button
// //                 onClick={handleProceedToCheckout}
// //                 className="mt-6 w-full py-3 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
// //               >
// //                 Proceed to Checkout
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default page;
// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import { FiShoppingCart } from 'react-icons/fi';
// // import { useUser } from '@clerk/nextjs';
// // import { useRouter } from 'next/navigation';
// // import { useCartStore } from '@/store/cartStore';
// // // import CartBookItem from '@/components/cart/CartBookItem';44
// // import CartBookItem from '@/components/cart/CartItem';

// // const CartPage = () => {
// //   const { user } = useUser();
// //   const clerkUserId = user?.id;
// //   const router = useRouter();

// //   const { cart, fetchCart, updateQuantity, removeItem, saveForLater } = useCartStore();
// //   const [promoCode, setPromoCode] = useState('');
// //   const [discount, setDiscount] = useState(0);
// //   const [error, setError] = useState('');

// //   // Fetch cart when user logs in
// //   useEffect(() => {
// //     if (clerkUserId) fetchCart(clerkUserId);
// //   }, [clerkUserId]);

// //   const handleSaveForLater = (itemId, userId, isEbook) => {
// //     saveForLater(itemId, userId, isEbook);
// //   };

// //   // Separate active and saved items
// //   const cartItems = cart.filter((item) => !item.savedForLater && !item.EsavedForLater);
// //   console.log(cartItems);
// //   const savedItems = cart.filter((item) => item.savedForLater || item.EsavedForLater);

// //   // Calculate totals
// //   const subtotal = cartItems.reduce(
// //     (sum, item) =>
// //       sum + (item.book?.finalPrice || item.ebook?.finalPrice || item.book?.price || item.ebook?.price) * item.quantity,
// //     0
// //   );
// //   const shipping = subtotal > 500 ? 0 : 29.99;
// //   const total = subtotal + shipping - discount;

// //   // Apply promo code
// //   const applyPromoCode = () => {
// //     if (promoCode === 'SAVE20') {
// //       setDiscount(subtotal * 0.2);
// //       setError('');
// //     } else {
// //       setDiscount(0);
// //       setError('Invalid promo code');
// //     }
// //   };

// //   // Proceed to checkout
// //   const handleProceedToCheckout = () => {
// //     if (!cartItems.length) {
// //       alert('Your cart is empty.');
// //       return;
// //     }

// //     const checkoutData = {
// //       userId: clerkUserId,
// //       items: cartItems.map((item) => ({
// //         book: item.book?._id || item.ebook?._id,
// //         quantity: item.quantity,
// //         priceAtPurchase: item.book?.finalPrice || item.ebook?.finalPrice || item.book?.price || item.ebook?.price,
// //         discountPercentAtPurchase: item.book?.discountPercent || item.ebook?.discountPercent || 0,
// //       })),
// //       totalAmount: total.toFixed(2),
// //     };

// //     localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
// //     router.push('/checkout');
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-10">
// //       <div className="max-w-7xl mx-auto px-4">
// //         <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

// //         {cart.length === 0 ? (
// //           <div className="text-center py-20">
// //             <FiShoppingCart className="text-4xl mx-auto text-gray-400" />
// //             <p className="text-gray-500 mt-4">Your cart is empty.</p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             <div className="lg:col-span-2 space-y-6">
// //               {/* Active Cart Items */}
// //               {cartItems.map((item) => (
// //                 <CartBookItem
// //                   key={item._id}
// //                   book={item.book || item.ebook}
// //                   quantity={item.quantity}
// //                   itemId={item._id}
// //                   userId={item.user}
// //                   isEbook={!!item.ebook}
// //                   onQuantityChange={updateQuantity}
// //                   onRemove={removeItem}
// //                   onSaveForLater={handleSaveForLater}
// //                 />
// //               ))}

// //               {/* Saved for Later Items */}
// //               {savedItems.length > 0 && (
// //                 <div className="mt-8">
// //                   <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved for Later</h2>
// //                   <div className="space-y-4">
// //                     {savedItems.map((item) => (
// //                       <CartBookItem
// //                         key={item._id}
// //                         book={item.book || item.ebook}
// //                         quantity={item.quantity}
// //                         itemId={item._id}
// //                         userId={item.user}
// //                         isEbook={!!item.ebook}
// //                         onQuantityChange={updateQuantity}
// //                         onRemove={removeItem}
// //                         onSaveForLater={handleSaveForLater}
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Order Summary */}
// //             <div className="bg-white p-6 rounded shadow sticky top-8 h-fit">
// //               <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
// //               <div className="space-y-3 text-sm text-gray-700">
// //                 <div className="flex justify-between">
// //                   <span>Subtotal</span>
// //                   <span>₹{subtotal.toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span>Shipping</span>
// //                   <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
// //                 </div>
// //                 {discount > 0 && (
// //                   <div className="flex justify-between text-green-600 font-medium">
// //                     <span>Discount</span>
// //                     <span>-₹{discount.toFixed(2)}</span>
// //                   </div>
// //                 )}
// //                 <hr className="my-2" />
// //                 <div className="flex justify-between font-semibold text-gray-900 text-base">
// //                   <span>Total</span>
// //                   <span>₹{total.toFixed(2)}</span>
// //                 </div>
// //               </div>

// //               {/* Promo code input */}
// //               <div className="mt-4 flex gap-2">
// //                 <input
// //                   type="text"
// //                   value={promoCode}
// //                   onChange={(e) => setPromoCode(e.target.value)}
// //                   placeholder="Enter coupon"
// //                   className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
// //                 />
// //                 <button
// //                   onClick={applyPromoCode}
// //                   className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
// //                 >
// //                   Apply
// //                 </button>
// //               </div>
// //               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

// //               {/* Checkout button */}
// //               <button
// //                 onClick={handleProceedToCheckout}
// //                 className="mt-6 w-full py-3 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
// //               >
// //                 Proceed to Checkout
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CartPage;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { FiShoppingCart } from 'react-icons/fi';
// import { useUser } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
// import { useCartStore } from '@/store/cartStore';
// import CartBookItem from '@/components/cart/CartItem';

// const CartPage = () => {
//   const { user } = useUser();
//   const clerkUserId = user?.id;
//   const router = useRouter();

//   // Correct Zustand subscription
//   const cart = useCartStore((state) => state.cart);
//   const fetchCart = useCartStore((state) => state.fetchCart);
//   const updateQuantity = useCartStore((state) => state.updateQuantity);
//   const removeItem = useCartStore((state) => state.removeItem);
//   const saveForLater = useCartStore((state) => state.saveForLater);

//   const [promoCode, setPromoCode] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [error, setError] = useState('');

//   // Fetch cart when user logs in
//   useEffect(() => {
//     if (clerkUserId) fetchCart(clerkUserId);
//   }, [clerkUserId, fetchCart]);

//   const handleSaveForLater = (itemId, userId, isEbook) => {
//     saveForLater(itemId, userId, isEbook);
//   };

//   // Separate active and saved items
//   const cartItems = cart.filter((item) => !item.savedForLater && !item.EsavedForLater);
//   const savedItems = cart.filter((item) => item.savedForLater || item.EsavedForLater);

//   // Calculate totals
//   const subtotal = cartItems.reduce(
//     (sum, item) =>
//       sum + (item.book?.finalPrice || item.ebook?.finalPrice || item.book?.price || item.ebook?.price) * item.quantity,
//     0
//   );
//   const shipping = subtotal > 500 ? 0 : 29.99;
//   const total = subtotal + shipping - discount;

//   // Apply promo code
//   const applyPromoCode = () => {
//     if (promoCode === 'SAVE20') {
//       setDiscount(subtotal * 0.2);
//       setError('');
//     } else {
//       setDiscount(0);
//       setError('Invalid promo code');
//     }
//   };

//   // Proceed to checkout
//   const handleProceedToCheckout = () => {
//     if (!cartItems.length) {
//       alert('Your cart is empty.');
//       return;
//     }

//     const checkoutData = {
//       userId: clerkUserId,
//       items: cartItems.map((item) => ({
//         book: item.book?._id || item.ebook?._id,
//         quantity: item.quantity,
//         priceAtPurchase: item.book?.finalPrice || item.ebook?.finalPrice || item.book?.price || item.ebook?.price,
//         discountPercentAtPurchase: item.book?.discountPercent || item.ebook?.discountPercent || 0,
//       })),
//       totalAmount: total.toFixed(2),
//     };

//     localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
//     router.push('/checkout');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

//         {cart.length === 0 ? (
//           <div className="text-center py-20">
//             <FiShoppingCart className="text-4xl mx-auto text-gray-400" />
//             <p className="text-gray-500 mt-4">Your cart is empty.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-6">
//               {/* Active Cart Items */}
//               {cartItems.map((item) => (
//                 <CartBookItem
//                   key={item._id}
//                   book={item.book || item.ebook}
//                   quantity={item.quantity}
//                   itemId={item._id}
//                   userId={item.user}
//                   isEbook={!!item.ebook}
//                   onQuantityChange={updateQuantity}
//                   onRemove={removeItem}
//                   onSaveForLater={handleSaveForLater}
//                 />
//               ))}

//               {/* Saved for Later Items */}
//               {savedItems.length > 0 && (
//                 <div className="mt-8">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved for Later</h2>
//                   <div className="space-y-4">
//                     {savedItems.map((item) => (
//                       <CartBookItem
//                         key={item._id}
//                         book={item.book || item.ebook}
//                         quantity={item.quantity}
//                         itemId={item._id}
//                         userId={item.user}
//                         isEbook={!!item.ebook}
//                         onQuantityChange={updateQuantity}
//                         onRemove={removeItem}
//                         onSaveForLater={handleSaveForLater}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Order Summary */}
//             <div className="bg-white p-6 rounded shadow sticky top-8 h-fit">
//               <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
//               <div className="space-y-3 text-sm text-gray-700">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
//                 </div>
//                 {discount > 0 && (
//                   <div className="flex justify-between text-green-600 font-medium">
//                     <span>Discount</span>
//                     <span>-₹{discount.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <hr className="my-2" />
//                 <div className="flex justify-between font-semibold text-gray-900 text-base">
//                   <span>Total</span>
//                   <span>₹{total.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Promo code input */}
//               <div className="mt-4 flex gap-2">
//                 <input
//                   type="text"
//                   value={promoCode}
//                   onChange={(e) => setPromoCode(e.target.value)}
//                   placeholder="Enter coupon"
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
//                 />
//                 <button
//                   onClick={applyPromoCode}
//                   className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
//                 >
//                   Apply
//                 </button>
//               </div>
//               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//               {/* Checkout button */}
//               <button
//                 onClick={handleProceedToCheckout}
//                 className="mt-6 w-full py-3 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;
'use client';

import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import CartBookItem from '@/components/cart/CartItem';

const CartPage = () => {
  const { user } = useUser();
  const clerkUserId = user?.id;
  const router = useRouter();

  // Zustand state selectors
  const cart = useCartStore((state) => state.cart);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const saveForLater = useCartStore((state) => state.saveForLater);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  // Fetch cart when user logs in
  useEffect(() => {
    if (clerkUserId) fetchCart(clerkUserId);
  }, [clerkUserId, fetchCart]);

  const handleSaveForLater = (itemId, userId, isEbook) => {
    saveForLater(itemId, userId, isEbook);
  };

  // Separate active and saved items
  const cartItems = cart.filter((item) => !item.savedForLater && !item.EsavedForLater);
  const savedItems = cart.filter((item) => item.savedForLater || item.EsavedForLater);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.book?.finalPrice || item.ebook?.finalPrice || item.book?.price || item.ebook?.price) * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 29.99;
  const total = subtotal + shipping - discount;

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      setError('');
    } else {
      setDiscount(0);
      setError('Invalid promo code');
    }
  };

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    if (!cartItems.length) {
      alert('Your cart is empty.');
      return;
    }

    const checkoutData = {
      userId: clerkUserId,
      items: cartItems.map((item) => ({
        book: item.book?._id || item.ebook?._id,
        quantity: item.quantity,
        priceAtPurchase: item.book?.finalPrice || item.ebook?.finalPrice || item.book?.price || item.ebook?.price,
        discountPercentAtPurchase: item.book?.discountPercent || item.ebook?.discountPercent || 0,
      })),
      totalAmount: total.toFixed(2),
    };

    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <FiShoppingCart className="text-4xl mx-auto text-gray-400" />
            <p className="text-gray-500 mt-4">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <CartBookItem
                  key={item._id}
                  book={item.book || item.ebook}
                  quantity={item.quantity}
                  itemId={item._id}
                  userId={item.user}
                  isEbook={!!item.ebook}
                  onQuantityChange={updateQuantity}
                  onRemove={removeItem}
                  onSaveForLater={handleSaveForLater}
                />
              ))}

              {savedItems.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved for Later</h2>
                  <div className="space-y-4">
                    {savedItems.map((item) => (
                      <CartBookItem
                        key={item._id}
                        book={item.book || item.ebook}
                        quantity={item.quantity}
                        itemId={item._id}
                        userId={item.user}
                        isEbook={!!item.ebook}
                        onQuantityChange={updateQuantity}
                        onRemove={removeItem}
                        onSaveForLater={handleSaveForLater}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded shadow sticky top-8 h-fit">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-gray-900 text-base">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter coupon"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <button
                  onClick={applyPromoCode}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                >
                  Apply
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button
                onClick={handleProceedToCheckout}
                className="mt-6 w-full py-3 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

