import mongoose, { Schema } from "mongoose";

const LikeSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: String, required: true }, // Clerk user ID or your User _id
  },
  { timestamps: true }
);

// Ensure one like per user per book
LikeSchema.index({ book: 1, userId: 1 }, { unique: true });

const Like = mongoose.models.Like || mongoose.model("Like", LikeSchema);
export default Like;
