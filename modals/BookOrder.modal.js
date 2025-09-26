import mongoose from "mongoose";
const { Schema } = mongoose;

const BookOrderSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: Schema.Types.ObjectId, ref: "Address", required: true },

    items: [
      {
        book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        quantity: { type: Number, required: true, min: 1 },
        priceAtPurchase: { type: Number, required: true },
        discountPercentAtPurchase: { type: Number, default: 0 },
      },
    ],

    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay", "stripe","braintree"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded","processing"],
      default: "pending",
    },

    trackingId: { type: String },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },

    notes: { type: String },
  },
  { timestamps: true }
);

const BookOrder =
  mongoose.models.BookOrder || mongoose.model("BookOrder", BookOrderSchema);
export default BookOrder;
