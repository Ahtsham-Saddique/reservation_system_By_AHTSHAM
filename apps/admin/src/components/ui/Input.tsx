"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  variant?: "default" | "filled" | "ghost";
}

const variantClasses: Record<NonNullable<InputProps["variant"]>, string> = {
  default:
    "bg-white dark:bg-[#162620] border border-gray-200 dark:border-[#274238] focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20",
  filled:
    "bg-gray-50 dark:bg-[#162620] border border-transparent focus-within:bg-white dark:focus-within:bg-[#13201b] focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20",
  ghost:
    "bg-transparent border-b border-gray-300 dark:border-[#274238] rounded-none focus-within:border-emerald-500 focus-within:ring-0",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      className,
      label,
      error,
      helperText,
      icon,
      variant = "default",
      type = "text",
      ...rest
    } = props;

    const inputClasses = cn(
      "w-full px-4 py-3 rounded-xl text-base font-medium text-gray-900 dark:text-white",
      "placeholder-gray-400 dark:placeholder-gray-500",
      "transition-all duration-200",
      "focus:outline-none",
      variantClasses[variant],
      error &&
        "border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-500/20",
      icon && "pl-11",
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}
          <input ref={ref} type={type} className={inputClasses} {...rest} />
          {error && (
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-rose-500 font-semibold">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
