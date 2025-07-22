import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { sendMail } from "@/lib/mailer";

function getEmailFromPayload(payload: any): string | null {
  if (typeof payload === "object" && payload && "email" in payload) {
    return payload.email;
  }
  return null;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  const email = getEmailFromPayload(payload);
  if (!email) return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
  const { service, date, time } = await req.json();
  if (!service || !date || !time) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const db = await getDb();
  const booking = {
    user: email,
    service,
    date,
    time,
    createdAt: new Date(),
  };
  // Prevent double booking for the same service, date, and time
  const existing = await db.collection("bookings").findOne({ service, date, time });
  if (existing) {
    return NextResponse.json({ error: "This time slot is already booked. Please choose another time." }, { status: 409 });
  }
  await db.collection("bookings").insertOne(booking);
  // Fetch user details for confirmation email
  const userDoc = await db.collection("users").findOne({ email });
  if (userDoc) {
    await sendMail({
      to: userDoc.email,
      subject: "Your GroomHaus Appointment Confirmation",
      text: `Dear ${userDoc.name},\n\nYour appointment for ${service} is confirmed.\nDate: ${new Date(date).toLocaleDateString()}\nTime: ${time}\n\nThank you for booking with GroomHaus!`,
      html: `<p>Dear <b>${userDoc.name}</b>,</p><p>Your appointment for <b>${service}</b> is confirmed.</p><ul><li><b>Date:</b> ${new Date(date).toLocaleDateString()}</li><li><b>Time:</b> ${time}</li></ul><p>Thank you for booking with GroomHaus!</p>`
    });
  }
  return NextResponse.json({ success: true, booking });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url!);
  const service = url.searchParams.get("service");
  const date = url.searchParams.get("date");
  if (date && !service) {
    // Fetch bookings for a specific date (all services)
    const db = await getDb();
    const bookings = await db.collection("bookings")
      .find({ date })
      .toArray();
    return NextResponse.json({ bookings });
  }
  if (service && date) {
    // Fetch bookings for a specific service and date
    const db = await getDb();
    const bookings = await db.collection("bookings")
      .find({ service, date })
      .toArray();
    return NextResponse.json({ bookings });
  }
  // Default: fetch bookings for the logged-in user
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  const email = getEmailFromPayload(payload);
  if (!email) return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
  const db = await getDb();
  const bookings = await db.collection("bookings")
    .find({ user: email })
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json({ bookings });
} 