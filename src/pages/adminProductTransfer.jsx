// src/pages/AdminProductTransfer.jsx
import { Search, Printer } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';

export default function AdminProductTransfer() {
  const transfers = [
    {
      productName: 'Lash Nourish Set',
      fromBranch: 'Main Branch',
      toBranch: 'Uptown Branch',
      quantity: 10,
      dateTime: '2025-10-27 10:15',
    },
    // Add more data here if needed
  ];

  return (
    <AdminLayout title="Product Transfer Records">
      <div className="bg-white">
        {/* Header */}
        <div className="bg-blue-50 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">Product Transfer Records</h2>
        </div>

        {/* Search + Print (Perfectly Aligned) */}
        <div className="flex items-center gap-4 p-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Product or Branch"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition whitespace-nowrap">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>

        {/* Table */}
        <div className="px-6 pb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Product Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">From Branch</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">To Branch</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((t, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{t.productName}</td>
                    <td className="py-3 px-4">{t.fromBranch}</td>
                    <td className="py-3 px-4">{t.toBranch}</td>
                    <td className="py-3 px-4">{t.quantity}</td>
                    <td className="py-3 px-4">{t.dateTime}</td>
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