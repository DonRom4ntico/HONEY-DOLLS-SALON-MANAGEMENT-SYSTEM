// src/pages/customerReturnedProducts.jsx
import { useState } from 'react';
import { Search, ChevronDown, Eye, Package } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';

export default function CustomerReturnedProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const returns = [
    { id: 'PO-RET-2025-001', customer: 'Maria Santos', reason: 'Wrong product delivered', evidence: 'wrong_item_01.jpg', quantity: 2, amount: 550.00, date: 'Oct 29, 2025', status: 'Pending' },
    { id: 'PO-RET-2025-002', customer: 'Julian Reyes', reason: 'Allergic reaction', evidence: 'photo_allergy_02.jpg', quantity: 1, amount: 1200.00, date: 'Oct 28, 2025', status: 'Returned' },
    { id: 'PO-RET-2025-003', customer: 'Analyn Velasco', reason: 'Product defective', evidence: 'defect_03.jpg', quantity: 3, amount: 850.00, date: 'Oct 30, 2025', status: 'Pending' },
  ];

  const filteredReturns = returns.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesDate = dateFilter === 'All' || item.date.includes(dateFilter);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status) => status === 'Returned' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white';

  return (
    <AdminLayout title="">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header - EXACTLY SAME */}
        <div className="py-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Returns</h1>
              <p className="text-gray-700">Manage and process customer product returns</p>
            </div>
          </div>
        </div>

        {/* Search + Filters - ORIGINAL SPACING, ONLY FIXED Z-INDEX & OVERFLOW */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search order or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 w-[350px]"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            {/* Status Filter - FULLY VISIBLE DROPDOWN */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 pl-3 pr-10 rounded-full border border-gray-300 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer z-[100]"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Returned</option>
              </select>
              <ChevronDown className="mt-2.5 absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-[110]" />
            </div>

            {/* Date Filter - FULLY VISIBLE DROPDOWN */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 pl-3 pr-10 rounded-full border border-gray-300 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer z-[100]"
              >
                <option>All</option>
                <option>Oct 2025</option>
                <option>Sep 2025</option>
              </select>
              <ChevronDown className="mt-2.5 absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-[110]" />
            </div>

          </div>
        </div>

        {/* Table - REMOVED overflow-hidden from outer card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-50 border-b-2 border-orange-200">
                <tr className="text-left text-sm font-bold text-gray-700">
                  <th className="px-6 py-5">ORDER ID</th>
                  <th className="px-6 py-5">CUSTOMER NAME</th>
                  <th className="px-6 py-5">REASON</th>
                  <th className="px-6 py-5">EVIDENCE</th>
                  <th className="px-6 py-5 text-center">QUANTITY</th>
                  <th className="px-6 py-5 text-right">TOTAL AMOUNT</th>
                  <th className="px-6 py-5">ORDER DATE</th>
                  <th className="px-6 py-5 text-center">STATUS</th>
                  <th className="px-6 py-5 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReturns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-orange-50 transition">
                    <td className="px-6 py-5 font-bold text-orange-700">{ret.id}</td>
                    <td className="px-6 py-5 font-medium text-gray-900">{ret.customer}</td>
                    <td className="px-6 py-5 text-gray-700">{ret.reason}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <Eye className="w-4 h-4" />
                        {ret.evidence}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-block w-10 h-10 bg-orange-100 text-orange-700 rounded-full font-bold text-lg flex items-center justify-center">
                        {ret.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right font-bold text-gray-900">
                      ₱{ret.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-gray-600">{ret.date}</td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-block px-5 py-2 rounded-full text-white font-bold text-sm ${getStatusColor(ret.status)}`}>
                        {ret.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {ret.status === 'Pending' ? (
                          <>
                            <button style={{

                              
  background: 'linear-gradient(to right, #86efac, #22d3ee)', 
  padding: '10px 24px',
  borderRadius: '9999px',
  boxShadow: '0 4px 15px rgba(34, 211, 238, 0.3)',}} 
                            className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow hover:shadow-lg transition hover:scale-103">
                              Return
                            </button>
                            <button  style={{
      background: 'linear-gradient(to right, #ec4899, #f97316)',
      padding: '10px 24px',
      borderRadius: '9999px',
      boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
    }} 
                            
                            
                            className="hover:scale-103 bg-gradient-to-r from-pink-400 to-red-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow hover:shadow-lg transition">
                              Replace
                            </button>
                          </>
                        ) : (
                          <button className="bg-gray-300 text-gray-700 px-10 py-2.5 rounded-full text-sm font-medium hover:scale-103">
                            View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}