import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontBody = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Playfair_Display({
  subsets: ["latin"],
  style: ['normal', 'italic'],
  variable: "--font-headline",
});

export const metadata: Metadata = {
  title: "Groom Haus",
  description: "Premium men's salon and booking experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
