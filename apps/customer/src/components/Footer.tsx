"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-black text-lg mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/search?region=Asia" className="hover:text-emerald-300">Asia</Link></li>
              <li><Link href="/search?region=Europe" className="hover:text-emerald-300">Europe</Link></li>
              <li><Link href="/search?region=Africa" className="hover:text-emerald-300">Africa & Middle East</Link></li>
              <li><Link href="/search?region=South+America" className="hover:text-emerald-300">South America</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-lg mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/info/visa" className="hover:text-emerald-300">Visas & Passports</Link></li>
              <li><Link href="/info/faq" className="hover:text-emerald-300">FAQ</Link></li>
              <li><Link href="/info/before-trip" className="hover:text-emerald-300">Before Your Trip</Link></li>
              <li><Link href="/info/about" className="hover:text-emerald-300">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/contact" className="hover:text-emerald-300">Contact</Link></li>
              <li><Link href="/bookings" className="hover:text-emerald-300">My Account</Link></li>
              <li><Link href="/checkout" className="hover:text-emerald-300">Online Payment</Link></li>
              <li><Link href="/bookings" className="hover:text-emerald-300">Manage my booking</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-lg mb-4">Join our mailing list</h4>
            <p className="text-sm text-gray-300 mb-3">For all the latest news and promotions</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }} className="flex gap-2">
              <input type="email" required placeholder="Your email" className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-sm transition-colors">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">All Rights Reserved © 2026 – EcoTravel Reservation System</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link>
            <Link href="/" className="text-sm text-gray-300 hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
