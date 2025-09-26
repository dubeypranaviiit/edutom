import dbConnect from "@/config/db";
import CartItem from "@/modals/Cart.modal";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await dbConnect();

  const { id } = params;
  const { userId, EsavedForLater } = await req.json();

  if (!userId || typeof EsavedForLater !== 'boolean') {
    return NextResponse.json({ error: 'Missing userId or EsavedForLater' }, { status: 400 });
  }

  try {
    const updated = await CartItem.findOneAndUpdate(
      {
        _id: id,
        user: userId,
        ebook: { $exists: true },
      },
      { EsavedForLater },
      { new: true }
    ).populate("ebook");

    if (!updated) {
      return NextResponse.json({ error: 'EBook cart item not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
