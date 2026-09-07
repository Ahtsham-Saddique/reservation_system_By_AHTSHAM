"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type StatusVariant =
  | "success"
  | "pending"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "primary"
  | "secondary"
  | "verified"
  | "rejected";

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant: StatusVariant;
}

const statusClasses: Record<StatusVariant, string> = {
  success:
    "bg-emerald-100 text-emerald-800 dark:bg-[#162620]/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-500/20",
  pending:
    "bg-amber-100 text-amber-800 dark:bg-[#3a2c0c]/60 dark:text-amber-300 border border-amber-200/50 dark:border-amber-500/20",
  warning:
    "bg-amber-100 text-amber-800 dark:bg-[#3a2c0c]/60 dark:text-amber-300 border border-amber-200/50 dark:border-amber-500/20",
  error:
    "bg-rose-100 text-rose-800 dark:bg-[#3a1a22]/60 dark:text-rose-300 border border-rose-200/50 dark:border-rose-500/20",
  info:
    "bg-sky-100 text-sky-800 dark:bg-[#162a3a]/60 dark:text-sky-300 border border-sky-200/50 dark:border-sky-500/20",
  neutral:
    "bg-gray-100 text-gray-700 dark:bg-[#1a1a1a]/60 dark:text-gray-300 border border-gray-200/50 dark:border-gray-500/20",
  primary:
    "bg-emerald-100 text-emerald-800 dark:bg-[#162620]/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-500/20",
  secondary:
    "bg-gray-100 text-gray-700 dark:bg-[#1a1a1a]/60 dark:text-gray-400 border border-gray-200/50 dark:border-gray-500/20",
  verified:
    "bg-emerald-100 text-emerald-800 dark:bg-[#162620]/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-500/20",
  rejected:
    "bg-rose-100 text-rose-800 dark:bg-[#3a1a22]/60 dark:text-rose-300 border border-rose-200/50 dark:border-rose-500/20",
};

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (props, ref) => {
    const { className, variant, children, ...rest } = props;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black",
          "transition-colors",
          statusClasses[variant],
          className
        )}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

StatusBadge.displayName = "StatusBadge";
