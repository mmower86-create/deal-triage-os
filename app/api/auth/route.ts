import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { password } = await request.json();
  const correctPassword = process.env.NEXT_PROTECT_PASSWORD;

  if (password === correctPassword) {
    // Get the cookies store first, then set the cookie
    const cookieStore = await cookies();
    cookieStore.set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Invalid password" },
    { status: 401 }
  );
}