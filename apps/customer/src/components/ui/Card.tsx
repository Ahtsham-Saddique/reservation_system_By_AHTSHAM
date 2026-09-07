"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type CardVariant =
  | "default"
  | "interactive"
  | "elevated"
  | "glass"
  | "filled";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const { className, variant = "default", ...rest } = props;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl bg-surface text-foreground transition-all",
          cardVariantClasses[variant],
          className
        )}
        {...rest}
      />
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(
        "p-6 pb-4",
        "first:rounded-t-2xl",
        className
      )}
      {...rest}
    />
  );
});

CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-black text-gray-900 dark:text-white",
        className
      )}
      {...rest}
    />
  );
});

CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <p
      ref={ref}
      className={cn(
        "mt-1.5 text-sm text-gray-500 dark:text-gray-400 font-medium",
        className
      )}
      {...rest}
    />
  );
});

CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...rest}
    />
  );
});

CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(
        "p-6 pt-4 border-t border-gray-100 dark:border-[#1f332b]",
        "flex items-center justify-end gap-3",
        className
      )}
      {...rest}
    />
  );
});

CardFooter.displayName = "CardFooter";

const cardVariantClasses: Record<CardVariant, string> = {
  default:
    "border border-gray-100 dark:border-[#1f332b] shadow-sm dark:shadow-none dark:shadow-emerald-500/5",
  interactive:
    "border border-gray-100 dark:border-[#1f332b] card-interactive",
  elevated:
    "border border-gray-100 dark:border-[#1f332b] shadow-md dark:shadow-lg dark:shadow-emerald-950/30",
  glass:
    "border border-white/20 dark:border-white/10 bg-white/60 dark:bg-[#13201b]/60 backdrop-blur-xl",
  filled:
    "border border-gray-100 dark:border-[#1f332b] bg-gray-50/80 dark:bg-[#162620]/80",
};
