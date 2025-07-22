import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary/10 border-t border-border/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Groom Haus. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Facebook className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
