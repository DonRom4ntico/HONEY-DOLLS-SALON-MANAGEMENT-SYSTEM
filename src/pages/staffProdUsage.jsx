import { Bell, ChevronDown, RefreshCw, Download } from 'lucide-react';
import { useState } from 'react';

export default function StaffProdUsage() {
  const [product, setProduct] = useState('Hair Serum');
  const [initialQty, setInitialQty] = useState(50);
  const [usedQty, setUsedQty] = useState(5);
  const [remainingQty, setRemainingQty] = useState(45);
  const [remarks, setRemarks] = useState('Used during hair treatment service (2 clients)');

  // Sample usage history
  const usageHistory = [
    {
      id: 1,
      name: 'Hair Serum',
      initial: 70,
      used: 15,
      remaining: 45,
      updatedAt: 'October 27, 2025 10 pm',
      bg: 'bg-yellow-100',
    },
    {
      id: 2,
      name: 'Nail Polish Remover',
      initial: 100,
      used: 30,
      remaining: 70,
      updatedAt: 'October 27, 2025 10 pm',
      bg: 'bg-green-100',
    },
    {
      id: 3,
      name: 'Hair Dye - Chestnut Brown',
      initial: 80,
      used: 40,
      remaining: 40,
      updatedAt: 'October 27, 2025 10 pm',
      bg: 'bg-yellow-100',
    },
    {
      id: 4,
      name: 'Facial Cleanser',
      initial: 120,
      used: 50,
      remaining: 70,
      updatedAt: 'October 27, 2025 10 pm',
      bg: 'bg-green-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* ====================== HEADER ====================== */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/honeydolls.jpg"   
              alt="Honey Dolls"
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
              Logged in as: <span className="text-yellow-600">Staff - Anna</span>
            </span>
          </div>
        </div>
      </header>

      {/* ====================== MAIN ====================== */}
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: Record Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Honey Dolls — Product Usage Record</h2>
            <p className="text-sm text-gray-600 mb-6">Record Product Usage</p>

            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <div className="relative">
                  <select
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 appearance-none bg-white text-sm"
                  >
                    <option>Hair Serum</option>
                    <option>Nail Polish Remover</option>
                    <option>Hair Dye - Chestnut Brown</option>
                    <option>Facial Cleanser</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Initial & Used */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Quantity</label>
                  <input
                    type="number"
                    value={initialQty}
                    onChange={e => setInitialQty(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Used</label>
                  <input
                    type="number"
                    value={usedQty}
                    onChange={e => setUsedQty(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                  />
                </div>
              </div>

              {/* Remaining */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Quantity</label>
                <input
                  type="number"
                  value={remainingQty}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 text-sm cursor-default"
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 resize-none text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition text-sm"
                >
                  Save Record
                </button>
                <button
                  type="button"
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-50 transition text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Product Overview */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Quantity Overview</h3>

            {/* Table Header */}
            <div className="grid grid-cols-12 text-xs font-semibold text-gray-600 border-b pb-2">
              <div className="col-span-3">Product Name</div>
              <div className="col-span-2 text-center">Initial Quantity(ml)</div>
              <div className="col-span-2 text-center">Quantity Used(ml)</div>
              <div className="col-span-2 text-center">Remaining Quantity(ml)</div>
              <div className="col-span-2 text-center">Updated At</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {/* Table Rows */}
            <div className="mt-3 space-y-2">
              {usageHistory.map(item => (
                <div
                  key={item.id}
                  className={`grid grid-cols-12 items-center p-3 rounded-xl ${item.bg} text-sm`}
                >
                  <div className="col-span-3 font-medium">{item.name}</div>
                  <div className="col-span-2 text-center">{item.initial}</div>
                  <div className="col-span-2 text-center">{item.used}</div>
                  <div className="col-span-2 text-center font-medium">{item.remaining}</div>
                  <div className="col-span-2 text-center text-gray-600">{item.updatedAt}</div>
                  <div className="col-span-1 flex justify-center gap-1">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium hover:bg-blue-600 transition">
                      UPDATE
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-300 transition">
                      VIEW
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-3">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition text-sm flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold rounded-full shadow hover:shadow-md transition text-sm flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            <p className="text-xs text-gray-600 text-center mt-4">
              Each record updates the live product quantities shown here.
            </p>
          </div>
        </div>
      </main>

      {/* ====================== FOOTER ====================== */}
      <footer className="bg-white/80 py-3 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Staff Product Usage Management System
          </p>
        </div>
      </footer>
    </div>
  );
}