"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'hotel';
  const location = searchParams.get('location') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/search`);
        url.searchParams.append('type', type);
        if (location) url.searchParams.append('location', location);
        if (sort) url.searchParams.append('sort', sort);
        const res = await fetch(url.toString(), { cache: 'no-store' });
        const data = await res.json();
        if (data.success) setResults(data.data);
      } catch (error) {
        console.error("Failed to fetch results", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [type, location, sort]);

  const pageTitle = type === 'hotel' ? 'Hotels' : type === 'flight' ? 'Flights' : type === 'bus' ? 'Buses' : 'Tours';

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0f172a] pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">{pageTitle} {location && <span className="text-emerald-300">in {location}</span>}</h1>
          <p className="text-emerald-100/80 text-lg max-w-2xl mx-auto font-medium">We found {results.length} options curated just for you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-wrap justify-between items-center gap-4">
          <div className="text-sm font-bold text-gray-700">{results.length} results found</div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-500">Sort by:</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 font-medium outline-none">
              <option value="">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              {type === 'hotel' && <option value="rating_desc">Top Rated</option>}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 w-full bg-gray-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {results.map((item, idx) => (
              <SearchCard key={item._id} item={item} type={type} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">No results found</h2>
            <p className="text-gray-500 font-medium max-w-md mx-auto">Try adjusting your search or explore our popular destinations.</p>
            <Link href="/" className="mt-8 inline-flex px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg">Back to Home</Link>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchCard({ item, type }: { item: any, type: string }) {
  let title = '';
  let price = 0;
  let image = '';
  let href = `/${type}/${item._id}`;

  if (type === 'hotel') {
    title = item.name;
    price = item.rooms && item.rooms.length > 0 ? item.rooms[0].price : 0;
    image = item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
  } else if (type === 'bus') {
    title = `${item.origin} to ${item.destination}`;
    price = item.fare;
    image = item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80';
  } else if (type === 'tour') {
    title = item.title;
    price = item.price;
    image = item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80';
  } else if (type === 'flight') {
    title = `${item.origin} to ${item.destination}`;
    price = item.price;
    image = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80';
  }

  return (
    <Link href={href} className="group block bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3 bg-white/90 text-emerald-800 text-xs font-black px-2 py-1 rounded-md flex items-center gap-1">
          <span>💲</span> Save up to $500
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 font-medium mb-3">Prices Starting From ${price}</p>
        <span className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all text-sm">View Details</span>
      </div>
    </Link>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white pt-32 px-4 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-gray-500 text-sm">Searching...</p>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
