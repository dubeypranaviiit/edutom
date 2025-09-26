import dbConnect from "@/config/db";
import User from "@/modals/User.modal";
import CartItem from "@/modals/Cart.modal";
import Book from "@/modals/Book.modal";
import Ebook from "@/modals/EBook.modal";
import { NextResponse } from "next/server";

// export async function GET(req) {
//   await dbConnect();
//   try {
//     const { searchParams } = new URL(req.url);
//     const clerkUserId = searchParams.get("clerkUserId");
//   console.log(clerkUserId);
//     if (!clerkUserId)
//       return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });

//   const user = await User.findOne({ clerkUserId });
//     if (!user)
//       return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const items = await CartItem.find({ user: user._id, savedForLater: false })
//       .populate("book")
//       .populate("ebook");

//     return NextResponse.json(items);
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Something went wrong", error },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   await dbConnect();
//   try {
//     const { searchParams } = new URL(req.url);
//     const clerkUserId = searchParams.get("clerkUserId");

//     if (!clerkUserId)
//       return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });

//     const user = await User.findOne({ clerkUserId });
//     if (!user)
//       return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const [cartItems, savedItems] = await Promise.all([
//       CartItem.find({ user: user._id, savedForLater: false })
//         .populate("book")
//         .populate("ebook"),
//       CartItem.find({ user: user._id, savedForLater: true })
//         .populate("book")
//         .populate("ebook"),
//     ]);

//     return NextResponse.json({
//       cartItems,
//       savedItems,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Something went wrong", error },
//       { status: 500 }
//     );
//   }
// }
// export async function GET(req) {
//   await dbConnect();
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get("userId");

//   if (!userId) {
//     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
//   }

//   try {
//     const cartItems = await CartItem.find({ user: userId })
//       .populate("book")
//       .populate("ebook");

//     return NextResponse.json(cartItems);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { clerkUserId, book, ebook, format, quantity = 1 } = body;
   console.log(clerkUserId);
    if (!clerkUserId || (!book && !ebook)) {
      return NextResponse.json(
        { error: "Missing clerkUserId or book/ebook" },
        { status: 400 }
      );
    }

 const user = await User.findOne({ clerkUserId });
    console.log(user);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const filter = {
      user: user._id,
      ...(book ? { book } : { ebook }),
      savedForLater: false,
    };

    const update = {
      user: user._id,
      ...(book ? { book } : { ebook }),
      format,
      savedForLater: false,
      $inc: { quantity }, 
    };

    const options = {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    };

    const cartItem = await CartItem.findOneAndUpdate(filter, update, options);

    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId"); // Clerk ID from frontend
  console.log("Backend received userId:", userId);

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // Find user in DB using the correct field
  const user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    console.error("User not found for clerkUserId:", userId);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const cartItems = await CartItem.find({ user: user._id })
      .populate("book")
      .populate("ebook")
      .lean();
   console.log(cartItems);
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
// PUT: update quantity
export async function PUT(req) {
  await dbConnect();
  const { id, userId, quantity } = await req.json();

  if (!id || !userId || !quantity) {
    return NextResponse.json({ error: "Missing id, userId, or quantity" }, { status: 400 });
  }

  try {
    const updated = await CartItem.findOneAndUpdate(
      { _id: id, user: userId },
      { quantity },
      { new: true }
    ).populate("book").populate("ebook");

    if (!updated) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: remove item
export async function DELETE(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!id || !userId) {
      return NextResponse.json({ error: "Missing id or userId" }, { status: 400 });
    }

    await CartItem.findOneAndDelete({ _id: id, user: userId });
    return NextResponse.json({ message: "Item removed" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: save for later
export async function PATCH(req) {
  await dbConnect();
  const { id, userId, savedForLater, isEbook } = await req.json();

  if (!id || !userId || typeof savedForLater !== "boolean") {
    return NextResponse.json({ error: "Missing id, userId or savedForLater" }, { status: 400 });
  }

  try {
    const query = isEbook
      ? { _id: id, user: userId, ebook: { $exists: true } }
      : { _id: id, user: userId, book: { $exists: true } };

    const update = isEbook
      ? { EsavedForLater: savedForLater }
      : { savedForLater };

    const updated = await CartItem.findOneAndUpdate(query, update, { new: true })
      .populate("book")
      .populate("ebook");

    if (!updated) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
