import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  if (!email || !otp) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const db = await getDb();
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (user.emailVerified) {
    return NextResponse.json({ error: "Email already verified" }, { status: 400 });
  }
  if (user.otp !== otp || !user.otpExpiry || new Date(user.otpExpiry) < new Date()) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }
  await db.collection("users").updateOne(
    { email },
    { $set: { emailVerified: true }, $unset: { otp: "", otpExpiry: "" } }
  );
  const token = jwt.sign({ email, name: user.name }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  const res = NextResponse.json({ token, user: { name: user.name, email } });
  res.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
} 