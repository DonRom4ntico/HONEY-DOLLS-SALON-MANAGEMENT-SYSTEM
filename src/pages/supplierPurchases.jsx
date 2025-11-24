// src/pages/supplierPurchases.jsx
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';

export default function SupplierPurchases() {
  const [items, setItems] = useState([
    { id: 1, name: 'Shampoo 250ml', qty: 10, unitCost: 150, subtotal: 1500 },
    { id: 2, name: 'Hair Serum 100ml', qty: 5, unitCost: 300, subtotal: 1500 },
    { id: 3, name: 'Manicure 100ml', qty: 5, unitCost: 300, subtotal: 1500 },
  ]);

  const [supplier, setSupplier] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Generate PO only once
  const [purchaseID] = useState(
    `PO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(3, '0')}`
  );

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

  const removeItem = (id) => setItems(items.filter(item => item.id !== id));

  const gradientBtn =
    "text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105";

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Honey Dolls — Purchase Order</h1>
        <p className="text-gray-700 mb-8">Create Purchase Order</p>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">

              <div className="grid md:grid-cols-3 gap-6">
                {/* Purchase ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Purchase ID</label>
                  <div className="px-5 py-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl font-bold text-orange-800">
                    {purchaseID}
                  </div>
                </div>

                {/* Supplier */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Supplier</label>
                  <select
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  >
                    <option>Select supplier</option>
                    <option>L'Oréal Philippines</option>
                    <option>Revlon Asia</option>
                    <option>Beauty Essentials Inc.</option>
                  </select>
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="text"
                    value="+63 917 123 4567"
                    readOnly
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                >
                  <option>Select payment method</option>
                  <option>Bank Transfer</option>
                  <option>Cash on Delivery</option>
                  <option>Check Payment</option>
                </select>
              </div>
            </div>

            {/* PRODUCTS TABLE */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Products</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-sm font-semibold text-gray-700">
                      <th className="px-6 py-4">Product Name</th>
                      <th className="px-6 py-4 text-center">Quantity</th>
                      <th className="px-6 py-4 text-center">Unit Cost</th>
                      <th className="px-6 py-4 text-right">Subtotal</th>
                      <th className="px-6 py-4 text-center">Remove</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-orange-50 transition">
                        <td className="px-6 py-5 font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-block px-5 py-2 bg-orange-100 text-orange-700 rounded-full font-bold">
                            {item.qty}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">₱{item.unitCost.toFixed(2)}</td>
                        <td className="px-6 py-5 text-right font-semibold text-gray-900">
                          ₱{item.subtotal.toLocaleString()}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                            <X className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ADD BUTTON */}
              <div className="p-6 border-t border-gray-200">
                <button
                  className={`${gradientBtn} bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 inline-flex items-center gap-3`}
                >
                  <Plus className="w-6 h-6" />
                  Add Product
                </button>
              </div>

              {/* TOTAL */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 border-t-4 border-orange-300 text-center">
                <span className="text-2xl font-bold text-gray-900">
                  TOTAL: ₱{totalAmount.toLocaleString()}
                </span>
              </div>

              {/* SUBMIT */}
              <div className="p-6 text-center">
                <button
                  className={`${gradientBtn} bg-gradient-to-r from-pink-500 to-orange-500 text-xl px-16 py-5`}
                >
                  Submit Purchase Order
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Purchase ID:</span>
                  <span className="font-bold text-orange-600">{purchaseID}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ordered Date:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('en-PH')}
                  </span>
                </div>

                {/* ITEMS LIST */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Items:</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.name}</span>
                        <div className="text-right">
                          <div className="font-medium">{item.qty} ×</div>
                          <div className="text-orange-600 font-bold">₱{item.subtotal.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TOTAL */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total Items:</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total:</span>
                    <span>₱{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* FINALIZE */}
                <button
                  className={`${gradientBtn} w-full bg-gradient-to-r from-pink-500 to-orange-500 text-lg py-5 mt-6`}
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
