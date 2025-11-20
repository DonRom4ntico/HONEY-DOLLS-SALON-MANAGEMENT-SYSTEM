// src/pages/AdminProductWaste.jsx
import { Search, Printer } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';

export default function AdminProductWaste() {
  const wasteRecords = [
    {
      product: 'Keratin Smooth Oil',
      user: 'Anna Cruz',
      quantity: 5,
      reason: 'Expired',
      datetime: '2025-10-27 09:45',
    },
    {
      product: 'Hair Spa Mask',
      user: 'Jessa Mae',
      quantity: 2,
      reason: 'Damaged during handling',
      datetime: '2025-10-26 14:20',
    },
    {
      product: 'Honey Glow Serum',
      user: 'Keoski',
      quantity: 1,
      reason: 'Wrong shade',
      datetime: '2025-10-25 11:10',
    },
  ];

  return (
    <AdminLayout title="Product Waste Records">
      {/* Header + Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Product Waste Records</h2>
        </div>

        {/* Search + Print */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Product or User"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-orange-100">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Product Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Quantity</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Reason</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {wasteRecords.map((record, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-6 font-medium">{record.product}</td>
                  <td className="py-4 px-6">{record.user}</td>
                  <td className="py-4 px-6 text-center">{record.quantity}</td>
                  <td className="py-4 px-6">{record.reason}</td>
                  <td className="py-4 px-6 text-gray-600">{record.datetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}