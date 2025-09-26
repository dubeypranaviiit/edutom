import mongoose, { Schema } from "mongoose";

const RatingSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: String, required: true }, // Clerk user ID
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String }, // optional review text
  },
  { timestamps: true }
);

// Ensure one rating per user per book
RatingSchema.index({ book: 1, userId: 1 }, { unique: true });

const Rating = mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
export default Rating;
