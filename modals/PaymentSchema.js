import mongoose from "mongoose";
const { Schema } = mongoose;

const PaymentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Schema.Types.ObjectId, refPath: "orderModel" }, 
    orderModel: { type: String, enum: ["BookOrder", "EbookOrder"], required: true }, 

    paymentProvider: { type: String, enum: ["stripe", "cod"], required: true },
    paymentId: { type: String }, // Stripe paymentIntent id or null for COD
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    status: {
      type: String,
      enum: ["pending", "processing", "paid", "failed", "refunded"],
      default: "pending",
    },

    receiptUrl: { type: String }, 
    meta: { type: Object }, 
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
export default Payment;
