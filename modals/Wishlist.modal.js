import mongoose from 'mongoose';
const { Schema } = mongoose;

const WishlistSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    ebook: { type: Schema.Types.ObjectId, ref: 'Ebook' },
  },
  { timestamps: true }
);

WishlistSchema.index({ user: 1, book: 1 }, { unique: true, partialFilterExpression: { book: { $exists: true } } });
WishlistSchema.index({ user: 1, ebook: 1 }, { unique: true, partialFilterExpression: { ebook: { $exists: true } } });

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
export default Wishlist;
