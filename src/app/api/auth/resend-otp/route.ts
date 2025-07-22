import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { sendMail } from "@/lib/mailer";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }
  const db = await getDb();
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (user.emailVerified) {
    return NextResponse.json({ error: "Email already verified" }, { status: 400 });
  }
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await db.collection("users").updateOne(
    { email },
    { $set: { otp, otpExpiry } }
  );
  await sendMail({
    to: email,
    subject: "Your GroomHaus Email Verification OTP (Resent)",
    text: `Your new OTP is: ${otp}`,
    html: `<p>Your new OTP is: <b>${otp}</b></p>`
  });
  return NextResponse.json({ success: true, message: "OTP resent to email." });
} 