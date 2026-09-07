"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

// Synthesize pleasant notification chime using browser Web Audio API
function playNotificationChime() {
  try {
    const AudioCtx =
      window.AudioContext || (window as any).webkitAudioContext;

    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.35);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.2, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now + 0.12);
    osc2.stop(now + 0.55);
  } catch (e) {
    /* Silent catch if audio policy requires gesture */
  }
}

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      title: string;
      desc: string;
      time: string;
      read: boolean;
    }>
  >([]);

  const [newOrderAlert, setNewOrderAlert] = useState<{
    id: string;
    customer: string;
    amount: number;
    time: string;
  } | null>(null);

  const knownBookingIdsRef = useRef<Set<string>>(new Set());
  const initialLoadRef = useRef(false);

  // Background live order polling every 10s for supplier
  useEffect(() => {
    if (!user || user.role !== "supplier") return;

    const checkIncomingOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const base =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000/api";

        const res = await fetch(`${base}/supplier/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          const bookings = data.data;

          if (initialLoadRef.current) {
            const newOrders = bookings.filter(
              (b: any) => !knownBookingIdsRef.current.has(b._id)
            );

            if (newOrders.length > 0) {
              playNotificationChime();

              const latest = newOrders[0];

              setNewOrderAlert({
                id: latest._id,
                customer: latest.user?.name || "Traveler",
                amount: latest.totalAmount || 0,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              });

              const newItems = newOrders.map((o: any) => ({
                id: o._id,
                title: `New Reservation #${o._id
                  .slice(-6)
                  .toUpperCase()}`,
                desc: `${o.user?.name || "Guest"} booked ${
                  o.items?.length || 1
                } item(s) • $${o.totalAmount}`,
                time: "Just now",
                read: false,
              }));

              setNotifications((prev) => [...newItems, ...prev]);

              setTimeout(() => setNewOrderAlert(null), 6000);
            }
          }

          bookings.forEach((b: any) =>
            knownBookingIdsRef.current.add(b._id)
          );

          initialLoadRef.current = true;
        }
      } catch (e) {
        /* silent catch */
      }
    };

    checkIncomingOrders();

    const interval = setInterval(checkIncomingOrders, 10000);

    return () => clearInterval(interval);
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* Live Order Alert */}
      {newOrderAlert && (
        <div
          onClick={() => {
            router.push("/supplier");
            setNewOrderAlert(null);
          }}
          className="fixed right-5 top-24 z-50 w-[calc(100%-2.5rem)] max-w-sm cursor-pointer overflow-hidden rounded-2xl border border-brand/30 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-brand" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-light">
                <span className="text-lg" aria-hidden="true">
                  🔔
                </span>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-light">
                  New reservation
                </p>

                <h4 className="mt-1 text-sm font-bold text-white">
                  Reservation received
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {newOrderAlert.customer} placed a $
                  {newOrderAlert.amount} booking.
                </p>

                <p className="mt-2 font-mono text-[10px] text-slate-500">
                  #{newOrderAlert.id.slice(-6).toUpperCase()} •{" "}
                  {newOrderAlert.time}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setNewOrderAlert(null);
              }}
              aria-label="Dismiss notification"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span className="text-sm" aria-hidden="true">
                ✕
              </span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-[11px] font-medium text-slate-400">
              View in dashboard
            </span>

            <span className="text-xs font-bold text-brand-light">
              Open →
            </span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            {/* Brand */}
            <div className="shrink-0">
              <Link
                href="/supplier"
                className="group inline-flex items-center gap-3"
                aria-label="EcoTravel Supplier Dashboard"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-lg text-white shadow-lg shadow-brand/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-brand/30">
                  <span aria-hidden="true">✦</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    Eco
                    <span className="text-brand">Travel</span>
                  </span>

                  <span className="hidden rounded-full border border-brand/20 bg-brand-light px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-dark sm:inline-flex">
                    Supplier
                  </span>
                </div>
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center">
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-2 sm:gap-4">
                      {/* Notifications */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowNotifications(!showNotifications)
                          }
                          aria-label="Open order alerts"
                          aria-expanded={showNotifications}
                          className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                            showNotifications
                              ? "border-brand/30 bg-brand-light text-brand"
                              : "border-border bg-surface text-foreground-muted hover:border-brand/20 hover:bg-surface-muted hover:text-brand"
                          }`}
                          title="Live Order Alerts"
                        >
                          <span
                            className="text-base"
                            aria-hidden="true"
                          >
                            🔔
                          </span>

                          {unreadCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-background bg-brand px-1 text-[9px] font-bold leading-none text-white shadow-sm">
                              {unreadCount > 99 ? "99+" : unreadCount}
                            </span>
                          )}
                        </button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                          <>
                            {/* Mobile backdrop */}
                            <div
                              className="fixed inset-0 z-40 bg-slate-950/20 sm:hidden"
                              onClick={() =>
                                setShowNotifications(false)
                              }
                            />

                            <div className="fixed left-4 right-4 top-[82px] z-50 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-slate-950/10 sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-80">
                              {/* Header */}
                              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-bold text-foreground">
                                      Order alerts
                                    </h3>

                                    {unreadCount > 0 && (
                                      <span className="rounded-full bg-brand-light px-2 py-0.5 text-[9px] font-bold text-brand-dark">
                                        {unreadCount} new
                                      </span>
                                    )}
                                  </div>

                                  <p className="mt-0.5 text-[10px] text-foreground-subtle">
                                    Live reservation updates
                                  </p>
                                </div>

                                {notifications.length > 0 && (
                                  <button
                                    onClick={() => {
                                      setNotifications((prev) =>
                                        prev.map((n) => ({
                                          ...n,
                                          read: true,
                                        }))
                                      );
                                    }}
                                    className="text-[10px] font-semibold text-brand transition-colors hover:text-brand-dark"
                                  >
                                    Mark all read
                                  </button>
                                )}
                              </div>

                              {/* Content */}
                              {notifications.length === 0 ? (
                                <div className="px-5 py-12 text-center">
                                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-muted">
                                    <span
                                      className="text-xl"
                                      aria-hidden="true"
                                    >
                                      📭
                                    </span>
                                  </div>

                                  <p className="mt-4 text-xs font-bold text-foreground">
                                    No new alerts
                                  </p>

                                  <p className="mx-auto mt-1 max-w-[220px] text-[10px] leading-5 text-foreground-subtle">
                                    Incoming reservations will appear here
                                    automatically.
                                  </p>
                                </div>
                              ) : (
                                <div className="max-h-72 overflow-y-auto p-2">
                                  {notifications.map((n, i) => (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        router.push("/supplier");
                                        setShowNotifications(false);
                                      }}
                                      className={`cursor-pointer rounded-xl p-3 transition-all duration-200 ${
                                        n.read
                                          ? "hover:bg-surface-muted"
                                          : "border border-brand/15 bg-brand-light/60 hover:bg-brand-light"
                                      }`}
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 items-start gap-2.5">
                                          <div
                                            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                              n.read
                                                ? "bg-surface-muted"
                                                : "bg-brand/10"
                                            }`}
                                          >
                                            <span
                                              className="text-xs"
                                              aria-hidden="true"
                                            >
                                              {n.read ? "✓" : "•"}
                                            </span>
                                          </div>

                                          <div className="min-w-0">
                                            <p className="truncate text-[11px] font-bold text-foreground">
                                              {n.title}
                                            </p>

                                            <p className="mt-0.5 text-[10px] leading-4 text-foreground-muted">
                                              {n.desc}
                                            </p>
                                          </div>
                                        </div>

                                        <span className="shrink-0 text-[9px] font-medium text-foreground-subtle">
                                          {n.time}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* User */}
                      <div className="hidden items-center gap-3 border-l border-border pl-4 sm:flex">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-sm font-bold text-brand-dark">
                          {user.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>

                        <div className="hidden lg:block">
                          <p className="text-xs font-bold text-foreground">
                            {user.name}
                          </p>

                          <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-foreground-subtle">
                            Supplier account
                          </p>
                        </div>
                      </div>

                      {/* Dashboard */}
                      {user.role === "supplier" && (
                        <Link
                          href="/supplier"
                          className="hidden rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold text-foreground transition-all duration-200 hover:border-brand/20 hover:bg-surface-muted hover:text-brand md:inline-flex"
                        >
                          Dashboard
                        </Link>
                      )}

                      {/* Logout */}
                      <button
                        onClick={logout}
                        className="rounded-xl px-3 py-2.5 text-xs font-bold text-foreground-muted transition-colors hover:bg-surface-muted hover:text-foreground sm:px-4"
                      >
                        <span className="hidden sm:inline">
                          Log out
                        </span>
                        <span className="sm:hidden">Exit</span>
                      </button>
                    </div>
                  ) : (
                    /* Logged Out */
                    <div className="flex items-center gap-2">
                      <Link
                        href="/login"
                        className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground-muted transition-colors hover:bg-surface-muted hover:text-foreground sm:inline-flex"
                      >
                        Log in
                      </Link>

                      <Link
                        href="/register"
                        className="inline-flex items-center rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand/25 active:translate-y-0 sm:px-5"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}