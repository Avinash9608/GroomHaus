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
import { Scissors, Wind, Droplets, Users, Star, MapPin, Sparkles, Paintbrush, Hand, Spade } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";


const servicesData: Service[] = [
  {
    name: "Haircut",
    description: "A common basic haircut to keep you looking sharp.",
    price: 65,
    duration: 30,
    icon: <Scissors className="size-8 text-accent transition-transform duration-300 group-hover:animate-snip" />,
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/42bbb54b-4a15-4dfc-92e1-7049946ee4b5.png",
    imageHint: "stylish haircut"
  },
  {
    name: "Beard Trim/Grooming",
    description: "Includes shaping and light trimming for a well-groomed beard.",
    price: 45,
    duration: 20,
    icon: <Sparkles className="size-8 text-accent transition-transform duration-300 group-hover:scale-125 group-hover:animate-pulse" />,
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/07268d5e-baa8-462e-9189-59bacd382b3f.png",
    imageHint: "beard grooming"
  },
  {
    name: "Clean Shave",
    description: "A classic clean shave for a smooth finish.",
    price: 150,
    duration: 30,
    icon: <Wind className="size-8 text-accent transition-transform duration-300 group-hover:translate-x-2" />,
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/df792a7b-bff6-4067-a93d-d22b01831cb2.png",
    imageHint: "classic shave"
  },
  {
    name: "Hair Coloring",
    description: "Hair coloring with premium dyes. Price varies by brand.",
    price: 199,
    duration: 60,
    icon: <Paintbrush className="size-8 text-accent transition-transform duration-300 group-hover:rotate-12" />,
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/517433bb-eedc-4544-8422-d13bb1e26ff5.png",
    imageHint: "hair coloring"
  },
  {
    name: "Hair Spa",
    description: "A premium treatment to rejuvenate your hair. Booking recommended.",
    price: 1200,
    duration: 90,
    icon: <Spade className="size-8 text-accent transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />,
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/db7cdd03-a9e6-4d10-947e-611bf6a794f7.png",
    imageHint: "hair spa treatment"
  },
  {
    name: "Basic Facial/Cleanup",
    description: "Includes hydration, de-tan, charcoal, and more.",
    price: 800,
    duration: 60,
    icon: <Droplets className="size-8 text-accent transition-transform duration-300 group-hover:animate-bounce" />,
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/4eae2589-269c-46b4-859b-0a5366dc87e1.png",
    imageHint: "facial treatment"
  },
  {
    name: "Manicure/Pedicure",
    description: "Essential hand and foot care for a polished look.",
    price: 319,
    duration: 45,
    icon: <Hand className="size-8 text-accent transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />,
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/a3ec979b-652c-4f66-9f8a-2f3fef4e693d.png",
    imageHint: "manicure pedicure"
  },
  {
    name: "Grooming Combo",
    description: "The essentials: haircut, beard trim, and a relaxing face massage.",
    price: 499,
    duration: 75,
    icon: <Users className="size-8 text-accent transition-transform duration-300 group-hover:scale-125" />,
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/42855a3b-d3c0-452d-8680-5d41945842d8.png",
    imageHint: "grooming combo"
  },
];

