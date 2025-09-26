import Address from "@/modals/Address.modal";
import dbConnect from "@/config/db";
import User from "@/modals/User.modal";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const clerkUserId = url.searchParams.get('clerkUserId');
    console.log(`clerkuser id :${clerkUserId}`);
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Missing clerkUserId' }, { status: 400 });
    }
 console.log(clerkUserId);
    const user = await User.findOne({ clerkUserId }).populate('address');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
 console.log(user);
    return NextResponse.json({ success: true, addresses: user.address });
  } catch (error) {
    console.error('Error fetching address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}