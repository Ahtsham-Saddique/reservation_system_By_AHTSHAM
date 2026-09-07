"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PriceBadgeProps {
  price: number;
  currency?: string;
  originalPrice?: number;
  discount?: number;
  size?: "sm" | "md" | "lg";
  showCurrency?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-lg px-4 py-2",
};

export const PriceBadge: React.FC<PriceBadgeProps> = ({
  price,
  currency = "$",
  originalPrice,
  discount,
  size = "md",
  showCurrency = true,
  className,
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = discount || (originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  return (
    <div className={cn("inline-flex flex-col items-start", className)}>
      <div className="flex items-center gap-2">
        <span className="font-black text-emerald-600 dark:text-emerald-400">
          {showCurrency && currency}{price.toFixed(2)}
        </span>
        {hasDiscount && originalPrice && (
          <>
            <span className="text-gray-400 dark:text-gray-500 text-xs line-through font-bold">
              {showCurrency && currency}{originalPrice.toFixed(2)}
            </span>
            <span className="px-2 py-0.5 bg-rose-100 dark:bg-[#3a1a22] text-rose-800 dark:text-rose-300 rounded-full text-[10px] font-black">
              SAVE {discountPercent}%
            </span>
          </>
        )}
      </div>
    </div>
  );
};
