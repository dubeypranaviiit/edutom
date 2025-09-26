import mongoose from 'mongoose';
const { Schema } = mongoose;

const CartItemSchema = new Schema(
  {
    user: { type: String, required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    ebook: { type: Schema.Types.ObjectId, ref: 'Ebook' },

    format: { type: String, enum: ['physical', 'ebook'], required: true },

    quantity: { type: Number, default: 1, min: 1 },

    savedForLater: { type: Boolean, default: false },
    EsavedForLater: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CartItemSchema.index(
  { user: 1, book: 1, savedForLater: 1 },
  {
    unique: true,
    partialFilterExpression: { book: { $exists: true } },
  }
);

CartItemSchema.index(
  { user: 1, ebook: 1, EsavedForLater: 1 },
  {
    unique: true,
    partialFilterExpression: { ebook: { $exists: true } },
  }
);

const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
export default CartItem;
