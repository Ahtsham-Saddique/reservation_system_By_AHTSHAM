"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
  showCount?: boolean;
  count?: number;
  className?: string;
}

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRate,
  showCount = false,
  count,
  className,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const displayRating = hoverRating || rating;

  const handleClick = (index: number) => {
    if (!interactive || !onRate) return;
    onRate(index);
  };

  const handleMouseEnter = (index: number) => {
    if (!interactive) return;
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= displayRating;
        const halfFilled = starValue > displayRating && starValue - 0.5 <= displayRating;

        return (
          <span
            key={index}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              iconSizes[size],
              "transition-colors cursor-default",
              filled
                ? "text-amber-400 fill-current"
                : halfFilled
                  ? "text-amber-400 fill-current opacity-50"
                  : "text-gray-300 dark:text-gray-600",
              interactive && "cursor-pointer hover:scale-110 transition-transform"
            )}
          >
            ★
          </span>
        );
      })}
      {showCount && count !== undefined && (
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};
