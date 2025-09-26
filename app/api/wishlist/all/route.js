import { NextResponse } from 'next/server';
import dbConnect from '@/config/db';
import User from '@/modals/User.modal';
import Wishlist from '@/modals/Wishlist.modal';

export async function GET(req) {
  await dbConnect();

  try {
    const url = new URL(req.url);
    const clerkUserId = url.searchParams.get('clerkUserId');

    if (!clerkUserId) {
      return NextResponse.json({ wishlist: [] });
    }

    // 1. Find user
    const user = await User.findOne({ clerkUserId }).select('_id');
    if (!user) {
      return NextResponse.json({ wishlist: [] });
    }

    // 2. Fetch wishlist items
    const wishlistItems = await Wishlist.find({ user: user._id })
      .populate('book')
      .populate('ebook');

    // 3. Map and sanitize
    const wishlist = wishlistItems
      .map((item) => {
        const ref = item.book || item.ebook;
        if (!ref) return null;

        return {
          _id: item._id,
          productId: ref._id,
          type: item.book ? 'book' : 'ebook',
          title: ref.title || 'Untitled',
          image: ref.coverImage || '/default.jpg',
          price: ref.price || 0,
          originalPrice: ref.originalPrice || ref.price || 0,
          discount: ref.discountPercent ? `${ref.discountPercent}%` : '',
          available: ref.available ?? true,
        };
      })
      .filter(Boolean);
    console.log('hiiiiiiiiii',wishlist);
    return NextResponse.json({ wishlist });
  } catch (error) {
    console.error('Wishlist fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
  }
}
