// src/pages/supplierPurchases.jsx
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import AdminLayout from "../../../layout/adminLayout";

export default function SupplierPurchases() {
  const [items, setItems] = useState([
    { id: 1, name: "Shampoo 250ml", qty: 10, unitCost: 150, subtotal: 1500 },
    { id: 2, name: "Hair Serum 100ml", qty: 5, unitCost: 300, subtotal: 1500 },
    { id: 3, name: "Manicure 100ml", qty: 5, unitCost: 300, subtotal: 1500 },
  ]);

  const [supplier, setSupplier] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [purchaseID] = useState(
    `PO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(3, "0")}`,
  );

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

  const removeItem = (id) => setItems(items.filter((item) => item.id !== id));

  const gradientBtnStyle = {
    background: "linear-gradient(to right, #ec4899, #f97316)",
    boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
    color: "white",
    borderRadius: "9999px",
    fontWeight: "600",
    padding: "8px 16px",
    fontSize: "0.9rem",
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Honey Dolls — Purchase Order
        </h1>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* PURCHASE DETAILS */}
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100">
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Purchase ID
                  </label>
                  <div className="px-3 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl font-bold text-orange-800 text-sm sm:text-base">
                    {purchaseID}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Supplier
                  </label>
                  <select
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full px-3 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                  >
                    <option>Select supplier</option>
                    <option>L'Oréal Philippines</option>
                    <option>Revlon Asia</option>
                    <option>Beauty Essentials Inc.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value="+63 917 123 4567"
                    readOnly
                    className="w-full px-3 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 sm:px-5 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                >
                  <option>Select payment method</option>
                  <option>Bank Transfer</option>
                  <option>Cash on Delivery</option>
                  <option>Check Payment</option>
                </select>
              </div>
            </div>

            {/* PRODUCTS LIST (MOBILE-FRIENDLY) */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <h3 className="text-lg font-bold text-gray-900">Products</h3>
                <button
                  style={gradientBtnStyle}
                  className="inline-flex items-center gap-2 text-sm sm:text-base"
                >
                  <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
                  Add Product
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                {items.length === 0 && (
                  <p className="text-gray-500 text-sm sm:text-base">
                    No products added yet.
                  </p>
                )}

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-orange-50 rounded-xl p-3 sm:p-4 shadow-sm"
                  >
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-bold text-sm sm:text-base">
                        {item.qty}
                      </span>
                      <span className="text-sm sm:text-base">
                        ₱{item.unitCost.toLocaleString()}
                      </span>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        ₱{item.subtotal.toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 sm:w-5 h-4 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 sm:p-6 border-t-4 border-orange-300 text-center text-sm sm:text-base">
                <span className="text-lg sm:text-2xl font-bold text-gray-900">
                  TOTAL: ₱{totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="p-4 sm:p-6 text-center">
                <button
                  style={gradientBtnStyle}
                  className="w-full sm:w-auto text-base sm:text-lg px-4 sm:px-12 py-3"
                >
                  Submit Purchase Order
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border p-4 sm:p-6 mt-6 lg:mt-0 sticky top-4 sm:top-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Purchase ID:</span>
                  <span className="font-bold text-orange-600">
                    {purchaseID}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Ordered Date:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString("en-PH")}
                  </span>
                </div>

                <div className="border-t pt-3 sm:pt-4">
                  <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">
                    Items:
                  </h4>
                  <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm sm:text-base"
                      >
                        <span className="text-gray-700">{item.name}</span>
                        <div className="text-right">
                          <div className="font-medium">{item.qty} ×</div>
                          <div className="text-orange-600 font-bold">
                            ₱{item.subtotal.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-2 sm:pt-4 space-y-2 sm:space-y-3">
                  <div className="flex justify-between font-semibold text-sm sm:text-base">
                    <span>Total Items:</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900">
                    <span>Total:</span>
                    <span>₱{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  style={gradientBtnStyle}
                  className="w-full text-sm sm:text-base py-2 sm:py-3 mt-4 sm:mt-6"
                >
                  Finalize Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
