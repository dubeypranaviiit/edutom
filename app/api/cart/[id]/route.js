import dbConnect from "@/config/db";
import User from "@/modals/User.modal";
import CartItem from "@/modals/Cart.modal";
import Book from "@/modals/Book.modal";
import { NextResponse } from "next/server";
export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;
  const { userId, quantity } = await req.json();

  if (!userId || !id) return NextResponse.json({ error: 'Missing userId or id' }, { status: 400 });

  const item = await CartItem.findOneAndUpdate(
    { _id: id, user: userId },
    { quantity },
    { new: true }
  );

  return NextResponse.json(item);
}

export async function DELETE(req, { params }) {
  await dbConnect();
 try{
     const { id } = params;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId || !id) return NextResponse.json({ error: 'Missing userId or id' }, { status: 400 });

  await CartItem.findOneAndDelete({ _id: id, user: userId });
  return NextResponse.json({ message: 'Item removed' });
 }catch(error){
       return NextResponse.json({ message: 'Item removed' });
 }
}
