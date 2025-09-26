import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import BookOrder from "@/modals/BookOrder.modal";
import Book from "@/modals/Book.modal";
import User from "@/modals/User.modal";

export async function POST(req) {
  await dbConnect();

  try {
    const { userId, addressId, items, totalAmount } = await req.json();

    if (!userId || !addressId || !items || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find user in DB
    const user = await User.findOne({ 
clerkUserId: userId });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Update stock for each book
    for (const it of items) {
      await Book.findByIdAndUpdate(it.book, {
        $inc: { stock: -it.quantity, sold: it.quantity },
      });
    }

    // Create COD order
    const order = await BookOrder.create({
      user: user._id,
      address: addressId,
      items: items.map((it) => ({
        book: it.book,
        quantity: it.quantity,
        priceAtPurchase: it.priceAtPurchase,
        discountPercentAtPurchase: it.discountPercentAtPurchase || 0,
      })),
      totalAmount,
      paymentMethod: "cod",   // COD payment method
      paymentStatus: "pending", // COD starts as pending
    });

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
