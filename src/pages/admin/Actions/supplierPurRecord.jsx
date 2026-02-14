import { Search, ChevronDown, Plus } from "lucide-react";
import AdminLayout from "../../../layout/adminLayout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDisplayProduct() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const purchaseOrders = [
    {
      id: 1,
      product: "Argan Oil Serum",
      unitCost: 350.0,
      orderDate: "Oct 25, 2025",
      contact: "0917 825 5314",
    },
    {
      id: 2,
      product: "Keratin Shampoo",
      unitCost: 220.0,
      orderDate: "Oct 27, 2025",
      contact: "0918 234 5567",
    },
    {
      id: 3,
      product: "Vitamin C Toner",
      unitCost: 250.0,
      orderDate: "Oct 28, 2025",
      contact: "0906 574 9982",
    },
    {
      id: 4,
      product: "Moisture Cream",
      unitCost: 410.0,
      orderDate: "Oct 29, 2025",
      contact: "0918 850 3421",
    },
    {
      id: 5,
      product: "Aloe Gel",
      unitCost: 190.0,
      orderDate: "Oct 30, 2025",
      contact: "0922 890 1277",
    },
    {
      id: 6,
      product: "Whitening Lotion",
      unitCost: 310.0,
      orderDate: "Nov 01, 2025",
      contact: "0916 885 8890",
    },
  ];

  // Filter & Sort
  let filtered = purchaseOrders.filter(
    (item) =>
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact.includes(searchTerm),
  );

  filtered.sort((a, b) => {
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);
    return sortOrder === "date-desc" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Smaller gradient button style
  const gradientBtn =
    "text-white font-semibold rounded-full px-4 py-2 text-sm shadow hover:shadow-lg transition-all flex items-center gap-2";

  return (
    <AdminLayout title="Display Inventory">
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 max-w-full mx-auto">
        {/* Header + Add Product Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex-1">
            Honey Dolls • Brilliant Beauty Hub
          </h1>

          {/* Add Product button always on the right */}
          <div className="flex justify-end w-full sm:w-auto">
            <button
              onClick={() => navigate("/supplierPurchases")}
              style={{
                background: "linear-gradient(to right, #ec4899, #f97316)",
              }}
              className={`${gradientBtn} text-sm sm:text-base`}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Product
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search product or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-pink-50">
                <th className="py-2 px-4 font-semibold align-top">
                  {/* Dropdown aligned at the very top-left */}
                  <div className="flex justify-start mb-0 mt-0">
                    <div className="relative w-[120px]">
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full pl-2 pr-6 py-1 border border-gray-300 rounded-xl appearance-none text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white cursor-pointer"
                      >
                        <option value="date-desc">Latest First</option>
                        <option value="date-asc">Oldest First</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Column label below */}
                  <div className="mt-1">Product Name</div>
                </th>

                <th className="text-center py-3 px-4 font-semibold">
                  Unit Cost
                </th>
                <th className="text-center py-3 px-4 font-semibold">
                  Order Date
                </th>
                <th className="text-center py-3 px-4 font-semibold">Contact</th>
                <th className="text-center py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.product}</td>
                  <td className="text-center py-3 px-4 text-orange-700 font-semibold">
                    ₱{item.unitCost.toFixed(2)}
                  </td>
                  <td className="text-center py-3 px-4 text-gray-600">
                    {item.orderDate}
                  </td>
                  <td className="text-center py-3 px-4 text-gray-600">
                    {item.contact}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                      <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#FFD873] to-[#FF9B52] shadow hover:brightness-110 transition-all">
                        Edit
                      </button>
                      <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#FF8A80] to-[#FF5252] shadow hover:brightness-110 transition-all">
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
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex items-center gap-2 sm:gap-4 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              ← Prev
            </button>
            <span className="font-medium">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 sm:px-4 sm:py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Next →
            </button>
          </div>

          <div className="flex gap-2 sm:gap-4 flex-wrap">
            <button className="px-4 py-2 sm:px-8 sm:py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
              Cancel
            </button>
            <button className="px-4 py-2 sm:px-8 sm:py-3 rounded-xl text-white font-extrabold bg-gradient-to-r from-[#FFD873] via-[#FF9B52] to-[#FF7A7A] shadow hover:brightness-110 hover:shadow-xl transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
