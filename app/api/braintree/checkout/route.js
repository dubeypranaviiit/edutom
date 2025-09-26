import { NextResponse } from 'next/server';
import dbConnect from '@/config/db';
import BookOrder from '@/modals/BookOrder.modal';
import User from '@/modals/User.modal';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId, addressId, items, totalAmount, paymentMethodNonce } = body;

    // 1. Validate input
    if (!userId || !addressId || !items || !items.length || !paymentMethodNonce) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Get App User by Clerk ID
    const appUser = await User.findOne({ clerkUserId: userId });
    if (!appUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 3. Create Order
    const newOrder = await BookOrder.create({
      user: appUser._id,
      address: addressId,
      items: items.map((i) => ({
        book: i.book,
        quantity: i.quantity,
        priceAtPurchase: i.priceAtPurchase,
        discountPercentAtPurchase: i.discountPercentAtPurchase || 0,
      })),
      totalAmount: parseFloat(totalAmount),
      paymentMethod: 'razorpay',
      paymentStatus: 'paid',
      status: 'pending',
    });

    // 4. Update book statistics
    for (const item of items) {
      await Book.findByIdAndUpdate(
        item.book,
        {
          $inc: {
            sold: item.quantity,
            ordersPlaced: 1,
          },
        },
        { new: true }
      );
    }

    // 5. Respond
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });

  } catch (error) {
    console.error('POST /api/braintree/checkout error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}