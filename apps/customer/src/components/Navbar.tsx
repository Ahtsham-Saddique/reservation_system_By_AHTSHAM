"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthProvider';
import { useCart } from './CartProvider';
import CartSidebar from './CartSidebar';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (portalRef.current && !portalRef.current.contains(e.target as Node)) {
        setIsPortalOpen(false);
      }
    };
    if (isMobileMenuOpen || isPortalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, isPortalOpen]);

  const handleNavClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2" onClick={handleNavClick}>
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-md">
                  E
                </div>
                <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">EcoTravel.</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/search?type=hotel" className="text-sm font-semibold text-gray-600 hover:text-emerald-700">Hotels</Link>
              <Link href="/search?type=bus" className="text-sm font-semibold text-gray-600 hover:text-emerald-700">Buses</Link>
              <Link href="/search?type=tour" className="text-sm font-semibold text-gray-600 hover:text-emerald-700">Tours</Link>
              <Link href="/search?type=flight" className="text-sm font-semibold text-gray-600 hover:text-emerald-700">Flights</Link>
            </div>

            <div className="flex items-center gap-3">
              {user && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-600 hover:text-emerald-700 transition-colors rounded-full hover:bg-emerald-50"
                  aria-label="Open cart"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full shadow-sm">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              )}

              <div className="relative" ref={portalRef}>
                <button
                  onClick={() => setIsPortalOpen((prev) => !prev)}
                  className="hidden md:flex items-center gap-1 px-3 py-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <span>🚪</span> Portal Login
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isPortalOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Select Portal</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link href="/login" onClick={() => setIsPortalOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                        <span className="text-base">👤</span> Login as Customer
                      </Link>
                      <Link href="http://localhost:3002/login" onClick={() => setIsPortalOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                        <span className="text-base">🛡️</span> Login as Admin
                      </Link>
                      <Link href="http://localhost:3001/login" onClick={() => setIsPortalOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                        <span className="text-base">📦</span> Login as Supplier
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {!loading && (
                <>
                  {user ? (
                    <div className="hidden md:flex items-center gap-4">
                      <span className="text-sm font-bold text-gray-900">{user.name}</span>
                      <Link href="/bookings" className="text-sm font-semibold text-emerald-700 hover:text-emerald-600">My Bookings</Link>
                      <button onClick={logout} className="text-sm font-semibold text-gray-500 hover:text-red-600">Logout</button>
                    </div>
                  ) : (
                    <div className="hidden md:flex items-center gap-3">
                      <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-emerald-700 px-3 py-2">Log in</Link>
                      <Link href="/register" className="text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500 px-4 py-2 rounded-xl transition-all shadow-sm">Sign up</Link>
                    </div>
                  )}
                </>
              )}

              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 text-gray-700 hover:text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden border-t border-gray-100 bg-white shadow-lg">
            <div className="px-4 py-4 space-y-1">
              <Link href="/search?type=hotel" onClick={handleNavClick} className="block px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">Hotels</Link>
              <Link href="/search?type=bus" onClick={handleNavClick} className="block px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">Buses</Link>
              <Link href="/search?type=tour" onClick={handleNavClick} className="block px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">Tours</Link>
              <Link href="/search?type=flight" onClick={handleNavClick} className="block px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">Flights</Link>
              <div className="border-t border-gray-100 pt-2 mt-2">
                {user ? (
                  <>
                    <div className="px-3 py-2 bg-emerald-50 rounded-xl mb-2">
                      <p className="text-xs text-gray-500 font-medium">Logged in as</p>
                      <p className="font-black text-gray-900">{user.name}</p>
                    </div>
                    <Link href="/bookings" onClick={handleNavClick} className="block px-3 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">My Bookings</Link>
                    <button onClick={() => { logout(); handleNavClick(); }} className="w-full text-left px-3 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50">Logout</button>
                  </>
                ) : (
                  <div className="space-y-2 pt-1">
                    <Link href="/login" onClick={handleNavClick} className="block w-full text-center px-4 py-3 rounded-xl text-sm font-bold text-gray-700 border border-gray-200 hover:bg-gray-50">Log in</Link>
                    <Link href="/register" onClick={handleNavClick} className="block w-full text-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500">Sign up</Link>
                    
                    <div className="pt-3 mt-2 border-t border-gray-100">
                      <p className="px-3 text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Quick Portal Access</p>
                      <Link href="/login" onClick={handleNavClick} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-emerald-50">
                        <span>👤</span> Customer Login
                      </Link>
                      <Link href="http://localhost:3002/login" onClick={handleNavClick} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-purple-50">
                        <span>🛡️</span> Admin Login
                      </Link>
                      <Link href="http://localhost:3001/login" onClick={handleNavClick} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-blue-50">
                        <span>📦</span> Supplier Login
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
