"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse rounded-xl bg-gray-200 dark:bg-[#274238]",
          className
        )}
        {...rest}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className,
}) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={cn(
          "h-4 rounded",
          i === lines - 1 && "w-3/4"
        )}
      />
    ))}
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4,
}) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        {Array.from({ length: columns }).map((_, j) => (
          <Skeleton
            key={j}
            className={cn(
              "h-5 rounded",
              j === 0 ? "w-1/4" : "flex-1",
              i === rows - 1 && "opacity-60"
            )}
          />
        ))}
      </div>
    ))}
  </div>
);
