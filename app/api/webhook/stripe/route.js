import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/config/db";
import Book from "@/modals/Book.modal";
import BookOrder from "@/modals/BookOrder.modal";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.success_url?.split("orderId=")[1];

    if (orderId) {
      const order = await BookOrder.findById(orderId).populate("items.book");
      if (order) {
       
        order.paymentStatus = "paid";
        await order.save();

    
        for (const it of order.items) {
          await Book.findByIdAndUpdate(it.book, {
            $inc: { sold: it.quantity, stock: -it.quantity }
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
