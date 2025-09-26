import dbConnect from "@/config/db";
import CartItem from "@/modals/Cart.modal";
import { NextResponse } from "next/server";

// export async function PATCH(req, { params }) {
//   await dbConnect();

//   const { id } = params;
//   const { userId, savedForLater } = await req.json();
// console.log(userId,savedForLater);
//   if (!userId || typeof savedForLater !== 'boolean') {
//     return NextResponse.json({ error: 'Missing userId or savedForLater' }, { status: 400 });
//   }

//   try {
//     const updated = await CartItem.findOneAndUpdate(
//       { _id: id, user: userId },
//       { savedForLater },
//       { new: true }
//     ).populate("book");

//     if (!updated) {
//       return NextResponse.json({ error: 'Item not found' }, { status: 404 });
//     }

//     return NextResponse.json(updated);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
export async function PATCH(req, { params }) {
  await dbConnect();

  const { id } = params; // CartItem _id
  const { userId, savedForLater, isEbook } = await req.json();

  if (!userId || typeof savedForLater !== 'boolean') {
    return NextResponse.json(
      { error: 'Missing userId or savedForLater' },
      { status: 400 }
    );
  }

  try {
    // Build query based on book type
    const query = isEbook
      ? { _id: id, user: userId, ebook: { $exists: true } }
      : { _id: id, user: userId, book: { $exists: true } };

    // Build update object
    const update = isEbook
      ? { EsavedForLater: savedForLater }
      : { savedForLater };

    // Update cart item and populate book/ebook details
    const updated = await CartItem.findOneAndUpdate(query, update, { new: true })
      .populate('book')
      .populate('ebook');

    if (!updated) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


