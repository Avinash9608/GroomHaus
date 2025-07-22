"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, BadgeCheck, Scissors } from "lucide-react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
      return;
    }
    fetch("/api/bookings")
      .then(async (res) => {
        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.error || "Failed to fetch bookings");
        }
        return res.json();
      })
      .then((data) => setBookings(data.bookings || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-background py-12">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>
      {bookings.length === 0 ? (
        <div className="text-lg text-foreground/70">No bookings found.</div>
      ) : (
        <div className="grid gap-8 w-full max-w-2xl">
          {bookings.map((b, i) => (
            <Card key={i} className="shadow-lg border-accent/30">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Scissors className="text-accent" />
                <div>
                  <CardTitle className="text-xl font-bold">{b.service}</CardTitle>
                  <CardDescription className="text-foreground/60">Booked on {new Date(b.createdAt).toLocaleString()}</CardDescription>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  <BadgeCheck className="w-4 h-4" /> Confirmed
                </span>
              </CardHeader>
              <CardContent className="flex flex-row items-center gap-8 pt-0 pb-4">
                <div className="flex items-center gap-2 text-base">
                  <Calendar className="w-5 h-5 text-accent" />
                  {new Date(b.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-base">
                  <Clock className="w-5 h-5 text-accent" />
                  {b.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Button className="mt-8" onClick={() => router.push("/")}>Back to Home</Button>
    </div>
  );
} 