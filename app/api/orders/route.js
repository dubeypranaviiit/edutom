import dbConnect from "@/config/db";
import BookOrder from "@/modals/BookOrder.modal";
import Book from "@/modals/Book.modal";
import User from "@/modals/User.modal";
import Address from "@/modals/Address.modal";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const clerkUserId = url.searchParams.get('clerkUserId');

    if (!clerkUserId) {
      return NextResponse.json({ error: 'Missing clerkUserId' }, { status: 400 });
    }

    const user = await User.findOne({clerkUserId });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

const orders = await BookOrder.find({ user: user._id })
  .sort({ createdAt: -1 })
  .populate({ path: 'items.book', model: Book })
  .populate('address'); // <--- Add this

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.error('Error fetching orders:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await dbConnect();
    const { clerkUserId, orderId } = await req.json();

    if (!clerkUserId || !orderId) {
      return NextResponse.json({ error: 'Missing clerkUserId or orderId' }, { status: 400 });
    }

    const user = await User.findOne({  clerkUserId });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const order = await BookOrder.findOne({ _id: orderId, user: user._id });

    if (!order) {
      return NextResponse.json({ error: 'Order not found or unauthorized' }, { status: 404 });
    }

    if (['shipped', 'delivered', 'cancelled', 'returned'].includes(order.status)) {
      return NextResponse.json({ error: `Cannot cancel order in status: ${order.status}` }, { status: 400 });
    }

    order.status = 'cancelled';
    order.cancelledAt = new Date();
    await order.save();

    return NextResponse.json({ success: true, message: 'Order cancelled successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error cancelling order:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}