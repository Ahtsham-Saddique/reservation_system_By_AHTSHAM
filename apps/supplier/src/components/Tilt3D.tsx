"use client";

import React, { useRef, useEffect } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export default function Tilt3D({
  children,
  className = "",
  maxTilt = 4,
  scale = 1.01,
  glare = true,
}: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX =
        centerY === 0
          ? 0
          : -((y - centerY) / centerY) * maxTilt;

      const rotateY =
        centerX === 0
          ? 0
          : ((x - centerX) / centerX) * maxTilt;

      card.style.transition =
        "transform 0.12s cubic-bezier(0.22, 1, 0.36, 1)";

      card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX.toFixed(2)}deg)
        rotateY(${rotateY.toFixed(2)}deg)
        scale3d(${scale}, ${scale}, ${scale})
      `;

      if (glare && glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;

        glareRef.current.style.opacity = "0.12";

        glareRef.current.style.background = `
          radial-gradient(
            circle at ${glareX}% ${glareY}%,
            rgba(255, 255, 255, 0.32) 0%,
            rgba(255, 255, 255, 0) 60%
          )
        `;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    if (!cardRef.current) return;

    const card = cardRef.current;

    card.style.transition =
      "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";

    card.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion && cardRef.current) {
      cardRef.current.style.transform = "none";
    }

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        transform:
          "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
      className={`relative group ${className}`}
    >
      {children}

      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  );
}