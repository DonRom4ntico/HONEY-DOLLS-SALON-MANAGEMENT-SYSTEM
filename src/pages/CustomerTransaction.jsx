// src/pages/CustomerTransaction.jsx
import React, { useState } from "react";
import CustomerLayout from "../layout/customerLayout";
import { Search, Trash2, Minus, Plus } from "lucide-react";

export default function CustomerTransaction() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Haircut & Styling", desc: "Includes shampoo & blowdry — 45 min", price: 500, qty: 1 },
    { id: 2, name: "Hair Spa — Deep Nourish", desc: "Mask treatment & warm towel — 60 min", price: 400, qty: 1 },
    { id: 3, name: "Shampoo — Hydrate+", desc: "250ml • Salon formula", price: 150, qty: 1 },
    { id: 4, name: "Manicure — Gel", desc: "Classic gel finish — 60 min", price: 450, qty: 1 },
  ]);

  const increaseQty = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = Math.round(subtotal * 0.12);
  const total = subtotal + vat;

  return (
    <CustomerLayout>
      <main className="min-h-screen bg-[#FEF6F0]">
        {/* THIS IS THE ONLY CHANGE — proper spacing so header is visible */}
        <div className="pt-32 pb-12"> {/* ← Increased from pt-6 to pt-32 */}
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="bg-white rounded-2xl border border-[#F3E6E1] shadow-sm p-6">
              <div className="flex gap-8">
                {/* LEFT: Cart area */}
                <section className="flex-1">
                  <div className="p-6 bg-transparent rounded-lg">
                    <h3 className="text-2xl font-bold text-[#3a2b2b]">Items in your cart</h3>
                    <p className="text-sm text-[#7f6b6b] mt-1">Review services & products. Reserve items or pay on visit.</p>

                    <div className="flex items-center gap-4 mt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-orange-600 rounded border-[#f1dede]" />
                        <span className="text-sm text-[#6f5f5f]">Select all</span>
                      </label>
                      <button className="text-sm text-pink-400">Remove selected</button>
                      <div className="flex-1" />
                      <div className="relative w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4c0bd]" />
                        <input
                          type="text"
                          placeholder="Search in cart..."
                          className="pl-12 pr-4 py-2 w-full border border-[#F1E4E0] rounded-full text-sm bg-[#FCF6F4] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <div className="max-h-[520px] overflow-y-auto pr-3 space-y-4">
                            {cartItems.map(item => (
                              <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-[#F2E6E2] bg-[#FFFDFC]">
                                <input type="checkbox" className="w-6 h-6 rounded border-[#F3E6E1]" />
                                <div className="w-20 h-20 bg-[#F9ECE9] border border-[#F1E4E0] rounded-lg flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-[#3b2c2c]">{item.name}</h4>
                                  <p className="text-xs text-[#8b7a7a] mt-1">{item.desc}</p>
                                </div>
                                <div className="text-right w-24">
                                  <p className="font-bold text-[#3b2c2c]">₱{item.price}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-white rounded-full shadow-sm px-3 py-1">
                                  <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 rounded-full hover:bg-[#faf5f4] flex items-center justify-center">
                                    <Minus className="w-4 h-4 text-[#a08b8b]" />
                                  </button>
                                  <span className="w-9 text-center font-semibold">{item.qty}</span>
                                  <button onClick={() => increaseQty(item.id)} className="w-8 h-8 rounded-full hover:bg-[#faf5f4] flex items-center justify-center">
                                    <Plus className="w-4 h-4 text-[#a08b8b]" />
                                  </button>
                                </div>
                                <div className="text-right w-24">
                                  <p className="font-semibold text-pink-600">₱{item.price * item.qty}</p>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="text-sm text-pink-400 ml-2">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 p-4 rounded-lg border border-[#F2E6E2] bg-[#FFFDFC] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 text-orange-600 rounded" />
                                <span className="text-sm text-[#6f5f5f]">Select all</span>
                              </label>
                              <button className="text-sm text-pink-400">Remove selected</button>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right mr-4">
                                <div className="text-sm text-[#6f5f5f]">Subtotal: <span className="font-bold text-[#3b2c2c]">₱{subtotal}</span></div>
                                <div className="text-sm text-[#6f5f5f]">Total: <span className="font-bold text-[#3b2c2c]">₱{total}</span></div>
                              </div>
                              <button className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] shadow">
                                Checkout
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* RIGHT: ORDER SUMMARY */}
                <aside className="w-96 flex-shrink-0 ml-6">
                  <div className="sticky top-28 p-4 rounded-lg border border-[#F2E6E2] bg-[#FFFDFC]">
                    <h2 className="font-bold text-lg text-[#3b2c2c] mb-4">Order Summary</h2>
                    <div className="space-y-2 text-sm text-[#5e4d4d]">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name} x {item.qty}</span>
                          <span className="font-semibold">₱{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#F1E4E0] mt-4 pt-4 text-sm">
                      <div className="flex justify-between mb-2">
                        <span className="text-[#6f5f5f]">VAT (12%)</span>
                        <span className="font-semibold">₱{vat}</span>
                      </div>
                      <div className="flex justify-between font-bold text-[#3b2c2c] text-lg mb-4">
                        <span>Total</span>
                        <span>₱{total}</span>
                      </div>
                      <textarea placeholder="Reserve products for visit" className="w-full text-sm p-2 border border-[#F1E4E0] rounded-md mb-3 bg-[#FCF6F4]" />
                      <div className="flex gap-3 mb-4">
                        <button className="flex-1 py-2 rounded-md border-2 border-[#F6D686] bg-[#FFF7E6] font-semibold">Pay on Visit</button>
                        <button className="flex-1 py-2 rounded-md border border-[#E8D6D6]">Pay Now</button>
                      </div>
                      <button className="w-full py-3 rounded-full font-bold bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] mb-3">Confirm</button>
                      <div className="flex gap-3">
                        <button className="flex-1 py-2 rounded-md border border-[#E8D6D6]">Save</button>
                        <button className="flex-1 py-2 rounded-md border border-[#E8D6D6]">Clear</button>
                      </div>
                      <p className="text-xs text-[#a08989] mt-4">
                        Note: Items Checkout will be reserve and must be pick up on the said store
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>
    </CustomerLayout>
  );
}