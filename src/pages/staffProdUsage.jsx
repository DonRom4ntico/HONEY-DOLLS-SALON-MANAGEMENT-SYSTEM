// src/pages/StaffProdUsage.jsx
import { Bell, ChevronDown, RefreshCw, Download, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StaffProdUsage() {
  const [product, setProduct] = useState('Hair Serum');
  const [initialQty, setInitialQty] = useState(50);
  const [usedQty, setUsedQty] = useState(5);
  const [remainingQty, setRemainingQty] = useState(45);
  const [remarks, setRemarks] = useState('Used during hair treatment service (2 clients)');

  const [viewedId, setViewedId] = useState(null);

  useEffect(() => {
    setRemainingQty(initialQty - usedQty);
  }, [initialQty, usedQty]);

  const [usageHistory, setUsageHistory] = useState([
    {
      id: 1,
      name: 'Hair Serum',
      initial: 70,
      used: 15,
      remaining: 55,
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
  ]);

  const handleSaveRecord = (e) => {
    e.preventDefault();

    const now = new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    setUsageHistory((prev) => {
      const existingIndex = prev.findIndex((item) => item.name === product);

      if (existingIndex !== -1) {
        const existing = prev[existingIndex];
        const newUsed = existing.used + usedQty;
        const newRemaining = existing.initial - newUsed;

        const updatedBg =
          newRemaining <= 20
            ? 'bg-red-100'
            : newRemaining <= 50
            ? 'bg-yellow-100'
            : 'bg-green-100';

        const updatedRecord = {
          ...existing,
          used: newUsed,
          remaining: newRemaining,
          updatedAt: now,
          bg: updatedBg,
        };

        return [
          updatedRecord,
          ...prev.filter((_, i) => i !== existingIndex),
        ];
      } else {
        const newRemaining = initialQty - usedQty;
        const newBg =
          newRemaining <= 20
            ? 'bg-red-100'
            : newRemaining <= 50
            ? 'bg-yellow-100'
            : 'bg-green-100';

        const newRecord = {
          id: Date.now(),
          name: product,
          initial: initialQty,
          used: usedQty,
          remaining: newRemaining,
          updatedAt: now,
          bg: newBg,
        };

        return [newRecord, ...prev];
      }
    });

    setProduct('Hair Serum');
    setInitialQty(0);
    setUsedQty(0);
    setRemainingQty(0);
    setRemarks('');
  };

  const handleView = (id) => {
    setViewedId(id);
    setTimeout(() => setViewedId(null), 2000);
  };

  const handleRefresh = () => {
    alert('Refreshed! (Simulated)');
  };

  const handleExport = () => {
    const csv = [
      ['Product Name', 'Initial (ml)', 'Used (ml)', 'Remaining (ml)', 'Last Updated'],
      ...usageHistory.map((i) => [i.name, i.initial, i.used, i.remaining, i.updatedAt]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-usage-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
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

      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Honey Dolls — Product Usage Record</h2>
            <p className="text-sm text-gray-600 mb-6">Record Product Usage</p>

            <form onSubmit={handleSaveRecord} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <div className="relative">
                  <select
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 appearance-none bg-white text-sm"
                    required
                  >
                    <option>Hair Serum</option>
                    <option>Nail Polish Remover</option>
                    <option>Hair Dye - Chestnut Brown</option>
                    <option>Facial Cleanser</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Quantity (ml)</label>
                  <input
                    type="number"
                    value={initialQty}
                    onChange={(e) => setInitialQty(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Used (ml)</label>
                  <input
                    type="number"
                    value={usedQty}
                    onChange={(e) => setUsedQty(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Quantity (ml)</label>
                <input
                  type="number"
                  value={remainingQty}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 text-sm cursor-default"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 resize-none text-sm"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition text-sm"
                >
                  Save Record
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProduct('Hair Serum');
                    setInitialQty(0);
                    setUsedQty(0);
                    setRemainingQty(0);
                    setRemarks('');
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-50 transition text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Quantity Overview</h3>

            <div className="grid grid-cols-12 text-xs font-semibold text-gray-600 border-b pb-2">
              <div className="col-span-3">Product Name</div>
              <div className="col-span-2 text-center">Initial (ml)</div>
              <div className="col-span-2 text-center">Used (ml)</div>
              <div className="col-span-2 text-center">Remaining (ml)</div>
              <div className="col-span-2 text-center">Updated At</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            <div className="mt-3 space-y-2">
              {usageHistory.map((item) => {
                const isViewed = viewedId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`grid grid-cols-12 items-center p-3 rounded-xl ${item.bg} text-sm transition-all`}
                  >
                    <div className="col-span-3 font-medium">{item.name}</div>
                    <div className="col-span-2 text-center">{item.initial}</div>
                    <div className="col-span-2 text-center">{item.used}</div>
                    <div className="col-span-2 text-center font-medium">{item.remaining}</div>
                    <div className="col-span-2 text-center text-gray-600">{item.updatedAt}</div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => handleView(item.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition flex items-center gap-1 ${
                          isViewed
                            ? 'bg-teal-500 text-white animate-pulse'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {isViewed ? (
                          <>
                            <Eye className="w-3 h-3" />
                            Viewed
                          </>
                        ) : (
                          'VIEW'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={handleRefresh}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition text-sm flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="px-6 py-2 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold rounded-full shadow hover:shadow-md transition text-sm flex items-center gap-2"
              >
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