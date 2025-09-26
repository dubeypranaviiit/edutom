import dbConnect from "@/config/db";
import Rating from "@/modals/Rating.modal";
import Book from "@/modals/Book.modal";

export async function POST(req, { params }) {
  try {
    await dbConnect();
    const { id } = params; // book id
    const { clerkUserId, rating, review } = await req.json();

    if (!clerkUserId || !rating) return new Response(JSON.stringify({ message: "User or rating missing" }), { status: 400 });

    // Upsert rating
    const existing = await Rating.findOne({ book: id, userId: clerkUserId });
    if (existing) {
      existing.rating = rating;
      existing.review = review;
      await existing.save();
    } else {
      await Rating.create({ book: id, userId: clerkUserId, rating, review });
    }

    // Recalculate average rating & total ratings
    const agg = await Rating.aggregate([
      { $match: { book: mongoose.Types.ObjectId(id) } },
      { $group: { _id: "$book", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    const avgRating = agg[0]?.avgRating || 0;
    const count = agg[0]?.count || 0;

    // Optionally update Book schema for quick display
    await Book.findByIdAndUpdate(id, { rating: avgRating, ratingsCount: count });

    return new Response(JSON.stringify({ avgRating, count, message: "Rating submitted" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
