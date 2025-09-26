import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/modals/User.modal";
import Wishlist from "@/modals/Wishlist.modal";

export async function POST(req, { params }) {
  await dbConnect();

  try {
    const productId = params.bookId;
    const { clerkUserId, type } = await req.json(); // type = 'book' or 'ebook'

    if (!clerkUserId || !productId || !["book", "ebook"].includes(type)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // find user
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // check existing wishlist item
    const query = { user: user._id, [type]: productId };
    const existing = await Wishlist.findOne(query);

    if (existing) {
      // remove from wishlist
      await Wishlist.deleteOne({ _id: existing._id });
      await User.updateOne(
        { _id: user._id },
        { $pull: { wishlists: existing._id } } // ✅ correct field name
      );

      return NextResponse.json({
        message: "Removed from wishlist",
        status: "removed",
        itemId: existing._id,
      });
    }

    // add new wishlist item
    const wishlistItem = await Wishlist.create({ user: user._id, [type]: productId });
    user.wishlists.push(wishlistItem._id); // ✅ correct field name
    await user.save();

    return NextResponse.json({
      message: "Added to wishlist",
      status: "added",
      item: wishlistItem,
    });
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
