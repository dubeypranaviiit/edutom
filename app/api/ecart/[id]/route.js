import dbConnect from "@/config/db";
import CartItem from "@/modals/Cart.modal";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId || !id) {
      return NextResponse.json({ error: 'Missing userId or item id' }, { status: 400 });
    }

    await CartItem.findOneAndDelete({
      _id: id,
      user: userId,
      ebook: { $exists: true },
    });

    return NextResponse.json({ message: 'Ebook removed from cart' });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to delete eBook cart item',
      details: error.message,
    }, { status: 500 });
  }
}
