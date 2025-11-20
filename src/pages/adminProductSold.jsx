// src/pages/AdminProductsSold.jsx
import { Search, Printer, ChevronDown } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import { useState } from 'react';

export default function AdminProductsSold() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Davao');
  const [sortOrder, setSortOrder] = useState('newest'); // newest | oldest

  const sales = [
    { id: 1, product: 'Honey Glow Serum', customer: 'Maria Santos', qty: 2, subtotal: 1200, date: '2025-10-27', time: '10:30' },
    { id: 2, product: 'Keratin Smooth Oil', customer: 'Alyssa Cruz', qty: 1, subtotal: 650, date: '2025-10-27', time: '11:15' },
    { id: 3, product: 'Lash Nourish Set', customer: 'Bea Dela Cruz', qty: 3, subtotal: 900, date: '2025-10-27', time: '12:40' },
    { id: 4, product: 'Silky Shampoo', customer: 'Jessa Mae', qty: 1, subtotal: 450, date: '2025-10-27', time: '14:20' },
  ];

  // Filter + Sort
  let filteredSales = sales.filter(sale =>
    sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredSales = [...filteredSales].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const totalAmount = filteredSales.reduce((sum, sale) => sum + sale.subtotal, 0);
  const handlePrint = () => window.print();

  return (
    <AdminLayout title="Product Sold Records">
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .shadow-lg { box-shadow: none !important; }
          .rounded-2xl { border: 1px solid #ddd; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        {/* ONE LINE: Search | Sort | Print */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          {/* Search + Sort (left side) */}
          <div className="flex flex-1 gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Product or Customer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[180px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium pointer-events-none">
                Sort by:
              </span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full pl-16 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm appearance-none bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Print Button (far right) */}
          <button
            onClick={handlePrint}
            className="md:ml-auto px-8 py-3 bg-pink-500 text-white font-medium rounded-xl hover:bg-pink-600 transition flex items-center gap-2 whitespace-nowrap"
          >
            <Printer className="w-5 h-5" />
            Print Report
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-pink-50">
                <th className="text-left py-3 px-4 font-semibold">Product Name</th>
                <th className="text-left py-3 px-4 font-semibold">Customer Name</th>
                <th className="text-center py-3 px-4 font-semibold">Quantity</th>
                <th className="text-right py-3 px-4 font-semibold">Subtotal</th>
                <th className="text-center py-3 px-4 font-semibold">Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{sale.product}</td>
                  <td className="py-3 px-4">{sale.customer}</td>
                  <td className="text-center py-3 px-4">{sale.qty}</td>
                  <td className="text-right py-3 px-4 font-medium">₱{sale.subtotal.toLocaleString()}</td>
                  <td className="text-center py-3 px-4 text-gray-600">
                    {sale.date.replace(/-/g, '/')} {sale.time}
                  </td>
                </tr>
              ))}

              {/* TOTAL ROW */}
              <tr className="bg-gradient-to-r from-pink-50 to-orange-50 font-bold text-gray-800">
                <td colSpan={3} className="py-4 px-4 text-right">TOTAL</td>
                <td className="py-4 px-4 text-right text-lg">₱{totalAmount.toLocaleString()}</td>
                <td className="py-4 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Print Header */}
        <div className="print-only p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Honey Dolls & Brilliant Beauty Hub</h1>
          <p className="text-sm text-gray-600">Product Sold Records — {selectedBranch} Branch</p>
          <p className="text-lg font-bold mt-6">TOTAL SALES: ₱{totalAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-4">Generated on: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </AdminLayout>
  );
}