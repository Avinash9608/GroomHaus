"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface HeaderProps {
    onBookNowClick: () => void;
}

export function Header({ onBookNowClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#booking", label: "Booking" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="#home">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button
            className="hidden md:flex font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105"
            onClick={onBookNowClick}
          >
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
}
