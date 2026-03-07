import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const notes: string = body?.notes ?? "";

    if (!notes || notes.trim() === "") {
      return NextResponse.json(
        { error: "No seller notes provided." },
        { status: 400 }
      );
    }

    const response = await fetch("http://localhost:3001/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend analysis failed." },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch {
    return NextResponse.json(
      { error: "Invalid request or backend unreachable." },
      { status: 500 }
    );
  }
}