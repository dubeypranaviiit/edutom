import mongoose from "mongoose";
const { Schema } = mongoose;

const EbookOrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        ebook: { type: Schema.Types.ObjectId, ref: "Ebook", required: true },
        priceAtPurchase: { type: Number, required: true },
        discountPercentAtPurchase: { type: Number, default: 0 },
        licenseType: {
          type: String,
          enum: ["single-user", "multi-user", "rental", "unlimited"],
          default: "single-user",
        },
        rentalExpiresAt: { type: Date }, 
      },
    ],

    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refunded"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay", "stripe"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    downloadLinks: [
      {
        ebookId: { type: Schema.Types.ObjectId, ref: "Ebook" },
        url: { type: String }, // Secure Cloudinary link or temp signed URL
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const EbookOrder =
  mongoose.models.EbookOrder ||
  mongoose.model("EbookOrder", EbookOrderSchema);
export default EbookOrder;
