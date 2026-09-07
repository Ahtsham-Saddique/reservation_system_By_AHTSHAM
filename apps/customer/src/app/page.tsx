"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState('2026');
  const [month, setMonth] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('location', destination);
    if (region) params.set('region', region);
    if (country) params.set('country', country);
    if (year) params.set('year', year);
    if (month) params.set('month', month);
    router.push(`/search?${params.toString()}`);
  };

  const regions = [
    { name: 'Asia', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80' },
    { name: 'Europe', image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80' },
    { name: 'Africa & Middle East', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80' },
    { name: 'South America', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80' },
  ];

  const promos = [
    { title: '2027 China Tours', save: '$500', from: '$2300', image: 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?auto=format&fit=crop&w=800&q=80' },
    { title: '2027 Asia Tours', save: '$500', from: '$1500', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80' },
    { title: '2027 Europe Tours', save: '$500', from: '$2800', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80' },
    { title: '2027 Africa Tours', save: '$300', from: '$2700', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80' },
  ];

  const popularTours = [
    { name: 'Scenic Yangtze Discovery', duration: '16 Days / 14 Nights', price: '$4500', image: 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?auto=format&fit=crop&w=800&q=80' },
    { name: 'Classic China', duration: '12 Days / 10 Nights', price: '$3400', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80' },
    { name: 'Timeless China', duration: '15 Days / 13 Nights', price: '$4200', image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=800&q=80' },
    { name: 'Thailand Explorer', duration: '12 Days / 10 Nights', price: '$2500', image: 'https://images.unsplash.com/photo-1558002038-1055907df29f?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-black tracking-tight">EcoTravel.</Link>
            <a href="tel:888-345-7489" className="hidden md:flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <span className="text-lg">📞</span> 888-345-7489
            </a>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[500px] w-full">
        <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white space-y-6">
            <span className="inline-block px-3 py-1 bg-emerald-600 text-xs font-black uppercase tracking-wider rounded-md">2027 Tours Live!</span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">Book now and save up to $1000 per couple</h1>
            <p className="text-lg text-emerald-100 font-medium">Offer applies to select tours and departures only. Terms & conditions apply.</p>
            <Link href="#promo" className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-lg">DISCOVER MORE</Link>
          </div>
        </div>
      </div>

      {/* Promo Cards */}
      <section id="promo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="relative h-64">
                <img src={promo.image} alt={promo.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-white/90 text-emerald-800 text-xs font-black px-2 py-1 rounded-md flex items-center gap-1">
                  <span className="text-emerald-600">💲</span> Save up to {promo.save}
                </div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-lg font-black text-gray-900 mb-1">{promo.title}</h3>
                <p className="text-sm text-gray-500 font-medium mb-4">Prices Starting From {promo.from}</p>
                <Link href="/search" className="block w-full text-center py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all text-sm">BOOK NOW</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Search for a trip</h2>
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1">Select Desired Region</label>
                <select value={region} onChange={e => setRegion(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Africa">Africa</option>
                  <option value="South America">South America</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1">Select Desired Countries</label>
                <select value={country} onChange={e => setCountry(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Italy">Italy</option>
                  <option value="France">France</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1">Departure Year</label>
                <select value={year} onChange={e => setYear(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1">Departure Month</label>
                <select value={month} onChange={e => setMonth(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select</option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-lg shadow-emerald-600/20">Search Tours</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Region Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Find your dream vacation in...</h2>
          <p className="text-gray-500 font-medium mt-2">We bring everywhere alive with tours that cover and look beyond the highlights.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, i) => (
            <Link key={i} href={`/search?region=${encodeURIComponent(region.name)}`} className="group relative h-72 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img src={region.image} alt={region.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-black">{region.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tours */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Our most popular tours</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTours.map((tour, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img src={tour.image} alt={tour.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-gray-900 mb-1">{tour.name}</h3>
                  <p className="text-sm text-gray-500 font-medium mb-3">{tour.duration}</p>
                  <p className="text-sm text-gray-900 font-black mb-4">From {tour.price}</p>
                  <Link href={`/search?name=${encodeURIComponent(tour.name)}`} className="block w-full text-center py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all text-sm">View tour</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Get in contact today to start building your perfect tour.</h2>
          <Link href="/contact" className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-lg">Contact Us</Link>
        </div>
      </section>

      {/* Footer */}
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
              <form onSubmit={e => { e.preventDefault(); alert('Subscribed!'); }} className="flex gap-2">
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
    </div>
  );
}
