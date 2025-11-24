// src/pages/PurchaseOrder.jsx
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function PurchaseOrder() {
  const [items, setItems] = useState([
    { name: 'Shampoo 250ml', qty: 10, unitCost: 150.0, subtotal: 1500.0 },
    { name: 'Hair Serum 100ml', qty: 5, unitCost: 300.0, subtotal: 1500.0 },
    { name: 'Manicure 100ml', qty: 5, unitCost: 300.0, subtotal: 1500.0 },
  ]);

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-orange-900">Honey Dolls — Purchase Order</h1>
          <p className="text-sm text-orange-700">Create Purchase Order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* PO Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purchase ID</label>
                  <div className="text-2xl font-bold text-orange-900">PO-2025-001</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent">
                    <option>Select supplier</option>
                    <option>L'Oréal Philippines</option>
                    <option>Watsons</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="text"
                    value="+63 917 123 4567"
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400">
                  <option>Select payment method</option>
                  <option>Cash on Delivery</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              {/* Products Table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Products</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium text-gray-700">Product Name</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-700">Quantity</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-700">Unit Cost</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-700">Subtotal</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-4 text-gray-800">{item.name}</td>
                          <td className="px-4 py-4 text-gray-800">{item.qty}</td>
                          <td className="px-4 py-4 text-gray-800">₱{item.unitCost.toFixed(2)}</td>
                          <td className="px-4 py-4 font-medium text-orange-700">₱{item.subtotal.toFixed(2)}</td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => removeItem(index)}
                              className="text-pink-600 hover:text-pink-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div className="mt-6 text-center">
                  <p className="text-lg font-bold text-gray-800">TOTAL: ₱{total.toFixed(2)}</p>
                </div>

                {/* Add Product Button - EXACT DESIGN FROM IMAGE */}
                <div className="mt-8 flex justify-center">
                  <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-3 text-lg">
                    <Plus className="w-6 h-6" />
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase ID:</span>
                  <span className="font-medium">PO-2025-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ordered Date:</span>
                  <span className="font-medium">11/1/2025</span>
                </div>
                <hr className="my-4" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Shampoo 250ml</span>
                    <span className="text-gray-600">10 × ₱150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hair Serum 100ml</span>
                    <span className="text-gray-600">5 × ₱300.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Manicure 100ml</span>
                    <span className="text-gray-600">5 × ₱300.00</span>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-medium">
                  <span>Total Items:</span>
                  <span>20</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-orange-700">
                  <span>Total:</span>
                  <span>₱4,500.00</span>
                </div>
              </div>

              {/* Action Buttons - EXACT DESIGN FROM IMAGE */}
              <div className="mt-8 space-y-4">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-5 rounded-full shadow-lg hover:shadow-xl transition text-lg">
                  Finalize Order
                </button>
                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-5 rounded-full shadow-lg hover:shadow-xl transition text-lg">
                  Submit Purchase Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}