"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "outline"
  | "destructive";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:scale-[1.02] active:scale-95",
  secondary:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-black border border-transparent",
  accent:
    "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-900 shadow-lg shadow-amber-600/30 hover:shadow-xl hover:scale-[1.02] active:scale-95",
  ghost:
    "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#162620] font-semibold",
  outline:
    "border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-[#1f332b] dark:text-emerald-300 dark:hover:bg-[#162620] font-black",
  destructive:
    "bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-600/30 hover:shadow-xl hover:scale-[1.02] active:scale-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3.5 text-base rounded-xl",
  xl: "px-8 py-4.5 text-lg rounded-2xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      children,
      disabled,
      ...rest
    } = props;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-black transition-all",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...rest}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {icon && !loading && <span className="flex items-center">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
