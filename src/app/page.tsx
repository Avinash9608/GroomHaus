"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { Service } from "@/components/booking-wizard";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingWizard } from "@/components/booking-wizard";
import { RecommendationsForm } from "@/components/recommendations-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Scissors, Wind, Droplets, Users, Star, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";

const servicesData: Service[] = [
  {
    name: "Haircut & Style",
    description: "Precision haircut followed by a professional wash and style.",
    price: 50,
    duration: 60,
    icon: <Scissors className="size-8 text-accent" />,
  },
  {
    name: "Classic Razor Shave",
    description: "A traditional hot towel and straight-razor shave.",
    price: 45,
    duration: 45,
    icon: <Wind className="size-8 text-accent" />,
  },
  {
    name: "Beard Trim",
    description: "Shape, trim, and line up your beard to perfection.",
    price: 30,
    duration: 30,
    icon: <Droplets className="size-8 text-accent" />,
  },
  {
    name: "The Works",
    description: "The ultimate grooming package: haircut, shave, and beard trim.",
    price: 110,
    duration: 120,
    icon: <Users className="size-8 text-accent" />,
  },
];

const testimonials = [
  {
    name: "John D.",
    avatar: "JD",
    image: "https://placehold.co/100x100.png",
    hint: "man portrait",
    text: "The best haircut I've ever had. The attention to detail is unmatched. I'll be a regular for sure.",
  },
  {
    name: "Mike S.",
    avatar: "MS",
    image: "https://placehold.co/100x100.png",
    hint: "smiling man",
    text: "Truly a premium experience from start to finish. The booking was seamless and the service was top-notch.",
  },
  {
    name: "Alex R.",
    avatar: "AR",
    image: "https://placehold.co/100x100.png",
    hint: "gentleman portrait",
    text: "I tried the AI recommendations and found my new favorite service! The staff is incredibly professional.",
  },
];

const heroSlides = [
  {
    headline: "Bihari Nawabs Ke Liye, Shandar Salaan.",
    subheadline: "Parampara, Adhunikta Ke Saath.",
    image: "https://images.unsplash.com/photo-1589985494639-69e60c82cab2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGhhaXJjdXR8ZW58MHx8MHx8fDA%3D",
    hint: "man stylish haircut"
  },
  {
    headline: "Aapki Shaili, Hamara Hunar.",
    subheadline: "Patna ke Lakhna Mein Shresth Purush Shringar.",
    image: "https://plus.unsplash.com/premium_photo-1661645774317-68f58c5efd91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGhhaXJjdXR8ZW58MHx8MHx8fDA%3D",
    hint: "man grooming"
  },
  {
    headline: "Parampara Se Prerit, Aadhunik Takneek Ke Saath.",
    subheadline: "Sirf Chune Huye Sharifon Ke Liye.",
    image: "https://images.unsplash.com/photo-1533245270348-821d4d5c7514?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGhhaXJjdXR8ZW58MHx8MHx8fDA%3D",
    hint: "beard trim"
  },
  {
    headline: "Bihar Ka Fakhr, Aapke Shaan Ke Saath.",
    subheadline: "Lakhna Mein Shresth Men’s Grooming.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxoYWlyY3V0fGVufDB8fDB8fHww",
    hint: "classic shave"
  },
  {
    headline: "Aapki Pahchaan, Hamari Kala.",
    subheadline: "Lakhna, Patna Mein Bespoke Grooming Ka Vishwas.",
    image: "https://images.unsplash.com/photo-1598524374668-5d565a3c42e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxoYWlyY3V0fGVufDB8fDB8fHww",
    hint: "modern hairstyle"
  },
]

