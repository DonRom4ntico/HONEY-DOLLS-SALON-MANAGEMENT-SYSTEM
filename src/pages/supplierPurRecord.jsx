// src/pages/AdminDisplayProduct.jsx
import { Search, ChevronDown, Plus } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDisplayProduct() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const purchaseOrders = [
    { id: 1, product: 'Argan Oil Serum', unitCost: 350.00, orderDate: 'Oct 25, 2025', contact: '0917 825 5314' },
    { id: 2, product: 'Keratin Shampoo', unitCost: 220.00, orderDate: 'Oct 27, 2025', contact: '0918 234 5567' },
    { id: 3, product: 'Vitamin C Toner', unitCost: 250.00, orderDate: 'Oct 28, 2025', contact: '0906 574 9982' },
    { id: 4, product: 'Moisture Cream', unitCost: 410.00, orderDate: 'Oct 29, 2025', contact: '0918 850 3421' },
    { id: 5, product: 'Aloe Gel', unitCost: 190.00, orderDate: 'Oct 30, 2025', contact: '0922 890 1277' },
    { id: 6, product: 'Whitening Lotion', unitCost: 310.00, orderDate: 'Nov 01, 2025', contact: '0916 885 8890' },
  ];

  // Filter & Sort
  let filtered = purchaseOrders.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contact.includes(searchTerm)
  );

  filtered.sort((a, b) => {
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);
    return sortOrder === 'date-desc' ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <AdminLayout title="Display Inventory">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-full mx-auto">

        {/* Header + Add Product Button (Goes to Purchase Order) */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Honey Dolls • Brilliant Beauty Hub</h1>
            <p className="text-sm text-gray-600 mt-2">
              Display Inventory<br />
              View and manage products available from purchase orders.
            </p>
          </div>

          {/* ADD PRODUCT → GOES TO PURCHASE ORDER */}
          <button
            onClick={() => navigate('/supplierPurchases')}
            style={{
              background: 'linear-gradient(to right, #ec4899, #f97316)',
              boxShadow: '0 10px 30px rgba(236, 72, 153, 0.5)',
            }}
            className="text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-3"
          >
            <Plus className="w-7 h-7" />
            Add Product
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search product name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>

          <div className="relative min-w-[160px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full pl-4 pr-10 py-4 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white cursor-pointer"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table — Clean & Minimal */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-pink-50">
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
                  <td className="py-4 px-6 font-medium">{item.product}</td>
                  <td className="text-center py-4 px-6 text-orange-700 font-semibold">
                    ₱{item.unitCost.toFixed(2)}
                  </td>
                  <td className="text-center py-4 px-6 text-gray-600">{item.orderDate}</td>
                  <td className="text-center py-4 px-6 text-gray-600">{item.contact}</td>

                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-3">
                      <button className="px-6 py-2 rounded-lg text-white font-semibold text-xs bg-gradient-to-r from-[#FFD873] to-[#FF9B52] shadow-sm hover:brightness-110 transition-all">
                        Edit
                      </button>
                      <button className="px-6 py-2 rounded-lg text-white font-semibold text-xs bg-gradient-to-r from-[#FF8A80] to-[#FF5252] shadow-sm hover:brightness-110 transition-all">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination + Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-6">
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              ← Prev
            </button>
            <span className="font-medium">Page {currentPage} of {totalPages || 1}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Next →
            </button>
          </div>

          <div className="flex gap-4">
            <button className="px-10 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
              Cancel
            </button>
            <button className="px-10 py-3 rounded-xl text-white font-extrabold bg-gradient-to-r from-[#FFD873] via-[#FF9B52] to-[#FF7A7A] shadow-md hover:brightness-110 hover:shadow-xl transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}