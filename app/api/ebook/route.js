import { NextResponse } from 'next/server';
import Ebook from '@/modals/EBook.modal'; // Your updated eBook model
import dbConnect from '@/config/db';
import { uploadToCloudinary } from '@/config/cloudinary';


export async function GET() {
  try {
    await dbConnect();
    const ebooks = await Ebook.find({ isPublished: true }).sort({ createdAt: -1 });
    return NextResponse.json(ebooks); // ✅ should be an array
  } catch (err) {
    return NextResponse.json({ message: 'Error fetching eBooks' }, { status: 500 });
  }
}