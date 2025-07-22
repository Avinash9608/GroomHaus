"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Calendar as CalendarIcon, Clock, Scissors, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Service {
  name: string;
  description: string;
  price: number;
  duration: number;
  icon: React.ReactNode;
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
  
  const handleBookingConfirm = () => {
    toast({
        title: "Booking Confirmed!",
        description: `Your appointment for ${selectedService?.name} on ${selectedDate?.toLocaleDateString()} at ${selectedTime} is confirmed.`,
        variant: "default",
    });
    // Reset state
    setStep(1);
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
  }

  const resetWizard = () => {
     setStep(1);
     setSelectedService(null);
     setSelectedDate(undefined);
     setSelectedTime(null);
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
            <div className="text-center animate-fade-in">
                <h3 className="text-3xl font-headline mb-6">
                    Available Times for {selectedDate?.toLocaleDateString()}
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {timeSlots.map(time => (
                        <Button 
                            key={time}
                            variant="outline" 
                            className="p-6 text-lg font-bold border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                            onClick={() => handleTimeSelect(time)}
                        >
                            {time}
                        </Button>
                    ))}
                </div>
                 <Button variant="ghost" onClick={() => setStep(2)} className="mt-8">Back to Calendar</Button>
            </div>
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
                            <Scissors className="text-accent" /> <strong>Service:</strong> {selectedService.name} (${selectedService.price})
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
