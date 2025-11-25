// src/pages/branchReturn.jsx
import { useState } from 'react';
import { Search, ChevronDown, Eye, Package, Plus, X, Building2 } from 'lucide-react';
import AdminLayout from '../../../layout/adminLayout';

export default function BranchReturn() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const branchReturns = [
    {
      id: 'BR-RET-2025-001',
      branch: 'Davao Branch',
      reason: 'Excess stock',
      evidence: 'excess_01.jpg',
      quantity: 25,
      amount: 21250.00,
      date: 'Nov 03, 2025',
      status: 'Pending',
    },
    {
      id: 'BR-RET-2025-002',
      branch: 'Cebu Branch',
      reason: 'Damaged during transfer',
      evidence: 'damage_transfer.jpg',
      quantity: 12,
      amount: 10200.00,
      date: 'Nov 01, 2025',
      status: 'Returned',
    },
    {
      id: 'BR-RET-2025-003',
      branch: 'Manila Branch',
      reason: 'Wrong items received',
      evidence: 'wrong_items.jpg',
      quantity: 18,
      amount: 15300.00,
      date: 'Nov 04, 2025',
      status: 'Pending',
    },
  ];

  const filteredReturns = branchReturns.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    return status === 'Returned' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white';
  };

  return (
    <AdminLayout title="">
      <div className="max-w-7xl mx-auto space-y-8">

         {/* Header */}
          <div className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-orange-600" />
                      </div>
                      <div>
                <h1 className="text-3xl font-bold text-gray-900">Branch Returns</h1>
                <p className="text-gray-700">Manage products returned from branches to main warehouse</p>
              </div>
            </div>
          </div>
        </div>

      <div className="mb-8"></div>
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
                <Search className="mt-0.5 absolute left-3 top-2.5 text-gray-400" size={18} />
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
          <button style={{
 background: 'linear-gradient(to right,  #ec4899, #f97316)', 
  padding: '10px 20px',
  borderRadius: '9999px',
  boxShadow: '0 4px 15px rgba(34, 211, 238, 0.3)',}} 
            onClick={() => setIsModalOpen(true)}
            className="hover:scale-103 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition transform"
          >
            <Plus size={20} />
            New Return
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-50 border-b-2 border-orange-200">
                <tr className="text-left text-sm font-bold text-gray-700">
                  <th className="px-6 py-5">RETURN ID</th>
                  <th className="px-6 py-5">BRANCH NAME</th>
                  <th className="px-6 py-5">REASON</th>
                  <th className="px-6 py-5">EVIDENCE</th>
                  <th className="px-6 py-5 text-center">QTY</th>
                  <th className="px-6 py-5 text-right">TOTAL AMOUNT</th>
                  <th className="px-6 py-5">RETURN DATE</th>
                  <th className="px-6 py-5 text-center">STATUS</th>
                  <th className="px-6 py-5 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReturns.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-16 text-gray-500">
                      No branch returns found.
                    </td>
                  </tr>
                ) : (
                  filteredReturns.map((ret) => (
                    <tr key={ret.id} className="hover:bg-orange-50 transition">
                      <td className="px-6 py-5 font-bold text-orange-700">{ret.id}</td>
                      <td className="px-6 py-5 font-medium text-gray-900 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-orange-600" />
                        {ret.branch}
                      </td>
                      <td className="px-6 py-5 text-gray-700">{ret.reason}</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          <Eye className="w-4 h-4" />
                          {ret.evidence}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-block w-12 h-12 bg-purple-100 text-purple-700 rounded-full font-bold text-lg flex items-center justify-center">
                          {ret.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-gray-900">
                        ₱{ret.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-5 text-gray-600">{ret.date}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`inline-block px-6 py-2 rounded-full text-white font-bold text-sm ${getStatusColor(ret.status)}`}>
                          {ret.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {ret.status === 'Pending' ? (
                          <button style={{
 background: 'linear-gradient(to right,  #ec4899, #f97316)', 
  padding: '1px 24px',
  borderRadius: '9999px',
  boxShadow: '0 4px 15px rgba(34, 211, 238, 0.3)',}}  
                          className="hover:scale-103 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow hover:shadow-lg transition">
                            Accept Return
                          </button>
                        ) : (
                          <button className="hover:scale-103 bg-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-sm">
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

     

        {/* Add Branch Return Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">New Branch Return</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-7 h-7 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">From Branch</label>
                    <select className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400">
                      <option>Select branch</option>
                      <option>Davao Branch</option>
                      <option>Cebu Branch</option>
                      <option>Manila Branch</option>
                      <option>Bacolod Branch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product</label>
                    <select className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400">
                      <option>Select product</option>
                      <option>Keratin Smooth Oil</option>
                      <option>Honey Glow Serum</option>
                      <option>Lash Nourish Set</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="0"
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
                    <select className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400">
                      <option>Select reason</option>
                      <option>Excess Stock</option>
                      <option>Damaged</option>
                      <option>Expired</option>
                      <option>Wrong Item</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Attach Evidence</label>
                  <div className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center hover:border-orange-500 transition">
                    <Package className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <p className="text-gray-600">Drop photos here or click to upload</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button style={{
 background: 'linear-gradient(to right,  #ec4899, #f97316)', 
  padding: '10px 12px',
  borderRadius: '9999px',
  boxShadow: '0 4px 15px rgba(34, 211, 238, 0.3)',}}  
                className="px-1 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition">
                  Submit Return Request
                </button>
              </div>
            </div>
          </div>
        )}
     
    </AdminLayout>
  );
}