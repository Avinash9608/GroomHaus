"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { personalizedServiceRecommendations } from "@/ai/flows/personalized-service-recommendations";
import type { Service } from "@/components/booking-wizard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  preferences: z.string().min(10, {
    message: "Please describe your preferences in at least 10 characters.",
  }),
});

interface RecommendationsFormProps {
  availableServices: Service[];
}

export function RecommendationsForm({ availableServices }: RecommendationsFormProps) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setRecommendations([]);

    try {
      const result = await personalizedServiceRecommendations({
        userPreferences: values.preferences,
        pastSelections: "Haircut & Style, Beard Trim", // Example data
        availableServices: availableServices.map(s => s.name).join(", "),
      });
      
      const recs = result.recommendations.split(',').map(r => r.trim());
      setRecommendations(recs);

    } catch (error) {
      console.error("Failed to get recommendations:", error);
      // You could use a toast notification here to show the error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <Card className="glass-card p-4 md:p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="preferences"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-xl font-headline">Your Style Preferences</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="e.g., 'I like a classic, low-maintenance look', 'I'm open to modern styles', 'Looking for something for a special occasion'"
                                className="min-h-[150px] text-base"
                                {...field}
                            />
                        </FormControl>
                         <FormDescription>
                           Tell us about your style, hair type, or any specific needs.
                         </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={loading} size="lg" className="w-full font-bold">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Thinking...
                        </>
                        ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Get Recommendations
                        </>
                    )}
                    </Button>
                </form>
            </Form>
        </Card>
        
        <Card className="glass-card p-4 md:p-8 min-h-[340px]">
            <h3 className="font-headline text-xl mb-4">Our Suggestions For You</h3>
            {loading && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
                    <p className="text-lg text-foreground/70">Finding your perfect match...</p>
                </div>
            )}

            {!loading && recommendations.length > 0 && (
                 <ul className="space-y-3">
                    {recommendations.map((rec, index) => (
                        <li key={index} className="p-4 bg-primary/20 rounded-lg flex items-center gap-4 transition-all duration-300 hover:bg-primary/40">
                             <Sparkles className="size-5 text-accent" />
                             <span className="text-lg font-medium">{rec}</span>
                        </li>
                    ))}
                 </ul>
            )}

             {!loading && recommendations.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                     <p className="text-lg text-foreground/70">Your personalized recommendations will appear here.</p>
                </div>
            )}
        </Card>
    </div>
  );
}
