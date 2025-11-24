// src/pages/AdminDisplayProduct.jsx
import { useState } from 'react';
import { Search, ChevronDown, Package } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';

export default function AdminDisplayProduct() {
  const [searchTerm, setSearchTerm] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const purchaseOrders = [
    { id: 'PO-2025-001', supplier: 'GlowSupplies Inc.', product: 'Argan Oil Serum', unitCost: 350.00, orderDate: 'Oct 25, 2025', contact: '0917 825 5314' },
    { id: 'PO-2025-002', supplier: 'LuxeBeauty PH', product: 'Keratin Shampoo', unitCost: 220.00, orderDate: 'Oct 27, 2025', contact: '0918 234 5567' },
    { id: 'PO-2025-003', supplier: 'Honey Essentials', product: 'Vitamin C Toner', unitCost: 250.00, orderDate: 'Oct 28, 2025', contact: '0906 574 9982' },
    { id: 'PO-2025-004', supplier: 'Velvet Touch Co.', product: 'Moisture Cream', unitCost: 410.00, orderDate: 'Oct 29, 2025', contact: '0918 850 3421' },
    { id: 'PO-2025-005', supplier: 'PureSilk Supply', product: 'Aloe Gel', unitCost: 190.00, orderDate: 'Oct 30, 2025', contact: '0922 890 1277' },
    { id: 'PO-2025-006', supplier: 'Radiant Glow', product: 'Whitening Lotion', unitCost: 310.00, orderDate: 'Nov 01, 2025', contact: '0916 885 8890' },
  ];

  let filtered = purchaseOrders.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (supplierFilter !== 'all') filtered = filtered.filter(i => i.supplier === supplierFilter);

  filtered.sort((a, b) => {
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);
    return sortOrder === 'date-desc' ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <AdminLayout title="">
      <div className="max-w-7xl mx-auto space-y-8">

     {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Honey Dolls • Brilliant Beauty Hub</h1>
          <p className="text-sm text-gray-600 mt-2">
            Add Product to Display Inventory<br />
            Select purchase-order items and add them to your display inventory. Use search and filters to find items quickly.
          </p>
        </div>

        {/* ONE TIGHT LINE: Search + Supplier + Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search - Leftmost */}
          <div className="relative flex-1 min-w-64 max-w-md">
            <Search className="mt-2.5 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search product, supplier, or PO ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm"
            />
          </div>

          {/* Supplier Filter */}
          <div className="relative">
            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full px-5 py-2.5 pr-9 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-sm min-w-44"
            >
              <option value="all">All Suppliers</option>
              <option>GlowSupplies Inc.</option>
              <option>LuxeBeauty PH</option>
              <option>Honey Essentials</option>
              <option>Velvet Touch Co.</option>
              <option>PureSilk Supply</option>
              <option>Radiant Glow</option>
            </select>
            <ChevronDown className="mt-2.5 absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Sort Order */}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full px-5 py-2.5 pr-9 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-sm min-w-36"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
            </select>
            <ChevronDown className="mt-2.5 absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-orange-50 to-pink-50">
                <tr>
                  <th className="text-left px-6 py-5 font-bold text-gray-700">Purchase ID</th>
                  <th className="text-left px-6 py-5 font-bold text-gray-700">Supplier</th>
                  <th className="text-left px-6 py-5 font-bold text-gray-700">Product</th>
                  <th className="text-center px-6 py-5 font-bold text-gray-700">Unit Cost</th>
                  <th className="text-center px-6 py-5 font-bold text-gray-700">Order Date</th>
                  <th className="text-center px-6 py-5 font-bold text-gray-700">Contact</th>
                  <th className="text-center px-6 py-5 font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-orange-50 transition">
                    <td className="px-6 py-4 font-bold text-orange-700">{item.id}</td>
                    <td className="px-6 py-4">{item.supplier}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.product}</td>
                    <td className="px-6 py-4 text-center">₱{item.unitCost.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.orderDate}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.contact}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button className="px-5 py-2 rounded-lg text-white font-semibold text-xs bg-gradient-to-r from-[#FFD873] to-[#FF9B52] shadow-sm hover:brightness-110 transition">
                          Add
                        </button>
                        <button className="px-5 py-2 rounded-lg text-white font-semibold text-xs bg-gradient-to-r from-[#FF8A80] to-[#FF5252] shadow-sm hover:brightness-110 transition">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination + Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-5 border-t border-gray-200 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 transition"
              >
                Prev
              </button>
              <span className="px-4 py-1 bg-orange-100 text-orange-700 rounded-lg font-medium">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>

            <div className="flex gap-4">
              <button className="px-10 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                Cancel
              </button>
              <button className="px-10 py-3 rounded-xl text-white font-extrabold bg-gradient-to-r from-[#FFD873] via-[#FF9B52] to-[#FF7A7A] shadow-md hover:shadow-xl hover:brightness-110 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}