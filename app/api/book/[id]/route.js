import { NextResponse } from 'next/server';
import Book from '@/modals/Book.modal';
import dbConnect from '@/config/db';
import Wishlist from '@/modals/Wishlist.modal';
// export async function GET(_, { params }) {
//   await dbConnect();
//   const { id } = params;

//   try {
//     const book = await Book.findById(id); // includes related review docs
//     if (!book) {
//       return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, book }, { status: 200 });
//   } catch (error) {
//     console.error('GET Book Error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Invalid book ID or server error' },
//       { status: 500 }
//     );
//   }
// }
export async function GET(request, context) {
  await dbConnect();

  const { id } = context.params; // ✅ Correct way
 console.log(id);
  try {
    const book = await Book.findById(id);
    
 
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const finalPrice = book.price - (book.price * (book.discountPercent || 0)) / 100;

    return NextResponse.json({
      ...book,
      finalPrice: Math.round(finalPrice * 100) / 100,
    });
  } catch (error) {
    console.error('Book fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}