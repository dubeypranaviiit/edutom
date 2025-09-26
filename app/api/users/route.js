import User from "@/modals/User.modal";
import dbConnect from "@/config/db";
import { NextResponse } from "next/server";
export async function POST(req) {
  await dbConnect();
  const { clerkUserId, name, email, phone } = await req.json();

  try {

    const existingUser = await User.findOne({ clerkUserId });

    if (existingUser) {
      return new Response(JSON.stringify(existingUser), { status: 200 });
    }
    const newUser = await User.create({
      clerkUserId,
      name: name || "Anonymous",     // fallback if name not provided
      email: email || null,          // optional field
      phone: phone || null,          // optional field
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("User creation error:", error);
    return new Response(JSON.stringify({ error: "User creation failed" }), { status: 500 });
  }
}
export async function GET(req) {
   const { searchParams } = new URL(req.url);
  const clerkUserId = searchParams.get("clerkUserId");

  if (!clerkUserId) {
    return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
  }
 await dbConnect();
  try {
   
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function PUT(req) {
  await dbConnect();
  try {
    const { clerkUserId, name, phone, gender } = await req.json();

    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
    }

  

    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId },
      { name, phone, gender },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}