import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import Book from "@/modals/Book.modal";
import Rating from "@/modals/Rating.modal";

export async function POST(req, { params }) {
  await dbConnect();

  try {
    const { id } = params; 
    const { clerkUserId, rating, review } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    await Rating.findOneAndUpdate(
      { book: id, userId: clerkUserId },
      { rating, review },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    const stats = await Rating.aggregate([
      { $match: { book: book._id } },
      {
        $group: {
          _id: "$book",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      book.rating = stats[0].avgRating;
      book.ratingsCount = stats[0].count;
    } else {
      book.rating = 0;
      book.ratingsCount = 0;
    }

    await book.save();

    return NextResponse.json({
      message: "Rating saved",
      averageRating: book.rating,
      reviewsCount: book.ratingsCount,
    });
  } catch (error) {
    console.error("Error updating rating:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const clerkUserId = searchParams.get("clerkUserId");

    if (clerkUserId) {
  
      const userRating = await Rating.findOne({ book: id, userId: clerkUserId });
      return NextResponse.json({
        rating: userRating?.rating || 0,
        review: userRating?.review || "",
      });
    }

 
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const reviews = await Rating.find({ book: id }).select("userId rating review createdAt");

    return NextResponse.json({
      averageRating: book.rating || 0,
      reviewsCount: book.ratingsCount || 0,
      reviews, 
    });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
