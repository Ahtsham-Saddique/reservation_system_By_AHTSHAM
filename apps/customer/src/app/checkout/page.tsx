"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || "",
    lastName: user?.name?.split(' ')[1] || "",
    email: user?.email || "",
    phone: "",
    specialRequests: "",
    cardNumber: ""
  });

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState<{type: string, value: number} | null>(null);
  const [promoMessage, setPromoMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setPromoMessage({ type: '', text: '' });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/commerce/validate-coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode })
      });
      const data = await res.json();
      if (data.success) {
        setDiscount({ type: data.data.discountType, value: data.data.discountValue });
        setPromoMessage({ type: 'success', text: `Promo code applied successfully!` });
      } else {
        setPromoMessage({ type: 'error', text: data.message || 'Invalid promo code' });
      }
    } catch (err: any) {
      setPromoMessage({ type: 'error', text: 'Failed to validate promo code' });
    }
  };

  const handleRemovePromo = () => {
    setDiscount(null);
    setPromoCode("");
    setPromoMessage({ type: '', text: '' });
  };

  const getFinalTotal = () => {
    if (!discount) return cartTotal;
    if (discount.type === 'fixed') return Math.max(0, cartTotal - discount.value);
    if (discount.type === 'percentage') return cartTotal * (1 - discount.value / 100);
    return cartTotal;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const paymentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/commerce/charge`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cardNumber: formData.cardNumber, amount: getFinalTotal() })
      });
      const paymentData = await paymentRes.json();
      if (!paymentRes.ok || !paymentData.success) {
        throw new Error(paymentData.message || "Payment failed");
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ items: cart, totalAmount: getFinalTotal(), guestDetails: formData })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create booking");
      }
      setSuccess(true);
      clearCart();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t selected any trips yet.</p>
        <Link href="/" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg transition-all">Explore Destinations</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
          <svg className="w-12 h-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-gray-900 mb-4">Booking Confirmed!</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md text-center">Thank you for choosing EcoTravel. Confirmation details have been sent to <span className="font-bold text-gray-900">{formData.email}</span>.</p>
        <Link href="/" className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-xl shadow-lg transition-all">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Secure Checkout</h1>
            <p className="text-gray-500 font-medium mb-8">Complete your booking by providing your details below.</p>
            <form onSubmit={handleCheckout} className="space-y-8">
              {error && (<div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 font-medium">{error}</div>)}
              <section className="space-y-4">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm">1</span>
                  Guest Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required minLength={2} maxLength={50} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required minLength={2} maxLength={50} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="+1 234 567 8900" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" />
                  </div>
                </div>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm">2</span>
                  Discounts
                </h2>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Have a promo code?</label>
                  <div className="flex gap-3">
                    <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Enter code (e.g. ECO2026)" className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all uppercase" />
                    <button type="button" onClick={handleApplyPromo} className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-sm">Apply</button>
                  </div>
                  {promoMessage.text && (<p className={`text-sm font-medium mt-3 ${promoMessage.type === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>{promoMessage.text}</p>)}
                  {discount && (
                    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="text-emerald-800 font-bold">Discount Applied</p>
                        <p className="text-emerald-600 text-sm font-medium">-{discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}</p>
                      </div>
                      <button type="button" onClick={handleRemovePromo} className="text-red-500 hover:text-red-700 text-sm font-bold px-3 py-1 bg-white rounded-lg border border-red-100 hover:border-red-200 transition-colors">Remove</button>
                    </div>
                  )}
                </div>
              </section>
              <section className="space-y-4">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm">3</span>
                  Payment <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md ml-2">EcoPay Secured</span>
                </h2>
                <div className="p-6 border-2 border-emerald-500 bg-emerald-50/30 rounded-2xl relative overflow-hidden mb-6">
                  <p className="text-sm text-gray-600 mb-4">Use a card ending in 4242 to test a successful payment.</p>
                  <div className="relative">
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="•••• •••• •••• 4242" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono" />
                  </div>
                </div>
              </section>
              <button type="submit" disabled={loading} className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 text-lg flex items-center justify-center gap-3 disabled:opacity-70">
                {loading ? (<><span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> Processing...</>) : (`Pay $${getFinalTotal().toFixed(2)} & Book`)}
              </button>
            </form>
          </div>
          <div className="hidden lg:block lg:w-96">
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-28">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-bold leading-snug">{item.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{item.itemModel.toUpperCase()} • Qty {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-black">${item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${cartTotal}</span></div>
                {discount && (<div className="flex justify-between text-emerald-700 font-bold"><span>Discount</span><span>-{discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}</span></div>)}
                <div className="flex justify-between text-gray-900 text-2xl font-black pt-4 border-t border-gray-200 mt-4">
                  <span>Total</span>
                  <span>${getFinalTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
