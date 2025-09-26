import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/database/dbConfig";
import Book from "@/database/models/bookSchema";
import BookOrder from "@/database/models/bookOrderSchema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { userId, addressId, items, totalAmount } = body;

    // Create order in DB with pending status
    const order = await BookOrder.create({
      user: userId,
      address: addressId,
      items: items.map((it) => ({
        book: it.bookId,
        quantity: it.quantity,
        priceAtPurchase: it.price,
        discountPercentAtPurchase: it.discountPercent || 0,
      })),
      totalAmount,
      paymentMethod: "stripe",
      paymentStatus: "pending",
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((it) => ({
        price_data: {
          currency: "inr",
          product_data: { name: it.title },
          unit_amount: Math.round(it.price * 100),
        },
        quantity: it.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/orders?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
