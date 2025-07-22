
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

const stories = [
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hint: "man portrait classic",
    headline: "From Classic to Contemporary",
    excerpt: "\"GroomHaus gave me a style that finally felt like me.\"",
  },
  {
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/eef5f3d2-fbae-4ced-800f-8df7693c1d0d.png",
    hint: "father and son",
    headline: "Father-Son Makeover",
    excerpt: "\"Bonding over style and care at GroomHaus was an unforgettable experience.\"",
  },
  {
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hint: "young man confident",
    headline: "New-Start Story",
    excerpt: "\"First job, new confidence, perfect style. It all started here.\"",
  },
    {
    image: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hint: "man with beard",
    headline: "The Beard Transformation",
    excerpt: "\"I never knew my beard could look this good. The artists here are masters.\"",
  },
];

export function StoriesSection() {
    const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <section id="stories" className="relative py-20 md:py-32 bg-background">
       <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjkzfHx3YWxscGFwZXIlMjA0a3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Abstract background"
              fill
              className="object-cover"
              data-ai-hint="abstract texture"
            />
            <div className="absolute inset-0 bg-background/80"></div>
        </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-accent">Our Stories</h2>
          <p className="text-lg text-foreground/70 mt-4 max-w-3xl mx-auto">
            Step behind the scenes and discover the journeys that shape GroomHaus. From everyday transformations to remarkable client experiences, each story is a testament to expert craftsmanship, personal connection, and the art of style. Your trust inspires us to create unforgettable moments—one look at a time.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {stories.map((story, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="glass-card overflow-hidden group h-full flex flex-col">
                    <CardContent className="p-6 text-center flex flex-col items-center flex-grow">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-primary shadow-lg">
                           <Image
                                src={story.image}
                                alt={story.headline}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                data-ai-hint={story.hint}
                            />
                        </div>
                      <h3 className="font-headline text-2xl font-bold mb-3">{story.headline}</h3>
                      <p className="text-foreground/70 italic mb-6 flex-grow">"{story.excerpt}"</p>
                      <Button variant="outline" className="mt-auto border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
