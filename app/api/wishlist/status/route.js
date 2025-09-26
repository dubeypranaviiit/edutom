import { NextResponse } from 'next/server';
import dbConnect from '@/config/db';
import User from '@/modals/User.modal';
import Wishlist from '@/modals/Wishlist.modal';

export async function GET(req) {
  await dbConnect();

  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get('productId');
    const type = url.searchParams.get('type'); // "book" or "ebook"
    const clerkUserId = url.searchParams.get('clerkUserId');

    if (!productId || !type || !clerkUserId) {
      return NextResponse.json({ status: false, error: 'Missing parameters' });
    }

    const user = await User.findOne({ clerkUserId }).select('_id');
    if (!user) {
      return NextResponse.json({ status: false, error: 'User not found' });
    }

    // Create a dynamic query based on type
    const query =
      type === 'book'
        ? { user: user._id, book: productId }
        : { user: user._id, ebook: productId };

    const wishlistEntry = await Wishlist.findOne(query);

    return NextResponse.json({ isWishlisted: !!wishlistEntry });
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return NextResponse.json({ status: false, error: 'Server error' }, { status: 500 });
  }
}