const testimonials = [
  {
    name: "John D.",
    avatar: "JD",
    image: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    hint: "man portrait",
    text: "The best haircut I've ever had. The attention to detail is unmatched. I'll be a regular for sure.",
  },
  {
    name: "Mike S.",
    avatar: "MS",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww",
    hint: "smiling man",
    text: "Truly a premium experience from start to finish. The booking was seamless and the service was top-notch.",
  },
  {
    name: "Alex R.",
    avatar: "AR",
    image: "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww",
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

const faqData = [
  {
    question: "Where is Kundan Hair Cut Salon located?",
    answer: <p>We are conveniently located in the heart of the city, making it easy for you to visit during your daily routine.</p>,
  },
  {
    question: "What services does Kundan Hair Cut Salon provide?",
    answer: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Haircuts</li>
        <li>Beard trimming/shaving</li>
        <li>Hair coloring</li>
        <li>Hair spa</li>
        <li>Face massage and facials</li>
        <li>Manicure and pedicure (for men)</li>
        <li>Combo grooming packages</li>
      </ul>
    ),
  },
  {
    question: "What are your most popular services and their prices?",
    answer: (
      <div>
        <p className="mb-4">Here are some of our most requested grooming services with typical pricing:</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead className="text-right">Price (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow><TableCell>Haircut</TableCell><TableCell className="text-right">65</TableCell></TableRow>
            <TableRow><TableCell>Beard Trim/Shave</TableCell><TableCell className="text-right">45</TableCell></TableRow>
            <TableRow><TableCell>Haircut + Beard Combo</TableCell><TableCell className="text-right">100</TableCell></TableRow>
            <TableRow><TableCell>Hair Coloring (Men)</TableCell><TableCell className="text-right">199+</TableCell></TableRow>
            <TableRow><TableCell>Hair Spa</TableCell><TableCell className="text-right">1,200+</TableCell></TableRow>
            <TableRow><TableCell>Face Massage (10 min)</TableCell><TableCell className="text-right">149–200</TableCell></TableRow>
            <TableRow><TableCell>Basic Facial/Cleanup</TableCell><TableCell className="text-right">Up to 800</TableCell></TableRow>
            <TableRow><TableCell>Manicure/Pedicure</TableCell><TableCell className="text-right">319+</TableCell></TableRow>
            <TableRow><TableCell>Grooming Combo (Hair+Beard+Facial)</TableCell><TableCell className="text-right">600–800</TableCell></TableRow>
          </TableBody>
        </Table>
        <p className="text-sm text-foreground/70 mt-2">*Actual prices may vary depending on service choices and stylist experience.</p>
      </div>
    ),
  },
  {
    question: "Do you offer grooming combos?",
    answer: <p>Yes, we have value-packed grooming combos that include haircuts, beard trims, facials, massages, and more—saving you both time and money.</p>,
  },
  {
    question: "Do I need to make an appointment?",
    answer: <p>Walk-in clients are always welcome. However, appointments are recommended for combo packages or premium services to ensure availability.</p>,
  },
  {
    question: "What are your opening hours?",
    answer: <p>We are open daily. Please call or visit to confirm our current timings.</p>,
  },
  {
    question: "Is the salon suitable for children and seniors?",
    answer: <p>Yes, we welcome boys and men of all ages.</p>,
  },
  {
    question: "How does Kundan Hair Cut Salon ensure cleanliness?",
    answer: <p>We use fresh towels, sanitize tools after every client, and follow strict hygiene protocols to ensure your safety and comfort.</p>,
  },
  {
    question: "Do you offer any discounts or loyalty programs?",
    answer: <p>Combo packages are already discounted. Periodic promotions and loyalty programs may also be available—ask at the counter or follow our updates.</p>,
  },
  {
    question: "What payment methods do you accept?",
    answer: <p>We accept cash and most major digital payment options (e.g., UPI, Paytm).</p>,
  },
  {
    question: "Do you provide home service?",
    answer: <p>We currently provide services only at our salon location.</p>,
  },
  {
    question: "Can I request a specific stylist?",
    answer: <p>Yes, you can request your preferred stylist when booking or on arrival, subject to their availability.</p>,
  },
  {
    question: "What should I do if I’m unsatisfied with a service?",
    answer: <p>Please let us know immediately—we strive for customer satisfaction and will do our best to resolve any concerns.</p>,
  },
];


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
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.reset}
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
                <Card key={service.name} className="glass-card overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 relative">
                  {service.image && (
                    <>
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 blur-sm"
                        data-ai-hint={service.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/50" />
                    </>
                  )}
                  <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
                    <div className="p-4 bg-primary/50 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <h3 className="font-headline text-2xl font-bold mb-2">{service.name}</h3>
                    <p className="text-foreground/70 mb-4 flex-grow">{service.description}</p>
                    <p className="text-2xl font-bold text-accent mb-6">₹{service.price}</p>
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
                            <AvatarImage src={testimonial.image} data-ai-hint={testimonial.hint} className="object-cover" />
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
        
        <section id="faq" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
              <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
                Have questions? We've got answers.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="glass-card mb-4 rounded-2xl px-6">
                    <AccordionTrigger className="text-left font-headline text-xl hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
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
                             <a href="https://www.google.com/maps/search/?api=1&query=Lakhna+Sabji+Market+804453+Patna" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 transition-colors hover:text-accent">
                                <MapPin className="text-accent"/>Lakhna Sabji Market 804453 Patna
                            </a>
                            <a href="mailto:contact@groomhaus.com" className="flex items-center gap-4 transition-colors hover:text-accent">Email: contact@groomhaus.com</a>
                            <a href="tel:1234567890" className="flex items-center gap-4 transition-colors hover:text-accent">Phone: (123) 456-7890</a>
                        </div>
                        <Separator className="my-8 bg-border/50" />
                        <h3 className="font-headline text-3xl mb-6">Opening Hours</h3>
                        <div className="space-y-2 text-lg">
                            <p>Monday - Friday: 9am - 7pm</p>
                            <p>Saturday: 10am - 6pm</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                     <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
                        <a href="https://www.google.com/maps/search/?api=1&query=Lakhna+Sabji+Market+804453+Patna" target="_blank" rel="noopener noreferrer">
                         <Image src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/52c5be1e-8461-45f4-9872-f9ec0cfedbda.png" width={800} height={600} className="w-full h-full object-cover" alt="Map location of Groom Haus" data-ai-hint="salon exterior" />
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section id="newsletter" className="py-20 md:py-32 bg-primary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Stay Updated</h2>
              <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest news, offers, and grooming tips.
              </p>
            </div>
            <form className="max-w-xl mx-auto flex items-center glass-card p-2 rounded-full">
                <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base flex-grow"
                    aria-label="Email for newsletter"
                />
                <Button
                    type="submit"
                    size="lg"
                    className="rounded-full font-bold text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105 shrink-0"
                >
                    Subscribe
                </Button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
