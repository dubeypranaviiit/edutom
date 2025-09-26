'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import Invoice from '@/components/invoice/Invoice';
import { generateInvoice } from '@/config/generateInvoice';
import  handlePrintInvoice from'@/config/printInvoice';
import {
  FaPrint,
  FaDownload,
  FaShoppingBag,
  FaTruck,
  FaQuestionCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const { user } = useUser();
  const clerkUserId = user?.id;
  const [orders, setOrders] = useState([]);
// const [visibleInvoice, setVisibleInvoice] = useState(false);
const [visibleInvoice, setVisibleInvoice] = useState(null);
  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders', {
        params: { clerkUserId },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      toast.error('Could not load orders');
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.patch('/api/orders', {
        clerkUserId,
        orderId,
      });

      if (res.data.success) {
        toast.success('Order cancelled!');
        fetchOrders(); 
      } else {
        toast.error(res.data.error || 'Unable to cancel order');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (clerkUserId) fetchOrders();
  }, [clerkUserId]);

  return (
    <div className="min-h-screen bg-white text-black p-6 font-sans">
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => {
          const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <div key={order._id} className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-10">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-serif text-[#2C3E50] mb-2">Order #{order._id}</h1>
                  <p className="text-gray-600">Placed on: {orderDate}</p>
                </div>
                <div className="flex gap-4">
                 <button onClick={() => handlePrintInvoice(order._id)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                              🖨️ Print Invoice
                                  </button>
                  <button
                    onClick={() => generateInvoice(order._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#D35400] text-white rounded-lg hover:bg-[#A04000]"
                  >
                    <FaDownload /> Invoice
                  </button>
                </div>
              </div>

              {/* Status & Payment */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 flex flex-wrap justify-between items-center gap-2">
                <span className={`px-4 py-1 rounded-full capitalize ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  Status: {order.status}
                </span>
                <span className="text-gray-600">Payment: {order.paymentStatus}</span>
                <span className="text-gray-600">Method: {order.paymentMethod.toUpperCase()}</span>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-serif text-[#2C3E50] mb-4">Shipping Address</h2>
                <div className="text-gray-700 space-y-1">
                  <p>{order.address?.fullName}</p>
                  <p>{order.address?.street}, {order.address?.city}</p>
                  <p>{order.address?.state} - {order.address?.pincode}</p>
                  <p>{order.address?.country}</p>
                  <p>Phone: {order.address?.phone}</p>
                  {order.address?.alternatePhone && <p>Alt Phone: {order.address.alternatePhone}</p>}
                  <p>Email: {order.address?.email}</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h2 className="text-xl font-serif mb-4 text-[#2C3E50]">Ordered Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.items.map((item, idx) => {
                    const book = item.book;
                    const finalPrice = item.priceAtPurchase - (item.priceAtPurchase * (item.discountPercentAtPurchase || 0)) / 100;

                    return (
                      <div key={book._id + idx} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                          <h3 className="font-serif text-lg font-medium">{book.title}</h3>
                          <p className="text-sm text-gray-500">{book.author}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-[#D35400] font-semibold">₹{finalPrice.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-serif text-[#2C3E50] mb-4">Order Summary</h2>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid:</span>
                  <span className="text-[#D35400] font-semibold">₹{order.totalAmount.toFixed(2)}</span>
                </div>
                {order.notes && (
                  <p className="text-sm text-gray-500 mt-2">Note: {order.notes}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                <button className="flex items-center gap-2 hover:text-[#D35400]">
                  <FaShoppingBag /> Reorder
                </button>
                <button className="flex items-center gap-2 hover:text-[#D35400]">
                  <FaTruck /> Track
                </button>
                <button className="flex items-center gap-2 hover:text-[#D35400]">
                  <FaQuestionCircle /> Help
                </button>
                {['pending', 'confirmed'].includes(order.status) && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <FaTimesCircle /> Cancel Order
                  </button>
                )}
              </div>

              
             {visibleInvoice === order._id && (
                <div id={`print-invoice-${order._id}`} className="mt-6 border-t pt-4">
                  <Invoice order={order} />
                </div>
              )} 
              <button
  onClick={() =>
    setVisibleInvoice(visibleInvoice === order._id ? null : order._id)
  }
  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
>
  🧾 {visibleInvoice === order._id ? 'Hide' : 'See'} Invoice
</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrdersPage;