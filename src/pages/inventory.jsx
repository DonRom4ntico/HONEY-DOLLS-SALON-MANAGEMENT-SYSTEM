// src/pages/inventory.jsx
import { useState } from 'react';
import { Search, ChevronDown, Package } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const products = [
    { name: 'Hair Serum', stock: 120, price: 180, category: 'Hair Care', updated: '2025-10-28' },
    { name: 'Nail Polish Set', stock: 75, price: 250, category: 'Nail Care', updated: '2025-10-27' },
    { name: 'Lip Tint', stock: 150, price: 120, category: 'Cosmetics', updated: '2025-10-25' },
    { name: 'Keratin Smooth Oil', stock: 89, price: 850, category: 'Hair Care', updated: '2025-10-26' },
    { name: 'Honey Glow Serum', stock: 45, price: 950, category: 'Skincare', updated: '2025-10-24' },
  ];

  const categories = ['All', 'Hair Care', 'Nail Care', 'Cosmetics', 'Skincare'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout title="">
      <div className="max-w-7xl mx-auto space-y-8">

       {/* Page Title + Search + Filter */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Product Inventory</h1>
          </div>
        {/* ONE CLEAN LINE: Search + Category Filter (compact & consistent) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search - Leftmost */}
          <div className="relative flex-1 min-w-64 max-w-md">
            <Search className="mt-2.5 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm"
            />
          </div>

          {/* Category Filter - Short & Sweet */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full px-5 py-2.5 pr-9 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-sm min-w-40"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="mt-2.5 absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Table - Unchanged & Beautiful */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-orange-50 border-b border-orange-200 px-8 py-5">
            <div className="grid grid-cols-5 gap-8 text-sm font-semibold text-gray-700">
              <div>Product Name</div>
              <div className="text-center">Stocks</div>
              <div className="text-center">Unit Price</div>
              <div className="text-center">Category</div>
              <div className="text-right">Updated At</div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                No products found matching your criteria.
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="px-8 py-6 hover:bg-orange-50 transition-colors grid grid-cols-5 gap-8 items-center text-sm"
                >
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-center">
                    <span className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${
                      product.stock > 100 ? 'bg-green-100 text-green-700' :
                      product.stock > 50 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock}
                    </span>
                  </div>
                  <div className="text-center font-semibold text-gray-800">
                    ₱{product.price.toLocaleString()}
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-5 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                  <div className="text-right text-gray-500 text-xs">
                    {product.updated}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}