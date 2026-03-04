import { NextResponse } from "next/server";

export async function POST() {
  // This is a placeholder. Replace with MongoDB-backed registration logic later.
  return NextResponse.json(
    { message: "Registration not implemented yet" },
    { status: 501 },
  );
}

