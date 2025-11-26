// src/pages/CustomerTransaction.jsx
import React, { useState } from "react";
import CustomerLayout from "../../layout/customerLayout";
import { Search, Trash2, Minus, Plus } from "lucide-react";

export default function CustomerTransaction() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Haircut & Styling", desc: "Includes shampoo & blowdry — 45 min", price: 500, qty: 1 },
    { id: 2, name: "Hair Spa — Deep Nourish", desc: "Mask treatment & warm towel — 60 min", price: 400, qty: 1 },
    { id: 3, name: "Shampoo — Hydrate+", desc: "250ml • Salon formula", price: 150, qty: 1 },
    { id: 4, name: "Manicure — Gel", desc: "Classic gel finish — 60 min", price: 450, qty: 1 },
  ]);

  const increaseQty = (id) => setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  const decreaseQty = (id) => setCartItems(prev => prev.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = Math.round(subtotal * 0.12);
  const total = subtotal + vat;

  return (
    <CustomerLayout>
      <main className="min-h-screen bg-[#FEF6F0] pt-20 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#F3E6E1] shadow-xl overflow-hidden">

            {/* ==================== CART ITEMS (TOP ON MOBILE) ==================== */}
            <section className="p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-[#3a2b2b]">Items in your cart</h3>
              <p className="text-sm text-[#7f6b6b] mt-1">Review services & products. Reserve items or pay on visit.</p>

              {/* Top Controls */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-orange-600 rounded border-[#f1dede]" />
                  <span className="text-sm text-[#6f5f5f]">Select all</span>
                </label>
                <button className="text-sm text-pink-400 hover:text-pink-600">Remove selected</button>
                <div className="flex-1" />
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d4c0bd]" />
                  <input
                    type="text"
                    placeholder="Search in cart..."
                    className="w-full pl-12 pr-6 py-3 border border-[#F1E4E0] rounded-full text-sm bg-[#FCF6F4] focus:outline-none focus:border-pink-300"
                  />
                </div>
              </div>

              {/* Cart Items */}
              <div className="mt-6 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border border-[#F2E6E2] bg-[#FFFDFC] hover:shadow-sm transition">
                    <input type="checkbox" className="w-6 h-6 rounded border-[#F3E6E1] mt-1 sm:mt-0" />
                    <div className="w-20 h-20 bg-[#F9ECE9] border-2 border-dashed border-pink-200 rounded-xl flex-shrink-0" />
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-[#3b2c2c]">{item.name}</h4>
                      <p className="text-xs text-[#8b7a7a] mt-1">{item.desc}</p>
                    </div>

                    <div className="w-full sm:w-auto flex flex-col sm:flex-row items-end sm:items-center justify-between sm:justify-end gap-4 text-sm">
                      <div className="text-right">
                        <p className="text-[#6f5f5f]">Unit Price</p>
                        <p className="font-bold text-[#3b2c2c]">₱{item.price}</p>
                      </div>

                      <div className="flex items-center gap-2 bg-white rounded-full shadow-inner px-4 py-2">
                        <button onClick={() => decreaseQty(item.id)} className="w-9 h-9 rounded-full hover:bg-pink-50 transition">
                          <Minus className="w-4 h-4 text-pink-600" />
                        </button>
                        <span className="w-10 text-center font-bold text-[#3b2c2c]">{item.qty}</span>
                        <button onClick={() => increaseQty(item.id)} className="w-9 h-9 rounded-full hover:bg-pink-50 transition">
                          <Plus className="w-4 h-4 text-pink-600" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-[#6f5f5f]">Total</p>
                        <p className="font-bold text-pink-600">₱{item.price * item.qty}</p>
                      </div>

                      <button onClick={() => removeItem(item.id)} className="text-pink-500 hover:text-red-600 transition">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ==================== ORDER SUMMARY (BOTTOM ON MOBILE) ==================== */}
            <section className="border-t-2 border-dashed border-pink-100 bg-gradient-to-b from-pink-50 to-orange-50 lg:bg-transparent lg:border-t-0">
              <div className="p-6 lg:p-8 lg:sticky lg:top-24 lg:bg-[#FFFDFC] lg:border-l lg:border-t-0 lg:border-dashed lg:border-pink-100">
                <h2 className="text-2xl font-bold text-[#3b2c2c] mb-6">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-700">{item.name} × {item.qty}</span>
                      <span className="font-bold">₱{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t-2 border-dashed border-pink-300">
                  <div className="flex justify-between text-lg font-bold text-[#3b2c2c] mb-2">
                    <span>Total Amount</span>
                    <span>₱{total}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-6">Includes ₱{vat} VAT (12%)</p>

                  <textarea
                    placeholder="Add note or reserve for pickup..."
                    className="w-full p-4 rounded-xl border border-pink-200 bg-white/80 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                    rows={3}
                  />

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button className="py-4 rounded-xl font-bold border-2 border-orange-300 bg-orange-100 text-orange-800 hover:bg-orange-200 transition">
                      Pay on Visit
                    </button>
                    <button className="py-4 rounded-xl font-bold border-2 border-pink-300 bg-pink-100 text-pink-800 hover:bg-pink-200 transition">
                      Pay Now
                    </button>
                  </div>

                  <button className="w-full mt-4 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] shadow-lg hover:shadow-xl transition transform hover:scale-105">
                    Confirm & Reserve
                  </button>

                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">Save Cart</button>
                    <button className="flex-1 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition">Clear All</button>
                  </div>

                  <p className="text-xs text-center text-gray-600 mt-6">
                    Items will be reserved for pickup at Honey Dolls Davao
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </CustomerLayout>
  );
}