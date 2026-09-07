"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  blur?: boolean;
}

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  blur = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    // Respect users who prefer reduced motion.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  const getHiddenStyles = () => {
    switch (direction) {
      case "up":
        return "translate-y-6";
      case "down":
        return "-translate-y-6";
      case "left":
        return "translate-x-6";
      case "right":
        return "-translate-x-6";
      case "scale":
        return "scale-[0.96]";
      case "fade":
      default:
        return "translate-y-0";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: "650ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`
        transition-[opacity,transform,filter]
        will-change-[opacity,transform,filter]
        motion-reduce:transition-none
        ${
          isVisible
            ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
            : `opacity-0 ${getHiddenStyles()} ${
                blur ? "blur-[4px]" : "blur-0"
              }`
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}