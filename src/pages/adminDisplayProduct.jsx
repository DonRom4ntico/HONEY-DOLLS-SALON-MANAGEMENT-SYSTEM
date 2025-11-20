// src/pages/AdminDisplayProduct.jsx
import { Search, ChevronDown } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import { useState } from 'react';

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

  // Filter & Sort
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
    <AdminLayout title="Add Product to Display Inventory">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-full mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Honey Dolls • Brilliant Beauty Hub</h1>
          <p className="text-sm text-gray-600 mt-2">
            Add Product to Display Inventory<br />
            Select purchase-order items and add them to your display inventory. Use search and filters to find items quickly.
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 mb-8 items-center min-w-0">

          {/* Search */}
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, supplier, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>

          {/* Supplier Filter */}
          <div className="relative min-w-[200px]">
            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-4 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white cursor-pointer"
            >
              <option value="all">Supplier: All</option>
              <option>GlowSupplies Inc.</option>
              <option>LuxeBeauty PH</option>
              <option>Honey Essentials</option>
              <option>Velvet Touch Co.</option>
              <option>PureSilk Supply</option>
              <option>Radiant Glow</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Order */}
          <div className="relative min-w-[160px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full pl-4 pr-10 py-4 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white cursor-pointer"
            >
              <option value="date-desc">Sort: Date ↓</option>
              <option value="date-asc">Sort: Date ↑</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-pink-50">
                <th className="text-left py-4 px-6 font-semibold">Purchase ID</th>
                <th className="text-left py-4 px-6 font-semibold">Supplier Name</th>
                <th className="text-left py-4 px-6 font-semibold">Product Name</th>
                <th className="text-center py-4 px-6 font-semibold">Unit Cost</th>
                <th className="text-center py-4 px-6 font-semibold">Order Date</th>
                <th className="text-center py-4 px-6 font-semibold">Contact Number</th>
                <th className="text-center py-4 px-6 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">{item.id}</td>
                  <td className="py-4 px-6">{item.supplier}</td>
                  <td className="py-4 px-6 font-medium">{item.product}</td>
                  <td className="text-center py-4 px-6">₱{item.unitCost.toFixed(2)}</td>
                  <td className="text-center py-4 px-6 text-gray-600">{item.orderDate}</td>
                  <td className="text-center py-4 px-6 text-gray-600">{item.contact}</td>

                  {/* Add / Remove Buttons */}
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-3">

                      {/* ADD button */}
                      <button
                        className="px-5 py-2 rounded-lg text-white font-semibold text-xs
                                   bg-gradient-to-r from-[#FFD873] to-[#FF9B52]
                                   shadow-sm hover:brightness-110 transition-all">
                        Add
                      </button>

                      {/* REMOVE button */}
                      <button
                        className="px-5 py-2 rounded-lg text-white font-semibold text-xs
                                   bg-gradient-to-r from-[#FF8A80] to-[#FF5252]
                                   shadow-sm hover:brightness-110 transition-all">
                        Remove
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination + Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-6">

          {/* Pagination */}
          <div className="flex items-center gap-4 text-sm">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50">
              ← Prev
            </button>

            <span className="font-medium">Page {currentPage} of {totalPages || 1}</span>

            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50">
              Next →
            </button>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4">

            {/* Cancel */}
            <button className="px-10 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
              Cancel
            </button>

            {/* Save Changes — matches theme */}
            <button className="px-10 py-3 rounded-xl text-white text-sm font-extrabold
                               bg-gradient-to-r from-[#FFD873] via-[#FF9B52] to-[#FF7A7A]
                               shadow-md hover:brightness-110 hover:shadow-xl transition-all">
              Save Changes
            </button>

          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
