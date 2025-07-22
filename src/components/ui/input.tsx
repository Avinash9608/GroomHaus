import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full bg-foreground/10 text-foreground placeholder:text-foreground/60 ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";
