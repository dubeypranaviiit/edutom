import { gateway } from "@/config/braintree";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const { clientToken } = await gateway.clientToken.generate({});
    return NextResponse.json({ clientToken });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
