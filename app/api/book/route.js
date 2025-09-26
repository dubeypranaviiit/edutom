import { NextResponse } from 'next/server';
import Book from '@/modals/Book.modal';
import dbConnect from '@/config/db';
import { uploadToCloudinary } from '@/config/cloudinary';
// export async function POST(req) {
//   await dbConnect();
//   const formData = await req.formData();

//   try {
//     const coverImageFile = formData.get('coverImage');

//     if (!coverImageFile || typeof coverImageFile === 'string') {
//       return NextResponse.json({ success: false, message: 'Image is required' }, { status: 400 });
//     }

//     const buffer = Buffer.from(await coverImageFile.arrayBuffer());
//     const uploadedImage = await uploadToCloudinary(buffer, `book-${Date.now()}`);

//     const newBook = new Book({
//       title: formData.get('title')?.trim(),
//       slug: formData.get('slug')?.trim().toLowerCase(),
//       author: formData.get('author')?.trim(),
//       description: formData.get('description')?.trim(),
//       price: parseFloat(formData.get('price')),
//       discountPercent: parseFloat(formData.get('discountPercent') || 0),
//       category: formData.get('category'),
//       language: formData.get('language'),
//       publicationDate: formData.get('publicationDate') ? new Date(formData.get('publicationDate')) : null,
//       publisher: formData.get('publisher')?.trim(),
//       coverImage: uploadedImage.secure_url,
//       stock: parseInt(formData.get('stock') || 0),
//       formats: formData.getAll('formats[]') || [],
//       tags: formData.getAll('tags[]') || [],
//       isPublished: formData.get('isPublished') === 'true',
//     });

//    const books= await newBook.save();
//  console.log(books);
//     return NextResponse.json({ success: true, book: newBook });
//   } catch (err) {
//     console.error('Add Book Error:', err);
//     return NextResponse.json({ success: false, message: 'Failed to add book' }, { status: 500 });
//   }
// }
export async function GET() {
  await dbConnect();

  try {
    const books = await Book.find().sort({ createdAt: -1 }); 
    console.log(books);
    return NextResponse.json({ success: true, books });
  } catch (err) {
    console.error('Get Books Error:', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch books' }, { status: 500 });
  }
}