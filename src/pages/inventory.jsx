// src/pages/ProductInventory.jsx
import { Search, ChevronDown } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import { useState } from 'react';

export default function ProductInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: 1, name: 'Hair Serum', stocks: 120, unitPrice: 180.00, category: 'Hair Care', updatedAt: '2025-10-28' },
    { id: 2, name: 'Nail Polish Set', stocks: 75, unitPrice: 250.00, category: 'Nail Care', updatedAt: '2025-10-27' },
    { id: 3, name: 'Lip Tint', stocks: 150, unitPrice: 120.00, category: 'Cosmetics', updatedAt: '2025-10-25' },
    { id: 4, name: 'Vitamin C Serum', stocks: 89, unitPrice: 420.00, category: 'Skincare', updatedAt: '2025-10-26' },
    { id: 5, name: 'Argan Oil Shampoo', stocks: 200, unitPrice: 320.00, category: 'Hair Care', updatedAt: '2025-10-24' },
    { id: 6, name: 'Moisturizing Cream', stocks: 45, unitPrice: 580.00, category: 'Skincare', updatedAt: '2025-10-23' },
  ];

  const categories = ['all', 'Hair Care', 'Skincare', 'Body Care', 'Nail Care', 'Cosmetics', 'Fragrance'];

  const filtered = products.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || item.category === selectedCategory)
  );

  return (
    <AdminLayout title="Product Inventory">
      <div className="min-h-screen bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

            {/* Title + Filters */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <h1 className='text-4x1 font-bold text-gray-800'>Honey Dolls & Brilliant Beauty Hub</h1>
                <h2 className="text-3xl font-bold text-gray-800">Product Inventory</h2>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-6 py-4 w-full lg:w-80 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-gray-50 border border-gray-200 rounded-2xl pl-5 pr-12 py-4 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-8 py-5 font-medium text-gray-700">Product Name</th>
                    <th className="text-center px-8 py-5 font-medium text-gray-700">Stocks</th>
                    <th className="text-center px-8 py-5 font-medium text-gray-700">Unit Price</th>
                    <th className="text-center px-8 py-5 font-medium text-gray-700">Category</th>
                    <th className="text-center px-8 py-5 font-medium text-gray-700">Updated At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-8 py-6 font-medium text-gray-900">{item.name}</td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                          item.stocks >= 100 ? 'bg-green-100 text-green-800' :
                          item.stocks >= 50 ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.stocks}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center font-semibold text-gray-900">
                        ₱{item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-block px-4 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center text-gray-500 text-sm">
                        {item.updatedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}