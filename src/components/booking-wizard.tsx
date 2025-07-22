"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Calendar as CalendarIcon, Clock, Scissors, User, Lock, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export interface Service {
  name: string;
  description: string;
  price: number;
  duration: number;
  icon: React.ReactNode;
  image?: string;
  imageHint?: string;
}

interface BookingWizardProps {
  service: Service | null;
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export function BookingWizard({ service: initialService }: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(initialService);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("user");
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);

  const fetchOccupiedSlots = useCallback(async (serviceName: string, date: Date | undefined) => {
    if (!date) return;
    const res = await fetch(`/api/bookings?date=${encodeURIComponent(date.toISOString())}`);
    if (res.ok) {
      const data = await res.json();
      setOccupiedSlots(data.bookings.map((b: any) => b.time));
    } else {
      setOccupiedSlots([]);
    }
  }, []);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      setStep(2);
    } else {
      setStep(1);
      setSelectedService(null);
    }
    setSelectedDate(undefined);
    setSelectedTime(null);
  }, [initialService]);

  useEffect(() => {
    if (selectedDate) {
      fetchOccupiedSlots("", selectedDate);
    } else {
      setOccupiedSlots([]);
    }
  }, [selectedDate, fetchOccupiedSlots]);

  const progress = useMemo(() => {
    if (step === 4) return 100;
    return (step - 1) * 33.33;
  }, [step]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setStep(3);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(4);
  };
  
  const handleBookingConfirm = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    // Save booking to backend
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: selectedService?.name,
        date: selectedDate?.toISOString(),
        time: selectedTime,
      }),
    });
    if (res.ok) {
      toast({
        title: "Booking Confirmed!",
        description: `Your appointment for ${selectedService?.name} on ${selectedDate?.toLocaleDateString()} at ${selectedTime} is confirmed.`,
        variant: "default",
      });
      setStep(1);
      setSelectedService(null);
      setSelectedDate(undefined);
      setSelectedTime(null);
    } else {
      const result = await res.json();
      toast({
        title: "Booking Failed",
        description: result.error || "Could not book slot.",
        variant: "destructive",
      });
    }
  }

  const resetWizard = () => {
     setStep(1);
     setSelectedService(null);
     setSelectedDate(undefined);
     setSelectedTime(null);
  }

  if (!isLoggedIn) {
    return (
      <Card className="glass-card p-8 text-center">
        <h3 className="font-headline text-2xl mb-4">Login Required</h3>
        <p className="text-foreground/70 mb-4">Please login or register to book a slot.</p>
        <Button onClick={() => router.push("/login")}>Login / Register</Button>
      </Card>
    );
  }

  if (!initialService) {
      return (
        <Card className="glass-card p-8 text-center">
            <h3 className="font-headline text-2xl mb-4">Start Your Booking</h3>
            <p className="text-foreground/70">Please select a service from the list above to begin.</p>
        </Card>
      )
  }

  return (
    <Card className="glass-card w-full max-w-4xl mx-auto shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-8">
            <Progress value={progress} className="w-full h-3 bg-primary/20" />
            <div className="flex justify-between mt-2 text-sm font-headline text-foreground/80">
                <span className={step >= 1 ? 'text-accent' : ''}>Service</span>
                <span className={step >= 2 ? 'text-accent' : ''}>Date</span>
                <span className={step >= 3 ? 'text-accent' : ''}>Time</span>
                <span className={step >= 4 ? 'text-accent' : ''}>Confirm</span>
            </div>
        </div>

        {step === 1 && (
             <div className="text-center">
                <h3 className="text-2xl font-headline mb-4">Service Selected</h3>
                <p>You should not be seeing this. Select a service above.</p>
             </div>
        )}

        {step === 2 && (
            <div className="text-center animate-fade-in">
                <h3 className="text-3xl font-headline mb-6">Choose a Date</h3>
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                        className="rounded-md glass-card p-4"
                    />
                </div>
            </div>
        )}

        {step === 3 && (
  <TooltipProvider>
    <div className="text-center animate-fade-in">
      <h3 className="text-3xl font-headline mb-6">
        Available Times for {selectedDate?.toLocaleDateString()}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {timeSlots.map(time => {
          const isOccupied = occupiedSlots.includes(time);
          return isOccupied ? (
            <Tooltip key={time}>
              <TooltipTrigger asChild>
                <div className="relative group">
                  <Button
                    variant="secondary"
                    className="p-6 text-lg font-bold border-2 bg-red-100 text-red-600 border-red-300 opacity-80 cursor-not-allowed flex flex-col items-center gap-1 group-hover:bg-red-200 transition-all duration-300"
                    disabled
                  >
                    <XCircle className="w-6 h-6 mb-1 text-red-400" />
                    <span>{time}</span>
                    <span className="text-xs font-semibold mt-1">Occupied</span>
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">This slot is already booked</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              key={time}
              variant="outline"
              className="p-6 text-lg font-bold border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </Button>
          );
        })}
      </div>
      <Button variant="ghost" onClick={() => setStep(2)} className="mt-8">Back to Calendar</Button>
    </div>
  </TooltipProvider>
)}
        
        {step === 4 && selectedService && selectedDate && selectedTime && (
            <div className="text-center animate-fade-in">
                 <h3 className="text-3xl font-headline mb-6">Confirm Your Appointment</h3>
                 <Card className="glass-card max-w-lg mx-auto p-8 text-left">
                    <div className="flex items-center justify-center mb-6">
                        <CheckCircle className="size-16 text-green-400" />
                    </div>
                    <div className="space-y-4 text-lg">
                        <div className="flex items-center gap-4">
                            <Scissors className="text-accent" /> <strong>Service:</strong> {selectedService.name} (₹{selectedService.price})
                        </div>
                        <div className="flex items-center gap-4">
                           <CalendarIcon className="text-accent" /> <strong>Date:</strong> {selectedDate.toLocaleDateString()}
                        </div>
                         <div className="flex items-center gap-4">
                           <Clock className="text-accent" /> <strong>Time:</strong> {selectedTime}
                        </div>
                    </div>
                 </Card>
                 <div className="flex justify-center gap-4 mt-8">
                     <Button variant="ghost" onClick={() => setStep(3)}>Change Time</Button>
                     <Button size="lg" className="font-bold bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleBookingConfirm}>
                         Confirm Booking
                     </Button>
                 </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
