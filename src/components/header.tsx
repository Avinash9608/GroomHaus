"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
    onBookNowClick: () => void;
}

export function Header({ onBookNowClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
    function syncUser() {
      const hasToken = document.cookie.includes("token=");
      setLoggedIn(hasToken);
      const user = localStorage.getItem("user");
      console.log("User from localStorage:", user);
      if (user) {
        try {
          setUserName(JSON.parse(user).name);
        } catch {
          setUserName(null);
        }
      } else {
        setUserName(null);
      }
    }
    window.addEventListener("storage", syncUser);
    window.addEventListener("user-updated", syncUser);
    syncUser();
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("user-updated", syncUser);
    };
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoggedIn(false);
    setUserName(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleAppointments = () => {
    setDropdownOpen(false);
    router.push("/my-bookings");
  };

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
          {mounted ? (
            userName ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <Button
                  variant="outline"
                  className="px-4"
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  {userName}
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border rounded shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-accent/10"
                      onClick={handleAppointments}
                    >
                      My Appointments
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-accent/10"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button className="ml-4" variant="outline" onClick={() => router.push("/login")}>Login / Register</Button>
            )
          ) : null}
        </div>
      </div>
    </header>
  );
}
