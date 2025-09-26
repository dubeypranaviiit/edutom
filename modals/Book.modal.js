import mongoose from "mongoose";
import { Schema } from "mongoose";
const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },

    category: { type: String, required: true },
    language: { type: String, required: true },
    publicationDate: { type: Date },
    publisher: { type: String },

    coverImage: { type: String, required: true },

    stock: { type: Number, default: 0 },         
    sold: { type: Number, default: 0 },        
    ordersPlaced: { type: Number, default: 0 },  
    ordersCancelled: { type: Number, default: 0 }, 

    rating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], 

    formats: [{ type: String }],
    tags: [{ type: String }],

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);


BookSchema.virtual('finalPrice').get(function () {
  return this.price - (this.price * (this.discountPercent || 0)) / 100;
});


BookSchema.virtual('available').get(function () {
  return this.stock - this.sold;
});

BookSchema.set('toJSON', { virtuals: true });
BookSchema.set('toObject', { virtuals: true });

const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);
export default Book;
