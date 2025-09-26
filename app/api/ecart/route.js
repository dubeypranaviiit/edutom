import dbConnect from "@/config/db";
import User from "@/modals/User.modal";
import CartItem from "@/modals/Cart.modal";
import Ebook from "@/modals/EBook.modal";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const clerkUserId = searchParams.get("clerkUserId");

    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const [eCartItems, eSavedItems] = await Promise.all([
      CartItem.find({ user: user._id, EsavedForLater: false, ebook: { $exists: true } }).populate("ebook"),
      CartItem.find({ user: user._id, EsavedForLater: true, ebook: { $exists: true } }).populate("ebook"),
    ]);

    return NextResponse.json({ eCartItems, eSavedItems });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
    console.log(`req came for ecart post add to lib`);
  await dbConnect();
  try {
    const body = await req.json();
    const { clerkUserId, ebook } = body;

    if (!clerkUserId || !ebook) {
      return NextResponse.json({ error: "Missing clerkUserId or ebook" }, { status: 400 });
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const filter = {
      user: user._id,
      ebook,
      EsavedForLater: false,
    };

    const update = {
      user: user._id,
      ebook,
      format: "ebook",
      EsavedForLater: false,
      quantity: 1, // always one per user
    };

    const options = {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    };

    const eCartItem = await CartItem.findOneAndUpdate(filter, update, options);

    return NextResponse.json(eCartItem);
  } catch (error) {
    console.log(`error hai ${error}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
