"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <Indicator className={cn("flex items-center justify-center")}>
      <Check className="h-4 w-4" />
    </Indicator>
  </Root>
));
Checkbox.displayName = Root.displayName;

export { Checkbox };
