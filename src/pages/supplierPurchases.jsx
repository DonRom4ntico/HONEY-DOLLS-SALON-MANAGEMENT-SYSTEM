// src/pages/PurchaseOrder.jsx
import AdminLayout from "../layout/adminLayout";
import { Plus, ChevronDown } from 'lucide-react';
import { useState } from 'react';

function PurchaseOrderContent() {
  const [items, setItems] = useState([]);

  const products = [
    { id: 1, name: 'Shampoo 250ml', unitCost: 150.00 },
    { id: 2, name: 'Hair Serum 100ml', unitCost: 300.00 },
    { id: 3, name: 'Manicure 100ml', unitCost: 300.00 },
    { id: 4, name: 'Keratin Treatment 500ml', unitCost: 850.00 },
    { id: 5, name: 'Hair Mask 200g', unitCost: 420.00 },
  ];

  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  const selectedProduct = products.find(p => p.id === parseInt(selectedProductId));

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.qty, 0);

  const addItem = () => {
    if (!selectedProductId || !quantity || quantity <= 0) return;

    const qty = parseInt(quantity);
    const subtotal = qty * selectedProduct.unitCost;

    setItems(prev => [...prev, {
      id: Date.now(),
      name: selectedProduct.name,
      qty,
      unitCost: selectedProduct.unitCost,
      subtotal
    }]);

    // Reset form
    setSelectedProductId('');
    setQuantity('');
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-orange-900">Honey Dolls — Purchase Order</h1>
          <p className="text-orange-700 text-sm lg:text-base mt-1">Create Purchase Order</p>
        </div>

        {/* Purchase ID */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Purchase ID</label>
          <div className="text-2xl lg:text-3xl font-bold text-orange-900">PO-2025-001</div>
        </div>    

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT: Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">

              {/* Product Name + Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <div className="relative">
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl appearance-none focus:ring-2 focus:ring-orange-400 text-gray-700"
                    >
                      <option value="">Select product...</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} — ₱{p.unitCost.toFixed(2)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Supplier + Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                  <select className="w-full px-5 py-4 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-orange-400">
                    <option>L'Oréal Philippines</option>
                    <option>Watsons</option>
                    <option>GlowBeauty Supply</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="text"
                    value="+63 917 123 4567"
                    readOnly
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-10">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select className="w-full px-5 py-4 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-orange-400">
                  <option>Cash on Delivery</option>
                  <option>Bank Transfer</option>
                  <option>GCash</option>
                </select>
              </div>

              {/* ADD PRODUCT BUTTON — BELOW FORM FIELDS */}
              <div className="mb-12 flex justify-center">
                <button
                  onClick={addItem}
                  disabled={!selectedProductId || !quantity}
                  style={{
                    background: selectedProductId && quantity
                      ? 'linear-gradient(to right, #ec4899, #f97316)'
                      : '#cccccc',
                    boxShadow: selectedProductId && quantity
                      ? '0 10px 30px rgba(236, 72, 153, 0.5)'
                      : 'none',
                  }}
                  className="text-white font-bold text-lg px-12 py-5 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-4 disabled:cursor-not-allowed"
                >
                  <Plus className="w-7 h-7" />
                  Add Product
                </button>
              </div>

              {/* Products Table */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-5">Products</h3>
                {items.length === 0 ? (
                  <p className="text-center text-gray-500 py-12">No products added yet.</p>
                ) : (
                  <>
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                      <table className="w-full text-left">
                        <thead className="bg-gradient-to-r from-orange-50 to-pink-50">
                          <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Product Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-center">Quantity</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Unit Cost</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Subtotal</th>
                            <th className="px-6 py-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">
                              <td className="px-6 py-5 font-medium">{item.name}</td>
                              <td className="px-6 py-5 text-center font-medium">{item.qty}</td>
                              <td className="px-6 py-5 text-right text-gray-700">₱{item.unitCost.toFixed(2)}</td>
                              <td className="px-6 py-5 text-right font-bold text-orange-700">₱{item.subtotal.toFixed(2)}</td>
                              <td className="px-6 py-5 text-right">
                                <button onClick={() => removeItem(item.id)} className="text-pink-600 hover:text-pink-800 font-medium text-sm">
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8 text-center">
                      <p className="text-2xl font-bold text-gray-800">TOTAL: ₱{total.toFixed(2)}</p>
                    </div>

                    {/* CONFIRM BUTTON — REPLACES OLD "ADD PRODUCT" */}
                    <div className="mt-12 flex justify-center">
                      <button
                        disabled={items.length === 0}
                        style={{
                          background: items.length > 0
                            ? 'linear-gradient(to right, #ec4899, #f97316)'
                            : '#cccccc',
                          padding: '24px 64px',
                          borderRadius: '9999px',
                          boxShadow: items.length > 0
                            ? '0 15px 40px rgba(236, 72, 153, 0.6)'
                            : 'none',
                        }}
                        className="text-white font-bold text-2xl rounded-full shadow-2xl hover:shadow-pink-600/60 transition-all duration-300 disabled:cursor-not-allowed"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary — UPDATES IN REAL TIME */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
              
              <div className="space-y-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Purchase ID:</span>
                  <span className="font-semibold">PO-2025-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ordered Date:</span>
                  <span className="font-semibold">11/1/2025</span>
                </div>
                <hr className="border-gray-200" />

                {items.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No items added</p>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-gray-600">{item.qty} × ₱{item.unitCost.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <hr className="border-gray-200" />
                <div className="flex justify-between font-bold">
                  <span>Total Items:</span>
                  <span>{totalItemsCount}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-orange-700">
                  <span>Total:</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-12">
                <button 
                  style={{
                    background: 'linear-gradient(to right, #ec4899, #f97316)',
                    padding: '24px 48px',
                    borderRadius: '9999px',
                    boxShadow: '0 10px 30px rgba(236, 72, 153, 0.5)',
                  }}
                  className="w-full text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
                >
                  Finalize Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PurchaseOrder() {
  return (
    <AdminLayout title="Purchase Order">
      <PurchaseOrderContent />
    </AdminLayout>
  );
}