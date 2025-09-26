import mongoose from "mongoose";
const { Schema } = mongoose;

const EbookSchema = new mongoose.Schema(
  {
    // General Info
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

    // eBook File or Link
    ebookUrl: { type: String, required: true }, // Cloudinary URL or Google Drive link
    uploadType: { type: String, enum: ['file', 'link'], default: 'file' },

    // File Details
    fileFormat: { type: String, enum: ['PDF', 'EPUB', 'MOBI'], default: 'PDF' },
    fileSize: { type: String }, // e.g. "5MB"
    drmProtected: { type: Boolean, default: false },

    // License
    licenseType: {
      type: String,
      enum: ['single-user', 'multi-user', 'rental', 'unlimited'],
      default: 'single-user',
    },
    maxDownloadsPerUser: { type: Number, default: 5 },

    // User Activity
    buyers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downloads: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        downloadedAt: { type: Date, default: Date.now },
      },
    ],
    renters: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        rentedAt: { type: Date, default: Date.now },
        expiresAt: { type: Date },
      },
    ],

    // Analytics
    totalDownloads: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    totalRents: { type: Number, default: 0 },

    // Tags & Status
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },

    // Reviews
    rating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true }
);

// Virtuals
EbookSchema.virtual('finalPrice').get(function () {
  return this.price - (this.price * (this.discountPercent || 0)) / 100;
});

EbookSchema.set('toJSON', { virtuals: true });
EbookSchema.set('toObject', { virtuals: true });

const Ebook = mongoose.models.Ebook || mongoose.model('Ebook', EbookSchema);
export default Ebook;
