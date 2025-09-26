import Stripe from 'stripe';
import dbConnect from '@/config/db';
import BookOrder from '@/modals/BookOrder.modal';
import Book from '@/modals/Book.modal';
import User from '@/modals/User.modal';
import { NextResponse } from 'next/server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();

  try {
    const { userId, addressId, items, totalAmount } = await req.json();

    // Find the user _id from clerkId
    const user = await User.findOne({ clerkUserId: userId });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Create BookOrder with paymentStatus: pending
    const order = await BookOrder.create({
      user: user._id,
      address: addressId,
      items: items.map(it => ({
        book: it.book,
        quantity: it.quantity,
        priceAtPurchase: it.priceAtPurchase,
        discountPercentAtPurchase: it.discountPercentAtPurchase || 0,
      })),
      totalAmount,
      paymentMethod: 'stripe',
      paymentStatus: 'pending',
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(it => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: it.bookTitle || 'Book', // optional
          },
          unit_amount: Math.round(it.priceAtPurchase * 100),
        },
        quantity: it.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?canceled=true`,
      metadata: {
        orderId: order._id.toString(),
        userId: user._id.toString(),
      },
    });
   console.log(`done`);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Stripe checkout failed' }, { status: 500 });
  }
}
