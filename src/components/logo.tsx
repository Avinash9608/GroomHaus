import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("font-headline text-3xl font-bold tracking-wider text-white", className)}>
      Groom<span className="text-accent">Haus</span>
    </div>
  );
}
