import { NextResponse } from 'next/server';
import Ebook from '@/modals/EBook.modal';
import dbConnect from '@/config/db';
export async function GET(_, { params }) {
  await dbConnect();
  const { id } = params;
    
  try {
    const ebook = await Ebook.findById(id);
    console.log(ebook);
    if (!ebook) {
      return NextResponse.json({ success: false, message: 'eBook not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, ebook }, { status: 200 });
  } catch (error) {
    console.log('GET eBook Error:', error);
    return NextResponse.json({ success: false, message: 'Invalid eBook ID or server error' }, { status: 500 });
  }
}

