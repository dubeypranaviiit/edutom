import { NextResponse } from 'next/server';
import Book from '@/modals/Book.modal';
import dbConnect from '@/config/db';
export async function GET() {
  try {
    await dbConnect();

    const books = await Book.find({ rating: { $gte: 0} })
      .sort({ rating: -1 })
      .limit(20); // adjust as needed

    return NextResponse.json({ success: true, books });
  } catch (error) {
    console.error("Error fetching top-rated books:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch books" }, { status: 500 });
  }
}