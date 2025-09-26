import { NextResponse } from "next/server";

import Book from "@/modals/Book.modal";
import dbConnect from "@/config/db";
export async function GET() {
  try {
    await dbConnect();

    const books = await Book.find().sort({ createdAt: -1 }).limit(20); // latest 20 books

    return NextResponse.json({ success: true, books });
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch books" }, { status: 500 });
  }
}