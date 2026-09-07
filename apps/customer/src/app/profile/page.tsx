"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", phone: "", travelerName: "", travelerPassport: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push("/login");
      else fetchProfile();
    }
  }, [user, authLoading, router]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setFormData({
          name: data.data.name || "",
          phone: data.data.phone || "",
          travelerName: data.data.savedTraveler?.name || "",
          travelerPassport: data.data.savedTraveler?.passport || ""
        });
      }
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const payload = { name: formData.name, phone: formData.phone, savedTraveler: { name: formData.travelerName, passport: formData.travelerPassport } };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Profile settings updated successfully!");
        setTimeout(() => setSuccess(""), 4000);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err: any) { setError("Network error updating profile."); } finally { setLoading(false); }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white pt-32 flex justify-center">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">My Profile</h1>
            <p className="text-gray-500 font-medium mt-1">Update your account details and saved traveler information.</p>
          </div>
          <Link href="/bookings" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 transition-all text-sm">
            <span>🎫</span> My Bookings
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl font-medium text-sm border border-red-100">⚠️ {error}</div>}
          {success && <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl font-medium text-sm border border-emerald-100">✓ {success}</div>}
          
          <form onSubmit={handleUpdate} className="space-y-8">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900">Personal Information</h3>
                <p className="text-xs text-gray-400 font-medium">Update your account credentials and contact info</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" value={user?.email || ""} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 text-sm font-medium cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Account Role</label>
                  <input type="text" value={user?.role?.toUpperCase() || ""} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 text-sm font-bold cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900">Saved Passenger & Traveler Info</h3>
                <p className="text-xs text-gray-400 font-medium">Auto-populates your details at checkout for instant booking</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Primary Traveler Name</label>
                  <input type="text" placeholder="As shown on Passport / ID" value={formData.travelerName} onChange={e => setFormData({...formData, travelerName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Passport / ID Number</label>
                  <input type="text" placeholder="e.g. A12345678" value={formData.travelerPassport} onChange={e => setFormData({...formData, travelerPassport: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button disabled={loading} type="submit" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] text-sm disabled:opacity-50">
                {loading ? "Saving Details..." : "Save Profile Details"}
              </button>
            </div>
          </form>
        </div>

        <div className="flex sm:hidden">
          <Link href="/bookings" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 transition-all text-sm">
            <span>🎫</span> My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
