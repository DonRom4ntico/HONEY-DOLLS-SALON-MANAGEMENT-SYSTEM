// src/pages/CustomerTransaction.jsx
import React from "react";
import { Bell, Search, Trash2, Minus, Plus } from "lucide-react";

// TEMPORARY FIX: Use placeholder until you add real logo
const logo = "https://via.placeholder.com/56/FFD36E/FFFFFF?text=HD";

export default function CustomerTransaction() {
  const cartItems = [
    { name: "Haircut & Styling", desc: "Includes shampoo & blowdry — 45 min", price: 500, qty: 1 },
    { name: "Hair Spa — Deep Nourish", desc: "Mask treatment & warm towel — 60 min", price: 400, qty: 1 },
    { name: "Shampoo — Hydrate+", desc: "250ml • Salon formula", price: 150, qty: 1 },
    { name: "Manicure — Gel", desc: "Classic gel finish — 60 min", price: 450, qty: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = subtotal * 0.12;
  const total = subtotal + vat;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Honey Dolls Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-orange-900">Honey Dolls & Brilliant</h1>
              <p className="text-sm text-orange-800 font-medium">Beauty Hub — Davao</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-yellow-600" />
            <span className="text-orange-900 font-medium text-sm hidden sm:inline">
              Customer: <span className="text-yellow-600">Jessa Mae</span>
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full flex flex-col lg:flex-row gap-6">
        {/* LEFT: CART */}
        <section className="flex-1 bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Items in your cart</h3>
            <p className="text-sm text-gray-600 mt-1">Review services & products. Reserve items or pay on visit.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
              <span className="text-gray-700">Select all</span>
            </label>
            <button className="text-pink-600 hover:text-pink-700 font-medium">Remove selected</button>
            <div className="flex-1" />
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search in cart..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full text-sm focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          <div className="space-y-3">
            {cartItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <input type="checkbox" className="w-5 h-5 text-orange-500 rounded border-gray-300" />
                <div className="w-16 h-16 bg-gray-200 rounded-xl border border-gray-300" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                </div>
                <div className="text-right w-20">
                  <p className="font-bold text-gray-900">₱{item.price}</p>
                </div>
                <div className="flex items-center gap-1 mx-3">
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900">{item.qty}</span>
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-right w-20">
                  <p className="font-bold text-gray-900">₱{item.price * item.qty}</p>
                </div>
                <button className="text-pink-600 hover:text-pink-700 ml-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-200 gap-3">
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-orange-500 rounded border-gray-300" />
                <span className="text-gray-700">Select all</span>
              </label>
              <button className="text-pink-600 hover:text-pink-700 font-medium">Remove selected</button>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Subtotal: ₱{subtotal}</p>
              <p className="font-bold text-lg text-gray-900">Total: ₱{total.toFixed(0)}</p>
            </div>
            <button className="bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] text-white font-bold px-8 py-3 rounded-full shadow hover:shadow-md transition text-sm">
              Checkout
            </button>
          </div>
        </section>

        {/* RIGHT: ORDER SUMMARY */}
        <aside className="lg:w-80">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 sticky top-6">
            <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {cartItems.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-700">{item.name} x{item.qty}</span>
                  <span className="font-medium text-gray-900">₱{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-200 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (12%)</span>
                <span className="text-gray-900">₱{vat.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-900">Total</span>
                <span className="text-orange-600">₱{total.toFixed(0)}</span>
              </div>
            </div>
            <div className="space-y-3 pt-3">
              <button className="w-full bg-pink-100 text-pink-700 font-medium py-2.5 rounded-full hover:bg-pink-200 transition text-sm">
                Reserve products for visit
              </button>
              <div className="flex gap-2">
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-full hover:bg-gray-50 transition text-sm">
                  Pay on Visit
                </button>
                <button className="flex-1 bg-yellow-500 text-white font-medium py-2.5 rounded-full hover:bg-yellow-600 transition text-sm">
                  Pay Now
                </button>
              </div>
              <button className="w-full bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition">
                Confirm
              </button>
            </div>
            <div className="flex gap-2 pt-2">
              <button className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm hover:bg-gray-50 transition">
                Save
              </button>
              <button className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full text-sm hover:bg-gray-50 transition">
                Clear
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center pt-2">
              Note: Items Checkout will be reserved and must be picked up at the store.
            </p>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="bg-white/80 py-3 border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Open Daily 9:00AM–9:00PM
          </p>
        </div>
      </footer>
    </div>
  );
}