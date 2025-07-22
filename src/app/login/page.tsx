"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showVerifyMsg, setShowVerifyMsg] = useState(false);
  const router = useRouter();

  const loginForm = useForm<{ email: string; password: string }>();
  const registerForm = useForm<{ name: string; email: string; password: string }>();

  async function onLogin(data: { email: string; password: string }) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Login failed");
      const user = { name: result.user.name, email: result.user.email };
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Stored user in localStorage:", user);
      window.dispatchEvent(new Event("user-updated"));
      router.push("/");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onRegister(data: { name: string; email: string; password: string }) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Registration failed");
      setShowVerifyMsg(true);
      setTimeout(() => router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`), 1500);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-8">
          <div className="flex justify-center mb-8">
            <button
              className={`px-4 py-2 font-bold rounded-t-md transition-colors duration-200 ${tab === "login" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
              onClick={() => setTab("login")}
              disabled={tab === "login"}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 font-bold rounded-t-md transition-colors duration-200 ${tab === "register" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
              onClick={() => setTab("register")}
              disabled={tab === "register"}
            >
              Register
            </button>
          </div>
          {tab === "login" ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={loginForm.handleSubmit(onLogin)}
              autoComplete="on"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                {...loginForm.register("email", { required: true })}
                autoComplete="email"
              />
              <Input
                type="password"
                placeholder="Enter your password"
                {...loginForm.register("password", { required: true })}
                autoComplete="current-password"
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={registerForm.handleSubmit(onRegister)}
              autoComplete="on"
            >
              <Input
                type="text"
                placeholder="Enter your full name"
                {...registerForm.register("name", { required: true })}
                autoComplete="name"
              />
              <Input
                type="email"
                placeholder="Enter your email address"
                {...registerForm.register("email", { required: true })}
                autoComplete="email"
              />
              <Input
                type="password"
                placeholder="Create a password (min 6 characters)"
                {...registerForm.register("password", { required: true, minLength: 6 })}
                autoComplete="new-password"
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          )}
          {tab === "register" && showVerifyMsg && (
            <div className="text-green-600 text-sm mb-4">Registration successful! Please check your email for the OTP to verify your account.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 