export default function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setTimeout(() => {
      bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };
  
  const handleBookNowClick = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header onBookNowClick={handleBookNowClick} />
      <main className="flex-grow">
      <section
          id="home"
          className="relative flex items-center justify-center min-h-screen bg-background text-white p-4 overflow-hidden"
        >
           <div className="absolute inset-0 z-0">
            <Image
              src={heroSlides[currentSlide].image}
              alt="Blurred background of a stylish haircut"
              fill
              className="object-cover blur-md scale-110 transition-all duration-1000"
              data-ai-hint={heroSlides[currentSlide].hint}
              key={currentSlide}
            />
            <div className="absolute inset-0 bg-background/70"></div>
          </div>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="flex flex-col items-start gap-6 text-left px-4 h-48 md:h-64">
               <Carousel
                plugins={[autoplayPlugin.current]}
                onmouseenter={autoplayPlugin.current.stop}
                onmouseleave={autoplayPlugin.current.reset}
                setApi={(api) => {
                    api?.on("select", () => {
                        setCurrentSlide(api.selectedScrollSnap());
                    });
                }}
                className="w-full"
                opts={{loop: true}}
               >
                   <CarouselContent>
                       {heroSlides.map((slide, index) => (
                           <CarouselItem key={index}>
                               <div className="animate-fade-in-down">
                                   <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
                                       {slide.headline}
                                   </h1>
                                   <p className="max-w-2xl text-lg md:text-xl text-foreground/80 mt-4">
                                       {slide.subheadline}
                                   </p>
                               </div>
                           </CarouselItem>
                       ))}
                   </CarouselContent>
               </Carousel>
            </div>
            <div className="relative flex flex-col items-center justify-center gap-6">
                 <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl shadow-accent/20 border-8 border-primary animate-fade-in-up">
                    <Image
                    src={heroSlides[currentSlide].image}
                    alt="Man with a stylish haircut"
                    fill
                    className="object-cover transition-all duration-1000"
                    data-ai-hint={heroSlides[currentSlide].hint}
                    key={currentSlide}
                    />
                </div>
                <Button
                    size="lg"
                    className="font-bold text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105 animate-fade-in-up mt-8"
                    onClick={handleBookNowClick}
                    >
                    Discover Your Style
                </Button>
            </div>
          </div>
        </section>

        <section id="services" ref={servicesRef} className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Our Services</h2>
              <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
                Indulge in our curated selection of grooming services, designed for the modern gentleman.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {servicesData.map((service) => (
                <Card key={service.name} className="glass-card overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-4 bg-primary/50 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <h3 className="font-headline text-2xl font-bold mb-2">{service.name}</h3>
                    <p className="text-foreground/70 mb-4 flex-grow">{service.description}</p>
                    <p className="text-2xl font-bold text-accent mb-6">${service.price}</p>
                    <Button onClick={() => handleSelectService(service)} className="w-full font-bold bg-primary hover:bg-primary/80">
                      Select Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" ref={bookingRef} className="py-20 md:py-32 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Book Your Slot</h2>
              <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
                Select your preferred service, date, and time. Your transformation awaits.
              </p>
            </div>
            <BookingWizard service={selectedService} />
          </div>
        </section>

        <section id="recommendations" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
             <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Personalized Recommendations</h2>
              <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
                Let our AI stylist suggest the perfect services tailored just for you.
              </p>
            </div>
            <RecommendationsForm availableServices={servicesData} />
          </div>
        </section>
        
        <section id="testimonials" className="py-20 md:py-32 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">What Our Clients Say</h2>
            </div>
            <Carousel opts={{ loop: true }} className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="p-2">
                      <Card className="glass-card">
                        <CardContent className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
                          <Avatar className="w-24 h-24 mb-6 border-4 border-accent/50">
                            <AvatarImage src={testimonial.image} data-ai-hint={testimonial.hint} />
                            <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} className="text-accent fill-accent" />)}
                          </div>
                          <p className="text-lg italic text-foreground/80 mb-6">"{testimonial.text}"</p>
                          <p className="font-bold text-xl font-headline">{testimonial.name}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex"/>
              <CarouselNext className="hidden md:flex"/>
            </Carousel>
          </div>
        </section>
        
        <section id="contact" className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">Visit Us</h2>
                    <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
                        Find us in the heart of the city. We look forward to welcoming you.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="glass-card p-8 md:p-12">
                        <h3 className="font-headline text-3xl mb-6">Contact Info</h3>
                        <div className="space-y-4 text-lg">
                            <p className="flex items-center gap-4"><MapPin className="text-accent"/>123 Luxury Lane, Metropolis, 10101</p>
                            <p className="flex items-center gap-4">Email: contact@groomhaus.com</p>
                            <p className="flex items-center gap-4">Phone: (123) 456-7890</p>
                        </div>
                        <Separator className="my-8 bg-border/50" />
                        <h3 className="font-headline text-3xl mb-6">Opening Hours</h3>
                        <div className="space-y-2 text-lg">
                            <p>Monday - Friday: 9am - 7pm</p>
                            <p>Saturday: 10am - 6pm</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                     <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg">
                         <Image src="https://placehold.co/600x400.png" fill className="object-cover" alt="Map location of Groom Haus" data-ai-hint="city map" />
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

    