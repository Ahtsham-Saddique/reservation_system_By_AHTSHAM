"use client";

import React from "react";
import { useCart } from "./CartProvider";
import Link from "next/link";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
}: CartSidebarProps) {
  const { cart, removeFromCart, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-border bg-background shadow-2xl"
        aria-label="Shopping cart"
      >
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-5 sm:px-7">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Your reservation
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Journey Cart
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-all duration-200 hover:border-brand hover:bg-brand-light hover:text-brand active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* =====================================================
            CART CONTENT
        ===================================================== */}
        <div className="flex-1 overflow-y-auto bg-background px-5 py-6 sm:px-7">
          {cart.length === 0 ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center px-6 text-center">
              {/* Empty cart icon */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-border bg-surface shadow-sm">
                <svg
                  className="h-9 w-9 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M9 19a1 1 0 100 2 1 1 0 000-2zm9 0a1 1 0 100 2 1 1 0 000-2z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-foreground-muted">
                Start exploring hotels, flights, buses, tours, and other
                travel experiences.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark active:translate-y-0"
              >
                Explore Travel
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cart summary */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Selected items
                  </p>

                  <p className="mt-0.5 text-xs text-foreground-muted">
                    {cart.length}{" "}
                    {cart.length === 1 ? "reservation" : "reservations"}
                  </p>
                </div>

                <div className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand">
                  Ready to book
                </div>
              </div>

              {cart.map((item, idx) => (
                <article
                  key={`${item.id}-${idx}`}
                  className="group rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-surface-muted">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-brand-light text-2xl">
                          {item.itemModel === "hotel"
                            ? "🏨"
                            : item.itemModel === "flight"
                              ? "✈️"
                              : item.itemModel === "bus"
                                ? "🚌"
                                : "🌿"}
                        </div>
                      )}

                      {/* Item type badge */}
                      <div className="absolute bottom-2 left-2 rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        {item.itemModel}
                      </div>
                    </div>

                    {/* Item information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-foreground">
                          {item.name}
                        </h3>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-foreground-subtle transition-all duration-200 hover:bg-danger-soft hover:text-danger active:scale-95"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium text-foreground-muted">
                            Quantity
                          </p>

                          <p className="mt-0.5 text-sm font-semibold text-foreground">
                            {item.quantity}
                          </p>
                        </div>

                        <p className="text-lg font-bold tracking-tight text-foreground">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* =====================================================
            CHECKOUT FOOTER
        ===================================================== */}
        {cart.length > 0 && (
          <div className="border-t border-border bg-surface px-5 py-5 sm:px-7 sm:py-6">
            {/* Total */}
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Total
                </p>

                <p className="mt-1 text-xs text-foreground-muted">
                  Taxes and fees may apply at checkout
                </p>
              </div>

              <p className="text-3xl font-bold tracking-tight text-foreground">
                ${cartTotal}
              </p>
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-brand px-5 py-4 text-base font-bold text-white shadow-lg shadow-brand/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/25 active:translate-y-0"
            >
              Proceed to Checkout

              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </Link>

            {/* Trust message */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-foreground-muted">
              <svg
                className="h-4 w-4 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                />
              </svg>

              <span>Secure reservation checkout</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}