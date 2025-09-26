import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    clerkUserId: { type: String, required: true, unique: true, index: true },
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    cartItems: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
    wishlists: [{ type: Schema.Types.ObjectId, ref: "Wishlist" }],

    bookOrders: [{ type: Schema.Types.ObjectId, ref: "BookOrder" }],
    ebookOrders: [{ type: Schema.Types.ObjectId, ref: "EBookOrder" }],

  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
