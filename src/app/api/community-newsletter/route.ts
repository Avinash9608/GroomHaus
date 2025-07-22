import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  const db = await getDb();
  const existing = await db.collection("newsletter").findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "You are already subscribed!" }, { status: 409 });
  }
  await db.collection("newsletter").insertOne({ email, name, subscribedAt: new Date() });
  return NextResponse.json({
    success: true,
    message: `🎉 Thank you${name ? ", " + name : ""} for subscribing to our community newsletter!\n\nYou will now receive the latest updates, offers, and news from GroomHaus. Stay tuned!`
  });
} 