// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function VerifyOtpPage() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [resendMsg, setResendMsg] = useState("");
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const prefillEmail = searchParams.get("email") || "";
//   const form = useForm<{ email: string; otp: string }>({
//     defaultValues: { email: prefillEmail, otp: "" },
//   });

//   async function onSubmit(data: { email: string; otp: string }) {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error || "Verification failed");
//       const user = { name: result.user.name, email: result.user.email };
//       localStorage.setItem("user", JSON.stringify(user));
//       console.log("Stored user in localStorage:", user);
//       window.dispatchEvent(new Event("user-updated"));
//       setSuccess(true);
//       setTimeout(() => router.push("/"), 1500);
//     } catch (e: any) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleResend() {
//     setResendLoading(true);
//     setResendMsg("");
//     try {
//       const res = await fetch("/api/auth/resend-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: form.getValues("email") }),
//       });
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error || "Failed to resend OTP");
//       setResendMsg("OTP resent! Please check your email.");
//     } catch (e: any) {
//       setResendMsg(e.message);
//     } finally {
//       setResendLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <Card className="w-full max-w-md shadow-2xl">
//         <CardContent className="p-8">
//           <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>
//           <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
//             <Input
//               type="email"
//               placeholder="Enter your email address"
//               {...form.register("email", { required: true })}
//               autoComplete="email"
//               readOnly={!!prefillEmail}
//             />
//             <Input
//               type="text"
//               placeholder="Enter the 6-digit OTP sent to your email"
//               {...form.register("otp", { required: true, minLength: 6, maxLength: 6 })}
//               autoComplete="one-time-code"
//             />
//             {error && <div className="text-red-500 text-sm">{error}</div>}
//             {success && <div className="text-green-600 text-sm">Email verified! Redirecting...</div>}
//             <Button type="submit" className="w-full mt-2" disabled={loading}>
//               {loading ? "Verifying..." : "Verify"}
//             </Button>
//           </form>
//           <Button
//             type="button"
//             className="w-full mt-4"
//             variant="outline"
//             onClick={handleResend}
//             disabled={resendLoading || loading}
//           >
//             {resendLoading ? "Resending..." : "Resend OTP"}
//           </Button>
//           {resendMsg && <div className={`mt-2 text-sm ${resendMsg.includes('OTP resent') ? 'text-green-600' : 'text-red-500'}`}>{resendMsg}</div>}
//         </CardContent>
//       </Card>
//     </div>
//   );
// } 


"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function VerifyOtpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get("email") || "";
  const form = useForm<{ email: string; otp: string }>({
    defaultValues: { email: prefillEmail, otp: "" },
  });

  async function onSubmit(data: { email: string; otp: string }) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Verification failed");
      const user = { name: result.user.name, email: result.user.email };
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Stored user in localStorage:", user);
      window.dispatchEvent(new Event("user-updated"));
      setSuccess(true);
      setTimeout(() => router.push("/"), 1500);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResendLoading(true);
    setResendMsg("");
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.getValues("email") }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to resend OTP");
      setResendMsg("OTP resent! Please check your email.");
    } catch (e: any) {
      setResendMsg(e.message);
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Enter your email address"
              {...form.register("email", { required: true })}
              autoComplete="email"
              readOnly={!!prefillEmail}
            />
            <Input
              type="text"
              placeholder="Enter the 6-digit OTP sent to your email"
              {...form.register("otp", { required: true, minLength: 6, maxLength: 6 })}
              autoComplete="one-time-code"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">Email verified! Redirecting...</div>}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
          <Button
            type="button"
            className="w-full mt-4"
            variant="outline"
            onClick={handleResend}
            disabled={resendLoading || loading}
          >
            {resendLoading ? "Resending..." : "Resend OTP"}
          </Button>
          {resendMsg && (
            <div className={`mt-2 text-sm ${resendMsg.includes('OTP resent') ? 'text-green-600' : 'text-red-500'}`}>
              {resendMsg}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// The default export below, wrapped in Suspense
export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}
